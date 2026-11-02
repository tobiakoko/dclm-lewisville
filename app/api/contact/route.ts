import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { env } from '@/lib/env'
import { SITE_CONFIG } from '@/lib/constants'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { OUTCOME_STATUS, handleContact, type ContactOutcome, type EmailSender } from '@/lib/contact/handle-contact'

const sender: EmailSender | null = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

function allowedOrigins(): string[] {
  const site = new URL(SITE_CONFIG.url)
  const origins = [site.origin, `${site.protocol}//www.${site.host}`]
  if (env.NODE_ENV === 'development') origins.push('http://localhost:3000')
  return origins
}

function respond(outcome: ContactOutcome) {
  const status = OUTCOME_STATUS[outcome.kind]
  switch (outcome.kind) {
    case 'sent':
      return NextResponse.json({ ok: true }, { status })
    case 'invalid':
      return NextResponse.json({ ok: false, error: 'invalid', issues: outcome.issues }, { status })
    case 'rate-limited':
      return NextResponse.json(
        { ok: false, error: outcome.kind },
        { status, headers: { 'Retry-After': String(outcome.retryAfterSeconds) } }
      )
    default:
      return NextResponse.json({ ok: false, error: outcome.kind }, { status })
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = null
  }

  const outcome = await handleContact(
    {
      origin: request.headers.get('origin'),
      ownOrigin: request.nextUrl.origin,
      allowedOrigins: allowedOrigins(),
      clientKey: getClientIp(request),
      body,
    },
    { sender, inbox: env.CONTACT_INBOX, from: env.CONTACT_FROM },
    checkRateLimit,
    // Structured, body-free logging only
    (event, detail) => console.info(JSON.stringify({ event, ...detail }))
  )

  return respond(outcome)
}

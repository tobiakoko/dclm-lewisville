import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { createHmac, timingSafeEqual } from 'crypto'
import { env } from '@/lib/env'
import { newsletterSchema } from '@/lib/validations/newsletter'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

const ALLOWED_ORIGINS = [
  'https://dclmlewisville.org',
  'https://www.dclmlewisville.org',
  'http://localhost:3000',
]

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000
const SITE_URL = env.NEXT_PUBLIC_SITE_URL

function getSigningSecret(): string {
  if (!env.NEWSLETTER_SIGNING_SECRET) {
    throw new Error('NEWSLETTER_SIGNING_SECRET is not configured')
  }
  return env.NEWSLETTER_SIGNING_SECRET
}

function signEmail(email: string, exp: number): string {
  return createHmac('sha256', getSigningSecret())
    .update(`${email}.${exp}`)
    .digest('base64url')
}

function verifyEmailToken(email: string, exp: number, token: string): boolean {
  if (Date.now() > exp) return false

  const expected = Buffer.from(signEmail(email, exp))
  const received = Buffer.from(token)

  if (expected.length !== received.length) return false

  return timingSafeEqual(expected, received)
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rateLimit = await checkRateLimit(`newsletter:${ip}`)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.reset.toString(),
          }
        }
      )
    }

    const origin = request.headers.get('origin')
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      )
    }

    const body = await request.json()

    const { email } = newsletterSchema.parse(body)

    if (!resend || !env.RESEND_AUDIENCE_ID || !env.NEWSLETTER_SIGNING_SECRET) {
      console.warn('Resend, audience, or signing secret not configured. Newsletter subscription not processed.')
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter' },
        { status: 200 }
      )
    }

    try {
      await resend.contacts.create({
        email,
        audienceId: env.RESEND_AUDIENCE_ID,
        unsubscribed: true,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (!message.includes('email_already_registered')) {
        throw error
      }
    }

    const exp = Date.now() + TOKEN_TTL_MS
    const token = signEmail(email, exp)
    const confirmUrl = `${SITE_URL}/api/newsletter/confirm?email=${encodeURIComponent(email)}&exp=${exp}&token=${token}`

    await resend.emails.send({
      from: 'info@dclmlewisville.org',
      to: email,
      subject: 'Confirm your newsletter subscription',
      html: `
        <h2>Please confirm your subscription</h2>
        <p>Thank you for subscribing to the DCLM Lewisville newsletter.</p>
        <p>To complete your subscription, please confirm your email address by clicking the link below:</p>
        <p><a href="${confirmUrl}">Confirm my subscription</a></p>
        <p>This link expires in 24 hours. If you did not request this subscription, you can safely ignore this email.</p>
        <p>God bless you!</p>
        <p>- DCLM Lewisville Team</p>
      `,
    })

    await resend.emails.send({
      from: 'website@dclmlewisville.org',
      to: 'info@dclmlewisville.org',
      subject: 'New Newsletter Subscription (pending confirmation)',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>The subscriber still needs to confirm their email address.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted from: ${ip}</p>
      `,
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        }
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      )
    }

    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)
  const rateLimit = await checkRateLimit(`newsletter-confirm:${ip}`)

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  const email = request.nextUrl.searchParams.get('email')
  const exp = Number(request.nextUrl.searchParams.get('exp'))
  const token = request.nextUrl.searchParams.get('token')

  if (
    !email ||
    !Number.isFinite(exp) ||
    !token ||
    !newsletterSchema.safeParse({ email }).success ||
    !resend ||
    !env.RESEND_AUDIENCE_ID ||
    !env.NEWSLETTER_SIGNING_SECRET ||
    !verifyEmailToken(email, exp, token)
  ) {
    return NextResponse.json(
      { error: 'Invalid or expired confirmation link' },
      { status: 400 }
    )
  }

  try {
    await resend.contacts.update({
      email,
      audienceId: env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    })

    return NextResponse.json(
      { message: 'Subscription confirmed. Thank you!' },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('not_found')) {
      await resend.contacts.create({
        email,
        audienceId: env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      })
      return NextResponse.json(
        { message: 'Subscription confirmed. Thank you!' },
        { status: 200 }
      )
    }

    console.error('Newsletter confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm subscription. Please try again later.' },
      { status: 500 }
    )
  }
}
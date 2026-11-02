import { contactFormSchema, contactSubject, type ContactFormData } from '@/lib/validations/contact'
import { escapeHtml } from '@/lib/sanitize'

/** Every way a contact submission can end. The API maps each to one HTTP status. */
export type ContactOutcome =
  | { kind: 'sent'; id: string }
  | { kind: 'invalid'; issues: { field: string; message: string }[] }
  | { kind: 'forbidden-origin' }
  | { kind: 'rate-limited'; retryAfterSeconds: number }
  | { kind: 'provider-error' }
  | { kind: 'not-configured' }

export const OUTCOME_STATUS: Record<ContactOutcome['kind'], number> = {
  sent: 200,
  invalid: 400,
  'forbidden-origin': 403,
  'rate-limited': 429,
  'provider-error': 502,
  'not-configured': 503,
}

/** Minimal shape of the Resend client we use; its send() resolves to { data, error } */
export interface EmailSender {
  emails: {
    send(message: {
      from: string
      to: string
      replyTo: string
      subject: string
      html: string
      text: string
    }): Promise<{ data: { id: string } | null; error: { name?: string; message?: string } | null }>
  }
}

export interface ContactConfig {
  /** null when RESEND_API_KEY is missing */
  sender: EmailSender | null
  inbox: string | undefined
  from: string | undefined
}

export interface ContactRequest {
  origin: string | null
  /** The origin this request was served from, e.g. https://deeperlifelewisville.org */
  ownOrigin: string
  allowedOrigins: string[]
  clientKey: string
  body: unknown
}

export type RateLimiter = (key: string) => Promise<{ allowed: boolean; reset: number }>

/** Logs without the message body or personal details (CLAUDE.md rule 7) */
export type SafeLogger = (event: string, detail: Record<string, string | number | undefined>) => void

function renderEmail(data: ContactFormData) {
  const rows: [string, string | undefined][] = [
    ['Topic', data.topic],
    ['Ministry', data.ministry],
    ['Planned visit', data.visitDate],
    ['Adults', data.adults === undefined ? undefined : String(data.adults)],
    ['Children', data.children === undefined ? undefined : String(data.children)],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || undefined],
  ]
  const present = rows.filter((row): row is [string, string] => Boolean(row[1]))
  const html =
    present.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('\n') +
    (data.message ? `\n<p><strong>Message:</strong></p>\n<p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>` : '')
  const text =
    present.map(([label, value]) => `${label}: ${value}`).join('\n') + (data.message ? `\n\nMessage:\n${data.message}` : '')
  return { html, text }
}

export async function handleContact(
  request: ContactRequest,
  config: ContactConfig,
  rateLimit: RateLimiter,
  log: SafeLogger
): Promise<ContactOutcome> {
  if (request.origin && request.origin !== request.ownOrigin && !request.allowedOrigins.includes(request.origin)) {
    return { kind: 'forbidden-origin' }
  }

  const limit = await rateLimit(`contact:${request.clientKey}`)
  if (!limit.allowed) {
    return { kind: 'rate-limited', retryAfterSeconds: Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)) }
  }

  const parsed = contactFormSchema.safeParse(request.body)
  if (!parsed.success) {
    return {
      kind: 'invalid',
      issues: parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })),
    }
  }

  if (!config.sender || !config.inbox || !config.from) {
    log('contact.not_configured', {
      resend: config.sender ? 'set' : 'missing',
      inbox: config.inbox ? 'set' : 'missing',
      from: config.from ? 'set' : 'missing',
    })
    return { kind: 'not-configured' }
  }

  const data = parsed.data
  const { html, text } = renderEmail(data)

  let result: Awaited<ReturnType<EmailSender['emails']['send']>>
  try {
    result = await config.sender.emails.send({
      from: config.from,
      to: config.inbox,
      replyTo: data.email,
      subject: contactSubject(data),
      html,
      text,
    })
  } catch (error) {
    log('contact.provider_exception', { name: error instanceof Error ? error.name : 'unknown' })
    return { kind: 'provider-error' }
  }

  if (result.error || !result.data) {
    log('contact.provider_error', { name: result.error?.name, message: result.error?.message })
    return { kind: 'provider-error' }
  }

  log('contact.sent', { topic: data.topic, id: result.data.id })
  return { kind: 'sent', id: result.data.id }
}

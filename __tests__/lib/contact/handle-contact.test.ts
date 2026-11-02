/**
 * @jest-environment node
 */
import {
  OUTCOME_STATUS,
  handleContact,
  type ContactConfig,
  type ContactRequest,
  type EmailSender,
  type RateLimiter,
} from '@/lib/contact/handle-contact'

const SITE = 'https://site.example.org'
const INBOX = 'test-inbox@example.com'
const FROM = 'Website <website@example.org>'
const MESSAGE = 'Please pray for my family this week.'

const validBody = {
  topic: 'contact',
  name: 'Adébáyọ̀ Ọlátúndé',
  email: 'visitor@example.com',
  phone: '(555) 010-0000',
  message: MESSAGE,
}

function makeSender(result: Awaited<ReturnType<EmailSender['emails']['send']>> = { data: { id: 'email_1' }, error: null }) {
  const send = jest.fn().mockResolvedValue(result)
  return { sender: { emails: { send } } as EmailSender, send }
}

const allow: RateLimiter = async () => ({ allowed: true, reset: Date.now() + 60_000 })

function request(overrides: Partial<ContactRequest> = {}): ContactRequest {
  return {
    origin: SITE,
    ownOrigin: SITE,
    allowedOrigins: [SITE],
    clientKey: '203.0.113.7',
    body: validBody,
    ...overrides,
  }
}

function config(overrides: Partial<ContactConfig> = {}): ContactConfig {
  return { sender: makeSender().sender, inbox: INBOX, from: FROM, ...overrides }
}

describe('handleContact', () => {
  it('maps every outcome to the agreed HTTP status', () => {
    expect(OUTCOME_STATUS).toEqual({
      sent: 200,
      invalid: 400,
      'forbidden-origin': 403,
      'rate-limited': 429,
      'provider-error': 502,
      'not-configured': 503,
    })
  })

  it('sends to the configured inbox with the visitor as reply-to and reports success', async () => {
    const { sender, send } = makeSender()
    const outcome = await handleContact(request(), config({ sender }), allow, jest.fn())

    expect(outcome).toEqual({ kind: 'sent', id: 'email_1' })
    expect(send).toHaveBeenCalledTimes(1)
    const message = send.mock.calls[0][0]
    expect(message).toMatchObject({ from: FROM, to: INBOX, replyTo: 'visitor@example.com', subject: 'Contact: Adébáyọ̀ Ọlátúndé' })
    expect(message.text).toContain(MESSAGE)
  })

  it('escapes HTML from the visitor in the email body', async () => {
    const { sender, send } = makeSender()
    await handleContact(request({ body: { ...validBody, message: '<script>alert(1)</script> hello there' } }), config({ sender }), allow, jest.fn())
    expect(send.mock.calls[0][0].html).not.toContain('<script>')
    expect(send.mock.calls[0][0].html).toContain('&lt;script&gt;')
  })

  it.each([
    [{ topic: 'prayer' }, 'Prayer request: Adébáyọ̀ Ọlátúndé'],
    [{ topic: 'visit', visitDate: '2026-11-08' }, 'New visitor: Adébáyọ̀ Ọlátúndé, 2026-11-08'],
    [{ topic: 'ministry', ministry: 'Youth Ministry' }, 'Ministry: Youth Ministry – Adébáyọ̀ Ọlátúndé'],
  ])('uses the subject prefix for %o', async (extra, subject) => {
    const { sender, send } = makeSender()
    await handleContact(request({ body: { ...validBody, ...extra } }), config({ sender }), allow, jest.fn())
    expect(send.mock.calls[0][0].subject).toBe(subject)
  })

  it('rejects invalid input with field messages and sends nothing', async () => {
    const { sender, send } = makeSender()
    const outcome = await handleContact(
      request({ body: { ...validBody, email: 'not-an-email', message: 'short' } }),
      config({ sender }),
      allow,
      jest.fn()
    )
    expect(outcome.kind).toBe('invalid')
    if (outcome.kind !== 'invalid') throw new Error('unreachable')
    expect(outcome.issues.map((issue) => issue.field).sort()).toEqual(['email', 'message'])
    expect(send).not.toHaveBeenCalled()
  })

  it('treats a missing or non-JSON body as invalid', async () => {
    const outcome = await handleContact(request({ body: null }), config(), allow, jest.fn())
    expect(outcome.kind).toBe('invalid')
  })

  it('refuses a foreign origin', async () => {
    const { sender, send } = makeSender()
    const outcome = await handleContact(request({ origin: 'https://evil.example.net' }), config({ sender }), allow, jest.fn())
    expect(outcome).toEqual({ kind: 'forbidden-origin' })
    expect(send).not.toHaveBeenCalled()
  })

  it('accepts its own origin (e.g. a preview deployment) and requests without an Origin header', async () => {
    const preview = 'https://preview-123.example.app'
    expect((await handleContact(request({ origin: preview, ownOrigin: preview }), config(), allow, jest.fn())).kind).toBe('sent')
    expect((await handleContact(request({ origin: null }), config(), allow, jest.fn())).kind).toBe('sent')
  })

  it('reports rate limiting with a retry time and sends nothing', async () => {
    const { sender, send } = makeSender()
    const limited: RateLimiter = async () => ({ allowed: false, reset: Date.now() + 30_000 })
    const outcome = await handleContact(request(), config({ sender }), limited, jest.fn())
    expect(outcome.kind).toBe('rate-limited')
    if (outcome.kind !== 'rate-limited') throw new Error('unreachable')
    expect(outcome.retryAfterSeconds).toBeGreaterThanOrEqual(29)
    expect(outcome.retryAfterSeconds).toBeLessThanOrEqual(30)
    expect(send).not.toHaveBeenCalled()
  })

  it.each([
    ['the Resend key', { sender: null }],
    ['the inbox', { inbox: undefined }],
    ['the sender address', { from: undefined }],
  ])('reports not-configured when %s is missing', async (_what, overrides) => {
    const outcome = await handleContact(request(), config(overrides), allow, jest.fn())
    expect(outcome).toEqual({ kind: 'not-configured' })
  })

  it('reports a provider error when Resend returns { error }, never success', async () => {
    const { sender } = makeSender({ data: null, error: { name: 'validation_error', message: 'Domain not verified' } })
    const outcome = await handleContact(request(), config({ sender }), allow, jest.fn())
    expect(outcome).toEqual({ kind: 'provider-error' })
  })

  it('reports a provider error when the Resend call throws', async () => {
    const send = jest.fn().mockRejectedValue(new TypeError('fetch failed'))
    const outcome = await handleContact(request(), config({ sender: { emails: { send } } }), allow, jest.fn())
    expect(outcome).toEqual({ kind: 'provider-error' })
  })

  it('never logs the message body, name, email or phone', async () => {
    const log = jest.fn()
    const outcomes = [
      handleContact(request(), config(), allow, log),
      handleContact(request(), config({ sender: null }), allow, log),
      handleContact(request(), config({ sender: makeSender({ data: null, error: { name: 'x', message: 'y' } }).sender }), allow, log),
    ]
    await Promise.all(outcomes)
    const logged = JSON.stringify(log.mock.calls)
    for (const secret of [MESSAGE, validBody.name, validBody.email, validBody.phone]) {
      expect(logged).not.toContain(secret)
    }
    expect(log).toHaveBeenCalled()
  })
})

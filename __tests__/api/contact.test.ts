/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'

const send = jest.fn()
jest.mock('resend', () => ({ Resend: jest.fn(() => ({ emails: { send } })) }))

const mockEnv = {
  RESEND_API_KEY: 'test-resend-key' as string | undefined,
  CONTACT_INBOX: 'test-inbox@example.com' as string | undefined,
  CONTACT_FROM: 'Website <website@example.org>' as string | undefined,
  NODE_ENV: 'test',
}
jest.mock('@/lib/env', () => ({ env: mockEnv }))

const rateLimit = jest.fn()
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: (key: string) => rateLimit(key),
  getClientIp: () => '203.0.113.7',
}))

// The route allows the configured site URL; requests here come from that origin
const ORIGIN = new URL(SITE_CONFIG.url).origin
const body = { name: 'Test Visitor', email: 'visitor@example.com', message: 'I would like to visit on Sunday.' }

function post(payload: unknown, origin: string | null = ORIGIN) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (origin) headers.origin = origin
  return new NextRequest(`${ORIGIN}/api/contact`, {
    method: 'POST',
    headers,
    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
  })
}

async function loadRoute() {
  let route: typeof import('@/app/api/contact/route') | undefined
  jest.isolateModules(() => {
    route = jest.requireActual<typeof import('@/app/api/contact/route')>('@/app/api/contact/route')
  })
  return route!
}

beforeEach(() => {
  send.mockReset().mockResolvedValue({ data: { id: 'email_1' }, error: null })
  rateLimit.mockReset().mockResolvedValue({ allowed: true, remaining: 9, reset: Date.now() + 60_000 })
  mockEnv.RESEND_API_KEY = 'test-resend-key'
  mockEnv.CONTACT_INBOX = 'test-inbox@example.com'
  mockEnv.CONTACT_FROM = 'Website <website@example.org>'
})

describe('POST /api/contact', () => {
  it('returns 200 only when Resend accepted the email', async () => {
    const { POST } = await loadRoute()
    const response = await POST(post(body))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'test-inbox@example.com', subject: 'Contact: Test Visitor' }))
  })

  it('returns 400 with field issues for invalid input', async () => {
    const { POST } = await loadRoute()
    const response = await POST(post({ ...body, email: 'nope' }))
    expect(response.status).toBe(400)
    expect((await response.json()).issues[0].field).toBe('email')
  })

  it('returns 400 for a body that is not JSON', async () => {
    const { POST } = await loadRoute()
    expect((await POST(post('{not json'))).status).toBe(400)
  })

  it('returns 403 for a foreign origin', async () => {
    const { POST } = await loadRoute()
    expect((await POST(post(body, 'https://evil.example.net'))).status).toBe(403)
    expect(send).not.toHaveBeenCalled()
  })

  it('returns 429 with Retry-After when rate limited', async () => {
    rateLimit.mockResolvedValue({ allowed: false, remaining: 0, reset: Date.now() + 42_000 })
    const { POST } = await loadRoute()
    const response = await POST(post(body))
    expect(response.status).toBe(429)
    expect(Number(response.headers.get('Retry-After'))).toBeGreaterThan(0)
  })

  it('returns 502 when Resend reports an error', async () => {
    send.mockResolvedValue({ data: null, error: { name: 'application_error', message: 'Something went wrong' } })
    const { POST } = await loadRoute()
    const response = await POST(post(body))
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ ok: false, error: 'provider-error' })
  })

  it('returns 503 when email is not configured', async () => {
    mockEnv.RESEND_API_KEY = undefined
    const { POST } = await loadRoute()
    const response = await POST(post(body))
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ ok: false, error: 'not-configured' })
  })
})

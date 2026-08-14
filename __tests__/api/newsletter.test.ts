/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/newsletter/route'
import { NextRequest } from 'next/server'
import { createHmac } from 'crypto'

// Mock Resend at import time: the route constructs `new Resend(...)` at module load.
// The factory returns a shared singleton instance so both route and test share the same mocks.
jest.mock('resend', () => {
  const instance = {
    emails: { send: jest.fn() },
    contacts: { create: jest.fn(), update: jest.fn() },
  }
  return { Resend: jest.fn().mockReturnValue(instance) }
})

const { Resend } = jest.requireMock('resend') as { Resend: jest.Mock }
const resendInstance = new Resend('test-key') as unknown as {
  emails: { send: jest.Mock }
  contacts: { create: jest.Mock; update: jest.Mock }
}

// Mock env to avoid ESM transform issues with @t3-oss/env-nextjs in Jest
jest.mock('@/lib/env', () => ({
  env: {
    RESEND_API_KEY: 'test-resend-key',
    RESEND_AUDIENCE_ID: 'test-audience-id',
    NEWSLETTER_SIGNING_SECRET: 'test-signing-secret-0123456789abcdef',
    SANITY_API_TOKEN: undefined,
    SANITY_REVALIDATE_SECRET: 'test-revalidate-secret',
    UPSTASH_REDIS_REST_URL: undefined,
    UPSTASH_REDIS_REST_TOKEN: undefined,
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'test-project-id',
    NEXT_PUBLIC_SANITY_DATASET: 'test',
    NEXT_PUBLIC_SANITY_API_VERSION: '2024-01-01',
    NEXT_PUBLIC_SITE_URL: 'https://dclmlewisville.org',
    NEXT_PUBLIC_GA_ID: undefined,
    NODE_ENV: 'test',
  },
}))

describe('Newsletter API Route', () => {
  const mockSend = resendInstance.emails.send
  const mockCreateContact = resendInstance.contacts.create
  const mockUpdateContact = resendInstance.contacts.update

  beforeEach(() => {
    jest.clearAllMocks()
    mockSend.mockResolvedValue({ id: 'test-email-id' })
    mockCreateContact.mockResolvedValue({ id: 'test-contact-id' })
    mockUpdateContact.mockResolvedValue({ id: 'test-contact-id' })
  })

  type NextRequestInit = ConstructorParameters<typeof NextRequest>[1]

  const withIp = (init: NextRequestInit, ip: string): NextRequestInit => ({
    ...init,
    headers: {
      ...((init?.headers as Record<string, string> | undefined) ?? {}),
      'x-forwarded-for': ip,
    },
  })

  describe('POST /api/newsletter', () => {
    it('should create pending contact and send confirmation email', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({ email: 'subscriber@example.com' }),
        headers: { 'Content-Type': 'application/json' },
      }, '1.1.1.1'))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Successfully subscribed to newsletter')

      expect(mockCreateContact).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'subscriber@example.com',
          audienceId: 'test-audience-id',
          unsubscribed: true,
        })
      )

      expect(mockSend).toHaveBeenCalledTimes(2)

      // Confirmation email goes to the subscriber (no welcome email is sent)
      expect(mockSend).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          from: 'info@dclmlewisville.org',
          to: 'subscriber@example.com',
          subject: 'Confirm your newsletter subscription',
          html: expect.stringContaining('api/newsletter/confirm'),
        })
      )

      // Admin notification
      expect(mockSend).toHaveBeenNthCalledWith(2,
        expect.objectContaining({
          from: 'website@dclmlewisville.org',
          to: 'info@dclmlewisville.org',
          subject: 'New Newsletter Subscription (pending confirmation)',
        })
      )
    })

    it('should still send confirmation if contact already registered', async () => {
      mockCreateContact.mockRejectedValueOnce(new Error('email_already_registered'))

      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({ email: 'existing@example.com' }),
        headers: { 'Content-Type': 'application/json' },
      }, '2.2.2.2'))

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSend).toHaveBeenCalledTimes(2)
    })

    it('should reject missing email', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      }, '3.3.3.3'))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should reject invalid email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({ email: 'invalid-email' }),
        headers: { 'Content-Type': 'application/json' },
      }, '4.4.4.4'))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should rate limit repeated requests from the same IP', async () => {
      const request = () => new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({ email: 'rate@example.com' }),
        headers: { 'Content-Type': 'application/json' },
      }, '5.5.5.5'))

      let lastStatus = 200
      for (let i = 0; i < 11; i++) {
        const response = await POST(request())
        lastStatus = response.status
      }

      expect(lastStatus).toBe(429)
    })

    it('should handle email sending failure', async () => {
      mockSend.mockRejectedValueOnce(new Error('Email service unavailable'))

      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: JSON.stringify({ email: 'fail@example.com' }),
        headers: { 'Content-Type': 'application/json' },
      }, '6.6.6.6'))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to subscribe. Please try again later.')
    })

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', withIp({
        method: 'POST',
        body: 'invalid json',
        headers: { 'Content-Type': 'application/json' },
      }, '7.7.7.7'))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to subscribe. Please try again later.')
    })
  })

  describe('GET /api/newsletter/confirm', () => {
    const SECRET = 'test-signing-secret-0123456789abcdef'

    const buildConfirmUrl = (email: string, exp: number) => {
      const token = createHmac('sha256', SECRET).update(`${email}.${exp}`).digest('base64url')
      return `http://localhost:3000/api/newsletter/confirm?email=${encodeURIComponent(email)}&exp=${exp}&token=${token}`
    }

    it('should confirm subscription with valid token', async () => {
      const exp = Date.now() + 60_000
      const request = new NextRequest(buildConfirmUrl('confirm@example.com', exp), withIp({
        method: 'GET',
      }, '8.8.8.8'))

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Subscription confirmed. Thank you!')
      expect(mockUpdateContact).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'confirm@example.com',
          audienceId: 'test-audience-id',
          unsubscribed: false,
        })
      )
    })

    it('should reject an invalid token', async () => {
      const exp = Date.now() + 60_000
      const url = `http://localhost:3000/api/newsletter/confirm?email=bad@example.com&exp=${exp}&token=forged`
      const request = new NextRequest(url, withIp({ method: 'GET' }, '9.9.9.9'))

      const response = await GET(request)

      expect(response.status).toBe(400)
      expect(mockUpdateContact).not.toHaveBeenCalled()
    })

    it('should reject an expired token', async () => {
      const exp = Date.now() - 60_000
      const request = new NextRequest(buildConfirmUrl('expired@example.com', exp), withIp({
        method: 'GET',
      }, '10.10.10.10'))

      const response = await GET(request)

      expect(response.status).toBe(400)
      expect(mockUpdateContact).not.toHaveBeenCalled()
    })

    it('should reject missing parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter/confirm', withIp({
        method: 'GET',
      }, '11.11.11.11'))

      const response = await GET(request)

      expect(response.status).toBe(400)
      expect(mockUpdateContact).not.toHaveBeenCalled()
    })
  })
})
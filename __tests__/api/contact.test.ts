/**
 * @jest-environment node
 */
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock Resend at import time: the route constructs `new Resend(...)` at module load.
// The factory returns a shared singleton instance so both route and test share the same mocks.
jest.mock('resend', () => {
  const instance = {
    emails: { send: jest.fn() },
  }
  return { Resend: jest.fn().mockReturnValue(instance) }
})

const { Resend } = jest.requireMock('resend') as { Resend: jest.Mock }
const resendInstance = new Resend('test-key') as unknown as {
  emails: { send: jest.Mock }
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

describe('Contact API Route', () => {
  const mockSend = resendInstance.emails.send

  beforeEach(() => {
    jest.clearAllMocks()
    mockSend.mockResolvedValue({ id: 'test-email-id' })
  })

  describe('POST /api/contact', () => {
    it('should successfully send an email with valid data', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Email sent successfully')
      expect(mockSend).toHaveBeenCalledTimes(1)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'website@dclmlewisville.org',
          to: 'info@dclmlewisville.org',
          subject: 'New Contact Form Submission from John Doe',
        })
      )
    })

    it('should handle missing name field', async () => {
      const requestBody = {
        email: 'john@example.com',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should handle missing email field', async () => {
      const requestBody = {
        name: 'John Doe',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should handle missing message field', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should handle optional phone field', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Email sent successfully')
      expect(mockSend).toHaveBeenCalledTimes(1)
    })

    it('should include phone number in email when provided', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await POST(request)

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('123-456-7890'),
        })
      )
    })

    it('should handle email sending failure', async () => {
      mockSend.mockRejectedValueOnce(new Error('Email service unavailable'))

      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to send email. Please try again later.')
    })

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to send email. Please try again later.')
    })
  })
})

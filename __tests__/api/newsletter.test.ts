/**
 * @jest-environment node
 */
import { POST } from '@/app/api/newsletter/route'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'

// Mock Resend
jest.mock('resend')

describe('Newsletter API Route', () => {
  let mockSend: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockSend = jest.fn().mockResolvedValue({ id: 'test-email-id' })
    ;(Resend as jest.MockedClass<typeof Resend>).mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    } as any))
  })

  describe('POST /api/newsletter', () => {
    it('should successfully subscribe with valid email', async () => {
      const requestBody = {
        email: 'subscriber@example.com',
      }

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Successfully subscribed to newsletter')

      // Should send two emails: one to admin and one confirmation to subscriber
      expect(mockSend).toHaveBeenCalledTimes(2)

      // Check admin notification email
      expect(mockSend).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          from: 'website@dclmlewisville.org',
          to: 'info@dclmlewisville.org',
          subject: 'New Newsletter Subscription',
        })
      )

      // Check subscriber confirmation email
      expect(mockSend).toHaveBeenNthCalledWith(2,
        expect.objectContaining({
          from: 'info@dclmlewisville.org',
          to: 'subscriber@example.com',
          subject: 'Welcome to DCLM Lewisville Newsletter',
        })
      )
    })

    it('should reject missing email', async () => {
      const requestBody = {}

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Valid email is required')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should reject invalid email format', async () => {
      const requestBody = {
        email: 'invalid-email',
      }

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Valid email is required')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should accept various valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@test-domain.com',
      ]

      for (const email of validEmails) {
        const requestBody = { email }

        const request = new NextRequest('http://localhost:3000/api/newsletter', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.message).toBe('Successfully subscribed to newsletter')
      }
    })

    it('should handle email sending failure', async () => {
      mockSend.mockRejectedValueOnce(new Error('Email service unavailable'))

      const requestBody = {
        email: 'subscriber@example.com',
      }

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to subscribe')
    })

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to subscribe')
    })

    it('should include subscriber email in confirmation message', async () => {
      const requestBody = {
        email: 'test@example.com',
      }

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await POST(request)

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          html: expect.stringContaining('Thank you for subscribing'),
        })
      )
    })
  })
})

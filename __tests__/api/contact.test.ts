/**
 * @jest-environment node
 */
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'

// Mock Resend
jest.mock('resend')

describe('Contact API Route', () => {
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
      expect(data.error).toBe('Missing required fields')
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
      expect(data.error).toBe('Missing required fields')
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
      expect(data.error).toBe('Missing required fields')
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
      expect(data.error).toBe('Failed to send email')
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
      expect(data.error).toBe('Failed to send email')
    })
  })
})

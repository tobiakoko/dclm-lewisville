import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { env } from '@/lib/env'
import { contactFormSchema } from '@/lib/validations/contact'
import { escapeHtml } from '@/lib/sanitize'

const resend = new Resend(env.RESEND_API_KEY)

// Simple in-memory rate limiting (consider using Upstash Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3 // 3 requests per minute

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
          }
        }
      )
    }

    // CORS check - only allow requests from your domain
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://dclmlewisville.org',
      'https://www.dclmlewisville.org',
      'http://localhost:3000', // Development
    ]

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate inputs with Zod
    const validatedData = contactFormSchema.parse(body)

    // Sanitize all inputs to prevent XSS
    const sanitizedName = escapeHtml(validatedData.name)
    const sanitizedEmail = escapeHtml(validatedData.email)
    const sanitizedPhone = validatedData.phone ? escapeHtml(validatedData.phone) : null
    const sanitizedMessage = escapeHtml(validatedData.message)

    // Send email with sanitized content
    await resend.emails.send({
      from: 'website@dclmlewisville.org',
      to: 'info@dclmlewisville.org',
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted from: ${ip}</p>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        }
      }
    )
  } catch (error) {
    // Handle Zod validation errors
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

    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}

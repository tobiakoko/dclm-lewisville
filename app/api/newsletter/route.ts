import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { env } from '@/lib/env'
import { newsletterSchema } from '@/lib/validations/newsletter'
import { escapeHtml } from '@/lib/sanitize'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

// Simple in-memory rate limiting (consider using Upstash Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute

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

    // Validate and sanitize email with Zod
    const { email } = newsletterSchema.parse(body)
    const sanitizedEmail = escapeHtml(email)

    // Check if Resend is configured
    if (!resend) {
      console.warn('RESEND_API_KEY not configured. Newsletter subscription not sent.')
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter (email service not configured)' },
        { status: 200 }
      )
    }

    // Add to newsletter list (you might want to integrate with Mailchimp, ConvertKit, etc.)
    // For now, just send a notification email
    await resend.emails.send({
      from: 'website@dclmlewisville.org',
      to: 'info@dclmlewisville.org',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p>Please add this email to your newsletter distribution list.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted from: ${ip}</p>
      `,
    })

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: 'info@dclmlewisville.org',
      to: email,
      subject: 'Welcome to DCLM Lewisville Newsletter',
      html: `
        <h2>Welcome!</h2>
        <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with the latest news, events, and sermons from DCLM Lewisville.</p>
        <p>God bless you!</p>
        <p>- DCLM Lewisville Team</p>
      `,
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
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

    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
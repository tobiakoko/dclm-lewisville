import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { env } from '@/lib/env'
import { contactFormSchema } from '@/lib/validations/contact'
import { escapeHtml } from '@/lib/sanitize'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

const ALLOWED_ORIGINS = [
  'https://dclmlewisville.org',
  'https://www.dclmlewisville.org',
  'http://localhost:3000',
]

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rateLimit = await checkRateLimit(`contact:${ip}`)

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

    const validatedData = contactFormSchema.parse(body)

    const sanitizedName = escapeHtml(validatedData.name)
    const sanitizedEmail = escapeHtml(validatedData.email)
    const sanitizedPhone = validatedData.phone ? escapeHtml(validatedData.phone) : null
    const sanitizedMessage = escapeHtml(validatedData.message)
    const sanitizedIp = escapeHtml(ip)

    if (!resend) {
      console.warn('RESEND_API_KEY not configured. Email not sent.')
      return NextResponse.json(
        { message: 'Contact form received (email service not configured)' },
        { status: 200 }
      )
    }

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
        <p style="color: #666; font-size: 12px;">Submitted from: ${sanitizedIp}</p>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
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

    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholder')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const resend = getResend()

    // Add to newsletter list (you might want to integrate with Mailchimp, ConvertKit, etc.)
    // For now, just send a notification email
    await resend.emails.send({
      from: 'website@dclmlewisville.org',
      to: 'info@dclmlewisville.org',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Please add this email to your newsletter distribution list.</p>
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
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
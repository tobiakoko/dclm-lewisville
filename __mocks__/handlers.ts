import { http, HttpResponse } from 'msw'

// API route handlers for MSW
export const handlers = [
  // Newsletter subscription
  http.post('/api/newsletter', async ({ request }) => {
    const body = await request.json() as { email?: string }

    if (!body.email || !body.email.includes('@')) {
      return HttpResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )
  }),

  // Contact form submission
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json() as {
      name?: string
      email?: string
      phone?: string
      message?: string
    }

    if (!body.name || !body.email || !body.message) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  }),

  // Health check endpoint
  http.get('/api/health', () => {
    return HttpResponse.json(
      { status: 'ok', timestamp: new Date().toISOString() },
      { status: 200 }
    )
  }),
]

// Error handlers for testing error scenarios
export const errorHandlers = [
  http.post('/api/newsletter', () => {
    return HttpResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }),

  http.post('/api/contact', () => {
    return HttpResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }),
]

import { http, HttpResponse } from 'msw'

// API route handlers for MSW
export const handlers = [
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

    return HttpResponse.json({ ok: true }, { status: 200 })
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
  http.post('/api/contact', () => {
    return HttpResponse.json({ ok: false, error: 'provider-error' }, { status: 502 })
  }),
]

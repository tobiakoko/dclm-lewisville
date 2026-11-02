/**
 * The real ContactForm against a mocked /api/contact (MSW): every state the visitor can see.
 */
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'
import ContactForm from '@/components/ContactForm'
import { SITE_CONFIG, telHref } from '@/lib/constants'

jest.mock('@/lib/analytics', () => ({
  trackContactFormSubmit: jest.fn(),
  trackContactFormError: jest.fn(),
}))

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Name/), 'Adébáyọ̀ Test')
  await user.type(screen.getByLabelText(/^Email/), 'visitor@example.com')
  await user.type(screen.getByLabelText(/^Message/), 'I would like to visit this Sunday.')
  await user.click(screen.getByRole('button', { name: 'Send message' }))
}

function respondWith(status: number, body: object = { ok: status === 200 }) {
  server.use(http.post('/api/contact', () => HttpResponse.json(body, { status })))
}

describe('ContactForm', () => {
  it('confirms when the message was sent and clears the form', async () => {
    let received: Record<string, unknown> | undefined
    server.use(
      http.post('/api/contact', async ({ request }) => {
        received = (await request.json()) as Record<string, unknown>
        return HttpResponse.json({ ok: true })
      })
    )
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillAndSubmit(user)

    expect(await screen.findByText('Thank you. Your message has been sent to the church.')).toBeInTheDocument()
    expect(received).toMatchObject({ topic: 'contact', name: 'Adébáyọ̀ Test', email: 'visitor@example.com' })
    expect(screen.getByLabelText(/^Name/)).toHaveValue('')
  })

  it.each([
    ['email is not configured (503)', 503],
    ['the provider failed (502)', 502],
    ['validation failed on the server (400)', 400],
  ])('says the message was not sent and shows the phone number when %s', async (_case, status) => {
    respondWith(status, { ok: false })
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillAndSubmit(user)

    expect(await screen.findByText('Sorry, your message was not sent.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: SITE_CONFIG.phone })).toHaveAttribute('href', telHref(SITE_CONFIG.phone))
    expect(screen.queryByText(/has been sent/)).not.toBeInTheDocument()
  })

  it('shows the phone number on a network error', async () => {
    server.use(http.post('/api/contact', () => HttpResponse.error()))
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillAndSubmit(user)
    expect(await screen.findByText('Sorry, your message was not sent.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: SITE_CONFIG.phone })).toBeInTheDocument()
  })

  it('explains rate limiting', async () => {
    respondWith(429, { ok: false, error: 'rate-limited' })
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillAndSubmit(user)
    expect(await screen.findByText('Too many messages in a short time.')).toBeInTheDocument()
  })

  it('shows field errors tied to their inputs and does not submit invalid input', async () => {
    const onRequest = jest.fn()
    server.use(http.post('/api/contact', () => (onRequest(), HttpResponse.json({ ok: true }))))
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    const name = screen.getByLabelText(/^Name/)
    await waitFor(() => expect(name).toHaveAttribute('aria-invalid', 'true'))
    expect(document.getElementById(name.getAttribute('aria-describedby')!)).toHaveTextContent(/at least 2 characters/)
    expect(onRequest).not.toHaveBeenCalled()
  })

  it('sends prayer requests with the prayer topic', async () => {
    let received: Record<string, unknown> | undefined
    server.use(
      http.post('/api/contact', async ({ request }) => {
        received = (await request.json()) as Record<string, unknown>
        return HttpResponse.json({ ok: true })
      })
    )
    const user = userEvent.setup()
    render(<ContactForm topic="prayer" submitLabel="Send prayer request" />)
    await user.type(screen.getByLabelText(/^Name/), 'Test Visitor')
    await user.type(screen.getByLabelText(/^Email/), 'visitor@example.com')
    await user.type(screen.getByLabelText(/^Prayer request/), 'Please pray for my mother.')
    await user.click(screen.getByRole('button', { name: 'Send prayer request' }))
    await screen.findByText('Thank you. Your message has been sent to the church.')
    expect(received).toMatchObject({ topic: 'prayer' })
  })

  it('sends the preselected ministry', async () => {
    let received: Record<string, unknown> | undefined
    server.use(
      http.post('/api/contact', async ({ request }) => {
        received = (await request.json()) as Record<string, unknown>
        return HttpResponse.json({ ok: true })
      })
    )
    const user = userEvent.setup()
    render(<ContactForm topic="ministry" ministry="Youth Ministry" />)
    expect(screen.getByText('Youth Ministry')).toBeInTheDocument()
    await fillAndSubmit(user)
    await screen.findByText('Thank you. Your message has been sent to the church.')
    expect(received).toMatchObject({ topic: 'ministry', ministry: 'Youth Ministry' })
  })
})

/**
 * Integration test example for Contact Form
 * Tests the full flow of form submission including API calls
 */
import * as React from 'react'
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'

// Note: Import actual ContactForm component when available
// import { ContactForm } from '@/components/forms/ContactForm'

// Mock component for demonstration
const MockContactForm = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" />
      <textarea name="message" placeholder="Message" required />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Submit'}
      </button>
      {status === 'success' && <p>Message sent successfully!</p>}
      {status === 'error' && <p>Failed to send message</p>}
    </form>
  )
}

describe('Contact Form Integration', () => {
  it('should successfully submit a contact form', async () => {
    const user = userEvent.setup()
    render(<MockContactForm />)

    // Fill out the form
    await user.type(screen.getByPlaceholderText('Name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Phone'), '555-0123')
    await user.type(screen.getByPlaceholderText('Message'), 'Test message')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Wait for loading state
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
    })
  })

  it('should handle validation errors', async () => {
    const user = userEvent.setup()
    render(<MockContactForm />)

    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Form should not submit (browser validation prevents it)
    expect(screen.queryByText('Message sent successfully!')).not.toBeInTheDocument()
  })

  it('should handle server errors', async () => {
    const user = userEvent.setup()

    // Override the default handler to return an error
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        )
      })
    )

    render(<MockContactForm />)

    // Fill and submit form
    await user.type(screen.getByPlaceholderText('Name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument()
    })
  })

  it('should handle network errors', async () => {
    const user = userEvent.setup()

    // Override handler to simulate network error
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.error()
      })
    )

    render(<MockContactForm />)

    // Fill and submit form
    await user.type(screen.getByPlaceholderText('Name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument()
    })
  })

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup()

    const FormWithReset = () => {
      const formRef = React.useRef<HTMLFormElement>(null)
      const [status, setStatus] = React.useState<'idle' | 'success'>('idle')

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          setStatus('success')
          formRef.current?.reset()
        }
      }

      return (
        <form ref={formRef} onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required />
          <button type="submit">Submit</button>
          {status === 'success' && <p>Success!</p>}
        </form>
      )
    }

    render(<FormWithReset />)

    // Fill and submit form
    const nameInput = screen.getByPlaceholderText('Name')
    await user.type(nameInput, 'John Doe')
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument()
    })

    // Check that form is reset
    expect(nameInput).toHaveValue('')
  })
})

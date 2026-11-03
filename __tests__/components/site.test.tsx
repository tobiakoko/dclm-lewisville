import { render, screen } from '@/__tests__/utils/test-utils'
import { EventCard } from '@/components/site/EventCard'
import { Alert, EmptyState } from '@/components/site/Alert'

describe('EventCard', () => {
  it('shows the date in Central Time and the mode', () => {
    render(
      <EventCard event={{ id: 'e', title: 'Special service', start: '2026-12-06T15:30:00Z', location: 'At the church', mode: 'both' }} />
    )
    expect(screen.getByText(/Sunday, December 6, 2026, 9:30 AM/)).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'How to attend' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('links registration only when there is a link', () => {
    render(
      <EventCard
        event={{ id: 'e', title: 'Special service', start: '2026-12-06T15:30:00Z', location: 'At the church', mode: 'both', registrationUrl: 'https://example.org/register' }}
      />
    )
    expect(screen.getByRole('link', { name: /Register.*Special service/ })).toHaveAttribute('href', 'https://example.org/register')
  })
})

describe('Alert and EmptyState', () => {
  it('announces errors assertively and other states politely', () => {
    const { rerender } = render(<Alert tone="error" title="Not sent" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Not sent')
    rerender(<Alert tone="success" title="Sent" />)
    expect(screen.getByRole('status')).toHaveTextContent('Sent')
  })

  it('renders the honest empty state text', () => {
    render(<EmptyState title="No special events right now." />)
    expect(screen.getByText('No special events right now.')).toBeInTheDocument()
  })
})

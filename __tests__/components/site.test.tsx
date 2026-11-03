import { render, screen } from '@/__tests__/utils/test-utils'
import { ServiceTimesCard } from '@/components/site/ServiceTimesCard'
import { MinistryCard } from '@/components/site/MinistryCard'
import { EventCard } from '@/components/site/EventCard'
import { Alert, EmptyState } from '@/components/site/Alert'
import { SERVICE_TIMES, ZOOM_PLACEHOLDER, type ServiceTime } from '@/lib/constants'
import { MINISTRIES } from '@/lib/content/site'
import { formatServiceTime } from '@/lib/schedule'

const byId = (id: string) => SERVICE_TIMES.find((s) => s.id === id) as ServiceTime

describe('ServiceTimesCard', () => {
  it('shows day, name, time, both mode badges and the join link for Sunday Worship', () => {
    const service = byId('sunday-worship')
    render(<ServiceTimesCard service={service} />)
    expect(screen.getByRole('heading', { name: service.name })).toBeInTheDocument()
    expect(screen.getByText(formatServiceTime(service))).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'How to attend' })).toHaveTextContent('In personOnline')
    expect(screen.getByRole('link', { name: /Join online/ })).toHaveAttribute('href', service.joinUrl)
  })

  it('links to the meeting when it has a join link', () => {
    render(<ServiceTimesCard service={byId('monday-prayer')} />)
    expect(screen.getByRole('link', { name: /Join online.*Monday Prayer Meeting/ })).toHaveAttribute(
      'href',
      byId('monday-prayer').joinUrl
    )
    expect(screen.queryByText(ZOOM_PLACEHOLDER)).not.toBeInTheDocument()
  })

  it('shows the Zoom placeholder, never an invented link, when the link is missing', () => {
    render(<ServiceTimesCard service={{ ...byId('monday-prayer'), joinUrl: null }} />)
    expect(screen.getByText(ZOOM_PLACEHOLDER)).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('omits the join line for in-person-only meetings', () => {
    render(<ServiceTimesCard service={{ ...byId('tuesday-bible-study'), mode: 'in-person' }} />)
    expect(screen.queryByText(ZOOM_PLACEHOLDER)).not.toBeInTheDocument()
  })
})

describe('MinistryCard', () => {
  it('always offers a way to join, prefilled with the ministry', () => {
    const ministry = MINISTRIES[0]
    render(<MinistryCard ministry={ministry} />)
    expect(screen.getByRole('link', { name: `Send us a message about ${ministry.name}` })).toHaveAttribute(
      'href',
      `/contact?topic=${encodeURIComponent(ministry.name)}#contact-form`
    )
  })
})

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

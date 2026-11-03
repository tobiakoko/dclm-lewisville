import { render, screen } from '@/__tests__/utils/test-utils'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Chip } from '@/components/ui/chip'
import { IconTile } from '@/components/ui/icon-tile'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Card, CardDark, CardLine, Panel } from '@/components/ui/surface'
import { Alert, EmptyState } from '@/components/site/Alert'

describe('ArrowLink', () => {
  it('links a route with a decorative arrow and a 44px tap target', () => {
    render(<ArrowLink href="/events">All events</ArrowLink>)
    const link = screen.getByRole('link', { name: 'All events' })
    expect(link).toHaveAttribute('href', '/events')
    expect(link).toHaveClass('min-h-11', 'text-emblem-sky-700')
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders tel: and outside URLs as plain anchors', () => {
    render(<ArrowLink href="tel:+14699396994">Call us</ArrowLink>)
    expect(screen.getByRole('link', { name: 'Call us' })).toHaveAttribute('href', 'tel:+14699396994')
  })
})

describe('Chip', () => {
  it.each([
    ['default', 'bg-emblem-sky-50'],
    ['warm', 'bg-paper-2'],
    ['dark', 'bg-white/12'],
    ['red', 'bg-heaven-50'],
  ] as const)('applies the %s tone', (tone, className) => {
    render(<Chip tone={tone}>Online</Chip>)
    expect(screen.getByText('Online')).toHaveClass(className, 'text-sm')
  })

  it('can be a list item', () => {
    render(
      <ul>
        <Chip as="li">In person</Chip>
      </ul>
    )
    expect(screen.getByRole('listitem')).toHaveTextContent('In person')
  })
})

describe('IconTile', () => {
  it.each([
    ['default', 'bg-emblem-sky-50'],
    ['warm', 'shadow-sm'],
    ['dark', 'text-emblem-sky-400'],
  ] as const)('applies the %s tone and hides the decoration', (tone, className) => {
    const { container } = render(<IconTile tone={tone}>i</IconTile>)
    const tile = container.firstElementChild
    expect(tile).toHaveClass(className, 'size-[52px]')
    expect(tile).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Eyebrow', () => {
  it('is a paragraph, never a heading', () => {
    render(<Eyebrow>Weekly gatherings</Eyebrow>)
    expect(screen.getByText('Weekly gatherings').tagName).toBe('P')
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})

describe('surfaces', () => {
  it.each([
    [Card, ['bg-white', 'rounded-card', 'shadow-md']],
    [CardLine, ['bg-white', 'rounded-card']],
    [CardDark, ['on-dark', 'bg-navy-900', 'rounded-panel']],
  ] as const)('%p has its surface classes', (Surface, classes) => {
    render(<Surface>Content</Surface>)
    expect(screen.getByText('Content')).toHaveClass(...classes)
  })

  it('Panel is paper by default and sky on request', () => {
    render(
      <>
        <Panel>Paper</Panel>
        <Panel tone="sky">Sky</Panel>
      </>
    )
    expect(screen.getByText('Paper')).toHaveClass('bg-paper', 'rounded-panel')
    expect(screen.getByText('Sky')).toHaveClass('bg-emblem-sky-50')
  })
})

describe('Alert', () => {
  it('announces errors as alerts', () => {
    render(<Alert tone="error" title="Sorry, your message was not sent." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Sorry, your message was not sent.')
  })

  it.each(['info', 'success', 'warning'] as const)('announces %s politely', (tone) => {
    render(<Alert tone={tone} title="Sent" />)
    expect(screen.getByRole('status')).toHaveTextContent('Sent')
  })

  it('shows the crisis notice as a note in heaven-700 on heaven-50', () => {
    render(<Alert tone="crisis">Call 911</Alert>)
    const note = screen.getByRole('note')
    expect(note).toHaveClass('bg-heaven-50', 'text-heaven-700')
    expect(note).toHaveTextContent('Call 911')
  })
})

describe('EmptyState', () => {
  it('shows the message as a heading, a muted line and one action', () => {
    render(
      <EmptyState title="No special events right now." action={<a href="/visit">Plan your visit</a>}>
        Join us Sunday.
      </EmptyState>
    )
    expect(screen.getByRole('heading', { level: 3, name: 'No special events right now.' })).toBeInTheDocument()
    expect(screen.getByText('Join us Sunday.')).toHaveClass('text-ink-muted')
    expect(screen.getByRole('link', { name: 'Plan your visit' })).toBeInTheDocument()
  })
})

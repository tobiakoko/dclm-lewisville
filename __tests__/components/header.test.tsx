import { act, render, screen, userEvent, waitFor, within } from '@/__tests__/utils/test-utils'
import Header, { type HeaderInfo } from '@/components/layout/Header'
import { OVERLAY_HERO_ID } from '@/lib/routes'
import { GIVE_LINK, NAV_LINKS, SITE_CONFIG, formatAddress, mapsUrl, telHref } from '@/lib/constants'

let mockPathname = '/about'
jest.mock('next/navigation', () => ({ usePathname: () => mockPathname }))
jest.mock('@/lib/analytics', () => ({ trackGiveClick: jest.fn(), trackNavigation: jest.fn() }))

const INFO: HeaderInfo = {
  brandName: 'Deeper Life Bible Church',
  brandPlace: 'Lewisville, Texas',
  streamsUrl: SITE_CONFIG.youtube.streams,
  mainServiceTime: 'Sunday 9:30 AM',
  address: formatAddress(SITE_CONFIG.address),
  mapsHref: mapsUrl(SITE_CONFIG.address),
  phone: SITE_CONFIG.phone,
  phoneHref: telHref(SITE_CONFIG.phone),
}

function mockLive(live: boolean | 'error') {
  global.fetch = jest.fn(() =>
    live === 'error' ? Promise.reject(new Error('offline')) : Promise.resolve(new Response(JSON.stringify({ live })))
  ) as jest.Mock
}

// Captures the hero observer so tests can scroll the hero away
let observerCallback: IntersectionObserverCallback | null = null
class MockObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

beforeEach(() => {
  mockPathname = '/about'
  observerCallback = null
  window.IntersectionObserver = MockObserver as unknown as typeof IntersectionObserver
  mockLive(false)
})

describe('Header', () => {
  it('shows the brand from siteSettings and links every main page', async () => {
    render(<Header info={INFO} />)
    const home = screen.getByRole('link', { name: /Deeper Life Bible Church.*home page/ })
    expect(home).toHaveTextContent('Lewisville, Texas')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const link of NAV_LINKS) {
      expect(within(nav).getByRole('link', { name: link.name })).toHaveAttribute('href', link.href)
    }
    expect(within(nav).queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: GIVE_LINK.name })).toHaveAttribute('href', GIVE_LINK.href)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/api/live', expect.anything()))
  })

  it('marks the current page with a pill', () => {
    render(<Header info={INFO} />)
    const about = screen.getByRole('link', { name: 'About' })
    expect(about).toHaveAttribute('aria-current', 'page')
    expect(about).toHaveClass('bg-emblem-sky-50')
    expect(screen.getByRole('link', { name: 'Visit' })).not.toHaveAttribute('aria-current')
  })

  it('says "Watch online" without a live dot until the stream is live', async () => {
    render(<Header info={INFO} />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect(screen.getByRole('link', { name: 'Watch online' })).toHaveAttribute('href', INFO.streamsUrl)
    expect(screen.queryByText('Watch live')).not.toBeInTheDocument()
  })

  it('says "Watch live" with the dot while the stream is live', async () => {
    mockLive(true)
    render(<Header info={INFO} />)
    expect(await screen.findByRole('link', { name: 'Watch live' })).toHaveAttribute('href', INFO.streamsUrl)
  })

  it('stays on "Watch online" when the live check fails', async () => {
    mockLive('error')
    render(<Header info={INFO} />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect(screen.getByRole('link', { name: 'Watch online' })).toBeInTheDocument()
  })

  it('is light and sticky on inner pages', () => {
    render(<Header info={INFO} />)
    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('data-tone', 'light')
    expect(header).toHaveClass('sticky', 'bg-white')
  })

  it('overlays the home hero, then becomes the fixed light header once the hero scrolls away', () => {
    mockPathname = '/'
    const hero = document.createElement('div')
    hero.id = OVERLAY_HERO_ID
    document.body.appendChild(hero)
    render(<Header info={INFO} />)
    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('data-tone', 'overlay')
    expect(header).toHaveClass('absolute', 'on-dark')
    expect(header).not.toHaveClass('sticky')

    act(() => observerCallback?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(header).toHaveAttribute('data-tone', 'light')
    expect(header).toHaveClass('fixed', 'bg-white')

    act(() => observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(header).toHaveAttribute('data-tone', 'overlay')
    hero.remove()
  })

  it('keeps the mobile menu out of the page until opened', () => {
    render(<Header info={INFO} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Give' })).toHaveLength(1)
  })

  it('opens the drawer with links, Give, Watch online, the Sunday time, address and phone', async () => {
    const user = userEvent.setup()
    render(<Header info={INFO} />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))

    const dialog = screen.getByRole('dialog', { name: 'Menu' })
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeVisible()
    expect(within(dialog).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(within(dialog).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    expect(within(dialog).getByRole('link', { name: 'Give' })).toHaveAttribute('href', GIVE_LINK.href)
    expect(within(dialog).getByRole('link', { name: 'Watch online' })).toHaveAttribute('href', INFO.streamsUrl)
    expect(within(dialog).getByText('Sunday 9:30 AM')).toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: INFO.address })).toHaveAttribute('href', INFO.mapsHref)
    expect(within(dialog).getByRole('link', { name: INFO.phone })).toHaveAttribute('href', INFO.phoneHref)

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the mobile menu after navigating', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Header info={INFO} />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    mockPathname = '/events'
    rerender(<Header info={INFO} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the mobile menu with its Close button and returns focus to Menu', async () => {
    const user = userEvent.setup()
    render(<Header info={INFO} />)
    const trigger = screen.getByRole('button', { name: 'Menu' })
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})

import { render, screen, userEvent, within } from '@/__tests__/utils/test-utils'
import Header from '@/components/layout/Header'
import { GIVE_LINK, NAV_LINKS, SITE_CONFIG } from '@/lib/constants'

let mockPathname = '/'
jest.mock('next/navigation', () => ({ usePathname: () => mockPathname }))
jest.mock('@/lib/analytics', () => ({ trackGiveClick: jest.fn(), trackNavigation: jest.fn() }))

beforeEach(() => {
  mockPathname = '/'
})

describe('Header', () => {
  it('links to every main page and Give, with no hover-only menus', () => {
    render(<Header shortName={SITE_CONFIG.shortName} />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const link of NAV_LINKS) {
      expect(within(nav).getByRole('link', { name: link.name })).toHaveAttribute('href', link.href)
    }
    expect(within(nav).getByRole('link', { name: GIVE_LINK.name })).toHaveAttribute('href', GIVE_LINK.href)
    expect(within(nav).queryByRole('button')).not.toBeInTheDocument()
  })

  it('marks the current page', () => {
    mockPathname = '/about'
    render(<Header shortName={SITE_CONFIG.shortName} />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Visit' })).not.toHaveAttribute('aria-current')
  })

  it('keeps the mobile menu out of the page until opened', () => {
    render(<Header shortName={SITE_CONFIG.shortName} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Give' })).toHaveLength(1)
  })

  it('opens the mobile menu with a visible Close button and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(<Header shortName={SITE_CONFIG.shortName} />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))

    const dialog = screen.getByRole('dialog', { name: 'Menu' })
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeVisible()
    expect(within(dialog).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the mobile menu after navigating', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Header shortName={SITE_CONFIG.shortName} />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    mockPathname = '/events'
    rerender(<Header shortName={SITE_CONFIG.shortName} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the mobile menu with its Close button and returns focus to Menu', async () => {
    const user = userEvent.setup()
    render(<Header shortName={SITE_CONFIG.shortName} />)
    const trigger = screen.getByRole('button', { name: 'Menu' })
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})

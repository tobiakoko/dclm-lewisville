import { render, screen, within } from '@/__tests__/utils/test-utils'
import Footer from '@/components/layout/Footer'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress, telHref } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'

jest.mock('@/lib/analytics', () => ({
  trackSocialMediaClick: jest.fn(),
  trackNavigation: jest.fn(),
  trackExternalLink: jest.fn(),
}))

describe('Footer', () => {
  beforeEach(() => render(<Footer />))

  it('shows the church facts from SITE_CONFIG', () => {
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.phone })).toHaveAttribute('href', telHref(SITE_CONFIG.phone))
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.email })).toHaveAttribute('href', `mailto:${SITE_CONFIG.email}`)
    expect(within(footer).getByText(formatAddress(SITE_CONFIG.address))).toBeInTheDocument()
  })

  it('lists every weekly meeting', () => {
    for (const service of SERVICE_TIMES) {
      expect(screen.getByText(`${formatServiceTime(service)} — ${service.name}`)).toBeInTheDocument()
    }
  })

  it('shows social icons only for configured links', () => {
    expect(screen.getByRole('link', { name: 'Follow us on YouTube' })).toHaveAttribute('href', SITE_CONFIG.youtube.channel)
    expect(screen.queryByRole('link', { name: /Facebook/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Instagram/ })).not.toBeInTheDocument()
  })

  it('links only to routes that exist', () => {
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'))
    for (const missing of ['/privacy', '/terms', '/sitemap']) {
      expect(hrefs).not.toContain(missing)
    }
  })
})

import { render, screen, within } from '@/__tests__/utils/test-utils'
import Footer from '@/components/layout/Footer'
import { DCLM_RESOURCES, SITE_CONFIG, SERVICE_TIMES, formatAddress, telHref } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'

describe('Footer', () => {
  beforeEach(() => render(<Footer />))

  it('shows the church facts from SITE_CONFIG', () => {
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.phone })).toHaveAttribute('href', telHref(SITE_CONFIG.phone))
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.email })).toHaveAttribute('href', `mailto:${SITE_CONFIG.email}`)
    expect(within(footer).getByText(formatAddress(SITE_CONFIG.address))).toBeInTheDocument()
  })

  it('lists every weekly meeting with its day and time', () => {
    for (const service of SERVICE_TIMES) {
      const name = screen.getByText(service.name)
      expect(name.closest('li')).toHaveTextContent(`${service.day}, ${formatServiceTime(service)}`)
    }
  })

  it('shows social icons only for configured links', () => {
    expect(screen.getByRole('link', { name: 'Follow us on YouTube' })).toHaveAttribute('href', SITE_CONFIG.youtube.channel)
    expect(screen.queryByRole('link', { name: /Facebook/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Instagram/ })).not.toBeInTheDocument()
  })

  it('offers Contact, Prayer, Privacy and Terms in the same place on every page', () => {
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'Prayer requests' })).toHaveAttribute('href', '/contact#prayer')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute('href', '/terms')
  })

  it('lists the DCLM resources moved from the header', () => {
    for (const resource of DCLM_RESOURCES) {
      expect(screen.getByRole('link', { name: resource.name })).toHaveAttribute('href', resource.href)
    }
  })
})

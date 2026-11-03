import { render, screen, within } from '@/__tests__/utils/test-utils'
import Footer from '@/components/layout/Footer'
import { DCLM_RESOURCES, SITE_CONFIG, SERVICE_TIMES, formatAddress, telHref } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'

jest.mock('@/lib/data', () => {
  const constants = jest.requireActual('@/lib/constants')
  return {
    getSiteData: async () => ({ config: constants.SITE_CONFIG, schedule: constants.SERVICE_TIMES, exceptions: [], otherLocations: [] }),
  }
})

describe('Footer', () => {
  // Footer is an async Server Component: render the element it resolves to
  beforeEach(async () => render(await Footer()))

  it('shows the church facts from SITE_CONFIG', () => {
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.phone })).toHaveAttribute('href', telHref(SITE_CONFIG.phone))
    expect(within(footer).getByRole('link', { name: SITE_CONFIG.email })).toHaveAttribute('href', `mailto:${SITE_CONFIG.email}`)
    expect(within(footer).getByText(formatAddress(SITE_CONFIG.address))).toBeInTheDocument()
  })

  it('opens with the Sunday call to action, its time from the schedule', () => {
    expect(screen.getByText('We’d love to meet you this Sunday.')).toBeInTheDocument()
    expect(screen.getByText('Worship with us at 9:30 AM — in person on West Main Street, or online.')).toBeInTheDocument()
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getAllByRole('link', { name: 'Plan your visit' })[0]).toHaveAttribute('href', '/visit')
    expect(within(footer).getByRole('link', { name: 'Watch online' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
  })

  it('lists every weekly meeting under its day with its time', () => {
    for (const service of SERVICE_TIMES) {
      const day = screen.getByText(service.day, { selector: 'dt' })
      expect(day.nextElementSibling).toHaveTextContent(formatServiceTime(service))
    }
    expect(screen.getByText('All times Central')).toBeInTheDocument()
  })

  it('has no Sitemap link, because /sitemap is not a page', () => {
    expect(screen.queryByRole('link', { name: 'Sitemap' })).not.toBeInTheDocument()
  })

  it('shows social icons only for configured links', () => {
    expect(screen.getByRole('link', { name: 'Follow us on YouTube' })).toHaveAttribute('href', SITE_CONFIG.youtube.channel)
    expect(screen.queryByRole('link', { name: /Facebook/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Instagram/ })).not.toBeInTheDocument()
  })

  it('offers Contact, Prayer, Privacy and Terms in the same place on every page', () => {
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'Prayer requests' })).toHaveAttribute('href', '/contact?topic=prayer#contact-form')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute('href', '/terms')
  })

  it('lists the DCLM resources moved from the header', () => {
    for (const resource of DCLM_RESOURCES) {
      expect(screen.getByRole('link', { name: resource.name })).toHaveAttribute('href', resource.href)
    }
  })
})

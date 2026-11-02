import { render, screen, userEvent, act } from '@/__tests__/utils/test-utils'
import { ConsentBanner, CookieSettingsButton } from '@/components/consent/ConsentBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { CONSENT_STORAGE_KEY, gaMeasurementId, readConsent, writeConsent } from '@/lib/consent'

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: { id?: string; src?: string }) => <script data-testid={props.id ?? 'gtag-src'} data-src={props.src} />,
}))

beforeEach(() => window.localStorage.clear())

describe('gaMeasurementId', () => {
  it('is on only in production with a real measurement ID', () => {
    expect(gaMeasurementId({ NODE_ENV: 'production', NEXT_PUBLIC_GA_ID: 'G-ABC123XYZ' })).toBe('G-ABC123XYZ')
    expect(gaMeasurementId({ NODE_ENV: 'development', NEXT_PUBLIC_GA_ID: 'G-ABC123XYZ' })).toBeNull()
    expect(gaMeasurementId({ NODE_ENV: 'production', NEXT_PUBLIC_GA_ID: 'G-XXXXXXXXXX' })).toBe('G-XXXXXXXXXX')
    expect(gaMeasurementId({ NODE_ENV: 'production', NEXT_PUBLIC_GA_ID: '' })).toBeNull()
    expect(gaMeasurementId({ NODE_ENV: 'production', NEXT_PUBLIC_GA_ID: 'UA-1234-1' })).toBeNull()
  })
})

describe('consent storage', () => {
  it('reads only valid choices and can be cleared', () => {
    expect(readConsent()).toBeNull()
    writeConsent('granted')
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted')
    expect(readConsent()).toBe('granted')
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'maybe')
    expect(readConsent()).toBeNull()
    writeConsent(null)
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
  })
})

describe('ConsentBanner', () => {
  it('asks with the approved cookies sentence, a Privacy link and two equal choices', () => {
    render(<ConsentBanner />)
    const banner = screen.getByRole('region', { name: 'Analytics cookies' })
    expect(banner).toHaveTextContent('The site uses only the cookies it needs to work and to measure how it is used.')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    const accept = screen.getByRole('button', { name: 'Accept analytics cookies' })
    const decline = screen.getByRole('button', { name: 'Decline' })
    expect(accept.className).toBe(decline.className)
  })

  it.each([
    ['Accept analytics cookies', 'granted'],
    ['Decline', 'denied'],
  ])('remembers "%s" and goes away', async (button, stored) => {
    const user = userEvent.setup()
    render(<ConsentBanner />)
    await user.click(screen.getByRole('button', { name: button }))
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(stored)
    expect(screen.queryByRole('region', { name: 'Analytics cookies' })).not.toBeInTheDocument()
  })

  it('stays hidden once a choice is stored, until Cookie settings reopens it', async () => {
    writeConsent('denied')
    const user = userEvent.setup()
    render(
      <>
        <ConsentBanner />
        <CookieSettingsButton />
      </>
    )
    expect(screen.queryByRole('region', { name: 'Analytics cookies' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cookie settings' }))
    expect(screen.getByRole('region', { name: 'Analytics cookies' })).toBeInTheDocument()
  })
})

describe('GoogleAnalytics', () => {
  it('loads nothing until the visitor accepts, then loads gtag', () => {
    render(<GoogleAnalytics ga_id="G-ABC123XYZ" />)
    expect(screen.queryByTestId('gtag-src')).not.toBeInTheDocument()

    act(() => writeConsent('denied'))
    expect(screen.queryByTestId('gtag-src')).not.toBeInTheDocument()

    act(() => writeConsent('granted'))
    expect(screen.getByTestId('gtag-src')).toHaveAttribute('data-src', 'https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ')
    expect(screen.getByTestId('google-analytics')).toBeInTheDocument()
  })
})

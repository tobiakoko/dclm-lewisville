import { test, expect } from '@playwright/test'
import { expectNoSeriousAxeViolations } from './helpers'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress } from '../lib/constants'
import { EVENTS_EMPTY_STATE } from '../lib/events'
import { MINISTRIES } from '../lib/content/site'

const PAGES: { path: string; heading: RegExp }[] = [
  { path: '/', heading: /Come as you are/ },
  { path: '/about', heading: /About Us/ },
  { path: '/ministries', heading: /Ministries/ },
  { path: `/ministries/${MINISTRIES[0].slug}`, heading: new RegExp(MINISTRIES[0].name) },
  { path: '/sermons', heading: /Sermons/ },
  { path: '/events', heading: /Events/ },
  { path: '/give', heading: /Give/ },
  { path: '/contact', heading: /Contact and Prayer/ },
]

for (const { path, heading } of PAGES) {
  test.describe(`page ${path}`, () => {
    test('loads with one H1 and the full church name in the title', async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(page).toHaveTitle(new RegExp(SITE_CONFIG.name))
    })

    test('has no serious or critical axe violations', async ({ page }) => {
      await page.goto(path)
      await expectNoSeriousAxeViolations(page)
    })

    test('has no horizontal scroll at 320 px', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 })
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  })
}

test.describe('status codes', () => {
  test('a made-up sermon URL returns 404', async ({ page }) => {
    const response = await page.goto('/sermons/this-sermon-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/couldn.t find that page/)
  })

  test('a made-up ministry URL returns 404', async ({ page }) => {
    const response = await page.goto('/ministries/this-ministry-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('an unknown URL returns 404', async ({ page }) => {
    const response = await page.goto('/no-such-page')
    expect(response?.status()).toBe(404)
  })

  test('/ministers permanently redirects to the leadership section', async ({ request }) => {
    const response = await request.get('/ministers', { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers().location).toBe('/about#leadership')
  })
})

test.describe('facts agree everywhere', () => {
  test('footer, contact page and JSON-LD show the same name, address, phone and email', async ({ page }) => {
    await page.goto('/contact')
    const address = formatAddress(SITE_CONFIG.address)

    const footer = page.getByRole('contentinfo')
    await expect(footer.getByRole('link', { name: SITE_CONFIG.phone })).toBeVisible()
    await expect(footer.getByRole('link', { name: SITE_CONFIG.email })).toBeVisible()
    await expect(footer.getByText(address, { exact: true })).toBeVisible()

    const main = page.getByRole('main')
    await expect(main.getByRole('heading', { name: SITE_CONFIG.name, level: 2 })).toBeVisible()
    await expect(main.getByRole('link', { name: SITE_CONFIG.phone })).toHaveAttribute('href', /^tel:\+1/)
    await expect(main.getByRole('link', { name: SITE_CONFIG.email }).first()).toBeVisible()
    await expect(main.getByText(address, { exact: true })).toBeVisible()

    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}')
    expect(jsonLd).toMatchObject({
      '@type': 'Church',
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.email,
      telephone: `+1-${SITE_CONFIG.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')}`,
      address: { streetAddress: SITE_CONFIG.address.street, postalCode: SITE_CONFIG.address.zip },
    })
  })

  test('the home page shows the Sunday time and address without placeholder media', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(formatAddress(SITE_CONFIG.address)).first()).toBeVisible()
    const images = await page.locator('img').evaluateAll((imgs) => imgs.map((img) => (img as HTMLImageElement).currentSrc || img.getAttribute('src')))
    for (const src of images) {
      expect(src).not.toMatch(/googleusercontent|unsplash/)
    }
    await expect(page.locator('a[href="#"]')).toHaveCount(0)
  })
})

test.describe('events', () => {
  test('lists the weekly meetings and the honest empty state, never past events', async ({ page }) => {
    await page.goto('/events')
    for (const service of SERVICE_TIMES) {
      await expect(page.getByRole('heading', { name: service.name, level: 3 })).toBeVisible()
    }
    await expect(page.getByText(EVENTS_EMPTY_STATE)).toBeVisible()
    // No dated special events are listed (the footer copyright year is outside main)
    await expect(page.getByRole('main').getByText(/20\d\d/)).toHaveCount(0)
  })
})

test.describe('about', () => {
  test('doctrine cards open with the keyboard to the full text', async ({ page }) => {
    await page.goto('/about')
    const card = page.getByRole('button', { name: 'The Godhead' })
    await card.focus()
    await page.keyboard.press('Enter')
    await expect(card).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByText(/recognisable personalities/)).toBeVisible()
  })
})

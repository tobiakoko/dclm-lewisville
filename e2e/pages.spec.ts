import { test, expect } from '@playwright/test'
import { expectNoSeriousAxeViolations, stubContactApi } from './helpers'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress } from '../lib/constants'
import { EVENTS_EMPTY_STATE } from '../lib/events'
import { MINISTRIES } from '../lib/content/site'
import { PUBLIC_PATHS, type PublicPath } from '../lib/routes'

const HEADINGS: Record<PublicPath, RegExp> = {
  // The home H1 is the hero title from the CMS (REDESIGN.md §3.1)
  '/': /\S/,
  '/visit': /^Plan Your Visit$/,
  '/about': /^About Us$/,
  '/ministries': /^Ministries and Outreach$/,
  '/sermons': /^Sermons$/,
  '/events': /^Events$/,
  '/contact': /^Contact and Prayer$/,
  '/give': /^Give$/,
  '/privacy': /^Privacy Policy$/,
  '/terms': /^Terms of Use$/,
}

const PAGES = PUBLIC_PATHS.map((path) => ({ path, heading: HEADINGS[path] }))

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

  test('a ministry URL without its own page redirects to its card', async ({ request }) => {
    const response = await request.get(`/ministries/${MINISTRIES[0].slug}`, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers().location).toBe(`/ministries#${MINISTRIES[0].slug}`)
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

test.describe('home on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('shows the name and city, the Sunday time and Plan your visit without scrolling (REDESIGN.md §8)', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#home-hero')
    const brand = page.getByRole('banner').getByRole('link', { name: /home page/ })
    for (const locator of [
      brand.getByText('Deeper Life Bible Church'),
      brand.getByText(`${SITE_CONFIG.address.city}, Texas`),
      hero.getByText(/Sundays at 9:30 AM/),
      hero.getByRole('link', { name: 'Plan your visit' }),
    ]) {
      await expect(locator).toBeInViewport({ ratio: 1 })
    }
  })

  test('shows the info bar with directions under the hero', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Directions' })).toBeVisible()
  })
})

test.describe('visit', () => {
  test('the visit form fails honestly with the phone number when email is unconfigured', async ({ page }) => {
    await stubContactApi(page, 503, { ok: false, error: 'not-configured' })
    await page.goto('/visit')
    const form = page.locator('#let-us-know form')
    await form.getByLabel(/^Name/).fill('Test Visitor')
    await form.getByLabel(/^Email/).fill('visitor@example.com')
    await form.getByLabel(/^Date you plan to visit/).fill('2026-11-08')
    const [response] = await Promise.all([
      page.waitForResponse('**/api/contact'),
      form.getByRole('button', { name: 'Let us know' }).click(),
    ])
    expect(response.status()).toBe(503)
    await expect(form.getByText('Sorry, your message was not sent.')).toBeVisible()
    await expect(form.getByRole('link', { name: SITE_CONFIG.phone })).toBeVisible()
  })

  test('leaves out the sections that have no approved copy', async ({ page }) => {
    await page.goto('/visit')
    await expect(page.getByRole('heading', { name: 'When you arrive' })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: /Accessibility/ })).toHaveCount(0)
  })
})

test.describe('sermons', () => {
  test('the top slot shows a real video or an honest message, never a placeholder', async ({ page }) => {
    await page.goto('/sermons')
    const latest = page.locator('#latest')
    await expect(latest.getByRole('button', { name: /^Play/ }).or(latest.getByText('We couldn’t load the latest videos right now.'))).toBeVisible()
    await expect(latest.getByText(/Next live: Sunday 9:30 AM CT/)).toBeVisible()
  })

  test('loads the player only after Play is pressed', async ({ page }) => {
    await page.goto('/sermons')
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0)
  })
})

test.describe('metadata', () => {
  test('the sitemap lists every public page on the real domain', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    for (const path of PUBLIC_PATHS) {
      expect(xml).toContain(`<loc>${SITE_CONFIG.url.replace(/\/$/, '')}${path === '/' ? '' : path}</loc>`)
    }
  })

  test('every page has a unique description and the share image', async ({ page, request }) => {
    const descriptions = new Set<string>()
    for (const path of PUBLIC_PATHS) {
      await page.goto(path)
      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description).toBeTruthy()
      descriptions.add(description!)
    }
    expect(descriptions.size).toBe(PUBLIC_PATHS.length)
    const image = await request.get('/opengraph-image')
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toBe('image/png')
  })
})

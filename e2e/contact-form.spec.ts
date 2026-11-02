import { test, expect, type Page } from '@playwright/test'
import { SITE_CONFIG } from '../lib/constants'

// playwright.config.ts starts the test server without CONTACT_INBOX/CONTACT_FROM, so the real
// API answers 503 (not configured) and no email is ever sent from e2e runs.

function contactForm(page: Page) {
  return page.locator('#contact-form form')
}

async function fill(form: ReturnType<typeof contactForm>) {
  await form.getByLabel(/^Name/).fill('Adébáyọ̀ Test')
  await form.getByLabel(/^Email/).fill('visitor@example.com')
  await form.getByLabel(/^Message/).fill('This is a test message from end-to-end testing.')
}

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('has labelled fields', async ({ page }) => {
    const form = contactForm(page)
    await expect(form.getByLabel(/^Name/)).toBeVisible()
    await expect(form.getByLabel(/^Email/)).toBeVisible()
    await expect(form.getByLabel(/^Phone/)).toBeVisible()
    await expect(form.getByLabel(/^Message/)).toBeVisible()
  })

  test('shows inline errors and does not submit an empty form', async ({ page }) => {
    let requests = 0
    page.on('request', (request) => {
      if (request.url().endsWith('/api/contact')) requests++
    })
    const form = contactForm(page)
    await form.getByRole('button', { name: 'Send message' }).click()
    await expect(form.getByLabel(/^Name/)).toHaveAttribute('aria-invalid', 'true')
    await expect(form.getByText('Invalid email address')).toBeVisible()
    expect(requests).toBe(0)
  })

  test('with email unconfigured, says the message was not sent and shows the phone number', async ({ page }) => {
    const form = contactForm(page)
    await fill(form)
    const [response] = await Promise.all([
      page.waitForResponse('**/api/contact'),
      form.getByRole('button', { name: 'Send message' }).click(),
    ])
    expect(response.status()).toBe(503)
    await expect(form.getByText('Sorry, your message was not sent.')).toBeVisible()
    await expect(form.getByRole('link', { name: SITE_CONFIG.phone })).toBeVisible()
  })

  test('confirms only after the API reports success', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
    )
    const form = contactForm(page)
    await fill(form)
    await form.getByRole('button', { name: 'Send message' }).click()
    await expect(form.getByText('Thank you. Your message has been sent to the church.')).toBeVisible()
  })

  test('a ministry link preselects the ministry', async ({ page }) => {
    await page.goto('/contact?topic=Youth%20Ministry')
    await expect(contactForm(page).getByText('Youth Ministry')).toBeVisible()
  })

  test('the API refuses a foreign origin', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: { origin: 'https://evil.example.net' },
      data: { name: 'Test Visitor', email: 'visitor@example.com', message: 'Hello from elsewhere.' },
    })
    expect(response.status()).toBe(403)
  })
})

test.describe('Prayer request form', () => {
  test('links the DCLM Prayer Request Hub as a second option', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('link', { name: 'DCLM Prayer Request Hub' })).toHaveAttribute('href', SITE_CONFIG.dclm.prayerRequestHub)
    await expect(page.locator('#prayer form').getByLabel(/^Prayer request/)).toBeVisible()
  })
})

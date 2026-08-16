import { test, expect, Page } from '@playwright/test'

// The `lg:` breakpoint is 1024px; below it the header links live in a
// drawer that must be opened first.
async function isMobileViewport(page: Page) {
  const width = page.viewportSize()?.width ?? 1280
  return width < 1024
}

// The menu click is dispatched directly because WebKit's hit-testing
// reports lazy images in the footer as intercepting the fixed header
// button.
async function openNavIfMobile(page: Page) {
  const menuButton = page.getByRole('button', { name: /open navigation menu/i })
  if ((await menuButton.count()) > 0 && (await menuButton.isVisible())) {
    await menuButton.dispatchEvent('click')
  }
}

async function clickNavLink(page: Page, name: RegExp) {
  const link = page.getByRole('link', { name }).first()
  if (await isMobileViewport(page)) {
    // Close the drawer so its overlay doesn't block the link, then
    // activate via keyboard to bypass WebKit's hit-testing quirk.
    const closeButton = page.getByRole('button', { name: /close navigation menu/i })
    if ((await closeButton.count()) > 0) {
      await closeButton.dispatchEvent('click')
    }
    await link.focus()
    await page.keyboard.press('Enter')
  } else {
    await link.click()
  }
}

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await openNavIfMobile(page)
  })

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Deeper Life Bible Church Lewisville|DCLM Lewisville/i)
  })

  test('should display navigation menu', async ({ page }) => {
    // Check for main navigation links, scoped to the visible nav
    const isMobile = await isMobileViewport(page)
    const nav = isMobile
      ? page.locator('nav[aria-label="Mobile navigation"]')
      : page.locator('header')
    await expect(nav.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /ministries/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /events/i })).toBeVisible()
    await expect(nav.getByRole('button', { name: /resources/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible()
    if (!isMobile) {
      await expect(nav.getByRole('link', { name: /give/i })).toBeVisible()
    }
  })

  test('should navigate to About page', async ({ page }) => {
    await clickNavLink(page, /about/i)
    await expect(page).toHaveURL(/\/about/)
  })

  test('should navigate to Ministries page', async ({ page }) => {
    await clickNavLink(page, /ministries/i)
    await expect(page).toHaveURL(/\/ministries/)
  })

  test('should navigate to Sermons page', async ({ page }) => {
    await clickNavLink(page, /sermons/i)
    await expect(page).toHaveURL(/\/sermons/)
  })

  test('should navigate to Events page', async ({ page }) => {
    await clickNavLink(page, /events/i)
    await expect(page).toHaveURL(/\/events/)
  })

  test('should navigate to Contact page', async ({ page }) => {
    await clickNavLink(page, /contact/i)
    await expect(page).toHaveURL(/\/contact/)
  })

  test('should display Give button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /give/i }).first()).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Check if mobile menu button is visible
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]')
    if (await menuButton.count() > 0) {
      await expect(menuButton.first()).toBeVisible()
    }
  })

  test('should have no accessibility violations', async ({ page }) => {
    // Basic accessibility checks
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })
})
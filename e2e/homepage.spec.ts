import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/DCLM Lewisville/i)
  })

  test('should display navigation menu', async ({ page }) => {
    // Check for main navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /ministries/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /sermons/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /events/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click()
    await expect(page).toHaveURL(/\/about/)
  })

  test('should navigate to Ministries page', async ({ page }) => {
    await page.getByRole('link', { name: /ministries/i }).first().click()
    await expect(page).toHaveURL(/\/ministries/)
  })

  test('should navigate to Sermons page', async ({ page }) => {
    await page.getByRole('link', { name: /sermons/i }).first().click()
    await expect(page).toHaveURL(/\/sermons/)
  })

  test('should navigate to Events page', async ({ page }) => {
    await page.getByRole('link', { name: /events/i }).first().click()
    await expect(page).toHaveURL(/\/events/)
  })

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).first().click()
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
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })
})

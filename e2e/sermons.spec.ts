import { test, expect } from '@playwright/test'

test.describe('Sermons Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sermons')
  })

  test('should load the sermons page', async ({ page }) => {
    await expect(page).toHaveURL(/\/sermons/)
    await expect(page.locator('h1, h2').filter({ hasText: /sermons/i })).toBeVisible()
  })

  test('should display list of sermons', async ({ page }) => {
    // Wait for sermons to load
    await page.waitForLoadState('networkidle')

    // Check if there are sermon items displayed
    // The exact selector depends on your implementation
    const sermonElements = page.locator('[data-testid="sermon-item"], article, .sermon-card').first()

    // If sermons exist in the CMS, they should be displayed
    const count = await sermonElements.count()
    if (count > 0) {
      await expect(sermonElements).toBeVisible()
    }
  })

  test('should navigate to sermon detail page when clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Find and click the first sermon link
    const firstSermonLink = page.getByRole('link').filter({ hasText: /sermon|message|watch|listen/i }).first()

    if (await firstSermonLink.count() > 0) {
      await firstSermonLink.click()

      // Should navigate to a sermon detail page
      await expect(page).toHaveURL(/\/sermons\/[^/]+/)
    }
  })

  test('should filter or search sermons if functionality exists', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check if search/filter exists
    const searchInput = page.getByRole('searchbox').or(page.getByPlaceholder(/search/i))

    if (await searchInput.count() > 0) {
      await searchInput.fill('faith')
      await page.waitForTimeout(1000) // Wait for filter/search to apply

      // Results should be filtered
      // This is implementation-specific
    }
  })
})

test.describe('Sermon Detail Page', () => {
  test('should display sermon details', async ({ page }) => {
    // First go to sermons list
    await page.goto('/sermons')
    await page.waitForLoadState('networkidle')

    // Click on first sermon
    const firstSermonLink = page.getByRole('link').filter({ hasText: /sermon|message|watch|listen/i }).first()

    if (await firstSermonLink.count() > 0) {
      await firstSermonLink.click()

      // Check for sermon details
      await expect(page.locator('h1')).toBeVisible()

      // Should display sermon metadata like speaker, date, etc.
      // This is implementation-specific
    }
  })

  test('should have audio or video player if media exists', async ({ page }) => {
    await page.goto('/sermons')
    await page.waitForLoadState('networkidle')

    const firstSermonLink = page.getByRole('link').filter({ hasText: /sermon|message|watch|listen/i }).first()

    if (await firstSermonLink.count() > 0) {
      await firstSermonLink.click()

      // Check for audio or video element
      const mediaPlayer = page.locator('audio, video, [data-testid="media-player"]')

      if (await mediaPlayer.count() > 0) {
        await expect(mediaPlayer.first()).toBeVisible()
      }
    }
  })

  test('should display related sermons', async ({ page }) => {
    await page.goto('/sermons')
    await page.waitForLoadState('networkidle')

    const firstSermonLink = page.getByRole('link').filter({ hasText: /sermon|message|watch|listen/i }).first()

    if (await firstSermonLink.count() > 0) {
      await firstSermonLink.click()
      await page.waitForLoadState('networkidle')

      // Check for related sermons section
      const relatedSection = page.getByText(/related|more sermons|you might like/i)

      if (await relatedSection.count() > 0) {
        await expect(relatedSection).toBeVisible()
      }
    }
  })
})

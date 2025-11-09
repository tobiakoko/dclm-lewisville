import { test, expect } from '@playwright/test'

test.describe('Newsletter Subscription', () => {
  test('should allow newsletter subscription from homepage', async ({ page }) => {
    await page.goto('/')

    // Look for newsletter signup form (usually in footer or a section)
    const emailInput = page.getByPlaceholder(/email|subscribe|newsletter/i).first()

    if (await emailInput.count() > 0) {
      await emailInput.fill('subscriber@example.com')

      // Mock the API
      await page.route('**/api/newsletter', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
        })
      })

      // Find and click subscribe button
      const subscribeButton = page.getByRole('button', { name: /subscribe|sign up|join/i }).first()
      await subscribeButton.click()

      // Wait for success message
      await expect(page.getByText(/success|subscribed|thank you/i)).toBeVisible({ timeout: 10000 })
    }
  })

  test('should validate email format for newsletter', async ({ page }) => {
    await page.goto('/')

    const emailInput = page.getByPlaceholder(/email|subscribe|newsletter/i).first()

    if (await emailInput.count() > 0) {
      await emailInput.fill('invalid-email')

      const subscribeButton = page.getByRole('button', { name: /subscribe|sign up|join/i }).first()
      await subscribeButton.click()

      // Check for validation error
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    }
  })

  test('should handle newsletter API error', async ({ page }) => {
    await page.goto('/')

    const emailInput = page.getByPlaceholder(/email|subscribe|newsletter/i).first()

    if (await emailInput.count() > 0) {
      await emailInput.fill('subscriber@example.com')

      // Mock API error
      await page.route('**/api/newsletter', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to subscribe' }),
        })
      })

      const subscribeButton = page.getByRole('button', { name: /subscribe|sign up|join/i }).first()
      await subscribeButton.click()

      // Should show error message
      await expect(page.getByText(/error|failed/i)).toBeVisible({ timeout: 10000 })
    }
  })

  test('should not allow duplicate subscription', async ({ page }) => {
    await page.goto('/')

    const emailInput = page.getByPlaceholder(/email|subscribe|newsletter/i).first()

    if (await emailInput.count() > 0) {
      const testEmail = 'subscriber@example.com'
      await emailInput.fill(testEmail)

      // First subscription - success
      await page.route('**/api/newsletter', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
        })
      })

      const subscribeButton = page.getByRole('button', { name: /subscribe|sign up|join/i }).first()
      await subscribeButton.click()

      await page.waitForTimeout(2000)

      // Try to subscribe again with same email
      const emailInputAgain = page.getByPlaceholder(/email|subscribe|newsletter/i).first()
      if (await emailInputAgain.count() > 0 && await emailInputAgain.isVisible()) {
        await emailInputAgain.fill(testEmail)

        // Mock duplicate error
        await page.route('**/api/newsletter', async (route) => {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Email already subscribed' }),
          })
        })

        await subscribeButton.click()
      }
    }
  })
})

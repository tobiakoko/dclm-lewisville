import { test, expect, type Page } from '@playwright/test'
import { isMobileViewport } from './helpers'

// The menu click is dispatched directly because WebKit's hit-testing reports
// lazy images in the footer as intercepting the fixed header button.
async function openMobileNav(page: Page) {
  await page.getByRole('button', { name: 'Open navigation menu' }).dispatchEvent('click')
}

async function closeMobileNav(page: Page) {
  await page.getByRole('button', { name: 'Close navigation menu' }).dispatchEvent('click')
}

function navigation(page: Page) {
  return isMobileViewport(page) ? page.locator('nav[aria-label="Mobile navigation"]') : page.locator('header nav').first()
}

async function followNavLink(page: Page, name: string) {
  const link = navigation(page).getByRole('link', { name, exact: true })
  if (isMobileViewport(page)) {
    // Close the drawer so its overlay doesn't block the link, then use the keyboard
    // to avoid WebKit's hit-testing quirk.
    await closeMobileNav(page)
    await link.focus()
    await page.keyboard.press('Enter')
  } else {
    await link.click()
  }
}

test.describe('Home page navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    if (isMobileViewport(page)) await openMobileNav(page)
  })

  test('shows the main navigation links', async ({ page }) => {
    const nav = navigation(page)
    for (const name of ['Home', 'About', 'Ministries', 'Sermons', 'Events', 'Contact']) {
      await expect(nav.getByRole('link', { name, exact: true })).toBeVisible()
    }
    await expect(nav.getByRole('button', { name: /Resources/ })).toBeVisible()
  })

  for (const [name, path] of [
    ['About', '/about'],
    ['Ministries', '/ministries'],
    ['Sermons', '/sermons'],
    ['Events', '/events'],
    ['Contact', '/contact'],
  ] as const) {
    test(`goes to ${name}`, async ({ page }) => {
      await followNavLink(page, name)
      await expect(page).toHaveURL(new RegExp(`${path}$`))
    })
  }

  test('offers a Give link', async ({ page }) => {
    await expect(page.getByRole('link', { name: /give/i }).first()).toBeVisible()
  })
})

test.describe('Home page content', () => {
  test('shows the three main actions', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    await expect(hero.getByRole('link', { name: 'Plan your visit' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Watch online' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'What we believe' })).toBeVisible()
  })

  test('has exactly one welcome section, the Pastor’s Welcome', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Welcome to Deeper Life Bible Church Lewisville' })).toHaveCount(1)
    await expect(page.getByText(/lost in the crowd/)).toBeVisible()
  })

  test('shows the menu button on phones', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible()
  })
})

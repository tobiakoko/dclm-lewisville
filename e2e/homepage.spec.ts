import { test, expect, type Page } from '@playwright/test'
import { expectNoSeriousAxeViolations, isMobileViewport } from './helpers'
import { GIVE_LINK, NAV_LINKS, SITE_CONFIG } from '../lib/constants'

function mainNav(page: Page) {
  return isMobileViewport(page) ? page.getByRole('dialog').getByRole('navigation', { name: 'Main' }) : page.getByRole('banner').getByRole('navigation', { name: 'Main' })
}

async function openMenuIfMobile(page: Page) {
  if (isMobileViewport(page)) await page.getByRole('button', { name: 'Menu' }).click()
}

test.describe('Header navigation', () => {
  test('shows every main link and Give', async ({ page }) => {
    await page.goto('/')
    await openMenuIfMobile(page)
    const nav = mainNav(page)
    for (const link of NAV_LINKS) {
      await expect(nav.getByRole('link', { name: link.name, exact: true })).toBeVisible()
    }
    const give = isMobileViewport(page) ? page.getByRole('dialog') : page.getByRole('banner')
    await expect(give.getByRole('link', { name: GIVE_LINK.name, exact: true })).toBeVisible()
  })

  for (const link of NAV_LINKS) {
    test(`goes to ${link.name}`, async ({ page }) => {
      await page.goto('/')
      await openMenuIfMobile(page)
      await mainNav(page).getByRole('link', { name: link.name, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${link.href}$`))
      await expect(page.getByRole('dialog')).toHaveCount(0)
    })
  }
})

test.describe('Header tones (REDESIGN.md §2)', () => {
  test('overlays the home hero, then turns into the light header once the hero scrolls away', async ({ page }) => {
    await page.goto('/')
    const header = page.getByRole('banner')
    await expect(header).toHaveAttribute('data-tone', 'overlay')
    await expectNoSeriousAxeViolations(page)

    await page.locator('#times').scrollIntoViewIfNeeded()
    await expect(header).toHaveAttribute('data-tone', 'light')
    await expect(header).toBeInViewport()
    await expectNoSeriousAxeViolations(page)
  })

  test('is light on inner pages', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('banner')).toHaveAttribute('data-tone', 'light')
  })

  test('the skip link works over the overlay header', async ({ page }) => {
    await page.goto('/')
    // WebKit doesn't Tab to links by default, so focus the skip link directly
    const skip = page.getByRole('link', { name: 'Skip to main content' })
    await skip.focus()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('shows "Watch online" without a live dot unless the stream is live', async ({ page }) => {
    await page.route('**/api/live', (route) => route.fulfill({ json: { live: false } }))
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/about')
    await expect(page.getByRole('banner').getByRole('link', { name: 'Watch online' })).toBeVisible()
    await expect(page.getByRole('banner').getByText('Watch live')).toHaveCount(0)
  })

  test('shows "Watch live" while the stream is live', async ({ page }) => {
    await page.route('**/api/live', (route) => route.fulfill({ json: { live: true } }))
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/about')
    await expect(page.getByRole('banner').getByRole('link', { name: 'Watch live' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
  })
})

test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 375, height: 700 } })

  test('opens and closes with the keyboard, traps focus and passes axe while open', async ({ page }) => {
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Menu' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible()
    await expect(dialog.getByRole('link', { name: SITE_CONFIG.phone })).toBeVisible()
    await expectNoSeriousAxeViolations(page)

    // Focus stays inside the dialog
    for (let i = 0; i < 16; i++) await page.keyboard.press('Tab')
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })
})

test.describe('Home page content', () => {
  test('shows the main actions in the hero', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#home-hero')
    await expect(hero.getByRole('link', { name: 'Plan your visit' })).toHaveAttribute('href', '/visit')
    await expect(hero.getByRole('link', { name: 'Watch online' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
    await expect(page.getByRole('main').getByRole('link', { name: 'What we believe' })).toHaveAttribute('href', '/about#beliefs')
  })

  test('has exactly one welcome section, the Pastor’s Welcome, in full', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Welcome to Deeper Life Bible Church Lewisville' })).toHaveCount(1)
    await expect(page.getByText(/We look forward to welcoming you/)).toBeVisible()
  })

  test('keeps sections in the planned order (REDESIGN.md §3)', async ({ page }) => {
    await page.goto('/')
    const headings = await page.getByRole('main').getByRole('heading', { level: 2 }).allTextContents()
    expect(headings[0]).toBe('When we meet')
    expect(headings[1]).toBe('Welcome to Deeper Life Bible Church Lewisville')
    expect(headings[2]).toBe('What to expect')
    expect(headings[3]).toBe('Latest message')
    // The testimony heading is the document's own title
    expect(headings.slice(-2)).toEqual(['The Bible Verse We Live By', 'Find your place to grow'])
  })
})

import { test, expect, type Page } from '@playwright/test'
import { isMobileViewport } from './helpers'
import { NAV_LINKS } from '../lib/constants'

function mainNav(page: Page) {
  return isMobileViewport(page) ? page.getByRole('dialog').getByRole('navigation', { name: 'Main' }) : page.locator('header').getByRole('navigation', { name: 'Main' })
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
    await expect(nav.getByRole('link', { name: 'Give', exact: true })).toBeVisible()
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

test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 375, height: 700 } })

  test('opens and closes with the keyboard and traps focus while open', async ({ page }) => {
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Menu' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible()

    // Focus stays inside the dialog
    for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })
})

test.describe('Home page content', () => {
  test('shows the three main actions', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    await expect(hero.getByRole('link', { name: 'Plan your visit' })).toHaveAttribute('href', '/visit')
    await expect(hero.getByRole('link', { name: 'Watch online' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'What we believe' })).toHaveAttribute('href', '/about#beliefs')
  })

  test('has exactly one welcome section, the Pastor’s Welcome', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Welcome to Deeper Life Bible Church Lewisville' })).toHaveCount(1)
    await expect(page.getByText(/lost in the crowd/)).toBeVisible()
  })

  test('keeps sections in the planned order', async ({ page }) => {
    await page.goto('/')
    const headings = await page.getByRole('main').getByRole('heading', { level: 2 }).allTextContents()
    expect(headings).toEqual([
      'When we meet',
      'What to expect',
      'Welcome to Deeper Life Bible Church Lewisville',
      'Latest message',
      'Testimony',
      'The Bible Verse We Live By',
      'Ministries',
    ])
  })
})

import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'
import { PUBLIC_PATHS } from '@/lib/routes'

const LABEL = process.env.REDESIGN_SNAPSHOT
const OUT = path.join(process.cwd(), 'docs/build', `redesign-${LABEL}`)
const WIDTHS = [390, 1440] as const
// Every public page plus the 404 page (REDESIGN.md Coverage table)
const PAGES = [...PUBLIC_PATHS, '/no-such-page'] as const

function slug(pathname: string): string {
  return pathname === '/' ? 'home' : pathname.slice(1).replaceAll('/', '-')
}

test.beforeAll(() => {
  expect(LABEL, 'set REDESIGN_SNAPSHOT to "before" or "after"').toMatch(/^(before|after)$/)
  mkdirSync(path.join(OUT, 'text'), { recursive: true })
  mkdirSync(path.join(OUT, 'screens'), { recursive: true })
})

for (const pathname of PAGES) {
  for (const width of WIDTHS) {
    test(`${pathname} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(pathname)
      // Scroll through once so lazy images load before the full-page screenshot
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y)
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForLoadState('networkidle')

      const text = await page.locator('main').innerText()
      expect(text.trim().length).toBeGreaterThan(0)
      writeFileSync(path.join(OUT, 'text', `${slug(pathname)}-${width}.txt`), `${text.trim()}\n`)
      await page.screenshot({ path: path.join(OUT, 'screens', `${slug(pathname)}-${width}.png`), fullPage: true })
    })
  }
}

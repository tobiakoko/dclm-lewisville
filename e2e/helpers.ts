import { expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/** The `nav:` breakpoint is 1100px; below it the header links live in a drawer */
export function isMobileViewport(page: Page): boolean {
  return (page.viewportSize()?.width ?? 1280) < 1100
}

/** Zero serious or critical axe violations (DESIGN-SYSTEM.md accessibility checklist) */
export async function expectNoSeriousAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  const serious = results.violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.slice(0, 5).map((node) => node.target.join(' ')),
    }))
  expect(serious).toEqual([])
}

/**
 * Answer /api/contact in the browser so e2e runs never send real email, whatever .env.local
 * holds. The API's own outcomes are unit-tested in __tests__/api and __tests__/lib/contact.
 */
export async function stubContactApi(page: Page, status: number, body: object = { ok: status === 200 }) {
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
  )
}

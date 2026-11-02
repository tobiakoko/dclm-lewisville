import { expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/** The `lg:` breakpoint is 1024px; below it the header links live in a drawer */
export function isMobileViewport(page: Page): boolean {
  return (page.viewportSize()?.width ?? 1280) < 1024
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

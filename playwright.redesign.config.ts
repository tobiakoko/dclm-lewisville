import { defineConfig, devices } from '@playwright/test'
import base from './playwright.config'

/**
 * Phase 4 snapshots (BUILD-PLAN.md 4.0 and Gate 4): saves each page's visible `main` text and
 * full-page screenshots at 390 and 1440 px. Run with `npm run redesign:capture -- before|after`.
 */
export default defineConfig({
  ...base,
  testDir: './e2e/redesign',
  testIgnore: [],
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: { ...base.use, baseURL: 'http://localhost:3100' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Always a fresh build of the current code on its own port, never a server left running
  webServer: {
    command: 'npm run build && npm run start -- -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: false,
    timeout: 300 * 1000,
    env: { SANITY_DEV_FALLBACK: 'true' },
  },
})

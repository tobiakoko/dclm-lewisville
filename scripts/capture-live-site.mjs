import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = 'https://dclm-lewisville.vercel.app'
const OUTPUT = 'artifacts/site-captures'
const routes = [
  ['home', '/'],
  ['visit', '/visit'],
  ['events', '/events'],
  ['sermons', '/sermons'],
  ['ministries', '/ministries'],
]
const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, mobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, mobile: true },
]
await fs.mkdir(OUTPUT, { recursive: true })
const browser = await chromium.launch({ headless: true })
const record = []

try {
  for (const profile of profiles) {
    const context = await browser.newContext({
      viewport: profile.viewport,
      deviceScaleFactor: 2,
      isMobile: profile.mobile,
      hasTouch: profile.mobile,
      locale: 'en-US',
      colorScheme: 'light',
      reducedMotion: 'reduce',
    })
    for (const [slug, route] of routes) {
      const page = await context.newPage()
      const url = ROOT + route
      const entry = { slug, profile: profile.name, url, viewport: profile.viewport }
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
        entry.httpStatus = response?.status() ?? null
        entry.title = await page.title()
        if (!response || response.status() >= 400) throw new Error('HTTP ' + entry.httpStatus)
        await page.evaluate(async () => {
          await document.fonts.ready
          await Promise.race([
            Promise.all([...document.images].map(img => {
              if (img.complete) return Promise.resolve()
              return new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true })
                img.addEventListener('error', resolve, { once: true })
              })
            })),
            new Promise(resolve => setTimeout(resolve, 8000))
          ])
        })
        await page.waitForTimeout(1200)
        const height = await page.evaluate(() => document.documentElement.scrollHeight)
        const stride = Math.round(profile.viewport.height * 0.8)
        for (let y = 0; y < height; y += stride) {
          await page.evaluate(y => window.scrollTo(0, y), y)
          await page.waitForTimeout(110)
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(650)
        const stem = path.join(OUTPUT, slug + '-' + profile.name)
        await page.screenshot({ path: stem + '-viewport.png', animations: 'disabled', caret: 'hide', scale: 'device' })
        await page.screenshot({ path: stem + '-full.png', fullPage: true, animations: 'disabled', caret: 'hide', scale: 'css' })
        entry.success = true
        entry.documentHeight = height
      } catch (error) {
        entry.success = false
        entry.error = String(error)
      }
      record.push(entry)
      console.log(JSON.stringify(entry))
      await page.close()
    }
    await context.close()
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(OUTPUT, 'capture-metadata.json'), JSON.stringify({
    capturedAt: new Date().toISOString(),
    sourceCommit: process.env.GITHUB_SHA ?? null,
    baseUrl: ROOT,
    recording: record,
    note: 'Browser renders of the production Vercel URL; not design mockups. Viewport exports use 2x device resolution; full-page exports use CSS resolution.'
  }, null, 2))
}
if (record.every(e => !e.success)) process.exitCode = 1

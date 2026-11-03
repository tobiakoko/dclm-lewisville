/**
 * @jest-environment node
 *
 * CLAUDE.md rules 1, 3 and 4: wrong, invented or placeholder facts must not come back.
 * Facts live only in lib/constants.ts; this scans app/, components/ and lib/ for known-bad strings.
 */
import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress } from '@/lib/constants'
import { PRIVACY_POLICY } from '@/lib/content/site'

const ROOT = process.cwd()
const SCANNED = ['app', 'components', 'lib']

const FORBIDDEN: [string, string][] = [
  ['665-9972', 'old, wrong phone number'],
  ['dclmlewisville', 'old domain and social handles'],
  ['123 Church Street', 'placeholder address'],
  ['123-456-7890', 'placeholder phone number'],
  ['Revival Service', 'Friday is "Revival Hour"'],
  ['dQw4w9WgXcQ', 'sample YouTube video'],
  ['John Doe', 'placeholder person'],
  ['lh3.googleusercontent.com', 'design-tool or AI image'],
  ['images.unsplash.com', 'stock image'],
  ['@gmail.com', 'personal email address'],
  ['DCLM Lewisville', 'use the full church name'],
  ['Active Groups', 'unsupported statistic'],
]

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) return files(full)
    return /\.(tsx?|jsx?|mjs|css)$/.test(entry) ? [full] : []
  })
}

const sources = SCANNED.flatMap((dir) => files(path.join(ROOT, dir))).map((file) => ({
  file: path.relative(ROOT, file),
  text: readFileSync(file, 'utf8'),
}))

describe('no wrong or placeholder facts in the code', () => {
  it('scans a meaningful number of files', () => {
    expect(sources.length).toBeGreaterThan(30)
  })

  it.each(FORBIDDEN)('"%s" (%s) does not appear', (needle) => {
    const hits = sources.filter((source) => source.text.includes(needle)).map((source) => source.file)
    expect(hits).toEqual([])
  })

  it('has no "#" placeholder links', () => {
    const hits = sources.filter((source) => /href=["']#["']|url:\s*["']#["']/.test(source.text)).map((s) => s.file)
    expect(hits).toEqual([])
  })

  it('writes the phone number only in lib/constants.ts (generated church copy aside)', () => {
    const digits = SITE_CONFIG.phone.replace(/\D/g, '')
    const pattern = new RegExp(digits.replace(/^(\d{3})(\d{3})(\d{4})$/, '\\(?$1\\)?[\\s.-]?$2[\\s.-]?$3'))
    const hits = sources
      .filter((source) => !source.file.endsWith('.generated.ts'))
      .filter((source) => pattern.test(source.text))
      .map((source) => source.file)
    expect(hits).toEqual(['lib/constants.ts'])
  })

  it('agrees with the contact line in the approved Privacy Policy', () => {
    expect(PRIVACY_POLICY.contactLine).toBe(
      `Contact. ${SITE_CONFIG.name}, ${formatAddress(SITE_CONFIG.address)} · ${SITE_CONFIG.phone} · ${SITE_CONFIG.email}`
    )
  })
})

describe('branch facts (SITE-CONTENT.md §1-2)', () => {
  it('uses the real phone, domain and email', () => {
    expect(SITE_CONFIG.phone).toBe('(469) 939-6994')
    expect(SITE_CONFIG.email).toBe('info@deeperlifelewisville.org')
    expect(new URL(SITE_CONFIG.url).hostname).toMatch(/deeperlifelewisville\.org$|localhost$/)
  })

  it('hides Facebook and Instagram until the church provides links', () => {
    expect(SITE_CONFIG.socialMedia).toEqual({ facebook: null, instagram: null })
  })

  it('has the five weekly meetings with their modes', () => {
    expect(SERVICE_TIMES.map((s) => [s.day, s.name, s.start, s.end, s.mode])).toEqual([
      ['Sunday', 'Sunday Prayer', '09:00', null, 'online'],
      ['Sunday', 'Sunday Worship Service', '09:30', '12:00', 'both'],
      ['Monday', 'Monday Prayer Meeting', '19:00', '20:00', 'online'],
      ['Tuesday', 'Tuesday Bible Study', '19:00', '21:00', 'both'],
      ['Friday', 'Friday Revival Hour', '19:00', '21:00', 'both'],
    ])
  })

  it('uses only the Zoom link in SITE-CONTENT.md §1 for the online meetings', () => {
    const siteContent = readFileSync(path.join(ROOT, 'docs/build/SITE-CONTENT.md'), 'utf8')
    const zoom = /^\| Zoom \(online prayer and midweek services\) \| (https:\/\/\S+) /m.exec(siteContent)?.[1]
    expect(zoom).toMatch(/^https:\/\/[a-z]+\.zoom\.us\/j\//)
    for (const service of SERVICE_TIMES.filter((s) => s.id !== 'sunday-worship')) {
      expect(service.joinUrl).toBe(zoom)
    }
  })
})

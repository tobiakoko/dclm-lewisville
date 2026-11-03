/**
 * Brings an existing dataset up to the Phase 4 content (BUILD-PLAN 4.18, REDESIGN.md §6–7)
 * without overwriting edits made in the Studio:
 *
 * - homePage hero title and sentence: the §7 text, only while they still hold the old seeded text
 * - visitPage, aboutPage, givePage: the new page-header fields, only where empty
 * - siteSettings schedule: the Zoom join link on the online meetings, only where empty
 * - "([Zoom link to come])" becomes "(on Zoom)" in the Home and Plan Your Visit text
 *
 *   npm run content:redesign -- --dataset staging              # print what would change
 *   SANITY_WRITE_TOKEN=… npm run content:redesign -- --dataset staging --apply
 *
 * The token is read from the environment only; never commit it.
 */
import { createClient, type SanityClient } from '@sanity/client'
import { SERVICE_TIMES } from '../lib/constants'
import { HOME_HERO } from '../lib/content/site'
import { ABOUT, GIVE, HOME, VISIT } from '../lib/content/interface'

const OLD_PLACEHOLDER = '([Zoom link to come])'
const NEW_TEXT = '(on Zoom)'

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

/** Replaces the placeholder in every span of a Portable Text value; returns null when nothing changed */
export function replaceZoomPlaceholder<T>(value: T): T | null {
  let changed = false
  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(walk)
    if (node && typeof node === 'object') {
      const record = node as Record<string, unknown>
      if (record._type === 'span' && typeof record.text === 'string' && record.text.includes(OLD_PLACEHOLDER)) {
        changed = true
        return { ...record, text: record.text.split(OLD_PLACEHOLDER).join(NEW_TEXT) }
      }
      return Object.fromEntries(Object.entries(record).map(([key, child]) => [key, walk(child)]))
    }
    return node
  }
  const result = walk(value) as T
  return changed ? result : null
}

type Patch = { id: string; set: Record<string, unknown>; describe: string[] }

async function plan(client: SanityClient): Promise<Patch[]> {
  const docs = await client.fetch<Record<string, Record<string, unknown> | null>>(`{
    "home": *[_id == "homePage"][0],
    "visit": *[_id == "visitPage"][0],
    "about": *[_id == "aboutPage"][0],
    "give": *[_id == "givePage"][0],
    "settings": *[_id == "siteSettings"][0]{ schedule }
  }`)
  const patches: Patch[] = []

  const home = docs.home
  if (home) {
    const set: Record<string, unknown> = {}
    const describe: string[] = []
    if (home.heroTitle === HOME_HERO.title) {
      set.heroTitle = HOME.hero.title
      describe.push(`heroTitle: "${HOME_HERO.title}" → "${HOME.hero.title}"`)
    }
    if (home.heroSubtitle === HOME_HERO.subtitle) {
      set.heroSubtitle = HOME.hero.subtitle
      describe.push('heroSubtitle → the §7 sentence')
    }
    const expect = replaceZoomPlaceholder(home.whatToExpect)
    if (expect) {
      set.whatToExpect = expect
      describe.push(`whatToExpect: ${OLD_PLACEHOLDER} → ${NEW_TEXT}`)
    }
    if (describe.length) patches.push({ id: 'homePage', set, describe })
  }

  const headers: [string, Record<string, unknown> | null, { eyebrow: string; title: string; lead?: string }][] = [
    ['visitPage', docs.visit, VISIT],
    ['aboutPage', docs.about, ABOUT],
    ['givePage', docs.give, GIVE],
  ]
  for (const [id, doc, defaults] of headers) {
    if (!doc) continue
    const set: Record<string, unknown> = {}
    if (!doc.heroEyebrow) set.heroEyebrow = defaults.eyebrow
    if (!doc.heroTitle) set.heroTitle = defaults.title
    if (!doc.heroLead && defaults.lead) set.heroLead = defaults.lead
    if (id === 'visitPage') {
      for (const field of ['serviceLines', 'sections']) {
        const replaced = replaceZoomPlaceholder(doc[field])
        if (replaced) set[field] = replaced
      }
    }
    if (Object.keys(set).length) patches.push({ id, set, describe: Object.keys(set).map((key) => `${key} set`) })
  }

  const schedule = (docs.settings?.schedule ?? []) as { _key: string; key?: { current?: string }; joinUrl?: string }[]
  const settingsSet: Record<string, unknown> = {}
  for (const item of schedule) {
    const service = SERVICE_TIMES.find((s) => s.id === item.key?.current)
    if (service?.joinUrl && !item.joinUrl) settingsSet[`schedule[_key=="${item._key}"].joinUrl`] = service.joinUrl
  }
  if (Object.keys(settingsSet).length) {
    patches.push({ id: 'siteSettings', set: settingsSet, describe: Object.keys(settingsSet).map((path) => `${path} ← Zoom link`) })
  }
  return patches
}

async function main() {
  const dataset = arg('dataset')
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const apply = process.argv.includes('--apply')
  const token = process.env.SANITY_WRITE_TOKEN
  if (!dataset) throw new Error('Pass --dataset <name> (e.g. staging). There is no default, on purpose.')
  if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
  if (apply && !token) throw new Error('SANITY_WRITE_TOKEN is not set (Editor token, from the environment only).')

  // Reading a public dataset needs no token
  const client = createClient({ projectId, dataset, token, apiVersion: '2025-10-28', useCdn: false, perspective: 'published' })
  const patches = await plan(client)
  console.log(`${projectId}/${dataset}: ${patches.length ? '' : 'nothing to change'}`)
  for (const patch of patches) for (const line of patch.describe) console.log(`  ${patch.id.padEnd(13)} ${line}`)
  if (!apply) {
    if (patches.length) console.log('\nDry run. Add --apply (with SANITY_WRITE_TOKEN) to write these changes.')
    return
  }
  const transaction = client.transaction()
  for (const patch of patches) transaction.patch(patch.id, (p) => p.set(patch.set))
  await transaction.commit({ visibility: 'sync' })
  console.log(`Applied ${patches.length} patches.`)
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  })
}

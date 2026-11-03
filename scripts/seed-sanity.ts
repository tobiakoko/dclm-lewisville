/**
 * Seeds a Sanity dataset with the church's content from lib/constants.ts and lib/content
 * (BUILD-PLAN 3.3).
 *
 *   SANITY_WRITE_TOKEN=… npm run seed -- --dataset staging            # create missing documents
 *   SANITY_WRITE_TOKEN=… npm run seed -- --dataset staging --replace  # overwrite seeded documents
 *   npm run seed -- --dataset staging --dry-run                       # print, write nothing
 *
 * Idempotent: by default a document that already exists is left alone, so edits made in the
 * Studio are never overwritten. Nothing is ever deleted, except the one known test event when
 * --delete-test-event is passed, and with --remove-dotted-ids the copies an early version of
 * this script created under dotted ids (e.g. doctrine.hell), which Sanity hides from public
 * reads. The token is read from the environment only; never commit it.
 */
import { createClient } from '@sanity/client'
import { buildSeedDocuments } from '../lib/sanity/seed-documents'

/** "Heart of the City" (24 January 2026), a test entry the owner asked to remove */
const TEST_EVENT_ID = '24833ee3-20f5-4e9f-adb3-ca0894f810d5'

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}
const flag = (name: string) => process.argv.includes(`--${name}`)

async function main() {
  const dataset = arg('dataset')
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const token = process.env.SANITY_WRITE_TOKEN
  const dryRun = flag('dry-run')
  const replace = flag('replace')

  if (!dataset) throw new Error('Pass --dataset <name> (e.g. staging). There is no default, on purpose.')
  if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
  if (!token && !dryRun) throw new Error('SANITY_WRITE_TOKEN is not set (Editor token, from the environment only).')

  const documents = buildSeedDocuments()
  console.log(`${documents.length} documents for ${projectId}/${dataset}${dryRun ? ' (dry run)' : ''}${replace ? ' (replace)' : ''}`)

  if (dryRun) {
    for (const doc of documents) console.log(`  ${doc._type.padEnd(14)} ${doc._id}`)
    return
  }

  const client = createClient({ projectId, dataset, token, apiVersion: '2025-10-28', useCdn: false })
  const existing = new Set(await client.fetch<string[]>('*[_id in $ids]._id', { ids: documents.map((d) => d._id) }))

  const transaction = client.transaction()
  for (const doc of documents) {
    if (replace) transaction.createOrReplace(doc)
    else transaction.createIfNotExists(doc)
  }
  if (flag('delete-test-event')) transaction.delete(TEST_EVENT_ID)
  // Exactly the old dotted twin of each seeded id, e.g. doctrine-hell -> doctrine.hell
  const dottedIds = documents.map((d) => d._id).filter((id) => id.includes('-') && !id.includes('.')).map((id) => id.replace('-', '.'))
  if (flag('remove-dotted-ids')) for (const id of dottedIds) transaction.delete(id)
  await transaction.commit({ visibility: 'sync' })

  const created = documents.filter((d) => !existing.has(d._id)).length
  console.log(`Done: ${created} created, ${documents.length - created} ${replace ? 'replaced' : 'already existed (left unchanged)'}.`)
  if (flag('delete-test-event')) console.log(`Deleted the test event ${TEST_EVENT_ID} (if it existed).`)
  if (flag('remove-dotted-ids')) console.log(`Removed up to ${dottedIds.length} documents with old dotted ids.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})

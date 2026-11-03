import { createClient } from '@sanity/client'
import 'server-only'

/** Pinned so a Sanity API change can't silently alter query results */
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-28'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) {
  // No placeholder project: a missing ID is a configuration error, not an empty site (CLAUDE.md rule 5)
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
}

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: SANITY_API_VERSION,
  // Only published documents reach the public site, never drafts
  perspective: 'published',
  // Next.js caches every page and the webhook refreshes it on publish, so read the live API:
  // the Sanity CDN can still hold the old answer right after a publish
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

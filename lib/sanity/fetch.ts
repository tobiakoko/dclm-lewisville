import 'server-only'
import type { QueryParams } from 'next-sanity'
import { client } from '@/lib/sanity/client'
import type { SanityTag } from '@/lib/sanity/queries'

/** Cached pages are refreshed by the Sanity webhook; this is only a safety net */
const REVALIDATE_SECONDS = 60 * 60 * 24

/**
 * Fetch with Next.js cache tags (BUILD-PLAN 3.0 option b). /api/revalidate calls
 * revalidateTag(<document type>) when that type is published.
 * Errors are thrown, never swallowed: a CMS failure is an error, not placeholder content.
 */
export async function sanityFetch<const Q extends string>({
  query,
  params = {},
  tags,
}: {
  query: Q
  params?: QueryParams
  tags: SanityTag[]
}) {
  return client.fetch(query, params, { next: { tags, revalidate: REVALIDATE_SECONDS } })
}

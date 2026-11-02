import { TAGS, type SanityTag } from '@/lib/sanity/queries'

/**
 * Which cache tag a published document refreshes (BUILD-PLAN 3.5). Each query is tagged with
 * the document types it reads (lib/data.ts), so one tag per type refreshes every page that
 * shows it: e.g. "siteSettings" refreshes the header, footer, JSON-LD and every page.
 * Returns null for types the site doesn't read.
 */
export function tagForType(type: unknown): SanityTag | null {
  return typeof type === 'string' && Object.hasOwn(TAGS, type) ? TAGS[type as keyof typeof TAGS] : null
}

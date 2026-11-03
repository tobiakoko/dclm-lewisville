import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SERMON_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PUBLIC_PATHS } from '@/lib/routes'

const PRIORITY: Record<string, number> = { '/': 1, '/visit': 0.9, '/about': 0.8, '/sermons': 0.8 }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '')

  const pages: MetadataRoute.Sitemap = PUBLIC_PATHS.map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    changeFrequency: path === '/sermons' ? 'weekly' : 'monthly',
    priority: PRIORITY[path] ?? 0.6,
  }))

  // Sermon pages exist only for real Sanity documents. Ministry URLs redirect to /ministries
  // until a ministry has its own document (BUILD-PLAN 2.8), so they aren't listed.
  // A Sanity error fails the sitemap rather than publishing a partial one (CLAUDE.md rule 5).
  const sermons = await sanityFetch({ query: SERMON_SLUGS_QUERY, tags: ['sermon'] })

  return [
    ...pages,
    ...sermons.map((sermon) => ({
      url: `${baseUrl}/sermons/${sermon.slug}`,
      lastModified: new Date(sermon.updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]
}

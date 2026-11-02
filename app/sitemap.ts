import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { MINISTRIES } from '@/lib/content/site'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '')

  let sermons = []

  // Fetch all sermons
  try {
    sermons = await client.fetch(
      groq`*[_type == "sermon"]{ slug, _updatedAt }`
    )
  } catch {
    console.warn('Failed to fetch sermons for sitemap (this is expected during build without Sanity credentials)')
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ministries`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sermons`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/give`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic sermon pages
  const sermonPages = sermons.map((sermon: { slug: { current: string }; _updatedAt: string }) => ({
    url: `${baseUrl}/sermons/${sermon.slug.current}`,
    lastModified: new Date(sermon._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic ministry pages
  const ministryPages = MINISTRIES.map((ministry) => ({
    url: `${baseUrl}/ministries/${ministry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...sermonPages, ...ministryPages]
}
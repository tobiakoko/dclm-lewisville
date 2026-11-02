/** Public pages, in the order visitors need them (sitemap, e2e page checks) */
export const PUBLIC_PATHS = ['/', '/visit', '/about', '/ministries', '/sermons', '/events', '/contact', '/give', '/privacy', '/terms'] as const

export type PublicPath = (typeof PUBLIC_PATHS)[number]

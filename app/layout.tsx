import type { Metadata } from 'next'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'
import { getSiteData } from '@/lib/data'
import { churchJsonLd } from '@/lib/structured-data'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { gaMeasurementId } from '@/lib/consent'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: { default: config.name, template: `%s | ${config.name}` },
    description: config.description,
    authors: [{ name: config.name }],
    creator: config.name,
    // The deployment's own URL (NEXT_PUBLIC_SITE_URL), not content
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: { type: 'website', locale: 'en_US', url: SITE_CONFIG.url, title: config.name, description: config.description, siteName: config.name },
    twitter: { card: 'summary_large_image', title: config.name, description: config.description },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { config } = await getSiteData()
  const gaId = gaMeasurementId()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd(config)).replace(/</g, '\\u003c') }}
        />
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before
          React loads; this ignores attribute differences on <body> only, not inside the page */}
      <body className="antialiased" suppressHydrationWarning>
        {/* Google Analytics only in production with a real ID, and only after consent (BUILD-PLAN 2.16) */}
        {gaId && <GoogleAnalytics ga_id={gaId} />}
        {children}
        {gaId && <ConsentBanner />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

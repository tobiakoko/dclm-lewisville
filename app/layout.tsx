import type { Metadata } from "next";
import { headers } from 'next/headers';
import "./globals.css";
import { SITE_CONFIG } from '@/lib/constants'
import { churchJsonLd } from '@/lib/structured-data'
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { gaMeasurementId } from "@/lib/consent";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'church',
    'Lewisville',
    'Texas',
    'DCLM',
    'Deeper Life Bible Church',
    'Deeper Christian Life Ministry',
    'Deeper Life',
    'Bible',
    'Christian',
    'worship',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const gaId = gaMeasurementId();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd()).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="antialiased">
        {/* Google Analytics only in production with a real ID, and only after consent (BUILD-PLAN 2.16) */}
        {gaId && <GoogleAnalytics ga_id={gaId} nonce={nonce} />}
        {children}
        {gaId && <ConsentBanner />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
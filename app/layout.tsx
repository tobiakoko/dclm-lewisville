import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from '@/lib/constants'
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "Deeper Life Bible Church Lewisville",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Church Street",
      "addressLocality": "Lewisville",
      "addressRegion": "TX",
      "postalCode": "75067",
      "addressCountry": "US"
    },
    "telephone": "+1-123-456-7890",
    "url": "https://dclmlewisville.org",
    "email": "info@dclmlewisville.org",
    "logo": "https://dclmlewisville.org/logo.png",
    "sameAs": [
      "https://facebook.com/dclmlewisville",
      "https://instagram.com/dclmlewisville",
      "https://youtube.com/@dclmlewisville"
    ]
  }
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
      </body>
    </html>
  );
}

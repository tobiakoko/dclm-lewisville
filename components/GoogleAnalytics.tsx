'use client'

import Script from 'next/script'
import { useConsent } from '@/components/consent/useConsent'

/** Loads Google Analytics only after the visitor accepts analytics cookies */
export default function GoogleAnalytics({ ga_id, nonce }: { ga_id: string; nonce?: string }) {
  const consent = useConsent()
  if (consent !== 'granted') return null

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`} nonce={nonce} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(ga_id)}, { page_path: window.location.pathname });
          `,
        }}
      />
    </>
  )
}

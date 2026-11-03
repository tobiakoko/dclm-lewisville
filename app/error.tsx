'use client'

import { useEffect } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { BrandBar } from '@/components/site/StatusCard'
import { ErrorView } from '@/components/site/ErrorView'

/** The site layout itself failed (for example a CMS error), so only the brand bar is shown */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])
  return (
    <>
      <BrandBar name={SITE_CONFIG.name} />
      <main id="main-content">
        <ErrorView digest={error.digest} reset={reset} />
      </main>
    </>
  )
}

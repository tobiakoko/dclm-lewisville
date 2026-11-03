'use client'

import { useEffect } from 'react'
import { ErrorView } from '@/components/site/ErrorView'

/** A page failed: shown inside the site's header and footer */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])
  return <ErrorView digest={error.digest} reset={reset} />
}

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, telHref } from '@/lib/constants'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)

  }, [error])

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="max-w-xl space-y-6 text-center">
        <p className="font-semibold text-navy-900">{SITE_CONFIG.name}</p>
        <h1>Something went wrong</h1>
        <p>
          This page didn&apos;t load. Please try again, or call us at{' '}
          <a href={telHref(SITE_CONFIG.phone)} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            {SITE_CONFIG.phone}
          </a>
          .
        </p>
        {error.digest && <p className="text-[0.9375rem] text-ink-muted">Error reference: {error.digest}</p>}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/">Home page</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

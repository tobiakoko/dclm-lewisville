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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-heading text-6xl font-bold text-foreground mb-2">
            Oops!
          </h1>
          <p className="text-xl text-muted-foreground">
            Something went wrong
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            This page didn&apos;t load. Please try again, or call us at{' '}
            <a href={telHref(SITE_CONFIG.phone)} className="underline font-semibold">
              {SITE_CONFIG.phone}
            </a>
            .
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
            size="lg"
          >
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

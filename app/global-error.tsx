'use client'

import { useEffect } from 'react'
import './globals.css'
import { SITE_CONFIG, telHref } from '@/lib/constants'
import { BrandBar, StatusCard } from '@/components/site/StatusCard'

// The root layout failed: render the whole document with the brand bar, and only plain links,
// since client navigation can't be trusted
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <BrandBar name={SITE_CONFIG.name} />
        <main id="main-content">
          <StatusCard
            icon={<span className="text-2xl font-bold">!</span>}
            title="Something went wrong"
            actions={
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="inline-flex min-h-[52px] items-center rounded-pill bg-heaven-600 px-[26px] font-bold text-white shadow-primary hover:bg-heaven-700"
                >
                  Try again
                </button>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/"
                  className="inline-flex min-h-[52px] items-center rounded-pill border-[1.5px] border-line-strong bg-white px-[26px] font-bold text-navy-900 no-underline hover:border-navy-900"
                >
                  Go home
                </a>
              </div>
            }
          >
            <p>
              The site didn&apos;t load. Please try again, or call us at{' '}
              <a href={telHref(SITE_CONFIG.phone)} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
                {SITE_CONFIG.phone}
              </a>
              .
            </p>
            {error.digest && <p className="text-sm text-ink-muted">Error ID: {error.digest}</p>}
          </StatusCard>
        </main>
      </body>
    </html>
  )
}

'use client'

import { useEffect } from 'react'
import { SITE_CONFIG, telHref } from '@/lib/constants'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '1rem',
        }}>
          <div style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              Something went wrong!
            </h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              The site didn&apos;t load. Please try again, or call us at{' '}
              <a href={telHref(SITE_CONFIG.phone)}>{SITE_CONFIG.phone}</a>.
            </p>
            {error.digest && (
              <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '2rem' }}>
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              Try again
            </button>
            {/* A full page load: the root layout itself failed, so client navigation can't be trusted */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}

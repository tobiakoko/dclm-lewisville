'use client'

import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'
import { SITE_CONFIG, telHref } from '@/lib/constants'
import { StatusCard } from '@/components/site/StatusCard'
import { Button, buttonVariants } from '@/components/ui/button'

/** "Something went wrong" with Try again, Home page, the phone number and the error reference */
export function ErrorView({ digest, reset }: { digest?: string; reset: () => void }) {
  return (
    <StatusCard
      icon={<TriangleAlert />}
      title="Something went wrong"
      actions={
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
            Home page
          </Link>
        </div>
      }
    >
      <p>
        This page didn&apos;t load. Please try again, or call us at{' '}
        <a href={telHref(SITE_CONFIG.phone)} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
          {SITE_CONFIG.phone}
        </a>
        .
      </p>
      {digest && <p className="text-sm text-ink-muted">Error reference: {digest}</p>}
    </StatusCard>
  )
}

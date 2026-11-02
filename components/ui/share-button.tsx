'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
}

/** Opens the device share sheet, or copies the link where sharing isn't supported */
export default function ShareButton({ title }: ShareButtonProps) {
  const [status, setStatus] = useState<string | null>(null)

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setStatus('Link copied.')
    } catch (error) {
      // Closing the share sheet isn't a failure
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus('Couldn’t share. Copy the address from your browser instead.')
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" className={buttonVariants({ variant: 'secondary', size: 'sm' })} onClick={share}>
        <Share2 aria-hidden="true" /> Share
      </button>
      <span role="status" className="text-[0.9375rem] text-ink-muted">
        {status}
      </span>
    </span>
  )
}

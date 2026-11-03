'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

/** Copies text to the clipboard and says so in a polite live region */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState('')

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copied.')
    } catch {
      setStatus('Couldn’t copy. Select the text and copy it instead.')
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" onClick={copy} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
        <Copy aria-hidden="true" />
        {label}
      </button>
      <span role="status" className="text-[0.9375rem] text-ink-muted">
        {status}
      </span>
    </span>
  )
}

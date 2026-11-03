'use client'

import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DisclosureProps {
  /** Content of the toggle button (always visible) */
  summary: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
  buttonClassName?: string
  panelClassName?: string
  /** Wraps the button in a heading, the accordion pattern (the button stays the only control) */
  heading?: 'h3' | 'h4'
  /** Extra classes for the chevron */
  iconClassName?: string
}

/**
 * Button with aria-expanded that shows and hides a panel. Works with Enter and Space
 * because it is a native button; the panel is removed from the tab order while closed.
 */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
  buttonClassName,
  panelClassName,
  heading: Heading,
  iconClassName,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  const button = (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => setOpen((value) => !value)}
      className={cn('flex w-full items-start justify-between gap-4 text-left', buttonClassName)}
    >
      <span className="min-w-0 flex-1">{summary}</span>
      <ChevronDown
        aria-hidden="true"
        className={cn('mt-1 h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none', open && 'rotate-180', iconClassName)}
      />
    </button>
  )

  return (
    <div className={className} data-state={open ? 'open' : 'closed'}>
      {Heading ? <Heading className="font-sans text-base">{button}</Heading> : button}
      <div id={panelId} hidden={!open} className={panelClassName}>
        {children}
      </div>
    </div>
  )
}

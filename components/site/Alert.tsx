import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  info: 'border-emblem-sky-700 bg-emblem-sky-50 text-navy-900',
  success: 'border-success bg-white text-success',
  error: 'border-heaven-700 bg-heaven-50 text-heaven-700',
  warning: 'border-warning bg-white text-warning',
} as const

/** Honest status message. Errors are announced (role="alert"); others are polite. */
export function Alert({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: keyof typeof TONES
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cn('rounded-lg border-l-4 px-4 py-3', TONES[tone], className)}>
      {title && <p className="font-semibold">{title}</p>}
      {children && <div className={title ? 'mt-1' : undefined}>{children}</div>}
    </div>
  )
}

/** "Nothing here yet" with the honest next step, e.g. the events empty state */
export function EmptyState({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('rounded-2xl border border-dashed border-border-input bg-white p-6 text-lg', className)}>{children}</p>
}

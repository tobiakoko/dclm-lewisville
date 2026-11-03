import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const TONES = {
  info: { className: 'bg-emblem-sky-50 text-navy-900', Icon: Info },
  success: { className: 'bg-white text-success shadow-[inset_0_0_0_1.5px_var(--color-success)]', Icon: CheckCircle2 },
  error: { className: 'bg-heaven-50 text-heaven-700', Icon: AlertCircle },
  warning: { className: 'bg-white text-warning shadow-[inset_0_0_0_1.5px_var(--color-warning)]', Icon: AlertCircle },
  /** The 911/988 notice: heaven-50 with heaven-700 text and a circled "i" */
  crisis: { className: 'bg-heaven-50 text-heaven-700', Icon: Info },
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
  const { className: toneClasses, Icon } = TONES[tone]
  return (
    <div
      role={tone === 'error' ? 'alert' : tone === 'crisis' ? 'note' : 'status'}
      className={cn('flex gap-3 rounded-box px-5 py-4', toneClasses, className)}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        {title && <p className="font-bold">{title}</p>}
        {children && <div className={title ? 'mt-1' : undefined}>{children}</div>}
      </div>
    </div>
  )
}

/** "Nothing here yet" with the honest next step: a paper panel, an H3, a muted line and one action */
export function EmptyState({
  title,
  children,
  action,
  className,
}: {
  title: ReactNode
  children?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-panel bg-paper p-8 sm:p-10', className)}>
      <h3>{title}</h3>
      {children && <div className="mt-3 text-ink-muted">{children}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

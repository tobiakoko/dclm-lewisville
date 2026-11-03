import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/eyebrow'

const TONES = {
  white: 'bg-white',
  paper: 'bg-paper',
  sky: 'bg-emblem-sky-50',
  navy: 'on-dark bg-navy-950',
} as const

const SIZES = {
  default: 'py-[72px] sm:py-[104px]',
  md: 'py-14 sm:py-20',
  sm: 'py-14',
} as const

export type SectionTone = keyof typeof TONES

/** Content width 1200px (880px narrow); gutters 20px on phones, 24px on tablets, 40px on desktop */
export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 wide:px-10', narrow ? 'max-w-narrow' : 'max-w-content', className)}>
      {children}
    </div>
  )
}

/** Eyebrow, H2 and lead on the left, an optional link on the right (wrapping on phones) */
export function SectionHeader({
  eyebrow,
  title,
  headingId,
  lead,
  action,
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  headingId?: string
  lead?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 wide:mb-14', className)}>
      <div className="max-w-[46rem]">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 id={headingId}>{title}</h2>
        {lead && <div className="type-lead mt-4">{lead}</div>}
      </div>
      {action && <div className="min-w-0 max-w-full">{action}</div>}
    </div>
  )
}

/**
 * A page band. Tones alternate white, paper and emblem-sky-50; navy is for at most one content
 * band per page (DESIGN-SYSTEM.md, Layout). The heading names the section for assistive tech.
 */
export function Section({
  id,
  tone = 'white',
  size = 'default',
  narrow,
  eyebrow,
  title,
  titleId,
  intro,
  action,
  children,
  className,
}: {
  id?: string
  tone?: SectionTone
  size?: keyof typeof SIZES
  /** 880px container (verse, legal text) */
  narrow?: boolean
  eyebrow?: ReactNode
  title?: ReactNode
  /** id for the heading, used as the section's accessible name */
  titleId?: string
  /** The section lead */
  intro?: ReactNode
  /** Right-aligned link in the header row, e.g. "All events" */
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  // A section that renders its own H2 passes titleId alone
  const headingId = titleId ?? (title && id ? `${id}-heading` : undefined)
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-24', TONES[tone], SIZES[size], className)}>
      <Container narrow={narrow}>
        {title && <SectionHeader eyebrow={eyebrow} title={title} headingId={headingId} lead={intro} action={action} />}
        {children}
      </Container>
    </section>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  white: 'bg-white',
  paper: 'bg-paper',
  sky: 'bg-emblem-sky-50',
  navy: 'on-dark bg-navy-950 text-white [&_h2]:text-white [&_h3]:text-white',
} as const

export type SectionTone = keyof typeof TONES

/** Content width (1200px) with a 16px phone gutter */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

/**
 * A page band. Backgrounds alternate white, paper and emblem-sky-50; navy is for at most one
 * call-out band per page (DESIGN-SYSTEM.md, Layout).
 */
export function Section({
  id,
  tone = 'white',
  title,
  titleId,
  intro,
  children,
  className,
}: {
  id?: string
  tone?: SectionTone
  title?: ReactNode
  /** id for the heading, used as the section's accessible name */
  titleId?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}) {
  const headingId = title ? (titleId ?? (id ? `${id}-heading` : undefined)) : undefined
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-24 py-14 md:py-20', TONES[tone], className)}>
      <Container>
        {title && (
          <h2 id={headingId} className="mb-4">
            {title}
          </h2>
        )}
        {intro && <div className="mb-8 max-w-prose text-lg">{intro}</div>}
        {children}
      </Container>
    </section>
  )
}

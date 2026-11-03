import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type DivProps = ComponentProps<'div'>

/** White card, radius 20, shadow-md */
export function Card({ className, ...props }: DivProps) {
  return <div className={cn('rounded-card bg-white shadow-md', className)} {...props} />
}

/** White card with a 1px line outline */
export function CardLine({ className, ...props }: DivProps) {
  return <div className={cn('rounded-card bg-white shadow-[inset_0_0_0_1px_var(--color-line)]', className)} {...props} />
}

/** Navy-900 card with white text, radius 24 */
export function CardDark({ className, ...props }: DivProps) {
  return <div className={cn('on-dark rounded-panel bg-navy-900', className)} {...props} />
}

/** Paper or emblem-sky-50 panel, radius 24 */
export function Panel({ tone = 'paper', className, ...props }: DivProps & { tone?: 'paper' | 'sky' }) {
  return <div className={cn('rounded-panel', tone === 'paper' ? 'bg-paper' : 'bg-emblem-sky-50', className)} {...props} />
}

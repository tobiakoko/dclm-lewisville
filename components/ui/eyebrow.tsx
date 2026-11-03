import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Small uppercase label above a heading. Not a heading itself, and never the only label for meaning */
export function Eyebrow({ children, className, as: Tag = 'p' }: { children: ReactNode; className?: string; as?: 'p' | 'span' }) {
  return <Tag className={cn('type-eyebrow', className)}>{children}</Tag>
}

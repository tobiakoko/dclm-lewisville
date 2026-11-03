import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** 52px square holding a decorative line icon (DESIGN-SYSTEM.md) */
const iconTileVariants = cva(
  'inline-flex size-[52px] shrink-0 items-center justify-center rounded-tile [&_svg]:size-6 [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        default: 'bg-emblem-sky-50 text-navy-900',
        warm: 'bg-white text-navy-900 shadow-sm',
        dark: 'bg-white/10 text-emblem-sky-400',
      },
    },
    defaultVariants: { tone: 'default' },
  }
)

export function IconTile({
  tone,
  children,
  className,
}: VariantProps<typeof iconTileVariants> & { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden="true" className={cn(iconTileVariants({ tone }), className)}>
      {children}
    </span>
  )
}

import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** 28px pill label. Mode badges: In person = warm, Online = default (DESIGN-SYSTEM.md) */
const chipVariants = cva(
  'inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-pill px-3 text-sm font-bold leading-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        default: 'bg-emblem-sky-50 text-navy-900',
        warm: 'bg-paper-2 text-navy-900',
        dark: 'bg-white/12 text-white',
        red: 'bg-heaven-50 text-heaven-700',
      },
    },
    defaultVariants: { tone: 'default' },
  }
)

export function Chip({
  tone,
  children,
  className,
  as: Tag = 'span',
}: VariantProps<typeof chipVariants> & { children: ReactNode; className?: string; as?: 'span' | 'li' }) {
  return <Tag className={cn(chipVariants({ tone }), className)}>{children}</Tag>
}

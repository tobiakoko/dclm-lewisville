import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** "All events →": emblem-sky-700 on light, emblem-sky-200 inside .on-dark (DESIGN-SYSTEM.md) */
export const arrowLinkClasses =
  'inline-flex min-h-11 items-center gap-2 font-bold text-emblem-sky-700 no-underline hover:underline hover:underline-offset-4 in-[.on-dark]:text-emblem-sky-200'

export function ArrowLink({
  href,
  children,
  className,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { href: string; children: ReactNode }) {
  const content = (
    <>
      {children}
      <ArrowRight aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={2} />
    </>
  )
  // Routes use next/link; outside URLs, anchors and tel:/mailto: links are plain anchors
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cn(arrowLinkClasses, className)} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={cn(arrowLinkClasses, className)} {...props}>
      {content}
    </a>
  )
}

import * as React from 'react'

// Mock Next.js Link component for testing
const MockLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<{
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
    locale?: string | false
    className?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
  }>
>(({ href, as, children, replace, scroll, shallow, passHref, prefetch, locale, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      data-replace={replace}
      data-scroll={scroll}
      data-shallow={shallow}
      data-prefetch={prefetch}
      {...props}
    >
      {children}
    </a>
  )
})

MockLink.displayName = 'NextLink'

export default MockLink

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { GIVE_LINK, NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { trackGiveClick, trackNavigation } from '@/lib/analytics'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Brand() {
  const [church, city] = SITE_CONFIG.shortName.split(' · ')
  return (
    <Link href="/" className="flex min-h-11 items-center gap-3 no-underline" onClick={() => trackNavigation('/', 'header_logo')}>
      <Image src="/dclm_logo.png" alt="" width={44} height={40} priority className="h-10 w-auto" />
      <span className="leading-tight text-navy-900">
        <span className="block font-serif text-lg font-semibold">{church}</span>
        <span className="block text-[0.9375rem] font-semibold">{city}</span>
      </span>
      <span className="sr-only">, home page</span>
    </Link>
  )
}

/**
 * Solid white header. Desktop: links plus the red Give button. Below `lg`: a Radix Dialog drawer
 * with a focus trap, Esc to close and a visible close button; it closes on navigation and is
 * removed from the page (and the tab order) while closed.
 */
export default function Header() {
  const pathname = usePathname()
  const [menu, setMenu] = useState<{ open: boolean; path: string }>({ open: false, path: pathname })
  // Close on route change without an effect: the open state belongs to the path it was opened on
  const open = menu.open && menu.path === pathname
  const setOpen = (value: boolean) => setMenu({ open: value, path: pathname })

  const linkClass = (href: string) =>
    cn(
      'inline-flex min-h-11 items-center px-1 font-semibold text-navy-900 no-underline underline-offset-8 hover:underline',
      isCurrent(pathname, href) && 'underline decoration-2'
    )

  return (
    <header className="sticky top-0 z-40 border-b border-border-input/40 bg-white">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex list-none items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(link.href)} aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={GIVE_LINK.href}
                className={buttonVariants({ size: 'sm' })}
                aria-current={isCurrent(pathname, GIVE_LINK.href) ? 'page' : undefined}
                onClick={() => trackGiveClick('header_desktop')}
              >
                {GIVE_LINK.name}
              </Link>
            </li>
          </ul>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-navy-700 px-3 font-semibold text-navy-900 lg:hidden">
            <Menu aria-hidden="true" className="size-5" />
            Menu
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/60" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <Dialog.Title className="font-serif text-xl font-semibold text-navy-900">Menu</Dialog.Title>
                <Dialog.Close className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-navy-700 px-3 font-semibold text-navy-900">
                  <X aria-hidden="true" className="size-5" />
                  Close
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <nav aria-label="Main" className="mt-6">
                <ul className="list-none divide-y divide-border-input/40 border-y border-border-input/40">
                  {[{ name: 'Home', href: '/' }, ...NAV_LINKS].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-12 items-center py-2 text-lg font-semibold text-navy-900 no-underline"
                        aria-current={pathname === link.href || (link.href !== '/' && isCurrent(pathname, link.href)) ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={GIVE_LINK.href}
                  className={cn(buttonVariants(), 'mt-6 w-full')}
                  onClick={() => {
                    trackGiveClick('header_mobile')
                    setOpen(false)
                  }}
                >
                  {GIVE_LINK.name}
                </Link>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}

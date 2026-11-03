'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { MapPin, Menu, Phone, Play, X } from 'lucide-react'
import { GIVE_LINK, NAV_LINKS } from '@/lib/constants'
import { trackGiveClick, trackNavigation } from '@/lib/analytics'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Facts the header shows, all from siteSettings (computed by the site layout) */
export interface HeaderInfo {
  /** "Deeper Life Bible Church" */
  brandName: string
  /** "Lewisville, Texas" */
  brandPlace: string
  streamsUrl: string
  /** "Sunday 9:30 AM", or null if the main service is missing */
  mainServiceTime: string | null
  address: string
  mapsHref: string
  phone: string
  phoneHref: string
}

/** The page whose hero the header overlays (REDESIGN.md §2); the hero carries this id */
export const OVERLAY_HERO_ID = 'home-hero'

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

/** True only after /api/live says the stream is live; any failure leaves "Watch online" */
function useLiveStream(): boolean {
  const [live, setLive] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/live', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { live?: unknown } | null) => setLive(data?.live === true))
      .catch(() => setLive(false))
    return () => controller.abort()
  }, [])
  return live
}

/** True once the overlaid hero has scrolled out from under the header */
function usePastHero(enabled: boolean): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (!enabled) return
    const hero = document.getElementById(OVERLAY_HERO_ID)
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setPast(!entry.isIntersecting), { rootMargin: '-88px 0px 0px 0px' })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [enabled])
  return enabled && past
}

function Brand({ info, overlay, onClick }: { info: HeaderInfo; overlay?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-3 no-underline" onClick={onClick}>
      <Image src="/dclm_logo.png" alt="" width={46} height={46} priority className="size-[46px] shrink-0 rounded-full bg-white object-contain" />
      <span className="leading-tight">
        <span className={cn('block font-serif text-[1.0625rem] font-semibold sm:text-[1.1875rem]', overlay ? 'text-white' : 'text-navy-900')}>
          {info.brandName}
        </span>
        <span className={cn('block text-sm font-semibold', overlay ? 'text-white/80' : 'text-ink-muted')}>{info.brandPlace}</span>
      </span>
      <span className="sr-only">, home page</span>
    </Link>
  )
}

function WatchLink({ info, live, overlay }: { info: HeaderInfo; live: boolean; overlay: boolean }) {
  return (
    <a
      href={info.streamsUrl}
      className={cn(
        'hidden h-11 items-center gap-2.5 rounded-pill px-3.5 text-[0.9375rem] font-semibold no-underline sm:inline-flex',
        overlay ? 'text-white hover:bg-white/14' : 'text-navy-900 hover:bg-emblem-sky-50'
      )}
    >
      {live ? (
        <>
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-live shadow-[0_0_0_4px_rgb(255_90_95/0.22)] motion-safe:animate-pulse" />
          Watch live
        </>
      ) : (
        <>
          <Play aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          Watch online
        </>
      )}
    </a>
  )
}

/**
 * Light tone on inner pages: white and sticky. Overlay tone on the home page: transparent over
 * the hero photo with white text, not sticky; once the hero scrolls away it becomes the fixed
 * light header. Below 1100px the links live in a Radix Dialog drawer (focus trap, Esc, visible
 * close button) that closes on navigation and leaves the page while closed.
 */
export default function Header({ info }: { info: HeaderInfo }) {
  const pathname = usePathname()
  const overlayPage = pathname === '/'
  const pastHero = usePastHero(overlayPage)
  const overlay = overlayPage && !pastHero
  const live = useLiveStream()
  const [menu, setMenu] = useState<{ open: boolean; path: string }>({ open: false, path: pathname })
  // Close on route change without an effect: the open state belongs to the path it was opened on
  const open = menu.open && menu.path === pathname
  const setOpen = (value: boolean) => setMenu({ open: value, path: pathname })

  return (
    <header
      data-tone={overlay ? 'overlay' : 'light'}
      className={cn(
        'z-40 w-full',
        overlay && 'on-dark absolute inset-x-0 top-0 bg-transparent',
        !overlayPage && 'sticky top-0 bg-white shadow-[inset_0_-1px_0_var(--color-line)]',
        pastHero && 'fixed inset-x-0 top-0 bg-white shadow-[inset_0_-1px_0_var(--color-line)] motion-safe:animate-header-in'
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-content items-center justify-between gap-6 px-5 sm:h-[88px] sm:px-6 wide:px-10">
        <Brand info={info} overlay={overlay} onClick={() => trackNavigation('/', 'header_logo')} />

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex list-none items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-11 items-center rounded-pill px-3.5 font-semibold leading-none no-underline',
                      overlay
                        ? cn('text-white hover:bg-white/14', current && 'bg-white/14')
                        : cn('text-navy-900 hover:bg-emblem-sky-50', current && 'bg-emblem-sky-50')
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WatchLink info={info} live={live} overlay={overlay} />
          <Link
            href={GIVE_LINK.href}
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
            aria-current={isCurrent(pathname, GIVE_LINK.href) ? 'page' : undefined}
            onClick={() => trackGiveClick('header_desktop')}
          >
            {GIVE_LINK.name}
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Menu"
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-field nav:hidden',
                overlay ? 'bg-white/14 text-white' : 'bg-emblem-sky-50 text-navy-900'
              )}
            >
              <Menu aria-hidden="true" className="size-6" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/60" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[384px] flex-col overflow-y-auto bg-white px-5 pb-8 shadow-lg motion-safe:data-[state=open]:animate-drawer-in">
                <div className="flex h-[72px] shrink-0 items-center justify-between gap-4 sm:h-[88px]">
                  <Brand info={info} onClick={() => setOpen(false)} />
                  <Dialog.Close aria-label="Close" className="inline-flex size-11 shrink-0 items-center justify-center rounded-field bg-emblem-sky-50 text-navy-900">
                    <X aria-hidden="true" className="size-6" />
                  </Dialog.Close>
                </div>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Main" className="mt-2">
                  <ul className="list-none">
                    {[{ name: 'Home', href: '/' }, ...NAV_LINKS].map((link) => {
                      const current = isCurrent(pathname, link.href)
                      return (
                        <li key={link.href} className="border-b border-line py-1">
                          <Link
                            href={link.href}
                            aria-current={current ? 'page' : undefined}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'flex min-h-[52px] items-center rounded-pill px-4 text-lg font-semibold text-navy-900 no-underline',
                              current ? 'bg-emblem-sky-50' : 'hover:bg-emblem-sky-50'
                            )}
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href={GIVE_LINK.href}
                      className={cn(buttonVariants(), 'w-full')}
                      onClick={() => {
                        trackGiveClick('header_mobile')
                        setOpen(false)
                      }}
                    >
                      {GIVE_LINK.name}
                    </Link>
                    <a href={info.streamsUrl} className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}>
                      {live ? 'Watch live' : 'Watch online'}
                    </a>
                  </div>
                </nav>
                <div className="mt-8 space-y-3 rounded-card bg-paper p-5 text-base">
                  {info.mainServiceTime && <p className="font-bold text-navy-900">{info.mainServiceTime}</p>}
                  <a href={info.mapsHref} className="flex min-h-11 items-start gap-2.5 text-ink no-underline hover:underline">
                    <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emblem-sky-700" />
                    {info.address}
                  </a>
                  <a href={info.phoneHref} className="flex min-h-11 items-center gap-2.5 text-ink no-underline hover:underline">
                    <Phone aria-hidden="true" className="size-5 shrink-0 text-emblem-sky-700" />
                    {info.phone}
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}

import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { NAV_LINKS, telHref } from '@/lib/constants'
import { getSiteData } from '@/lib/data'
import SiteShell from '@/components/layout/SiteShell'
import { StatusCard } from '@/components/site/StatusCard'
import { ArrowLink } from '@/components/ui/arrow-link'
import { buttonVariants } from '@/components/ui/button'

export const metadata = {
  title: 'Page not found',
}

// Pages a lost visitor most often wants
const SUGGESTED = ['/visit', '/sermons', '/events']

export default async function NotFoundPage() {
  const { config } = await getSiteData()
  return (
    <SiteShell>
      <StatusCard
        icon={<SearchX />}
        title="We couldn't find that page"
        actions={
          <>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
                Home page
              </Link>
              <ArrowLink href="/contact">Contact us</ArrowLink>
            </div>
            <ul className="flex list-none flex-wrap justify-center gap-2" aria-label="Popular pages">
              {NAV_LINKS.filter((link) => SUGGESTED.includes(link.href)).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-pill bg-white px-[18px] text-[0.9375rem] font-semibold text-navy-900 no-underline shadow-sm hover:shadow-[inset_0_0_0_1.5px_var(--color-navy-900)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }
      >
        <p>
          The link may be old or mistyped. You can go to the home page, or call us at{' '}
          <a href={telHref(config.phone)} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            {config.phone}
          </a>
          .
        </p>
      </StatusCard>
    </SiteShell>
  )
}

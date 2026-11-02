import Link from 'next/link'
import { SITE_CONFIG, telHref } from '@/lib/constants'
import { buttonVariants } from '@/components/ui/button'

export const metadata = {
  title: 'Page not found',
}

export default function NotFoundPage() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-white px-4 py-24">
      <div className="max-w-xl text-center space-y-6">
        <p className="font-semibold text-navy-900">{SITE_CONFIG.name}</p>
        <h1>We couldn&apos;t find that page</h1>
        <p>
          The link may be old or mistyped. You can go to the home page, or call us at{' '}
          <a href={telHref(SITE_CONFIG.phone)} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            {SITE_CONFIG.phone}
          </a>
          .
        </p>
        <ul className="flex flex-wrap justify-center gap-4 list-none">
          <li>
            <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
              Home page
            </Link>
          </li>
          <li>
            <Link href="/contact" className={buttonVariants({ variant: 'link' })}>
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}

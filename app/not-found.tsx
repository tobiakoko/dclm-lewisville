import Link from 'next/link'
import { SITE_CONFIG, telHref } from '@/lib/constants'

export const metadata = {
  title: 'Page not found',
}

export default function NotFoundPage() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-white px-6 py-24">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-lg font-semibold text-(--church-navy)">{SITE_CONFIG.name}</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-(--church-navy)">We couldn&apos;t find that page</h1>
        <p className="text-lg text-slate-700">
          The link may be old or mistyped. You can go to the home page, or call us at{' '}
          <a href={telHref(SITE_CONFIG.phone)} className="underline underline-offset-4 font-semibold">
            {SITE_CONFIG.phone}
          </a>
          .
        </p>
        <ul className="flex flex-wrap justify-center gap-4 list-none">
          <li>
            <Link href="/" className="inline-flex px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold">
              Home page
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 border-2 border-(--church-navy) text-(--church-navy) rounded-full font-bold"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}

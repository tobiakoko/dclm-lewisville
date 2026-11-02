'use client'

import Link from 'next/link'
import { writeConsent } from '@/lib/consent'
import { PRIVACY_POLICY } from '@/lib/content/site'
import { plainText } from '@/lib/content/inline'
import { buttonVariants } from '@/components/ui/button'
import { useConsent } from '@/components/consent/useConsent'

// The approved "Cookies." sentence from the Privacy Policy draft (SITE-CONTENT.md §11)
const COOKIES_SENTENCE = plainText(
  PRIVACY_POLICY.paragraphs.find((paragraph) => plainText(paragraph).startsWith('Cookies.')) ?? []
).replace(/^Cookies\.\s*/, '')

/**
 * Asks before any analytics cookie is set. Not a modal: the page stays usable, both choices
 * carry equal weight, and "Cookie settings" in the footer reopens it.
 */
export function ConsentBanner() {
  const consent = useConsent()
  if (consent !== null) return null

  return (
    <section
      id="consent-banner"
      aria-labelledby="consent-heading"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border-input bg-white shadow-[0_-4px_16px_rgb(15_37_66/0.12)]"
    >
      <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-prose">
          <h2 id="consent-heading" className="text-xl">
            Analytics cookies
          </h2>
          <p className="mt-1">
            {COOKIES_SENTENCE}{' '}
            <Link href="/privacy" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" className={buttonVariants({ variant: 'secondary', size: 'sm' })} onClick={() => writeConsent('granted')}>
            Accept analytics cookies
          </button>
          <button type="button" className={buttonVariants({ variant: 'secondary', size: 'sm' })} onClick={() => writeConsent('denied')}>
            Decline
          </button>
        </div>
      </div>
    </section>
  )
}

/** Footer button that clears the choice so the banner asks again */
export function CookieSettingsButton() {
  return (
    <button type="button" className="min-h-11 underline-offset-4 hover:underline" onClick={() => writeConsent(null)}>
      Cookie settings
    </button>
  )
}

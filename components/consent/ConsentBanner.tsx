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
      className="fixed inset-x-4 bottom-4 z-30 mx-auto max-w-[calc(var(--container-content)-5rem)] rounded-card bg-white shadow-lg ring-1 ring-line"
    >
      <div className="flex flex-col gap-4 px-5 py-5 sm:px-7 wide:flex-row wide:items-center wide:justify-between wide:gap-8">
        <div className="max-w-prose">
          <h2 id="consent-heading" className="type-h4">
            Analytics cookies
          </h2>
          <p className="mt-1 text-base">
            {COOKIES_SENTENCE}{' '}
            <Link href="/privacy" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
        </div>
        {/* Equal weight: neither choice is the red one, so declining is as easy as accepting */}
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
    <button type="button" className="min-h-11 text-white/78 underline-offset-4 hover:text-white hover:underline sm:min-h-8" onClick={() => writeConsent(null)}>
      Cookie settings
    </button>
  )
}

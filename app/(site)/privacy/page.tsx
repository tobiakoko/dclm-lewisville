import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LastUpdated } from '@/components/site/LastUpdated'
import { Paragraphs } from '@/components/content/RichText'
import { LEGAL_LAST_UPDATED, PRIVACY_POLICY } from '@/lib/content/site'
import { SITE_CONFIG, formatAddress, telHref } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `What ${SITE_CONFIG.name}’s website collects and how it is used.`,
  alternates: { canonical: '/privacy' },
}

const linkClass = 'font-semibold text-emblem-sky-700 underline underline-offset-4'

// TODO(content): legal review and effective date before launch (SITE-CONTENT.md §11)
export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <Section>
        <div className="max-w-prose space-y-4">
          <LastUpdated date={LEGAL_LAST_UPDATED} />
          <p>{PRIVACY_POLICY.effectiveDate}</p>
          <Paragraphs paragraphs={PRIVACY_POLICY.paragraphs} />
          {/* The approved "Contact." line, built from SITE_CONFIG (a unit test keeps them equal) */}
          <p>
            Contact. {SITE_CONFIG.name}, {formatAddress(SITE_CONFIG.address)} ·{' '}
            <a href={telHref(SITE_CONFIG.phone)} className={linkClass}>
              {SITE_CONFIG.phone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className={`${linkClass} break-all`}>
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}

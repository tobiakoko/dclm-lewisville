import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LastUpdated } from '@/components/site/LastUpdated'
import { Paragraphs } from '@/components/content/RichText'
import { COPYRIGHT_POLICY, LEGAL_LAST_UPDATED, WAIVER_AND_RELEASE } from '@/lib/content/site'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Copyright, and the waiver and release, for ${SITE_CONFIG.name}’s website.`,
  alternates: { canonical: '/terms' },
}

// TODO(content): legal review before launch (SITE-CONTENT.md §11)
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" />
      <Section>
        <div className="max-w-prose space-y-4">
          <LastUpdated date={LEGAL_LAST_UPDATED} />
          <h2 className="pt-4">Copyright</h2>
          <Paragraphs paragraphs={COPYRIGHT_POLICY} />
          <h2 className="pt-4">Waiver and Release</h2>
          <Paragraphs paragraphs={WAIVER_AND_RELEASE} />
        </div>
      </Section>
    </>
  )
}

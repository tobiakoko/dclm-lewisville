import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { LastUpdated } from '@/components/site/LastUpdated'
import { LegalLayout } from '@/components/site/LegalLayout'
import { Paragraphs } from '@/components/content/RichText'
import { getLegalContent, getSiteData } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Terms of Use',
    description: `Copyright, and the waiver and release, for ${config.name}’s website.`,
    alternates: { canonical: '/terms' },
  }
}

const SECTIONS = [
  { id: 'copyright', label: 'Copyright' },
  { id: 'waiver', label: 'Waiver and Release' },
]

// TODO(content): legal review before launch (SITE-CONTENT.md §11)
export default async function TermsPage() {
  const legal = await getLegalContent()
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" lead={<LastUpdated date={legal.lastUpdated} />} />
      <LegalLayout anchors={SECTIONS}>
        <h2 id="copyright" className="type-h3 scroll-mt-28">
          Copyright
        </h2>
        <Paragraphs paragraphs={legal.copyright} />
        <h2 id="waiver" className="type-h3 scroll-mt-28 pt-6">
          Waiver and Release
        </h2>
        <Paragraphs paragraphs={legal.waiver} />
      </LegalLayout>
    </>
  )
}

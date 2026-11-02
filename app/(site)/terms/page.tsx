import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LastUpdated } from '@/components/site/LastUpdated'
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

// TODO(content): legal review before launch (SITE-CONTENT.md §11)
export default async function TermsPage() {
  const legal = await getLegalContent()
  return (
    <>
      <PageHero title="Terms of Use" />
      <Section>
        <div className="max-w-prose space-y-4">
          <LastUpdated date={legal.lastUpdated} />
          <h2 className="pt-4">Copyright</h2>
          <Paragraphs paragraphs={legal.copyright} />
          <h2 className="pt-4">Waiver and Release</h2>
          <Paragraphs paragraphs={legal.waiver} />
        </div>
      </Section>
    </>
  )
}

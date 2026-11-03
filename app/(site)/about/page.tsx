import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import DoctrineCards from '@/components/site/DoctrineCards'
import LeaderCards from '@/components/site/LeaderCards'
import { Paragraphs } from '@/components/content/RichText'
import { getAboutContent, getSiteData } from '@/lib/data'
import congregation from '@/app/assets/congregation.jpeg'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'About Us',
    description: `Who we are, what we believe and who leads ${config.name}, a local congregation of ${config.affiliation}.`,
    alternates: { canonical: '/about' },
  }
}

const TONES = ['paper', 'white', 'paper', 'white'] as const

export default async function AboutPage() {
  const [{ config }, about] = await Promise.all([getSiteData(), getAboutContent()])

  return (
    <>
      <PageHero title="About Us" lead={`${config.name} is a local congregation of ${config.affiliation}.`} photo={congregation} />

      <Section id="who-we-are" title={about.whoWeAre.title}>
        <div className="max-w-prose space-y-4">
          <Paragraphs paragraphs={about.whoWeAre.paragraphs} />
        </div>
      </Section>

      {/* TODO(content): local founding story (year and how Lewisville began); no history timeline until it arrives */}
      {about.story.map((part, index) => (
        <Section key={part.title} tone={TONES[index % TONES.length]} title={part.title} titleId={`story-${index}`}>
          <div className="max-w-prose space-y-4">
            <Paragraphs paragraphs={part.paragraphs} />
            {part.list.length > 0 && (
              <ul className="list-disc space-y-2 pl-6">
                {part.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <Paragraphs paragraphs={part.closing} />
          </div>
        </Section>
      ))}

      <Section id="beliefs" tone="sky" title="What we believe">
        <DoctrineCards intro={about.doctrinesIntro} doctrines={about.doctrines} />
      </Section>

      <Section id="leadership" title="Leadership">
        <LeaderCards leaders={about.leaders} />
      </Section>
    </>
  )
}

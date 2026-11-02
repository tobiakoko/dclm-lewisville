import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import DoctrineCards from '@/components/site/DoctrineCards'
import LeaderCards from '@/components/site/LeaderCards'
import { Paragraphs } from '@/components/content/RichText'
import { OUR_STORY, WHO_WE_ARE } from '@/lib/content/site'
import { SITE_CONFIG } from '@/lib/constants'
import congregation from '@/app/assets/congregation.jpeg'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Who we are, what we believe and who leads ${SITE_CONFIG.name}, a local congregation of ${SITE_CONFIG.affiliation}.`,
  alternates: { canonical: '/about' },
}

const TONES = ['paper', 'white', 'paper', 'white'] as const

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" sentence={`${SITE_CONFIG.name} is a local congregation of ${SITE_CONFIG.affiliation}.`} photo={congregation} />

      <Section id="who-we-are" title={WHO_WE_ARE.title}>
        <div className="max-w-prose space-y-4">
          <Paragraphs paragraphs={WHO_WE_ARE.paragraphs} />
        </div>
      </Section>

      {/* TODO(content): local founding story (year and how Lewisville began); no history timeline until it arrives */}
      {OUR_STORY.map((part, index) => (
        <Section
          key={part.title}
          tone={TONES[index % TONES.length]}
          title={part.title}
          titleId={`story-${index}`}
        >
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
        <DoctrineCards />
      </Section>

      <Section id="leadership" title="Leadership">
        <LeaderCards />
      </Section>
    </>
  )
}

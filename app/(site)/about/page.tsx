import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container, Section } from '@/components/site/Section'
import { EditorialRow } from '@/components/site/EditorialRow'
import { InPageNav } from '@/components/site/InPageNav'
import DoctrineCards from '@/components/site/DoctrineCards'
import LeaderCards from '@/components/site/LeaderCards'
import { Paragraphs } from '@/components/content/RichText'
import { buttonVariants } from '@/components/ui/button'
import { IconTile } from '@/components/ui/icon-tile'
import { CardLine, Panel } from '@/components/ui/surface'
import { Eyebrow } from '@/components/ui/eyebrow'
import { plainText } from '@/lib/content/inline'
import { ABOUT } from '@/lib/content/interface'
import { getAboutContent, getSiteData } from '@/lib/data'
import type { AboutSection } from '@/lib/content/site'
import congregation from '@/app/assets/congregation.jpeg'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'About Us',
    description: `Who we are, what we believe and who leads ${config.name}, a local congregation of ${config.affiliation}.`,
    alternates: { canonical: '/about' },
  }
}

// Row ids and in-page links for the four "Our story" sections, in their approved order
const STORY_IDS = ['why-we-exist', 'heritage', 'vision', 'our-goal']

/** The approved section title becomes the eyebrow and the §7 heading the H2; without one, the title is the H2 */
function rowHeading(title: string) {
  const heading = ABOUT.headings[title]
  return heading && heading.toLowerCase() !== title.toLowerCase() ? { eyebrow: title, title: heading } : { title }
}

function StoryBody({ part, index, figures }: { part: AboutSection; index: number; figures: { value: string; label: string }[] }) {
  const id = STORY_IDS[index]
  return (
    <div className="max-w-prose space-y-4">
      <Paragraphs paragraphs={part.paragraphs} />
      {id === 'why-we-exist' && part.list.length > 0 && (
        <ul className="!mt-6 flex list-none flex-col gap-4">
          {part.list.map((item) => (
            <li key={item} className="type-h4 flex items-start gap-3">
              <Check aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-emblem-sky-700" strokeWidth={2.25} />
              {item}
            </li>
          ))}
        </ul>
      )}
      {id === 'vision' && part.list.length > 0 && (
        <ul className="!mt-6 flex list-none flex-col gap-3">
          {part.list.map((item) => (
            <li key={item}>
              <CardLine className="flex items-center gap-4 p-4">
                <IconTile className="size-11 rounded-field">
                  <Check strokeWidth={2.25} />
                </IconTile>
                <span className="font-bold text-navy-900">{item}</span>
              </CardLine>
            </li>
          ))}
        </ul>
      )}
      {id !== 'why-we-exist' && id !== 'vision' && part.list.length > 0 && (
        <ul className="list-disc space-y-2 pl-6">
          {part.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <Paragraphs paragraphs={part.closing} />
      {id === 'heritage' && (
        <Panel className="!mt-8 grid gap-6 p-7 sm:grid-cols-2">
          {figures.map((figure) => (
            <p key={figure.value}>
              <span className="block font-serif text-[2.75rem] font-semibold leading-none text-navy-900">{figure.value}</span>
              <span className="mt-2 block text-base text-ink-muted">{figure.label}</span>
            </p>
          ))}
        </Panel>
      )}
    </div>
  )
}

export default async function AboutPage() {
  const [{ config }, about] = await Promise.all([getSiteData(), getAboutContent()])
  const whoWeAre = rowHeading(about.whoWeAre.title)
  const quoteInText = about.whoWeAre.paragraphs.some((paragraph) => plainText(paragraph).includes(ABOUT.pullQuote))
  const navLabels = [ABOUT.nav.why, ABOUT.nav.heritage, ABOUT.nav.vision]

  return (
    <>
      <PageHero
        eyebrow={about.header.eyebrow}
        title={about.header.title}
        lead={about.header.lead ?? `${config.name} is a local congregation of ${config.affiliation}.`}
        photo={congregation}
        photoAlt="Members of the congregation together for a group photo"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/visit" className={buttonVariants()}>
            Plan your visit
          </Link>
          <a href="#beliefs" className={buttonVariants({ variant: 'secondary' })}>
            What we believe
          </a>
        </div>
      </PageHero>

      <InPageNav
        links={[
          { href: '#who-we-are', label: ABOUT.nav.whoWeAre },
          ...about.story.slice(0, 3).map((_, index) => ({ href: `#${STORY_IDS[index]}`, label: navLabels[index] })),
          { href: '#beliefs', label: ABOUT.nav.beliefs },
          { href: '#leadership', label: ABOUT.nav.leadership },
        ]}
      />

      {/* TODO(content): local founding story (year and how Lewisville began); no history timeline until it arrives */}
      <Container>
        <EditorialRow id="who-we-are" eyebrow={whoWeAre.eyebrow} title={whoWeAre.title}>
          {quoteInText && (
            <p aria-hidden="true" className="type-quote mb-8 border-l-4 border-emblem-sky-400 pl-6">
              {ABOUT.pullQuote}
            </p>
          )}
          <div className="max-w-prose space-y-4">
            <Paragraphs paragraphs={about.whoWeAre.paragraphs} />
          </div>
        </EditorialRow>

        {about.story.map((part, index) => {
          const heading = rowHeading(part.title)
          return (
            <EditorialRow key={part.title} id={STORY_IDS[index] ?? `story-${index}`} eyebrow={heading.eyebrow} title={heading.title}>
              <StoryBody part={part} index={index} figures={ABOUT.figures(config.region, config.regionalOverseer)} />
            </EditorialRow>
          )
        })}
      </Container>

      <Section id="beliefs" tone="sky" titleId="beliefs-heading">
        <div className="mb-10 grid gap-8 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] wide:gap-16">
          <div>
            <Eyebrow className="mb-4">{about.doctrinesIntro.heading}</Eyebrow>
            <h2 id="beliefs-heading">What we believe</h2>
            <p className="mt-4 text-base italic text-ink-muted">{about.doctrinesIntro.references}</p>
          </div>
          <blockquote className="font-serif text-xl italic leading-relaxed text-navy-900">
            <p>{about.doctrinesIntro.quotation}</p>
          </blockquote>
        </div>
        <p className="mb-6 font-bold text-navy-900">{about.doctrinesIntro.statement}</p>
        <DoctrineCards doctrines={about.doctrines} />
      </Section>

      <Section id="leadership" eyebrow={ABOUT.nav.leadership} title={ABOUT.leadershipTitle}>
        <LeaderCards leaders={about.leaders} />
      </Section>
    </>
  )
}

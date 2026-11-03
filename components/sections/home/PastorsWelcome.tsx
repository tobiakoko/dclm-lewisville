import Link from 'next/link'
import Image from 'next/image'
import Pastor from '@/app/assets/Pastor_Joseph.jpeg'
import { plainText, type Paragraph } from '@/lib/content/inline'
import { HOME, WELCOME_PULL_QUOTE } from '@/lib/content/interface'
import { Paragraphs } from '@/components/content/RichText'
import { Section } from '@/components/site/Section'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Eyebrow } from '@/components/ui/eyebrow'
import { buttonVariants } from '@/components/ui/button'

/**
 * The one welcome section on the site: the Pastor's Welcome, verbatim and in full
 * (SITE-CONTENT.md §3). A sentence from it may be lifted as a pull-quote, but only while the
 * text still contains it word for word; the quote is decoration, so screen readers skip it.
 */
export function PastorsWelcome({ welcome, localPastor }: { welcome: { heading: string; paragraphs: Paragraph[] }; localPastor: string }) {
  const showQuote = welcome.paragraphs.some((paragraph) => plainText(paragraph).includes(WELCOME_PULL_QUOTE))
  return (
    <Section id="welcome" titleId="welcome-heading">
      <div className="grid items-start gap-12 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] wide:gap-16">
        <figure className="relative mx-auto w-full max-w-md wide:mx-0 wide:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-paper-2">
            <Image src={Pastor} alt={`Portrait of ${localPastor}`} fill sizes="(min-width: 960px) 460px, 100vw" className="object-cover" />
          </div>
          <figcaption className="absolute bottom-5 left-5 right-5 rounded-card bg-white px-5 py-4 shadow-md sm:right-auto">
            <span className="block font-serif text-xl font-semibold text-navy-900">{localPastor}</span>
            <span className="text-base text-ink-muted">Local Pastor</span>
          </figcaption>
        </figure>
        <div>
          <Eyebrow className="mb-4">{HOME.eyebrows.welcome}</Eyebrow>
          <h2 id="welcome-heading">{welcome.heading}</h2>
          {showQuote && (
            <p aria-hidden="true" className="type-quote mt-8 border-l-4 border-emblem-sky-400 pl-6">
              {WELCOME_PULL_QUOTE}
            </p>
          )}
          <div className="mt-8 max-w-prose space-y-4">
            <Paragraphs paragraphs={welcome.paragraphs} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/about#leadership" className={buttonVariants({ variant: 'secondary' })}>
              Meet our leadership
            </Link>
            <ArrowLink href="/about#beliefs">What we believe</ArrowLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

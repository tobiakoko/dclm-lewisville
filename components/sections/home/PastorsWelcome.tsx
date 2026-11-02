import Link from 'next/link'
import Image from 'next/image'
import Pastor from '@/app/assets/Pastor_Joseph.jpeg'
import type { Paragraph } from '@/lib/content/inline'
import { Paragraphs } from '@/components/content/RichText'
import { Section } from '@/components/site/Section'
import { buttonVariants } from '@/components/ui/button'

/** The one welcome section on the site: the Pastor's Welcome, verbatim (SITE-CONTENT.md §3) */
export function PastorsWelcome({ welcome, localPastor }: { welcome: { heading: string; paragraphs: Paragraph[] }; localPastor: string }) {
  return (
    <Section id="welcome">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-4">
          <div className="relative mx-auto aspect-4/5 max-w-sm overflow-hidden rounded-2xl lg:mx-0">
            <Image src={Pastor} alt={`Portrait of ${localPastor}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-center lg:text-left">
            <span className="block font-serif text-xl font-semibold text-navy-900">{localPastor}</span>
            <span className="text-ink-muted">Local Pastor</span>
          </figcaption>
        </figure>
        <div className="space-y-5 lg:col-span-8">
          <h2 id="welcome-heading">{welcome.heading}</h2>
          <div className="max-w-prose space-y-4">
            <Paragraphs paragraphs={welcome.paragraphs} />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/about#leadership" className={buttonVariants({ variant: 'secondary' })}>
              Meet our leadership
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: 'link' })}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

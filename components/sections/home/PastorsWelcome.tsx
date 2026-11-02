import Link from 'next/link'
import Image from 'next/image'
import Pastor from '@/app/assets/Pastor_Joseph.jpeg'
import { SITE_CONFIG } from '@/lib/constants'
import { PASTORS_WELCOME } from '@/lib/content/site'
import { Paragraphs } from '@/components/content/RichText'

/** The one welcome section on the site: the Pastor's Welcome, verbatim (SITE-CONTENT.md §3) */
export function PastorsWelcome() {
  return (
    <section className="py-24 bg-white overflow-hidden" aria-labelledby="welcome-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-5/12 w-full">
            <div className="relative rounded-4xl overflow-hidden shadow-2xl aspect-4/5 max-w-md mx-auto lg:mx-0">
              <Image
                src={Pastor}
                alt={`Portrait of ${SITE_CONFIG.localPastor}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center lg:text-left">
              <span className="block font-serif text-xl font-bold text-(--church-navy)">{SITE_CONFIG.localPastor}</span>
              <span className="text-slate-600">Local Pastor</span>
            </p>
          </div>

          <div className="lg:w-7/12 space-y-6">
            <h2 id="welcome-heading" className="text-4xl md:text-5xl font-serif font-bold text-(--church-navy) leading-[1.1]">
              {PASTORS_WELCOME.heading}
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <Paragraphs paragraphs={PASTORS_WELCOME.paragraphs} />
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/about#leadership"
                className="px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold text-sm"
              >
                Meet our leadership
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border-2 border-(--church-navy) text-(--church-navy) rounded-full font-bold text-sm"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

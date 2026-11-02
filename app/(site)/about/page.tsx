import HeroSection from '@/components/sections/HeroSection'
import CoreBeliefs from '@/components/sections/about/CoreBeliefs'
import Leadership from '@/components/sections/about/Leadership'
import { Paragraphs } from '@/components/content/RichText'
import { OUR_STORY, WHO_WE_ARE } from '@/lib/content/site'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata = {
  title: 'About Us',
  description: `Who we are, what we believe and who leads ${SITE_CONFIG.name}, a local congregation of ${SITE_CONFIG.affiliation}.`,
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <HeroSection title="About Us" subtitle={SITE_CONFIG.name} />

      {/* --- Who we are --- */}
      <section className="py-20 px-6" aria-labelledby="who-heading">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-700 leading-relaxed">
          <h2 id="who-heading" className="font-serif text-3xl md:text-4xl text-(--church-navy)">
            {WHO_WE_ARE.title}
          </h2>
          <Paragraphs paragraphs={WHO_WE_ARE.paragraphs} />
        </div>
      </section>

      {/* --- Mission and vision (four parts) --- */}
      {/* TODO(content): local founding story (year and how Lewisville began); no history timeline until it arrives */}
      <section className="py-20 px-6 bg-slate-50" aria-label="Our story, mission and vision">
        <div className="max-w-3xl mx-auto space-y-16">
          {OUR_STORY.map((part) => (
            <article key={part.title} className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <h2 className="font-serif text-3xl text-(--church-navy)">{part.title}</h2>
              <Paragraphs paragraphs={part.paragraphs} />
              {part.list.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {part.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <Paragraphs paragraphs={part.closing} />
            </article>
          ))}
        </div>
      </section>

      {/* --- What we believe --- */}
      <section id="beliefs" className="py-20 px-6 scroll-mt-24" aria-labelledby="beliefs-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="beliefs-heading" className="font-serif text-4xl md:text-5xl text-(--church-navy) text-center mb-10">
            What We Believe
          </h2>
          <CoreBeliefs />
        </div>
      </section>

      {/* --- Leadership --- */}
      <section
        id="leadership"
        className="py-20 px-6 bg-slate-50 border-t border-slate-200 scroll-mt-24"
        aria-labelledby="leadership-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="leadership-heading" className="font-serif text-4xl md:text-5xl mb-12 text-center text-(--church-navy)">
            Leadership
          </h2>
          <Leadership />
        </div>
      </section>
    </div>
  )
}

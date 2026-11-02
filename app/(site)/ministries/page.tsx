import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import HeroSection from '@/components/sections/HeroSection'
import { Paragraphs } from '@/components/content/RichText'
import { MINISTRIES, OUTREACH } from '@/lib/content/site'
import { SITE_CONFIG } from '@/lib/constants'
import Women from '@/app/assets/women_ministry.jpeg'
import Children from '@/app/assets/ChildrenMinistry.jpeg'
import Youth from '@/app/assets/YouthMinistry.jpeg'
import Men from '@/app/assets/men_ministry.jpeg'
import Music from '@/app/assets/MusicMinistry.jpeg'

export const metadata = {
  title: 'Ministries and Outreach',
  description: `The ministries and outreach of ${SITE_CONFIG.name}, and how to join them.`,
}

const PHOTOS: Record<string, { src: StaticImageData; alt: string }> = {
  women: { src: Women, alt: 'Four women of the church standing together' },
  children: { src: Children, alt: 'A girl speaking at the pulpit' },
  youth: { src: Youth, alt: 'Young people standing during a service' },
  men: { src: Men, alt: 'Four men of the church standing together on the platform' },
  music: { src: Music, alt: 'Musicians playing keyboards during a service' },
}

function ContactAction({ name }: { name: string }) {
  return (
    <Link
      href={`/contact?topic=${encodeURIComponent(name)}`}
      className="inline-flex px-6 py-3 bg-(--church-navy) text-white rounded-full font-bold"
    >
      Send us a message<span className="sr-only"> about {name}</span>
    </Link>
  )
}

export default function MinistriesPage() {
  return (
    <div className="bg-white">
      <HeroSection title="Ministries" subtitle={SITE_CONFIG.name} />

      {/* TODO(content): ministry meeting times, leaders and contacts */}
      <section className="py-20 px-6" aria-labelledby="ministries-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="ministries-heading" className="font-serif text-4xl text-(--church-navy) mb-12">
            Our ministries
          </h2>
          <ul className="space-y-16 list-none">
            {MINISTRIES.map((ministry) => {
              const photo = PHOTOS[ministry.slug]
              return (
                <li key={ministry.slug} id={ministry.slug} className="scroll-mt-24">
                  <article className="grid gap-8 md:grid-cols-5 items-start">
                    {photo && (
                      <div className="relative aspect-4/3 md:col-span-2 rounded-2xl overflow-hidden">
                        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className={`space-y-4 text-lg text-slate-700 leading-relaxed ${photo ? 'md:col-span-3' : 'md:col-span-5'}`}>
                      <h3 className="font-serif text-3xl font-bold text-(--church-navy)">{ministry.name}</h3>
                      <Paragraphs paragraphs={ministry.paragraphs} />
                      <ContactAction name={ministry.name} />
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* TODO(content): Prison Ministry details; Heart of the City partner details and volunteer sign-up; how to request counseling */}
      <section id="outreach" className="py-20 px-6 bg-slate-50 scroll-mt-24" aria-labelledby="outreach-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="outreach-heading" className="font-serif text-4xl text-(--church-navy) mb-12">
            Outreach
          </h2>
          <ul className="grid gap-8 md:grid-cols-2 list-none">
            {OUTREACH.map((area) => (
              <li key={area.slug} id={area.slug} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 scroll-mt-24">
                <h3 className="font-serif text-2xl font-bold text-(--church-navy)">{area.name}</h3>
                <div className="space-y-3 text-slate-700 leading-relaxed">
                  <Paragraphs paragraphs={area.paragraphs} />
                </div>
                <ContactAction name={area.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

import Image, { type StaticImageData } from 'next/image'
import { LEADERS, type Leader } from '@/lib/content/site'
import { Paragraphs, InlineText } from '@/components/content/RichText'
import { Disclosure } from '@/components/ui/disclosure'
import PastorKumuyi from '@/app/assets/Pastor_Kumuyi.jpg'
import PastorAderemi from '@/app/assets/Pastor_Aderemi.png'
import PastorJoseph from '@/app/assets/Pastor_Joseph.jpeg'

const PHOTOS: Record<Leader['id'], StaticImageData> = {
  kumuyi: PastorKumuyi,
  aderemi: PastorAderemi,
  agbo: PastorJoseph,
}

/** The three leaders in the approved order (SITE-CONTENT.md §5, Leadership) */
export default function Leadership() {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-8 list-none">
      {LEADERS.map((leader) => (
        <li key={leader.id}>
          <article className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative aspect-4/5 bg-slate-100">
              <Image
                src={PHOTOS[leader.id]}
                alt={`Portrait of ${leader.name}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-6 space-y-4">
              <header>
                <p className="text-sm font-semibold text-(--church-red)">{leader.title}</p>
                <h3 className="font-serif text-2xl font-bold text-(--church-navy)">{leader.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{leader.subtitle}</p>
              </header>
              <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                <InlineText paragraph={leader.shortBio} />
              </p>
              <Disclosure
                buttonClassName="font-semibold text-(--church-navy) py-2"
                panelClassName="space-y-4 text-slate-700 leading-relaxed pt-2"
                summary={<span>Read more about {leader.name}</span>}
              >
                <Paragraphs paragraphs={leader.fullBio} />
              </Disclosure>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

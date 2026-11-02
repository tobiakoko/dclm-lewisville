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

/** Photo, name, title, short bio and the full bio behind "Read more" */
export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-input/40 bg-white">
      <div className="relative aspect-4/5 bg-paper">
        <Image
          src={PHOTOS[leader.id]}
          alt={`Portrait of ${leader.name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header>
          <p className="font-semibold text-ink-muted">{leader.title}</p>
          <h3 className="font-serif text-2xl">{leader.name}</h3>
          <p className="mt-1 text-[0.9375rem] text-ink-muted">{leader.subtitle}</p>
        </header>
        <p className="whitespace-pre-line">
          <InlineText paragraph={leader.shortBio} />
        </p>
        <Disclosure
          className="mt-auto"
          buttonClassName="min-h-11 py-2 font-semibold text-emblem-sky-700"
          panelClassName="space-y-4 pt-2"
          summary={<span>Read more about {leader.name}</span>}
        >
          <Paragraphs paragraphs={leader.fullBio} />
        </Disclosure>
      </div>
    </article>
  )
}

/** The three leaders in the approved order (SITE-CONTENT.md §5, Leadership) */
export default function LeaderCards() {
  return (
    <ul className="grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {LEADERS.map((leader) => (
        <li key={leader.id}>
          <LeaderCard leader={leader} />
        </li>
      ))}
    </ul>
  )
}

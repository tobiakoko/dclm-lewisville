import Image, { type StaticImageData } from 'next/image'
import type { LeaderWithPhoto } from '@/lib/data'
import { pickPhoto } from '@/components/site/photo'
import { Paragraphs, InlineText } from '@/components/content/RichText'
import { Disclosure } from '@/components/ui/disclosure'
import PastorKumuyi from '@/app/assets/Pastor_Kumuyi.jpg'
import PastorAderemi from '@/app/assets/Pastor_Aderemi.png'
import PastorJoseph from '@/app/assets/Pastor_Joseph.jpeg'

// Real portraits bundled in app/assets, used until a photo is uploaded in Sanity
const PHOTOS: Record<string, StaticImageData> = {
  kumuyi: PastorKumuyi,
  aderemi: PastorAderemi,
  agbo: PastorJoseph,
}

/** Portrait, role, name, short bio and the full bio behind "Read full bio" */
export function LeaderCard({ leader }: { leader: LeaderWithPhoto }) {
  const bundled = PHOTOS[leader.id]
  const photo = pickPhoto(leader.photo, bundled ? { src: bundled, alt: `Portrait of ${leader.name}` } : undefined)
  return (
    <article className="flex h-full flex-col">
      {photo && (
        <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-paper">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 pt-6">
        <header>
          <p className="type-eyebrow">{leader.title}</p>
          <h3 className="mt-2">{leader.name}</h3>
          <p className="mt-1 text-[0.9375rem] text-ink-muted">{leader.subtitle}</p>
        </header>
        <p className="whitespace-pre-line text-ink-muted">
          <InlineText paragraph={leader.shortBio} />
        </p>
        <Disclosure
          className="mt-auto"
          buttonClassName="min-h-11 items-center py-2 font-bold text-emblem-sky-700"
          iconClassName="mt-0"
          panelClassName="space-y-4 pt-2"
          summary={
            <span>
              Read full bio<span className="sr-only"> of {leader.name}</span>
            </span>
          }
        >
          <Paragraphs paragraphs={leader.fullBio} />
        </Disclosure>
      </div>
    </article>
  )
}

/** The three leaders in the approved order (SITE-CONTENT.md §5, Leadership) */
export default function LeaderCards({ leaders }: { leaders: LeaderWithPhoto[] }) {
  return (
    <ul className="grid list-none gap-x-8 gap-y-12 sm:grid-cols-2 wide:grid-cols-3">
      {leaders.map((leader) => (
        <li key={leader.id}>
          <LeaderCard leader={leader} />
        </li>
      ))}
    </ul>
  )
}

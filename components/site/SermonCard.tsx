import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { thumbnailUrl, videoUrl, type SermonSource, type Video } from '@/lib/sermons'

export const SOURCE_LABEL: Record<SermonSource, string> = {
  lewisville: 'Lewisville',
  hq: 'DCLM Headquarters',
}

export function SourceBadge({ source }: { source: SermonSource }) {
  return (
    <span className="inline-block rounded-full border border-navy-700 px-3 py-0.5 text-[0.9375rem] font-semibold text-navy-900">
      {SOURCE_LABEL[source]}
    </span>
  )
}

export function formatVideoDate(published: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: SITE_CONFIG.timeZone, dateStyle: 'long' }).format(new Date(published))
}

/** Title, date and source badge. YouTube feeds carry no speaker, so none is shown or guessed. */
export function SermonCard({ video }: { video: Video }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-input/40 bg-white">
      <div className="relative aspect-video bg-navy-950">
        <Image src={thumbnailUrl(video.id)} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <SourceBadge source={video.source} />
        <h3 className="text-lg">
          <a href={videoUrl(video.id)} className="no-underline hover:underline">
            {video.title}
          </a>
        </h3>
        <p className="mt-auto text-[0.9375rem] text-ink-muted">
          <time dateTime={video.published}>{formatVideoDate(video.published)}</time>
        </p>
      </div>
    </article>
  )
}

import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { thumbnailUrl, videoUrl, type SermonSource, type Video } from '@/lib/sermons'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Chip } from '@/components/ui/chip'

export const SOURCE_LABEL: Record<SermonSource, string> = {
  lewisville: 'Lewisville',
  hq: 'DCLM Headquarters',
}

/** The source label on featured messages and sermon pages (REDESIGN.md §3.6) */
export const SOURCE_CHIP: Record<SermonSource, string> = {
  lewisville: 'Lewisville',
  hq: 'From DCLM Headquarters, Lagos',
}

export function SourceChip({ source, tone }: { source: SermonSource; tone?: 'default' | 'dark' }) {
  return <Chip tone={tone}>{SOURCE_CHIP[source]}</Chip>
}

export function formatVideoDate(published: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: SITE_CONFIG.timeZone, dateStyle: 'long' }).format(new Date(published))
}

function dateParts(published: string) {
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { timeZone: SITE_CONFIG.timeZone, ...options }).format(new Date(published))
  return { month: format({ month: 'short' }), day: format({ day: 'numeric' }) }
}

/**
 * Thumbnail with a date tile, title, "<church> · date" and a Watch link. YouTube feeds carry no
 * speaker, so none is shown or guessed.
 */
export function SermonCard({ video, churchName }: { video: Video; churchName: string }) {
  const { month, day } = dateParts(video.published)
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-md">
      <div className="relative aspect-video bg-navy-950">
        <Image src={thumbnailUrl(video.id)} alt="" fill sizes="(min-width: 960px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span aria-hidden="true" className="absolute left-3 top-3 flex size-14 flex-col items-center justify-center rounded-field bg-navy-900 text-white">
          <span className="text-sm font-bold uppercase leading-none tracking-[0.08em] text-emblem-sky-400">{month}</span>
          <span className="mt-1 font-serif text-xl font-semibold leading-none">{day}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="type-h4">{video.title}</h3>
        <p className="text-[0.9375rem] text-ink-muted">
          {video.source === 'lewisville' ? churchName : SOURCE_LABEL.hq} · <time dateTime={video.published}>{formatVideoDate(video.published)}</time>
        </p>
        <ArrowLink href={videoUrl(video.id)} className="mt-auto">
          Watch<span className="sr-only">: {video.title}</span>
        </ArrowLink>
      </div>
    </article>
  )
}

/** A small row for a recent message: 128×72 thumbnail, title and date, one link */
export function MiniSermonRow({ video }: { video: Video }) {
  return (
    <a href={videoUrl(video.id)} className="group grid min-h-[72px] grid-cols-[128px_minmax(0,1fr)] items-center gap-4 no-underline">
      <span className="relative block h-[72px] w-32 overflow-hidden rounded-thumb bg-navy-950">
        <Image src={thumbnailUrl(video.id)} alt="" fill sizes="128px" className="object-cover" />
      </span>
      <span className="min-w-0">
        <span className="type-h5 line-clamp-2 block text-navy-900 group-hover:underline in-[.on-dark]:text-white">{video.title}</span>
        <span className="mt-1 block text-[0.9375rem] text-ink-muted in-[.on-dark]:text-white/76">
          <time dateTime={video.published}>{formatVideoDate(video.published)}</time>
        </span>
      </span>
    </a>
  )
}

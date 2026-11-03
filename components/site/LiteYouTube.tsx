'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { youTubeEmbedUrl } from '@/lib/youtube'
import { thumbnailUrl } from '@/lib/sermons'
import { cn } from '@/lib/utils'

/**
 * Thumbnail with a round play button; the youtube-nocookie player loads only after the visitor
 * chooses to play (no autoplay, no third-party requests before that).
 */
export function LiteYouTube({ id, title, sizes = '(min-width: 960px) 700px, 100vw', className }: { id: string; title: string; sizes?: string; className?: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className={cn('aspect-video overflow-hidden rounded-tile-md bg-navy-950', className)}>
        <iframe
          src={`${youTubeEmbedUrl(id)}?autoplay=1`}
          title={title}
          className="size-full"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className={cn('group relative block aspect-video w-full overflow-hidden rounded-tile-md bg-navy-950', className)}
    >
      <Image src={thumbnailUrl(id)} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-0 bg-navy-950/20" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg transition-colors duration-150 group-hover:bg-emblem-sky-50 sm:size-[84px]"
      >
        <Play className="ml-1 size-7 fill-current sm:size-8" strokeWidth={0} />
      </span>
    </button>
  )
}

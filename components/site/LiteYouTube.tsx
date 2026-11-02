'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { youTubeEmbedUrl } from '@/lib/youtube'
import { thumbnailUrl } from '@/lib/sermons'

/**
 * Thumbnail with a play button; the youtube-nocookie player loads only after the visitor
 * chooses to play (no autoplay, no third-party requests before that).
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl bg-navy-950">
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
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-navy-950"
    >
      <Image src={thumbnailUrl(id)} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      <span className="absolute inset-0 bg-navy-950/30" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-navy-900 shadow-lg group-hover:bg-emblem-sky-50">
        <Play aria-hidden="true" className="size-5 fill-current" />
        Play<span className="sr-only">: {title}</span>
      </span>
    </button>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils'
import { Play, Clock, Calendar } from 'lucide-react'
import { Sermon } from '@/lib/types'

interface SermonCardProps {
  sermon: Sermon
}

export default function SermonCard({ sermon }: SermonCardProps) {
  return (
    <Link
      href={`/sermons/${sermon.slug.current}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-border hover:border-primary/50 hover:-translate-y-2"
    >
      {/* Thumbnail */}
      <div className="relative h-56 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        {sermon.thumbnail ? (
          <Image
            src={urlFor(sermon.thumbnail).width(400).height(300).url()}
            alt={sermon.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="text-white" size={56} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/40 transition-colors duration-500" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="text-primary ml-1" size={32} fill="currentColor" />
          </div>
        </div>

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">{formatDate(sermon.date)}</span>
          </div>
        </div>

        {/* Duration badge */}
        {sermon.duration && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-white" />
              <span className="text-xs font-semibold text-white">{sermon.duration} min</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {sermon.title}
        </h3>

        {sermon.scripture && sermon.scripture.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-1.5 mb-4">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs font-medium text-primary">
              {sermon.scripture.join(', ')}
            </span>
          </div>
        )}

        {/* Speaker info */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          {sermon.speaker.photo ? (
            <Image
              src={urlFor(sermon.speaker.photo).width(48).height(48).url()}
              alt={sermon.speaker.name}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              {sermon.speaker.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">{sermon.speaker.name}</p>
            <p className="text-xs text-muted-foreground">Speaker</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

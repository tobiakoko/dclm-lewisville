import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils'
import { Play, Clock } from 'lucide-react'
import { Sermon } from '@/lib/types'

interface SermonCardProps {
  sermon: Sermon
}

export default function SermonCard({ sermon }: SermonCardProps) {
  return (
    <Link
      href={`/sermons/${sermon.slug.current}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-linear-to-br from-blue-500 to-purple-600">
        {sermon.thumbnail ? (
          <Image
            src={urlFor(sermon.thumbnail).width(400).height(300).url()}
            alt={sermon.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="text-white" size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="text-blue-600 ml-1" size={24} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <span>{formatDate(sermon.date)}</span>
          {sermon.duration && (
            <>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{sermon.duration} min</span>
              </div>
            </>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {sermon.title}
        </h3>

        {sermon.scripture && sermon.scripture.length > 0 && (
          <div className="text-sm text-gray-600 mb-3">
            {sermon.scripture.join(', ')}
          </div>
        )}

        <div className="flex items-center space-x-3">
          {sermon.speaker.photo && (
            <Image
              src={urlFor(sermon.speaker.photo).width(40).height(40).url()}
              alt={sermon.speaker.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div className="text-sm text-gray-600">{sermon.speaker.name}</div>
        </div>
      </div>
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import { Sermon } from '@/lib/types'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils'

interface FeaturedSermonProps {
  sermon: Sermon | null
}

export default function FeaturedSermon({ sermon }: FeaturedSermonProps) {
  if (!sermon) {
    return null
  }

  return (
    <section className="py-24 bg-white relative">
      {/* Simplified decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header - Simplified */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Recent Sermon
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Watch our most recent message and grow deeper in your faith
          </p>
        </div>

        {/* Featured Sermon Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300 group">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Thumbnail Side */}
              <div className="relative h-64 md:h-auto min-h-[300px] bg-primary overflow-hidden">
                {sermon.thumbnail ? (
                  <Image
                    src={urlFor(sermon.thumbnail).width(600).height(400).url()}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="text-white" size={80} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/40 transition-colors duration-500" />

                {/* Play button overlay */}
                <Link
                  href={`/sermons/${sermon.slug.current}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-primary ml-1" size={40} fill="currentColor" />
                  </div>
                </Link>

                {/* Duration badge */}
                {sermon.duration && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-white" />
                      <span className="text-sm font-semibold text-white">{sermon.duration} min</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar size={16} className="text-primary" />
                  <span>{formatDate(sermon.date)}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">
                  {sermon.title}
                </h3>

                {/* Scripture */}
                {sermon.scripture && sermon.scripture.length > 0 && (
                  <div className="inline-flex items-center gap-2 bg-muted rounded-md px-3 py-2 mb-6 self-start">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-sm font-medium text-foreground/80">
                      {sermon.scripture.join(', ')}
                    </span>
                  </div>
                )}

                {/* Description */}
                {sermon.description && (
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {sermon.description}
                  </p>
                )}

                {/* Speaker */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  {sermon.speaker.photo ? (
                    <Image
                      src={urlFor(sermon.speaker.photo).width(56).height(56).url()}
                      alt={sermon.speaker.name}
                      width={56}
                      height={56}
                      className="rounded-full ring-2 ring-border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {sermon.speaker.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{sermon.speaker.name}</p>
                    {sermon.speaker.title && (
                      <p className="text-sm text-muted-foreground">{sermon.speaker.title}</p>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 transition-colors group/btn self-start"
                >
                  <Link href={`/sermons/${sermon.slug.current}`} className="flex items-center gap-2">
                    <Play className="w-4 h-4" fill="currentColor" />
                    Watch Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Sermons Link */}
        <div className="text-center mt-16">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group/link"
          >
            <Link href="/sermons" className="flex items-center gap-2">
              View All Sermons
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

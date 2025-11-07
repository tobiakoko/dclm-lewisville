import { client } from '@/lib/sanity/client'
import { sermonQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Share2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SermonCard from '@/components/SermonCard'
import SermonPlayer from '@/components/SermonPlayer'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const sermon = await client.fetch(sermonQuery, { slug: params.slug })
  
  if (!sermon) return {}

  return {
    title: sermon.title,
    description: sermon.description || `Listen to "${sermon.title}" by ${sermon.speaker.name}`,
    openGraph: {
      title: sermon.title,
      description: sermon.description,
      images: sermon.thumbnail ? [urlFor(sermon.thumbnail).width(1200).height(630).url()] : [],
    },
  }
}

export default async function SermonDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const sermon = await client.fetch(sermonQuery, { slug: params.slug })

  if (!sermon) {
    notFound()
  }

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center space-x-2 text-sm mb-4 opacity-90">
            <Link href="/sermons" className="hover:underline">Sermons</Link>
            <span>/</span>
            {sermon.series && (
              <>
                <Link href={`/sermons?series=${sermon.series.slug.current}`} className="hover:underline">
                  {sermon.series.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span>{sermon.title}</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {sermon.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {formatDate(sermon.date)}
            </div>
            {sermon.duration && (
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {sermon.duration} minutes
              </div>
            )}
            {sermon.scripture && sermon.scripture.length > 0 && (
              <div className="bg-white/20 px-3 py-1 rounded">
                {sermon.scripture.join(', ')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Audio/Video Player */}
              <div className="mb-8">
                {sermon.audioFile && (
                  <SermonPlayer
                    audioUrl={sermon.audioFile.asset.url}
                    title={sermon.title}
                    speaker={sermon.speaker.name}
                  />
                )}
                
                {sermon.videoUrl && (
                  <div className="mt-6 aspect-video rounded-lg overflow-hidden">
                    {sermon.videoUrl.includes('youtube.com') || sermon.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={sermon.videoUrl.replace('watch?v=', 'embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title={sermon.title}
                      />
                    ) : sermon.videoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={sermon.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                        className="w-full h-full"
                        allowFullScreen
                        title={sermon.title}
                      />
                    ) : (
                      <video controls className="w-full h-full">
                        <source src={sermon.videoUrl} />
                      </video>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              {sermon.description && (
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold mb-4">About This Message</h2>
                  <p className="text-gray-700 leading-relaxed">{sermon.description}</p>
                </div>
              )}

              {/* Transcript */}
              {sermon.transcript && (
                <div className="mb-8 bg-gray-50 rounded-lg p-6">
                  <h2 className="font-heading text-2xl font-bold mb-4">Transcript</h2>
                  <div className="prose prose-lg max-w-none">
                    {/* You'd render the portable text here */}
                    <p className="text-gray-700">{sermon.transcript}</p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {sermon.tags && sermon.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold mb-3">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24 space-y-6">
                {/* Speaker Info */}
                <div>
                  <h3 className="font-bold mb-3">Speaker</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    {sermon.speaker.photo && (
                      <Image
                        src={urlFor(sermon.speaker.photo).width(60).height(60).url()}
                        alt={sermon.speaker.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{sermon.speaker.name}</div>
                      <div className="text-sm text-gray-600">{sermon.speaker.title}</div>
                    </div>
                  </div>
                  {sermon.speaker.bio && (
                    <p className="text-sm text-gray-600">{sermon.speaker.bio}</p>
                  )}
                </div>

                {/* Series Info */}
                {sermon.series && (
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-3">Part of Series</h3>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="font-medium mb-2">{sermon.series.title}</div>
                      {sermon.series.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {sermon.series.description}
                        </p>
                      )}
                      <Link
                        href={`/sermons?series=${sermon.series.slug.current}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View all sermons in this series →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="border-t pt-6 space-y-3">
                  <h3 className="font-bold mb-3">Actions</h3>
                  
                  {sermon.audioFile && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={sermon.audioFile.asset.url} download>
                        <Download size={16} className="mr-2" />
                        Download Audio
                      </a>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: sermon.title,
                          text: `Listen to "${sermon.title}" by ${sermon.speaker.name}`,
                          url: window.location.href,
                        })
                      }
                    }}
                  >
                    <Share2 size={16} className="mr-2" />
                    Share Sermon
                  </Button>
                </div>

                {/* Scripture References */}
                {sermon.scripture && sermon.scripture.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-3">Scripture References</h3>
                    <ul className="space-y-2">
                      {sermon.scripture.map((ref) => (
                        <li key={ref} className="text-sm">
                          <a
                            href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=NIV`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {ref} →
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sermons */}
      {sermon.relatedSermons && sermon.relatedSermons.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="font-heading text-3xl font-bold mb-8">Related Sermons</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {sermon.relatedSermons.map((relatedSermon) => (
                <SermonCard key={relatedSermon._id} sermon={relatedSermon} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

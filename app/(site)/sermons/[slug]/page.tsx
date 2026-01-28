import { client } from '@/lib/sanity/client'
import { sermonQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Share2, Download, PlayCircle, Headphones, BookOpen, User, Tag, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

// --- Fallback Data for UI Preview ---
const PLACEHOLDER_SERMON = {
  title: "The All-Sufficient Name of Jesus",
  description: "In this powerful message, we explore the authority, power, and comfort found in the name of Jesus. Discover how His name is the key to unlocking every promise of God in your life.",
  date: "2026-01-14",
  duration: 58,
  speaker: {
    name: "Pastor W.F. Kumuyi",
    title: "General Superintendent",
    bio: "A humble servant of God committed to preaching the unadulterated truth of the Gospel.",
    photo: null // Will use fallback icon
  },
  series: {
    title: "Conditions of Security",
    slug: { current: "conditions-of-security" },
    description: "A 4-part series on finding safety in Christ."
  },
  scripture: ["Philippians 2:9-11", "Acts 4:12", "John 14:13"],
  tags: ["Faith", "Prayer", "Authority", "Salvation"],
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example ID
  audioFile: { asset: { url: "#" } }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const sermon = await client.fetch(sermonQuery, { slug: params.slug })
    if (!sermon) return { title: 'Sermon Not Found' }
    return {
      title: sermon.title,
      description: sermon.description,
    }
  } catch (error) {
    return { title: 'Sermon Details' }
  }
}

export default async function SermonDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let sermonData = null

  try {
    sermonData = await client.fetch(sermonQuery, { slug: params.slug })
  } catch (error) {
    // Fail silently
  }

  // Use fallback if sanity fails or returns null
  const sermon = sermonData || PLACEHOLDER_SERMON

  if (!sermon && !sermonData) {
    notFound()
  }

  // Helper to extract YouTube ID for embed
  const getEmbedUrl = (url: string) => {
    if (!url) return null
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=') ? url.split('v=')[1] : url.split('/').pop()
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[var(--church-navy)]">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--church-navy)] via-[var(--church-navy)]/90 to-[var(--church-navy)]/70" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIhPjucaEn1H4mnfRBUyJ7uJ1ekby9Nceih4ThLydW5fr7QlbmkK_4TAEZdto7YLXwzDYR750nwSQUnR-T1s2mltdaGAMys6JCWVr3nOUr5xU9GrbLWvg0p5vidDRJ4KUAGRhLAIN6phtQ2u7o54iqvAcHqeoAkqRs7SkX-_Y3CH6AsDgXFt0CWpA3UlA1ugwnuyp0EKCEf37_FvbF5_bFEaBy8GjFcERW3BVA5JrK8la5RrVU0jG3M-blNJDoRVe4PlwNZfWTm-g" // Generic worship bg
            alt="Background"
            fill
            className="object-cover opacity-30 mix-blend-overlay blur-sm"
            priority
          />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-white/60 mb-6 font-medium tracking-wide">
              <Link href="/sermons" className="hover:text-white transition-colors">Sermons</Link>
              <span>/</span>
              {sermon.series && (
                <>
                  <Link href={`/sermons?series=${sermon.series.slug.current}`} className="hover:text-white transition-colors">
                    {sermon.series.title}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-white truncate">{sermon.title}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {sermon.title}
            </h1>

            {/* Meta Data Row */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-white/80 font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[var(--church-red)]" />
                {formatDate(sermon.date)}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-[var(--church-red)]" />
                {sermon.speaker.name}
              </div>
              {sermon.duration && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[var(--church-red)]" />
                  {sermon.duration} mins
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content Grid --- */}
      <section className="py-12 px-6 -mt-10 relative z-20">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Media & Content (Span 8) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Video Player */}
              {sermon.videoUrl && (
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video ring-1 ring-white/10">
                  <iframe
                    src={getEmbedUrl(sermon.videoUrl) || ''}
                    className="w-full h-full"
                    allowFullScreen
                    title={sermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}

              {/* Audio Player (If video exists, this sits below as an option) */}
              {sermon.audioFile && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--church-navy)]/5 text-[var(--church-navy)] flex items-center justify-center shrink-0">
                    <Headphones size={24} />
                  </div>
                  <div className="grow">
                    <p className="text-xs font-bold uppercase text-slate-400 mb-1">Audio Only</p>
                    <audio 
                      controls 
                      className="w-full h-8"
                      src={sermon.audioFile.asset.url}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <a 
                    href={sermon.audioFile.asset.url} 
                    download 
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--church-navy)] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              )}

              {/* Sermon Notes / Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="font-serif text-2xl font-bold text-[var(--church-navy)] mb-6">About This Message</h2>
                
                {sermon.description && (
                  <p className="text-slate-600 leading-relaxed text-lg mb-8">
                    {sermon.description}
                  </p>
                )}

                {/* Transcript / Full Text */}
                {sermon.transcript && (
                  <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-a:text-[var(--church-red)]">
                     <hr className="my-8 border-slate-100" />
                     <h3 className="text-xl font-bold">Transcript</h3>
                     <PortableText value={sermon.transcript} />
                  </div>
                )}

                {/* Tags */}
                {sermon.tags && sermon.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {sermon.tags.map((tag: string) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-[var(--church-navy)] hover:text-white transition-colors cursor-pointer">
                          <Tag size={12} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar (Span 4) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Sticky Wrapper */}
              <div className="sticky top-24 space-y-6">
                
                {/* Speaker Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Speaker</h3>
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                      {sermon.speaker.photo ? (
                        <Image
                          src={urlFor(sermon.speaker.photo).width(120).height(120).url()}
                          alt={sermon.speaker.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[var(--church-navy)] flex items-center justify-center text-white">
                          <User size={32} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--church-navy)] text-lg">{sermon.speaker.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{sermon.speaker.title}</p>
                      <Link href="/about" className="text-xs font-bold text-[var(--church-red)] hover:underline">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Series Card */}
                {sermon.series && (
                  <div className="bg-[var(--church-navy)] rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--church-red)] rounded-full blur-[60px] opacity-20" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 relative z-10">Part of Series</h3>
                    <div className="relative z-10">
                      <h4 className="font-serif text-2xl font-bold mb-2">{sermon.series.title}</h4>
                      {sermon.series.description && (
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{sermon.series.description}</p>
                      )}
                      <Link
                        href={`/sermons?series=${sermon.series.slug.current}`}
                        className="inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--church-red)] transition-colors"
                      >
                        <PlayCircle size={16} /> View Full Series
                      </Link>
                    </div>
                  </div>
                )}

                {/* Scripture Card */}
                {sermon.scripture && sermon.scripture.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Scripture Focus</h3>
                    <ul className="space-y-3">
                      {sermon.scripture.map((ref: string) => (
                        <li key={ref}>
                          <a
                            href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=KJV`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between group p-3 rounded-lg bg-slate-50 hover:bg-[var(--church-navy)] hover:text-white transition-all duration-300"
                          >
                            <span className="flex items-center gap-2 font-serif font-medium">
                              <BookOpen size={16} className="text-[var(--church-red)] group-hover:text-white" />
                              {ref}
                            </span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share Actions */}
                <div className="bg-slate-100 rounded-xl p-4">
                  <h3 className="sr-only">Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                       className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-[var(--church-red)] hover:text-[var(--church-red)] transition-all shadow-sm"
                       onClick={() => {
                        // Native share fallback
                        if (typeof navigator !== 'undefined' && navigator.share) {
                          navigator.share({ title: sermon.title, url: window.location.href })
                        }
                       }}
                     >
                       <Share2 size={16} /> Share
                     </button>
                     {sermon.audioFile && (
                        <a 
                          href={sermon.audioFile.asset.url} 
                          download
                          className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-[var(--church-navy)] hover:text-[var(--church-navy)] transition-all shadow-sm"
                        >
                          <Download size={16} /> Save
                        </a>
                     )}
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* --- Related Sermons --- */}
      {sermon.relatedSermons && sermon.relatedSermons.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-3xl font-bold text-[var(--church-navy)]">More Like This</h2>
              <Link href="/sermons" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--church-red)]">
                View Library <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* In a real scenario, you'd map sermon.relatedSermons to a SermonCard component here */}
              <div className="col-span-3 text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                <p>Related sermons component would render here</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
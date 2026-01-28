import { client } from '@/lib/sanity/client'
import { ministryQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { Calendar, Clock, MapPin, Mail, Phone, Users, ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'

// --- Fallback Data for Development/Preview ---
const PLACEHOLDER_MINISTRY = {
  name: "Children's Ministry",
  mission: "Nurturing the next generation with biblical truth in a fun, safe, and engaging environment where every child feels loved.",
  fullDescription: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ text: "We believe that children are not just the church of tomorrow, but the church of today. Our ministry is dedicated to partnering with parents to raise children who know God, love His Word, and share His love with others.", _type: 'span' }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ text: "Through interactive lessons, worship, and games, we create an atmosphere where faith comes alive. Our curriculum is designed to take children through the Bible in a way that is age-appropriate and relevant to their lives.", _type: 'span' }]
    }
  ],
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCbox8_B95JCEqDYNNx_6cJHF7tAeb-M8-LH7a0_o2UR9zXsJF2AX101jmsqpYHBu7eKHa2nNKODqg7J2pTI4guRszXXubAkiDIkN-Zmt33JMrTll4h5kg8CsVkFUb2f7xHT_eG-j4GUHB0QD68l7GvA8U-x7KVw_AW3b8dpPEpTewOy4JzOTlMVuDZiVEi2H-aq5g9-XK19rHnS-eglE-qiPhsXaIj5HEhq_-cTIoxrIdIUcKrVRdq8DL9ipZnVT4Ea_M_KHFNbs' // Using one of your previous placeholders
  ],
  activities: [
    { title: "Sunday School", description: "Weekly bible lessons tailored for different age groups." },
    { title: "Vacation Bible School", description: "A week-long summer event filled with fun, games, and learning." },
    { title: "Kids Choir", description: "Learning to worship God through song and performance." }
  ],
  leader: {
    name: "Sister Sarah Johnson",
    title: "Ministry Director",
    bio: "Sarah has been serving in children's ministry for over 15 years and has a passion for seeing kids grow in Christ.",
    photo: null, // Will use fallback icon
    email: "kids@dclmlewisville.org",
    phone: "(555) 123-4567"
  },
  meetingDay: "Sunday",
  meetingTime: "10:00 AM",
  location: "Children's Hall, Building B",
  contactEmail: "kids@dclmlewisville.org"
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const ministry = await client.fetch(ministryQuery, { slug: params.slug })
    if (!ministry) return { title: 'Ministry Not Found' }
    return {
      title: ministry.name,
      description: ministry.mission,
    }
  } catch (error) {
    return { title: 'Ministry Details' }
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let ministry = null

  try {
    ministry = await client.fetch(ministryQuery, { slug: params.slug })
  } catch (error) {
    // Fail silently in build/dev without creds
  }

  // Use fallback if sanity fails or returns null (for UI preview purposes)
  const data = ministry || PLACEHOLDER_MINISTRY

  if (!data && !ministry) {
    notFound()
  }

  // Helper to get image URL safely
  const getImageUrl = (source: any) => {
    if (!source) return '/images/ministry-placeholder.jpg' // Local fallback
    if (typeof source === 'string') return source // URL string
    try {
      return urlFor(source).width(1200).height(600).url()
    } catch {
      return ''
    }
  }

  const heroImage = data.images && data.images.length > 0 ? getImageUrl(data.images[0]) : null

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)] via-[var(--church-navy)]/60 to-black/30" />
          </div>
        )}

        <div className="relative z-10 container max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-lg">
            Ministry Focus
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            {data.mission}
          </p>
        </div>
      </section>

      {/* --- Main Content Grid --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Content (Span 8) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
              <h2 className="font-serif text-3xl font-bold text-[var(--church-navy)] mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[var(--church-red)] rounded-full"></span>
                About the Ministry
              </h2>
              <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-serif prose-headings:text-[var(--church-navy)] 
                prose-a:text-[var(--church-red)] hover:prose-a:text-[var(--church-navy)]
                prose-img:rounded-2xl prose-img:shadow-lg">
                {data.fullDescription ? (
                  <PortableText value={data.fullDescription} />
                ) : (
                  <p className="text-slate-500 italic">No detailed description available.</p>
                )}
              </div>
            </div>

            {/* Programs / Activities Grid */}
            {data.activities && data.activities.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold text-[var(--church-navy)] mb-8">
                  What We Do
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.activities.map((activity: any, idx: number) => (
                    <div key={idx} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-[var(--church-red)]/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-[var(--church-navy)]/5 text-[var(--church-red)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--church-red)] group-hover:text-white transition-colors">
                        <Users size={24} />
                      </div>
                      <h3 className="font-bold text-xl text-[var(--church-navy)] mb-3">{activity.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Section (Visual Break) */}
            {data.testimonials && data.testimonials.length > 0 && (
              <div className="bg-[var(--church-navy)] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <Quote className="absolute top-8 right-8 text-white/10 w-32 h-32 rotate-180" />
                <h2 className="font-serif text-3xl font-bold mb-8 relative z-10">Stories of Impact</h2>
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  {data.testimonials.map((t: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
                      <p className="text-lg italic mb-4 font-light text-white/90">"{t.quote}"</p>
                      <p className="font-bold text-[var(--church-red)]">— {t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (Span 4) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Sticky Container */}
            <div className="sticky top-24 space-y-8">
              
              {/* Card 1: Ministry Leader */}
              {data.leader && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    {data.leader.photo ? (
                      <Image
                        src={getImageUrl(data.leader.photo)}
                        alt={data.leader.name}
                        fill
                        className="object-cover rounded-full border-4 border-slate-50 shadow-md"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <Users size={40} />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-[var(--church-red)] text-white p-1.5 rounded-full border-2 border-white">
                      <Users size={12} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--church-navy)]">{data.leader.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--church-red)] mb-4">{data.leader.title}</p>
                  
                  {data.leader.bio && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {data.leader.bio}
                    </p>
                  )}

                  <div className="flex justify-center gap-3">
                     {data.leader.email && (
                       <a href={`mailto:${data.leader.email}`} className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-[var(--church-navy)] hover:text-white transition-colors">
                         <Mail size={18} />
                       </a>
                     )}
                  </div>
                </div>
              )}

              {/* Card 2: Key Information */}
              <div className="bg-[var(--church-navy)] text-white rounded-2xl shadow-xl p-8 overflow-hidden relative">
                {/* Abstract bg shape */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-[var(--church-red)] rounded-full blur-3xl opacity-50" />
                
                <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Ministry Details</h3>
                
                <div className="space-y-6 relative z-10">
                  {(data.meetingDay || data.meetingTime) && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Clock size={20} className="text-[var(--church-red)]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase font-bold tracking-wider">When</p>
                        <p className="font-medium">{data.meetingDay}s at {data.meetingTime}</p>
                      </div>
                    </div>
                  )}

                  {data.location && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-[var(--church-red)]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Where</p>
                        <p className="font-medium">{data.location}</p>
                      </div>
                    </div>
                  )}

                  {(data.contactEmail) && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-[var(--church-red)]" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Contact</p>
                        <a href={`mailto:${data.contactEmail}`} className="font-medium hover:text-[var(--church-red)] transition-colors truncate block">
                          {data.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link 
                    href="/contact" 
                    className="flex items-center justify-center w-full py-4 bg-[var(--church-red)] hover:bg-red-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-red-900/20 group"
                  >
                    Join This Group
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}
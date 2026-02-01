import { client } from '@/lib/sanity/client'
import { ministryQuery } from '@/lib/sanity/queries'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Image, { type StaticImageData } from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { Clock, MapPin, Mail, Users, ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'
import Sisters from '@/app/assets/SistersCongregation.jpeg'
import Brothers from '@/app/assets/BrothersCongregation.jpeg'
import ChoirMinistry from '@/app/assets/Choir_ministry.jpeg'

// --- Fallback Data for Development/Preview ---
interface MinistryData {
  name: string
  mission: string
  fullDescription: Array<{
    _type: string
    style: string
    children: Array<{ text: string; _type: string }>
  }>
  images: (string | StaticImageData)[]
  activities: Array<{ title: string; description: string }>
  leader: {
    name: string
    title: string
    bio: string
    photo: string | null
    email: string
    phone?: string
  }
  meetingDay: string
  meetingTime: string
  location: string
  contactEmail: string
}

const MINISTRIES_DATA: Record<string, MinistryData> = {
  'men': {
    name: "Men's Ministry",
    mission: "A forum where men's matters and issues are discussed from a scriptural perspective with relevance to the culture we find ourselves in.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "The men's group is a forum where men's matters and issues are discussed from a scriptural perspective but with relevance to the culture we find ourselves in. It is a place where men are free to share their stories with the goal to better themselves as men, fathers, or citizens.", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "Come fellowship with us as we learn from Jesus the greatest man that ever lived and you will find healing for your soul.", _type: 'span' }]
      }
    ],
    images: [Brothers],
    activities: [
      { title: "Men's Fellowship", description: "Regular gatherings for fellowship, discussion, and mutual encouragement." },
      { title: "Bible Study", description: "Deep dives into scripture with practical application for men." },
      { title: "Community Outreach", description: "Serving our community together as brothers in Christ." }
    ],
    leader: {
      name: "Brother Emeka Onyejizu",
      title: "Ministry Coordinator",
      bio: "Emeka is passionate about helping men grow in their faith and become godly leaders in their homes and communities.",
      photo: null,
      email: "men@dclmlewisville.org"
    },
    meetingDay: "Saturday",
    meetingTime: "8:00 AM",
    location: "Fellowship Hall",
    contactEmail: "men@dclmlewisville.org"
  },
  'women': {
    name: "Women's Ministry",
    mission: "Come and sit with us at the feet of Christ like Mary, follow along like the women who followed Him from Galilee.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "According to Eternity News \"60 percent of church attenders are women.\" For this reason, we take the women's ministry very seriously.", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "We invite you to come and sit with us at the feet of Christ like Mary (Luke 10:42); follow along like the women who followed him from Galilee (Matthew 27:55,56); Wipe his feet with our hair (John 12:3); call on him when our loved ones are sick (John 11:3); exercise our faith in him (Matthew 15:27,28); worship him with our substance (Matthew 12:44); check up on him like Mary Magdalene (Matthew 28:1); be the first to preach \"He is alive!\" (Mark 16:9-11)", _type: 'span' }]
      }
    ],
    images: [Sisters],
    activities: [
      { title: "Women's Fellowship", description: "Regular gatherings for prayer, worship, and mutual encouragement." },
      { title: "Bible Study", description: "Deep exploration of scripture with practical application for women." },
      { title: "Mentorship Program", description: "Older women mentoring younger women in faith and life." }
    ],
    leader: {
      name: "Sister Folake Agbo",
      title: "Ministry Director",
      bio: "Folake has been serving in women's ministry for over a decade and is passionate about seeing women grow in Christ.",
      photo: null,
      email: "women@dclmlewisville.org"
    },
    meetingDay: "Saturday",
    meetingTime: "10:00 AM",
    location: "Main Sanctuary",
    contactEmail: "women@dclmlewisville.org"
  },
  'young-adults': {
    name: "Young Adult Ministry",
    mission: "A family of college-aged believers in the DFW area committed to achieving heaven's goal through Jesus.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "Young adult group is a family of college-aged believers in the Dallas Fort Worth (DFW) area committed to achieving heaven's goal through Jesus and leading others to life transformation through Him.", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "If you are in this age group, please contact Pastor John Enoh (enojoneno@gmail.com) for more information.", _type: 'span' }]
      }
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NC2J5snrEgRENoC28kpRejd5AnmLHbjwXFqNVaXtGlJpwYib1_ajYMrrwycrkTtv8bGcongNZBjnpG0UJdBxkeKRXS60HJ3gWUlhQ5AulYbhGG80Gdb19MdAmei3G0mBfumzsM54uxzh8iuHMzSD9K91OOA0cbZSjL2GfZA3icsAP3n5r-J98DLZL23ZvLu3wQe-JoBgnfmwGgJ2jXadqdeoypOmc9Kr-tHQQu7JsYWvx5ArcNVqXrmRjncCmOA2a8xmEnGnf7M'
    ],
    activities: [
      { title: "Weekly Fellowship", description: "Regular gatherings for worship, discussion, and community building." },
      { title: "Bible Study", description: "Engaging with scripture in ways relevant to young adult life." },
      { title: "Outreach Events", description: "Serving the community and reaching other young adults with the gospel." }
    ],
    leader: {
      name: "Pastor John Enoh",
      title: "Young Adults Pastor",
      bio: "Pastor John is dedicated to helping young adults navigate life's challenges while growing in their faith.",
      photo: null,
      email: "enojoneno@gmail.com"
    },
    meetingDay: "Friday",
    meetingTime: "7:00 PM",
    location: "Youth Building",
    contactEmail: "enojoneno@gmail.com"
  },
  'youth': {
    name: "Youth Ministry",
    mission: "A church where every youth is taught about Jesus and challenged to grow in their relationship with God.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "Our Youth Ministry caters to youth from junior high and senior high students (7th through 12th grade). Our mission is to be a Church where every youth is taught about Jesus and challenged to grow.", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "We provide an environment for young people to be engaged in service, make great friends, and grow in their relationships with God.", _type: 'span' }]
      }
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTzR-F9sUEUsKSYtny5AGn8iejhrOciykGWEDMY_lHuSoYDGpi670nf3Grw5UP_-EUT1s-yMR7guOlzCy4lmDYr9w4f6UNeFg50LFdEsON-jqDVUPuuUoUU9ScPPhgfAoWF_H7_mXOdruwGP5iFbN1bG_i_Gb3sYnSgGg7z5Bigg7bGmHrU3pYc1ifStWpDdK3XNkm-O3Z4mWWSUAtBq_N09aRkXZSOv8QUoBN8FFAzrKphPj6DzwMU0cz8BDDFGe25ba9Q4IvFNU'
    ],
    activities: [
      { title: "Youth Service", description: "Weekly gatherings designed specifically for teenagers." },
      { title: "Youth Bible Study", description: "Diving deep into God's Word together." },
      { title: "Community Service", description: "Learning to serve others and make a difference." },
      { title: "Youth Events", description: "Fun activities that build friendships and faith." }
    ],
    leader: {
      name: "Brother Joseph",
      title: "Youth Pastor",
      bio: "Brother Joseph is passionate about helping young people discover their purpose in Christ.",
      photo: null,
      email: ''
    },
    meetingDay: "Sunday",
    meetingTime: "10:00 AM",
    location: "Youth Room",
    contactEmail: ""
  },
  'children': {
    name: "Children's Ministry",
    mission: "Designed for kids up to 12th Grade to engage with scripture at an age-appropriate level.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "\"And that from a child thou hast known the holy scriptures, which are able to make thee wise unto salvation through faith which is in Christ Jesus.\" (2 Timothy 3:15)", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "The Children's Ministry is designed for kids up to 5th Grade to engage with scripture at a level that is appropriate for their specific age group. We believe that parents are the primary faith trainers of their children, so we also seek to provide resources to parents, helping them engage their kids with the holy scriptures throughout the week.", _type: 'span' }]
      }
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCbox8_B95JCEqDYNNx_6cJHF7tAeb-M8-LH7a0_o2UR9zXsJF2AX101jmsqpYHBu7eKHa2nNKODqg7J2pTI4guRszXXubAkiDIkN-Zmt33JMrTll4h5kg8CsVkFUb2f7xHT_eG-j4GUHB0QD68l7GvA8U-x7KVw_AW3b8dpPEpTewOy4JzOTlMVuDZiVEi2H-aq5g9-XK19rHnS-eglE-qiPhsXaIj5HEhq_-cTIoxrIdIUcKrVRdq8DL9ipZnVT4Ea_M_KHFNbs'
    ],
    activities: [
      { title: "Sunday School", description: "Weekly Bible lessons tailored for different age groups." },
      { title: "Vacation Bible School", description: "A week-long summer event filled with fun, games, and learning." },
      { title: "Kids Choir", description: "Learning to worship God through song and performance." },
      { title: "Parent Resources", description: "Tools and materials to help parents disciple their children at home." }
    ],
    leader: {
      name: "Sister Mary",
      title: "Ministry Director",
      bio: "Mary has been serving in children's ministry for years and has a passion for seeing kids grow in Christ.",
      photo: null,
      email: ""
    },
    meetingDay: "Sunday",
    meetingTime: "10:00 AM",
    location: "Children's Room",
    contactEmail: ""
  },
  'music': {
    name: "Music Ministry",
    mission: "Leading the congregation in spirit-filled worship through excellence in music.",
    fullDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "Our Music Ministry is dedicated to leading the congregation into the presence of God through anointed and excellent worship. We believe that music is a powerful tool for spiritual connection and transformation.", _type: 'span' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: "Whether you sing, play an instrument, or work with sound and media, there is a place for you to serve in this ministry. We welcome all who have a heart for worship to join us.", _type: 'span' }]
      }
    ],
    images: [ChoirMinistry],
    activities: [
      { title: "Choir", description: "Vocal praise team ministering through song." },
      { title: "Instrumentalists", description: "Musicians who provide musical accompaniment for services." },
      { title: "Sound & Media", description: "Technical team ensuring excellent audio and visual experience." }
    ],
    leader: {
      name: "Sister Folake Agbo",
      title: "Music Director",
      bio: "Folake has been leading worship for years and is committed to excellence in ministry.",
      photo: null,
      email: ""
    },
    meetingDay: "Saturday",
    meetingTime: "4:00 PM",
    location: "Main Sanctuary",
    contactEmail: ""
  }
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const ministry = await client.fetch(ministryQuery, { slug })
    if (ministry) {
      return {
        title: ministry.name,
        description: ministry.mission,
      }
    }
  } catch {
    // Fall through to static data
  }

  // Use static data for metadata
  const staticData = MINISTRIES_DATA[slug]
  if (staticData) {
    return {
      title: staticData.name,
      description: staticData.mission,
    }
  }

  return { title: 'Ministry Details' }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(
      groq`*[_type == "ministry" && defined(slug.current)][].slug.current`
    )
    return slugs
      .map((slug) => ({ slug }))
  } catch {
    // Fall back to static slugs to ensure pages still render without CMS
    return Object.keys(MINISTRIES_DATA).map((slug) => ({ slug }))
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let ministry = null

  try {
    ministry = await client.fetch(ministryQuery, { slug })
  } catch {
    // Fail silently in build/dev without creds
  }

  // Use Sanity data if available, otherwise use static data based on slug
  const staticData = MINISTRIES_DATA[slug]
  const data = ministry || staticData

  if (!data) {
    notFound()
  }

  // Helper to check if source is a StaticImageData object
  const isStaticImageData = (source: any): source is StaticImageData => {
    return source && typeof source === 'object' && 'src' in source
  }

  // Helper to get image URL safely
  const getImageUrl = (source: any): string | StaticImageData => {
    if (!source) return '/images/ministry-placeholder.jpg' // Local fallback
    if (typeof source === 'string') return source // URL string
    if (isStaticImageData(source)) return source // StaticImageData from imports
    try {
      return urlFor(source).width(1200).height(600).url()
    } catch {
      return '/images/ministry-placeholder.jpg'
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

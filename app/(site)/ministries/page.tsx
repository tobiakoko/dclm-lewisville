import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Users, Music, BookOpen, Baby, Shield, Sparkles } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'

export const metadata = {
  title: 'Our Ministries',
  description: 'Explore the various ministries at DCLM Lewisville and find your place to serve.',
}

// Enhanced placeholder data with descriptions and specific icons
const STATIC_MINISTRIES = [
  {
    title: "Women's Ministry",
    description: "Empowering women to grow in faith through fellowship, prayer, and mentorship.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXbkwd3rhaBTkC-FSQ9wvxz-kV5bgWEQ0UyFF_3R59ddeDNGY9sv5OXL_YVXcLBUUWQN7B27N9ECMotWhIB30fsYJ1v9nRvELdbyS3sWlO1IlwQ2ABqVc3V4VU8W8Z4OUZcbwrOGmZmePzoSxhrh0AHhSNQAbutHemxxrsMDTjt7NyNxL6SiCGiz48JNITagtimYjXMM_YpaVYX_MRW7-Xctc80S9cTh07JNb7epVyZudxFWGXdOyKFMVuktdAKEFTcJk2LV9Mu38',
    icon: Heart,
    slug: 'women',
    size: 'large' // Spans 2 columns
  },
  {
    title: "Children's Ministry",
    description: "Nurturing the next generation with biblical truth in a fun, safe environment.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCbox8_B95JCEqDYNNx_6cJHF7tAeb-M8-LH7a0_o2UR9zXsJF2AX101jmsqpYHBu7eKHa2nNKODqg7J2pTI4guRszXXubAkiDIkN-Zmt33JMrTll4h5kg8CsVkFUb2f7xHT_eG-j4GUHB0QD68l7GvA8U-x7KVw_AW3b8dpPEpTewOy4JzOTlMVuDZiVEi2H-aq5g9-XK19rHnS-eglE-qiPhsXaIj5HEhq_-cTIoxrIdIUcKrVRdq8DL9ipZnVT4Ea_M_KHFNbs',
    icon: Baby,
    slug: 'children',
    size: 'normal'
  },
  {
    title: 'Youth Ministry',
    description: "Equipping teenagers to navigate life with a biblical worldview and passion for Christ.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTzR-F9sUEUsKSYtny5AGn8iejhrOciykGWEDMY_lHuSoYDGpi670nf3Grw5UP_-EUT1s-yMR7guOlzCy4lmDYr9w4f6UNeFg50LFdEsON-jqDVUPuuUoUU9ScPPhgfAoWF_H7_mXOdruwGP5iFbN1bG_i_Gb3sYnSgGg7z5Bigg7bGmHrU3pYc1ifStWpDdK3XNkm-O3Z4mWWSUAtBq_N09aRkXZSOv8QUoBN8FFAzrKphPj6DzwMU0cz8BDDFGe25ba9Q4IvFNU',
    icon: Sparkles,
    slug: 'youth',
    size: 'normal'
  },
  {
    title: 'Young Adult Ministry',
    description: "Building authentic community and deeper discipleship for ages 18-30.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NC2J5snrEgRENoC28kpRejd5AnmLHbjwXFqNVaXtGlJpwYib1_ajYMrrwycrkTtv8bGcongNZBjnpG0UJdBxkeKRXS60HJ3gWUlhQ5AulYbhGG80Gdb19MdAmei3G0mBfumzsM54uxzh8iuHMzSD9K91OOA0cbZSjL2GfZA3icsAP3n5r-J98DLZL23ZvLu3wQe-JoBgnfmwGgJ2jXadqdeoypOmc9Kr-tHQQu7JsYWvx5ArcNVqXrmRjncCmOA2a8xmEnGnf7M',
    icon: Users,
    slug: 'young-adults',
    size: 'large'
  },
  {
    title: "Men's Ministry",
    description: "Sharpening men to be godly leaders in their homes, workplaces, and community.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIyApWRxmETEml3qkWO1l3DSH4gPbErNYuP2qrPLWXkiU6NwPqeNXl1oUO_WlX1Je55B70ekZH7JCQGmg1cP3E_RuCNa8QV-gTMxwGaOzwXg2Btt6cRT-isuU1n0zCDPVMH9dlH-VdmiCWMEzICtnRNsTOyHOdPkmcVPQpJR8TrE7X2kFO-25VvRSGB7Ti0-qjL10JO2pePdn7fX2uTLqlpSKR5w7e7YXEIGavYnZ8hHvy-EkWJTX0aSj0_3Pf_T6c8FJAVXTUzQ',
    icon: Shield,
    slug: 'men',
    size: 'normal'
  },
  {
    title: 'Music Ministry',
    description: "Leading the congregation in spirit-filled worship through excellence in music.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi1lr5rjLDmmyxVWmzTbF3NO_2wcigi_ofsYpcJ0KkSYqhAxlOVymjg3UeuFY-GsQhvmNBEzaJMZcN8nwuX-w8JrgxIv3vsRKVqK-ltcFolF0tkr63UPwUh2LtCPI7N3uVpfiYsbVdEkYcfqx2H5YPN5Kv4MOnSR9OCesGJhHFhDYdH-S4aP_vn_vj4h74n-ikzEN-zrIc8SxmsIk_hMmvnKTZbnDKYdO7vCzACPUTd5d2FfeHfPayuM60GN-nOyIX-zIxuUovYcQ',
    icon: Music,
    slug: 'music',
    size: 'normal'
  },
]

async function getMinistriesData() {
  try {
    const data = await client.fetch(groq`
      *[_type == "ministry"] | order(order asc) {
        _id,
        name,
        slug,
        description,
        "imageUrl": image.asset->url,
        meetingTime,
        meetingDay
      }
    `)
    return data.length > 0 ? data : null
  } catch (error) {
    return null
  }
}

export default async function MinistriesPage() {
  const sanityMinistries = await getMinistriesData()
  
  // Use Sanity data if available, otherwise map static data to match structure
  const ministries = sanityMinistries || STATIC_MINISTRIES

  return (
    <main className="bg-slate-50">
      <HeroSection
        title="Ministries"
        subtitle="Find your place. Serve with purpose."
        backgroundImage="/images/ministry-hero.jpg"
      />

      {/* --- Introduction & Statistics --- */}
      <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="intro-heading">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--church-navy)]/5 text-[var(--church-navy)] text-xs font-bold tracking-[0.2em] uppercase">
              <Users size={14} />
              Connect & Grow
            </span>
            
            <h2 id="intro-heading" className="text-4xl md:text-5xl font-serif font-bold text-[var(--church-navy)] leading-[1.1]">
              A Community for <br />
              <span className="text-[var(--church-red)] italic">Every Season of Life</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              We believe that spiritual growth happens best in community. Whether you are looking 
              for a place to serve, a group to belong to, or a ministry that meets your family's needs, 
              there is a place for you here.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-4xl font-bold text-[var(--church-red)] mb-1">15+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Active Groups</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-4xl font-bold text-[var(--church-red)] mb-1">Weekly</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Gatherings</p>
              </div>
            </div>
          </div>

          {/* Decorative Collage */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl rotate-3">
              <Image src={STATIC_MINISTRIES[0].imageUrl} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-[var(--church-navy)]/20 mix-blend-multiply" />
            </div>
            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white -rotate-3">
              <Image src={STATIC_MINISTRIES[2].imageUrl} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Ministry Cards (Bento Grid Style) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="ministries-grid-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="ministries-grid-heading" className="text-3xl md:text-4xl font-serif font-bold text-[var(--church-navy)] mb-4">
              Explore Our Ministries
            </h2>
            <p className="text-slate-500">
              Click on any card to learn more about how you can get involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {ministries.map((ministry, idx) => {
              const Icon = ministry.icon || Users; // Fallback icon
              // Check if using static data for layout sizing, otherwise default to normal
              const isLarge = 'size' in ministry && ministry.size === 'large';

              return (
                <article 
                  key={ministry._id || ministry.title}
                  className={`relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isLarge ? 'lg:col-span-2' : 'col-span-1'}`}
                >
                  {/* Background Image */}
                  <Image
                    src={ministry.imageUrl}
                    alt={ministry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/90 via-[var(--church-navy)]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    
                    {/* Top Right Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[var(--church-red)] group-hover:border-[var(--church-red)] transition-colors duration-300">
                       <Icon className="text-white" size={20} />
                    </div>

                    {/* Text Content - Slides up on hover */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-serif text-3xl mb-3 font-bold">
                        {ministry.title || ministry.name}
                      </h3>
                      
                      <p className="text-white/80 text-base mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2 max-w-lg">
                        {ministry.description}
                      </p>

                      <Link
                        href={`/ministries/${ministry.slug?.current || ministry.slug}`}
                        className="inline-flex items-center gap-2 text-white text-sm font-bold tracking-widest uppercase hover:text-[var(--church-red)] transition-colors"
                      >
                        Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="relative py-32 overflow-hidden bg-[var(--church-navy)]" aria-labelledby="cta-heading">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--church-red)]/20 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--church-red)]/10 rounded-full blur-[80px] translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <Heart className="mx-auto text-[var(--church-red)] mb-6 animate-[pulse_3s_infinite]" size={48} fill="currentColor" />
          
          <h2 id="cta-heading" className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Ready to <span className="text-[var(--church-red)]">Serve?</span>
          </h2>
          
          <p className="text-white/80 text-xl font-light mb-10 leading-relaxed max-w-2xl mx-auto">
            Your unique gifts were given to build up the body of Christ. 
            There is a place for you to make a difference here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[var(--church-red)] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-red-600 transition-all shadow-lg hover:shadow-[var(--church-red)]/40 hover:-translate-y-1"
            >
              Join a Team
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all"
            >
              Contact Leaders
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
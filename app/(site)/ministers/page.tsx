import { client } from '@/lib/sanity/client'
import { teamQuery, ministriesQuery } from '@/lib/sanity/queries'
import { Heart, Users, Book, Mail, Shield, Sparkles } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import Link from 'next/link'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import PastorAderemi from '@/app/assets/Pastor_Aderemi.png'
import PastorKumuyi from '@/app/assets/Pastor_Kumuyi.jpg'
import PastorJoseph from '@/app/assets/Pastor_Joseph.jpeg'


export const metadata = {
  title: 'Our Leadership',
  description: 'Meet the dedicated ministers and leaders serving at DCLM Lewisville.',
}

// Fallback data in case Sanity is empty/not connected
const PLACEHOLDER_TEAM = [
  {
    _id: '1',
    name: 'Joseph Agbo',
    title: 'Local Pastor',
    role: 'Local Pastor',
    shortBio: 'Serving with a passion for biblical truth and community transformation. Pastor Agbo has been leading DCLM Lewisville for over 15 years.',
    photo: PastorJoseph,
    email: ''
  },
  {
    _id: '2',
    name: 'Thompson Aderemi',
    title: 'Regional Overseer',
    role: 'Regional Overseer',
    shortBio: 'Dedicated to empowering believers to grow in faith and find their purpose in God\’s kingdom through mentorship and prayer.',
    photo: PastorAderemi,
    email: ''
  },
  {
    _id: '3',
    name: 'W.F. Kumuyi',
    title: 'General Superintendent',
    role: 'Founder & Visionary',
    shortBio: 'Passionate about equipping the next generation with the Word of God to navigate a complex world with faith.',
    photo: PastorKumuyi,
    email: ''
  }
]

export default async function MinistersPage() {
  let team = []
  let ministries = []

  try {
    team = await client.fetch(teamQuery)
    ministries = await client.fetch(ministriesQuery)
  } catch (error) {
    // console.warn('Sanity fetch failed')
  }

  // Use fallback if no team data found
  const teamMembers = (team && team.length > 0) ? team : PLACEHOLDER_TEAM

  return (
    <main className="bg-slate-50">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[var(--church-navy)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--church-navy)] via-[var(--church-navy)]/95 to-[var(--church-red)]/20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-xl">
            <Users size={14} className="text-[var(--church-red)]" />
            Leadership Team
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-md">
            Shepherding <span className="text-[var(--church-red)] italic">God's Flock</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Dedicated servants called to teach, guide, and care for our congregation with integrity and love.
          </p>
        </div>
      </section>

      {/* --- LEADERSHIP GRID --- */}
      <section className="py-20 lg:py-24 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member: any) => {
              const imageSrc =
                member?.photo && 'asset' in member.photo
                  ? urlFor(member.photo).width(800).height(1000).url()
                  : member?.photo && typeof member.photo === 'object' && 'src' in member.photo
                  ? (member.photo as StaticImageData | string)
                  : member?.imageUrl

              return (
                <div
                  key={member._id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-xl shadow-[var(--church-navy)]/5 border border-slate-100 hover:shadow-2xl hover:shadow-[var(--church-navy)]/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image Container - Portrait Aspect Ratio */}
                  <div className="aspect-[4/5] relative bg-slate-200 overflow-hidden">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
                        <Users size={64} className="mb-4" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay (Always visible at bottom for text contrast if needed, stronger on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Social/Contact Actions */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 bg-white text-[var(--church-navy)] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--church-red)] hover:text-white transition-colors shadow-lg"
                        >
                          <Mail size={16} /> Contact
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow text-center relative">
                    {/* Decorative Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[var(--church-red)] rounded-b-full group-hover:w-full group-hover:rounded-none transition-all duration-500" />

                    <h3 className="font-serif text-2xl font-bold text-[var(--church-navy)] mb-1 mt-2 group-hover:text-[var(--church-red)] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[var(--church-red)] uppercase tracking-widest mb-4">
                      {member.title}
                    </p>

                    {member.shortBio && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-4">
                        {member.shortBio}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP VALUES --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[var(--church-navy)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[var(--church-red)]/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--church-navy)] mb-4">
              Our Leadership Values
            </h2>
            <p className="text-lg text-slate-500">
              The biblical principles that guide how we serve our church family and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Book,
                title: 'Biblical Authority',
                description: 'Leading strictly according to the teachings and principles of God\'s Word.'
              },
              {
                icon: Heart,
                title: 'Servant Heart',
                description: 'Following Christ\'s example of humble, selfless service to others.'
              },
              {
                icon: Shield,
                title: 'Integrity',
                description: 'Maintaining godliness and accountability in all aspects of life and ministry.'
              },
              {
                icon: Sparkles,
                title: 'Spirit Led',
                description: 'Relying on the Holy Spirit for wisdom, guidance, and power.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-[var(--church-red)]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-[var(--church-navy)] group-hover:text-white transition-colors duration-300 text-[var(--church-red)]">
                  <value.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--church-navy)] mb-3">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCRIPTURE BREAK --- */}
      <section className="py-20 bg-[var(--church-navy)] text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
         
         <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
            <Book className="w-12 h-12 mx-auto mb-8 text-[var(--church-red)] opacity-80" />
            <blockquote className="font-serif text-2xl md:text-4xl italic leading-relaxed mb-8 opacity-90">
              "Obey your leaders and submit to them, for they are keeping watch over your souls,
              as those who will have to give an account."
            </blockquote>
            <cite className="text-[var(--church-red)] font-bold uppercase tracking-widest text-sm not-italic">
              — Hebrews 13:17
            </cite>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--church-navy)] mb-6">
            Connect with Our Team
          </h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            We are here to serve you. If you have questions about faith, need prayer, or want to know more about our church, please reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--church-red)] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/20"
            >
              Contact Us <Mail size={16} />
            </Link>
            <Link
              href="/ministries"
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--church-navy)] border border-slate-200 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:border-[var(--church-navy)] transition-all"
            >
              View Ministries
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

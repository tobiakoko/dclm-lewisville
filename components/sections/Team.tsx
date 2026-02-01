import Image, { type StaticImageData } from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { Mail, User } from 'lucide-react'
import type { Person } from '@/lib/types'
import PastorJoseph from '@/app/assets/Pastor_Joseph.jpeg'
import ChoirDirector from '@/app/assets/choir-director.jpeg'
import RO from '@/app/assets/Pastor_Aderemi.png'
import GS from '@/app/assets/Pastor_Kumuyi.jpg'

// Fallback data for development or when CMS is empty
const PLACEHOLDER_TEAM: (Partial<Person> & { imageUrl?: StaticImageData })[] = [
  {
    _id: 'p1',
    name: 'Joseph Agbo',
    title: 'Local Pastor',
    role: 'Local Pastor',
    imageUrl: PastorJoseph,
    shortBio: 'Serving with a passion for biblical truth and community transformation in Lewisville TX.',
    email: 'info@dclmlewisville.org'
  },
  {
    _id: 'p2',
    name: 'Thompson Aderemi',
    title: 'Regional Overseer',
    role: 'Regional Overseer',
    imageUrl: RO,
    shortBio: 'Overseer of the southwest region comprising of 14 states.',
    email: 'info@dclmlewisville.org'
  },
  {
    _id: 'p3',
    name: 'W.F. Kumuyi',
    title: 'General Superintendent',
    role: 'General Superintendent',
    imageUrl: GS,
    shortBio: 'Founder and General Superintendent of Deeper Life Bible Church Worldwide.',
    email: 'info@dclmlewisville.org'
  },
  {
    _id: 'p4',
    name: 'Folake Agbo',
    title: 'Music Director',
    role: 'Music Ministry',
    imageUrl: ChoirDirector,
    shortBio: 'Leading our congregation in spirit-filled worship and musical excellence.',
    email: 'info@dclmlewisville.org'
  }
]

interface TeamProps {
  members: Person[]
}

export default function Team({ members }: TeamProps) {
  // Use passed members, or fall back to placeholder if array is empty
  const teamToDisplay = (members && members.length > 0) ? members : PLACEHOLDER_TEAM

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamToDisplay.map((member) => (
        <div
          key={member._id}
          className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-[var(--church-red)]/20 transition-all duration-300 flex flex-col h-full"
        >
          {/* Image Container */}
          <div className="aspect-[4/5] relative bg-slate-100 overflow-hidden">
            {(() => {
              const imageSrc =
                member.photo && 'asset' in member.photo
                  ? urlFor(member.photo).width(500).height(600).url()
                  : member.imageUrl

              if (imageSrc) {
                return (
                  <Image
                    src={imageSrc}
                    alt={member.name || 'Team member'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )
              }

              return (
              // Fallback Avatar if no photo exists
              <div className="w-full h-full flex items-center justify-center bg-[var(--church-navy)]/5 text-[var(--church-navy)]/20">
                 <User size={64} />
              </div>
              )
            })()}
            
            {/* Gradient Overlay (visible on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Social/Contact visible on hover over image */}
            {member.email && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <a
                  href={`mailto:${member.email}`}
                  className="bg-white text-[var(--church-navy)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[var(--church-red)] hover:text-white transition-colors shadow-lg"
                >
                  <Mail size={14} /> Email Me
                </a>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-serif text-xl font-bold text-[var(--church-navy)] mb-1">
              {member.name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--church-red)] mb-4">
              {member.title}
            </p>
            
            {member.shortBio && (
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-4">
                {member.shortBio}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

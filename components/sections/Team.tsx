'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { Mail, User } from 'lucide-react'
import type { Person } from '@/lib/types'
import PastorJoseph from '@/app/assets/Pastor_Joseph.jpeg'
import ChoirDirector from '@/app/assets/choir-director.jpeg'
import RO from '@/app/assets/Pastor_Aderemi.png'
import GS from '@/app/assets/Pastor_Kumuyi.jpg'
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal'

// Pastor bios keyed by placeholder _id
const PASTOR_BIOS: Record<string, { fullName: string; paragraphs: string[] }> = {
  p2: {
    fullName: 'Pastor Thompson Aderemi',
    paragraphs: [
      'Pastor Thompson Aderemi is a missionary, church planter, and seasoned servant of God whose life has been wholly committed to rescuing the perishing and advancing the gospel.',
      'In the early 1980s, while raising his young family, Pastor Thompson and his wife pioneered the Deeper Life Bible Church in the United States. Through his obedience to God\'s call and unwavering dedication, Deeper Life Bible Church was planted across numerous states, including Texas, Georgia, Illinois, Ohio, Colorado, California, Missouri, Nebraska, North Dakota, Arizona, and Alabama, among others.',
      'A man willing to give anything for the salvation of souls, Pastor Thompson has, by God\'s grace, led multitudes to Christ during his 36 years of ministry in the United States. Many have also experienced miraculous healings and divine intervention through his ministry. His missionary passion and readiness to go anywhere and take on any assignment for the Master brought him to Texas in 1997. There, by the power of the Holy Ghost, God used him to transform a small house fellowship into what is now a regional headquarters.',
      'Though advised by some to slow down, Pastor Thompson\u2014following the example of his spiritual father and mentor, Pastor W. F. Kumuyi\u2014refused every distraction. To this day, he continues to plant churches where none exist and to train and mentor younger pastors for effective ministry.',
      'A graduate of the University of Ibadan, Ibadan, Nigeria, Pastor Thompson previously ran a successful print shop business. However, when God called him through the ministry of Pastor W. F. Kumuyi into full-time ministry in 1987, he did not confer with flesh and blood but responded in complete obedience.',
      'Pastor Thompson currently serves as the Overseer of the Southwest Region of Deeper Life Bible Church, comprising 14 states. The region is headquartered in Texas, with the ministry\'s reach extending to the Dakotas and neighboring countries, including Mexico.',
      'A gifted Speaker, Teacher, Preacher, and Evangelist, Pastor Thompson has ministered extensively across the United States, Africa, the Caribbean, and Mexico.',
      'He has been happily married to his wife, Sister Selina Aderemi\u2014affectionately called Mommy\u2014for 46 years. Their union is blessed with four children and several grandchildren.',
    ],
  },
  p3: {
    fullName: 'Pastor Joseph Agbo',
    paragraphs: [
      'Pastor Joseph Agbo grew up in a deeply religious home as the son of a minister in an orthodox church. However, he was not born again until 1988, when he surrendered his life to Christ during his university years.',
      'Having laid "his hands on the plough" (Luke 9:62), he went on to "put his neck to the work of the Lord" (Nehemiah 3:5). His burning zeal for soul-winning soon distinguished him, leading to his appointment as Evangelism Secretary of the Student Christian Movement (SCM). His growing hunger for God, holiness, and sound doctrine led him to Deeper Life Bible Church, where he has faithfully served the Lord in various capacities for over 34 years.',
      'In 1997, Pastor Joseph joined a small core of believers in Carrollton, Texas, meeting in a house fellowship to pioneer Deeper Life Bible Church in Texas. What began as a "little beginning" has, by the power of the Holy Ghost, grown into the headquarters church of the Southwest Region.',
      'As the church expanded, Pastor Joseph was sent forth under the leading of the Holy Ghost to pioneer another Deeper Life branch in Denton, Texas. There, he faithfully labored and led the church for over ten years, witnessing God\'s power in growth and spiritual establishment.',
      'In obedience to the Lord\'s instruction through his Regional Overseer, Pastor Thompson Aderemi, Pastor Joseph went on to pioneer yet another branch of Deeper Life Bible Church in Lewisville, Texas, where he has now served as Pastor for over five years.',
      'An author and preacher, Pastor Joseph holds a master\'s degree in engineering and maintains full-time secular employment while faithfully serving his Master in pastoral ministry.',
      'He has been happily married to his wife and sweetheart, Folake, for over 25 years, and their union is blessed with three children.',
    ],
  },
  p1: {
    fullName: 'Pastor W.F. Kumuyi',
    paragraphs: [
      'In 1973, while serving as Math Lecturer at The University of Lagos, W.F. Kumuyi started a Bible study group with 15 university students who had come to him requesting training in the Scriptures. By the early 1980\'s that small group had grown to several thousand, at which time Deeper Life Bible Church was formally established.',
      'By 1988 the congregation had grown to 50,000, and now numbers 120,000 members, making it the third largest Christian church in the world. The Deeper Life Bible Church not only has an attendance of 120,000 every Sunday, but has planted 500 churches in Lagos, 5,000 in the rest of Nigeria (with an independent estimate of more than 800,000 members in Nigeria alone), and 3,000 elsewhere (with missionaries to 40 countries of Africa).',
      'God, in the growth of Deeper Life Bible Church, has strategically and prudently used miracles to make all men come to Him. The church takes Christian living and holiness seriously.',
      'The history of Deeper Life is very much the personal story of W.F. Kumuyi. He is a gifted man, clear-thinking and humble. He is a dedicated Christian and deserves the title "the man of God," which his followers have given him. Since he was a young man, Kumuyi has devoted his time to reading and studying the Bible. He knows the Scriptures inside out, and has struggled to understand and apply them.',
      'When he preaches, his message is clear, simple, and profound. Poor street traders who can barely read sit next to university professors, all equally captivated by the way Scripture becomes suddenly relevant to them.',
      'W.F. Kumuyi was born in 1941 into an Anglican home. It was a very strict Christian home. He was born again on April 5th, 1964. He gained a first-class degree in Mathematics at the University of Ibadan; then went back to Mayflower School to teach. After five years he went to the University of Lagos to do a Postgraduate Certificate in Education and became a lecturer there in 1973; and that was when he started a small Deeper Life Bible Study group.',
      'He is not tall, and does not have a larger-than-life character. He does not dominate, nor has he accrued power to himself. He walks slowly, is relaxed, and has a gentle sense of humour with a warm smile and a twinkle in his eyes. He dresses simply, eats simply, and calls his followers brothers and sisters, and treats them as colleagues.',
      'Pastor Kumuyi is a remarkable leader, one of God\'s people for this generation. He has received a great deal from God, but he is adept at passing along what he receives. This has been God\'s work, and to Him be the glory.',
    ],
  },
}

// Fallback data for development or when CMS is empty
const PLACEHOLDER_TEAM: (Partial<Person> & { imageUrl?: StaticImageData })[] = [
  {
    _id: 'p1',
    name: 'W.F. Kumuyi',
    title: 'General Superintendent',
    role: 'General Superintendent',
    imageUrl: GS,
    shortBio: 'Founder and General Superintendent of Deeper Life Bible Church Worldwide.',
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
    name: 'Joseph Agbo',
    title: 'Local Pastor',
    role: 'Local Pastor',
    imageUrl: PastorJoseph,
    shortBio: 'Serving with a passion for biblical truth and community transformation in Lewisville TX.',
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
  const [selectedPastor, setSelectedPastor] = useState<string | null>(null)

  // Use passed members, or fall back to placeholder if array is empty
  const teamToDisplay = (members && members.length > 0) ? members : PLACEHOLDER_TEAM

  const activeBio = selectedPastor ? PASTOR_BIOS[selectedPastor] : null

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamToDisplay.map((member) => {
          const hasBio = member._id ? !!PASTOR_BIOS[member._id] : false
          return (
            <div
              key={member._id}
              onClick={() => hasBio && member._id && setSelectedPastor(member._id)}
              className={`group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-[var(--church-red)]/20 transition-all duration-300 flex flex-col h-full ${hasBio ? 'cursor-pointer' : ''}`}
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
                      onClick={(e) => e.stopPropagation()}
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

                {hasBio && (
                  <span className="text-xs font-semibold text-[var(--church-red)] mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={!!activeBio} onOpenChange={(open) => !open && setSelectedPastor(null)}>
        <ModalContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {activeBio && (
            <>
              <ModalTitle className="font-serif text-xl text-[var(--church-navy)] mb-1">
                {activeBio.fullName}
              </ModalTitle>
              <ModalDescription asChild>
                <div className="space-y-4 mt-4">
                  {activeBio.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-sm text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ModalDescription>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { Mail } from 'lucide-react'
import { Person } from '@/lib/types'

interface TeamProps {
  members: Person[]
}

export default function Team({ members }: TeamProps) {
  if (!members || members.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {members.map((member) => (
        <div
          key={member._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="aspect-square relative bg-gray-200">
            {member.photo && (
              <Image
                src={urlFor(member.photo).width(400).height(400).url()}
                alt={member.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-6">
            <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-sm text-blue-600 font-medium mb-3">{member.title}</p>
            {member.shortBio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {member.shortBio}
              </p>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                Contact
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
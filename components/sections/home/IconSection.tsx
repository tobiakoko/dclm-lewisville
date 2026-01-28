import { Radio, Church, Heart, BookOpen, Users, type LucideIcon } from 'lucide-react'

interface PillarItem {
  icon: LucideIcon
  title: string
  description: string
}

const pillars: PillarItem[] = [
  {
    icon: Radio,
    title: 'Message',
    description: 'Jesus only, Jesus forever',
  },
  {
    icon: Church,
    title: 'Mandate',
    description: 'To preach the gospel',
  },
  {
    icon: Heart,
    title: 'Mannerism',
    description: 'We follow peace',
  },
  {
    icon: BookOpen,
    title: 'Method',
    description: 'By all means & ways',
  },
  {
    icon: Users,
    title: 'Membership',
    description: 'Open to everyone',
  },
]

export default function IconSection() {
  return (
    <section className="bg-white border-b border-gray-100" aria-label="Church pillars">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-8 list-none">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            const isLast = index === pillars.length - 1

            return (
              <li
                key={pillar.title}
                className={`text-center px-4 group ${
                  !isLast ? 'border-r-0 md:border-r border-gray-100' : ''
                }`}
              >
                <Icon
                  className="mx-auto text-(--church-red) mb-4 group-hover:scale-110 transition-transform"
                  size={36}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-bold text-sm mb-1 text-(--church-navy)">
                  {pillar.title}
                </h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                  {pillar.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
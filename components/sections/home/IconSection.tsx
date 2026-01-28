import { Radio, Church, Heart, BookOpen, Users, type LucideIcon } from 'lucide-react'

interface PillarItem {
  icon: LucideIcon
  title: string
  description: string
}

const pillars: PillarItem[] = [
  { icon: Radio, title: 'Message', description: 'Jesus only, Jesus forever' },
  { icon: Church, title: 'Mandate', description: 'To preach the gospel' },
  { icon: Heart, title: 'Mannerism', description: 'We follow peace' },
  { icon: BookOpen, title: 'Method', description: 'By all means & ways' },
  { icon: Users, title: 'Membership', description: 'Open to everyone' },
]

export default function IconSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100" aria-labelledby="pillars-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="pillars-heading" className="sr-only">Core Values</h2>
        
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <li
                key={pillar.title}
                className="group flex flex-col items-center text-center space-y-4"
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--church-navy)]/5 text-[var(--church-red)] transition-all duration-300 group-hover:bg-[var(--church-red)] group-hover:text-white group-hover:-translate-y-2 shadow-sm">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[var(--church-navy)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {pillar.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
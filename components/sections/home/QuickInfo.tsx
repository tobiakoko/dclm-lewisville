import { Sun, BookOpen, HandHeart, Users, type LucideIcon } from 'lucide-react'

interface ServiceItem {
  icon: LucideIcon
  title: string
  description: string
  time: string
  day: string
}

const services: ServiceItem[] = [
  { icon: Sun, day: 'Sunday', title: 'Worship Service', description: 'Powerful worship & word', time: '9:30 AM' },
  { icon: BookOpen, day: 'Tuesday', title: 'Bible Study', description: 'Deep dive into scripture', time: '6:00 PM' },
  { icon: HandHeart, day: 'Friday', title: 'Prayer Meeting', description: 'Intercessory prayer', time: '6:00 PM' },
  { icon: Users, day: 'Saturday', title: 'Outreach', description: 'Serving our neighbors', time: '8:00 AM' },
]

export function QuickInfo() {
  return (
    <section className="relative z-20 -mt-24 pb-20" aria-label="Service times">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden bg-(--church-navy)/95 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon size={80} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--church-red)] font-bold text-xs uppercase tracking-widest">
                      {service.day}
                    </span>
                    <Icon className="text-white/40 group-hover:text-[var(--church-red)] transition-colors" size={20} />
                  </div>
                  
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-xs mb-6 h-8">
                    {service.description}
                  </p>
                  
                  <div className="pt-4 border-t border-white/10">
                    <time className="text-2xl font-display font-bold text-white">
                      {service.time}
                    </time>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
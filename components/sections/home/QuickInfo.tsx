import { Sun, BookOpen, HandHeart, Users, type LucideIcon } from 'lucide-react'

interface ServiceItem {
  icon: LucideIcon
  title: string
  description: string
  time: string
}

const services: ServiceItem[] = [
  {
    icon: Sun,
    title: 'Sunday Worship',
    description: 'Powerful worship and inspiring messages.',
    time: '9:00 AM',
  },
  {
    icon: BookOpen,
    title: 'Bible Study',
    description: "Deep dive into God's word on Mondays.",
    time: '6:00 PM',
  },
  {
    icon: HandHeart,
    title: 'Prayer Meeting',
    description: 'Intercessory prayer sessions on Fridays.',
    time: '6:00 PM',
  },
  {
    icon: Users,
    title: 'Community Outreach',
    description: 'Serving our neighbors on Saturdays.',
    time: '5:00 PM',
  },
]

export function QuickInfo() {
  return (
    <section
      className="bg-secondary relative z-20 -mt-20 pb-24 pt-10"
      id="visit"
      aria-label="Service times"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <li
                key={service.title}
                className="bg-linear-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.01)] backdrop-blur-xl border border-white/10 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300"
                  aria-hidden="true"
                >
                  <Icon
                    className="text-primary group-hover:text-slate-900"
                    size={24}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs mb-4">
                  {service.description}
                </p>
                <time className="text-white text-sm font-bold block">
                  {service.time}
                </time>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
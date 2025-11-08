import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react'

interface ServiceTime {
  name: string
  day: string
  time: string
  description: string
}

interface ServiceScheduleProps {
  times: ServiceTime[]
}

export default function ServiceSchedule({ times }: ServiceScheduleProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-muted/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10  blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10  blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10  px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Service Times</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
            Join Us for Worship
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All are welcome to join us for our weekly services. Come as you are and experience the love of Christ!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {times.map((service, index) => (
            <div
              key={service.name}
              className="group relative bg-white  p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-border hover:border-primary/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent  flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                  <Clock className="text-white" size={36} />
                </div>

                {/* Service name */}
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.name}
                </h3>

                {/* Time details with modern design */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-3 bg-muted/50  p-4 group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary  flex items-center justify-center shadow-md">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Day</p>
                      <p className="font-bold text-foreground">{service.day}s</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 bg-muted/50  p-4 group-hover:bg-secondary/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary  flex items-center justify-center shadow-md">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Time</p>
                      <p className="font-bold text-foreground">{service.time}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative bottom element */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <MapPin size={14} className="text-primary" />
                    <span>In-Person & Online</span>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0  bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl" />
            </div>
          ))}
        </div>

        {/* Call to action at bottom */}
        <div className="text-center mt-16 animate-fade-in-up animate-delay-500">
          <p className="text-muted-foreground mb-4">
            Can't make it in person? Join us online!
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors cursor-pointer">
            <span>Watch Live Services</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

/*

import { Calendar, Clock, MapPin } from 'lucide-react'

interface ServiceTime {
  name: string
  day: string
  time: string
  description: string
}

interface ServiceScheduleProps {
  times: ServiceTime[]
}

export default function ServiceSchedule({ times }: ServiceScheduleProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Us for Worship
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All are welcome to join us for our weekly services. Come as you are!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {times.map((service) => (
            <div
              key={service.name}
              className="bg-gradient-to-br from-blue-50 to-purple-50  p-8 text-center hover:shadow-lg transition-shadow border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-600  flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900">
                {service.name}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center text-gray-700">
                  <Calendar size={16} className="mr-2 text-blue-600" />
                  <span className="font-medium">{service.day}s</span>
                </div>
                <div className="flex items-center justify-center text-gray-700">
                  <Clock size={16} className="mr-2 text-blue-600" />
                  <span className="font-medium">{service.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

*/
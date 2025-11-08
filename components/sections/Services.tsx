import { Clock, Calendar, MapPin } from 'lucide-react'

interface ServiceTime {
  name: string
  day: string
  time: string
  description: string
}

interface ServicesProps {
  times: ServiceTime[]
}

export default function Services({ times }: ServicesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Us for Worship
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to see you at one of our services. All are welcome!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {times.map((service) => (
            <div
              key={service.name}
              className="bg-gray-50  p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100  flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary-600" size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">
                {service.name}
              </h3>
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{service.day}s</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 mb-4">
                <Clock size={16} className="mr-2" />
                <span>{service.time}</span>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
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
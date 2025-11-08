interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />

      {/* Events */}
      <div className="space-y-12">
        {events.map((event, idx) => (
          <div
            key={idx}
            className={`relative flex items-center ${
              idx % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`w-5/12 ${
                idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
              }`}
            >
              <div className="bg-white p-6  shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {event.year}
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600  border-4 border-white shadow-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

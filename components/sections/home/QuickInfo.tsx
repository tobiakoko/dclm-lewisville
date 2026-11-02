import { SERVICE_TIMES, ZOOM_PLACEHOLDER } from '@/lib/constants'
import { MODE_LABEL, formatServiceTime } from '@/lib/schedule'

/** Weekly schedule strip; visible on phones (SITE-CONTENT.md §2) */
export function QuickInfo() {
  return (
    <section className="py-16 bg-white" aria-labelledby="times-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="times-heading" className="text-3xl font-display font-bold text-(--church-navy) mb-8">
          When we meet
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
          {SERVICE_TIMES.map((service) => (
            <li key={service.id} className="bg-(--church-navy) text-white p-6 rounded-xl">
              <p className="font-bold">{service.day}</p>
              <h3 className="text-lg font-bold leading-tight mt-1">{service.name}</h3>
              <p className="text-2xl font-display font-bold mt-3 tabular-nums">{formatServiceTime(service)}</p>
              <p className="text-sm mt-2">{MODE_LABEL[service.mode]}</p>
              <p className="text-sm mt-3">{service.description}</p>
              {service.mode !== 'in-person' && (
                <p className="text-sm mt-3">
                  {service.joinUrl ? (
                    <a href={service.joinUrl} className="underline underline-offset-4">
                      Join online
                    </a>
                  ) : (
                    ZOOM_PLACEHOLDER
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

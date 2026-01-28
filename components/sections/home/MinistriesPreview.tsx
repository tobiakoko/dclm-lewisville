import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface Ministry {
  title: string
  imageUrl: string
}

const ministries: Ministry[] = [
  {
    title: "Women's Ministry",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtXYe2zPFMXCADDCscYVStthw5Iwnca52E-UztJo4YV-ynBiSkPrjf6pNpQjyqV6ZeqnMQyT4Cd2zmKYjhal319-zV0EHaQ_eIxYMa6j1TtsNETjYHwU6fRo0Q1Tirn1OXkQqE__cT9SZTda_2u--yZZPbPW8baAJFR3qZtlWjU8jZq4dHXod8Jaqp4_o4TZmldNu-_wEY-CLOclPgywQS_4JB2LswQIXbAsDgOZ0s-Bp15bc75M7hzo-mZoZvNA5SiQGwZBrnb4w',
  },
  {
    title: "Children's Ministry",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDurzzgSxF2Grg6Vt5Z5rp6YPoge9EhMdglDJ6UxibBHK9x1b83iDnL7R70jWFajZwncQh76TKn0FXBIEw8aBNgqJpX1gpqvNJMJxNlF5rXsBR7UkqhlGlFHCePg9Hnwi6vs8O6qo4b8Zopm4ZwRbcGGc9fapfZwTHrXlQ95aVKhG8n4YnIbLd_KSTI-0MOrnxkonG-XQ2tSOYNROTifSz6dg3doS5vvwqIPDdBGsIOrTvC0_xUEAAXO0M4MsbANsUMGJmpOYUOMs0',
  },
  {
    title: 'Youth Ministry',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8b61Ti8OP8F81lWX053ZiO3SJ0ZdfxieoEAThu7lwfW-U523RSeIPwMKMYIt4M_1kwhFHllHLloMEl8bozN0gtPTjZxyL8ovZqXRTuoHtIhmhlRH2QzeXH8kq18duymCl3HNk9jw1Lei73muDk4JplhaOmfCPt2sExyEwVvPgJZykr34M4xrdOhKIuQbNFV9p7rYWR1e97Ioxz564VadBCgk4E6y7nykj1IpasgCNtThmXcwW4hZ3aWyPAsBk_mDh9J7sVeTp_dg',
  },
]

export default function MinistriesPreview() {
  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="ministries-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-(--church-red) text-sm font-bold tracking-widest uppercase mb-2 block">
            Experience. Connect. Grow
          </span>
          <h2
            id="ministries-preview-heading"
            className="text-4xl md:text-5xl font-display font-bold text-(--church-blue)"
          >
            Our Ministries
          </h2>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none">
          {ministries.map((ministry) => (
            <li key={ministry.title}>
              <article className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                <Image
                  src={ministry.imageUrl}
                  alt={`${ministry.title} members`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white text-2xl font-display font-bold">
                    {ministry.title}
                  </h3>
                  <Link
                    href="/ministries"
                    className="inline-flex items-center text-white/60 text-[10px] font-bold tracking-widest mt-2 hover:text-white transition-colors"
                  >
                    Learn More
                    <ArrowRight
                      className="ml-1"
                      size={10}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { ArrowRight } from 'lucide-react'
import Brothers from '@/app/assets/BrothersCongregation.jpeg'
import Sisters from '@/app/assets/SistersCongregation.jpeg'
import Children from '@/app/assets/ChildrenMinistry.jpeg'

interface Ministry {
  title: string
  image: string | StaticImageData
  slug: string
}

const ministries: Ministry[] = [
  { title: "Women's Ministry", image: Sisters, slug: '/ministries/women' },
  { title: "Children's Ministry", image: Children, slug: '/ministries/children' },
  { title: 'Youth Ministry', image: Brothers, slug: '/ministries/youth' },
]

export default function MinistriesPreview() {
  return (
    <section className="py-24 bg-gray-50" aria-labelledby="ministries-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[var(--church-red)] text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
              Connect & Grow
            </span>
            <h2 id="ministries-heading" className="text-3xl md:text-4xl font-serif font-bold text-[var(--church-navy)]">
              Our Ministries
            </h2>
          </div>
          <Link 
            href="/ministries"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[var(--church-navy)] hover:text-[var(--church-red)] transition-colors"
          >
            View all ministries <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ministries.map((ministry) => (
            <li key={ministry.title}>
              <Link href={ministry.slug} className="group relative block w-full rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-500">
                <Image
                  src={ministry.image}
                  alt={ministry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/90 via-[var(--church-navy)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-serif font-bold mb-2">
                    {ministry.title}
                  </h3>
                  <span className="inline-flex items-center text-white/80 text-xs font-bold tracking-widest uppercase group-hover:text-[var(--church-red)] transition-colors">
                    Learn More <ArrowRight className="ml-2 w-3 h-3" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 md:hidden text-center">
          <Link 
            href="/ministries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--church-navy)]"
          >
            View all ministries <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
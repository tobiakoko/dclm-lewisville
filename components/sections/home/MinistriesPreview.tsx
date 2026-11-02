import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { ArrowRight } from 'lucide-react'
import { MINISTRIES } from '@/lib/content/site'
import Women from '@/app/assets/women_ministry.jpeg'
import Children from '@/app/assets/ChildrenMinistry.jpeg'
import Youth from '@/app/assets/YouthMinistry.jpeg'

const PREVIEW: { slug: string; image: StaticImageData; alt: string }[] = [
  { slug: 'women', image: Women, alt: 'Four women of the church standing together' },
  { slug: 'children', image: Children, alt: 'A girl speaking at the pulpit' },
  { slug: 'youth', image: Youth, alt: 'Young people standing during a service' },
]

export default function MinistriesPreview() {
  const items = PREVIEW.flatMap((item) => {
    const ministry = MINISTRIES.find((m) => m.slug === item.slug)
    return ministry ? [{ ...item, name: ministry.name }] : []
  })

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="ministries-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 id="ministries-heading" className="text-3xl md:text-4xl font-serif font-bold text-(--church-navy)">
            Our Ministries
          </h2>
          <Link
            href="/ministries"
            className="flex items-center gap-2 text-sm font-semibold text-(--church-navy) underline underline-offset-4"
          >
            View all ministries <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 list-none">
          {items.map((ministry) => (
            <li key={ministry.slug}>
              <Link
                href={`/ministries#${ministry.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white shadow-md"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={ministry.image}
                    alt={ministry.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="p-6 text-xl font-serif font-bold text-(--church-navy) group-hover:underline group-focus-visible:underline">
                  {ministry.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'

export const metadata = {
  title: 'Ministries',
  description:
    'Explore the various ministries at DCLM Lewisville and find your place to serve.',
}

interface Ministry {
  title: string
  imageUrl: string
}

const ministries: Ministry[] = [
  {
    title: "Women's Ministry",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXbkwd3rhaBTkC-FSQ9wvxz-kV5bgWEQ0UyFF_3R59ddeDNGY9sv5OXL_YVXcLBUUWQN7B27N9ECMotWhIB30fsYJ1v9nRvELdbyS3sWlO1IlwQ2ABqVc3V4VU8W8Z4OUZcbwrOGmZmePzoSxhrh0AHhSNQAbutHemxxrsMDTjt7NyNxL6SiCGiz48JNITagtimYjXMM_YpaVYX_MRW7-Xctc80S9cTh07JNb7epVyZudxFWGXdOyKFMVuktdAKEFTcJk2LV9Mu38',
  },
  {
    title: "Children's Ministry",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCbox8_B95JCEqDYNNx_6cJHF7tAeb-M8-LH7a0_o2UR9zXsJF2AX101jmsqpYHBu7eKHa2nNKODqg7J2pTI4guRszXXubAkiDIkN-Zmt33JMrTll4h5kg8CsVkFUb2f7xHT_eG-j4GUHB0QD68l7GvA8U-x7KVw_AW3b8dpPEpTewOy4JzOTlMVuDZiVEi2H-aq5g9-XK19rHnS-eglE-qiPhsXaIj5HEhq_-cTIoxrIdIUcKrVRdq8DL9ipZnVT4Ea_M_KHFNbs',
  },
  {
    title: 'Youth Ministry',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTzR-F9sUEUsKSYtny5AGn8iejhrOciykGWEDMY_lHuSoYDGpi670nf3Grw5UP_-EUT1s-yMR7guOlzCy4lmDYr9w4f6UNeFg50LFdEsON-jqDVUPuuUoUU9ScPPhgfAoWF_H7_mXOdruwGP5iFbN1bG_i_Gb3sYnSgGg7z5Bigg7bGmHrU3pYc1ifStWpDdK3XNkm-O3Z4mWWSUAtBq_N09aRkXZSOv8QUoBN8FFAzrKphPj6DzwMU0cz8BDDFGe25ba9Q4IvFNU',
  },
  {
    title: 'Young Adult Ministry',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NC2J5snrEgRENoC28kpRejd5AnmLHbjwXFqNVaXtGlJpwYib1_ajYMrrwycrkTtv8bGcongNZBjnpG0UJdBxkeKRXS60HJ3gWUlhQ5AulYbhGG80Gdb19MdAmei3G0mBfumzsM54uxzh8iuHMzSD9K91OOA0cbZSjL2GfZA3icsAP3n5r-J98DLZL23ZvLu3wQe-JoBgnfmwGgJ2jXadqdeoypOmc9Kr-tHQQu7JsYWvx5ArcNVqXrmRjncCmOA2a8xmEnGnf7M',
  },
  {
    title: "Men's Ministry",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIyApWRxmETEml3qkWO1l3DSH4gPbErNYuP2qrPLWXkiU6NwPqeNXl1oUO_WlX1Je55B70ekZH7JCQGmg1cP3E_RuCNa8QV-gTMxwGaOzwXg2Btt6cRT-isuU1n0zCDPVMH9dlH-VdmiCWMEzICtnRNsTOyHOdPkmcVPQpJR8TrE7X2kFO-25VvRSGB7Ti0-qjL10JO2pePdn7fX2uTLqlpSKR5w7e7YXEIGavYnZ8hHvy-EkWJTX0aSj0_3Pf_T6c8FJAVXTUzQ',
  },
  {
    title: 'Music Ministry',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBi1lr5rjLDmmyxVWmzTbF3NO_2wcigi_ofsYpcJ0KkSYqhAxlOVymjg3UeuFY-GsQhvmNBEzaJMZcN8nwuX-w8JrgxIv3vsRKVqK-ltcFolF0tkr63UPwUh2LtCPI7N3uVpfiYsbVdEkYcfqx2H5YPN5Kv4MOnSR9OCesGJhHFhDYdH-S4aP_vn_vj4h74n-ikzEN-zrIc8SxmsIk_hMmvnKTZbnDKYdO7vCzACPUTd5d2FfeHfPayuM60GN-nOyIX-zIxuUovYcQ',
  },
]

async function getMinistriesData() {
  try {
    return await client.fetch(groq`
      {
        "ministries": *[_type == "ministry"] | order(order asc) {
          _id,
          name,
          slug,
          description,
          icon,
          leader->{name, photo},
          meetingTime,
          meetingDay
        },
        "events": *[_type == "event" && date >= now()] | order(date asc)[0...3] {
          _id,
          title,
          slug,
          date,
          endDate,
          location,
          description,
          image,
          featured
        }
      }
    `)
  } catch (error) {
    console.warn(
      'Failed to fetch ministries data (this is expected during build without Sanity credentials)',
      error
    )
    return { ministries: [], events: [] }
  }
}

export default async function MinistriesPage() {
  const data = await getMinistriesData()

  return (
    <main>
      <HeroSection
        title="Ministries"
        subtitle="Empowering every member to serve, grow, and impact lives through our diverse ministry groups."
      />

      {/* Introduction */}
      <section className="py-20 px-4" aria-labelledby="ministries-intro-heading">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-(--church-red) font-semibold tracking-[0.2em] uppercase text-sm">
            Experience. Connect. Grow.
          </span>
          <h2
            id="ministries-intro-heading"
            className="mt-4 text-3xl md:text-4xl font-display font-bold text-(--church-navy)"
          >
            Join our ministries to get connected through service
          </h2>
          <div
            className="mt-6 border-b border-slate-200 w-16 mx-auto"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Ministries Grid */}
      <section
        className="pb-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="ministries-grid-heading"
      >
        <h2 id="ministries-grid-heading" className="sr-only">
          Our Ministries
        </h2>
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
            {ministries.map((ministry) => (
              <li key={ministry.title}>
                <article className="relative group h-[450px] overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
                  <Image
                    src={ministry.imageUrl}
                    alt={`${ministry.title} members`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-white font-display text-3xl mb-4">
                      {ministry.title}
                    </h3>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors"
                    >
                      Learn More
                      <ArrowRight
                        className="ml-2"
                        size={14}
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

      {/* Call to Action */}
      <section
        className="bg-(--church-red) py-24 px-4 overflow-hidden relative"
        aria-labelledby="cta-heading"
      >
        <div
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <Heart className="text-white" size={400} strokeWidth={1} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
          >
            Join a Ministry Today
          </h2>
          <p className="text-white/90 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
            Discover your purpose and make a difference. Whether you&apos;re
            gifted in teaching, music, administration, or just want to serve,
            there&apos;s a place for you in our church family.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-(--church-red) font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-sm"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </main>
  )
}

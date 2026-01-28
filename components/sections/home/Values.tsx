import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const VALUES_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8k3EvdIVUJVp4kP4W2yMHmMwd_eIztTYCfi48JY1RbSJxbL1vjhBXYucAMl3sgJRj4TXI2nevoBDdeGMe4DfdqSAbx9Pg1bJ_ZVfnlI1lxjuVfzyMKFCOUemlmPjHh7E4-tpaSH-jiuxIzR7K5QShbqh4qmywMOM2gwdwTBK2ndARVAveuc5WvOvXMe-ANEwfnr-TcTKV16C-PaI_NcPoO2vweWiNX9llg3gAchP-n0jQSFgDi9o0EQmdQuL32TEvih_Ja7IBZZ8'

export function Values() {
  return (
    <section
      className="bg-(--church-navy) py-24 relative overflow-hidden"
      aria-labelledby="values-heading"
    >
      <div
        className="absolute right-0 top-0 w-1/2 h-full dot-pattern opacity-10"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <article>
            <header>
              <span className="text-(--church-red) font-display italic text-2xl mb-4 block">
                Our Values
              </span>
              <h2
                id="values-heading"
                className="text-white text-4xl md:text-5xl font-display font-bold mb-8 leading-tight"
              >
                The Bible still works, when you pray believe your AMEN!
              </h2>
            </header>

            <blockquote className="text-gray-300 mb-6 text-sm leading-relaxed">
              <p>
                &quot;And all things, whatsoever ye shall ask in prayer,
                believing, ye shall receive&quot;{' '}
                <cite className="not-italic">(Matthew 21:22)</cite>. God relies
                on a promise but a divine principle, setting the foundation for
                how we, as believers, should approach prayer.
              </p>
            </blockquote>

            <Link
              href="/about"
              className="inline-flex items-center text-white bg-(--church-red) px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              Learn More
              <ArrowRight className="ml-2" size={14} aria-hidden="true" />
            </Link>
          </article>

          <figure className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-8 border-(--church-blue) shadow-2xl">
              <Image
                src={VALUES_IMAGE_URL}
                alt="Church community in worship"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
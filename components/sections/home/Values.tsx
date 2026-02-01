import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookHeart } from 'lucide-react'
import congregation from '@/app/assets/congregation.jpeg'

const VALUES_IMAGE_URL = congregation;

export function Values() {
  return (
    <section className="bg-white py-24 overflow-hidden" aria-labelledby="values-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <article className="order-2 lg:order-1">
            <header className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--church-navy)]/5 text-[var(--church-navy)] text-xs font-bold tracking-widest uppercase mb-6">
                <BookHeart size={14} />
                Our Core Belief
              </div>
              <h2 id="values-heading" className="text-[var(--church-navy)] text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6">
                Believing in the <br />
                <span className="text-[var(--church-red)]">Power of Prayer</span>
              </h2>
            </header>

            <div className="prose prose-lg text-slate-600 mb-8">
              <p className="leading-relaxed">
                God relies not just on a promise but a divine principle. We believe that prayer is the foundation for how we, as believers, should approach every aspect of life.
              </p>
              
              <figure className="my-8 pl-6 border-l-4 border-[var(--church-red)]/20 italic text-slate-800 font-serif text-xl">
                &quot;And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.&quot;
                <figcaption className="text-sm text-[var(--church-red)] font-sans font-bold mt-2 not-italic uppercase tracking-wider">
                  — Matthew 21:22
                </figcaption>
              </figure>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 bg-[var(--church-navy)] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-widest hover:bg-[var(--church-red)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              OUR BELIEFS
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>

          {/* Image */}
          <figure className="order-1 lg:order-2 relative">
            {/* Decorative blob background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 rounded-full blur-3xl -z-10" />
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <Image
                src={VALUES_IMAGE_URL}
                alt="Church community in worship"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/60 to-transparent opacity-60" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
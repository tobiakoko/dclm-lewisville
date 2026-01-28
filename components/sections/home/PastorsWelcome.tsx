import Link from 'next/link'
import Image from 'next/image'

const PASTOR_INFO = {
  name: 'Raymond Akoko',
  title: 'District Pastor',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBedWkezcKEM3ol5ulySRzK9Wma9HVGsiwK2CPkJVJ1prlxKVWD3zpO3rkCgT8NDBxYI2TQkD9FD_ekbdYImXzZtAkoV5qO261-4kJZ96l_lolbcrLtxrB6K4QNBkvNIuIxv328ehwX0v0zL6WH4hnqbEI0HcmJ6w0LR605XenX80ye7Sne6fYDaM07TNnvMWT6l_Fu0398WXHYNiLYZ3F-OB564I0qilwWXTiB7_MgcKLdysHjsvooyYiwVg9fEaXtp_g6IEyhIE8',
} as const

export function PastorsWelcome() {
  return (
    <section
      className="py-24 bg-slate-50"
      aria-labelledby="pastor-welcome-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <figure className="lg:w-1/2 relative">
            <div
              className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#f59e0b] rounded-tl-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#f59e0b] rounded-br-3xl"
              aria-hidden="true"
            />
            <div className="relative rounded-4xl overflow-hidden shadow-2xl">
              <Image
                src={PASTOR_INFO.imageUrl}
                alt={`Pastor ${PASTOR_INFO.name}`}
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
              <figcaption className="absolute bottom-0 left-0 w-full bg-linear-to-t from-secondary to-transparent p-8">
                <p className="text-white text-2xl font-serif font-bold">
                  Pastor {PASTOR_INFO.name}
                </p>
                <p className="text-[#f59e0b] font-medium">{PASTOR_INFO.title}</p>
              </figcaption>
            </div>
          </figure>

          <article className="lg:w-1/2 space-y-8">
            <header className="flex items-center gap-4">
              <span className="h-px bg-[#f59e0b] w-12" aria-hidden="true" />
              <span className="text-[#f59e0b] font-bold tracking-widest text-sm uppercase">
                A Message From Our Pastor
              </span>
            </header>

            <h2
              id="pastor-welcome-heading"
              className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight"
            >
              Welcome to a Place of{' '}
              <br />
              <span className="italic text-slate-500">
                Truth & Transformation
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              We are so glad you are here. Whether you are visiting for the
              first time or have been part of our church family for years, it is
              our prayer that you encounter the living God as we gather to
              worship Him together.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              Our church is committed to the faithful teaching of God&apos;s
              Word, passionate worship, and authentic community. We believe that
              the Bible is God&apos;s revealed truth, and we are dedicated to
              living according to its principles in holiness and love.
            </p>

            <footer className="pt-4">
              <p className="text-slate-500 italic mb-2">Blessings in Christ,</p>
              <p className="font-script italic text-4xl text-slate-800">
                {PASTOR_INFO.name}
              </p>
            </footer>

            <Link
              href="/about"
              className="bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-full font-bold my-4 transition-colors inline-block"
            >
              Learn More About Our Church
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
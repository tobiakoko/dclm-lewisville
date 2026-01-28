import Link from 'next/link'
import Image from 'next/image'

const PASTOR_INFO = {
  name: 'Joseph Agbo',
  title: 'Local Pastor',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBedWkezcKEM3ol5ulySRzK9Wma9HVGsiwK2CPkJVJ1prlxKVWD3zpO3rkCgT8NDBxYI2TQkD9FD_ekbdYImXzZtAkoV5qO261-4kJZ96l_lolbcrLtxrB6K4QNBkvNIuIxv328ehwX0v0zL6WH4hnqbEI0HcmJ6w0LR605XenX80ye7Sne6fYDaM07TNnvMWT6l_Fu0398WXHYNiLYZ3F-OB564I0qilwWXTiB7_MgcKLdysHjsvooyYiwVg9fEaXtp_g6IEyhIE8',
} as const

export function PastorsWelcome() {
  return (
    <section className="py-24 bg-white overflow-hidden mb-12" aria-labelledby="welcome-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            {/* Background pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-50 rounded-full blur-3xl -z-10" />
            
            <div className="relative rounded-4xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 aspect-4/5 lg:aspect-3/4 max-w-md mx-auto lg:mx-0">
              <Image
                src={PASTOR_INFO.imageUrl}
                alt={`Pastor ${PASTOR_INFO.name}`}
                fill
                className="object-cover"
                priority
              />
              
              {/* Name Card Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-linear-to-t from-black/80 to-transparent pt-24">
                <p className="text-white text-xl font-serif font-bold">
                  Pastor {PASTOR_INFO.name}
                </p>
                <p className="text-(--church-red) font-medium text-sm tracking-wide">
                  {PASTOR_INFO.title}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <header className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="h-px w-8 bg-(--church-red)" aria-hidden="true" />
                <span className="text-(--church-red) font-bold tracking-[0.2em] text-xs uppercase">
                  Welcome Home
                </span>
              </div>

              <h2 id="welcome-heading" className="text-4xl md:text-5xl font-serif font-bold text-(--church-navy) leading-[1.1]">
                A Place of Truth & <br/>
                <span className="italic text-gray-400 font-light">Transformation</span>
              </h2>
            </header>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
              <p>
                We are so glad you are here. Whether you are visiting for the
                first time or have been part of our church family for years, it is
                our prayer that you encounter the living God as we gather to
                worship Him together.
              </p>
              <p>
                Our church is committed to the faithful teaching of God&apos;s
                Word, passionate worship, and authentic community. We believe that
                the Bible is God&apos;s revealed truth, and we are dedicated to
                living according to its principles in holiness and love.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link
                href="/about"
                className="px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold text-sm hover:bg-(--church-red) transition-colors shadow-lg shadow-(--church-navy)/20"
              >
                Meet Our Leadership
              </Link>
              
              {/* Signature representation */}
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Blessings,</p>
                <p className="font-serif italic text-2xl text-(--church-navy)">
                  {PASTOR_INFO.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import Link from 'next/link'
import Image from 'next/image'
import Pastor from '@/app/assets/Pastor_Joseph.jpeg'

const PASTOR_INFO = {
  name: 'Joseph Agbo',
  title: 'Local Pastor',
  imageUrl: Pastor,
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
                Welcome to<br/>
                <span className="italic text-gray-400 font-light">Deeper Life Bible Church Lewisville</span>
              </h2>
            </header>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
              <p>
                Thank you for visiting us online. If you&apos;re new, we know how it
                feels to walk into a room where no one knows your name yet. So
                let&apos;s say it plainly: you won&apos;t be &ldquo;lost in the
                crowd&rdquo; here. Our pastor and members get to know you
                personally, like family.
              </p>

              <p>
                We are a Bible-believing church founded by Pastor (Dr.) W.F.
                Kumuyi, and Lewisville is part of the Southwest Region under
                Regional Overseer Pastor Thompson Aderemi. It is our prayer and
                purpose to bring people to Christ and help them grow in Him.
              </p>

              <p>
                If you have questions not answered on this site, visit our
                Contact page — we would love to serve you. We look forward to
                welcoming you in person very soon.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link
                href="/ministers"
                className="px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold text-sm hover:bg-(--church-red) transition-colors shadow-lg shadow-(--church-navy)/20"
              >
                Meet Our Leadership
              </Link>
              
              {/* Signature representation */}
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">We look forward to welcoming you,</p>
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
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-700">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 text-center text-white">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
          Welcome to DCLM Lewisville
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Growing in Christ, Serving Together
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
            <Link href="/contact">Plan Your Visit</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

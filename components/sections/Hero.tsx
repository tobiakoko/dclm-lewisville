import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, Heart, Users, Book } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40" />

      {/* Content */}
      <div className="container relative z-10 text-center text-white px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm  px-6 py-2 mb-8 animate-fade-in">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome Home</span>
          </div>

          {/* Main heading with animation */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            <span className="block mb-2">Welcome to</span>
            <span className="block bg-linear-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              DCLM Lewisville
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto font-light animate-fade-in-up animate-delay-200">
            Growing in Christ, Serving Together
          </p>

          {/* Description */}
          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-white/90 animate-fade-in-up animate-delay-300">
            Join our vibrant community as we worship, grow, and make a difference in our community through faith, fellowship, and service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animate-delay-400">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/about">
                <span className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Learn More
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Plan Your Visit
                </span>
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in animate-delay-500">
            <div className="bg-white/10 backdrop-blur-sm  p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-white/20  flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Welcoming Community</h3>
              <p className="text-sm text-white/80">Experience genuine fellowship and lasting friendships</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm  p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-white/20  flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Biblical Teaching</h3>
              <p className="text-sm text-white/80">Grow deeper in your faith through God's Word</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm  p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-white/20  flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Life-Changing Ministry</h3>
              <p className="text-sm text-white/80">Find your place to serve and make an impact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  )
}

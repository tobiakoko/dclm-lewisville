import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { urlForImage } from '@/lib/sanity/image'

interface CTASectionProps {
  title: string
  description?: string
  backgroundImage?: any
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  style?: 'gradient' | 'image' | 'solid'
}

export default function CTASection({
  title,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  style = 'gradient',
}: CTASectionProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      {/* Background */}
      {style === 'image' && backgroundImage ? (
        <>
          <div className="absolute inset-0 animate-image-zoom">
            <Image
              src={urlForImage(backgroundImage).url()}
              alt="CTA background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/85" />
        </>
      ) : style === 'solid' ? (
        <div className="absolute inset-0 bg-primary" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Accent bars */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-secondary/80 to-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-secondary/80 to-secondary" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
            {title}
          </h2>
          {description && (
            <p className="text-xl md:text-2xl lg:text-3xl mb-14 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-delay-400">
            {primaryButton && (
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-lg md:text-xl px-12 h-16 md:h-18 font-bold"
              >
                <Link href={primaryButton.href}>{primaryButton.text}</Link>
              </Button>
            )}
            {secondaryButton && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-3 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg md:text-xl px-12 h-16 md:h-18 font-bold"
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

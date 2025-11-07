import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CTAButton {
  text: string
  href: string
}

interface CTAProps {
  title: string
  description: string
  primaryButton: CTAButton
  secondaryButton?: CTAButton
}

export default function CTA({ title, description, primaryButton, secondaryButton }: CTAProps) {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-purple-700">
      <div className="container text-center">
        <h2 className="font-heading text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href={primaryButton.href}>{primaryButton.text}</Link>
          </Button>
          {secondaryButton && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white/20"
            >
              <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
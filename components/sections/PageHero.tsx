import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  badge?: {
    icon?: ReactNode
    text: string
  }
  buttons?: Array<{
    text: string
    href: string
    variant?: 'default' | 'outline'
    icon?: ReactNode
  }>
  features?: Array<{
    icon: ReactNode
    title: string
    description: string
  }>
  showScrollIndicator?: boolean
  variant?: 'default' | 'simple'
}

export default function PageHero({
  title,
  subtitle,
  description,
  badge,
  buttons,
  features,
  showScrollIndicator = false,
  variant = 'default'
}: PageHeroProps) {
  if (variant === 'simple') {
    return (
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="container relative z-10 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Content */}
      <div className="container relative z-10 text-center text-white px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in">
              {badge.icon}
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          )}

          {/* Main heading with animation */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            {subtitle && <span className="block mb-2">{subtitle}</span>}
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Description */}
          {description && (
            <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-white/90 animate-fade-in-up animate-delay-300">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animate-delay-400">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  variant={button.variant || 'default'}
                  className={
                    button.variant === 'outline'
                      ? 'bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                      : 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                  }
                >
                  <Link href={button.href}>
                    <span className="flex items-center gap-2">
                      {button.icon}
                      {button.text}
                    </span>
                  </Link>
                </Button>
              ))}
            </div>
          )}

          {/* Feature highlights */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in animate-delay-500">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      )}
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary  flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              DCLM Lewisville
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Deeper Christian Life Ministry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden uppercase lg:flex items-center space-x-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-4 py-2  transition-all duration-200 hover:bg-primary/10 hover:text-primary relative group ${
                link.highlight ? 'hidden' : ''
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
          <Button
            asChild
            className="ml-4 bg-gradient-to-r from-primary to-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/give">
              <Heart className="w-4 h-4 mr-2" />
              Give
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2  hover:bg-primary/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-primary" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white/95 backdrop-blur-xl shadow-lg animate-fade-in">
          <nav className="container uppercase py-6 flex flex-col space-y-1">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium px-4 py-3  hover:bg-primary/10 hover:text-primary transition-all duration-200 animate-slide-in-left"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button asChild className="w-full bg-gradient-to-r from-primary to-primary">
                <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Give
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
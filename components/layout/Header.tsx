'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Church, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { useScroll } from "@/hooks/use-scroll"

const NAVIGATION = NAV_LINKS.filter(link => !link.highlight)
const CTA_BUTTONS = NAV_LINKS.filter(link => link.highlight)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrolled = useScroll(10)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-border elevation-2'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group relative z-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-8 w-auto">
                <Image
                  src="/Logo.png"
                  alt={SITE_CONFIG.name}
                  width={140}
                  height={32}
                  className="h-full w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAVIGATION.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-foreground/65 hover:text-foreground transition-colors duration-150 rounded-md hover:bg-muted/50"
                >
                  {link.name}
                </Link>
              ))}

              {/* Call-to-Action Buttons */}
              <div className="flex items-center gap-2 ml-6 pl-6 border-l border-border">
                {CTA_BUTTONS.map((button, index) => (
                  <Button
                    key={button.href}
                    asChild
                    size="sm"
                    variant={index === 0 ? "ghost" : "accent"}
                    className={index === 0 ? "hover:bg-muted" : ""}
                  >
                    <Link href={button.href}>
                      {index === 0 ? <Heart className="w-3.5 h-3.5" /> : <Church className="w-3.5 h-3.5" />}
                      {button.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            id="mobile-menu"
            className="fixed top-14 right-0 bottom-0 w-full max-w-sm bg-white elevation-4 z-40 lg:hidden overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-6">
              {/* Navigation Links */}
              <div className="space-y-1 pb-6 border-b border-border">
                {NAVIGATION.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-6">
                {CTA_BUTTONS.map((button, index) => (
                  <Button
                    key={button.href}
                    asChild
                    variant={index === 0 ? "outline" : "accent"}
                    className="w-full justify-center"
                    size="default"
                  >
                    <Link href={button.href} onClick={() => setMobileMenuOpen(false)}>
                      {index === 0 ? <Heart className="w-4 h-4" /> : <Church className="w-4 h-4" />}
                      {button.name}
                    </Link>
                  </Button>
                ))}
              </div>

              {/* Tagline */}
              <div className="mt-auto pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center italic">
                  "Holiness unto the Lord"
                </p>
              </div>
            </nav>
          </div>
        </>
      )}

      <div className="h-14" />
    </>
  )
}

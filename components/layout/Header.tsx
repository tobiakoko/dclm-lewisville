'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Church, Heart, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { useScroll } from "@/hooks/use-scroll"

const NAVIGATION = NAV_LINKS.filter(link => !link.highlight)
const CTA_BUTTONS = NAV_LINKS.filter(link => link.highlight)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const scrolled = useScroll(10)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setOpenDesktopDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDesktopDropdown(null)
    setOpenMobileDropdown(null)
  }, [])

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setOpenDesktopDropdown(name)
    setHoveredItem(name)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDesktopDropdown(null)
      setHoveredItem(null)
    }, 150)
  }

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-border elevation-2'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group relative z-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-9 w-auto">
                <Image
                  src="/dclm_logo.png"
                  alt={SITE_CONFIG.name}
                  width={150}
                  height={45}
                  className="h-full w-auto object-contain transition-all duration-200 group-hover:opacity-80"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-blue text-lg leading-tight">
                  DCLM Lewisville
                </div>
                <p className="text-blue/70 text-xs">Deeper Life Bible Church</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAVIGATION.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.children ? (
                    <>
                      <button
                        className={`
                          group relative px-4 py-2 text-sm font-semibold tracking-wide uppercase
                          transition-all duration-200 rounded-md
                          ${hoveredItem === link.name 
                            ? 'text-accent bg-accent/5' 
                            : 'text-foreground hover:text-accent hover:bg-accent/5'
                          }
                        `}
                      >
                        <span className="flex items-center gap-1.5">
                          {link.name}
                          <ChevronDown 
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              openDesktopDropdown === link.name ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                        
                        {/* Active indicator */}
                        <span 
                          className={`
                            absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent
                            transition-all duration-300 ease-out
                            ${openDesktopDropdown === link.name ? 'w-8' : 'w-0'}
                          `}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`
                          absolute top-full left-0 mt-2 w-64
                          transition-all duration-300 ease-out origin-top
                          ${openDesktopDropdown === link.name
                            ? 'opacity-100 visible translate-y-0 scale-100'
                            : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                          }
                        `}
                      >
                        <div className="bg-white elevation-4 rounded-lg overflow-hidden border border-border/50">
                          <div className="py-2">
                            {link.children.map((child, index) => (
                              <div key={child.href}>
                                {child.children ? (
                                  // Nested dropdown for "Devotions"
                                  <div className="relative group/nested">
                                    <div className="px-4 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/5 transition-all duration-200 flex items-center justify-between cursor-pointer group-hover/nested:bg-accent/5">
                                      <span>{child.name}</span>
                                      <ChevronRight className="w-4 h-4 text-foreground/40 group-hover/nested:text-accent transition-colors" />
                                    </div>
                                    
                                    {/* Sub-dropdown */}
                                    <div className="absolute left-full top-0 ml-2 w-56 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300 ease-out translate-x-2 group-hover/nested:translate-x-0">
                                      <div className="bg-white elevation-4 rounded-lg overflow-hidden border border-border/50">
                                        <div className="py-2">
                                          {child.children.map((subChild, subIndex) => (
                                            <Link
                                              key={subChild.href}
                                              href={subChild.href}
                                              className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/5 transition-all duration-200"
                                              onClick={() => {
                                                setOpenDesktopDropdown(null)
                                                setHoveredItem(null)
                                              }}
                                            >
                                              {subChild.name}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <Link
                                    href={child.href}
                                    className={`
                                      block px-4 py-3 text-sm font-medium text-foreground/80 
                                      hover:text-foreground hover:bg-accent/5 
                                      transition-all duration-200
                                      ${index === 0 ? 'rounded-t-lg' : ''}
                                    `}
                                    onClick={() => {
                                      setOpenDesktopDropdown(null)
                                      setHoveredItem(null)
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="
                        group relative px-4 py-2 text-sm font-semibold tracking-wide uppercase
                        text-foreground hover:text-accent hover:bg-accent/5
                        transition-all duration-200 rounded-md
                      "
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Call-to-Action Buttons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
                {CTA_BUTTONS.map((button, index) => (
                  <Button
                    key={button.href}
                    asChild
                    size="sm"
                    variant={index === 0 ? "ghost" : "accent"}
                    className={`
                      font-semibold transition-all duration-200
                      ${index === 0 ? "hover:bg-muted" : "elevation-1 hover:elevation-2"}
                    `}
                  >
                    <Link href={button.href}>
                      {index === 0 ? <Heart className="w-4 h-4" /> : <Church className="w-4 h-4" />}
                      {button.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-muted active:scale-95 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-5">
                <span 
                  className={`
                    absolute top-1 left-0 w-5 h-0.5 bg-foreground rounded-full
                    transition-all duration-300 ease-out
                    ${mobileMenuOpen ? 'top-2.5 rotate-45' : ''}
                  `}
                />
                <span 
                  className={`
                    absolute top-2.5 left-0 w-5 h-0.5 bg-foreground rounded-full
                    transition-all duration-300 ease-out
                    ${mobileMenuOpen ? 'opacity-0 translate-x-2' : ''}
                  `}
                />
                <span 
                  className={`
                    absolute bottom-1 left-0 w-5 h-0.5 bg-foreground rounded-full
                    transition-all duration-300 ease-out
                    ${mobileMenuOpen ? 'bottom-2.5 -rotate-45' : ''}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden
          transition-all duration-300 ease-out
          ${mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Panel */}
      <div
        id="mobile-menu"
        className={`
          fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white z-40 lg:hidden 
          overflow-y-auto elevation-4
          transition-transform duration-300 ease-out
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col h-full p-6">
          {/* Navigation Links */}
          <div className="space-y-1 pb-6 border-b border-border flex-1">
            {NAVIGATION.map((link) => (
              <div key={link.href}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="flex items-center justify-between w-full px-4 py-3.5 text-base font-semibold text-foreground hover:bg-accent/5 rounded-lg transition-all duration-200 group"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`
                          w-4 h-4 text-foreground/40 group-hover:text-accent
                          transition-all duration-300 ease-out
                          ${openMobileDropdown === link.name ? 'rotate-180 text-accent' : ''}
                        `}
                      />
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-out
                        ${openMobileDropdown === link.name 
                          ? 'max-h-96 opacity-100 mt-1' 
                          : 'max-h-0 opacity-0'
                        }
                      `}
                    >
                      <div className="ml-4 space-y-1 py-2 border-l-2 border-accent/20 pl-4">
                        {link.children.map((child) => (
                          <div key={child.href}>
                            {child.children ? (
                              // Nested items for "Devotions"
                              <>
                                <div className="px-3 py-2 text-sm font-semibold text-foreground/70">
                                  {child.name}
                                </div>
                                <div className="ml-3 space-y-1">
                                  {child.children.map((subChild) => (
                                    <Link
                                      key={subChild.href}
                                      href={subChild.href}
                                      className="block px-3 py-2 text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent/5 rounded-md transition-all duration-200"
                                      onClick={() => {
                                        setMobileMenuOpen(false)
                                        setOpenMobileDropdown(null)
                                      }}
                                    >
                                      {subChild.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={child.href}
                                className="block px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/5 rounded-md transition-all duration-200"
                                onClick={() => {
                                  setMobileMenuOpen(false)
                                  setOpenMobileDropdown(null)
                                }}
                              >
                                {child.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-3.5 text-base font-semibold text-foreground hover:bg-accent/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 py-6 border-b border-border">
            {CTA_BUTTONS.map((button, index) => (
              <Button
                key={button.href}
                asChild
                variant={index === 0 ? "outline" : "accent"}
                className="w-full justify-center font-semibold h-12"
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
          <div className="pt-6">
            <p className="text-sm text-muted-foreground text-center italic font-medium">
              "Holiness unto the Lord"
            </p>
          </div>
        </nav>
      </div>

      {/* Header Spacer */}
      <div className="h-16" />
    </>
  )
}
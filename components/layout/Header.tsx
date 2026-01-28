'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { useScroll } from "@/hooks/use-scroll"
import { trackNavigation, trackGiveClick } from '@/lib/analytics'

const NAVIGATION = NAV_LINKS.filter(link => !link.highlight)

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
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              onClick={() => {
                setMobileMenuOpen(false)
                trackNavigation('/', 'logo')
              }}
            >
              <div className="relative h-10 w-auto">
                <Image
                  src="/dclm_logo.png"
                  alt={SITE_CONFIG.name}
                  width={150}
                  height={50}
                  className="h-full w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className={`font-display font-bold text-2xl leading-tight border-b-2 pb-1 transition-colors duration-300 ${
                  scrolled ? 'text-(--church-navy) border-(--church-red)' : 'text-white border-(--church-red)'
                }`}>
                  DCLM Lewisville
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
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
                          group relative text-sm font-semibold tracking-widest uppercase
                          transition-colors duration-200
                          ${scrolled
                            ? (hoveredItem === link.name ? 'text-(--church-red)' : 'text-(--church-navy) hover:text-(--church-red)')
                            : (hoveredItem === link.name ? 'text-(--church-red)' : 'text-white hover:text-(--church-red)')
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
                                                trackNavigation(subChild.href, subChild.name)
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
                                      trackNavigation(child.href, child.name)
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
                      className={`
                        text-sm font-semibold tracking-widest uppercase
                        transition-colors duration-200
                        ${scrolled
                          ? 'text-(--church-navy) hover:text-(--church-red)'
                          : 'text-white hover:text-(--church-red)'
                        }
                      `}
                      onClick={() => trackNavigation(link.href, link.name)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Call-to-Action Button */}
              <Link
                href="/give"
                className="bg-(--church-red) text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-red-700 transition-colors"
                onClick={() => trackGiveClick('header_desktop')}
              >
                GIVE
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? 'text-(--church-navy)' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white shadow-xl fixed w-full top-24 left-0 border-t z-40 max-h-[calc(100vh-6rem)] overflow-y-auto"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col space-y-4 p-6">
            {NAVIGATION.map((link) => (
              <div key={link.href}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="flex items-center justify-between w-full text-(--church-navy) font-semibold tracking-widest hover:text-(--church-red) transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMobileDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-out
                        ${openMobileDropdown === link.name
                          ? 'max-h-96 opacity-100 mt-2'
                          : 'max-h-0 opacity-0'
                        }
                      `}
                    >
                      <div className="ml-4 space-y-2 border-l-2 border-(--church-red)/20 pl-4">
                        {link.children.map((child) => (
                          <div key={child.href}>
                            {child.children ? (
                              <>
                                <div className="text-sm font-semibold text-(--church-navy)/70">
                                  {child.name}
                                </div>
                                <div className="ml-3 space-y-2 mt-2">
                                  {child.children.map((subChild) => (
                                    <Link
                                      key={subChild.href}
                                      href={subChild.href}
                                      className="block text-sm text-(--church-navy)/60 hover:text-(--church-red) transition-colors"
                                      onClick={() => {
                                        setMobileMenuOpen(false)
                                        setOpenMobileDropdown(null)
                                        trackNavigation(subChild.href, subChild.name)
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
                                className="block text-sm text-(--church-navy)/70 hover:text-(--church-red) transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false)
                                  setOpenMobileDropdown(null)
                                  trackNavigation(child.href, child.name)
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
                    className="text-(--church-navy) font-semibold tracking-widest hover:text-(--church-red) transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      trackNavigation(link.href, link.name)
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/give"
              className="bg-(--church-red) text-white px-6 py-3 rounded text-center text-xs font-bold tracking-widest hover:bg-red-700 transition-colors"
              onClick={() => {
                setMobileMenuOpen(false)
                trackGiveClick('header_mobile')
              }}
            >
              GIVE ONLINE
            </Link>
          </nav>
        </div>
      )}

    </>
  )
}
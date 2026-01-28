'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { trackNavigation, trackGiveClick } from '@/lib/analytics'

// Import your project hook
import { useScroll } from '@/hooks/use-scroll'

// Filter out highlighted links (like "Give") if they shouldn't appear in the main standard nav list
const NAVIGATION = NAV_LINKS.filter(link => !link.highlight)

export default function Header() {
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  // Use project hook (threshold 10px)
  const scrolled = useScroll(10)
  
  // Refs for hover intent
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Handle Escape Key
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

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // --- Handlers ---

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
    }, 150) // 150ms grace period
  }

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out border-b ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-200/50 py-2'
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* --- LOGO --- */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-50"
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
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className={`font-display font-semibold text-xl leading-tight pb-0.5 transition-colors duration-300 ${
                  scrolled 
                    ? 'text-(--church-navy)' 
                    : 'text-white'
                }`}>
                  DCLM Lewisville
                </div>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION.map((link) => (
                <div
                  key={link.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.children ? (
                    <>
                      <button
                        className={`
                          group relative text-xs font-medium tracking-widest uppercase flex items-center gap-1.5 py-2
                          transition-colors duration-200
                          ${scrolled
                            ? (hoveredItem === link.name ? 'text-(--church-red)' : 'text-(--church-navy) hover:text-(--church-red)')
                            : (hoveredItem === link.name ? 'text-(--church-red)' : 'text-white hover:text-(--church-red)')
                          }
                        `}
                        aria-expanded={openDesktopDropdown === link.name}
                      >
                        {link.name}
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            openDesktopDropdown === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Panel */}
                      <div
                        className={`
                          absolute top-full left-1/2 -translate-x-1/2 pt-6 w-64
                          transition-all duration-200 ease-out origin-top
                          ${openDesktopDropdown === link.name
                            ? 'opacity-100 visible translate-y-0 scale-100'
                            : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                          }
                        `}
                      >
                        {/* Dropdown Content */}
                        <div className="bg-white shadow-xl rounded-xl overflow-hidden ring-1 ring-black/5 p-1.5">
                          {link.children.map((child) => (
                            <div key={child.href} className="relative group/item">
                              {child.children ? (
                                // Nested Dropdown Trigger
                                <div className="w-full text-left px-4 py-3 text-xs font-medium uppercase tracking-widest text-gray-600 hover:text-[var(--church-red)] hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer transition-colors">
                                  <span>{child.name}</span>
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-[var(--church-red)]" />

                                  {/* Nested Sub-menu */}
                                  <div className="absolute left-full top-0 ml-2 w-56 z-50 opacity-0 invisible -translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 pointer-events-none group-hover/item:pointer-events-auto">
                                     <div className="bg-white shadow-lg rounded-xl overflow-hidden ring-1 ring-black/5 p-1.5">
                                        {child.children.map((subChild) => (
                                          <Link
                                            key={subChild.href}
                                            href={subChild.href}
                                            className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-[var(--church-navy)] hover:bg-gray-50 rounded-lg transition-colors"
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
                              ) : (
                                // Standard Link
                                <Link
                                  href={child.href}
                                  className="block px-4 py-3 text-xs font-medium uppercase tracking-widest text-gray-600 hover:text-[var(--church-navy)] hover:bg-gray-50 rounded-lg transition-colors"
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
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`
                        text-xs font-medium tracking-widest uppercase py-2
                        transition-colors duration-200
                        ${scrolled
                          ? 'text-[var(--church-navy)] hover:text-[var(--church-red)]'
                          : 'text-white hover:text-[var(--church-red)]'
                        }
                      `}
                      onClick={() => trackNavigation(link.href, link.name)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link
                href="/give"
                className="bg-[var(--church-red)] text-white px-7 py-2.5 rounded-full text-xs font-bold tracking-widest hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300"
                onClick={() => trackGiveClick('header_desktop')}
              >
                GIVE
              </Link>
            </nav>

            {/* --- MOBILE MENU BUTTON --- */}
            <button
              className={`lg:hidden p-2 -mr-2 transition-colors relative z-50 rounded-full hover:bg-white/10 ${
                (mobileMenuOpen || scrolled) ? 'text-[var(--church-navy)]' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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

      {/* --- MOBILE DRAWER --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ${
           mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full pt-28 pb-8 px-6 overflow-y-auto">
          
          <nav className="flex-1 space-y-6">
            {NAVIGATION.map((link) => (
              <div key={link.href} className="border-b border-gray-100 pb-4 last:border-0">
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="flex items-center justify-between w-full text-[var(--church-navy)] text-xs font-medium tracking-widest uppercase hover:text-[var(--church-red)] transition-colors group"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-300 group-hover:text-[var(--church-red)] transition-transform duration-300 ${
                          openMobileDropdown === link.name ? 'rotate-180 text-[var(--church-red)]' : ''
                        }`}
                      />
                    </button>

                    {/* Accordion Animation */}
                    <div
                      className={`
                        grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out
                        ${openMobileDropdown === link.name
                          ? 'grid-rows-[1fr] opacity-100 mt-3'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pl-4 border-l-2 border-gray-100 ml-1">
                          {link.children.map((child) => (
                            <div key={child.href}>
                              {child.children ? (
                                <div className="space-y-3">
                                  <span className="block text-xs font-medium text-[var(--church-red)] uppercase tracking-widest opacity-80">
                                    {child.name}
                                  </span>
                                  <div className="pl-3 space-y-3 border-l border-gray-100">
                                     {child.children.map((subChild) => (
                                        <Link
                                          key={subChild.href}
                                          href={subChild.href}
                                          className="block text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-[var(--church-navy)] transition-colors"
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
                                </div>
                              ) : (
                                <Link
                                  href={child.href}
                                  className="block text-xs font-medium uppercase tracking-widest text-gray-600 hover:text-[var(--church-navy)] transition-colors"
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
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-[var(--church-navy)] text-xs font-medium tracking-widest uppercase hover:text-[var(--church-red)] transition-colors"
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
          </nav>

          {/* Mobile Footer */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <Link
              href="/give"
              className="flex items-center justify-center w-full bg-[var(--church-red)] text-white py-4 rounded-xl text-sm font-bold tracking-widest shadow-md hover:bg-red-700 active:scale-95 transition-all"
              onClick={() => {
                setMobileMenuOpen(false)
                trackGiveClick('header_mobile')
              }}
            >
              GIVE ONLINE
            </Link>
            
            <p className="text-center text-xs text-gray-300 mt-6">
               © {new Date().getFullYear()} DCLM Lewisville
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
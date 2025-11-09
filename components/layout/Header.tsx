'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Church, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { useScroll } from "@/hooks/use-scroll";

// Add after imports
type MotionTransition = {
  duration?: number
  delay?: number
  ease?: string | string[] | [number, number, number, number]
  type?: 'spring' | 'tween' | 'inertia'
  stiffness?: number
  damping?: number
  staggerChildren?: number
  delayChildren?: number
}

type MotionVariant = {
  opacity?: number
  x?: number | string
  y?: number | string
  scale?: number
  rotate?: number
  scaleX?: number
  transition?: MotionTransition
}

type MotionVariants = Record<string, MotionVariant>

const NAVIGATION = NAV_LINKS.filter(link => !link.highlight)
const CTA_BUTTONS = NAV_LINKS.filter(link => link.highlight)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrolled = useScroll(10);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-md border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 lg:h-24 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <div className="relative h-12 w-auto sm:h-14 lg:h-16">
                  <Image 
                    src="/Logo.png" 
                    alt={SITE_CONFIG.name}
                    width={180}
                    height={64}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAVIGATION.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300 rounded-full" />
                  </Link>
                </motion.div>
              ))}

              {/* Call-to-Action Buttons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                {CTA_BUTTONS.map((button, index) => (
                  <motion.div
                    key={button.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                  >
                    <Button
                      asChild
                      size="sm"
                      variant={index === 0 ? "outline" : "default"}
                      className={index === 0 
                        ? "border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                        : "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
                      }
                    >
                      <Link href={button.href}>
                        {index === 0 ? <Heart className="w-4 h-4 mr-2" /> : <Church className="w-4 h-4 mr-2" />}
                        {button.name}
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2.5 rounded-lg hover:bg-primary/5 transition-colors relative z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <nav className="flex flex-col p-6">
                {/* Navigation Links */}
                <div className="space-y-1 pb-6 border-b border-gray-100">
                  {NAVIGATION.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6">
                  {CTA_BUTTONS.map((button, index) => (
                    <motion.div
                      key={button.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                    >
                      <Button
                        asChild
                        variant={index === 0 ? "outline" : "default"}
                        className={`w-full justify-center ${
                          index === 0 
                            ? "border-primary/20 hover:bg-primary/5"
                            : "bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                        }`}
                        size="lg"
                      >
                        <Link href={button.href} onClick={() => setMobileMenuOpen(false)}>
                          {index === 0 ? <Heart className="w-4 h-4 mr-2" /> : <Church className="w-4 h-4 mr-2" />}
                          {button.name}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto pt-6 border-t border-gray-100"
                >
                  <p className="text-sm text-gray-600 text-center italic">
                    "Holiness unto the Lord"
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20 lg:h-24" />
    </>
  )
}
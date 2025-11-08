'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Church } from 'lucide-react'
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-white/95 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* DCLM Logo */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Church className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-primary">
                  DCLM
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block font-medium">
                  Lewisville, TX
                </span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary relative group ${
                  link.highlight ? 'hidden' : ''
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              className="ml-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/give">
                <Church className="w-4 h-4 mr-2" />
                Give
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-primary" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden border-t bg-white/98 backdrop-blur-xl shadow-lg"
        >
          <nav className="container py-6 flex flex-col space-y-1">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-base font-medium px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4">
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary">
                <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                  <Church className="w-4 h-4 mr-2" />
                  Give
                </Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}

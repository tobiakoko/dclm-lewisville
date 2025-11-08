'use client'

import Link from 'next/link'
import { motion, useInView, Transition, Variants } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Church, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Heart,
  Send,
  ExternalLink,
  ChevronRight,
  Calendar,
  BookOpen,
  Users,
  Gift
} from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { 
  SITE_CONFIG, 
  SERVICE_TIMES, 
  NAV_LINKS,
  QUICK_LINKS,
  MINISTRY_CATEGORIES 
} from '@/lib/constants'

// Type-safe animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Quick action cards data
const QUICK_ACTIONS = [
  {
    icon: Calendar,
    title: 'Upcoming Events',
    description: 'See what\'s happening',
    href: '/events',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: BookOpen,
    title: 'Watch Sermons',
    description: 'Latest messages',
    href: '/sermons',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Join a Group',
    description: 'Connect with others',
    href: '/groups',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Gift,
    title: 'Give Online',
    description: 'Support our mission',
    href: '/give',
    color: 'from-orange-500 to-orange-600'
  },
]

// Navigation organization
const NAVIGATION = {
  main: NAV_LINKS.filter(link => !link.highlight).slice(0, 4),
  resources: QUICK_LINKS.slice(0, 4),
  connect: QUICK_LINKS.slice(4),
  ministries: MINISTRY_CATEGORIES.slice(0, 4),
}

// Social media links
const SOCIAL_LINKS = [
  { 
    name: 'Facebook', 
    icon: Facebook, 
    href: SITE_CONFIG.socialMedia.facebook, 
    color: 'hover:bg-[#1877F2]',
    bgColor: 'bg-[#1877F2]/10' 
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: SITE_CONFIG.socialMedia.instagram, 
    color: 'hover:bg-[#E4405F]',
    bgColor: 'bg-[#E4405F]/10' 
  },
  { 
    name: 'YouTube', 
    icon: Youtube, 
    href: SITE_CONFIG.socialMedia.youtube, 
    color: 'hover:bg-[#FF0000]',
    bgColor: 'bg-[#FF0000]/10' 
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Successfully subscribed to newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Type-safe transitions
  const borderTransition: Transition = {
    duration: 1,
    ease: "easeOut"
  }

  const hoverTransition: Transition = {
    type: "spring",
    stiffness: 300
  }

  const rotateTransition: Transition = {
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }

  return (
    <footer ref={ref} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Animated top border */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={borderTransition}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left"
      />
      
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-16 mb-16"
        >
          {QUICK_ACTIONS.map((action) => (
            <motion.div
              key={action.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={hoverTransition}
            >
              <Link
                href={action.href}
                className="block p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
                <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Main footer content */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 py-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative h-14 w-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Church className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">
                  {SITE_CONFIG.shortName}
                </h3>
                <p className="text-xs text-gray-400">Deeper Christian Life Ministry</p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              {SITE_CONFIG.description}
            </p>

            <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Our Mission</p>
                  <p className="text-xs text-gray-400 italic">"Holiness unto the Lord"</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 ${social.bgColor} rounded-xl flex items-center justify-center border border-white/10 transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {Object.entries(NAVIGATION).map(([key, links]) => (
            <motion.div key={key} variants={itemVariants} className="lg:col-span-2">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Times & Newsletter Row */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-y border-white/10"
        >
          {/* Service Times */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-white font-semibold text-lg">Service Times</h3>
            </div>
            <div className="space-y-3">
              {SERVICE_TIMES.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-transparent rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-400">{service.day} • {service.description}</p>
                  </div>
                  <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                    {service.time}
                  </span>
                </motion.div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40">
              <Link href="/visit">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Your Visit
              </Link>
            </Button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Send className="w-5 h-5 text-primary" />
              <h3 className="text-white font-semibold text-lg">Stay Connected</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Subscribe to receive weekly updates, inspiring messages, event notifications, and prayer requests directly to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary h-12"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 h-12 text-base font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={rotateTransition}>
                      <Send className="w-4 h-4" />
                    </motion.div>
                    Subscribing...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe to Newsletter
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Info Bar */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-6 border-b border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.a
              variants={itemVariants}
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Address</p>
                <p className="text-sm text-gray-300 group-hover:text-primary transition-colors">
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <p className="text-sm text-gray-300 group-hover:text-primary transition-colors">
                  {SITE_CONFIG.phone}
                </p>
              </div>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <p className="text-sm text-gray-300 group-hover:text-primary transition-colors">
                  {SITE_CONFIG.email}
                </p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} {SITE_CONFIG.shortName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
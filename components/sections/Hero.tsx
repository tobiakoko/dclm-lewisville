'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, Heart, Users, Book, Church } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#6B0F2A] to-primary/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 text-center text-white px-4 py-20"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <Church className="w-5 h-5" />
            <span className="text-sm font-semibold">Welcome to DCLM Lewisville</span>
          </motion.div>

          {/* Main heading with animation */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="block mb-3">Growing in Faith</span>
            <span className="block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-shimmer">
              Living in Holiness
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto font-light text-white/95"
          >
            Deeper Christian Life Ministry
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-white/90 leading-relaxed"
          >
            A Christ-centered church in Lewisville, TX, dedicated to biblical teaching,
            fervent prayer, and holy living. Join us as we worship God and grow together in faith.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Link href="/about">
                  <span className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Learn More
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Plan Your Visit
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <Heart className="w-6 h-6 text-white" />,
                title: 'Biblical Teaching',
                description: 'Systematic study of God\'s Word for spiritual growth'
              },
              {
                icon: <Book className="w-6 h-6 text-white" />,
                title: 'Holy Living',
                description: 'Living consecrated lives in obedience to Christ'
              },
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: 'Fellowship',
                description: 'Genuine community and lasting friendships in Christ'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  )
}

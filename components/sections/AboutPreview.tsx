'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Heart, Users, ArrowRight, Church } from 'lucide-react'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side - Content */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
              <Church className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">About Us</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to DCLM Lewisville
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a Christ-centered church in Lewisville, Texas, dedicated to biblical teaching,
              passionate worship, and spiritual growth. Part of the global Deeper Christian Life Ministry
              founded in 1973, we continue the mission of bringing people to Christ and building them
              up in the faith.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Our church is committed to being a beacon of light in the Lewisville community, providing
              a welcoming environment where individuals and families can grow spiritually, find genuine
              fellowship, and serve the Lord together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 group"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    Learn More About Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-primary/5 transition-all duration-300"
                >
                  <Link href="/contact">Plan Your Visit</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: <Book className="w-6 h-6 text-white" />,
                title: 'Biblical Teaching',
                description: 'Systematic and expository study of God\'s Word for spiritual growth'
              },
              {
                icon: <Heart className="w-6 h-6 text-white" />,
                title: 'Holy Living',
                description: 'Committed to living a life separated from sin and consecrated to God'
              },
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: 'Community',
                description: 'A welcoming family where you can connect and build lasting friendships'
              },
              {
                icon: <Church className="w-6 h-6 text-white" />,
                title: 'Global Mission',
                description: 'Part of a worldwide ministry reaching over 70 countries with the Gospel'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mission & Vision Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mt-16"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border-2 border-primary/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To bring people to Christ and build them up in the faith through biblical teaching,
              passionate worship, fervent prayer, and dedicated service.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-8 rounded-2xl border-2 border-secondary/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg"
              >
                <Book className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold text-secondary">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be a Christ-centered church that transforms lives through God&apos;s Word, equipping
              believers to live holy lives and fulfill the Great Commission.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

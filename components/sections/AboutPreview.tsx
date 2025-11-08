import Link from 'next/link'
import { Book, Heart, Users, ArrowRight, Church } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="animate-fade-in-up">
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
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">Plan Your Visit</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up animate-delay-200">
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
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Preview */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 animate-fade-in-up animate-delay-400">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border-2 border-blue-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-blue-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To bring people to Christ and build them up in the faith through biblical teaching,
              passionate worship, fervent prayer, and dedicated service.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-8 rounded-2xl border-2 border-purple-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-purple-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be a Christ-centered church that transforms lives through God&apos;s Word, equipping
              believers to live holy lives and fulfill the Great Commission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

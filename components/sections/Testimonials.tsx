'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Testimonial } from '@/lib/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 bg-linear-to-br from-blue-50 to-purple-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Life Transformation Stories
          </h2>
          <p className="text-gray-600">
            Hear from members of our church family
          </p>
        </div>

        <div className="relative bg-white rounded-lg shadow-xl p-8 md:p-12">
          <Quote className="absolute top-4 left-4 text-blue-200" size={48} />
          
          <div className="relative z-10">
            <p className="text-xl text-gray-700 mb-8 italic">
              &quot;{current.content}&quot;
            </p>

            <div className="flex items-center space-x-4">
              {current.photo && (
                <Image
                  src={urlFor(current.photo).width(60).height(60).url()}
                  alt={current.author}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-bold text-gray-900">{current.author}</div>
                <div className="text-sm text-gray-600">Church Member</div>
              </div>
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="text-blue-600" size={20} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="text-blue-600" size={20} />
              </button>
            </div>
          )}

          {/* Dots indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
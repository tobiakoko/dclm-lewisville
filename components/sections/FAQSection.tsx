'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  heading?: string
  subheading?: string
  faqs: FAQ[]
}

export default function FAQSection({
  heading = 'Frequently Asked Questions',
  subheading = 'Find answers to common questions about our church',
  faqs = [],
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {heading && (
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>
          )}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200  overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

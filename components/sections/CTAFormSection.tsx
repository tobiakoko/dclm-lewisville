'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, User, Phone, MessageSquare } from 'lucide-react'

interface CTAFormSectionProps {
  heading: string
  subheading?: string
  formType?: 'newsletter' | 'contact' | 'prayer' | 'visitor'
  submitButtonText?: string
  successMessage?: string
}

export default function CTAFormSection({
  heading,
  subheading,
  formType = 'newsletter',
  submitButtonText = 'Submit',
  successMessage = 'Thank you! We will be in touch soon.',
}: CTAFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>
            )}
          </div>

          {/* Form */}
          <div className="bg-white  shadow-2xl p-8 md:p-12 border border-gray-100">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100  flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-900">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                {formType !== 'newsletter' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field (for contact and visitor forms) */}
                {(formType === 'contact' || formType === 'visitor') && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                )}

                {/* Message Field (for contact and prayer forms) */}
                {(formType === 'contact' || formType === 'prayer') && (
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {formType === 'prayer' ? 'Prayer Request' : 'Message'}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Textarea
                        id="message"
                        placeholder={
                          formType === 'prayer'
                            ? 'Share your prayer request...'
                            : 'Your message...'
                        }
                        className="pl-10 min-h-32"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg h-14"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : submitButtonText}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

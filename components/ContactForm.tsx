'use client'

import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG, telHref } from '@/lib/constants'
import {
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
  type ContactTopic,
} from '@/lib/validations/contact'
import { trackContactFormSubmit, trackContactFormError } from '@/lib/analytics'

type SubmitStatus = 'success' | 'failed' | 'rate-limited' | null

interface ContactFormProps {
  topic?: Exclude<ContactTopic, 'visit'>
  /** Preselected ministry name when topic is "ministry" */
  ministry?: string
  submitLabel?: string
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm mt-1 font-semibold">
      {message}
    </p>
  )
}

export default function ContactForm({ topic = 'contact', ministry, submitLabel = 'Send message' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    message: `${uid}-message`,
  }

  const emptyValues: ContactFormInput = { topic, ministry, name: '', email: '', phone: '', message: '' }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyValues,
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        trackContactFormSubmit(`contact_page_${topic}`)
        reset(emptyValues)
      } else if (response.status === 429) {
        setSubmitStatus('rate-limited')
        trackContactFormError('rate_limited')
      } else {
        setSubmitStatus('failed')
        trackContactFormError(`status_${response.status}`)
      }
    } catch {
      setSubmitStatus('failed')
      trackContactFormError('network_error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const describedBy = (field: keyof typeof ids) => (errors[field] ? `${ids[field]}-error` : undefined)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input type="hidden" {...register('topic')} />
      {ministry && <input type="hidden" {...register('ministry')} />}

      {ministry && (
        <p>
          About: <strong>{ministry}</strong>
        </p>
      )}

      <div>
        <label htmlFor={ids.name} className="block text-sm font-medium mb-2">
          Name (required)
        </label>
        <Input
          id={ids.name}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy('name')}
          {...register('name')}
        />
        <FieldError id={`${ids.name}-error`} message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor={ids.email} className="block text-sm font-medium mb-2">
          Email (required)
        </label>
        <Input
          id={ids.email}
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy('email')}
          {...register('email')}
        />
        <FieldError id={`${ids.email}-error`} message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor={ids.phone} className="block text-sm font-medium mb-2">
          Phone (optional)
        </label>
        <Input
          id={ids.phone}
          type="tel"
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy('phone')}
          {...register('phone')}
        />
        <FieldError id={`${ids.phone}-error`} message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor={ids.message} className="block text-sm font-medium mb-2">
          {topic === 'prayer' ? 'Prayer request (required)' : 'Message (required)'}
        </label>
        <Textarea
          id={ids.message}
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy('message')}
          {...register('message')}
        />
        <FieldError id={`${ids.message}-error`} message={errors.message?.message} />
      </div>

      <div role="status" aria-live="polite">
        {submitStatus === 'success' && (
          <p className="bg-white text-(--church-navy) px-4 py-3 rounded font-semibold">
            Thank you. Your message has been sent to the church.
          </p>
        )}
        {submitStatus === 'failed' && (
          <p className="bg-white text-(--church-navy) px-4 py-3 rounded">
            <strong>Sorry, your message was not sent.</strong> Please call us at{' '}
            <a href={telHref(SITE_CONFIG.phone)} className="underline font-semibold">
              {SITE_CONFIG.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline font-semibold">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        )}
        {submitStatus === 'rate-limited' && (
          <p className="bg-white text-(--church-navy) px-4 py-3 rounded">
            <strong>Too many messages in a short time.</strong> Please wait a minute and try again, or call us at{' '}
            <a href={telHref(SITE_CONFIG.phone)} className="underline font-semibold">
              {SITE_CONFIG.phone}
            </a>
            .
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}

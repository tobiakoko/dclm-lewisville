'use client'

import { useId, useState, type ReactNode } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/site/Alert'
import { SITE_CONFIG, telHref } from '@/lib/constants'
import {
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
  type ContactTopic,
} from '@/lib/validations/contact'
import { trackContactFormSubmit, trackContactFormError } from '@/lib/analytics'

type SubmitStatus = 'success' | 'failed' | 'rate-limited' | null
type FieldName = 'name' | 'email' | 'phone' | 'message' | 'visitDate' | 'adults' | 'children'

interface ContactFormProps {
  topic?: ContactTopic
  /** Preselected ministry name when topic is "ministry" */
  ministry?: string
  submitLabel?: string
}

const MESSAGE_LABEL: Record<ContactTopic, string> = {
  contact: 'Message (required)',
  ministry: 'Message (required)',
  prayer: 'Prayer request (required)',
  visit: 'Anything we should know? (optional)',
}

const SUCCESS: Record<ContactTopic, string> = {
  contact: 'Thank you. Your message has been sent to the church.',
  ministry: 'Thank you. Your message has been sent to the church.',
  prayer: 'Thank you. Your message has been sent to the church.',
  visit: 'Thank you. Your message has been sent to the church. We look forward to welcoming you.',
}

function PhoneLink() {
  return (
    <a href={telHref(SITE_CONFIG.phone)} className="font-semibold underline underline-offset-4">
      {SITE_CONFIG.phone}
    </a>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 font-semibold text-heaven-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm({ topic = 'contact', ministry, submitLabel = 'Send message' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)
  const uid = useId()
  const id = (field: FieldName) => `${uid}-${field}`

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

  const a11y = (field: FieldName, fieldErrors: FieldErrors<ContactFormInput> = errors) => ({
    id: id(field),
    'aria-invalid': fieldErrors[field] ? (true as const) : undefined,
    'aria-describedby': fieldErrors[field] ? `${id(field)}-error` : undefined,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5" noValidate>
      <input type="hidden" {...register('topic')} />
      {ministry && <input type="hidden" {...register('ministry')} />}

      {ministry && (
        <p>
          About: <strong>{ministry}</strong>
        </p>
      )}

      <Field id={id('name')} label="Name (required)" error={errors.name?.message}>
        <Input autoComplete="name" {...a11y('name')} {...register('name')} />
      </Field>

      <Field id={id('email')} label="Email (required)" error={errors.email?.message}>
        <Input type="email" autoComplete="email" {...a11y('email')} {...register('email')} />
      </Field>

      <Field id={id('phone')} label="Phone (optional)" error={errors.phone?.message}>
        <Input type="tel" autoComplete="tel" {...a11y('phone')} {...register('phone')} />
      </Field>

      {topic === 'visit' && (
        <>
          <Field id={id('visitDate')} label="Date you plan to visit (required)" error={errors.visitDate?.message}>
            <Input type="date" {...a11y('visitDate')} {...register('visitDate')} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id('adults')} label="Number of adults (optional)" error={errors.adults?.message}>
              <Input type="number" inputMode="numeric" min={0} max={50} {...a11y('adults')} {...register('adults')} />
            </Field>
            <Field id={id('children')} label="Number of children (optional)" error={errors.children?.message}>
              <Input type="number" inputMode="numeric" min={0} max={50} {...a11y('children')} {...register('children')} />
            </Field>
          </div>
        </>
      )}

      <Field id={id('message')} label={MESSAGE_LABEL[topic]} error={errors.message?.message}>
        <Textarea rows={5} {...a11y('message')} {...register('message')} />
      </Field>

      <div aria-live="polite">
        {submitStatus === 'success' && <Alert tone="success" title={SUCCESS[topic]} />}
        {submitStatus === 'failed' && (
          <Alert tone="error" title="Sorry, your message was not sent.">
            <p>
              Please call us at <PhoneLink /> or email{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold underline underline-offset-4">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </Alert>
        )}
        {submitStatus === 'rate-limited' && (
          <Alert tone="error" title="Too many messages in a short time.">
            <p>
              Please wait a minute and try again, or call us at <PhoneLink />.
            </p>
          </Alert>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}

'use client'

import { useId, useState, type ReactNode } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/site/Alert'
import { telHref } from '@/lib/constants'
import { cn } from '@/lib/utils'
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
  /** The church's phone and email, shown whenever sending fails */
  phone: string
  email: string
  topic?: ContactTopic
  /** Preselected ministry name when topic is "ministry" */
  ministry?: string
  submitLabel?: string
}

const MESSAGE_LABEL: Record<ContactTopic, { label: string; optional?: boolean }> = {
  contact: { label: 'Message' },
  ministry: { label: 'Message' },
  prayer: { label: 'Prayer request' },
  visit: { label: 'Anything we should know?', optional: true },
}

const SUCCESS: Record<ContactTopic, string> = {
  contact: 'Thank you. Your message has been sent to the church.',
  ministry: 'Thank you. Your message has been sent to the church.',
  prayer: 'Thank you. Your message has been sent to the church.',
  visit: 'Thank you. Your message has been sent to the church. We look forward to welcoming you.',
}

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a href={telHref(phone)} className="font-semibold underline underline-offset-4">
      {phone}
    </a>
  )
}

function Field({
  id,
  label,
  optional,
  error,
  full,
  children,
}: {
  id: string
  label: string
  /** Shown as "(optional)"; fields without it are required */
  optional?: boolean
  error?: string
  /** Spans both columns of the form grid */
  full?: boolean
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', full && 'sm:col-span-2')}>
      <label htmlFor={id} className="text-[0.9375rem] font-bold leading-snug text-navy-900">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-base font-semibold text-heaven-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm({ phone, email, topic = 'contact', ministry, submitLabel = 'Send message' }: ContactFormProps) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2" noValidate>
      <input type="hidden" {...register('topic')} />
      {ministry && <input type="hidden" {...register('ministry')} />}

      {ministry && (
        <p className="sm:col-span-2">
          About: <strong>{ministry}</strong>
        </p>
      )}

      <Field id={id('name')} label="Name" error={errors.name?.message} full>
        <Input autoComplete="name" {...a11y('name')} {...register('name')} />
      </Field>

      <Field id={id('email')} label="Email" error={errors.email?.message}>
        <Input type="email" autoComplete="email" {...a11y('email')} {...register('email')} />
      </Field>

      <Field id={id('phone')} label="Phone" optional error={errors.phone?.message}>
        <Input type="tel" autoComplete="tel" {...a11y('phone')} {...register('phone')} />
      </Field>

      {topic === 'visit' && (
        <>
          <Field id={id('visitDate')} label="Date you plan to visit" error={errors.visitDate?.message} full>
            <Input type="date" {...a11y('visitDate')} {...register('visitDate')} />
          </Field>
          <Field id={id('adults')} label="Number of adults" optional error={errors.adults?.message}>
            <Input type="number" inputMode="numeric" min={0} max={50} {...a11y('adults')} {...register('adults')} />
          </Field>
          <Field id={id('children')} label="Number of children" optional error={errors.children?.message}>
            <Input type="number" inputMode="numeric" min={0} max={50} {...a11y('children')} {...register('children')} />
          </Field>
        </>
      )}

      <Field id={id('message')} label={MESSAGE_LABEL[topic].label} optional={MESSAGE_LABEL[topic].optional} error={errors.message?.message} full>
        <Textarea rows={5} {...a11y('message')} {...register('message')} />
      </Field>

      <div aria-live="polite" className="empty:hidden sm:col-span-2">
        {submitStatus === 'success' && <Alert tone="success" title={SUCCESS[topic]} />}
        {submitStatus === 'failed' && (
          <Alert tone="error" title="Sorry, your message was not sent.">
            <p>
              Please call us at <PhoneLink phone={phone} /> or email{' '}
              <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
                {email}
              </a>
              .
            </p>
          </Alert>
        )}
        {submitStatus === 'rate-limited' && (
          <Alert tone="error" title="Too many messages in a short time.">
            <p>
              Please wait a minute and try again, or call us at <PhoneLink phone={phone} />.
            </p>
          </Alert>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-sm text-ink-muted">Fields without “optional” are required.</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

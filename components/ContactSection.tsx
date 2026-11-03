'use client'

import { useState } from 'react'
import ContactForm from '@/components/ContactForm'
import { SegmentedControl } from '@/components/ui/segmented-control'
import type { ContactTopic } from '@/lib/validations/contact'

type Choice = 'contact' | 'prayer'

const OPTIONS: { value: Choice; label: string }[] = [
  { value: 'contact', label: 'General message' },
  { value: 'prayer', label: 'Prayer request' },
]

/**
 * The Contact page form: a General message / Prayer request switch that sets the topic (and with
 * it the email subject, message label and button). A ministry chosen from the Ministries page
 * stays attached to a general message.
 */
export function ContactSection({
  phone,
  email,
  initialTopic,
  ministry,
  prayerHubUrl,
}: {
  phone: string
  email: string
  initialTopic: Choice
  ministry?: string
  prayerHubUrl: string
}) {
  const [choice, setChoice] = useState<Choice>(initialTopic)
  const topic: ContactTopic = choice === 'prayer' ? 'prayer' : ministry ? 'ministry' : 'contact'
  return (
    <div>
      <SegmentedControl label="What would you like to send?" options={OPTIONS} value={choice} onChange={setChoice} />
      {choice === 'prayer' && (
        <p className="mt-5">
          Prayer requests are read by our pastor. You can also use the{' '}
          <a href={prayerHubUrl} className="font-semibold text-emblem-sky-700 underline decoration-[1.5px] underline-offset-4">
            DCLM Prayer Request Hub
          </a>
          .
        </p>
      )}
      <div className="mt-6">
        {/* A fresh form per choice, so a half-typed message never goes out under the other topic */}
        <ContactForm
          key={choice}
          phone={phone}
          email={email}
          topic={topic}
          ministry={choice === 'prayer' ? undefined : ministry}
          submitLabel={choice === 'prayer' ? 'Send prayer request' : 'Send message'}
        />
      </div>
    </div>
  )
}

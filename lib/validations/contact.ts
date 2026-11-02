import { z } from 'zod'
import { MINISTRIES, OUTREACH } from '@/lib/content/site'

/** What a form message is about; decides the email subject prefix */
export const CONTACT_TOPICS = ['contact', 'prayer', 'visit', 'ministry'] as const
export type ContactTopic = (typeof CONTACT_TOPICS)[number]

/** Ministry and outreach names a "Send us a message" link may preselect */
export const MINISTRY_NAMES = [...MINISTRIES, ...OUTREACH].map((ministry) => ministry.name)

// Letters and marks from any script (e.g. "Adébáyọ̀", "Ọlátúndé"), spaces, periods, apostrophes, hyphens
const NAME_PATTERN = /^[\p{L}\p{M}\s.'’-]+$/u

// A blank number field means "not given", not 0
const headcount = z.preprocess(
  (value) => (value === '' || value === null ? undefined : value),
  z.coerce.number().int('Enter a whole number').min(0, 'Enter 0 or more').max(50, 'Enter 50 or fewer').optional()
)

/** One schema for the browser and the API */
export const contactFormSchema = z
  .object({
    topic: z.enum(CONTACT_TOPICS).default('contact'),
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters')
      .regex(NAME_PATTERN, 'Name contains invalid characters'),
    email: z
      .string()
      .trim()
      .max(255, 'Email must be less than 255 characters')
      .pipe(z.email('Invalid email address')),
    phone: z
      .string()
      .trim()
      .max(20, 'Phone number must be less than 20 characters')
      .regex(/^[\d\s()+.-]*$/, 'Phone number contains invalid characters')
      .optional()
      .or(z.literal('')),
    // Required (10+ characters) except on the Plan Your Visit form; see superRefine below
    message: z.string().trim().max(2000, 'Message must be less than 2000 characters').default(''),
    ministry: z.enum(MINISTRY_NAMES as [string, ...string[]]).optional(),
    /** Planned visit date, YYYY-MM-DD (Plan Your Visit form) */
    visitDate: z.iso.date('Choose the date you plan to visit').optional(),
    /** Plan Your Visit: how many are coming */
    adults: headcount,
    children: headcount,
  })
  .superRefine((value, ctx) => {
    if (value.topic === 'ministry' && !value.ministry) {
      ctx.addIssue({ code: 'custom', path: ['ministry'], message: 'Choose a ministry' })
    }
    if (value.topic === 'visit' && !value.visitDate) {
      ctx.addIssue({ code: 'custom', path: ['visitDate'], message: 'Choose the date you plan to visit' })
    }
    if (value.topic !== 'visit' && value.message.length < 10) {
      ctx.addIssue({ code: 'custom', path: ['message'], message: 'Message must be at least 10 characters' })
    }
  })

export type ContactFormInput = z.input<typeof contactFormSchema>
export type ContactFormData = z.output<typeof contactFormSchema>

/** Email subject, so the pastor can sort messages (SITE-CONTENT.md §4 and §8) */
export function contactSubject(data: ContactFormData): string {
  const name = data.name.replace(/[\r\n]+/g, ' ')
  switch (data.topic) {
    case 'visit':
      return `New visitor: ${name}, ${data.visitDate}`
    case 'prayer':
      return `Prayer request: ${name}`
    case 'ministry':
      return `Ministry: ${data.ministry} – ${name}`
    case 'contact':
      return `Contact: ${name}`
  }
}

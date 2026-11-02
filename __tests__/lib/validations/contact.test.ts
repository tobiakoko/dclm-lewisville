import { contactFormSchema, contactSubject, MINISTRY_NAMES } from '@/lib/validations/contact'
import { MINISTRIES, OUTREACH } from '@/lib/content/site'

const base = { name: 'Test Visitor', email: 'visitor@example.com', message: 'Hello, I have a question.' }

describe('contactFormSchema', () => {
  it.each(['Adébáyọ̀', 'Ọlátúndé Adéwálé', 'Chiamaka Nwọsụ', "Mary-Jane O'Neil", 'J. R. Smith', 'Zoë Ångström'])(
    'accepts the name %s',
    (name) => {
      expect(contactFormSchema.safeParse({ ...base, name }).success).toBe(true)
    }
  )

  it.each(['A', 'R2D2', '<script>', 'name@example.com', 'x'.repeat(101)])('rejects the name %s', (name) => {
    expect(contactFormSchema.safeParse({ ...base, name }).success).toBe(false)
  })

  it('defaults the topic to contact and allows an empty phone', () => {
    const parsed = contactFormSchema.parse({ ...base, phone: '' })
    expect(parsed.topic).toBe('contact')
  })

  it('requires a ministry for ministry messages and only accepts known names', () => {
    expect(contactFormSchema.safeParse({ ...base, topic: 'ministry' }).success).toBe(false)
    expect(contactFormSchema.safeParse({ ...base, topic: 'ministry', ministry: 'Not A Ministry' }).success).toBe(false)
    expect(contactFormSchema.safeParse({ ...base, topic: 'ministry', ministry: 'Men’s Ministry' }).success).toBe(true)
  })

  it('requires a valid date for visit messages', () => {
    expect(contactFormSchema.safeParse({ ...base, topic: 'visit' }).success).toBe(false)
    expect(contactFormSchema.safeParse({ ...base, topic: 'visit', visitDate: '08/11/2026' }).success).toBe(false)
    expect(contactFormSchema.safeParse({ ...base, topic: 'visit', visitDate: '2026-11-08' }).success).toBe(true)
  })

  it('offers every ministry and outreach area', () => {
    expect(MINISTRY_NAMES).toEqual([...MINISTRIES, ...OUTREACH].map((m) => m.name))
  })
})

describe('contactSubject', () => {
  const parse = (extra: object) => contactFormSchema.parse({ ...base, ...extra })

  it('prefixes each topic so the pastor can sort messages', () => {
    expect(contactSubject(parse({}))).toBe('Contact: Test Visitor')
    expect(contactSubject(parse({ topic: 'prayer' }))).toBe('Prayer request: Test Visitor')
    expect(contactSubject(parse({ topic: 'visit', visitDate: '2026-11-08' }))).toBe('New visitor: Test Visitor, 2026-11-08')
    expect(contactSubject(parse({ topic: 'ministry', ministry: 'Evangelism' }))).toBe('Ministry: Evangelism – Test Visitor')
  })
})

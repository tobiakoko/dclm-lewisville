import { render, screen } from '@/__tests__/utils/test-utils'
import { MinistryRow, splitCrisisNotice } from '@/components/site/Ministry'
import { MINISTRIES, OUTREACH } from '@/lib/content/site'
import { plainText } from '@/lib/content/inline'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}))

describe('splitCrisisNotice', () => {
  const counseling = OUTREACH.find((area) => area.slug === 'counseling')!

  it('lifts the 911/988 sentence out word for word and keeps the rest', () => {
    const { body, crisis } = splitCrisisNotice(counseling.paragraphs)
    const original = counseling.paragraphs.map(plainText).join(' ')
    expect(crisis).toMatch(/^Counseling is not a crisis service: .*call 911, or call or text 988 .*Lifeline\.$/)
    expect(original).toContain(crisis!)
    expect(`${body.map(plainText).join(' ')} ${crisis}`).toBe(original)
  })

  it('leaves paragraphs without the notice untouched', () => {
    const evangelism = OUTREACH.find((area) => area.slug === 'evangelism')!
    expect(splitCrisisNotice(evangelism.paragraphs)).toEqual({ body: evangelism.paragraphs, crisis: null })
  })
})

describe('MinistryRow', () => {
  const women = MINISTRIES.find((m) => m.slug === 'women')!

  it('keeps the anchor id, the photo, the text and a way to get in touch', () => {
    render(<MinistryRow ministry={women} photo={{ src: '/x.jpg', alt: 'Women of the church' }} />)
    expect(screen.getByRole('article')).toHaveAttribute('id', 'women')
    expect(screen.getByRole('img', { name: 'Women of the church' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: women.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: `Send us a message about ${women.name}` })).toHaveAttribute(
      'href',
      `/contact?topic=${encodeURIComponent(women.name)}#contact-form`
    )
  })

  it('shows the navy panel line instead of a photo', () => {
    const youngAdults = MINISTRIES.find((m) => m.slug === 'young-adults')!
    render(<MinistryRow ministry={youngAdults} panelLine="On fire for the things of God — no matter the cost." />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('On fire for the things of God — no matter the cost.')).toBeInTheDocument()
  })
})

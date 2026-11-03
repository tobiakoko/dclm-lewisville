import { render, screen } from '@/__tests__/utils/test-utils'
import { Section } from '@/components/site/Section'
import { PageHero } from '@/components/site/PageHero'
import { EditorialRow } from '@/components/site/EditorialRow'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}))

describe('Section', () => {
  it('names the band by its H2, with the eyebrow, lead and action in the header', () => {
    render(
      <Section id="times" eyebrow="Weekly gatherings" title="When we meet" intro="All times are Central" action={<a href="/events">All events</a>}>
        <p>Body</p>
      </Section>
    )
    const region = screen.getByRole('region', { name: 'When we meet' })
    expect(region).toHaveAttribute('id', 'times')
    expect(screen.getByText('Weekly gatherings').tagName).toBe('P')
    expect(screen.getByText('All times are Central')).toHaveClass('type-lead')
    expect(screen.getByRole('link', { name: 'All events' })).toBeInTheDocument()
  })

  it.each([
    ['white', 'bg-white'],
    ['paper', 'bg-paper'],
    ['sky', 'bg-emblem-sky-50'],
    ['navy', 'on-dark'],
  ] as const)('applies the %s tone', (tone, className) => {
    render(
      <Section id="band" tone={tone} title="Band">
        x
      </Section>
    )
    expect(screen.getByRole('region', { name: 'Band' })).toHaveClass(className)
  })

  it('uses the shorter padding at size md', () => {
    render(
      <Section id="verse" size="md" title="Verse">
        x
      </Section>
    )
    expect(screen.getByRole('region', { name: 'Verse' })).toHaveClass('py-14', 'sm:py-20')
  })
})

describe('PageHero', () => {
  it('shows the eyebrow, the only H1, the lead and actions on a paper band', () => {
    render(
      <PageHero eyebrow="Plan your visit" title="We'd love to meet you" lead="Everything you need">
        <a href="#form">Let us know</a>
      </PageHero>
    )
    expect(screen.getByRole('banner')).toHaveClass('bg-paper')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByText('Plan your visit').tagName).toBe('P')
    expect(screen.getByText('Everything you need')).toHaveClass('type-lead')
    expect(screen.getByRole('link', { name: 'Let us know' })).toBeInTheDocument()
  })

  it('shows media in place of a photo', () => {
    render(<PageHero title="Give" media={<figure>Scripture</figure>} />)
    expect(screen.getByRole('figure')).toHaveTextContent('Scripture')
  })
})

describe('EditorialRow', () => {
  it('labels the row by its H2 and shows the number as decoration', () => {
    render(
      <EditorialRow id="times" number={1} title="Service times">
        <p>Content</p>
      </EditorialRow>
    )
    expect(screen.getByRole('region', { name: 'Service times' })).toHaveAttribute('id', 'times')
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true')
  })
})

import { render, screen } from '@/__tests__/utils/test-utils'
import { LegalParagraph, paragraphLabel } from '@/components/site/LegalLayout'
import { PRIVACY_POLICY } from '@/lib/content/site'
import { plainText } from '@/lib/content/inline'

describe('legal anchors', () => {
  it('finds the short opening labels of the privacy policy', () => {
    const labels = PRIVACY_POLICY.paragraphs.map(paragraphLabel).flatMap((anchor) => (anchor ? [anchor.label] : []))
    expect(labels).toEqual(['Information we collect', 'How we use it', 'Services we use', 'Cookies', 'Children', 'Your choices', 'Changes'])
  })

  it('ignores ordinary first sentences', () => {
    expect(paragraphLabel(['We never sell your information. Ever.'])).toBeNull()
    expect(paragraphLabel(['Deeper Life Bible Church Lewisville respects your privacy.'])).toBeNull()
  })

  it('renders the label in bold without changing a word', () => {
    const paragraph = PRIVACY_POLICY.paragraphs.find((p) => plainText(p).startsWith('Cookies.'))!
    const { container } = render(<LegalParagraph paragraph={paragraph} />)
    expect(container.firstElementChild).toHaveAttribute('id', 'cookies')
    expect(container.textContent).toBe(plainText(paragraph))
    expect(screen.getByText('Cookies.').tagName).toBe('STRONG')
  })
})

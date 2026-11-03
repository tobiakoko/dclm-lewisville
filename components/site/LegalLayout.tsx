import type { ReactNode } from 'react'
import { InlineText } from '@/components/content/RichText'
import { Container } from '@/components/site/Section'
import type { Paragraph } from '@/lib/content/inline'

export interface LegalAnchor {
  id: string
  label: string
}

function slug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * "Information we collect. We collect…" → its short opening label, which becomes the paragraph's
 * anchor. Labels are the drafts' own words (four words at most), so no text changes.
 */
export function paragraphLabel(paragraph: Paragraph): LegalAnchor | null {
  const [first] = paragraph
  if (typeof first !== 'string') return null
  const match = /^([A-Z][^.]*)\.(\s|$)/.exec(first)
  if (!match || match[1].split(/\s+/).length > 4) return null
  return { id: slug(match[1]), label: match[1] }
}

/** A legal paragraph with its opening label in bold and anchored */
export function LegalParagraph({ paragraph }: { paragraph: Paragraph }) {
  const label = paragraphLabel(paragraph)
  if (!label) {
    return (
      <p className="whitespace-pre-line">
        <InlineText paragraph={paragraph} />
      </p>
    )
  }
  const [first, ...rest] = paragraph as [string, ...Paragraph]
  return (
    <p id={label.id} className="scroll-mt-28 whitespace-pre-line">
      <strong className="text-navy-900">{label.label}.</strong>
      <InlineText paragraph={[first.slice(label.label.length + 1), ...rest]} />
    </p>
  )
}

/** Narrow container, a sticky "On this page" list on desktop and the text at reading width */
export function LegalLayout({ anchors, children }: { anchors: LegalAnchor[]; children: ReactNode }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container narrow className="grid gap-10 wide:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] wide:gap-12">
        {anchors.length > 0 && (
          <nav aria-label="On this page" className="self-start wide:sticky wide:top-28">
            <p className="type-eyebrow text-ink-muted">On this page</p>
            <ul className="mt-3 list-none">
              {anchors.map((anchor) => (
                <li key={anchor.id}>
                  <a href={`#${anchor.id}`} className="inline-flex min-h-11 items-center font-semibold text-emblem-sky-700 underline-offset-4 hover:underline">
                    {anchor.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="max-w-prose space-y-4 [&_a]:text-emblem-sky-700">{children}</div>
      </Container>
    </section>
  )
}

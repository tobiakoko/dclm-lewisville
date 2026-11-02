import type { Paragraph } from '@/lib/content/inline'

/** One paragraph of approved copy, keeping its emphasis and line breaks */
export function InlineText({ paragraph }: { paragraph: Paragraph }) {
  return (
    <>
      {paragraph.map((segment, index) => {
        if (typeof segment === 'string') return <span key={index}>{segment}</span>
        if ('em' in segment) return <em key={index}>{segment.em}</em>
        return <strong key={index}>{segment.strong}</strong>
      })}
    </>
  )
}

export function Paragraphs({
  paragraphs,
  className,
}: {
  paragraphs: Paragraph[]
  className?: string
}) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`whitespace-pre-line ${className ?? ''}`}>
          <InlineText paragraph={paragraph} />
        </p>
      ))}
    </>
  )
}

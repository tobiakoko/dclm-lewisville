import { Container } from '@/components/site/Section'

/**
 * A row of pill links to the sections of a long page. On phones the row scrolls sideways inside
 * its own box, the only horizontal scroll allowed (DESIGN-SYSTEM.md accessibility checklist).
 */
export function InPageNav({ links, label = 'On this page' }: { links: { href: string; label: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="border-b border-line bg-white">
      <Container>
        <ul className="-mx-1 flex list-none gap-1.5 overflow-x-auto px-1 py-3">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-4 text-[0.9375rem] font-bold text-navy-900 no-underline hover:bg-emblem-sky-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

import type { ReactNode } from 'react'

/**
 * The not-found and error pages' body (REDESIGN.md §4): a paper band with a centered white card,
 * an icon tile, the H1, the help text and the actions.
 */
export function StatusCard({ icon, title, children, actions }: { icon: ReactNode; title: string; children: ReactNode; actions: ReactNode }) {
  return (
    <div className="bg-paper px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-[640px] rounded-panel bg-white p-8 text-center shadow-md sm:p-12">
        <span aria-hidden="true" className="mx-auto inline-flex size-[52px] items-center justify-center rounded-tile bg-emblem-sky-50 text-navy-900 [&_svg]:size-6">
          {icon}
        </span>
        <h1 className="mt-6">{title}</h1>
        <div className="mt-5 space-y-3">{children}</div>
        <div className="mt-8 flex flex-col items-center gap-4">{actions}</div>
      </div>
    </div>
  )
}

/** Emblem and name on white, for error pages that render without the site layout */
export function BrandBar({ name }: { name: string }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] max-w-content items-center gap-3 px-5 sm:px-6 wide:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image may be what failed */}
        <img src="/dclm_logo.png" alt="" width={46} height={46} className="size-[46px] rounded-full bg-white object-contain" />
        <span className="font-serif text-[1.1875rem] font-semibold text-navy-900">{name}</span>
      </div>
    </div>
  )
}

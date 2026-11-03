'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * A pill track of options (DESIGN-SYSTEM.md, SegmentedControl). Built from real radio inputs in a
 * fieldset, so arrow keys move the selection and screen readers announce a radio group.
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  /** The group's name for assistive tech */
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  const name = useId()
  return (
    <fieldset className={className}>
      <legend className="sr-only">{label}</legend>
      <div className="inline-flex max-w-full flex-wrap gap-1 rounded-pill bg-emblem-sky-50 p-1">
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span
              className={cn(
                'inline-flex min-h-11 items-center rounded-pill px-5 text-[0.9375rem] font-bold leading-none text-navy-900 transition-colors duration-150',
                'peer-checked:bg-white peer-checked:shadow-sm peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emblem-sky-700'
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

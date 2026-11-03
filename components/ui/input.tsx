import * as React from "react"

import { cn } from "@/lib/utils"

/** 17px text, 1.5px border-input borders (WCAG 1.4.11), invalid state in heaven-700 */
export const fieldClasses =
  "w-full min-w-0 rounded-field border-[1.5px] border-border-input bg-white px-4 text-[1.0625rem] leading-snug text-ink placeholder:text-ink-muted hover:border-navy-700 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-2 aria-invalid:border-heaven-700"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClasses, "h-[52px]", className)} {...props} />
}

export { Input }

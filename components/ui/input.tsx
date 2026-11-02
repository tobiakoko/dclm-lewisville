import * as React from "react"

import { cn } from "@/lib/utils"

/** 16px+ text, border-input borders (WCAG 1.4.11), invalid state in heaven-700 */
export const fieldClasses =
  "w-full min-w-0 rounded-lg border border-border-input bg-white px-3 py-2.5 text-base text-ink placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-heaven-700 aria-invalid:border-2"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClasses, "min-h-12", className)} {...props} />
}

export { Input }

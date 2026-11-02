import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The only button styles on the site (DESIGN-SYSTEM.md, Components):
 * - primary: heaven-600 with white text; one per screen (Plan your visit, Give)
 * - secondary: navy outline
 * - onDark: white with navy text, for navy sections (red never sits on navy)
 * - link: text link
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-base leading-tight no-underline transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-heaven-600 text-white hover:bg-heaven-700 active:bg-heaven-700",
        secondary: "border-2 border-navy-700 text-navy-700 bg-transparent hover:bg-navy-900 hover:text-white hover:border-navy-900",
        onDark: "bg-white text-navy-900 hover:bg-emblem-sky-50",
        link: "rounded-none px-0 text-emblem-sky-700 underline underline-offset-4 hover:text-navy-900",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-11 px-5 py-2.5",
      },
    },
    compoundVariants: [{ variant: "link", className: "min-h-11 px-0 py-0" }],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }

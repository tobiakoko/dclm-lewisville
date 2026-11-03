import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The only button styles on the site (DESIGN-SYSTEM.md, Components), all pill-shaped:
 * - primary: heaven-600 with white text; one per view (Plan your visit, Give)
 * - secondary: white with navy text and a line-strong border
 * - ghost: on navy or photo scrims, translucent white with a white border
 * - light: white with navy text, for navy bands
 * - link: text link
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill border-[1.5px] border-transparent font-bold leading-none no-underline transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-heaven-600 text-white shadow-primary hover:bg-heaven-700 active:bg-heaven-700",
        secondary: "border-line-strong bg-white text-navy-900 hover:border-navy-900",
        ghost: "border-white/50 bg-white/6 text-white hover:border-white hover:bg-white/14",
        light: "bg-white text-navy-900 hover:bg-emblem-sky-50",
        link: "rounded-none border-0 text-emblem-sky-700 underline decoration-[1.5px] underline-offset-4 hover:text-navy-900",
      },
      size: {
        default: "min-h-[52px] px-[26px] text-base",
        sm: "min-h-11 px-5 text-[0.9375rem]",
      },
    },
    compoundVariants: [{ variant: "link", className: "min-h-11 px-0" }],
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

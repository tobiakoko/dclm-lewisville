import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardExtendedVariants = cva(
  "rounded-lg bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border shadow-sm",
        elevated: "shadow-medium border-0",
        outline: "border-2",
        ghost: "border-0 shadow-none",
      },
      hover: {
        none: "",
        lift: "hover:shadow-strong hover:-translate-y-2 cursor-pointer",
        subtle: "hover:shadow-medium hover:-translate-y-1 cursor-pointer",
        glow: "hover:shadow-primary-500/25 hover:shadow-lg cursor-pointer",
      },
      padding: {
        none: "p-0",
        small: "p-4",
        default: "p-6",
        large: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "none",
      padding: "default",
    },
  }
)

function CardExtended({
  className,
  variant,
  hover,
  padding,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardExtendedVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardExtendedVariants({ variant, hover, padding }),
        className
      )}
      {...props}
    />
  )
}

function CardExtendedHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardExtendedTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardExtendedDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardExtendedAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardExtendedContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardExtendedFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  CardExtended,
  CardExtendedHeader,
  CardExtendedFooter,
  CardExtendedTitle,
  CardExtendedAction,
  CardExtendedDescription,
  CardExtendedContent,
}

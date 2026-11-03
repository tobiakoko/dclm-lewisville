import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldClasses } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldClasses, "min-h-[132px] resize-y py-3.5", className)} {...props} />
}

export { Textarea }

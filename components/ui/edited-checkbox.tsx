"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"

type Props = {
    size: string;
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

const EdittedCheckbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, Props>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:text-black data-[state=checked]:border-black data-[state=checked]:border-2",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
     {size}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
EdittedCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { EdittedCheckbox }

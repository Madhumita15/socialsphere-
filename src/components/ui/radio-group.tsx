"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ 
  className, 
  itemValue, 
  selectedValue, 
  // We take 'value' out of props but we must satisfy the type requirement
  value: _unused, 
  ...props 
}: RadioPrimitive.Root.Props & { itemValue: string; selectedValue: string }) {
  
  const isChecked = itemValue === selectedValue;

  return (
    <RadioPrimitive.Root
      // Pass 'itemValue' to the 'value' prop required by Base UI
      value={itemValue} 
      className={cn(
        "group/radio-group-item relative flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all outline-none",
        isChecked ? "border-orange-500" : "border-zinc-600",
        "focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The Indicator/Dot logic */}
      <div 
        className={cn(
          "size-2.5 rounded-full bg-orange-500 transition-all duration-200",
          isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} 
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }

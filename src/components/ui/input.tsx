import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-base font-medium text-slate-900 shadow-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-900 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-teal-700 focus-visible:border-2 focus-visible:px-[11px] focus-visible:py-[9px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 aria-invalid:border-red-700 aria-invalid:text-red-700 dark:border-navy-600 dark:bg-navy-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-navy-500 dark:focus-visible:border-teal-700 dark:aria-invalid:border-[#EF4444]",
        className
      )}
      {...props}
    />
  )
}

export { Input }

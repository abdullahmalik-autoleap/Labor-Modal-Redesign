import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-1 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-teal-700 text-white",
        "default-subtle": "bg-teal-50 text-teal-700 border-teal-100",
        secondary: "bg-slate-100 text-slate-700",
        destructive: "bg-red-700 text-white",
        "destructive-subtle": "bg-red-50 text-red-700 border-red-100",
        warning: "bg-amber-600 text-white",
        "warning-subtle": "bg-amber-50 text-amber-700 border-amber-100",
        success: "bg-green-700 text-white",
        "success-subtle": "bg-green-50 text-green-700 border-green-100",
        info: "bg-blue-700 text-white",
        "info-subtle": "bg-blue-50 text-blue-700 border-blue-100",
        gold: "bg-gold-500 text-navy-900",
        outline: "border-slate-200 text-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }

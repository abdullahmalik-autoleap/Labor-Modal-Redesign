"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-120 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: [
          "border-0 text-white",
          "bg-[linear-gradient(to_bottom,#12877e,#0b635c)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(14,113,105,0.35),0_2px_6px_-1px_rgba(14,113,105,0.2)]",
          "[text-shadow:0_1px_1px_rgba(0,0,0,0.15)]",
          "hover:bg-[linear-gradient(to_bottom,#14998e,#0d7069)] hover:-translate-y-[0.5px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_2px_4px_0_rgba(14,113,105,0.4),0_4px_8px_-1px_rgba(14,113,105,0.25)]",
          "active:bg-[linear-gradient(to_bottom,#0b635c,#094d47)] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        "primary-dim": [
          "border border-teal-100 bg-teal-50 text-teal-700",
          "hover:bg-teal-100",
          "active:bg-teal-200",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        "primary-outline": [
          "border border-teal-700 bg-transparent text-teal-700",
          "hover:bg-teal-50",
          "active:bg-teal-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        "primary-ghost": [
          "border-0 bg-transparent text-teal-700",
          "hover:bg-teal-50",
          "active:bg-teal-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        "secondary-dark": [
          "border-0 text-white",
          "bg-[linear-gradient(to_bottom,#334155,#1e293b)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(30,41,59,0.35),0_2px_6px_-1px_rgba(30,41,59,0.2)]",
          "[text-shadow:0_1px_1px_rgba(0,0,0,0.15)]",
          "hover:bg-[linear-gradient(to_bottom,#475569,#334155)] hover:-translate-y-[0.5px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_2px_4px_0_rgba(30,41,59,0.4),0_4px_8px_-1px_rgba(30,41,59,0.25)]",
          "active:bg-[linear-gradient(to_bottom,#1e293b,#0f172a)] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        "secondary-dim": [
          "border border-slate-200 bg-slate-100 text-slate-700",
          "hover:bg-slate-200",
          "active:bg-slate-300",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        outline: [
          "border border-slate-300 bg-transparent text-slate-700",
          "hover:bg-slate-50",
          "active:bg-slate-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        ghost: [
          "border-0 bg-transparent text-slate-600",
          "hover:bg-slate-100 hover:text-slate-700",
          "active:bg-slate-200",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        surface: [
          "border border-slate-200 bg-white text-slate-700 shadow-xs",
          "hover:bg-slate-50",
          "active:bg-slate-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]",
        ].join(" "),

        destructive: [
          "border-0 text-white",
          "bg-[linear-gradient(to_bottom,#ef4444,#c52020)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(185,28,28,0.35),0_2px_6px_-1px_rgba(185,28,28,0.2)]",
          "[text-shadow:0_1px_1px_rgba(0,0,0,0.15)]",
          "hover:bg-[linear-gradient(to_bottom,#f87171,#ef4444)] hover:-translate-y-[0.5px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_2px_4px_0_rgba(185,28,28,0.4),0_4px_8px_-1px_rgba(185,28,28,0.25)]",
          "active:bg-[linear-gradient(to_bottom,#c52020,#991b1b)] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#B91C1C]",
        ].join(" "),

        "destructive-dim": [
          "border border-red-100 bg-red-50 text-red-700",
          "hover:bg-red-100",
          "active:bg-red-200",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#B91C1C]",
        ].join(" "),

        "destructive-outline": [
          "border border-red-200 bg-transparent text-red-600",
          "hover:bg-red-50",
          "active:bg-red-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#B91C1C]",
        ].join(" "),

        "destructive-ghost": [
          "border-0 bg-transparent text-red-600",
          "hover:bg-red-50",
          "active:bg-red-100",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#B91C1C]",
        ].join(" "),

        warning: [
          "border-0 text-white",
          "bg-[linear-gradient(to_bottom,#f59e0b,#c27c06)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(217,119,6,0.35),0_2px_6px_-1px_rgba(217,119,6,0.2)]",
          "[text-shadow:0_1px_1px_rgba(0,0,0,0.15)]",
          "hover:bg-[linear-gradient(to_bottom,#fbbf24,#f59e0b)] hover:-translate-y-[0.5px]",
          "active:bg-[linear-gradient(to_bottom,#c27c06,#92400e)] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#D97706]",
        ].join(" "),

        "warning-dim": [
          "border border-amber-100 bg-amber-50 text-amber-700",
          "hover:bg-amber-100",
          "active:bg-amber-200",
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#D97706]",
        ].join(" "),

        link: "text-teal-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-8 gap-1 px-3",
        lg: "h-10 px-4",
        xl: "h-11 px-5",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

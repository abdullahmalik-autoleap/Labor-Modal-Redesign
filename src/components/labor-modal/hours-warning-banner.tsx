"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoursWarningBannerProps {
  visible: boolean;
  billableHours: number;
  estimatedHours: number;
  onDismiss: () => void;
  onAdjust: () => void;
}

function HoursWarningBanner({
  visible,
  billableHours,
  estimatedHours,
  onDismiss,
  onAdjust,
}: HoursWarningBannerProps) {
  const difference = estimatedHours - billableHours;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-lg border border-amber-400 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="mt-0.5 size-[18px] shrink-0 text-amber-600"
              strokeWidth={1.5}
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight text-amber-900 dark:text-amber-100">
                Estimated hours now exceed billable hours
              </p>

              <p className="mt-1 text-xs leading-relaxed text-amber-700 dark:text-amber-200">
                The ratio-based recalculation adjusted estimated hours above the
                billable amount. This can be valid (e.g. courtesy inspections)
                but may affect cost reporting.
              </p>

              <div className="mt-2 inline-flex items-center gap-3 rounded-lg border border-amber-400/20 bg-white/60 px-3 py-1.5 dark:border-amber-400/10 dark:bg-black/20">
                <ValueGroup
                  value={billableHours.toFixed(1)}
                  label="Billable hrs"
                />

                <ArrowRight
                  className="size-3.5 shrink-0 text-amber-600"
                  strokeWidth={1.5}
                />

                <ValueGroup
                  value={estimatedHours.toFixed(1)}
                  label="Estimated hrs"
                />

                <span className="mx-0.5 h-5 w-px bg-amber-400/30" />

                <ValueGroup
                  value={`+${difference.toFixed(1)}`}
                  label="Difference"
                  highlight
                />
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={onDismiss}
                  className="rounded-lg border border-amber-900/25 px-3 py-1 text-xs text-amber-700 transition-colors hover:bg-amber-400/10 dark:border-amber-400/30 dark:text-amber-600 dark:hover:bg-amber-400/10"
                >
                  Dismiss
                </button>
                <button
                  onClick={onAdjust}
                  className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-700 dark:text-amber-50 dark:hover:bg-amber-600"
                >
                  Adjust estimated hours
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ValueGroup({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(
          "font-mono text-sm font-medium leading-none",
          highlight
            ? "text-amber-600 dark:text-amber-100"
            : "text-amber-900 dark:text-amber-100"
        )}
      >
        {value}
      </span>
      <span className="mt-0.5 text-xs leading-none text-amber-700 dark:text-amber-200">
        {label}
      </span>
    </div>
  );
}

export { HoursWarningBanner };
export type { HoursWarningBannerProps };

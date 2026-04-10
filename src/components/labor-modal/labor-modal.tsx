"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  Clock,
  X,
  ChevronRight,
  ChevronDown,
  Settings,
  DollarSign,
  FileText,
  Activity,
  Tag,
  Briefcase,
  Calculator,
  PlusCircle,
  RotateCcw,
  Receipt,
  Eye,
  Percent,
  Power,
  FileSpreadsheet,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { HoursWarningBanner } from "./hours-warning-banner";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

/* ─── Nav config ──────────────────────────────────────── */

const NAV_ITEMS = [
  { id: "general", label: "General", icon: Settings },
  { id: "classification", label: "Classification", icon: Tag },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "cost", label: "Cost", icon: Briefcase },
  { id: "notes", label: "Notes", icon: FileText },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];
type NavId = SectionId | "activity";

const SECTION_IDS = NAV_ITEMS.map((i) => `section-${i.id}`) as unknown as string[];

/* ─── Types ───────────────────────────────────────────── */

interface LaborModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  laborName?: string;
  status?: string;
}

/* ─── Root ────────────────────────────────────────────── */

function LaborModal({
  open,
  onOpenChange,
  laborName = "Oil Change Labor",
  status = "Active",
}: LaborModalProps) {
  const [showActivity, setShowActivity] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { activeId, scrollTo } = useScrollSpy({
    sectionIds: SECTION_IDS,
    root: scrollContainerRef,
  });

  const activeNav: NavId = showActivity
    ? "activity"
    : (activeId.replace("section-", "") as SectionId);

  function handleNavChange(id: NavId) {
    if (id === "activity") {
      setShowActivity(true);
    } else {
      setShowActivity(false);
      setTimeout(() => scrollTo(`section-${id}`), 0);
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 dark:bg-black/70" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 w-full max-w-[820px] -translate-x-1/2 -translate-y-1/2 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98] data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.98]">
          <div
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-navy-600 dark:bg-navy-800"
            style={{ height: "min(85vh, 680px)" }}
          >
            <LaborModalHeader
              laborName={laborName}
              status={status}
              onClose={() => onOpenChange(false)}
            />

            <div className="flex flex-1 overflow-hidden">
              <LaborModalSidebar
                activeNav={activeNav}
                onNavChange={handleNavChange}
              />

              {showActivity ? (
                <div className="flex-1 overflow-y-auto bg-slate-50 px-7 py-6">
                  <ActivitySection />
                </div>
              ) : (
                <LaborModalContent scrollContainerRef={scrollContainerRef} />
              )}
            </div>

            <LaborModalFooter onClose={() => onOpenChange(false)} />
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* ─── Header ──────────────────────────────────────────── */

function LaborModalHeader({
  laborName,
  status,
  onClose,
}: {
  laborName: string;
  status: string;
  onClose: () => void;
}) {
  return (
    <div className="relative z-10 flex h-[52px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-teal-50">
          <Clock className="size-4 text-teal-700" strokeWidth={1.5} />
        </div>
        <span className="text-base font-semibold text-slate-900">
          {laborName}
        </span>
        <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
          {status}
        </span>
      </div>
      <button
        onClick={onClose}
        className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:shadow-[0_0_0_2px_white,0_0_0_4px_#0E7169]"
        title="Close"
      >
        <X className="size-4" strokeWidth={1.5} />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

/* ─── Sidebar ─────────────────────────────────────────── */

function LaborModalSidebar({
  activeNav,
  onNavChange,
}: {
  activeNav: NavId;
  onNavChange: (id: NavId) => void;
}) {
  return (
    <nav className="flex w-[200px] shrink-0 flex-col border-r border-slate-200 bg-white py-4">
      <div className="flex flex-col gap-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={cn(
                "relative flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors text-left",
                isActive
                  ? "bg-teal-50 font-medium text-teal-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              {isActive && (
                <span className="absolute right-0 top-0 bottom-0 w-0.5 rounded-l bg-teal-700" />
              )}
              <span className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                {item.label}
              </span>
              {isActive && (
                <ChevronRight
                  className="size-3 shrink-0 text-slate-400"
                  strokeWidth={1.5}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-3 my-2 border-t border-slate-200" />

      <div className="px-3">
        <button
          onClick={() => onNavChange("activity")}
          className={cn(
            "relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors text-left",
            activeNav === "activity"
              ? "bg-teal-50 font-medium text-teal-700"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          )}
        >
          {activeNav === "activity" && (
            <span className="absolute right-0 top-0 bottom-0 w-0.5 rounded-l bg-teal-700" />
          )}
          <span className="flex items-center gap-2.5">
            <Activity className="size-4 shrink-0" strokeWidth={1.5} />
            Activity logs
          </span>
          <ChevronRight
            className="size-3 shrink-0 text-slate-400"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </nav>
  );
}

/* ─── Scrollable content area ─────────────────────────── */

function LaborModalContent({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [billableHours, setBillableHours] = React.useState(40);
  const [laborRate, setLaborRate] = React.useState(80);
  const [estimatedHours, setEstimatedHours] = React.useState(40);
  const [costRate, setCostRate] = React.useState(10);
  const [isRatioTriggered, setIsRatioTriggered] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [isPulsing, setIsPulsing] = React.useState(false);

  const estimatedRef = React.useRef<HTMLInputElement>(null);
  const prevBillableRef = React.useRef(billableHours);

  const showWarning =
    isRatioTriggered && estimatedHours > billableHours && !isDismissed;

  const totalPrice = billableHours * laborRate;
  const totalCost = estimatedHours * costRate;
  const subtotal = totalPrice;
  const tax = subtotal * 0.075;
  const grandTotal = subtotal + tax;

  function handleBillableChange(val: string) {
    const v = parseFloat(val);
    if (isNaN(v) || v < 0) return;
    const oldBillable = prevBillableRef.current;
    setBillableHours(v);
    prevBillableRef.current = v;
    if (oldBillable > 0) {
      const ratio = estimatedHours / oldBillable;
      const newEstimated = +(v * ratio).toFixed(1);
      setEstimatedHours(newEstimated);
      if (newEstimated > v) {
        setIsRatioTriggered(true);
        setIsDismissed(false);
      }
    }
  }

  function handleEstimatedManualChange(val: string) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setEstimatedHours(num);
      setIsRatioTriggered(false);
      setIsDismissed(false);
    }
  }

  function handleDismiss() {
    setIsDismissed(true);
  }

  function handleAdjust() {
    estimatedRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setTimeout(() => {
      estimatedRef.current?.focus();
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500);
    }, 300);
  }

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-slate-50 p-6"
    >
      <div className="flex flex-col gap-6">
        <SectionCard id="section-general">
          <GeneralSection />
        </SectionCard>

        <SectionCard id="section-classification">
          <ClassificationSection />
        </SectionCard>

        <SectionCard id="section-pricing">
          <PricingSection
            billableHours={billableHours}
            laborRate={laborRate}
            totalPrice={totalPrice}
            onBillableChange={handleBillableChange}
          />
        </SectionCard>

        <HoursWarningBanner
          visible={showWarning}
          billableHours={billableHours}
          estimatedHours={estimatedHours}
          onDismiss={handleDismiss}
          onAdjust={handleAdjust}
        />

        <SectionCard id="section-cost">
          <CostSection
            estimatedHours={estimatedHours}
            costRate={costRate}
            totalCost={totalCost}
            showWarning={showWarning}
            isPulsing={isPulsing}
            estimatedRef={estimatedRef}
            onEstimatedChange={handleEstimatedManualChange}
            onCostRateChange={(val) => {
              const v = parseFloat(val);
              if (!isNaN(v)) setCostRate(v);
            }}
          />
          <div className="mt-6 border-t border-slate-200 pt-6">
            <CostSummary subtotal={subtotal} tax={tax} total={grandTotal} />
          </div>
        </SectionCard>

        <SectionCard id="section-notes">
          <NotesSection />
        </SectionCard>
      </div>
    </div>
  );
}

/* ─── Section card wrapper ────────────────────────────── */

function SectionCard({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-lg border border-slate-200 bg-white px-6 py-5"
      style={{ scrollMarginTop: 16 }}
    >
      {children}
    </section>
  );
}

/* ─── Shared field components ─────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-900">{children}</h3>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-start gap-4">
      <span className="pt-2 text-sm font-semibold text-slate-900">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function FieldInput({
  value,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]",
        className
      )}
      defaultValue={value}
      {...props}
    />
  );
}

/* ─── Compact grid field (Pricing / Cost) ─────────────── */

interface GridFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  helperText?: string;
  readOnly?: boolean;
  trailing?: React.ReactNode;
}

function GridField({
  label,
  icon,
  children,
  helperText,
  readOnly = false,
  trailing,
}: GridFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border px-2.5 py-2",
        readOnly
          ? "border-transparent bg-slate-100"
          : "border-slate-200 bg-white"
      )}
    >
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <div className="flex items-center gap-1.5">
        {icon}
        <div className="flex-1 min-w-0">{children}</div>
        {trailing}
      </div>
      {helperText && (
        <span className="text-xs text-slate-400">{helperText}</span>
      )}
    </div>
  );
}

/* ─── General section ─────────────────────────────────── */

const TOGGLES = [
  { id: "taxable", label: "Taxable", icon: Receipt, defaultChecked: true },
  { id: "display-desc", label: "Display desc. on estimate & invoice", icon: Eye, defaultChecked: true },
  { id: "commissionable", label: "Commissionable", icon: Percent, defaultChecked: false },
  { id: "active", label: "Active", icon: Power, defaultChecked: true },
  { id: "display-hrs", label: "Display hrs. & price on estimate & invoice", icon: FileSpreadsheet, defaultChecked: true },
] as const;

function GeneralSection() {
  return (
    <div className="space-y-6">
      <div>
        <SectionHeading>General</SectionHeading>
        <div className="mt-4 space-y-4">
          <FieldRow label="Labor name">
            <FieldInput value="Oil Change Labor" />
          </FieldRow>
          <FieldRow label="Sales code">
            <FieldInput value="LBR-001" />
          </FieldRow>
          <FieldRow label="Status">
            <span className="inline-flex h-9 items-center rounded-full bg-teal-50 px-3 text-xs font-medium text-teal-700">
              Active
            </span>
          </FieldRow>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <SectionHeading>Settings</SectionHeading>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 xl:grid-cols-3">
          {TOGGLES.map((t) => {
            const Icon = t.icon;
            return (
              <label
                key={t.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon
                  className="size-3.5 shrink-0 text-slate-400"
                  strokeWidth={1.5}
                />
                <Switch defaultChecked={t.defaultChecked} size="sm" />
                <span className="text-xs text-slate-700">{t.label}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <span className="mb-2 block text-xs font-medium text-slate-500">
              Labor description
            </span>
            <textarea
              className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
              defaultValue="Standard oil change procedure including oil filter replacement and fluid top-off."
            />
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium text-slate-500">
              Internal notes
            </span>
            <textarea
              className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
              placeholder="Add internal notes..."
            />
          </div>
        </div>

        <div className="mt-5">
          <span className="mb-2 block text-sm font-semibold text-slate-900">
            Fee
          </span>
          <div className="flex items-center gap-2">
            <div className="relative max-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
              <input
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm font-medium text-slate-900 shadow-xs outline-none placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:pl-[31px] focus:pr-[11px]"
                placeholder="Search fee..."
              />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            * Total fee will be equal to <span className="font-mono">$0.00</span> per unit
          </p>
          <button className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800">
            <PlusCircle className="size-3.5" strokeWidth={1.5} />
            Add another fee
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Classification section ──────────────────────────── */

function ClassificationSection() {
  return (
    <div>
      <SectionHeading>Classification</SectionHeading>
      <div className="mt-4 space-y-4">
        <FieldRow label="Search category">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
            <input
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm font-medium text-slate-900 shadow-xs outline-none placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:pl-[31px] focus:pr-[11px]"
              placeholder="Search category..."
            />
          </div>
        </FieldRow>
        <FieldRow label="Standard Category">
          <DropdownField value="Maintenance" />
        </FieldRow>
        <FieldRow label="Standard Subcategory">
          <DropdownField value="Oil Service" />
        </FieldRow>
        <FieldRow label="Standard Labor Type">
          <DropdownField value="Scheduled" />
        </FieldRow>
      </div>
    </div>
  );
}

function DropdownField({ value }: { value: string }) {
  return (
    <button className="flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]">
      {value}
      <ChevronDown className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
    </button>
  );
}

/* ─── Pricing section (3-col grid) ────────────────────── */

function PricingSection({
  billableHours,
  laborRate,
  totalPrice,
  onBillableChange,
}: {
  billableHours: number;
  laborRate: number;
  totalPrice: number;
  onBillableChange: (val: string) => void;
}) {
  return (
    <div>
      <SectionHeading>Rate Configuration</SectionHeading>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <GridField
          label="Billable hours"
          icon={<Clock className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />}
          helperText="Manually entered"
          trailing={
            <button className="text-slate-400 hover:text-slate-600 transition-colors" title="Reset">
              <RotateCcw className="size-3" strokeWidth={1.5} />
            </button>
          }
        >
          <input
            type="number"
            step="0.5"
            defaultValue={billableHours}
            onChange={(e) => onBillableChange(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </GridField>

        <GridField
          label="Labor rate"
          icon={<DollarSign className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />}
          trailing={
            <ChevronDown className="size-3 shrink-0 text-slate-400" strokeWidth={1.5} />
          }
        >
          <span className="text-sm text-slate-900">
            Labor - {laborRate} –{" "}
            <span className="font-mono">${laborRate.toFixed(2)}</span>
          </span>
        </GridField>

        <GridField
          label="Total price"
          icon={<Tag className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />}
          readOnly
        >
          <span className="font-mono text-sm font-medium text-slate-900">
            ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </GridField>
      </div>
    </div>
  );
}

/* ─── Cost section (3-col grid) ───────────────────────── */

function CostSection({
  estimatedHours,
  costRate,
  totalCost,
  showWarning,
  isPulsing,
  estimatedRef,
  onEstimatedChange,
  onCostRateChange,
}: {
  estimatedHours: number;
  costRate: number;
  totalCost: number;
  showWarning: boolean;
  isPulsing: boolean;
  estimatedRef: React.RefObject<HTMLInputElement | null>;
  onEstimatedChange: (val: string) => void;
  onCostRateChange: (val: string) => void;
}) {
  return (
    <div>
      <SectionHeading>Cost</SectionHeading>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div
          className={cn(
            "flex flex-col gap-1 rounded-lg border px-2.5 py-2",
            showWarning
              ? "border-amber-400 bg-white"
              : "border-slate-200 bg-white"
          )}
        >
          <span className="text-xs font-medium text-slate-500">
            Estimated hours
          </span>
          <div className="flex items-center gap-1.5">
            <Clock
              className={cn(
                "size-3.5 shrink-0",
                showWarning ? "text-amber-600" : "text-slate-400"
              )}
              strokeWidth={1.5}
            />
            <input
              ref={estimatedRef}
              type="number"
              step="0.5"
              defaultValue={estimatedHours}
              key={estimatedHours}
              onChange={(e) => onEstimatedChange(e.target.value)}
              className={cn(
                "w-full bg-transparent font-mono text-sm outline-none placeholder:text-slate-400",
                showWarning ? "text-amber-600" : "text-slate-900",
                isPulsing && "animate-[pulse-amber_0.5s_ease-in-out_3]"
              )}
            />
          </div>
          {showWarning && (
            <span className="text-xs text-amber-600">Adjusted by ratio</span>
          )}
        </div>

        <GridField
          label="Rate"
          icon={<DollarSign className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />}
        >
          <input
            type="number"
            step="0.01"
            defaultValue={costRate.toFixed(2)}
            onChange={(e) => onCostRateChange(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </GridField>

        <GridField
          label="Total cost"
          icon={<Calculator className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />}
          readOnly
        >
          <span className="font-mono text-sm font-medium text-slate-900">
            ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </GridField>
      </div>
    </div>
  );
}

/* ─── Cost Summary ────────────────────────────────────── */

function CostSummary({
  subtotal,
  tax,
  total,
}: {
  subtotal: number;
  tax: number;
  total: number;
}) {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="ml-auto max-w-[280px] rounded-lg bg-slate-100 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Subtotal</span>
          <span className="font-mono text-sm text-slate-900">
            ${fmt(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Tax</span>
          <span className="font-mono text-sm text-slate-900">
            ${fmt(tax)}
          </span>
        </div>
        <div className="border-t border-slate-200 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Total</span>
            <span className="font-mono text-sm font-semibold text-teal-700">
              ${fmt(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Notes section ───────────────────────────────────── */

function NotesSection() {
  return (
    <div>
      <SectionHeading>Notes</SectionHeading>
      <div className="mt-4 space-y-4">
        <div>
          <span className="mb-2 block text-xs font-medium text-slate-500">
            Labor description
          </span>
          <textarea
            className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
            defaultValue="Standard oil change procedure including oil filter replacement and fluid top-off."
          />
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-slate-500">
            Internal notes
          </span>
          <textarea
            className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-xs outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
            placeholder="Add internal notes..."
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Activity logs ───────────────────────────────────── */

const ACTIVITY_ITEMS = [
  {
    id: 1,
    user: "Sarah K.",
    action: "updated labor rate",
    detail: "$75.00 → $85.00",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Mike R.",
    action: "changed category",
    detail: "General → Maintenance",
    time: "Yesterday, 4:30 PM",
  },
  {
    id: 3,
    user: "Sarah K.",
    action: "created labor item",
    detail: "",
    time: "Mar 28, 2025",
  },
] as const;

function ActivitySection() {
  return (
    <div>
      <SectionHeading>Activity Logs</SectionHeading>
      <div className="mt-4 space-y-0">
        {ACTIVITY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-3 py-3",
              idx !== ACTIVITY_ITEMS.length - 1 && "border-b border-slate-100"
            )}
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
              {item.user.charAt(0)}
            </div>
            <div className="flex-1 text-sm">
              <p className="text-slate-900">
                <span className="font-medium">{item.user}</span>{" "}
                {item.action}
                {item.detail && (
                  <span className="ml-1 font-mono text-slate-500">({item.detail})</span>
                )}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Footer ──────────────────────────────────────────── */

function LaborModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative z-10 flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-3.5 shadow-[0_-1px_3px_0_rgba(0,0,0,0.04)]">
      <Button
        variant="secondary-dim"
        size="default"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        variant="default"
        size="default"
      >
        Save Changes
      </Button>
    </div>
  );
}

export { LaborModal };
export type { LaborModalProps };

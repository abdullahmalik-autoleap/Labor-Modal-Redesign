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
  Search,
  CircleCheck,
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
  { id: "pricing", label: "Pricing & cost", icon: DollarSign },
  { id: "notes", label: "Notes", icon: FileText },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];
type NavId = SectionId | "activity";

const SECTION_IDS = NAV_ITEMS.map((i) => `section-${i.id}`) as unknown as string[];

/* ─── Dropdown option data ────────────────────────────── */

const CATEGORY_OPTIONS = [
  "Maintenance",
  "Repair",
  "Diagnostics",
  "Inspection",
  "Electrical",
  "Bodywork",
];

const SUBCATEGORY_OPTIONS = [
  "Oil Service",
  "Brake Service",
  "Tire Service",
  "Engine Repair",
  "Transmission",
  "Suspension",
];

const LABOR_TYPE_OPTIONS = [
  "Scheduled",
  "Unscheduled",
  "Warranty",
  "Recall",
  "Goodwill",
];

const LABOR_RATE_OPTIONS = [
  { value: "65", label: "Labor - 65 — $65.00" },
  { value: "80", label: "Labor - 80 — $80.00" },
  { value: "95", label: "Labor - 95 — $95.00" },
  { value: "110", label: "Labor - 110 — $110.00" },
  { value: "125", label: "Labor - 125 — $125.00" },
];

const SEARCHABLE_CATEGORIES = [
  { label: "Maintenance — Oil Service", category: "Maintenance", subcategory: "Oil Service" },
  { label: "Maintenance — Brake Service", category: "Maintenance", subcategory: "Brake Service" },
  { label: "Maintenance — Tire Service", category: "Maintenance", subcategory: "Tire Service" },
  { label: "Repair — Engine Repair", category: "Repair", subcategory: "Engine Repair" },
  { label: "Repair — Transmission", category: "Repair", subcategory: "Transmission" },
  { label: "Repair — Suspension", category: "Repair", subcategory: "Suspension" },
  { label: "Diagnostics — Engine Diagnostics", category: "Diagnostics", subcategory: "Engine Repair" },
  { label: "Diagnostics — Electrical Diagnostics", category: "Diagnostics", subcategory: "Oil Service" },
  { label: "Inspection — Pre-Purchase Inspection", category: "Inspection", subcategory: "Oil Service" },
  { label: "Inspection — Safety Inspection", category: "Inspection", subcategory: "Brake Service" },
  { label: "Electrical — Alternator Replacement", category: "Electrical", subcategory: "Engine Repair" },
  { label: "Electrical — Starter Motor Repair", category: "Electrical", subcategory: "Engine Repair" },
  { label: "Bodywork — Dent Repair", category: "Bodywork", subcategory: "Oil Service" },
  { label: "Bodywork — Paint Correction", category: "Bodywork", subcategory: "Oil Service" },
];

const FEE_OPTIONS = [
  { id: "shop-supplies", label: "Shop Supplies", rate: 5.00 },
  { id: "env-disposal", label: "Environmental Disposal", rate: 3.50 },
  { id: "hazmat", label: "Hazardous Materials", rate: 7.25 },
  { id: "diagnostic-fee", label: "Diagnostic Fee", rate: 49.99 },
  { id: "towing", label: "Towing & Recovery", rate: 85.00 },
  { id: "storage", label: "Vehicle Storage (per day)", rate: 25.00 },
  { id: "fluid-top", label: "Fluid Top-Off", rate: 12.00 },
  { id: "tire-disposal", label: "Tire Disposal", rate: 4.50 },
  { id: "parts-markup", label: "Parts Handling & Markup", rate: 15.00 },
  { id: "rush-surcharge", label: "Rush / After-Hours Surcharge", rate: 35.00 },
];

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
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 w-full max-w-[960px] -translate-x-1/2 -translate-y-1/2 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98] data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.98]">
          <div
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-navy-600 dark:bg-navy-800"
            style={{ height: "min(85vh, 720px)" }}
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
                "relative flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] transition-colors duration-150 text-left",
                isActive
                  ? "bg-teal-50 font-semibold text-teal-700"
                  : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-teal-700 rounded-r-sm" />
              )}
              <Icon
                className={cn(
                  "shrink-0",
                  isActive ? "text-teal-700" : "text-slate-400"
                )}
                size={16}
                strokeWidth={1.5}
              />
              <span className="flex-1">{item.label}</span>
              <ChevronRight
                className={cn(
                  "ml-auto shrink-0",
                  isActive ? "text-teal-600" : "text-slate-400"
                )}
                size={14}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>

      <div className="mx-3 my-2 border-t border-slate-200" />

      <div className="px-3">
        <button
          onClick={() => onNavChange("activity")}
          className={cn(
            "relative flex w-full items-center gap-2 px-2.5 py-2 rounded-md text-[13px] transition-colors duration-150 text-left",
            activeNav === "activity"
              ? "bg-teal-50 font-semibold text-teal-700"
              : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          {activeNav === "activity" && (
            <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-teal-700 rounded-r-sm" />
          )}
          <Activity
            className={cn(
              "shrink-0",
              activeNav === "activity" ? "text-teal-700" : "text-slate-400"
            )}
            size={16}
            strokeWidth={1.5}
          />
          <span className="flex-1">Activity logs</span>
          <ChevronRight
            className={cn(
              "ml-auto shrink-0",
              activeNav === "activity" ? "text-teal-600" : "text-slate-400"
            )}
            size={14}
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
    if (isNaN(num) || num < 0) return;
    setEstimatedHours(num);
    setIsRatioTriggered(false);
    setIsDismissed(false);
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

        <section id="section-pricing" style={{ scrollMarginTop: 16 }}>
          <PricingAndCostSection
            billableHours={billableHours}
            laborRate={laborRate}
            totalPrice={totalPrice}
            estimatedHours={estimatedHours}
            costRate={costRate}
            totalCost={totalCost}
            subtotal={subtotal}
            tax={tax}
            grandTotal={grandTotal}
            showWarning={showWarning}
            isPulsing={isPulsing}
            estimatedRef={estimatedRef}
            onBillableChange={handleBillableChange}
            onLaborRateChange={(val) => {
              const v = parseFloat(val);
              if (!isNaN(v)) setLaborRate(v);
            }}
            onEstimatedChange={handleEstimatedManualChange}
            onCostRateChange={(val) => {
              const v = parseFloat(val);
              if (!isNaN(v)) setCostRate(v);
            }}
            onDismissWarning={handleDismiss}
            onAdjustHours={handleAdjust}
          />
        </section>

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
    <h3 className="text-lg font-semibold text-slate-900">{children}</h3>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-lg font-semibold text-slate-900">{children}</h4>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-slate-500">{label}</label>
      {children}
    </div>
  );
}

function FieldInput({
  className,
  value,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const controlled = value !== undefined;
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px]",
        className
      )}
      {...(controlled ? { value: value ?? "" } : {})}
      {...props}
    />
  );
}

function ReadOnlyValue({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center rounded-lg border border-slate-100 bg-slate-100 px-3 text-sm">
      {children}
    </div>
  );
}

/* ─── SearchDropdown — filterable search with results ──── */

interface SearchDropdownProps<T> {
  placeholder: string;
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  className?: string;
}

function SearchDropdown<T>({
  placeholder,
  items,
  getLabel,
  onSelect,
  className,
}: SearchDropdownProps<T>) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? items.filter((item) =>
        getLabel(item).toLowerCase().includes(query.toLowerCase())
      )
    : items;

  React.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Search
        className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400 pointer-events-none"
        strokeWidth={1.5}
      />
      <input
        className={cn(
          "h-10 w-full rounded-lg border bg-slate-50 pl-8 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 hover:border-slate-300 transition-colors",
          isOpen
            ? "border-teal-700 border-2 pl-[31px] pr-[11px]"
            : "border-slate-200"
        )}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-md">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onSelect(item);
                setQuery(getLabel(item));
                setIsOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              {getLabel(item)}
            </button>
          ))}
        </div>
      )}
      {isOpen && query.trim() && filtered.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-slate-200 bg-white p-3 shadow-md">
          <p className="text-sm text-slate-400">No results found</p>
        </div>
      )}
    </div>
  );
}

/* ─── SelectField — interactive dropdown ──────────────── */

interface SelectFieldProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({ value, options, onChange }: SelectFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border bg-slate-50 px-3 text-left text-sm text-slate-900 outline-none transition-colors hover:border-slate-300",
          isOpen
            ? "border-teal-700 border-2 px-[11px]"
            : "border-slate-200"
        )}
      >
        {value}
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-slate-400 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-md">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-left text-sm transition-colors",
                option === value
                  ? "bg-teal-50 font-medium text-teal-700"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface RateSelectFieldProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function RateSelectField({ value, options, onChange }: RateSelectFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  React.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border bg-slate-50 px-3 text-left text-sm text-slate-900 shadow-xs outline-none transition-colors hover:border-slate-300",
          isOpen
            ? "border-teal-700 border-2 px-[11px]"
            : "border-slate-200"
        )}
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-slate-400 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-md">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-left text-sm transition-colors",
                option.value === value
                  ? "bg-teal-50 font-medium text-teal-700"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── General section ─────────────────────────────────── */

const TOGGLES = [
  { id: "taxable", label: "Taxable", defaultChecked: true },
  { id: "display-desc", label: "Display description on estimate & invoice", defaultChecked: true },
  { id: "commissionable", label: "Commissionable", defaultChecked: false },
  { id: "active", label: "Active", defaultChecked: true },
  { id: "display-hrs", label: "Display hours & price on estimate & invoice", defaultChecked: true },
] as const;

function GeneralSection() {
  const [selectedFees, setSelectedFees] = React.useState<
    { id: string; label: string; rate: number }[]
  >([{ id: "shop-supplies", label: "Shop Supplies", rate: 5.0 }]);

  const totalFee = selectedFees.reduce((sum, f) => sum + f.rate, 0);

  function handleAddFee(fee: (typeof FEE_OPTIONS)[number]) {
    if (selectedFees.some((f) => f.id === fee.id)) return;
    setSelectedFees((prev) => [...prev, fee]);
  }

  function handleRemoveFee(id: string) {
    setSelectedFees((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-6">
      <div>
        <SectionHeading>General</SectionHeading>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <FormField label="Labor name">
            <FieldInput defaultValue="Oil Change Labor" />
          </FormField>
          <FormField label="Sales code">
            <FieldInput defaultValue="LBR-001" />
          </FormField>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <SubHeading>Settings</SubHeading>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
          {TOGGLES.map((t) => (
            <label
              key={t.id}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <Switch defaultChecked={t.defaultChecked} size="default" />
              <span className="text-sm text-slate-700">{t.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <SubHeading>Fee</SubHeading>
          <div className="mt-3">
            <SearchDropdown
              placeholder="Search and add fees..."
              items={FEE_OPTIONS.filter(
                (f) => !selectedFees.some((s) => s.id === f.id)
              )}
              getLabel={(f) => `${f.label} — $${f.rate.toFixed(2)}`}
              onSelect={handleAddFee}
            />
          </div>

          {selectedFees.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {selectedFees.map((fee) => (
                <span
                  key={fee.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-3 pr-1.5 text-sm text-slate-700"
                >
                  {fee.label}
                  <span className="font-mono text-xs text-slate-500">
                    ${fee.rate.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveFee(fee.id)}
                    className="flex size-4 items-center justify-center rounded-full text-slate-400 hover:bg-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X size={10} strokeWidth={2} />
                  </button>
                </span>
              ))}
              <span className="font-mono text-sm font-semibold text-teal-700">
                Total: ${totalFee.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Classification section ──────────────────────────── */

function ClassificationSection() {
  const [category, setCategory] = React.useState("Maintenance");
  const [subcategory, setSubcategory] = React.useState("Oil Service");
  const [laborType, setLaborType] = React.useState("Scheduled");

  function handleCategorySearch(
    item: (typeof SEARCHABLE_CATEGORIES)[number]
  ) {
    setCategory(item.category);
    setSubcategory(item.subcategory);
  }

  return (
    <div>
      <SectionHeading>Classification</SectionHeading>
      <div className="mt-4 space-y-4">
        <FormField label="Search category">
          <SearchDropdown
            placeholder="Search category..."
            items={SEARCHABLE_CATEGORIES}
            getLabel={(item) => item.label}
            onSelect={handleCategorySearch}
          />
        </FormField>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Standard Category">
            <SelectField
              value={category}
              options={CATEGORY_OPTIONS}
              onChange={setCategory}
            />
          </FormField>
          <FormField label="Standard Subcategory">
            <SelectField
              value={subcategory}
              options={SUBCATEGORY_OPTIONS}
              onChange={setSubcategory}
            />
          </FormField>
          <FormField label="Standard Labor Type">
            <SelectField
              value={laborType}
              options={LABOR_TYPE_OPTIONS}
              onChange={setLaborType}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

/* ─── Pricing & Cost section (merged) ─────────────────── */

function PricingAndCostSection({
  billableHours,
  laborRate,
  totalPrice,
  estimatedHours,
  costRate,
  totalCost,
  subtotal,
  tax,
  grandTotal,
  showWarning,
  isPulsing,
  estimatedRef,
  onBillableChange,
  onLaborRateChange,
  onEstimatedChange,
  onCostRateChange,
  onDismissWarning,
  onAdjustHours,
}: {
  billableHours: number;
  laborRate: number;
  totalPrice: number;
  estimatedHours: number;
  costRate: number;
  totalCost: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
  showWarning: boolean;
  isPulsing: boolean;
  estimatedRef: React.RefObject<HTMLInputElement | null>;
  onBillableChange: (val: string) => void;
  onLaborRateChange: (val: string) => void;
  onEstimatedChange: (val: string) => void;
  onCostRateChange: (val: string) => void;
  onDismissWarning: () => void;
  onAdjustHours: () => void;
}) {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const margin = totalPrice - totalCost;
  const marginPct = totalPrice > 0 ? (margin / totalPrice) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Card body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Rate configuration
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Billable hours">
            <FieldInput
              type="text"
              inputMode="decimal"
              value={billableHours}
              onChange={(e) => onBillableChange(e.target.value)}
              className="font-mono"
            />
          </FormField>
          <FormField label="Labor rate ($/hr)">
            <FieldInput
              type="text"
              inputMode="decimal"
              value={laborRate}
              onChange={(e) => onLaborRateChange(e.target.value)}
              className="font-mono"
            />
          </FormField>
          <FormField label="Total price">
            <ReadOnlyValue>
              <span className="font-mono font-medium text-slate-900">
                ${fmt(totalPrice)}
              </span>
            </ReadOnlyValue>
          </FormField>
        </div>

        <div className="h-px bg-slate-200 my-6" />

        <h3 className="text-lg font-semibold text-slate-900 mb-4">Cost</h3>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Estimated hours">
            <input
              ref={estimatedRef}
              type="text"
              inputMode="decimal"
              value={estimatedHours}
              onChange={(e) => onEstimatedChange(e.target.value)}
              className={cn(
                "h-10 w-full rounded-lg border bg-slate-50 px-3 font-mono text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px]",
                showWarning
                  ? "border-amber-400 text-amber-600"
                  : "border-slate-200 text-slate-900",
                isPulsing && "animate-[pulse-amber_0.5s_ease-in-out_3]"
              )}
            />
            {showWarning && (
              <span className="text-xs text-amber-600">Adjusted by ratio</span>
            )}
          </FormField>
          <FormField label="Rate ($/hr)">
            <FieldInput
              type="text"
              inputMode="decimal"
              value={costRate}
              onChange={(e) => onCostRateChange(e.target.value)}
              className="font-mono"
            />
          </FormField>
          <FormField label="Total cost">
            <ReadOnlyValue>
              <span className="font-mono font-medium text-slate-900">
                ${fmt(totalCost)}
              </span>
            </ReadOnlyValue>
          </FormField>
        </div>

        <div className="mt-5">
          <HoursWarningBanner
            visible={showWarning}
            billableHours={billableHours}
            estimatedHours={estimatedHours}
            onDismiss={onDismissWarning}
            onAdjust={onAdjustHours}
          />
        </div>
      </div>

      {/* Card footer — summary strip */}
      <div className="bg-teal-50/40 border-t border-teal-100 px-6 py-4 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-slate-500">Subtotal</span>
            <span className="font-mono text-[13px] font-medium text-slate-900">
              ${fmt(subtotal)}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-slate-500">Tax</span>
            <span className="font-mono text-[13px] text-slate-500">
              ${fmt(tax)}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">Total</span>
            <span className="font-mono text-[15px] font-medium text-teal-700">
              ${fmt(grandTotal)}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-300" />

          <div className="flex items-center gap-1.5">
            <CircleCheck size={14} strokeWidth={1.5} className="text-teal-700" />
            <span className="text-xs text-slate-500">Margin</span>
            <span className="font-mono text-xs font-medium text-teal-700">
              ${fmt(margin)}
            </span>
            <span className="text-[11px] text-slate-500">({marginPct.toFixed(1)}%)</span>
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
        <FormField label="Labor description">
          <textarea
            className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
            defaultValue="Standard oil change procedure including oil filter replacement and fluid top-off."
          />
        </FormField>
        <FormField label="Internal notes">
          <textarea
            className="min-h-[80px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:border-2 focus:px-[11px] focus:py-[7px]"
            placeholder="Add internal notes..."
          />
        </FormField>
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

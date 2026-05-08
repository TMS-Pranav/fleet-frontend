import type { ReactNode } from "react";

export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h1 className="text-[28px] leading-tight font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-[12px] text-[var(--wb-text3)]">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function RangeSelect() {
  return (
    <select className="h-9 px-3 pr-8 rounded-lg border border-[var(--wb-border2)] bg-white text-[12.5px] text-[var(--wb-text1)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-orange)]/30 focus:border-[var(--wb-orange)]">
      <option>Today</option>
      <option>Last 7 Days</option>
      <option>Last 30 Days</option>
      <option>Last Year</option>
    </select>
  );
}

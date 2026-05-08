import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

type Tone = "orange" | "green" | "blue" | "amber" | "purple" | "navy";

const toneColor: Record<Tone, string> = {
  orange: "var(--wb-orange)",
  green: "var(--wb-green)",
  blue: "var(--wb-blue)",
  amber: "var(--wb-amber)",
  purple: "var(--wb-purple)",
  navy: "var(--wb-navy)",
};

export function KpiCard({
  label, value, unit, tone = "orange", delta, deltaDir = "up", footer, icon,
}: {
  label: string; value: string | number; unit?: string; tone?: Tone;
  delta?: string; deltaDir?: "up" | "down" | "flat"; footer?: ReactNode; icon?: ReactNode;
}) {
  const color = toneColor[tone];
  const deltaColor = deltaDir === "up" ? "var(--wb-green)" : deltaDir === "down" ? "var(--wb-red)" : "var(--wb-text3)";
  const Arrow = deltaDir === "up" ? ArrowUp : ArrowDown;
  return (
    <div className="wb-card p-4 relative overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{ background: color }}
      />
      <div className="flex items-center justify-between">
        <span className="wb-section-label">{label}</span>
        {icon && <span className="text-[var(--wb-text3)]">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[30px] font-bold leading-none" style={{ color }}>
          {value}
        </span>
        {unit && <span className="text-[13px] text-[var(--wb-text2)] font-medium">{unit}</span>}
      </div>
      {delta && (
        <div className="mt-2 flex items-center gap-1 text-[11.5px] font-medium" style={{ color: deltaColor }}>
          {deltaDir !== "flat" && <Arrow className="h-3 w-3" />}
          <span>{delta}</span>
        </div>
      )}
      {footer && <div className="mt-3 pt-3 border-t border-[var(--wb-border)] text-[11.5px] text-[var(--wb-text2)]">{footer}</div>}
    </div>
  );
}

type Variant = "online" | "offline" | "warning" | "info" | "neutral" | "charging";

const map: Record<Variant, { bg: string; fg: string; dot: string; label: string }> = {
  online:   { bg: "rgba(34,197,94,0.12)",  fg: "#15803d", dot: "var(--wb-green)",  label: "Online" },
  offline:  { bg: "rgba(239,68,68,0.12)",  fg: "#b91c1c", dot: "var(--wb-red)",    label: "Offline" },
  warning:  { bg: "rgba(245,158,11,0.14)", fg: "#b45309", dot: "var(--wb-amber)",  label: "Warning" },
  info:     { bg: "rgba(59,130,246,0.12)", fg: "#1d4ed8", dot: "var(--wb-blue)",   label: "Info" },
  neutral:  { bg: "var(--wb-navy-light)",   fg: "var(--wb-navy)", dot: "var(--wb-text3)", label: "Idle" },
  charging: { bg: "rgba(34,197,94,0.12)",  fg: "#15803d", dot: "var(--wb-green)",  label: "Charging" },
};

export function StatusPill({ variant = "online", children }: { variant?: Variant; children?: React.ReactNode }) {
  const m = map[variant];
  return (
    <span
      className="inline-flex items-center gap-1.5 h-6 px-2 rounded-full text-[11px] font-semibold"
      style={{ background: m.bg, color: m.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full wb-pulse" style={{ background: m.dot }} />
      {children ?? m.label}
    </span>
  );
}

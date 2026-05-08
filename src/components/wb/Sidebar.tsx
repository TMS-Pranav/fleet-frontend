import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, LineChart, BellRing, SlidersHorizontal,
  Map, BatteryCharging, CalendarCheck, FileText, Plug, Settings,
} from "lucide-react";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/events", label: "Events", icon: BellRing, badge: 3 },
  { to: "/mode", label: "Mode Control", icon: SlidersHorizontal },
  { to: "/fleet", label: "Fleet Map", icon: Map },
  { to: "/battery", label: "Battery Health", icon: BatteryCharging },
  { to: "/deployment", label: "Deployment", icon: CalendarCheck },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/api", label: "API Console", icon: Plug },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-[var(--wb-card)] border-r border-[var(--wb-border)] sticky top-14 h-[calc(100vh-3.5rem)]">
      <div className="px-4 pt-5 pb-2 wb-section-label">Operations</div>
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon, badge }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link
              key={to}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={to as any}
              className={[
                "group flex items-center gap-3 h-9 px-3 rounded-lg text-[13px] font-medium transition-colors",
                active
                  ? "bg-[var(--wb-orange-tint)] text-[var(--wb-navy)]"
                  : "text-[var(--wb-text2)] hover:bg-[var(--wb-navy-light)] hover:text-[var(--wb-navy)]",
              ].join(" ")}
            >
              <Icon className={`h-4 w-4 ${active ? "text-[var(--wb-orange-dark)]" : ""}`} />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className="text-[10px] font-bold bg-[var(--wb-amber)] text-white rounded-full px-1.5 py-0.5">
                  {badge}
                </span>
              ) : null}
              {active && <span className="h-5 w-1 rounded-full bg-[var(--wb-orange)]" />}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 p-3 rounded-xl bg-[var(--wb-navy)] text-white">
        <div className="text-[10px] uppercase tracking-wider text-white/60">System Status</div>
        <div className="mt-1.5 flex items-center gap-2 text-[13px]">
          <span className="h-2 w-2 rounded-full bg-[var(--wb-green)] wb-pulse" />
          All systems online
        </div>
        <div className="mt-1 text-[10.5px] text-white/55">Last sync · 4s ago</div>
      </div>
    </aside>
  );
}

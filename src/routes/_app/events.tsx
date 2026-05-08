import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle, Filter } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";
import { StatusPill } from "../../components/wb/StatusPill";

export const Route = createFileRoute("/_app/events")({
  component: Events,
  head: () => ({ meta: [{ title: "Events & Alarms · WattBank EMS" }] }),
});

type Sev = "critical" | "warning" | "info" | "resolved";
const events: { id: string; sev: Sev; code: string; title: string; site: string; time: string; ack: boolean }[] = [
  { id: "EV-2418", sev: "critical", code: "BMS-201", title: "Cell temperature exceeded 48°C in Rack 3", site: "Pune Unit 3", time: "08:42:14", ack: false },
  { id: "EV-2417", sev: "warning",  code: "INV-104", title: "Inverter 2 derated due to grid voltage", site: "Pune Unit 3", time: "08:31:02", ack: false },
  { id: "EV-2416", sev: "warning",  code: "GRID-09", title: "Grid frequency deviation > 0.4 Hz", site: "Mumbai Plant 1", time: "07:58:11", ack: true },
  { id: "EV-2415", sev: "info",     code: "MODE-21", title: "Switched to TOU arbitrage mode (auto)", site: "Pune Unit 3", time: "06:00:00", ack: true },
  { id: "EV-2414", sev: "resolved", code: "BMS-118", title: "Coolant flow restored — fault cleared", site: "Pune Unit 3", time: "05:42:30", ack: true },
  { id: "EV-2413", sev: "info",     code: "FW-02",   title: "Firmware update v2.4.1 installed successfully", site: "Bengaluru Hub", time: "Yesterday", ack: true },
];

const sevMeta: Record<Sev, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  critical: { color: "var(--wb-red)",   bg: "rgba(239,68,68,0.1)",  icon: <XCircle className="h-4 w-4" />,        label: "Critical" },
  warning:  { color: "var(--wb-amber)", bg: "rgba(245,158,11,0.1)", icon: <AlertTriangle className="h-4 w-4" />,  label: "Warning" },
  info:     { color: "var(--wb-blue)",  bg: "rgba(59,130,246,0.1)", icon: <Info className="h-4 w-4" />,           label: "Info" },
  resolved: { color: "var(--wb-green)", bg: "rgba(34,197,94,0.1)",  icon: <CheckCircle2 className="h-4 w-4" />,   label: "Resolved" },
};

function Events() {
  const [filter, setFilter] = useState<Sev | "all">("all");
  const list = events.filter((e) => filter === "all" || e.sev === filter);

  return (
    <>
      <PageHeader title="Events & Alarms" subtitle="6 events · 2 unacknowledged · last 24h" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {(["critical", "warning", "info", "resolved"] as Sev[]).map((s) => {
          const m = sevMeta[s];
          const count = events.filter((e) => e.sev === s).length;
          return (
            <button key={s} onClick={() => setFilter(filter === s ? "all" : s)}
              className={`wb-card p-4 text-left transition ${filter === s ? "ring-2 ring-[var(--wb-orange)]" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="wb-section-label">{m.label}</span>
                <span style={{ color: m.color }}>{m.icon}</span>
              </div>
              <div className="mt-2 text-[26px] font-bold" style={{ color: m.color }}>{count}</div>
              <div className="text-[11px] text-[var(--wb-text3)]">events in window</div>
            </button>
          );
        })}
      </div>

      <div className="wb-card overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between border-b border-[var(--wb-border)]">
          <h3 className="text-[14px] font-semibold flex items-center gap-2"><Filter className="h-3.5 w-3.5 text-[var(--wb-text3)]" /> Event Stream {filter !== "all" && <button className="ml-2 text-[11px] text-[var(--wb-orange)]" onClick={() => setFilter("all")}>Clear filter</button>}</h3>
          <div className="flex gap-2">
            <button className="h-8 px-3 rounded-md border border-[var(--wb-border2)] text-[12px]">Acknowledge all</button>
            <button className="h-8 px-3 rounded-md bg-[var(--wb-navy)] text-white text-[12px]">Export CSV</button>
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead className="bg-[var(--wb-bg2)] text-[var(--wb-text3)]">
            <tr className="text-left">
              <th className="px-5 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Severity</th>
              <th className="px-3 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Code</th>
              <th className="px-3 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Description</th>
              <th className="px-3 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Site</th>
              <th className="px-3 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Time</th>
              <th className="px-5 py-2.5 font-semibold uppercase text-[10.5px] tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => {
              const m = sevMeta[e.sev];
              return (
                <tr key={e.id} className="border-t border-[var(--wb-border)] hover:bg-[var(--wb-orange-tint)]/40">
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: m.color }}>{m.icon}{m.label}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-[11.5px] text-[var(--wb-text2)]">{e.code}</td>
                  <td className="px-3 py-3 text-[var(--wb-text1)]">{e.title}</td>
                  <td className="px-3 py-3 text-[var(--wb-text2)]">{e.site}</td>
                  <td className="px-3 py-3 text-[var(--wb-text3)] font-mono text-[11.5px]">{e.time}</td>
                  <td className="px-5 py-3">{e.ack ? <StatusPill variant="online">Acknowledged</StatusPill> : <StatusPill variant="warning">Pending</StatusPill>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Loader } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";

export const Route = createFileRoute("/_app/deployment")({
  component: Deployment,
  head: () => ({ meta: [{ title: "Deployment Journey · WattBank EMS" }] }),
});

const steps = [
  { name: "Site Survey", date: "12 Jan 2026", status: "done", desc: "Load profile, solar yield, structural assessment completed." },
  { name: "Engineering Design", date: "28 Jan 2026", status: "done", desc: "SLD, BoM, civil drawings approved by site team." },
  { name: "Equipment Dispatch", date: "10 Feb 2026", status: "done", desc: "BESS containers, inverters and switchgear shipped." },
  { name: "Installation & Cabling", date: "22 Feb 2026", status: "done", desc: "Mechanical install + AC/DC cabling completed." },
  { name: "Commissioning & Tests", date: "08 Mar 2026", status: "active", desc: "Pre-charge, BMS calibration and protection tests in progress." },
  { name: "Grid Synchronisation", date: "Pending", status: "todo", desc: "DISCOM approval & first parallel operation." },
  { name: "Handover & Training", date: "Pending", status: "todo", desc: "O&M training, warranty handover, go-live." },
] as const;

function Deployment() {
  const done = steps.filter((s) => s.status === "done").length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <>
      <PageHeader title="Deployment Journey" subtitle={`Pune Unit 3 · 5 of 7 milestones complete · ${pct}%`} />

      <div className="wb-card p-5 mb-5">
        <div className="flex items-center justify-between text-[12px] mb-2">
          <span className="wb-section-label">Project Progress</span>
          <span className="font-bold text-[var(--wb-orange)]">{pct}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-[var(--wb-bg2)] overflow-hidden">
          <div className="h-full wb-grad-orange transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="wb-card p-5">
        <ol className="relative border-l-2 border-[var(--wb-border)] ml-3 space-y-6">
          {steps.map((s, i) => {
            const Icon = s.status === "done" ? Check : s.status === "active" ? Loader : Clock;
            const color = s.status === "done" ? "var(--wb-green)" : s.status === "active" ? "var(--wb-orange)" : "var(--wb-text3)";
            return (
              <li key={i} className="ml-6 relative">
                <span className="absolute -left-[34px] flex items-center justify-center h-7 w-7 rounded-full ring-4 ring-[var(--wb-card)]"
                  style={{ background: s.status === "todo" ? "var(--wb-bg2)" : color, color: s.status === "todo" ? color : "white" }}>
                  <Icon className={`h-3.5 w-3.5 ${s.status === "active" ? "animate-spin" : ""}`} />
                </span>
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold text-[14px]">{s.name}</h4>
                  <span className="text-[11px] text-[var(--wb-text3)] font-mono">{s.date}</span>
                </div>
                <p className="text-[12.5px] text-[var(--wb-text2)] mt-1">{s.desc}</p>
                {s.status === "active" && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[var(--wb-orange-tint)] text-[var(--wb-orange-dark)]">
                    In Progress · 60%
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

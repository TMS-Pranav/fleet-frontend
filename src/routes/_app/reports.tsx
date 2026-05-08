import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Calendar } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";

export const Route = createFileRoute("/_app/reports")({
  component: Reports,
  head: () => ({ meta: [{ title: "Reports · WattBank EMS" }] }),
});

const templates = [
  { name: "Monthly Performance", desc: "kWh produced, savings, uptime, alarms summary.", color: "var(--wb-orange)" },
  { name: "Financial Settlement", desc: "TOU billing, demand charges, net export reconciliation.", color: "var(--wb-blue)" },
  { name: "Sustainability (CO₂)", desc: "Emissions avoided, equivalence in trees, REC potential.", color: "var(--wb-green)" },
  { name: "Battery Warranty", desc: "Cycles used vs warranty, SoH timeline, derating events.", color: "var(--wb-purple)" },
];

const recent = [
  { id: "RPT-2026-04", name: "April 2026 Performance · Pune Unit 3", size: "1.4 MB", date: "01 May 2026" },
  { id: "RPT-2026-03", name: "Q1 Financial Settlement · All Sites", size: "2.8 MB", date: "12 Apr 2026" },
  { id: "RPT-2026-02", name: "March 2026 Sustainability Report", size: "0.9 MB", date: "01 Apr 2026" },
  { id: "RPT-2026-01", name: "Annual Battery Warranty Review", size: "3.1 MB", date: "15 Mar 2026" },
];

function Reports() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Generate, download and schedule operational reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((t) => (
          <div key={t.name} className="wb-card p-5 hover:border-[var(--wb-orange)] cursor-pointer group transition">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `color-mix(in oklab, ${t.color} 14%, transparent)`, color: t.color }}>
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold text-[14px]">{t.name}</h3>
            <p className="text-[11.5px] text-[var(--wb-text2)] mt-1 leading-snug">{t.desc}</p>
            <button className="mt-4 w-full h-9 rounded-lg border border-[var(--wb-border)] text-[12.5px] font-semibold group-hover:border-[var(--wb-orange)] group-hover:text-[var(--wb-orange)]">Generate →</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 mt-5">
        <div className="wb-card overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--wb-border)] flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Recent Reports</h3>
            <button className="text-[12px] text-[var(--wb-orange)] font-semibold">View all</button>
          </div>
          <table className="w-full text-[13px]">
            <thead className="bg-[var(--wb-bg2)] text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)] text-left">
              <tr><th className="px-5 py-2.5">ID</th><th className="px-3 py-2.5">Name</th><th className="px-3 py-2.5">Size</th><th className="px-3 py-2.5">Date</th><th className="px-5 py-2.5"></th></tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t border-[var(--wb-border)] hover:bg-[var(--wb-bg2)]">
                  <td className="px-5 py-3 font-mono text-[11.5px] text-[var(--wb-text2)]">{r.id}</td>
                  <td className="px-3 py-3">{r.name}</td>
                  <td className="px-3 py-3 text-[var(--wb-text2)]">{r.size}</td>
                  <td className="px-3 py-3 text-[var(--wb-text3)] font-mono text-[11.5px]">{r.date}</td>
                  <td className="px-5 py-3 text-right"><button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--wb-orange)]"><Download className="h-3.5 w-3.5" /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="wb-card p-5">
          <h3 className="text-[14px] font-semibold mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-[var(--wb-orange)]" /> Scheduled</h3>
          <div className="space-y-3">
            {[
              { name: "Monthly Performance", cad: "1st of each month · 06:00 IST" },
              { name: "Weekly Alarm Digest", cad: "Every Monday · 08:00 IST" },
              { name: "Quarterly Financial", cad: "1st of Q · CFO mailing list" },
            ].map((s) => (
              <div key={s.name} className="p-3 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)]">
                <div className="font-semibold text-[12.5px]">{s.name}</div>
                <div className="text-[11px] text-[var(--wb-text3)] mt-0.5">{s.cad}</div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full h-9 rounded-lg border border-dashed border-[var(--wb-border2)] text-[12.5px] text-[var(--wb-text2)] hover:border-[var(--wb-orange)] hover:text-[var(--wb-orange)]">+ New schedule</button>
        </div>
      </div>
    </>
  );
}

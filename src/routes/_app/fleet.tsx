import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";
import { StatusPill } from "../../components/wb/StatusPill";

export const Route = createFileRoute("/_app/fleet")({
  component: Fleet,
  head: () => ({ meta: [{ title: "Fleet Map · WattBank EMS" }] }),
});

const sites = [
  { id: 1, name: "Pune Unit 3",     city: "Pune",       cap: "500 kWh", soc: 76, status: "online",  x: 38, y: 62 },
  { id: 2, name: "Mumbai Plant 1",  city: "Mumbai",     cap: "1.2 MWh", soc: 54, status: "warning", x: 30, y: 60 },
  { id: 3, name: "Bengaluru Hub",   city: "Bengaluru",  cap: "800 kWh", soc: 82, status: "online",  x: 42, y: 78 },
  { id: 4, name: "Delhi NCR Site",  city: "Delhi",      cap: "2.0 MWh", soc: 45, status: "online",  x: 47, y: 30 },
  { id: 5, name: "Chennai Tower",   city: "Chennai",    cap: "350 kWh", soc: 12, status: "offline", x: 50, y: 80 },
  { id: 6, name: "Ahmedabad Park",  city: "Ahmedabad",  cap: "600 kWh", soc: 68, status: "online",  x: 28, y: 48 },
] as const;

function Fleet() {
  return (
    <>
      <PageHeader title="Fleet Map" subtitle="6 sites · 5 online · 1 warning · 1 offline" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <div className="wb-card overflow-hidden relative">
          <div className="aspect-[4/3] relative bg-gradient-to-br from-[var(--wb-navy-light)] to-[var(--wb-bg2)]">
            {/* stylised India outline */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40">
              <path d="M30 18 L55 16 L70 30 L72 48 L60 68 L52 82 L46 90 L38 82 L30 70 L22 56 L20 38 Z"
                fill="var(--wb-navy-light)" stroke="var(--wb-navy-mid)" strokeWidth="0.4" />
              <path d="M30 18 L55 16 L70 30" fill="none" stroke="var(--wb-navy-mid)" strokeWidth="0.3" strokeDasharray="1 1" />
            </svg>
            {sites.map((s) => {
              const color = s.status === "online" ? "var(--wb-green)" : s.status === "warning" ? "var(--wb-amber)" : "var(--wb-red)";
              return (
                <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                  <span className="absolute inset-0 rounded-full wb-pulse" style={{ background: color, opacity: 0.35, height: 22, width: 22, transform: "translate(-50%, -50%)" }} />
                  <div className="relative h-3 w-3 rounded-full ring-2 ring-white shadow" style={{ background: color }} />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden group-hover:block z-10 wb-card px-3 py-2 text-[11.5px] whitespace-nowrap">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-[var(--wb-text3)]">{s.cap} · SoC {s.soc}%</div>
                  </div>
                </div>
              );
            })}
            <div className="absolute bottom-3 left-3 wb-card px-3 py-2 flex gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--wb-green)]" /> Online</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--wb-amber)]" /> Warning</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--wb-red)]" /> Offline</span>
            </div>
          </div>
        </div>

        <div className="wb-card p-4">
          <div className="flex items-center gap-2 px-2 h-9 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)] mb-3">
            <Search className="h-3.5 w-3.5 text-[var(--wb-text3)]" />
            <input placeholder="Search sites…" className="bg-transparent outline-none text-[12.5px] flex-1" />
          </div>
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {sites.map((s) => (
              <div key={s.id} className="p-3 rounded-xl border border-[var(--wb-border)] hover:border-[var(--wb-orange)] hover:bg-[var(--wb-orange-tint)]/30 cursor-pointer transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[var(--wb-text3)]" />
                    <div className="font-semibold text-[13px]">{s.name}</div>
                  </div>
                  <StatusPill variant={s.status as never} />
                </div>
                <div className="flex justify-between items-center mt-2 text-[11.5px] text-[var(--wb-text2)]">
                  <span>{s.city} · {s.cap}</span>
                  <span className="font-mono font-bold text-[var(--wb-navy)]">{s.soc}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--wb-bg2)] overflow-hidden">
                  <div className="h-full" style={{
                    width: `${s.soc}%`,
                    background: s.soc > 60 ? "var(--wb-green)" : s.soc > 30 ? "var(--wb-amber)" : "var(--wb-red)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

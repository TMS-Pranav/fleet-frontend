import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sun, Battery, Building2, Zap, Download, Activity, Leaf, ShieldCheck } from "lucide-react";
import { PageHeader, RangeSelect } from "../../components/wb/PageHeader";
import { KpiCard } from "../../components/wb/KpiCard";
import { StatusPill } from "../../components/wb/StatusPill";

export const Route = createFileRoute("/_app/")({
  component: Overview,
  head: () => ({
    meta: [
      { title: "Overview · WattBank EMS" },
      { name: "description", content: "Real-time site overview — solar, battery, grid and load." },
    ],
  }),
});

const profile = Array.from({ length: 24 }, (_, h) => {
  const solar = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI) * 95 + (Math.random() * 6 - 3));
  const load = 35 + Math.sin(h / 3) * 18 + (h > 17 || h < 6 ? 18 : 0);
  const battery = h >= 9 && h <= 15 ? -Math.max(0, solar - load) * 0.8 : Math.max(0, load - solar) * 0.6;
  const grid = load - solar - battery;
  return { h: `${String(h).padStart(2, "0")}:00`, Solar: +solar.toFixed(1), Load: +load.toFixed(1), Battery: +battery.toFixed(1), Grid: +grid.toFixed(1) };
});

function Overview() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 4000); return () => clearInterval(id); }, []);
  const solarKw = (78.4 + Math.sin(tick) * 1.2).toFixed(1);

  return (
    <>
      <PageHeader
        title="Overview Dashboard"
        subtitle={`Pune Unit 3 · Last update 4s ago · ${new Date().toLocaleString()}`}
        actions={<><RangeSelect /><button className="h-9 px-3.5 rounded-lg bg-[var(--wb-navy)] text-white text-[12.5px] font-medium hover:bg-[var(--wb-navy-mid)] flex items-center gap-1.5"><Download className="h-3.5 w-3.5" />Export</button></>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Solar Generation" value={solarKw} unit="kW" tone="amber" delta="+12.4% vs yesterday" deltaDir="up" icon={<Sun className="h-4 w-4" />} footer="Peak today · 94.1 kW @ 12:40" />
        <KpiCard label="Battery SoC" value="76" unit="%" tone="green" delta="● Charging · 18.2 kW" deltaDir="up" icon={<Battery className="h-4 w-4" />} footer="Cycle 412 · Health 98.4%" />
        <KpiCard label="Grid Export" value="22.6" unit="kW" tone="blue" delta="↑ Exporting" deltaDir="up" icon={<Zap className="h-4 w-4" />} footer="Net today · +148 kWh" />
        <KpiCard label="Site Load" value="38.5" unit="kW" tone="purple" delta="— Normal demand" deltaDir="flat" icon={<Building2 className="h-4 w-4" />} footer="Peak threshold · 110 kW" />
      </div>

      {/* Power flow */}
      <div className="wb-card p-5 mt-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-semibold">Live Power Flow</h3>
            <p className="text-[11.5px] text-[var(--wb-text3)] mt-0.5">Energy movement between Solar · Battery · Load · Grid</p>
          </div>
          <StatusPill variant="online">Streaming</StatusPill>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <FlowNode icon={<Sun className="h-6 w-6" />} label="Solar PV" value={`${solarKw} kW`} color="var(--wb-amber)" />
          <FlowArrow label={`${solarKw} kW`} active />
          <FlowNode icon={<Battery className="h-6 w-6" />} label="WattBank BESS" value="76%" color="var(--wb-green)" badge="76%" />
          <FlowArrow label="18.2 kW" active />
          <FlowNode icon={<Building2 className="h-6 w-6" />} label="Site Load" value="38.5 kW" color="var(--wb-purple)" />
          <FlowArrow label="22.6 kW" active reverse />
          <FlowNode icon={<Zap className="h-6 w-6" />} label="Grid" value="Export" color="var(--wb-blue)" />
        </div>

        {/* Energy today bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-[11px] text-[var(--wb-text2)] mb-2">
            <span className="wb-section-label">Energy Today · 612 kWh</span>
            <div className="flex gap-3 text-[10.5px]">
              <Legend color="var(--wb-amber)" label="Solar 410" />
              <Legend color="var(--wb-green)" label="Battery 142" />
              <Legend color="var(--wb-blue)" label="Grid 60" />
            </div>
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-[var(--wb-bg2)]">
            <div className="h-full" style={{ width: "67%", background: "var(--wb-amber)" }} />
            <div className="h-full" style={{ width: "23%", background: "var(--wb-green)" }} />
            <div className="h-full" style={{ width: "10%", background: "var(--wb-blue)" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mt-5">
        <div className="wb-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold">Power Profile · 24h</h3>
              <p className="text-[11.5px] text-[var(--wb-text3)]">Solar, battery, grid and load (kW)</p>
            </div>
            <div className="flex gap-3 text-[10.5px]">
              <Legend color="var(--wb-amber)" label="Solar" />
              <Legend color="var(--wb-green)" label="Battery" />
              <Legend color="var(--wb-blue)" label="Grid" />
              <Legend color="var(--wb-purple)" label="Load" />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <LineChart data={profile} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="var(--wb-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" tick={{ fontSize: 10, fill: "var(--wb-text3)" }} interval={3} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
                <Line type="monotone" dataKey="Solar" stroke="var(--wb-amber)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Battery" stroke="var(--wb-green)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
                <Line type="monotone" dataKey="Grid" stroke="var(--wb-blue)" strokeWidth={1.8} dot={false} />
                <Line type="monotone" dataKey="Load" stroke="var(--wb-purple)" strokeWidth={1.8} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="wb-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-semibold">Revenue · This Month</h3>
            <span className="text-[11px] text-[var(--wb-text3)]">May 2026</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Peak Saving" value="₹ 38,420" tone="green" />
            <Stat label="Solar Self-Use" value="₹ 51,210" tone="amber" />
            <Stat label="TOU Arbitrage" value="₹ 22,840" tone="blue" />
            <Stat label="Total Saving" value="₹ 1,12,470" tone="orange" highlight />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-[var(--wb-border)] text-[11.5px]">
            <div className="flex items-center gap-2 text-[var(--wb-text2)]"><Leaf className="h-3.5 w-3.5 text-[var(--wb-green)]" /> CO₂ offset · 4.8 t</div>
            <div className="flex items-center gap-2 text-[var(--wb-text2)]"><ShieldCheck className="h-3.5 w-3.5 text-[var(--wb-blue)]" /> Warranty used · 12.4%</div>
          </div>
        </div>
      </div>

      {/* Mini area */}
      <div className="wb-card p-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-[var(--wb-orange)]" /> Battery State-of-Charge · 24h</h3>
          <RangeSelect />
        </div>
        <div className="h-[160px]">
          <ResponsiveContainer>
            <AreaChart data={profile.map((p, i) => ({ h: p.h, soc: 40 + Math.sin(i / 4) * 25 + 25 }))}>
              <defs>
                <linearGradient id="socg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--wb-green)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--wb-green)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--wb-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fill: "var(--wb-text3)" }} interval={3} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
              <Area type="monotone" dataKey="soc" stroke="var(--wb-green)" strokeWidth={2} fill="url(#socg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function FlowNode({ icon, label, value, color, badge }: { icon: React.ReactNode; label: string; value: string; color: string; badge?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative h-14 w-14 rounded-2xl flex items-center justify-center"
        style={{ background: `color-mix(in oklab, ${color} 12%, transparent)`, border: `1.5px solid color-mix(in oklab, ${color} 40%, transparent)`, color }}>
        {icon}
        {badge && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 py-[1px] rounded-full text-[9px] font-bold text-white" style={{ background: "var(--wb-green)" }}>{badge}</span>
        )}
      </div>
      <div className="text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)]">{label}</div>
      <div className="text-[12.5px] font-semibold" style={{ color }}>{value}</div>
    </div>
  );
}

function FlowArrow({ label, active, reverse }: { label: string; active?: boolean; reverse?: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 min-w-[40px]">
      <div className="text-[9.5px] font-medium text-[var(--wb-text3)]">{reverse ? "←" : "→"} {label}</div>
      <div className={`h-[2px] w-full rounded-full ${active ? "wb-flow-line" : "bg-[var(--wb-border2)]"}`} />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5 text-[var(--wb-text2)]"><span className="h-2 w-2 rounded-full" style={{ background: color }} />{label}</span>;
}

function Stat({ label, value, tone, highlight }: { label: string; value: string; tone: "green" | "amber" | "blue" | "orange"; highlight?: boolean }) {
  const c = tone === "green" ? "var(--wb-green)" : tone === "amber" ? "var(--wb-amber)" : tone === "blue" ? "var(--wb-blue)" : "var(--wb-orange)";
  return (
    <div className={`p-3 rounded-xl border ${highlight ? "border-[var(--wb-orange)]/30 bg-[var(--wb-orange-light)]" : "border-[var(--wb-border)] bg-[var(--wb-bg2)]"}`}>
      <div className="text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)]">{label}</div>
      <div className="text-[18px] font-bold mt-1" style={{ color: c }}>{value}</div>
    </div>
  );
}

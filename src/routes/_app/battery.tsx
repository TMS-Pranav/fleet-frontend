import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "../../components/wb/PageHeader";
import { KpiCard } from "../../components/wb/KpiCard";

export const Route = createFileRoute("/_app/battery")({
  component: Battery,
  head: () => ({ meta: [{ title: "Battery Health · WattBank EMS" }] }),
});

const racks = Array.from({ length: 8 }, (_, i) => ({
  rack: `R${i + 1}`,
  v: 51.2 + Math.random() * 0.8,
  soh: 96 + Math.random() * 3,
  temp: 28 + Math.random() * 8,
}));

const cells = Array.from({ length: 96 }, (_, i) => ({ id: i, v: 3.30 + Math.random() * 0.1, t: 26 + Math.random() * 12 }));

function Battery() {
  return (
    <>
      <PageHeader title="Battery Health" subtitle="Pack · racks · cells · thermal map" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="State of Health" value="98.4" unit="%" tone="green" delta="-0.2% / 90d" deltaDir="down" />
        <KpiCard label="Cycle Count" value="412" tone="navy" footer="Warranty 6,000 cycles" />
        <KpiCard label="Avg Cell Temp" value="32.4" unit="°C" tone="amber" delta="Within range" deltaDir="flat" />
        <KpiCard label="Imbalance Δ" value="0.018" unit="V" tone="blue" delta="Healthy <0.05V" deltaDir="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 mt-5">
        <div className="wb-card p-5">
          <h3 className="text-[15px] font-semibold mb-3">Rack Voltage & SoH</h3>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={racks}>
                <CartesianGrid stroke="var(--wb-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="rack" tick={{ fontSize: 11, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
                <Bar dataKey="soh" fill="var(--wb-green)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="wb-card p-5">
          <h3 className="text-[15px] font-semibold mb-1">Cell Thermal Map</h3>
          <p className="text-[11.5px] text-[var(--wb-text3)] mb-3">96 cells · color = temperature</p>
          <div className="grid grid-cols-12 gap-1">
            {cells.map((c) => {
              const norm = Math.min(1, Math.max(0, (c.t - 26) / 14));
              const color = norm < 0.5
                ? `color-mix(in oklab, var(--wb-green) ${(1 - norm * 2) * 100}%, var(--wb-amber))`
                : `color-mix(in oklab, var(--wb-amber) ${(2 - norm * 2) * 100}%, var(--wb-red))`;
              return (
                <div key={c.id} title={`Cell ${c.id + 1} · ${c.t.toFixed(1)}°C`}
                  className="aspect-square rounded-sm" style={{ background: color }} />
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 text-[10.5px] text-[var(--wb-text3)]">
            <span>26°C</span>
            <span className="flex-1 h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--wb-green), var(--wb-amber), var(--wb-red))" }} />
            <span>40°C+</span>
          </div>
        </div>
      </div>

      <div className="wb-card mt-5 overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--wb-border)] flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Rack Diagnostics</h3>
          <span className="text-[11px] text-[var(--wb-text3)]">8 racks · BMS v2.4.1</span>
        </div>
        <table className="w-full text-[13px]">
          <thead className="bg-[var(--wb-bg2)] text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)]">
            <tr><th className="px-5 py-2.5 text-left">Rack</th><th className="px-3 py-2.5 text-left">Voltage</th><th className="px-3 py-2.5 text-left">SoH</th><th className="px-3 py-2.5 text-left">Temp</th><th className="px-3 py-2.5 text-left">Status</th></tr>
          </thead>
          <tbody>
            {racks.map((r) => (
              <tr key={r.rack} className="border-t border-[var(--wb-border)] hover:bg-[var(--wb-bg2)]">
                <td className="px-5 py-3 font-semibold">{r.rack}</td>
                <td className="px-3 py-3 font-mono">{r.v.toFixed(2)} V</td>
                <td className="px-3 py-3"><span className="font-bold text-[var(--wb-green)]">{r.soh.toFixed(1)}%</span></td>
                <td className="px-3 py-3 font-mono">{r.temp.toFixed(1)} °C</td>
                <td className="px-3 py-3 text-[var(--wb-green)] text-[12px] font-semibold">● Nominal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

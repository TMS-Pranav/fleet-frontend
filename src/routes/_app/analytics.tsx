import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, RangeSelect } from "../../components/wb/PageHeader";
import { KpiCard } from "../../components/wb/KpiCard";

export const Route = createFileRoute("/_app/analytics")({
  component: Analytics,
  head: () => ({ meta: [{ title: "Analytics · WattBank EMS" }] }),
});

const monthly = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1}`,
  Solar: 320 + Math.random() * 90,
  Discharge: 110 + Math.random() * 60,
  Import: 60 + Math.random() * 40,
  Export: 30 + Math.random() * 30,
}));

const mix = [
  { name: "Solar Self-Use", value: 58, color: "var(--wb-amber)" },
  { name: "Battery", value: 22, color: "var(--wb-green)" },
  { name: "Grid Import", value: 15, color: "var(--wb-blue)" },
  { name: "Export", value: 5, color: "var(--wb-purple)" },
];

function Analytics() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Historical performance · Pune Unit 3" actions={<RangeSelect />} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="kWh Generated" value="3,847" unit="kWh" tone="orange" />
        <KpiCard label="Self-Consumption" value="82" unit="%" tone="green" />
        <KpiCard label="Grid Export" value="412" unit="kWh" tone="blue" />
        <KpiCard label="Round-trip Eff." value="94.2" unit="%" tone="navy" />
        <KpiCard label="Cycles" value="412" tone="purple" />
        <KpiCard label="Savings" value="₹1.12L" tone="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="wb-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold">Daily Energy Flow · Last 30 days</h3>
              <p className="text-[11.5px] text-[var(--wb-text3)]">Stacked kWh by source</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={monthly} margin={{ left: -10, right: 6, top: 6 }}>
                <CartesianGrid stroke="var(--wb-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                <Bar dataKey="Solar" stackId="a" fill="var(--wb-amber)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Discharge" stackId="a" fill="var(--wb-green)" />
                <Bar dataKey="Import" stackId="a" fill="var(--wb-blue)" />
                <Bar dataKey="Export" stackId="a" fill="var(--wb-purple)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="wb-card p-5">
          <h3 className="text-[15px] font-semibold mb-3">Energy Mix</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={mix} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {mix.map((m) => <Cell key={m.name} fill={m.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {mix.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2 text-[var(--wb-text2)]"><span className="h-2 w-2 rounded-full" style={{ background: m.color }} />{m.name}</span>
                <span className="font-semibold text-[var(--wb-text1)]">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wb-card p-5 mt-5">
        <h3 className="text-[15px] font-semibold mb-3">Tariff vs Self-Use · Cost per kWh</h3>
        <div className="h-[260px]">
          <ResponsiveContainer>
            <LineChart data={Array.from({ length: 24 }, (_, h) => ({ h: `${h}:00`, Tariff: 8 + (h >= 18 && h <= 22 ? 4.5 : 0), Effective: 4.2 + Math.random() * 0.8 }))}>
              <CartesianGrid stroke="var(--wb-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fill: "var(--wb-text3)" }} interval={2} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--wb-text3)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--wb-border)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
              <Line type="stepAfter" dataKey="Tariff" stroke="var(--wb-blue)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Effective" stroke="var(--wb-orange)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, ShieldCheck, BatteryCharging, Activity, Clock4 } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";

export const Route = createFileRoute("/_app/mode")({
  component: ModeControl,
  head: () => ({ meta: [{ title: "Mode Control · WattBank EMS" }] }),
});

const modes = [
  { id: "self", name: "Self-Consumption", desc: "Maximise solar self-use; battery absorbs surplus PV.", icon: Sun, color: "var(--wb-amber)" },
  { id: "peak", name: "Peak Shaving", desc: "Discharge battery to clip site demand above threshold.", icon: Activity, color: "var(--wb-purple)" },
  { id: "tou",  name: "TOU Arbitrage", desc: "Charge during off-peak, discharge during peak tariff.", icon: Clock4, color: "var(--wb-blue)" },
  { id: "back", name: "Backup Reserve", desc: "Hold ≥80% SoC for outage resilience.", icon: ShieldCheck, color: "var(--wb-green)" },
] as const;

function ModeControl() {
  const [active, setActive] = useState("tou");
  const [threshold, setThreshold] = useState(85);
  const [reserve, setReserve] = useState(20);

  return (
    <>
      <PageHeader title="Mode Control" subtitle="Operating mode · safety limits · scheduler" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.id;
          return (
            <button key={m.id} onClick={() => setActive(m.id)}
              className={`text-left wb-card p-5 transition relative ${isActive ? "ring-2 ring-offset-2 ring-[var(--wb-orange)]" : "hover:border-[var(--wb-border2)]"}`}>
              {isActive && <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[var(--wb-orange)] text-white tracking-wider">Active</span>}
              <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: `color-mix(in oklab, ${m.color} 14%, transparent)`, color: m.color }}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-[14px]">{m.name}</div>
              <div className="text-[11.5px] text-[var(--wb-text2)] mt-1 leading-snug">{m.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div className="wb-card p-5">
          <h3 className="text-[15px] font-semibold mb-1">Operating Limits</h3>
          <p className="text-[11.5px] text-[var(--wb-text3)] mb-4">Adjust thresholds — applied within 5 seconds.</p>

          <Slider label="Peak Shaving Threshold" unit="kW" value={threshold} max={150} setValue={setThreshold} accent="var(--wb-purple)" />
          <Slider label="Backup Reserve" unit="%" value={reserve} max={100} setValue={setReserve} accent="var(--wb-green)" />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Max Charge Rate" value="120 kW" />
            <Field label="Max Discharge Rate" value="150 kW" />
            <Field label="Min SoC" value="10 %" />
            <Field label="Max SoC" value="95 %" />
          </div>

          <div className="mt-5 flex gap-2">
            <button className="flex-1 h-10 rounded-lg wb-grad-orange text-white font-semibold text-[13px]">Apply Changes</button>
            <button className="h-10 px-4 rounded-lg border border-[var(--wb-border2)] text-[13px]">Discard</button>
          </div>
        </div>

        <div className="wb-card p-5">
          <h3 className="text-[15px] font-semibold mb-1">Mode Schedule · Today</h3>
          <p className="text-[11.5px] text-[var(--wb-text3)] mb-4">Auto-switching by time-of-day.</p>

          <div className="space-y-2">
            {[
              { t: "00:00 – 06:00", m: "TOU Charging", c: "var(--wb-blue)" },
              { t: "06:00 – 17:00", m: "Self-Consumption", c: "var(--wb-amber)" },
              { t: "17:00 – 22:00", m: "Peak Shaving", c: "var(--wb-purple)" },
              { t: "22:00 – 24:00", m: "Backup Reserve", c: "var(--wb-green)" },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--wb-bg2)]">
                <span className="h-2 w-2 rounded-full" style={{ background: s.c }} />
                <span className="font-mono text-[12px] text-[var(--wb-text2)] w-32">{s.t}</span>
                <span className="text-[13px] font-medium flex-1">{s.m}</span>
                <BatteryCharging className="h-4 w-4 text-[var(--wb-text3)]" />
              </div>
            ))}
          </div>

          <button className="mt-4 w-full h-9 rounded-lg border border-dashed border-[var(--wb-border2)] text-[12.5px] text-[var(--wb-text2)] hover:border-[var(--wb-orange)] hover:text-[var(--wb-orange)]">+ Add schedule slot</button>
        </div>
      </div>
    </>
  );
}

function Slider({ label, unit, value, max, setValue, accent }: { label: string; unit: string; value: number; max: number; setValue: (n: number) => void; accent: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-[12px] mb-2">
        <span className="text-[var(--wb-text2)] font-medium">{label}</span>
        <span className="font-bold" style={{ color: accent }}>{value} {unit}</span>
      </div>
      <input type="range" min={0} max={max} value={value} onChange={(e) => setValue(+e.target.value)}
        className="w-full accent-[var(--wb-orange)]" />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)]">
      <div className="text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)]">{label}</div>
      <div className="text-[14px] font-bold mt-1">{value}</div>
    </div>
  );
}

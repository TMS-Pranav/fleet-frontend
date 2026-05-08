import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Copy, Key } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";

export const Route = createFileRoute("/_app/api")({
  component: ApiConsole,
  head: () => ({ meta: [{ title: "API Console · WattBank EMS" }] }),
});

const endpoints = [
  { m: "GET",  p: "/v1/sites",                       d: "List all sites" },
  { m: "GET",  p: "/v1/sites/{id}/telemetry/live",   d: "Real-time KPIs" },
  { m: "GET",  p: "/v1/sites/{id}/battery/racks",    d: "Rack-level health" },
  { m: "POST", p: "/v1/sites/{id}/mode",             d: "Switch operating mode" },
  { m: "GET",  p: "/v1/events?since=...",            d: "Stream events/alarms" },
  { m: "POST", p: "/v1/reports/generate",            d: "Trigger report generation" },
];

const sample = `{
  "site_id": "pune-unit-3",
  "timestamp": "2026-05-08T08:42:14Z",
  "solar_kw": 78.4,
  "battery": { "soc_pct": 76, "rate_kw": 18.2, "state": "charging" },
  "grid_kw": -22.6,
  "load_kw": 38.5,
  "mode": "tou_arbitrage"
}`;

function ApiConsole() {
  const [active, setActive] = useState(1);

  return (
    <>
      <PageHeader title="API Console" subtitle="Test, document and integrate WattBank REST endpoints" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="wb-card p-3">
          <div className="px-2 py-1 wb-section-label">Endpoints</div>
          <div className="space-y-1 mt-1">
            {endpoints.map((e, i) => (
              <button key={e.p} onClick={() => setActive(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[12px] flex items-center gap-2 ${active === i ? "bg-[var(--wb-orange-tint)]" : "hover:bg-[var(--wb-bg2)]"}`}>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${e.m === "GET" ? "bg-[var(--wb-blue)]/15 text-[var(--wb-blue)]" : "bg-[var(--wb-orange)]/15 text-[var(--wb-orange-dark)]"}`}>{e.m}</span>
                <span className="font-mono text-[11.5px] truncate">{e.p}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="wb-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] font-bold px-2 py-1 rounded ${endpoints[active].m === "GET" ? "bg-[var(--wb-blue)] text-white" : "bg-[var(--wb-orange)] text-white"}`}>{endpoints[active].m}</span>
              <code className="font-mono text-[13px] text-[var(--wb-navy)] flex-1">{endpoints[active].p}</code>
              <button className="h-9 px-4 rounded-lg wb-grad-orange text-white text-[12.5px] font-semibold flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> Send</button>
            </div>
            <p className="text-[12.5px] text-[var(--wb-text2)]">{endpoints[active].d}</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Field label="Authorization" value="Bearer wb_live_••••••8a3f" />
              <Field label="Site ID" value="pune-unit-3" />
            </div>
          </div>

          <div className="wb-card overflow-hidden">
            <div className="px-5 py-2.5 border-b border-[var(--wb-border)] flex items-center justify-between bg-[var(--wb-bg2)]">
              <span className="text-[11.5px] font-semibold text-[var(--wb-text2)]">Response · 200 OK · 142 ms</span>
              <button className="text-[11px] text-[var(--wb-text2)] inline-flex items-center gap-1 hover:text-[var(--wb-orange)]"><Copy className="h-3 w-3" /> Copy</button>
            </div>
            <pre className="p-5 text-[12px] font-mono text-[var(--wb-navy)] bg-[var(--wb-navy-dark)]/[0.03] overflow-x-auto leading-relaxed">{sample}</pre>
          </div>

          <div className="wb-card p-5">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Key className="h-4 w-4 text-[var(--wb-orange)]" /> API Keys</h3>
            <div className="mt-3 space-y-2">
              {[{ env: "Production", key: "wb_live_••••••••••8a3f" }, { env: "Sandbox", key: "wb_test_••••••••••91b2" }].map((k) => (
                <div key={k.env} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)]">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--wb-navy)] text-white">{k.env}</span>
                  <code className="font-mono text-[12px] text-[var(--wb-text2)] flex-1">{k.key}</code>
                  <button className="text-[12px] font-semibold text-[var(--wb-orange)]">Rotate</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)] mb-1">{label}</div>
      <input defaultValue={value} className="w-full h-9 px-3 rounded-lg border border-[var(--wb-border2)] bg-white font-mono text-[12px]" />
    </div>
  );
}

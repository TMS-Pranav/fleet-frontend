import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Building2, Bell, Shield, Plug } from "lucide-react";
import { PageHeader } from "../../components/wb/PageHeader";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings · WattBank EMS" }] }),
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "site",    label: "Site",    icon: Building2 },
  { id: "notify",  label: "Alerts",  icon: Bell },
  { id: "security",label: "Security",icon: Shield },
  { id: "integ",   label: "Integrations", icon: Plug },
];

function Settings() {
  const [tab, setTab] = useState("profile");
  return (
    <>
      <PageHeader title="Settings" subtitle="Account, site configuration and integrations" />

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
        <div className="wb-card p-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 h-10 rounded-lg text-[13px] font-medium ${active ? "bg-[var(--wb-orange-tint)] text-[var(--wb-navy)]" : "text-[var(--wb-text2)] hover:bg-[var(--wb-bg2)]"}`}>
                <Icon className={`h-4 w-4 ${active ? "text-[var(--wb-orange-dark)]" : ""}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="wb-card p-6">
          {tab === "profile" && (
            <Section title="Profile" desc="Personal details used across the platform.">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full name" v="Aarav Sharma" />
                <Input label="Email" v="aarav@kalpapower.com" />
                <Input label="Role" v="Energy Engineer" />
                <Input label="Phone" v="+91 98xxxxxxxx" />
              </div>
            </Section>
          )}
          {tab === "site" && (
            <Section title="Site Configuration" desc="Settings specific to Pune Unit 3.">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Site name" v="Pune Unit 3" />
                <Input label="Capacity (kWh)" v="500" />
                <Input label="Tariff (peak)" v="₹ 12.50 / kWh" />
                <Input label="Tariff (off-peak)" v="₹ 6.20 / kWh" />
                <Input label="DISCOM" v="MSEDCL" />
                <Input label="CIN" v="U40109MH2018PTC123456" />
              </div>
            </Section>
          )}
          {tab === "notify" && (
            <Section title="Alert Channels" desc="Where critical alarms are routed.">
              {[
                { l: "Email digest (daily)", on: true },
                { l: "SMS for critical alarms", on: true },
                { l: "Push notifications (web)", on: true },
                { l: "Slack #ops-pune-3", on: false },
                { l: "PagerDuty escalation", on: false },
              ].map((c) => <Toggle key={c.l} label={c.l} on={c.on} />)}
            </Section>
          )}
          {tab === "security" && (
            <Section title="Security" desc="Account & access controls.">
              <Input label="Password" v="••••••••••" />
              <Toggle label="Two-factor authentication (TOTP)" on />
              <Toggle label="Single Sign-On (SAML)" on={false} />
              <Toggle label="API key access" on />
            </Section>
          )}
          {tab === "integ" && (
            <Section title="Integrations" desc="External systems connected to WattBank EMS.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { n: "SCADA / Modbus TCP", s: "Connected" },
                  { n: "OpenADR 2.0b", s: "Connected" },
                  { n: "IoT Gateway · MQTT", s: "Connected" },
                  { n: "ERP (SAP)", s: "Disconnected" },
                ].map((i) => (
                  <div key={i.n} className="p-3 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)] flex items-center justify-between">
                    <div className="font-semibold text-[13px]">{i.n}</div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${i.s === "Connected" ? "bg-[var(--wb-green)]/15 text-[var(--wb-green)]" : "bg-[var(--wb-text3)]/15 text-[var(--wb-text3)]"}`}>{i.s}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <div className="mt-6 flex gap-2 pt-5 border-t border-[var(--wb-border)]">
            <button className="h-10 px-5 rounded-lg wb-grad-orange text-white font-semibold text-[13px]">Save changes</button>
            <button className="h-10 px-5 rounded-lg border border-[var(--wb-border2)] text-[13px]">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold">{title}</h3>
      <p className="text-[12.5px] text-[var(--wb-text3)] mb-5">{desc}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-wider text-[var(--wb-text3)] mb-1">{label}</div>
      <input defaultValue={v} className="w-full h-10 px-3 rounded-lg border border-[var(--wb-border2)] bg-white text-[13px] focus:border-[var(--wb-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-orange)]/30" />
    </div>
  );
}

function Toggle({ label, on }: { label: string; on: boolean }) {
  const [v, setV] = useState(on);
  return (
    <label className="flex items-center justify-between p-3 rounded-lg bg-[var(--wb-bg2)] border border-[var(--wb-border)] cursor-pointer">
      <span className="text-[13px] font-medium">{label}</span>
      <button type="button" onClick={() => setV(!v)}
        className={`relative h-5 w-9 rounded-full transition ${v ? "bg-[var(--wb-orange)]" : "bg-[var(--wb-border2)]"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${v ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}

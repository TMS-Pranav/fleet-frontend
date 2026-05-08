import { Bell, Search, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 h-14 bg-[var(--wb-navy)] text-white flex items-center px-6 gap-6 border-b border-[var(--wb-navy-dark)]">
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-lg bg-white/10 p-1 flex items-center justify-center">
          <img
            src="https://solar.twaritmobility.com/assets/images/KalpaLogo.png"
            alt="Kalpa Power"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-wide">WattBank EMS</div>
          <img
            src="https://solar.twaritmobility.com/assets/images/KalpaLogo.png"
            alt="Kalpa Power"
            className="h-3.5 w-auto object-contain"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 ml-4 px-3 h-9 rounded-lg bg-white/8 border border-white/10 w-72">
        <Search className="h-3.5 w-3.5 text-white/60" />
        <input
          placeholder="Search sites, alarms, devices…"
          className="bg-transparent outline-none text-[13px] placeholder:text-white/45 flex-1"
        />
        <kbd className="text-[10px] text-white/50 border border-white/15 rounded px-1.5">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/8 hover:bg-white/12 text-[12px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--wb-green)] wb-pulse" />
          Pune Unit 3
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </button>
        <button className="relative h-9 w-9 rounded-lg bg-white/8 hover:bg-white/12 flex items-center justify-center">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-[var(--wb-amber)] text-[9px] font-bold flex items-center justify-center">
            3
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--wb-orange)] to-[var(--wb-orange-dark)] flex items-center justify-center text-[12px] font-semibold">
          AS
        </div>
      </div>
    </header>
  );
}

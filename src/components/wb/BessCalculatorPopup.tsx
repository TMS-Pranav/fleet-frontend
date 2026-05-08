import { useState } from "react";
import { X, ChevronDown, ChevronUp, Calculator } from "lucide-react";

export function BessCalculatorPopup() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);

  return (
    <>
      {/* Floating toggle button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimised(false); }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 h-13 px-4 rounded-2xl shadow-2xl text-white font-semibold text-[13px] transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #F47920, #FF9040)",
            boxShadow: "0 6px 32px rgba(244,121,32,0.45)",
          }}
          title="Open BESS Sizing Calculator"
        >
          <span className="text-[18px]">🔋</span>
          BESS Calculator
        </button>
      )}

      {/* Popup panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: minimised ? 320 : 900,
            height: minimised ? "auto" : "82vh",
            maxWidth: "calc(100vw - 48px)",
            maxHeight: "calc(100vh - 48px)",
            transition: "width 0.25s ease, height 0.25s ease",
            boxShadow: "0 12px 60px rgba(0,0,0,0.45)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0D1F35, #142840)" }}
          >
            <span className="text-[18px]">🔋</span>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-[14px] leading-tight">
                WattBank BESS Sizing Calculator
              </div>
              {!minimised && (
                <div className="text-[11px] text-white/50 leading-tight">
                  Kalpa Power · Energy Intelligence
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimised((v) => !v)}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
                title={minimised ? "Expand" : "Minimise"}
              >
                {minimised ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* iFrame body */}
          {!minimised && (
            <iframe
              src="/bess_calculator.html"
              title="BESS Sizing Calculator"
              className="flex-1 w-full border-0"
              style={{ background: "#07111E" }}
              allow="same-origin"
            />
          )}
        </div>
      )}
    </>
  );
}

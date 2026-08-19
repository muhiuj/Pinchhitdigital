import { CalendarCheck2 } from "lucide-react";

// Floating collage cards in the hero (desktop only, pure HTML/CSS, no
// images). One card per ICP: construction (missed-call text-back),
// professional services insurance-first (booked consultation), restaurants
// (answered bid-request chip). Gentle float loop via .phd-float;
// rotation lives on the outer wrapper so it composes with the translate.

export function HeroCollage() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
      {/* Left: missed-call SMS card (construction) */}
      <div className="absolute left-[max(2%,16px)] top-24 w-[264px] -rotate-3">
        <div className="phd-float" style={{ "--float-dur": "5.2s" } as React.CSSProperties}>
          <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-xl">
            <div className="flex items-center justify-between bg-ink-900 px-3.5 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cream-50">
                Missed call
              </span>
              <span className="font-mono text-[10px] text-cream-50/70">4:52 PM</span>
            </div>
            <div className="flex flex-col gap-2 p-3.5">
              <p className="max-w-[92%] self-end rounded-[10px] rounded-br-[2px] bg-teal-600 px-3 py-2 font-sans text-[12.5px] leading-snug text-white">
                Sorry we missed your call, how can we help.
              </p>
              <p className="max-w-[92%] rounded-[10px] rounded-bl-[2px] bg-cream-100 px-3 py-2 font-sans text-[12.5px] leading-snug text-ink-900">
                I need a quote for replacing shingles from some hail damage
                over the weekend.
              </p>
              <p className="max-w-[92%] self-end rounded-[10px] rounded-br-[2px] bg-teal-600 px-3 py-2 font-sans text-[12.5px] leading-snug text-white">
                Reply with your name and our office manager will call you in 5
                minutes.
              </p>
            </div>
          </div>
          <span className="mt-2.5 inline-flex items-center gap-2 rounded-full border-2 border-ink-900 bg-sun-400 py-1 pl-1 pr-3.5 shadow-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 font-display text-[10px] font-bold text-cream-50">
              AR
            </span>
            <span className="font-display text-[12px] font-bold text-ink-900">
              ABC Roofing
            </span>
          </span>
        </div>
      </div>

      {/* Right: booked-consultation card (insurance) */}
      <div className="absolute right-[max(2%,16px)] top-16 w-[280px] rotate-[2.5deg]">
        <div className="phd-float" style={{ "--float-dur": "6.4s" } as React.CSSProperties}>
          <div className="rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-ink-900 text-cream-50">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em]">Tue</span>
                <span className="font-display text-[17px] font-bold leading-none">14</span>
              </span>
              <div>
                <p className="font-display text-[13.5px] font-bold text-ink-900">
                  New client &middot; policy review
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
                  Tomorrow, 10:30 AM
                </p>
              </div>
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 font-sans text-[12px] font-semibold text-teal-700">
              <CalendarCheck2 size={13} />
              Intake form already completed
            </p>
          </div>
          <span className="mt-2.5 inline-flex items-center gap-2 rounded-full border-2 border-ink-900 bg-teal-400 py-1 pl-1 pr-3.5 shadow-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 font-display text-[10px] font-bold text-cream-50">
              IA
            </span>
            <span className="font-display text-[12px] font-bold text-ink-900">
              Insurance Agency
            </span>
          </span>
        </div>
      </div>

      {/* Right, below the booked card: answered bid-request chip
          (construction). Kept high enough to clear the DFW chips row. */}
      <div className="absolute right-[max(3%,20px)] top-[420px] -rotate-[1.5deg]">
        <div className="phd-float" style={{ "--float-dur": "5.9s" } as React.CSSProperties}>
          <div className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 shadow-lg">
            <p className="font-display text-[12.5px] font-bold text-ink-900">
              Bid request <span className="text-teal-600">&rarr; answered in 3 min</span>
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
              Friday 4:52 PM, crew on site
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

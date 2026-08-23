import { AFTER_HOURS } from "@/lib/case-studies";

// After-hours comparison: the trades' phones against the insurance
// industry's, same evening hour. Same soft navy card pair as part one's
// TwoDoors. Navy #1A1F36, teal #4ECDC4, neutral grays only.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";

export function AfterHours() {
  return (
    <section className="px-[clamp(16px,5vw,40px)]">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {AFTER_HOURS.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl">
          {AFTER_HOURS.heading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {[AFTER_HOURS.a, AFTER_HOURS.b].map((side, i) => (
            <div
              key={side.label}
              className="rounded-3xl p-7 sm:p-8"
              style={{ backgroundColor: NAVY }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
                {side.label}
              </p>
              <p
                className="mt-3 font-display text-6xl font-extrabold tracking-[-0.02em] sm:text-7xl"
                style={{ color: i === 0 ? TEAL : "#9aa1ad" }}
              >
                {side.value}
              </p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-white/75">
                {side.caption}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-[62ch] font-sans text-[15px] leading-relaxed text-ink-600">
          {AFTER_HOURS.caption}
        </p>
      </div>
    </section>
  );
}

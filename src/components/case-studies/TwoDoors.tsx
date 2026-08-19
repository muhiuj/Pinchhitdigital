import { TWO_DOORS } from "@/lib/case-studies";

// "Same industry, two doors" — the form's median wait against the phone's
// fastest callback. Two soft navy cards, one comparison, no chart.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";

export function TwoDoors() {
  return (
    <section className="px-[clamp(16px,5vw,40px)]">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {TWO_DOORS.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl">
          {TWO_DOORS.heading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {[TWO_DOORS.a, TWO_DOORS.b].map((side, i) => (
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
                style={{ color: i === 0 ? "#9aa1ad" : TEAL }}
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
          {TWO_DOORS.caption}
        </p>
      </div>
    </section>
  );
}

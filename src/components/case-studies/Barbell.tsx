import { BARBELL } from "@/lib/case-studies";

// The contractor study's signature figure: the barbell. One dot per
// company, same vocabulary as part one's timeline (teal filled dot = a
// human responded, hollow gray dot = silence), grouped into the two ends
// of the distribution with a deliberately empty middle. Pure HTML/CSS,
// no chart library. Navy #1A1F36, teal #4ECDC4, neutral grays only.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";
const DOT = 15;

function Dots({ count, filled }: { count: number; filled: boolean }) {
  return (
    <div className="mt-5 flex max-w-[300px] flex-wrap gap-2">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: DOT,
            height: DOT,
            backgroundColor: filled ? TEAL : "transparent",
            border: filled ? "none" : "2px solid rgba(255,255,255,0.35)",
          }}
        />
      ))}
    </div>
  );
}

export function Barbell() {
  return (
    <section className="px-[clamp(16px,5vw,40px)]" aria-label="Response distribution for all 49 contractors">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {BARBELL.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
          {BARBELL.heading}
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-base leading-relaxed text-ink-700 sm:text-[17px]">
          {BARBELL.intro}
        </p>

        <div
          className="mt-8 rounded-3xl p-7 sm:p-10"
          style={{ backgroundColor: NAVY }}
        >
          <div className="grid items-stretch gap-8 md:grid-cols-[1fr_auto_1.35fr] md:gap-6">
            {/* Fast end */}
            <div>
              <p
                className="font-display text-5xl font-extrabold tracking-[-0.02em] sm:text-6xl"
                style={{ color: TEAL }}
              >
                {BARBELL.fast.count}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
                {BARBELL.fast.label}
              </p>
              <Dots count={BARBELL.fast.count} filled />
              <p className="mt-4 max-w-[30ch] font-sans text-[13px] leading-relaxed text-white/60">
                {BARBELL.fast.caption}
              </p>
            </div>

            {/* The empty middle */}
            <div className="flex items-center justify-center md:px-2">
              <div className="flex w-full items-center gap-3 md:h-full md:w-auto md:flex-col md:py-4">
                <span className="h-px flex-1 border-t border-dashed border-white/25 md:h-auto md:w-px md:flex-1 md:border-l md:border-t-0" />
                <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 md:[writing-mode:vertical-rl]">
                  {BARBELL.middle}
                </p>
                <span className="h-px flex-1 border-t border-dashed border-white/25 md:h-auto md:w-px md:flex-1 md:border-l md:border-t-0" />
              </div>
            </div>

            {/* Silent end */}
            <div>
              <p className="font-display text-5xl font-extrabold tracking-[-0.02em] text-[#9aa1ad] sm:text-6xl">
                {BARBELL.never.count}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
                {BARBELL.never.label}
              </p>
              <Dots count={BARBELL.never.count} filled={false} />
              <p className="mt-4 max-w-[34ch] font-sans text-[13px] leading-relaxed text-white/60">
                {BARBELL.never.caption}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink-500">
          {BARBELL.footnote}
        </p>
      </div>
    </section>
  );
}

import { REPORT } from "@/lib/catering";
import ScrollReveal from "@/components/ScrollReveal";
import { CountUp } from "./CountUp";
import { Eyebrow, Section } from "./primitives";

// 06 · You see the money, every month. A plain-English revenue-gap report.
// The recovered figure counts up on enter.

export function RevenueReport() {
  return (
    <Section id="report" tone="surface">
      <Eyebrow n="06" label="You see the money, every month" />
      <h2 className="mt-5 max-w-[20ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {REPORT.h2}
      </h2>
      <p className="mt-5 max-w-[62ch] font-sans text-base leading-relaxed text-body">
        {REPORT.body}
      </p>

      <ScrollReveal className="mt-10">
        <div className="rounded-[14px] border border-white/[0.06] bg-card p-7 md:p-10">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-teal-400">
              Revenue-gap report
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-body-dim">
              {REPORT.period}
            </span>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-body-dim">
                Recovered this month
              </p>
              <div
                className="mt-2 font-display font-extrabold leading-none tracking-[-0.03em] text-sun-400"
                style={{ fontSize: "clamp(56px, 11vw, 104px)" }}
              >
                <CountUp to={REPORT.recovered} prefix="$" />
              </div>
              <p className="mt-4 max-w-[34ch] font-sans text-base leading-relaxed text-body">
                {REPORT.recoveredLine}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 self-center md:grid-cols-1 md:gap-8">
              {REPORT.stats.map((s) => (
                <div key={s.label} className="border-l-2 border-teal-400/30 pl-4">
                  <div className="font-display text-2xl font-bold text-cream-50 md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wide text-body-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}

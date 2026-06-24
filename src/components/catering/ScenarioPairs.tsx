import { SCENARIOS, SCENARIOS_SECTION } from "@/lib/catering";
import ScrollReveal from "@/components/ScrollReveal";
import { Eyebrow, Section } from "./primitives";

// 02 · The same inquiry, two endings. Each scenario states the moment, then
// the two outcomes side by side: without a system (coral) and with the system
// (teal). Stacks on mobile.

export function ScenarioPairs() {
  return (
    <Section id="scenarios" tone="canvas">
      <Eyebrow n="02" label="The same inquiry, two endings" />
      <h2 className="mt-5 max-w-[20ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {SCENARIOS_SECTION.h2}
      </h2>
      <p className="mt-5 max-w-[56ch] font-sans text-base leading-relaxed text-body">
        {SCENARIOS_SECTION.intro}
      </p>

      <div className="mt-12 space-y-5">
        {SCENARIOS.map((s, i) => (
          <ScrollReveal key={i} delayMs={i * 80}>
            <div className="rounded-[14px] border border-white/[0.06] bg-card p-6 md:p-8">
              <p className="font-display text-lg font-bold leading-snug tracking-[-0.01em] text-cream-50">
                {s.head}
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {/* Without a system */}
                <div className="rounded-xl border border-coral/20 bg-coral/[0.05] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-coral">
                    {SCENARIOS_SECTION.labelWithout}
                  </p>
                  <p className="mt-3 font-sans text-base leading-relaxed text-body">
                    {s.without}
                  </p>
                </div>

                {/* With the system */}
                <div className="rounded-xl border border-teal-400/25 bg-teal-400/[0.06] p-5">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-teal-400">
                    {SCENARIOS_SECTION.labelWith}
                    {s.withMeta && (
                      <span className="text-body-dim">· {s.withMeta}</span>
                    )}
                  </p>
                  <p className="mt-3 font-sans text-base font-medium leading-relaxed text-cream-50">
                    {s.with}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

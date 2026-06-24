import { COST } from "@/lib/catering";
import ScrollReveal from "@/components/ScrollReveal";
import { CountUp } from "./CountUp";
import { Eyebrow, Section } from "./primitives";

// 01 · The cost of a slow reply. Three display figures are the visual anchors.
// All three share one font size and sit on a single line, so they're the same
// height and every body paragraph below them starts on the same baseline,
// left-aligned. The middle column is widened so "Under 5 minutes" fits on one
// line at that shared size. Colors carry meaning: coral = the loss, teal = the
// system's speed, sun = the money.
const ACCENTS = ["text-coral", "text-teal-400", "text-sun-400"] as const;
const FIGURE_SIZE = "clamp(36px, 6vw, 60px)";

export function CostStats() {
  return (
    <Section id="cost" tone="surface" divider={false}>
      <Eyebrow n="01" label="The cost of a slow reply" />
      <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {COST.h2}
      </h2>

      <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-[0.85fr_1.55fr_0.85fr]">
        {COST.stats.map((stat, i) => (
          <ScrollReveal key={i} delayMs={i * 90}>
            <div className="text-left">
              <div
                className={`whitespace-nowrap font-display font-extrabold leading-none tracking-[-0.03em] ${ACCENTS[i]}`}
                style={{ fontSize: FIGURE_SIZE }}
              >
                {stat.value === null ? (
                  stat.displayText
                ) : (
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="mt-5 max-w-[40ch] font-sans text-base leading-relaxed text-body">
                {stat.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <p className="mt-16 max-w-[68ch] font-sans text-lg leading-relaxed text-cream-2">
        {COST.closing}
      </p>
    </Section>
  );
}

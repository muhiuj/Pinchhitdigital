import { Eyebrow, Section } from "@/components/catering/primitives";
import { LEAK } from "@/lib/webinars";

// 01 · The leak, in numbers. Three sourced stats, each linking its
// third-party source. Copy verbatim from the final copy doc.

export function TheLeak() {
  return (
    <Section id="the-leak" tone="surface">
      <Eyebrow n="01" label="The cost of a missed call" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {LEAK.h2}
      </h2>
      <p className="mt-5 max-w-[62ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {LEAK.lede}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {LEAK.stats.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-card p-6"
          >
            <p className="font-display text-5xl font-extrabold tracking-[-0.02em] text-sun-400">
              {stat.value}
            </p>
            <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-body">
              {stat.label}
            </p>
            <a
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-body-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-teal-400"
            >
              {stat.sourceName}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {LEAK.closing}
      </p>
    </Section>
  );
}

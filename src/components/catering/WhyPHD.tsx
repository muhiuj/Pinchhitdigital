import { WHY_PHD } from "@/lib/catering";
import ScrollReveal from "@/components/ScrollReveal";
import { Eyebrow, Section } from "./primitives";

// 07 · Why Pinch Hit Digital (merged founder note + trust cards). The founder
// lead-in carries the "one person who answers" promise; the four cards back it.

export function WhyPHD() {
  return (
    <Section id="why" tone="canvas">
      <Eyebrow n="07" label="Why Pinch Hit Digital" />
      <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {WHY_PHD.h2}
      </h2>

      <ScrollReveal className="mt-8">
        <div className="max-w-2xl">
          <p className="font-sans text-base leading-relaxed text-body">
            {WHY_PHD.founderLeadIn}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-teal-400 font-display text-base font-extrabold text-ink-900">
              JM
            </span>
            <div>
              <p className="font-display text-sm font-bold text-cream-50">
                {WHY_PHD.founderName}
              </p>
              <p className="font-mono text-xs uppercase tracking-wide text-body-dim">
                {WHY_PHD.founderTitle}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {WHY_PHD.cards.map((card, i) => (
          <ScrollReveal key={card.title} delayMs={(i % 2) * 80}>
            <div className="h-full rounded-[14px] border border-white/[0.06] bg-card p-7">
              <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-cream-50">
                {card.title}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-body">
                {card.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

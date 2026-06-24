import { WHY_WORKS } from "@/lib/catering";
import ScrollReveal from "@/components/ScrollReveal";
import { Eyebrow, Section } from "./primitives";

// 03 · Why this works (new teaching section). Three plain-language mechanisms:
// answer first, attention vs. effort, and what an integration actually is.
// This is the section that makes the reader smarter, so it reads as a short
// lesson: a numbered idea, a bold claim, then the explanation.

export function WhyThisWorks() {
  return (
    <Section id="why-this-works" tone="surface">
      <Eyebrow n="03" label="Why this works" />
      <h2 className="mt-5 max-w-[24ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {WHY_WORKS.h2}
      </h2>
      <p className="mt-5 max-w-[58ch] font-sans text-base leading-relaxed text-body">
        {WHY_WORKS.leadIn}
      </p>

      <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {WHY_WORKS.blocks.map((block, i) => (
          <ScrollReveal key={i} delayMs={i * 80}>
            <div className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[auto_1fr]">
              <span className="font-mono text-sm text-teal-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="max-w-[40ch] font-display text-xl font-bold leading-snug tracking-[-0.01em] text-cream-50">
                  {block.title}
                </h3>
                <p className="mt-3 max-w-[68ch] font-sans text-base leading-relaxed text-body">
                  {block.body}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

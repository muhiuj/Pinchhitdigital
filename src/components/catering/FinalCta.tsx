import { FINAL_CTA } from "@/lib/catering";
import { CateringCTA } from "./CateringCTA";

// 09 · Final CTA — the yellow closing section. Single dominant action: book the
// free 30-minute Revenue Audit.

export function FinalCta() {
  return (
    <section
      id="book"
      className="border-t border-black/10 bg-sun-400 px-[clamp(16px,5vw,40px)] py-[clamp(64px,10vw,112px)]"
    >
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-900/60">
            {FINAL_CTA.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink-900 md:text-5xl">
            {FINAL_CTA.h2}
          </h2>
          <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-ink-900/80">
            {FINAL_CTA.body}
          </p>
        </div>
        <div className="md:justify-self-end">
          <CateringCTA
            section="final"
            label={FINAL_CTA.cta}
            micro={FINAL_CTA.ctaMicro}
            variant="onYellow"
          />
        </div>
      </div>
    </section>
  );
}

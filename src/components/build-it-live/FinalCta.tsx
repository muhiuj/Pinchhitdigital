"use client";

import posthog from "posthog-js";
import { FINAL_CTA } from "@/lib/webinars";

// Closing CTA per the Session 002 prompt: one line, one button back to the
// hero form. Amber band with the house grid texture.

export function FinalCta() {
  return (
    <section className="phd-hero-grid border-t border-black/10 bg-sun-400 px-[clamp(16px,5vw,40px)] py-[clamp(64px,10vw,112px)]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-[26ch] font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-4xl">
          {FINAL_CTA.line}
        </h2>
        <a
          href="#register"
          onClick={() => {
            try {
              posthog.capture("cta_click", { section: "final" });
            } catch {
              /* no-op */
            }
          }}
          className="inline-flex min-h-[52px] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-8 font-display text-base font-bold text-cream-50 transition-colors hover:bg-ink-800"
        >
          {FINAL_CTA.cta}
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}

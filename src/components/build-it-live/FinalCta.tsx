"use client";

import posthog from "posthog-js";
import { BOOKING_URL, FINAL_CTA } from "@/lib/webinars";

// Final CTA: yellow closing section, sibling of the catering page's.
// Primary action scrolls back to the hero form; the one secondary link is
// the free 30-minute Revenue Audit (the page's only other CTA, 9X p.12).
// Chain line for next month is in the body copy (9X p.11).

function capture(section: string) {
  try {
    posthog.capture("cta_click", { section });
  } catch {
    /* no-op */
  }
}

interface FinalCtaProps {
  /** e.g. "August 4" — from the live session row, falling back to the static copy. */
  dateShort?: string;
}

export function FinalCta({ dateShort = "August 4" }: FinalCtaProps = {}) {
  return (
    <section className="border-t border-black/10 bg-sun-400 px-[clamp(16px,5vw,40px)] py-[clamp(64px,10vw,112px)]">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-900/60">
            {FINAL_CTA.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink-900 md:text-5xl">
            One leak gets fixed on {dateShort}.
          </h2>
          <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-ink-900/80">
            {FINAL_CTA.body}
          </p>
        </div>
        <div className="md:justify-self-end">
          <a
            href="#register"
            onClick={() => capture("final")}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink-900 px-8 font-display text-base font-bold text-cream-50 transition-colors hover:bg-ink-800"
          >
            {FINAL_CTA.cta}
            <span aria-hidden="true">↑</span>
          </a>
          <p className="mt-4 max-w-[36ch] font-sans text-[14px] leading-relaxed text-ink-900/75">
            {FINAL_CTA.auditLead}{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => capture("final-audit")}
              className="font-semibold underline decoration-ink-900/40 underline-offset-4 hover:decoration-ink-900"
            >
              {FINAL_CTA.auditLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

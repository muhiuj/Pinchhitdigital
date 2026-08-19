"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { BOOKING_URL, CTA } from "@/lib/case-studies";

// Single calm CTA at the end of the study: one headline, one button, and
// the one quiet Build It Live link the spec allows. No email capture, no
// popups. cta_click carries a section label per the site-wide convention.

function capture(section: string) {
  try {
    posthog.capture("cta_click", { section });
  } catch {
    /* no-op */
  }
}

export function StudyCta() {
  return (
    <section className="border-t border-ink-900/10 bg-cream-100 px-[clamp(16px,5vw,40px)] py-[clamp(64px,10vw,112px)]">
      <div className="mx-auto w-full max-w-[720px] text-center">
        <h2 className="mx-auto max-w-[26ch] font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-4xl">
          {CTA.heading}
        </h2>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => capture("case-study-final")}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink-900 px-8 font-display text-base font-bold text-cream-50 transition-colors hover:bg-teal-700"
        >
          {CTA.button}
          <span aria-hidden="true">→</span>
        </a>
        <p className="mt-6 font-sans text-[14px] text-ink-600">
          <Link
            href="/build-it-live"
            onClick={() => capture("case-study-build-it-live")}
            className="underline decoration-ink-900/30 underline-offset-4 transition-colors hover:decoration-ink-900"
          >
            {CTA.buildItLiveLink}
          </Link>
        </p>
      </div>
    </section>
  );
}

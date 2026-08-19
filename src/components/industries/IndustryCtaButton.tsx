"use client";

import posthog from "posthog-js";
import { BOOKING_URL } from "@/lib/audit";

// Booking CTA for industry landing pages. cta_click carries a section label
// per the site-wide convention ("industry-<slug>-<placement>").

export function IndustryCtaButton({
  label,
  section,
  variant = "dark",
}: {
  label: string;
  section: string;
  variant?: "dark" | "light";
}) {
  const cls =
    variant === "dark"
      ? "inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-ink-900 px-7 font-display text-[14px] font-bold tracking-[0.02em] text-cream-50 transition-colors hover:bg-teal-700"
      : "inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-cream-50 px-7 font-display text-[14px] font-bold tracking-[0.02em] text-ink-900 transition-colors hover:bg-sun-400";

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          posthog.capture("cta_click", { section });
        } catch {
          /* no-op */
        }
      }}
      className={cls}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}

"use client";

import posthog from "posthog-js";
import { BOOKING_URL } from "@/lib/catering";

// Every primary "Get my free Revenue Audit" button on /catering. Fires a
// cta_click event tagged with the section it lives in (spec §6) so we can
// see which part of the page drives bookings, then opens the live calendar
// in a new tab. Decision per build handoff: direct-to-calendar.

interface CateringCTAProps {
  section: string;
  label: string;
  micro?: string;
  /** "primary" = sun-400 pill on dark; "onYellow" = ink pill on the yellow CTA section. */
  variant?: "primary" | "onYellow";
  className?: string;
}

export function CateringCTA({
  section,
  label,
  micro,
  variant = "primary",
  className = "",
}: CateringCTAProps) {
  const pill =
    variant === "onYellow"
      ? "bg-ink-900 text-cream-50 hover:bg-ink-800"
      : "bg-sun-400 text-ink-900 hover:bg-sun-300";

  return (
    <div className={`flex flex-col items-start gap-2.5 ${className}`}>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          // Guarded: posthog may be uninitialized in some environments.
          try {
            posthog.capture("cta_click", { section });
          } catch {
            /* no-op */
          }
        }}
        className={`group inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-7 py-3.5 font-display text-[15px] font-bold tracking-[0.01em] transition-colors ${pill}`}
      >
        {label}
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </a>
      {micro && (
        <span
          className={`pl-1 font-mono text-xs tracking-wide ${
            variant === "onYellow" ? "text-ink-900/70" : "text-body-dim"
          }`}
        >
          {micro}
        </span>
      )}
    </div>
  );
}

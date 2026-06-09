"use client";

/**
 * Mobile-only sticky "Book a Free Audit" bar for /plans. Stays hidden until
 * the user scrolls past the first pricing card, then slides up from the
 * bottom so the action is always one tap away on small screens. Desktop
 * never shows it (the cards keep their own CTAs in view).
 *
 * Reveal is driven by an IntersectionObserver on a sentinel element the page
 * renders right after the first card — when that sentinel scrolls up out of
 * the viewport, the bar appears; when it scrolls back into view, it hides.
 */
import { useEffect, useState } from "react";
import { CAL_URL, CTA_LABEL } from "@/lib/plans";

export default function PlansStickyCTA({
  sentinelId,
}: {
  sentinelId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the bar only once the sentinel has scrolled up past the top
        // of the viewport — not when it's still below the fold on first load.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-cream-50/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
        tabIndex={visible ? 0 : -1}
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}

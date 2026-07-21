"use client";

import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { STICKY_CTA } from "@/lib/webinars";

// Sticky bottom CTA bar on mobile, same pattern as the catering page, but
// the action here is registration: it scrolls back to the hero form instead
// of linking out to cal.com. Hidden on desktop.

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#register"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          try {
            posthog.capture("cta_click", { section: "sticky" });
          } catch {
            /* no-op */
          }
        }}
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sun-400 px-6 font-display text-[15px] font-bold text-ink-900"
      >
        {STICKY_CTA.label}
        <span aria-hidden="true">↑</span>
      </a>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ENGAGEMENT } from "@/lib/catering";
import { Eyebrow, Section } from "./primitives";

// 05 · What working with us looks like (merged engagement steps + the old
// week-by-week timeline). Three steps, audit then build then live, with a
// connector that draws left→right once the row scrolls into view. Reduced
// motion shows the line fully drawn immediately.

export function WorkingTogether() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Section id="how-it-works" tone="canvas">
      <Eyebrow n="05" label="What working with us looks like" />
      <h2 className="mt-5 max-w-[20ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {ENGAGEMENT.h2}
      </h2>
      <p className="mt-5 max-w-[60ch] font-sans text-base leading-relaxed text-body">
        {ENGAGEMENT.leadIn}
      </p>

      <div ref={ref} className="relative mt-14">
        {/* Connector line (desktop) — drawn L→R on reveal. */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-teal-400/50 to-sun-400/50 md:block"
          style={{
            transform: drawn ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1200ms var(--phd-ease-out)",
          }}
        />

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {ENGAGEMENT.steps.map((step) => (
            <li key={step.n} className="relative">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-card font-mono text-sm text-teal-400">
                {step.n}
              </span>
              <h3 className="mt-5 max-w-[24ch] font-display text-lg font-bold leading-snug tracking-[-0.01em] text-cream-50">
                {step.title}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-body">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

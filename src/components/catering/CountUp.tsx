"use client";

import { useEffect, useRef, useState } from "react";

// Counts from 0 → `to` once, the first time it scrolls into view (spec: stat
// numbers "count up once on enter"). Respects prefers-reduced-motion by
// jumping straight to the final value. Renders an aria-hidden animated value
// with an sr-only final value so screen readers hear the real number.

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  durationMs = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      // easeOutCubic for a confident settle.
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}

"use client";

/**
 * Bottom-of-post CTA that animates in via IntersectionObserver as it enters
 * the viewport. One-shot (disconnects after first trigger so it doesn't
 * re-animate on every scroll past). Respects prefers-reduced-motion by
 * skipping the animation entirely.
 */
import { useEffect, useRef, useState } from "react";

export default function PostCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honor the user's reduced-motion preference — show the card immediately
    // with no transform so motion-sensitive users aren't surprised by it.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // One-shot: stop observing after the first reveal so scrolling
          // past doesn't re-trigger the fade.
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-ink-800 bg-ink-900 p-8 text-center shadow-lg transition-all duration-500 ease-out md:p-12 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
        Ready to dig in?
      </p>
      <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-3xl">
        Is your business losing out on revenue due to{" "}
        <span className="font-serif italic text-teal-400">
          out-dated tech
        </span>
        ?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-50/70">
        Book a free 30-min revenue audit. We&rsquo;ll show you exactly where
        the leaks are — no pitch, no pressure.
      </p>
      <a
        href="https://cal.com/jeremy-muhiu-7gtclu/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
      >
        Book a free audit →
      </a>
    </div>
  );
}

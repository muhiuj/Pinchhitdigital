"use client";

/**
 * Wrap any section content in <ScrollReveal> to fade + slide it up when it
 * enters the viewport. One-shot (disconnects after first trigger so it
 * doesn't re-animate on scroll past). Respects prefers-reduced-motion by
 * skipping the animation entirely — content appears immediately for users
 * who've opted out of motion.
 *
 * Defaults match the spec from the section-reveal pass: 300ms duration,
 * 40px upward slide, 15% intersection threshold. Override via props per
 * usage if you want a different feel for a specific section.
 */
import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Transition duration in milliseconds. Default 300. */
  durationMs?: number;
  /** Delay before the transition starts, in milliseconds. Default 0. */
  delayMs?: number;
  /** How far the content starts below its final position, in pixels. */
  translateY?: number;
  /** IntersectionObserver threshold (0–1). Default 0.15 (15% visible). */
  threshold?: number;
  /** Optional className passed through to the wrapping div. */
  className?: string;
}

export default function ScrollReveal({
  children,
  durationMs = 300,
  delayMs = 0,
  translateY = 40,
  threshold = 0.15,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

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
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`,
        transitionDelay: `${delayMs}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${translateY}px)`,
        // Once the animation finishes, drop the transform so it doesn't
        // create a stacking context for fixed-position children inside.
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

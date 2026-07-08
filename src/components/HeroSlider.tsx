"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Food-service imagery only (flagship-first): the trade/service slides sent
// mixed ICP signals to restaurant prospects arriving from catering searches.
const slides = [
  { src: "/kitchen-station.jpg", label: "Restaurants", durationMs: 5000 },
  { src: "/coffee-shop.jpg", label: "Coffee shops", durationMs: 4500 },
  { src: "/food-truck.jpg", label: "Food trucks", durationMs: 4500 },
];

// LCP strategy: the first frame is the page's LCP element, so it ships in the
// server HTML with loading="eager" + fetchPriority="high" (Next 16 deprecated
// `priority`; docs recommend fetchPriority over `preload`). Every other frame
// is lazy AND mounted only after hydration. The post-hydration gate matters
// because the stacked frames sit inside the viewport, where loading="lazy"
// alone would still fetch them immediately and compete with the LCP request.

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, slides[active].durationMs);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-ink-900 sm:aspect-[16/6] md:aspect-[16/5]">
      {slides.map((slide, i) => {
        const isFirst = i === 0;
        // Non-first frames stay out of the DOM until hydration so they never
        // block or compete with the first frame's paint.
        if (!isFirst && !hydrated) return null;
        return (
          <div
            key={slide.src}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
          </div>
        );
      })}

      <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-6 sm:left-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50/70">
          We serve
        </span>
        <span className="font-display text-base font-bold tracking-tight text-cream-50 sm:text-lg">
          {slides[active].label}
        </span>
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-1.5 sm:bottom-7 sm:right-6">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-sun-400" : "w-1.5 bg-cream-50/40 hover:bg-cream-50/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

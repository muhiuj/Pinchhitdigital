"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/kitchen-station.jpg", label: "Restaurants", durationMs: 5000 },
  { src: "/coffee-shop.jpg", label: "Coffee shops", durationMs: 4500 },
  { src: "/hvac-tech.jpg", label: "HVAC & trades", durationMs: 4500 },
  { src: "/food-truck.jpg", label: "Food trucks", durationMs: 4500 },
  { src: "/plumber.jpg", label: "Service & repair", durationMs: 4500 },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, slides[active].durationMs);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-ink-900 sm:aspect-[16/6] md:aspect-[16/5]">
      {slides.map((slide, i) => (
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
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
        </div>
      ))}

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

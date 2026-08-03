"use client";

import { useEffect, useRef, useState } from "react";

// Jasper-style hero interaction: an invisible layer of 72px cells over the
// amber grid; a cell fills brand teal on hover (0.12s) then fades back over
// 1.1s. Skipped entirely on touch devices and under reduced motion. Sits at
// z-[1]; hero content renders above it at z-10, so cells receive hover on
// all the open canvas around the content.

const CELL = 72;

export function HeroGridHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      setCellCount(Math.ceil(rect.width / CELL) * Math.ceil(rect.height / CELL));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = e.currentTarget;
    cell.style.transition = "background-color 0.12s";
    cell.style.backgroundColor = "rgba(122, 199, 196, 0.65)";
    window.setTimeout(() => {
      cell.style.transition = "background-color 1.1s";
      cell.style.backgroundColor = "transparent";
    }, 130);
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-[1] flex flex-wrap overflow-hidden"
    >
      {Array.from({ length: cellCount }, (_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={i}
          onMouseEnter={handleEnter}
          style={{ width: CELL, height: CELL }}
        />
      ))}
    </div>
  );
}

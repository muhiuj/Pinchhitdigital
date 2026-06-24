"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO } from "@/lib/catering";

// The chaos→order hero (spec §4), ported faithfully from the Claude Design
// export. It is ONE continuous 7s CSS-keyframe loop — no React-driven layout
// motion — so it stays compositor-smooth:
//   chaos  — coral channel chips scattered (per-chip --phd-sx/--phd-sy/--phd-r)
//            + a climbing "unread" badge.
//   settle — chips slide home and turn teal, beams draw teal into the hub, the
//            hub (PHD logo) glows + pulses, and "Replied in 4:58" springs in.
//   hold → loop.
// prefers-reduced-motion freezes the resolved/settled state (see globals.css).

const EASE = "cubic-bezier(.2,.7,.2,1)";
const loop = (name: string) => `${name} 7s ${EASE} infinite`;

// Exact channel glyphs from the export (trademark-safe generic marks).
type Glyph = "instagram" | "email" | "voicemail" | "website" | "message";

function Icon({ glyph }: { glyph: Glyph }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (glyph) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "voicemail":
      return (
        <svg {...common}>
          <circle cx="6" cy="13" r="4" />
          <circle cx="18" cy="13" r="4" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      );
    case "website":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
        </svg>
      );
  }
}

interface Chip {
  glyph: Glyph;
  left: number;
  sx: string;
  sy: string;
  r: string;
}

// Top row at top:8 (50×50), so icon centers sit at x = left+25, y = 33. Each
// chip's --phd-sx/sy/r is its scatter offset for the chaos phase.
const CHIPS: Chip[] = [
  { glyph: "instagram", left: 7, sx: "-30px", sy: "34px", r: "-15deg" },
  { glyph: "email", left: 74, sx: "24px", sy: "-20px", r: "11deg" },
  { glyph: "voicemail", left: 145, sx: "0px", sy: "-34px", r: "0deg" },
  { glyph: "website", left: 216, sx: "-20px", sy: "-14px", r: "-8deg" },
  { glyph: "message", left: 283, sx: "36px", sy: "28px", r: "14deg" },
];

// Beams curve from each chip (y=60) down into the hub at (170, 162).
const BEAMS = [
  "M32 60 Q32 120 170 162",
  "M99 60 Q99 132 170 162",
  "M170 60 L170 162",
  "M241 60 Q241 132 170 162",
  "M308 60 Q308 120 170 162",
];

export function ChaosOrderHero() {
  // Climbing "unread" count during the chaos phase. Resets so it always reads
  // as a fresh pile-up. Skipped under reduced motion (badge stays hidden).
  const [unread, setUnread] = useState(3);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setUnread((u) => (u >= 5 ? 1 : u + 1)), 760);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative h-[312px] w-[340px]">
        {/* unread climbing badge (chaos) */}
        <div
          className="phd-unread absolute right-0.5 top-[-6px] z-[4] inline-flex items-center gap-[7px] rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.04em]"
          style={{
            borderColor: "rgba(227,106,79,.5)",
            background: "rgba(227,106,79,.14)",
            color: "#e3654f",
            animation: loop("phd-unreadfade"),
          }}
        >
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
          {unread} unread
        </div>

        {/* beams */}
        <svg
          viewBox="0 0 340 290"
          width="340"
          height="290"
          className="absolute left-0 top-0 z-0"
          aria-hidden="true"
        >
          {BEAMS.map((d, i) => (
            <path
              key={i}
              className="phd-beam"
              d={d}
              pathLength={1}
              strokeDasharray={1}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ animation: loop("phd-beamdraw") }}
            />
          ))}
        </svg>

        {/* channel chips */}
        {CHIPS.map((c) => (
          <div
            key={c.glyph}
            className="phd-chip absolute top-2 z-[2] flex h-[50px] w-[50px] items-center justify-center rounded-[14px] border"
            style={
              {
                left: c.left,
                "--phd-sx": c.sx,
                "--phd-sy": c.sy,
                "--phd-r": c.r,
                animation: `${loop("phd-settle")}, ${loop("phd-chiphue")}`,
              } as React.CSSProperties
            }
          >
            <Icon glyph={c.glyph} />
          </div>
        ))}

        {/* hub — the PHD logo, glowing + pulsing once everything lands */}
        <div
          className="phd-hub absolute left-[132px] top-[124px] z-[3] flex h-[76px] w-[76px] items-center justify-center rounded-full border"
          style={{
            background: "#0e1318",
            borderColor: "rgba(255,255,255,.14)",
            animation: `${loop("phd-hubglow")}, ${loop("phd-hubpulse")}`,
          }}
        >
          <Image
            src="/phd-logo.png"
            alt="One system"
            width={46}
            height={46}
            className="block"
          />
        </div>

        {/* confirmation chip */}
        <div
          className="phd-confirm absolute left-1/2 top-[236px] z-[3] inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border px-4 py-2.5"
          style={{
            background: "rgba(244,185,66,.14)",
            borderColor: "rgba(244,185,66,.55)",
            transform: "translateX(-50%)",
            animation: loop("phd-confirmin"),
          }}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sun-400">
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="#11161c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="font-display text-sm font-bold tracking-[0.01em] text-sun-300">
            {HERO.hubChip}
          </span>
        </div>
      </div>
    </div>
  );
}

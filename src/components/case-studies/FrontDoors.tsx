"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DOORS, STUDY_DOTS, type StudyDot } from "@/lib/case-studies";

// "34 front doors, one clock" — the study's flagship graphic. One dot per
// agency in the blind cohort, positioned at the real minute its human
// response arrived (Central Time). On first scroll into view the weekend
// replays over ~5 seconds: dots light up in order, a counter narrates the
// milestones, and the 18 silent agencies fade in as hollow outlines at the
// end. Tap or focus any dot for its anonymized record. No chart library;
// reduced-motion users get the final state immediately.
//
// Colors are the study palette: navy #1A1F36, teal #4ECDC4, neutral grays.
// Anonymized ids only; no firm is identifiable anywhere in this component.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";

// Time axis: piecewise. Segment A (Fri 6pm to Mon noon, 0..66h) gets 64%
// of the width; segment B (the long tail to Aug 17, 66..240h) gets the
// rest. The cutoff line sits at the seam.
const CUTOFF_H = 66;
const MAX_H = 240;
const CUTOFF_X = 64;
const MAX_X = 96;
const PLAY_MS = 5200;

function xPct(t: number): number {
  if (t <= CUTOFF_H) return (t / CUTOFF_H) * CUTOFF_X;
  return CUTOFF_X + ((t - CUTOFF_H) / (MAX_H - CUTOFF_H)) * (MAX_X - CUTOFF_X);
}

const TICKS = [
  { x: 0, label: "Fri" },
  { x: xPct(18), label: "Sat" },
  { x: xPct(42), label: "Sun" },
  { x: xPct(58), label: "Mon" },
  { x: 82, label: "Later" },
];

// Beeswarm stacking: lowest level with no horizontal collision. The
// collision threshold depends on rendered dot size vs stage width, so the
// layout recomputes when the stage is measured.
function layoutDots(dots: StudyDot[], threshPct: number) {
  const placed: { dot: StudyDot; x: number; level: number }[] = [];
  const lastX: number[] = [];
  for (const dot of dots) {
    if (dot.t === null) continue;
    const x = xPct(dot.t);
    let level = lastX.findIndex((lx) => x - lx >= threshPct);
    if (level === -1) {
      level = lastX.length;
      lastX.push(x);
    } else {
      lastX[level] = x;
    }
    placed.push({ dot, x, level });
  }
  const maxLevel = Math.max(...placed.map((p) => p.level));
  return { placed, maxLevel };
}

type Phase = "idle" | "playing" | "done";

export function FrontDoors() {
  const responders = useMemo(() => STUDY_DOTS.filter((d) => d.t !== null), []);
  const silent = useMemo(() => STUDY_DOTS.filter((d) => d.t === null), []);

  // Measure the stage so dot size and collision threshold fit the width.
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(720);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setStageW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const DOT = stageW < 480 ? 11 : 17;
  const ROW = DOT + 5;
  const { placed, maxLevel } = useMemo(
    () => layoutDots(responders, ((DOT + 5) / stageW) * 100),
    [responders, DOT, stageW],
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [milestone, setMilestone] = useState<(typeof DOORS.milestones)[number]>(
    DOORS.milestones[0],
  );
  const [selected, setSelected] = useState<StudyDot | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = () => {
    clearTimers();
    setSelected(null);
    setMilestone(DOORS.milestones[0]);
    setPhase("playing");
    for (const m of DOORS.milestones) {
      const at = Math.min((xPct(m.at) / MAX_X) * PLAY_MS, PLAY_MS);
      timers.current.push(setTimeout(() => setMilestone(m), at));
    }
    timers.current.push(setTimeout(() => setPhase("done"), PLAY_MS + 500));
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || startedRef.current) return;
        startedRef.current = true;
        if (reduced) {
          setMilestone(DOORS.milestones[DOORS.milestones.length - 1]);
          setPhase("done");
        } else {
          play();
        }
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageH = (maxLevel + 1) * ROW + 8;

  const dotDelay = (x: number) => (x / MAX_X) * PLAY_MS;
  const showDots = phase !== "idle";
  const done = phase === "done";

  return (
    <section className="px-[clamp(16px,5vw,40px)]" aria-label="Response timeline for all 34 agencies">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {DOORS.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
          {DOORS.heading}
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-base leading-relaxed text-ink-700 sm:text-[17px]">
          {DOORS.intro}
        </p>

        <div
          ref={rootRef}
          className="mt-8 rounded-3xl p-6 sm:p-9"
          style={{ backgroundColor: NAVY }}
        >
          {/* Narrating counter */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p
              className="min-h-[3.5rem] max-w-[26ch] font-display text-xl font-extrabold leading-snug tracking-[-0.01em] text-white sm:text-2xl"
              aria-live="polite"
            >
              {done ? DOORS.finalText : milestone.text}
            </p>
            <p className="font-display text-5xl font-extrabold tracking-[-0.02em] sm:text-6xl" style={{ color: TEAL }}>
              {done ? 16 : milestone.count}
              <span className="text-2xl font-bold text-white/40 sm:text-3xl"> / 34</span>
            </p>
          </div>

          {/* Stage */}
          <div ref={stageRef} className="relative mt-8" style={{ height: stageH }}>
            {/* Baseline */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
            {/* Cutoff line */}
            <div
              className="absolute bottom-0 top-0 w-0 border-l-2 border-dashed border-white/30"
              style={{ left: `${CUTOFF_X}%` }}
            />
            {placed.map(({ dot, x, level }) => (
              <button
                key={dot.id}
                type="button"
                onClick={() => setSelected(selected?.id === dot.id ? null : dot)}
                aria-label={`${dot.id}: human response ${dot.when}, ${dot.hrs} hours after its send, by ${dot.channel}`}
                className="absolute rounded-full outline-offset-2 transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-white"
                style={{
                  width: DOT,
                  height: DOT,
                  left: `calc(${x}% - ${DOT / 2}px)`,
                  bottom: level * ROW + 2,
                  backgroundColor: TEAL,
                  boxShadow: selected?.id === dot.id ? `0 0 0 3px rgba(255,255,255,0.6)` : "none",
                  opacity: showDots ? 1 : 0,
                  transform: showDots ? "scale(1)" : "scale(0.2)",
                  transitionDelay: phase === "playing" ? `${dotDelay(x)}ms` : "0ms",
                }}
              />
            ))}
          </div>

          {/* Ticks */}
          <div className="relative mt-2 h-5 border-t border-white/10">
            {TICKS.map((tick) => (
              <span
                key={tick.label}
                className="absolute top-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-white/45"
                style={
                  tick.label === "The week after"
                    ? { left: `${tick.x}%`, transform: "translateX(-50%)" }
                    : { left: `${tick.x}%` }
                }
              >
                {tick.label}
              </span>
            ))}
          </div>
          <p
            className="mt-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-white/45"
            style={{ marginLeft: `max(0px, calc(${CUTOFF_X}% - 90px))` }}
          >
            {DOORS.cutoffLabel}
          </p>

          {/* The silent 18 */}
          <div
            className="mt-7 rounded-2xl border border-white/10 p-4 transition-opacity duration-700 sm:p-5"
            style={{ opacity: done ? 1 : 0.25 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
              {DOORS.silentLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {silent.map((dot) => (
                <button
                  key={dot.id}
                  type="button"
                  onClick={() => setSelected(selected?.id === dot.id ? null : dot)}
                  aria-label={`${dot.id}: no human response as of August 19`}
                  className="rounded-full border-2 border-white/35 outline-offset-2 transition-shadow focus-visible:outline-2 focus-visible:outline-white"
                  style={{
                    width: DOT,
                    height: DOT,
                    boxShadow: selected?.id === dot.id ? `0 0 0 3px rgba(255,255,255,0.6)` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Detail strip + replay */}
          <div className="mt-5 flex min-h-[2.5rem] flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <p className="font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/80 sm:text-[13px]">
              {selected
                ? selected.t !== null
                  ? `${selected.id} · ${selected.when} · ${selected.hrs} hours after its send · by ${selected.channel}`
                  : `${selected.id} · no human response as of Aug 19`
                : "Tap a dot to read its record."}
            </p>
            {done ? (
              <button
                type="button"
                onClick={play}
                className="rounded-full border border-white/25 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/75 transition-colors hover:border-white/60 hover:text-white"
              >
                {DOORS.replay}
              </button>
            ) : null}
          </div>
        </div>

        <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink-500">
          {DOORS.footnote}
        </p>
      </div>
    </section>
  );
}

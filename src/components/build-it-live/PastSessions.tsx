"use client";

import { Play } from "lucide-react";
import posthog from "posthog-js";
import { useState } from "react";
import { Eyebrow, Section } from "@/components/catering/primitives";
import {
  PAST_SESSIONS,
  PAST_SESSIONS_SECTION,
  type WebinarSession,
} from "@/lib/webinars";
import { ReplayModal } from "./ReplayModal";

// 04 · Past sessions. Facade pattern, non-negotiable for performance: the
// page loads only a thumbnail per session; the YouTube iframe exists only
// inside the modal, injected on click. Zero YouTube JS before user intent.
// Replays are fully open: no login, no email gate.

function sessionLabel(n: number) {
  return `Session ${String(n).padStart(3, "0")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}

export function PastSessions() {
  const [active, setActive] = useState<WebinarSession | null>(null);
  const watchable = PAST_SESSIONS.filter((s) => s.youtubeId);

  return (
    <Section id="past-sessions" tone="canvas">
      <Eyebrow n="04" label="Past sessions" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {PAST_SESSIONS_SECTION.h2}
      </h2>
      <p className="mt-5 max-w-[62ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {PAST_SESSIONS_SECTION.intro}
      </p>

      {watchable.length === 0 ? (
        <p className="mt-10 max-w-[760px] rounded-2xl border border-white/[0.08] bg-card px-6 py-8 font-sans text-[15px] leading-relaxed text-body">
          {PAST_SESSIONS_SECTION.emptyState}
        </p>
      ) : (
        <div className="mt-10 grid gap-5">
          {watchable.map((session) => (
            <button
              key={session.id}
              type="button"
              onClick={() => {
                setActive(session);
                try {
                  posthog.capture("replay_open", { session: session.id });
                } catch {
                  /* no-op */
                }
              }}
              className="group grid w-full items-center gap-5 rounded-2xl border border-white/[0.08] bg-card p-4 text-left transition-colors hover:border-teal-400/40 sm:grid-cols-[240px_1fr] sm:p-5"
            >
              <span className="relative block overflow-hidden rounded-xl">
                {/* Thumbnail only: the YouTube player loads in the modal. */}
                <img
                  src={
                    session.coverImage ??
                    `https://i.ytimg.com/vi/${session.youtubeId}/hqdefault.jpg`
                  }
                  alt=""
                  width={480}
                  height={270}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/15">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-50/95">
                    <Play className="ml-0.5 h-5 w-5 text-ink-900" fill="currentColor" />
                  </span>
                </span>
              </span>
              <span className="block">
                <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-teal-400">
                  {sessionLabel(session.number)} · {formatDate(session.date)}
                </span>
                <span className="mt-2 block font-display text-xl font-bold tracking-[-0.01em] text-cream-50">
                  {session.title}
                </span>
                <span className="mt-2 block font-sans text-[14px] leading-relaxed text-body">
                  {session.result}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {active && (
        <ReplayModal session={active} onClose={() => setActive(null)} />
      )}
    </Section>
  );
}

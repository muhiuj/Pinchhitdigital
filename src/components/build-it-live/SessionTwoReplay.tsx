"use client";

import { Play } from "lucide-react";
import posthog from "posthog-js";
import { useState } from "react";
import { Eyebrow, Section } from "@/components/catering/primitives";
import { PAST_SESSIONS, REPLAY_SECTION } from "@/lib/webinars";

// 05 · Last session's proof. Facade pattern, non-negotiable for
// performance: the page ships only the YouTube thumbnail; the
// youtube-nocookie iframe is injected in place on click. Zero YouTube JS
// before user intent. Hides the player (keeps the copy) if no video ID.

export function SessionTwoReplay() {
  const [playing, setPlaying] = useState(false);
  const session = PAST_SESSIONS[0];
  const hasVideo = Boolean(session?.youtubeId);

  return (
    <Section id="session-one-replay" tone="surface">
      <Eyebrow n="05" label="Last session's proof" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        This is session{" "}
        <span className="font-serif italic text-teal-400">two</span>.
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {REPLAY_SECTION.body}
      </p>

      {hasVideo && (
        <div className="mt-10 max-w-[760px] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
          {playing ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${session.youtubeId}?autoplay=1&rel=0`}
                title={`Build It Live session one replay: ${session.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setPlaying(true);
                try {
                  posthog.capture("replay_open", { session: session.id });
                } catch {
                  /* no-op */
                }
              }}
              className="group relative block w-full text-left"
              aria-label={`Play the session one replay: ${session.title}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${session.youtubeId}/hqdefault.jpg`}
                alt=""
                width={480}
                height={270}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/15">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-50/95">
                  <Play className="ml-0.5 h-6 w-6 text-ink-900" fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-400">
                  Session 001 · August 18
                </span>
                <span className="mt-1 block font-display text-[15px] font-bold text-cream-50">
                  {session.title}
                </span>
              </span>
            </button>
          )}
        </div>
      )}
    </Section>
  );
}

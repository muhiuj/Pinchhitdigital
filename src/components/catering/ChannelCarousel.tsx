"use client";

import {
  Camera,
  Globe,
  Mail,
  MessageCircle,
  MessageSquare,
  Star,
  Utensils,
  Voicemail,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { CHANNELS, CHANNELS_SECTION } from "@/lib/catering";
import { PhoneMock } from "./ChannelScreens";
import { Eyebrow, Section } from "./primitives";

// 04 · Every channel, one place. Eight tappable channels; selecting one swaps in
// a phone-native mock of where the inquiry lands, rendered as its real app (see
// ChannelScreens.tsx). Tabs are a proper tablist; horizontally scrollable on
// mobile.

const ICONS: Record<string, LucideIcon> = {
  instagram: Camera,
  email: Mail,
  voicemail: Voicemail,
  webform: Globe,
  google: MessageSquare,
  yelp: Star,
  opentable: Utensils,
  text: MessageCircle,
};

export function ChannelCarousel() {
  const [sel, setSel] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const channel = CHANNELS[sel];

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (sel + 1) % CHANNELS.length
        : (sel - 1 + CHANNELS.length) % CHANNELS.length;
    setSel(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="channels" tone="surface">
      <Eyebrow n="04" label="Every channel, one place" />
      <h2 className="mt-5 max-w-[24ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {CHANNELS_SECTION.h2}
      </h2>
      <p className="mt-5 max-w-[60ch] font-sans text-base leading-relaxed text-body">
        {CHANNELS_SECTION.intro}
      </p>

      {/* Tab strip — scrollable on mobile, wraps on desktop. */}
      <div
        role="tablist"
        aria-label="Catering inquiry channels"
        onKeyDown={onKeyDown}
        className="mt-9 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CHANNELS.map((c, i) => {
          const Icon = ICONS[c.id];
          const active = i === sel;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`channel-tab-${c.id}`}
              aria-selected={active}
              aria-controls="channel-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSel(i)}
              className={`inline-flex min-h-[44px] flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                active
                  ? "border-teal-400/50 bg-teal-400/15 text-cream-50"
                  : "border-white/10 bg-card text-body-dim hover:text-cream-50"
              }`}
            >
              <Icon
                className="h-4 w-4"
                style={{ color: active ? "#7ac7c4" : undefined }}
                strokeWidth={2}
              />
              {c.tab}
            </button>
          );
        })}
      </div>

      <div
        id="channel-panel"
        role="tabpanel"
        aria-labelledby={`channel-tab-${channel.id}`}
        className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-12"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal-400">
            {channel.kicker}
          </p>
          <p className="mt-4 max-w-[24ch] font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-cream-50 md:text-3xl">
            {channel.title}
          </p>
        </div>

        <PhoneMock channel={channel} />
      </div>

      {/* Resolve line — below the carousel. */}
      <div className="mt-12 max-w-[68ch] border-l-2 border-teal-400/30 pl-5">
        <p className="font-sans text-lg leading-relaxed text-cream-50">
          {CHANNELS_SECTION.resolveLine}
        </p>
        <p className="mt-2 font-sans text-base leading-relaxed text-body">
          {CHANNELS_SECTION.resolveDetail}
        </p>
      </div>
    </Section>
  );
}

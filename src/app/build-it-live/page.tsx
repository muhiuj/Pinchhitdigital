import type { Metadata } from "next";
import { FAQ_ITEMS, HERO, PAST_SESSIONS, SEO } from "@/lib/webinars";
import { getLiveSession } from "@/lib/webinars-live";
import {
  Agenda,
  Faq,
  HonestStory,
  Kit,
  LeaveWith,
  WhoFor,
} from "@/components/build-it-live/AssistantSections";
import { FinalCta } from "@/components/build-it-live/FinalCta";
import { Hero } from "@/components/build-it-live/Hero";
import { SessionOneReplay } from "@/components/build-it-live/SessionOneReplay";
import { ShareSession } from "@/components/build-it-live/ShareSession";
import { StickyCta } from "@/components/build-it-live/StickyCta";

// /build-it-live — Session 002: "Build Your Own AI Assistant with Claude,
// Attio, and Google Calendar" (the 2026-09-22 pivot). Same route, same
// registration mechanism (custom form → /api/webinar-register → n8n WF1).
// Session facts render live from the BIL Sessions Notion row (ISR);
// src/lib/webinars.ts holds the copy and fallbacks. og:image is the
// Session 002 amber card (swap public/build-it-live/event-card.jpg each
// session).

export const revalidate = 300;

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: SEO.canonical },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.canonical,
    type: "website",
    images: [
      {
        url: "https://www.pinchhitdigital.com/build-it-live/event-card.jpg",
        width: 1080,
        height: 1080,
        alt: "Build It Live session two: Build Your Own AI Assistant with Claude, Attio, and Google Calendar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["https://www.pinchhitdigital.com/build-it-live/event-card.jpg"],
  },
};

// One VideoObject per published replay.
const videoSchemas = PAST_SESSIONS.filter((s) => s.youtubeId).map((s) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `Build It Live: ${s.title}`,
  description: s.result,
  uploadDate: s.date,
  thumbnailUrl: `https://i.ytimg.com/vi/${s.youtubeId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${s.youtubeId}`,
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function BuildItLivePage() {
  const live = await getLiveSession();

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Build It Live: ${live.title}`,
    description: HERO.subhead,
    startDate: live.startIso,
    endDate: live.endIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: SEO.canonical },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-09-22",
      url: SEO.canonical,
    },
    organizer: {
      "@type": "Organization",
      name: "Pinch Hit Digital",
      url: "https://www.pinchhitdigital.com",
    },
  };

  return (
    <div className="bg-canvas">
      <Hero eventLine={live.eventLine} gcalUrl={live.gcalUrl} />
      <LeaveWith />
      <HonestStory />
      <Agenda />
      <Kit />
      <WhoFor />
      <Faq />
      <SessionOneReplay />
      <ShareSession />
      <FinalCta />
      <StickyCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {videoSchemas.map((schema) => (
        <script
          key={schema.embedUrl}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  );
}

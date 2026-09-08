import type { Metadata } from "next";
import { HERO, NEXT_SESSION, PAST_SESSIONS, SEO } from "@/lib/webinars";
import { getLiveSession } from "@/lib/webinars-live";
import { FinalCta } from "@/components/build-it-live/FinalCta";
import { Hero } from "@/components/build-it-live/Hero";
import {
  Cover,
  Invite,
  Takeaway,
  Teacher,
} from "@/components/build-it-live/Session2Sections";
import { SessionTwoReplay } from "@/components/build-it-live/SessionTwoReplay";
import { StickyCta } from "@/components/build-it-live/StickyCta";

// /build-it-live — Session 002: "Can ChatGPT Find Your Business?" Same
// route, same registration mechanism (custom form → /api/webinar-register →
// n8n WF1). Session facts render live from the BIL Sessions Notion row
// (ISR); src/lib/webinars.ts holds the copy and fallbacks. og:image is the
// Session 002 card (swap public/build-it-live/event-card.jpg each session).

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
        alt: "Build It Live session two: Can ChatGPT Find Your Business?",
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
      validFrom: "2026-09-08",
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
      <Invite />
      <Cover />
      <Takeaway />
      <Teacher />
      <SessionTwoReplay />
      <FinalCta />
      <StickyCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
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

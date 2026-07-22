import type { Metadata } from "next";
import { FAQ_ITEMS, HERO, PAST_SESSIONS, SEO } from "@/lib/webinars";
import { getLiveSession } from "@/lib/webinars-live";
import { Agenda } from "@/components/build-it-live/Agenda";
import { BilFaq } from "@/components/build-it-live/BilFaq";
import { FinalCta } from "@/components/build-it-live/FinalCta";
import { Hero } from "@/components/build-it-live/Hero";
import { PastSessions } from "@/components/build-it-live/PastSessions";
import { StickyCta } from "@/components/build-it-live/StickyCta";
import { TheLeak } from "@/components/build-it-live/TheLeak";
import { WhoItsFor } from "@/components/build-it-live/WhoItsFor";

// /build-it-live — evergreen registration page for the free monthly live
// build. The URL never changes. Session facts (title, date/time, calendar
// link, JSON-LD) come from the Notion "BIL Sessions" row via getLiveSession
// with ISR, so a Notion edit updates the page within ~5 minutes; the deep
// section copy stays in src/lib/webinars.ts and changes with the monthly
// copy pass. Registration feeds n8n via /api/webinar-register; replays are
// fully open (no login, no gate) via the facade-pattern YouTube modal.

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
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// One VideoObject per posted replay (empty until the archive has entries).
const videoSchemas = PAST_SESSIONS.filter((s) => s.youtubeId).map((s) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `Build It Live: ${s.title}`,
  description: s.result,
  uploadDate: s.date,
  thumbnailUrl:
    s.coverImage ?? `https://i.ytimg.com/vi/${s.youtubeId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${s.youtubeId}`,
}));

export default async function BuildItLivePage() {
  const live = await getLiveSession();

  // Event schema for the next session: free online event, per spec §7.
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Build It Live: ${live.title}`,
    description: HERO.subhead,
    startDate: live.startIso,
    endDate: live.endIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url: SEO.canonical,
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-07-21",
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
      <TheLeak />
      <Agenda />
      <WhoItsFor />
      <PastSessions />
      <BilFaq />
      <FinalCta dateShort={live.dateShort} />
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

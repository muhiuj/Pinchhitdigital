// Structured data emitted as JSON-LD for search engines.
// professionalServiceSchema describes the business; cateringServiceSchema
// describes the flagship offering. Both render globally from layout.tsx so
// every page reinforces NAP + service consistency for local SEO. Additional
// page-specific schemas (Article, FAQPage, BreadcrumbList) can be rendered
// per-route alongside these two.
//
// plansSchema (below) is page-specific — it carries Offer pricing and only
// belongs on /plans, so it is rendered from that page, NOT from layout.tsx.

import { PLANS } from "@/lib/plans";

// Common city-level service area used by both entities so the values stay
// in sync if we add or drop a city.
const DFW_AREA_SERVED = [
  "Dallas, TX",
  "Fort Worth, TX",
  "Plano, TX",
  "Arlington, TX",
  "Frisco, TX",
  "Irving, TX",
  "Carrollton, TX",
  "Grapevine, TX",
  "DFW Metroplex",
] as const;

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  // Multi-type: ProfessionalService AND LocalBusiness. Valid schema.org
  // pattern — signals both the service-business and geo-local nature in
  // one entity so Google can rank for either.
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Pinch Hit Digital",
  url: "https://www.pinchhitdigital.com",
  // One email everywhere (consistency rule): the founder address is the
  // business contact. info@ was removed from all reader-facing surfaces.
  email: "jeremy.muhiu@pinchhitdigital.com",
  sameAs: ["https://cal.com/jeremy-muhiu-7gtclu/30min"],
  description:
    "Catering lead recovery and digital systems for DFW restaurants and small businesses. Websites, automation, and inquiry workflows built for owner-operators across Dallas–Fort Worth.",
  founder: {
    "@type": "Person",
    name: "Jeremy Muhiu",
    email: "jeremy.muhiu@pinchhitdigital.com",
    jobTitle: "Founder",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dallas",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: DFW_AREA_SERVED,
  knowsAbout: [
    "Restaurant catering systems",
    "Catering lead recovery",
    "Digital consulting",
    "Website design",
    "Marketing automation",
  ],
} as const;

export const cateringServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Catering Lead Recovery System",
  serviceType: "Restaurant catering lead recovery",
  description:
    "Automated inquiry response, multi-step follow-up sequences, and monthly revenue reporting that turn missed catering inquiries into booked events for DFW restaurants.",
  url: "https://www.pinchhitdigital.com/catering-lead-recovery",
  provider: {
    "@type": "ProfessionalService",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
  },
  areaServed: DFW_AREA_SERVED,
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Independent restaurant operators",
  },
} as const;

// Page-specific schema for /plans. One Service entity per product, each with
// an Offer carrying the "starting at" setup price in USD so Google can surface
// pricing in local results. Prices are read from src/lib/plans.ts — bump them
// there and this updates in lockstep. The setup fee is used as the Offer
// anchor price; the recurring monthly is described in the Offer description
// since a single Offer.price can only hold one figure.
export const plansSchema = PLANS.map((plan) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: plan.name,
  description: plan.tagline,
  url: "https://www.pinchhitdigital.com/plans",
  provider: {
    "@type": "ProfessionalService",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
  },
  areaServed: DFW_AREA_SERVED,
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: plan.setup,
    description: `Starting at $${plan.setup.toLocaleString(
      "en-US",
    )} setup plus $${plan.monthly}/mo. Final scope set on a free audit.`,
    url: "https://www.pinchhitdigital.com/plans",
    availability: "https://schema.org/InStock",
  },
}));

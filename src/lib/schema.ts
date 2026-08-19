// Structured data emitted as JSON-LD for search engines.
// professionalServiceSchema describes the business; leadResponseServiceSchema
// describes the flagship offering. Both render globally from layout.tsx so
// every page reinforces NAP + service consistency for local SEO. Additional
// page-specific schemas (Article, FAQPage, BreadcrumbList) can be rendered
// per-route alongside these two.
//
// 2026-08 pivot: positioning is insurance agencies, trades, and construction.
// Catering entities and the /plans Offer schema were retired with their pages.

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
    "Lead response systems and digital consulting for independent insurance agencies, trades contractors, and construction companies across Dallas–Fort Worth. Every inquiry answered in minutes.",
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
    "Insurance agency lead follow-up",
    "Missed-call text-back systems",
    "Lead response automation",
    "Digital consulting",
    "Website design",
  ],
} as const;

export const leadResponseServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lead Response System",
  serviceType: "Lead response and follow-up automation",
  description:
    "Missed-call text-back, instant inquiry response, and follow-up workflows that keep every quote request alive until a human closes it. Built for independent insurance agencies, trades contractors, and construction companies in DFW.",
  url: "https://www.pinchhitdigital.com",
  provider: {
    "@type": "ProfessionalService",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
  },
  areaServed: DFW_AREA_SERVED,
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Independent insurance agencies, trades contractors, and construction companies",
  },
} as const;

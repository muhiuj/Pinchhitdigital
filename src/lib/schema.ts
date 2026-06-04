// Structured data emitted as JSON-LD for search engines.
// professionalServiceSchema describes the business; cateringServiceSchema
// describes the flagship offering. Both render globally from layout.tsx so
// every page reinforces NAP + service consistency for local SEO. Additional
// page-specific schemas (Article, FAQPage, BreadcrumbList) can be rendered
// per-route alongside these two.

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
  // General inbox stays here as the business contact. Direct founder
  // contact is on the founder Person entity below.
  email: "info@pinchhitdigital.com",
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
  url: "https://www.pinchhitdigital.com/catering",
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

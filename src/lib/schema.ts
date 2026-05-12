// Structured data emitted as JSON-LD for search engines.
// LocalBusiness is rendered globally from src/app/layout.tsx so every page
// reinforces that Pinch Hit Digital is a DFW-local business. Page-specific
// schemas (Article, Service, FAQPage, BreadcrumbList, etc.) can be added
// alongside this and rendered per-page from individual page.tsx files.

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pinch Hit Digital",
  url: "https://www.pinchhitdigital.com",
  email: "info@pinchhitdigital.com",
  description:
    "Digital consulting for DFW restaurants ready to grow their catering revenue. Websites, automation, and inquiry systems built for owner-operators in Dallas–Fort Worth.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dallas",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: ["Dallas, TX", "Fort Worth, TX", "DFW Metroplex"],
  knowsAbout: [
    "Restaurant catering systems",
    "Digital consulting",
    "Website design",
    "Marketing automation",
  ],
} as const;

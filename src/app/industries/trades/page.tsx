import type { Metadata } from "next";
import { IndustryLanding } from "@/components/industries/IndustryLanding";
import { getIndustryPage } from "@/lib/industries";

// /industries/trades — electrical, HVAC, and plumbing companies. Primary SEO
// territory: missed-call text back. Strengthens when Field Report No. 2
// (the 49-company trades study) publishes. Copy in src/lib/industries.ts.

const page = getIndustryPage("trades");
const CANONICAL = "https://www.pinchhitdigital.com/industries/trades";

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: CANONICAL,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: page.seo.title,
    description: page.seo.description,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Missed-Call Text-Back System for Trades",
  serviceType: "Missed-call text-back and lead follow-up automation",
  description: page.seo.description,
  url: CANONICAL,
  provider: {
    "@type": "ProfessionalService",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
  },
  areaServed: "Dallas-Fort Worth Metroplex",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Electrical, HVAC, and plumbing companies",
  },
};

export default function TradesPage() {
  return (
    <>
      <IndustryLanding page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

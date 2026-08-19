import type { Metadata } from "next";
import { IndustryLanding } from "@/components/industries/IndustryLanding";
import { getIndustryPage } from "@/lib/industries";

// /industries/insurance-agencies — the conversion page for DFW independent
// agency principals, built to the audit-reply campaign persona. Primary SEO
// territory: insurance lead follow-up / response time. Copy in
// src/lib/industries.ts; layout in IndustryLanding.

const page = getIndustryPage("insurance-agencies");
const CANONICAL =
  "https://www.pinchhitdigital.com/industries/insurance-agencies";

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
  name: "Insurance Agency Lead Follow-Up System",
  serviceType: "Lead response and follow-up automation for insurance agencies",
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
    audienceType: "Independent insurance agencies",
  },
};

export default function InsuranceAgenciesPage() {
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

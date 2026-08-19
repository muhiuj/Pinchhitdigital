import type { Metadata } from "next";
import { IndustryLanding } from "@/components/industries/IndustryLanding";
import { getIndustryPage } from "@/lib/industries";

// /industries/construction — construction companies and GCs. Primary SEO
// territory: lead response for construction. Copy in src/lib/industries.ts.

const page = getIndustryPage("construction");
const CANONICAL = "https://www.pinchhitdigital.com/industries/construction";

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
  name: "Construction Lead Response System",
  serviceType: "Lead response and bid follow-up automation",
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
    audienceType: "Construction companies and general contractors",
  },
};

export default function ConstructionPage() {
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

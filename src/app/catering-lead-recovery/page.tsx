import type { Metadata } from "next";
import { FAQ_ITEMS, SEO } from "@/lib/catering";
import { CateringFaq } from "@/components/catering/CateringFaq";
import { ChannelCarousel } from "@/components/catering/ChannelCarousel";
import { CostStats } from "@/components/catering/CostStats";
import { FinalCta } from "@/components/catering/FinalCta";
import { Hero } from "@/components/catering/Hero";
import { RevenueReport } from "@/components/catering/RevenueReport";
import { ScenarioPairs } from "@/components/catering/ScenarioPairs";
import { StickyCta } from "@/components/catering/StickyCta";
import { WhyPHD } from "@/components/catering/WhyPHD";
import { WhyThisWorks } from "@/components/catering/WhyThisWorks";
import { WorkingTogether } from "@/components/catering/WorkingTogether";

// /catering-lead-recovery — the Catering Lead Recovery System landing page.
// Copy is verbatim from docs/CateringPage-Rewritten-Copy.md; structure follows
// the rebuild brief. Service + FAQPage JSON-LD is emitted here (Dallas + Fort
// Worth area served); the global ProfessionalService schema lives in layout.tsx.

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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Catering Lead Recovery",
  serviceType: "Catering lead recovery for restaurants",
  description: SEO.description,
  url: SEO.canonical,
  provider: {
    "@type": "ProfessionalService",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
    email: "jeremy.muhiu@pinchhitdigital.com",
    areaServed: ["Dallas, TX", "Fort Worth, TX", "DFW Metroplex"],
  },
  areaServed: ["Dallas, TX", "Fort Worth, TX", "DFW Metroplex"],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Independent restaurant operators",
  },
  offers: {
    "@type": "Offer",
    name: "Free 30-minute Revenue Audit",
    price: 0,
    priceCurrency: "USD",
    url: "https://cal.com/jeremy-muhiu-7gtclu/30min",
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

export default function CateringLeadRecoveryPage() {
  return (
    <div className="bg-canvas">
      <Hero />
      <CostStats />
      <ScenarioPairs />
      <WhyThisWorks />
      <ChannelCarousel />
      <WorkingTogether />
      <RevenueReport />
      <WhyPHD />
      <CateringFaq />
      <FinalCta />
      <StickyCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import {
  CTA2,
  REPORT2_CLOSE,
  REPORT2_CLOSING,
  REPORT2_EVENING,
  REPORT2_INTRO,
  REPORT2_ROBOTS,
  REPORT_BIO,
  STUDY2_HERO,
  STUDY2_SEO,
} from "@/lib/case-studies";
import { AfterHours } from "@/components/case-studies/AfterHours";
import { Barbell } from "@/components/case-studies/Barbell";
import { Report } from "@/components/case-studies/Report";
import { StudyCta } from "@/components/case-studies/StudyCta";
import { StudyHero } from "@/components/case-studies/StudyHero";

// Field Report No. 2: the DFW contractor response study. Same anatomy as
// part one: navy hero, verbatim report (src/lib/case-studies.ts), the
// barbell distribution, the after-hours comparison, method notes, one calm
// CTA. Primary SEO term: "contractor lead response".

export const metadata: Metadata = {
  title: STUDY2_SEO.title,
  description: STUDY2_SEO.description,
  alternates: { canonical: STUDY2_SEO.canonical },
  openGraph: {
    title: STUDY2_SEO.title,
    description: STUDY2_SEO.description,
    url: STUDY2_SEO.canonical,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: STUDY2_SEO.title,
    description: STUDY2_SEO.description,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "I Sent Real Jobs to 49 Dallas Contractors on a Sunday. 31 Never Responded.",
  description: STUDY2_SEO.description,
  datePublished: STUDY2_SEO.datePublished,
  dateModified: STUDY2_SEO.datePublished,
  mainEntityOfPage: STUDY2_SEO.canonical,
  author: {
    "@type": "Person",
    name: "Jeremy Muhiu",
    url: "https://www.pinchhitdigital.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Pinch Hit Digital",
    url: "https://www.pinchhitdigital.com",
  },
};

export default function DfwContractorResponseStudyPage() {
  return (
    <div className="bg-cream-50">
      <StudyHero hero={STUDY2_HERO} crossLink={STUDY2_HERO.crossLink} />

      <div id="report" className="pt-[clamp(56px,9vw,96px)]">
        <Report sections={REPORT2_INTRO} />
      </div>

      <div id="barbell" className="pt-[clamp(48px,7vw,72px)]">
        <Barbell />
      </div>

      <div id="evening" className="pt-16">
        <Report sections={REPORT2_EVENING} />
      </div>

      <div id="after-hours" className="pt-[clamp(48px,7vw,72px)]">
        <AfterHours />
      </div>

      <div id="robots" className="pt-16">
        <Report sections={REPORT2_ROBOTS} />
      </div>

      <div id="close" className="pt-16">
        <Report sections={REPORT2_CLOSE} />
      </div>

      <div id="method" className="py-[clamp(56px,9vw,96px)]">
        <Report sections={REPORT2_CLOSING} bio={REPORT_BIO} />
      </div>

      <StudyCta cta={CTA2} sectionPrefix="contractor-study" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </div>
  );
}

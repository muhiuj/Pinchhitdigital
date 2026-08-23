import type { Metadata } from "next";
import {
  CTA,
  REPORT_BIO,
  REPORT_CLOSING,
  REPORT_PHONE,
  REPORT_RESEARCH,
  REPORT_ROBOT,
  REPORT_TEST,
  STUDY1_CROSSLINK,
  STUDY_HERO,
  STUDY_SEO,
} from "@/lib/case-studies";
import { AuditTable } from "@/components/case-studies/AuditTable";
import { FrontDoors } from "@/components/case-studies/FrontDoors";
import { Report } from "@/components/case-studies/Report";
import { StudyCta } from "@/components/case-studies/StudyCta";
import { StudyHero } from "@/components/case-studies/StudyHero";
import { TwoDoors } from "@/components/case-studies/TwoDoors";

// Field Report No. 1: the DFW insurance agency response time study.
// v2 arc (thesis-first): navy hero, the published research (HBR 2011,
// Drift 2017, Velocify 2014, McKinsey 2016), the test, the "34 front
// doors" interactive, the robot-receipt findings, the four-audit
// scoreboard, the phone tier with the two-doors comparison, the math,
// the mechanism, homework, method notes, one calm CTA. All copy and data
// in src/lib/case-studies.ts. Primary SEO term: "insurance agency
// response time".

export const metadata: Metadata = {
  title: STUDY_SEO.title,
  description: STUDY_SEO.description,
  alternates: { canonical: STUDY_SEO.canonical },
  openGraph: {
    title: STUDY_SEO.title,
    description: STUDY_SEO.description,
    url: STUDY_SEO.canonical,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: STUDY_SEO.title,
    description: STUDY_SEO.description,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "I Asked 34 Dallas Agencies to Quote a Real Business. 22 Never Followed Up.",
  description: STUDY_SEO.description,
  datePublished: STUDY_SEO.datePublished,
  dateModified: STUDY_SEO.datePublished,
  mainEntityOfPage: STUDY_SEO.canonical,
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

export default function DfwInsuranceResponseStudyPage() {
  return (
    <div className="bg-cream-50">
      <StudyHero hero={STUDY_HERO} crossLink={STUDY1_CROSSLINK} />

      <div id="research" className="pt-[clamp(56px,9vw,96px)]">
        <Report sections={REPORT_RESEARCH} />
      </div>

      <div id="test" className="pt-16">
        <Report sections={REPORT_TEST} />
      </div>

      <div id="doors" className="pt-[clamp(48px,7vw,72px)]">
        <FrontDoors />
      </div>

      <div className="pt-16">
        <Report sections={REPORT_ROBOT} />
      </div>

      <div id="scoreboard" className="pt-[clamp(48px,7vw,72px)]">
        <AuditTable />
      </div>

      <div id="phone" className="pt-16">
        <Report sections={[REPORT_PHONE[0]]} />
      </div>

      <div className="pt-[clamp(48px,7vw,72px)]">
        <TwoDoors />
      </div>

      <div className="pt-16">
        <Report sections={REPORT_PHONE.slice(1)} />
      </div>

      <div id="method" className="py-[clamp(56px,9vw,96px)]">
        <Report sections={REPORT_CLOSING} bio={REPORT_BIO} />
      </div>

      <StudyCta cta={CTA} sectionPrefix="case-study" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </div>
  );
}

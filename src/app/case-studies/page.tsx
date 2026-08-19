import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENTRIES, INDEX_HEADER, INDEX_SEO } from "@/lib/case-studies";

// /case-studies — index for research entries (field studies) and future
// build write-ups. Two entry types render with small mono labels:
// "Research" and "Client Work" (spec'd label). Adding an entry is one
// object in src/lib/case-studies.ts ENTRIES; `comingSoon` renders a
// non-linked teaser card so part two slots in without layout work.

export const metadata: Metadata = {
  title: INDEX_SEO.title,
  description: INDEX_SEO.description,
  alternates: { canonical: INDEX_SEO.canonical },
  openGraph: {
    title: INDEX_SEO.title,
    description: INDEX_SEO.description,
    url: INDEX_SEO.canonical,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: INDEX_SEO.title,
    description: INDEX_SEO.description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Case Studies",
  description: INDEX_SEO.description,
  url: INDEX_SEO.canonical,
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-cream-50 px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,104px)]">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {INDEX_HEADER.eyebrow}
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-ink-900 sm:text-5xl">
          {INDEX_HEADER.titleLead} {INDEX_HEADER.titleAccent}
        </h1>
        <p className="mt-6 max-w-[58ch] font-sans text-base leading-relaxed text-ink-700 sm:text-lg">
          {INDEX_HEADER.dek}
        </p>

        <div className="mt-12 space-y-6">
          {ENTRIES.map((entry) => {
            const card = (
              <article
                className={`rounded-2xl border p-6 sm:p-8 ${
                  entry.comingSoon
                    ? "border-dashed border-ink-900/20 bg-transparent"
                    : "border-ink-900/10 bg-white/60 transition-colors group-hover:border-teal-700/50"
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-full border border-ink-900/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-600">
                    {entry.type}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-500">
                    {entry.label} · {entry.date}
                  </span>
                </div>
                <h2 className="mt-4 max-w-[30ch] font-display text-xl font-extrabold leading-snug tracking-[-0.01em] text-ink-900 sm:text-2xl">
                  {entry.title}
                </h2>
                <p className="mt-3 max-w-[60ch] font-sans text-[15px] leading-relaxed text-ink-700">
                  {entry.dek}
                </p>
                {entry.stat ? (
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-500">
                    <span className="font-display text-lg font-extrabold normal-case tracking-[-0.01em] text-teal-700">
                      {entry.stat.value}
                    </span>{" "}
                    · {entry.stat.caption}
                  </p>
                ) : null}
                {!entry.comingSoon ? (
                  <p className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-ink-900">
                    Read the report
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </p>
                ) : null}
              </article>
            );

            return entry.href && !entry.comingSoon ? (
              <Link key={entry.title} href={entry.href} className="group block">
                {card}
              </Link>
            ) : (
              <div key={entry.title}>{card}</div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    </div>
  );
}

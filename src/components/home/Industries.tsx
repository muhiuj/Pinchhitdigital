import Link from "next/link";
import { ArrowRight, Building2, HardHat, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { INDUSTRY_PAGES } from "@/lib/industries";

// Homepage industries router: one card per vertical, linking to its landing
// page. Replaced the ?for= industry picker (2026-08 pivot); data comes from
// src/lib/industries.ts so the cards, nav dropdown, and pages stay in sync.

const ICONS = {
  "insurance-agencies": ShieldCheck,
  trades: HardHat,
  construction: Building2,
} as const;

export function Industries() {
  return (
    <section
      id="industries"
      className="border-b border-ink-900/10 bg-cream-50 px-6 py-16 md:px-8 lg:py-24"
    >
      <ScrollReveal className="mx-auto max-w-[1320px]">
        <p className="font-mono text-xs uppercase tracking-wider text-teal-700">
          Who we serve
        </p>
        <h2 className="mt-2 max-w-[24ch] font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
          Built for the way your industry answers the phone.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {INDUSTRY_PAGES.map((page) => {
            const Icon = ICONS[page.slug];
            return (
              <Link
                key={page.slug}
                href={`/industries/${page.slug}`}
                className="group flex flex-col rounded-3xl border border-ink-900/10 bg-white/70 p-8 transition-colors hover:border-teal-700/60"
              >
                <span className="inline-flex w-fit rounded-xl bg-ink-900 p-3">
                  <Icon size={22} className="text-teal-400" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-extrabold tracking-[-0.01em] text-ink-900">
                  {page.cardTitle}
                </h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-700">
                  {page.cardLine}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-ink-900">
                  See how it works
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

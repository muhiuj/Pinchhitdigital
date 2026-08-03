"use client";

import posthog from "posthog-js";
import { HardHat, Scale, Utensils, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  DEFAULT_INDUSTRY,
  INDUSTRIES,
  isIndustryKey,
  type IndustryKey,
} from "@/lib/industries";

// Industry picker + industry-aware problem section (one component so the
// selection state drives both). Deep-linkable: ?for=construction pre-selects
// a card (read in an effect to keep the page statically prerenderable), and
// selecting a card mirrors the choice back into the querystring so ads and
// referrals can copy the URL.

const ICONS: Record<IndustryKey, LucideIcon> = {
  construction: HardHat,
  professional: Scale,
  restaurants: Utensils,
};

export function IndustrySections() {
  const [selected, setSelected] = useState<IndustryKey>(DEFAULT_INDUSTRY);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("for");
    if (isIndustryKey(param)) setSelected(param);
  }, []);

  const pick = (key: IndustryKey) => {
    setSelected(key);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("for", key);
      window.history.replaceState(null, "", url);
      posthog.capture("industry_select", { industry: key });
    } catch {
      /* no-op */
    }
  };

  const active = INDUSTRIES.find((i) => i.key === selected) ?? INDUSTRIES[0];

  return (
    <>
      <section id="industries" className="scroll-mt-20 border-b border-ink-200 bg-cream-50 px-6 py-16 md:px-8 lg:py-20">
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
              Who it&rsquo;s for
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
              Pick your business. See{" "}
              <span className="font-serif italic text-teal-700">your</span>{" "}
              version.
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-[980px] grid-cols-1 gap-4 sm:grid-cols-3">
            {INDUSTRIES.map((industry) => {
              const Icon = ICONS[industry.key];
              const isActive = industry.key === selected;
              return (
                <button
                  key={industry.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => pick(industry.key)}
                  className={`rounded-2xl border p-6 text-left transition-all duration-200 ease-[cubic-bezier(.2,.7,.2,1)] ${
                    isActive
                      ? "-translate-y-1 border-ink-900 bg-ink-900 shadow-xl"
                      : "border-ink-900/10 bg-white hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  <Icon
                    size={26}
                    strokeWidth={1.75}
                    className={isActive ? "text-sun-400" : "text-teal-700"}
                  />
                  <h3
                    className={`mt-4 font-display text-[17px] font-extrabold ${
                      isActive ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {industry.label}
                  </h3>
                  <p
                    className={`mt-1.5 font-sans text-[13.5px] leading-snug ${
                      isActive ? "text-white/70" : "text-ink-600"
                    }`}
                  >
                    {industry.cardLine}
                  </p>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      <section id="problem" className="bg-cream-50 px-6 py-16 md:px-8 lg:py-24">
        <ScrollReveal className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
              The Problem &middot; {active.label}
            </p>
            <h2 className="mt-2 max-w-[16ch] font-display text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
              Great work doesn&rsquo;t pay for a slow{" "}
              <span className="font-serif italic text-teal-700">follow-up</span>.
            </h2>
            <p className="mt-6 max-w-[52ch] font-body text-[17px] leading-relaxed text-ink-700">
              {active.narrative}
            </p>
            <hr className="my-8 border-t border-ink-900/20" />
            <p className="max-w-[52ch] font-body text-[17px] leading-relaxed text-ink-700">
              {active.fix}
            </p>
          </div>

          <div>
            <div className="rounded-2xl bg-ink-900 p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-400">
                What the research shows
              </p>
              {active.stats.map((stat, i) => (
                <div key={stat.value}>
                  {i > 0 && <hr className="my-6 border-t border-ink-100/10" />}
                  <div className="font-display text-7xl font-extrabold leading-none text-sun-400">
                    {stat.value}
                  </div>
                  <p className="mt-2 font-body text-base text-ink-100/80">
                    {stat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

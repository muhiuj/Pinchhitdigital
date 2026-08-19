import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { IndustryPage } from "@/lib/industries";
import { IndustryCtaButton } from "./IndustryCtaButton";

// Shared template for /industries/* landing pages. All copy comes from
// src/lib/industries.ts; this component owns layout only. Register: light
// editorial (sibling of the case-study pages), one navy proof block, a
// sun-400 closing band consistent with the homepage.

export function IndustryLanding({ page }: { page: IndustryPage }) {
  const s = (placement: string) => `industry-${page.slug}-${placement}`;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <header className="phd-hero-grid border-b border-ink-900/10 bg-cream-50 px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,104px)]">
        <div className="mx-auto w-full max-w-[880px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
            {page.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-[20ch] font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-5xl md:text-6xl">
            {page.hero.h1}
          </h1>
          <p className="mt-6 max-w-[58ch] font-sans text-[17px] leading-relaxed text-ink-700 sm:text-lg">
            {page.hero.dek}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <IndustryCtaButton label={page.hero.cta} section={s("hero")} />
            {page.hero.secondary ? (
              <Link
                href={page.hero.secondary.href}
                className="inline-flex items-center gap-2 border-b border-ink-900 py-1 font-display text-[13px] font-semibold text-ink-900 transition-colors hover:border-teal-700 hover:text-teal-700"
              >
                {page.hero.secondary.label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="px-[clamp(16px,5vw,40px)] pt-[clamp(56px,9vw,96px)]">
        <ScrollReveal className="mx-auto w-full max-w-[720px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
            {page.problem.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
            {page.problem.heading}
          </h2>
          {page.problem.paras.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-6 font-sans text-[17px] leading-[1.8] text-ink-800 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </ScrollReveal>
      </section>

      {/* Proof: navy research block */}
      <section className="px-[clamp(16px,5vw,40px)] pt-[clamp(48px,7vw,72px)]">
        <ScrollReveal className="mx-auto w-full max-w-[880px]">
          <div className="rounded-3xl bg-[#1A1F36] p-7 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#4ECDC4]">
              {page.proof.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[26ch] font-display text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl">
              {page.proof.heading}
            </h2>
            <p className="mt-5 max-w-[64ch] font-sans text-[15px] leading-relaxed text-white/75 sm:text-base">
              {page.proof.para}
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {page.proof.stats.map((stat) => (
                <div key={stat.caption} className="bg-[#1A1F36] p-6">
                  <p className="font-display text-4xl font-extrabold tracking-[-0.02em] text-[#4ECDC4] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-white/65">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={page.proof.link.href}
              className="mt-7 inline-flex items-center gap-2 font-display text-sm font-bold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              {page.proof.link.label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* System: the four mechanisms */}
      <section className="px-[clamp(16px,5vw,40px)] pt-[clamp(56px,9vw,96px)]">
        <ScrollReveal className="mx-auto w-full max-w-[880px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
            {page.system.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
            {page.system.heading}
          </h2>
          <p className="mt-5 max-w-[62ch] font-sans text-base leading-relaxed text-ink-700 sm:text-[17px]">
            {page.system.intro}
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {page.system.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-ink-900/10 bg-white/70 p-7"
              >
                <CheckCircle2 size={20} className="text-teal-700" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-extrabold tracking-[-0.01em] text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-ink-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Engagement */}
      <section className="px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,96px)]">
        <ScrollReveal className="mx-auto w-full max-w-[720px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
            {page.engagement.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl">
            {page.engagement.heading}
          </h2>
          {page.engagement.paras.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-6 font-sans text-[17px] leading-[1.8] text-ink-800 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </ScrollReveal>
      </section>

      {/* Closing band */}
      <section className="phd-hero-grid bg-sun-400 px-[clamp(16px,5vw,40px)] py-[clamp(64px,10vw,112px)]">
        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="max-w-[24ch] font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink-900 md:text-5xl">
              {page.cta.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-relaxed text-ink-900/80 sm:text-lg">
              {page.cta.body}
            </p>
          </div>
          <div className="md:justify-self-end">
            <IndustryCtaButton label={page.cta.button} section={s("final")} />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-900/50">
              Free · 30 minutes · DFW
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

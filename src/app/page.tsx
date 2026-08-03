import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart2,
  CheckCircle2,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { FAQ_ITEMS } from "@/lib/faq";
import { HeroCollage } from "@/components/home/HeroCollage";
import { HeroGridHover } from "@/components/home/HeroGridHover";
import { IndustrySections } from "@/components/home/IndustrySections";
import { Proof } from "@/components/Proof";
import ScrollReveal from "@/components/ScrollReveal";
import { PLANS } from "@/lib/plans";

// Title/description inherit from layout.tsx; the canonical must be the www
// origin (a non-www → www redirect exists, and the canonical prevents any
// split-signal risk).
export const metadata: Metadata = {
  alternates: { canonical: "https://www.pinchhitdigital.com/" },
};

// FAQPage rich-result eligibility requires the answers to exist in the served
// HTML (they do now: the accordion keeps every answer in the DOM and hides the
// collapsed ones). Schema is built from the same FAQ_ITEMS the accordion renders.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// Price bands under the product cards read straight from src/lib/plans.ts so
// the homepage can never drift from the numbers published on /plans.
const cateringPlan = PLANS.find((p) => p.id === "catering");
const websitePlan = PLANS.find((p) => p.id === "website");

const dfwChips = [
  "Dallas",
  "Fort Worth",
  "Plano",
  "Arlington",
  "Frisco",
  "Irving",
  "Carrollton",
  "Grapevine",
];

type Step = {
  n: string;
  title: string;
  body: string;
  cta?: { href: string; label: string };
};

const flagshipFeatures = [
  "Responds to inquiries in under 5 minutes",
  "Multi-step drip follow-up sequence",
  "Booking calendar integration",
  "Monthly revenue gap report",
];

type Benefit = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const benefits: Benefit[] = [
  {
    icon: Zap,
    title: "Inquiries answered in minutes",
    body: "Your follow-up runs automatically, day or night. No manual checking, no leads going cold while you're in the weeds.",
  },
  {
    icon: MapPin,
    title: "Built for DFW, not for everyone",
    body: "We know this market. Your site is optimized for Dallas–Fort Worth local search from day one, not adjusted from a national template.",
  },
  {
    icon: UserCheck,
    title: "No tech knowledge required",
    body: "You don't need to understand how it works. You need to see the results. We handle the stack; you handle the business.",
  },
  {
    icon: BarChart2,
    title: "Revenue visibility, every month",
    body: "Monthly reports show exactly what the system is generating and where the next gap is. Numbers you can act on, not just read.",
  },
  {
    icon: Phone,
    title: "One contact. Not a help desk.",
    body: "Not a ticket queue. Not a support tier. You work directly with the person who built your system.",
  },
  {
    icon: RefreshCw,
    title: "Runs while you work",
    body: "The automations don't stop when you're slammed on a Saturday night. The system is always on, even when you can't be.",
  },
];

const websiteFeatures = [
  "Custom-built, not a template",
  "Google Business profile optimization",
  "Content and hours management",
  "Performance dashboard",
];

const steps: Step[] = [
  {
    n: "01",
    title: "Free 30-Minute Revenue Audit",
    body: "We look at your digital footprint, your booking flow, and how you handle inbound inquiries. No pitch, just a clear picture of what's costing you.",
    cta: {
      href: "https://cal.com/jeremy-muhiu-7gtclu/30min",
      label: "Book yours →",
    },
  },
  {
    n: "02",
    title: "We Build the System",
    body: "Website, automations, follow-up workflows. Built once. Runs without you watching it.",
  },
  {
    n: "03",
    title: "You Focus on Your Craft",
    body: "We handle the follow-ups, the updates, and the optimizations. You focus on the work.",
  },
];

export default function Home() {
  return (
    <>
      <header className="phd-hero-grid relative overflow-hidden bg-sun-400 px-6 pt-20 md:px-8">
        <HeroGridHover />
        <HeroCollage />

        <div className="relative mx-auto max-w-[1320px] pb-16">
          <div className="pointer-events-none relative z-10 mx-auto flex max-w-[820px] flex-col items-center pt-2 text-center lg:pt-10">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 py-1.5 pl-2 pr-4 font-display text-[12px] font-semibold tracking-[0.04em] text-cream-50">
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-teal-400 text-[11px] text-ink-900">
                ✶
              </span>
              Lead recovery · Built in DFW
            </span>

            <h1 className="mt-7 text-balance font-display text-[46px] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink-900 sm:text-6xl md:text-7xl lg:text-[96px]">
              Never lose another{" "}
              <span className="font-serif text-[0.92em] font-normal italic tracking-[-0.02em] text-teal-700">
                lead
              </span>
              .
            </h1>

            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.5] text-ink-900/85 md:text-[19px]">
              Automated response systems for small businesses across{" "}
              <span className="font-display font-bold">Dallas–Fort Worth</span>,
              so every inquiry gets a real answer in under five minutes. Built
              and run by the person who answers when you call.
            </p>

            <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://cal.com/jeremy-muhiu-7gtclu/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 px-6 py-4 font-display text-[13px] font-bold tracking-[0.04em] text-cream-50 transition-colors hover:bg-teal-700"
              >
                Book a demo <span>→</span>
              </a>
              <a
                href="#industries"
                className="inline-flex items-center gap-2 border-b border-ink-900 px-2 py-4 font-display text-[13px] font-semibold tracking-[0.02em] text-ink-900"
              >
                Find your business below
              </a>
            </div>
            <p className="pointer-events-auto mt-3 font-sans text-[14px] text-ink-900/70">
              Not ready to book?{" "}
              <Link
                href="/audit"
                className="font-semibold text-ink-900 underline decoration-ink-900/40 underline-offset-4 transition-colors hover:decoration-ink-900"
              >
                Take the free 60-second Catering Revenue Audit first.
              </Link>
            </p>
          </div>

          <div className="pointer-events-none relative z-10 mt-14 flex flex-wrap justify-center gap-2">
            {dfwChips.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900/[0.06] px-3.5 py-2 font-display text-[12px] font-semibold tracking-[0.02em] text-ink-900"
              >
                <MapPin size={12} />
                {city}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-900/[0.06] px-3.5 py-2 font-display text-[12px] font-semibold tracking-[0.02em] text-ink-900">
              <Plus size={12} />
              the whole Metroplex
            </span>
          </div>
        </div>
      </header>

      <IndustrySections />

      <section id="how-it-works" className="bg-ink-900 px-6 py-16 md:px-8 lg:py-24">
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
              The Process
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Three steps. Then it runs itself.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
                  {step.n}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/70">
                  {step.body}
                </p>
                {step.cta ? (
                  <a
                    href={step.cta.href}
                    target={step.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={step.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-6 inline-block font-display text-sm font-semibold text-teal-400 hover:underline"
                  >
                    {step.cta.label}
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10">
            <p className="pt-6 text-center font-mono text-xs text-white/30">
              Most clients are up and running within 2 weeks of their audit.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="what-we-build" className="bg-cream-50 px-6 py-16 md:px-8 lg:py-24">
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
            What We Build
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
            Two products. One focus.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-ink-900 p-10">
              <span className="inline-block rounded-full bg-sun-400/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-sun-400">
                Flagship
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-white">
                Catering Lead Recovery System
              </h3>
              <p className="mt-1 font-serif text-xl italic text-sun-400">
                Turn missed inquiries into booked events.
              </p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-white/70">
                Automated inquiry response, multi-step follow-up sequences,
                and monthly revenue reporting. Built for DFW operators with
                private event space: restaurants, venues, and caterers.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {flagshipFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-400"
                    />
                    <span className="font-sans text-[15px] text-white/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/catering-lead-recovery"
                className="mt-8 inline-block rounded-lg bg-sun-400 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-colors hover:bg-sun-300"
              >
                See how the system works →
              </a>
              {cateringPlan && (
                <p className="mt-4 font-sans text-[14px] text-white/70">
                  <Link
                    href="/plans"
                    className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {cateringPlan.priceLine}
                  </Link>
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-ink-900/10 bg-white p-10">
              <h3 className="font-display text-2xl font-extrabold text-ink-900">
                Website &amp; Digital Presence
              </h3>
              <p className="mt-1 font-serif text-xl italic text-teal-400">
                Built to be found. Built to convert.
              </p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-700">
                A custom-built website that ranks in local search, reflects
                your brand, and turns visitors into customers. Includes Google
                Business optimization and ongoing updates. No templates, no
                DIY.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {websiteFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-400"
                    />
                    <span className="font-sans text-[15px] text-ink-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/plans"
                className="mt-8 inline-block rounded-lg border-2 border-ink-900 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                See plans &amp; pricing →
              </a>
              {websitePlan && (
                <p className="mt-4 font-sans text-[14px] text-ink-700">
                  <Link
                    href="/plans"
                    className="underline decoration-ink-900/30 underline-offset-4 transition-colors hover:decoration-ink-900"
                  >
                    {websitePlan.priceLine}
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* The generalist truth, once, as one calm sentence (flagship-first,
              generalist-second). */}
          <p className="mt-10 max-w-[72ch] font-sans text-[16px] leading-relaxed text-ink-700">
            The same systems work for any owner-operated business where
            inquiries arrive faster than a small team can answer them.{" "}
            <Link
              href="/plans"
              className="font-semibold text-ink-900 underline decoration-ink-900/30 underline-offset-4 transition-colors hover:decoration-ink-900"
            >
              We build them for construction trades, professional services,
              and restaurants across DFW.
            </Link>
          </p>
        </ScrollReveal>
      </section>

      <section id="benefits" className="bg-ink-900 px-6 py-16 md:px-8 lg:py-24">
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
            Benefits
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-6xl">
            Experience the PHD{" "}
            <span className="font-serif italic text-teal-400">Advantage</span>.
          </h2>

          <hr className="mt-10 mb-0 border-t border-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              const isLastInRow = (i + 1) % 3 === 0;
              const isInLastRow = i >= benefits.length - 3;
              const isAbsoluteLast = i === benefits.length - 1;
              const classes = [
                "p-8 border-white/10",
                !isAbsoluteLast && "border-b",
                !isLastInRow && "md:border-r",
                isInLastRow && "md:border-b-0",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={benefit.title} className={classes}>
                  <div className="mb-5 inline-flex rounded-xl bg-cream-50 p-2.5">
                    <Icon size={20} className="text-sun-400" />
                  </div>
                  <h3 className="font-display text-[18px] font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed text-white/70">
                    {benefit.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 border-t border-white/10">
            <p className="pt-6 text-center font-mono text-xs text-white/30">
              What partnering with a small, focused team actually feels like.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Proof slot — invisible until a real restaurant testimonial exists.
          Pass a testimonial prop to render it (see src/components/Proof.tsx). */}
      <Proof />

      <section
        id="about"
        className="border-t border-ink-200 bg-cream-50 px-6 py-14 md:px-8 lg:py-20"
      >
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div className="flex flex-col">
              <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
                Pinch Hit Digital · DFW
              </p>

              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
                A small Dallas/Fort Worth
                <br />
                shop with a{" "}
                <span className="font-serif italic text-sun-400">
                  big bench
                </span>
                .
              </h2>

              <div className="mt-6 max-w-[48ch] space-y-4">
                <p className="font-sans text-[16px] leading-relaxed text-ink-700">
                  I spent years building systems for companies with dedicated
                  IT departments and automation budgets. Most DFW independent
                  operators don&rsquo;t have that. There&rsquo;s no reason
                  they shouldn&rsquo;t.
                </p>
                <p className="font-sans text-[16px] leading-relaxed text-ink-700">
                  Pinch Hit Digital exists to close that gap. No agency
                  overhead, no account manager you&rsquo;ll never meet, no
                  jargon. You get the systems the big operators take for
                  granted: built for your business, explained in plain
                  English, and supported directly by the person who built
                  them.
                </p>
                <p className="font-sans text-[16px] leading-relaxed text-ink-700">
                  That&rsquo;s the bench. Small team. Big capability. And
                  we&rsquo;re a phone call away if you need us.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <hr className="w-8 border-t border-ink-900/20" />
                <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                  Jeremy Muhiu &middot; Founder, Pinch Hit Digital
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-6 pt-8">
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-ink-800"
                >
                  Learn more →
                </a>
                <a
                  href="#what-we-build"
                  className="border-b border-ink-900 pb-0.5 font-display text-sm font-semibold text-ink-900 transition-colors hover:border-teal-400 hover:text-teal-400"
                >
                  See what we do
                </a>
              </div>
            </div>

            <div>
              <Image
                src="/founder.jpg"
                alt="Jeremy Muhiu, Founder of Pinch Hit Digital"
                width={560}
                height={640}
                className="h-full w-full rounded-2xl object-cover object-top"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQ />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section id="contact" className="bg-sun-400 px-6 pt-14 pb-12 md:px-8 lg:pt-20 lg:pb-16">
        <ScrollReveal className="mx-auto max-w-[1320px]">
          <div className="max-w-[900px]">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-ink-900/50">
              Ready to start?
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink-900 md:text-7xl">
              Stop leaving
              <br />
              revenue on
              <br />
              the{" "}
              <span className="font-serif italic text-teal-400">table</span>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-ink-900/70">
              30 minutes, on the phone or over coffee anywhere in DFW.
              We&rsquo;ll listen, look at your numbers, and tell you whether
              we&rsquo;re the right shop for the job, even if the honest
              answer is no.
            </p>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <a
                href="https://cal.com/jeremy-muhiu-7gtclu/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 font-display text-sm font-bold text-white transition-colors hover:bg-ink-800"
              >
                Book a demo →
              </a>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-900/40">
                It&rsquo;s 100% free.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </>
  );
}

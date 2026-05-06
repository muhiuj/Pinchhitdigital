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
import { HeroSlider } from "@/components/HeroSlider";

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

const tickerItems = [
  "Restaurants",
  "Cafés",
  "Caterers",
  "Bakeries",
  "Food Trucks",
  "Bars & Taprooms",
  "Custom Framing",
  "Hardware Stores",
  "Auto Shops",
  "Dental Clinics",
  "HVAC & Trades",
  "Independent Pharmacies",
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
    body: "Your follow-up runs automatically — day or night. No manual checking, no leads going cold while you're in the weeds.",
  },
  {
    icon: MapPin,
    title: "Built for DFW, not for everyone",
    body: "We know this market. Your site is optimized for Dallas–Fort Worth local search from day one — not adjusted from a national template.",
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

type FooterLink = { href: string; label: string };

const siteLinks: FooterLink[] = [
  { href: "#how-it-works", label: "Process" },
  { href: "#what-we-build", label: "Services" },
  { href: "#benefits", label: "Benefits" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

const companyLinks: FooterLink[] = [
  { href: "/plans", label: "Plans" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "#", label: "Everyday AI · YouTube" },
  { href: "mailto:info@pinchhitdigital.com", label: "Contact" },
];

const dfwLines = [
  "Dallas · Fort Worth",
  "Plano · Frisco · McKinney",
  "Arlington · Irving",
  "Carrollton · Grapevine",
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
    title: "Free 20-Min Revenue Audit",
    body: "We look at your digital footprint, your booking flow, and how you handle inbound inquiries. No pitch — just a clear picture of what's costing you.",
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
      <header className="relative overflow-hidden bg-sun-400 px-6 pt-20 md:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[58%] md:block"
        >
          <Image
            src="/phd-logo.png"
            alt=""
            fill
            priority
            sizes="60vw"
            className="object-contain object-right opacity-[0.18]"
          />
        </div>

        <div className="relative mx-auto max-w-[1320px] pb-16">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 py-1.5 pl-2 pr-4 font-display text-[12px] font-semibold tracking-[0.04em] text-cream-50">
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-teal-400 text-[11px] text-ink-900">
                ✶
              </span>
              Digital consulting for small business
            </span>

            <h1 className="mt-7 max-w-[14ch] text-balance font-display text-[64px] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink-900 sm:text-7xl md:text-8xl lg:text-[168px]">
              Get Found.
              <br />
              Win{" "}
              <span className="font-serif text-[0.96em] font-normal italic tracking-[-0.02em] text-teal-700">
                Customers
              </span>
              .
            </h1>
          </div>

          <div className="relative z-10 mt-14 grid items-end gap-10 border-t border-ink-900/20 pt-7 md:grid-cols-[1fr_auto] md:gap-16">
            <p className="max-w-[580px] text-[17px] leading-[1.5] text-ink-900/85 md:text-[19px]">
              Website. Workflows. Automation. We handle the digital side so you
              can focus on what you do best — restaurants, cafés, and small
              businesses across{" "}
              <span className="font-display font-bold">
                Dallas, Fort Worth, and the DFW Metroplex
              </span>
              .
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://cal.com/jeremy-muhiu-7gtclu/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 px-6 py-4 font-display text-[13px] font-bold tracking-[0.04em] text-cream-50 transition-colors hover:bg-teal-700"
              >
                Book a 30-min call <span>→</span>
              </a>
              <a
                href="#what-we-build"
                className="inline-flex items-center gap-2 border-b border-ink-900 px-2 py-4 font-display text-[13px] font-semibold tracking-[0.02em] text-ink-900"
              >
                See services
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <HeroSlider />
          </div>

          <div className="relative z-10 mt-7 flex flex-wrap gap-2">
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

      <section className="overflow-hidden bg-ink-900 py-6 text-cream-50">
        <div className="flex w-max animate-marquee items-center whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="inline-flex items-center gap-14 font-display text-base font-bold tracking-[0.04em]"
                >
                  {item}
                  <span className="text-sun-400">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="problem" className="bg-cream-50 px-6 py-16 md:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
              The Problem
            </p>
            <h2 className="mt-2 max-w-[14ch] font-display text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
              Great work doesn&rsquo;t pay for a slow follow-up.
            </h2>
            <p className="mt-6 max-w-[52ch] font-body text-[17px] leading-relaxed text-ink-700">
              Most DFW independent businesses lose revenue before the week is
              over &mdash; not because the work is bad, but because the inquiry
              sat in an inbox for 48 hours. By then, the client booked someone
              else.
            </p>
            <hr className="my-8 border-t border-ink-900/20" />
            <p className="max-w-[52ch] font-body text-[17px] leading-relaxed text-ink-700">
              Pinch Hit Digital builds the systems that give you your time
              back: automations that respond instantly, websites that reflect
              what you actually offer, and workflows that run while you&rsquo;re
              doing the work you&rsquo;re actually good at.
            </p>
          </div>

          <div>
            <div className="rounded-2xl bg-ink-900 p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-400">
                Revenue Impact
              </p>
              <div className="font-display text-7xl font-extrabold leading-none text-sun-400">
                60%
              </div>
              <p className="mt-2 font-body text-base text-ink-100/80">
                of catering and service inquiries get no response within 24
                hours.
              </p>
              <hr className="my-6 border-t border-ink-100/10" />
              <div className="font-display text-7xl font-extrabold leading-none text-sun-400">
                2&ndash;3&times;
              </div>
              <p className="mt-2 font-body text-base text-ink-100/80">
                revenue gap between reactive and proactive operators &mdash;
                once they run the numbers.
              </p>
              <p className="mt-6 font-mono text-xs text-ink-100/30">
                PHD Revenue Audit findings &middot; DFW 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-ink-900 px-6 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
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
        </div>
      </section>

      <section id="what-we-build" className="bg-cream-50 px-6 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
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
                private event space &mdash; restaurants, venues, and caterers.
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
                href="https://cal.com/jeremy-muhiu-7gtclu/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-lg bg-sun-400 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-colors hover:bg-sun-300"
              >
                Book a Free Audit →
              </a>
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
                Business optimization and ongoing updates &mdash; no
                templates, no DIY.
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
                href="#how-it-works"
                className="mt-8 inline-block rounded-lg border-2 border-ink-900 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                See How It Works →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-ink-900 px-6 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
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
        </div>
      </section>

      <section id="featured-client" className="bg-cream-50 px-6 py-14 md:px-8 lg:py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/cardinal-frames.png"
                alt="Jeremy Muhiu with the Cardinal Frames team — Carrollton, TX"
                width={640}
                height={480}
                className="h-full w-full rounded-2xl object-cover"
              />
              <span className="absolute left-4 top-4 inline-block rounded-full bg-sun-400 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-900">
                Featured Client
              </span>
            </div>

            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
                Cardinal Frames
                <br />
                &mdash;{" "}
                <span className="font-serif italic text-coral">
                  Carrollton, TX
                </span>
                .
              </h2>

              <p className="mt-6 max-w-[48ch] font-sans text-[16px] leading-relaxed text-ink-700">
                Every order is a one-off conversation. We&rsquo;re building
                the system that turns walk-in chats into clean estimates,
                scheduled pickups, and a calendar the team can trust &mdash;
                without losing the personal touch that makes the shop the
                shop.
              </p>

              <hr className="my-6 border-t border-ink-900/10" />

              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                    Industry
                  </p>
                  <p className="mt-1 font-display text-[15px] font-semibold text-ink-900">
                    Custom Framing
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                    Engagement
                  </p>
                  <p className="mt-1 font-display text-[15px] font-semibold text-ink-900">
                    In progress
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                    Location
                  </p>
                  <p className="mt-1 font-display text-[15px] font-semibold text-ink-900">
                    Carrollton, TX
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 border-b border-ink-900 pb-0.5 font-display text-[15px] font-semibold text-ink-900 transition-colors hover:border-teal-400 hover:text-teal-400"
              >
                Read the case study →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-ink-200 bg-cream-50 px-6 py-14 md:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[1320px]">
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
                  operators don&rsquo;t have that &mdash; but there&rsquo;s no
                  reason they shouldn&rsquo;t.
                </p>
                <p className="font-sans text-[16px] leading-relaxed text-ink-700">
                  Pinch Hit Digital exists to close that gap. No agency
                  overhead, no account manager you&rsquo;ll never meet, no
                  jargon. You get the systems the big operators take for
                  granted &mdash; built for your business, explained in plain
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
                  Jeremy Muhiu &mdash; Founder, Pinch Hit Digital
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
                alt="Jeremy Muhiu — Founder, Pinch Hit Digital"
                width={560}
                height={640}
                className="h-full w-full rounded-2xl object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <section id="contact" className="bg-sun-400 px-6 pt-14 pb-12 md:px-8 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-[1320px]">
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
              Thirty minutes — on the phone or over coffee anywhere in DFW.
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
                Book a 30-min call →
              </a>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-900/40">
                It&rsquo;s 100% free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink-900 px-6 pt-16 pb-8 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Image
                src="/phd-logo.png"
                alt="Pinch Hit Digital"
                width={40}
                height={40}
                className="mb-3"
              />
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-teal-400">
                Pinch Hit Digital
              </p>
              <p className="max-w-[28ch] font-sans text-sm leading-relaxed text-white/50">
                Digital consulting for small business. Website, workflows,
                and automation — built for the people who run things in
                Dallas, Fort Worth, and the DFW Metroplex.
              </p>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
                Site
              </p>
              <ul className="space-y-3">
                {siteLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
                Company
              </p>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
                DFW &amp; Nearby
              </p>
              <ul className="space-y-3">
                {dfwLines.map((line) => (
                  <li
                    key={line}
                    className="font-sans text-sm text-white/40"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="font-mono text-xs uppercase tracking-wider text-white/25">
              © 2026 Pinch Hit Digital · Dallas/Fort Worth, TX · All rights
              reserved
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-white/25">
              info@pinchhitdigital.com
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

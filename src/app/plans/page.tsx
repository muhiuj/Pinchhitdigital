import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Check, ShieldCheck, CalendarClock, UserRound } from "lucide-react";
import PlansFAQ from "@/components/PlansFAQ";
import PlansStickyCTA from "@/components/PlansStickyCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { CAL_URL, CTA_LABEL, PLANS } from "@/lib/plans";
import { plansSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing & Plans | Pinch Hit Digital — DFW Restaurant Systems",
  description:
    "Clear, upfront pricing for DFW restaurant catering lead recovery and custom websites. Starting at $2,000 + $750/mo. Book a free 30-minute audit.",
};

// Sentinel id watched by the mobile sticky CTA — placed right after card 1.
const STICKY_SENTINEL_ID = "plans-sticky-sentinel";

const INTRO =
  "Built for Dallas–Fort Worth operators. From catering lead recovery to the website customers find first. Three products, sold straight. Here's what each costs to grow your business.";

const PRICE_FOOTNOTE = "Final scope set on your free audit.";

const HOW_IT_WORKS = [
  {
    icon: ShieldCheck,
    text: "No surprises. The numbers above are real starting points. Your audit sets the final scope — no mystery invoice later.",
  },
  {
    icon: CalendarClock,
    text: "90 days to prove it. The catering system needs ~90 days to show results, so that's the minimum. After that, month-to-month. No long lock-ins.",
  },
  {
    icon: UserRound,
    text: "One person, not an account manager. You work directly with me, start to finish.",
  },
];

const GUARANTEE =
  "If the first audit shows there's nothing worth fixing, I'll tell you. The audit's free either way.";

export default function PlansPage() {
  return (
    <div className="bg-cream-50">
      {/* JSON-LD: one Service + Offer per product. Page-specific — pricing
          schema only belongs on /plans, so it renders here, not in layout. */}
      {plansSchema.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="px-6 pb-10 pt-16 md:pb-14 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-wider text-teal-700">
            Plans · Pinch Hit Digital
          </p>
          <h1 className="mt-3 max-w-[18ch] font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
            Plain pricing.{" "}
            <span className="font-serif italic text-teal-600">
              No agency runaround.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-700">
            Here&rsquo;s what it costs to build with PHD. Final scope is set on
            a free 30-minute audit, but you won&rsquo;t have to chase to get a
            baseline number.
          </p>
          <p className="mt-3 max-w-2xl text-base text-ink-500">{INTRO}</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 pb-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isDark = plan.highlight;
            return (
              <Fragment key={plan.id}>
              <ScrollReveal delayMs={i * 80} className="h-full">
                <div
                  id={`plan-${plan.id}`}
                  className={`flex h-full flex-col rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md ${
                    isDark
                      ? "border-teal-400/40 bg-ink-900"
                      : "border-ink-200 bg-white"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge ? (
                    <span
                      className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-widest ${
                        isDark
                          ? "bg-sun-400 text-ink-900"
                          : "border border-teal-400 text-teal-700"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  ) : (
                    // Spacer keeps the three card headers aligned when one
                    // card has no badge.
                    <span className="mb-4 h-[26px]" aria-hidden />
                  )}

                  <h2
                    className={`font-display text-lg font-extrabold leading-snug md:min-h-[3.5rem] ${
                      isDark ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {plan.displayName ?? plan.name}
                  </h2>
                  <p
                    className={`mt-1 text-sm font-semibold ${
                      isDark ? "text-cream-50/70" : "text-ink-500"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price block — the number is the hero, especially on mobile. */}
                  <div
                    className={`mt-6 border-t pt-6 ${
                      isDark ? "border-white/10" : "border-ink-200"
                    }`}
                  >
                    <p
                      className={`font-display text-2xl font-extrabold leading-tight md:text-[26px] ${
                        isDark ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {plan.priceLine}
                    </p>
                    <p
                      className={`mt-2 text-sm ${
                        isDark ? "text-cream-50/60" : "text-ink-500"
                      }`}
                    >
                      {plan.terms}
                    </p>
                    <p
                      className={`mt-1 font-mono text-xs uppercase tracking-wider ${
                        isDark ? "text-teal-400" : "text-teal-700"
                      }`}
                    >
                      {PRICE_FOOTNOTE}
                    </p>
                  </div>

                  {/* Feature checklist */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check
                          size={18}
                          className={`mt-0.5 shrink-0 ${
                            isDark ? "text-sun-400" : "text-teal-600"
                          }`}
                          aria-hidden
                        />
                        <span
                          className={`text-base leading-relaxed ${
                            isDark ? "text-cream-50/80" : "text-ink-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.microProof ? (
                    <p
                      className={`mt-5 rounded-lg p-3 text-sm leading-relaxed ${
                        isDark
                          ? "bg-white/5 text-cream-50/70"
                          : "bg-cream-100 text-ink-600"
                      }`}
                    >
                      {plan.microProof}
                    </p>
                  ) : null}

                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
                  >
                    {CTA_LABEL}
                  </a>
                </div>
              </ScrollReveal>
              {/* Mobile-only flow sentinel placed right after card 1. It's
                  md:hidden (display:none on desktop) so it's removed from the
                  grid there and the 3-column row stays intact. */}
              {i === 0 ? (
                <div
                  id={STICKY_SENTINEL_ID}
                  className="h-0 md:hidden"
                  aria-hidden
                />
              ) : null}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/* How pricing works */}
      <section className="px-6 py-14 md:py-16">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-start gap-3">
                <Icon size={24} className="text-teal-600" aria-hidden />
                <p className="text-base leading-relaxed text-ink-700">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Trust signals */}
      <section className="px-6 pb-14 md:pb-16">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-teal-700">
            Built for DFW, not for everyone
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl font-extrabold leading-snug text-ink-900 md:text-3xl">
            {GUARANTEE}
          </p>
          <p className="mt-6 text-base text-ink-500">
            Currently building the system for{" "}
            <span className="font-semibold text-ink-900">Cardinal Frames</span>{" "}
            in Carrollton, TX.
          </p>
        </ScrollReveal>
      </section>

      {/* Mini-FAQ */}
      <section className="px-6 pb-16 md:pb-20">
        <ScrollReveal className="mx-auto max-w-[720px]">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-teal-700">
            FAQ
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-4xl">
            Straight answers on{" "}
            <span className="font-serif italic text-teal-600">pricing</span>.
          </h2>
          <div className="mt-10">
            <PlansFAQ />
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20">
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-ink-900 px-8 py-16 text-center">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
              Not sure which one fits?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-400">
              That&rsquo;s what the audit is for. Thirty minutes, no pitch if
              it&rsquo;s not a fit. Just a clear picture of what&rsquo;s worth
              fixing.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
            >
              Book a 30-min call →
            </a>
            <p className="mt-6 text-sm text-ink-400">
              Prefer to read first?{" "}
              <Link
                href="/guides"
                className="font-semibold text-teal-400 underline-offset-4 hover:underline"
              >
                Grab a free guide
              </Link>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>

      <PlansStickyCTA sentinelId={STICKY_SENTINEL_ID} />
    </div>
  );
}

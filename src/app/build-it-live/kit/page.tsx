import type { Metadata } from "next";
import { ArrowRight, Play } from "lucide-react";
import { Section } from "@/components/catering/primitives";
import { CopyBlock } from "@/components/build-it-live/CopyBlock";
import {
  COWORK_IDEAS,
  KIT_HERO,
  KIT_LINKS,
  KIT_STEPS,
  KIT_UPDATED,
  MONTH_PLAN_PROMPT,
  MORNING_PROMPT,
  SHUTDOWN_PROMPT,
  type KitStep,
} from "@/lib/webinar-kit";

// /build-it-live/kit — the Session 002 take-home kit, linked from the
// attendee follow-up email. Unlisted on purpose (noindex, not in the
// sitemap): the kit was promised to the people in the room. Copy lives in
// src/lib/webinar-kit.ts.

export const metadata: Metadata = {
  title: "Build It Live Kit: Plan Your Month with Claude | Pinch Hit Digital",
  description:
    "The Session 002 take-home kit: the monthly planning board, Claude Desktop setup, connectors, and the daily prompts.",
  robots: { index: false, follow: false },
};

function StepCard({ step, index }: { step: KitStep; index: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-400 font-display text-lg font-extrabold text-ink-900">
          {index + 1}
        </span>
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-cream-50 sm:text-[28px]">
          {step.title}
        </h2>
        <span className="rounded-full border border-white/[0.12] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-body">
          {step.minutes}
        </span>
      </div>
      <p className="mt-4 max-w-[64ch] font-sans text-base leading-relaxed text-body">
        {step.why}
      </p>

      {step.path && (
        <div
          className="mt-5 flex flex-wrap items-center gap-2"
          aria-label={`Click path: ${step.path.join(", then ")}`}
        >
          {step.path.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="rounded-md border border-sun-400/40 bg-sun-400/[0.1] px-3 py-1.5 font-mono text-[13px] text-sun-300">
                {p}
              </span>
              {i < step.path!.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-body-dim" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      )}

      <ol className="mt-6 space-y-3">
        {step.substeps.map((s, i) => (
          <li key={s} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-mono text-xs text-teal-400">
              {i + 1}
            </span>
            <span className="font-sans text-[15px] leading-relaxed text-cream-50/90">
              {s}
            </span>
          </li>
        ))}
      </ol>

      {step.id === "handoff" && (
        <CopyBlock label="Month plan prompt" text={MONTH_PLAN_PROMPT} trackId="month-plan" />
      )}
      {step.id === "daily" && (
        <>
          <CopyBlock label="Morning brief prompt" text={MORNING_PROMPT} trackId="morning" />
          <CopyBlock label="Shutdown ritual prompt" text={SHUTDOWN_PROMPT} trackId="shutdown" />
        </>
      )}

      {step.note && (
        <p className="mt-6 rounded-xl border border-teal-400/25 bg-teal-400/[0.06] px-5 py-4 font-sans text-[14px] leading-relaxed text-cream-50/85">
          {step.note}
        </p>
      )}
    </div>
  );
}

export default function BuildItLiveKitPage() {
  return (
    <div className="bg-canvas">
      <section className="phd-hero-grid-dark relative overflow-hidden bg-canvas px-[clamp(16px,5vw,40px)] pt-[clamp(40px,8vw,80px)] pb-[clamp(40px,7vw,72px)]">
        <div className="relative z-10 mx-auto w-full max-w-[880px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-400">
            {KIT_HERO.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] text-cream-50 sm:text-5xl">
            Plan the month. Let Claude keep it{" "}
            <span className="font-serif text-[1.08em] italic text-teal-400">honest</span>.
          </h1>
          <p className="mt-6 max-w-[62ch] font-sans text-base leading-relaxed text-body sm:text-lg">
            {KIT_HERO.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={KIT_LINKS.miroBoard}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-sun-400 px-7 font-display text-base font-bold text-ink-900 transition-colors hover:bg-sun-300"
            >
              Open the planning board
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={KIT_LINKS.replay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/[0.16] px-7 font-display text-base font-bold text-cream-50 transition-colors hover:border-teal-400 hover:text-teal-400"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Watch the replay
            </a>
          </div>

          <nav aria-label="Kit steps" className="mt-10 grid gap-2 sm:grid-cols-2">
            {KIT_STEPS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors hover:border-teal-400/50"
              >
                <span className="font-sans text-[14px] text-cream-50">
                  <span className="mr-2 font-mono text-teal-400">{i + 1}</span>
                  {s.title}
                </span>
                <span className="font-mono text-[11px] text-body-dim">{s.minutes}</span>
              </a>
            ))}
          </nav>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-body-dim">
            Steps checked against Claude&rsquo;s help center on {KIT_UPDATED}. Claude
            updates its layout often. If a label looks different, the step still exists.
          </p>
        </div>
      </section>

      {KIT_STEPS.map((step, i) => (
        <Section
          key={step.id}
          id={step.id}
          tone={i % 2 === 0 ? "surface" : "canvas"}
          className="scroll-mt-20"
        >
          <div className="mx-auto max-w-[880px]">
            <StepCard step={step} index={i} />
          </div>
        </Section>
      ))}

      <Section id="more" tone={KIT_STEPS.length % 2 === 0 ? "surface" : "canvas"}>
        <div className="mx-auto max-w-[880px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-400">
            Beyond planning
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
            More ways to use{" "}
            <span className="font-serif italic text-teal-400">Cowork</span>
          </h2>
          <p className="mt-4 max-w-[62ch] font-sans text-base leading-relaxed text-body">
            Once your calendar, email, and CRM are connected, the same setup handles
            more than your schedule. A few I use or recommend:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {COWORK_IDEAS.map((idea) => (
              <div
                key={idea.title}
                className="rounded-2xl border border-white/[0.08] bg-card p-6"
              >
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-cream-50">
                  {idea.title}
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-body">
                  {idea.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="phd-hero-grid border-t border-black/10 bg-sun-400 px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,96px)]">
        <div className="mx-auto flex w-full max-w-[880px] flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[46ch]">
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink-900">
              Stuck on a step?
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-800">
              Reply to my email or write to jeremy.muhiu@pinchhitdigital.com and
              I&rsquo;ll help you get it running. Want it set up for your whole team?
              Book a time below.
            </p>
          </div>
          <a
            href={KIT_LINKS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-8 font-display text-base font-bold text-cream-50 transition-colors hover:bg-ink-800"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

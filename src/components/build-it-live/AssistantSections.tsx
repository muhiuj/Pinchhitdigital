import { Check, X } from "lucide-react";
import { Eyebrow, Section } from "@/components/catering/primitives";
import { AGENDA, FAQ_ITEMS, KIT, LEAVE_WITH, STORY, WHO } from "@/lib/webinars";

// Session 002 content bands (the AI-assistant pivot), top to bottom per the
// rebuild prompt: what you leave with, the honest story, the agenda, the
// kit, who it's for, and the FAQ. All copy in src/lib/webinars.ts.

export function LeaveWith() {
  return (
    <Section id="leave-with" tone="surface">
      <Eyebrow n="01" label="What you leave with" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        What you{" "}
        <span className="font-serif italic text-teal-400">leave with</span>
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {LEAVE_WITH.items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/[0.08] bg-card p-6"
          >
            <p className="font-mono text-xs text-teal-400">0{i + 1}</p>
            <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.01em] text-cream-50">
              {item.title}
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HonestStory() {
  return (
    <Section id="how-i-got-here" tone="canvas">
      <Eyebrow n="02" label="How I got here" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        How I <span className="font-serif italic text-teal-400">got here</span>
      </h2>
      <div className="mt-6 max-w-[68ch] space-y-5">
        {STORY.paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="font-sans text-base leading-relaxed text-body sm:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

export function Agenda() {
  return (
    <Section id="agenda" tone="surface">
      <Eyebrow n="03" label="The 50 minutes" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        What happens in the{" "}
        <span className="font-serif italic text-teal-400">50 minutes</span>
      </h2>

      <ol className="mt-10 max-w-[720px] space-y-4">
        {AGENDA.items.map((item) => (
          <li
            key={item.body}
            className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-card p-5"
          >
            <span className="mt-0.5 flex-shrink-0 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-xs text-teal-400">
              {item.time}
            </span>
            <p className="font-sans text-[15px] leading-relaxed text-body">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[720px] rounded-2xl border border-sun-400/25 bg-sun-400/[0.06] p-5 font-sans text-[15px] leading-relaxed text-sun-300">
        {AGENDA.kitLine}
      </p>
    </Section>
  );
}

export function Kit() {
  return (
    <Section id="kit" tone="canvas">
      <Eyebrow n="04" label="The kit" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        The <span className="font-serif italic text-teal-400">kit</span>
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {KIT.items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/[0.08] bg-card p-6"
          >
            <p className="font-mono text-xs text-teal-400">0{i + 1}</p>
            <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.01em] text-cream-50">
              {item.title}
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-[68ch] font-sans text-[15px] leading-relaxed text-body-dim">
        {KIT.gatingLine}
      </p>
    </Section>
  );
}

export function WhoFor() {
  return (
    <Section id="who" tone="surface">
      <Eyebrow n="05" label="Who this is for" />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.08] bg-card p-6">
          <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-cream-50">
            {WHO.forHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {WHO.forItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-1 h-4 w-4 flex-shrink-0 text-teal-400"
                  aria-hidden="true"
                />
                <span className="font-sans text-[15px] leading-relaxed text-body">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-card p-6">
          <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-cream-50">
            {WHO.notHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {WHO.notItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X
                  className="mt-1 h-4 w-4 flex-shrink-0 text-coral"
                  aria-hidden="true"
                />
                <span className="font-sans text-[15px] leading-relaxed text-body">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" tone="canvas">
      <Eyebrow n="06" label="Questions" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        Quick <span className="font-serif italic text-teal-400">answers</span>
      </h2>
      <div className="mt-8 max-w-[720px] space-y-5">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-white/[0.08] bg-card p-6"
          >
            <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-cream-50">
              {item.q}
            </h3>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-body">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

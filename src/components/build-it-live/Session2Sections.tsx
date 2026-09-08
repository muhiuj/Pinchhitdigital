import { Eyebrow, Section } from "@/components/catering/primitives";
import { COVER, INVITE, TAKEAWAY, TEACHER } from "@/lib/webinars";

// Session 002 content bands, top to bottom per the build prompt: the
// live-search invitation, the three-item cover list, the takeaway, and the
// credibility band. All copy verbatim from src/lib/webinars.ts.

export function Invite() {
  return (
    <Section id="live-search" tone="surface">
      <Eyebrow n="01" label="Bring your industry" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        Your industry, searched{" "}
        <span className="font-serif italic text-teal-400">live</span>.
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {INVITE.body}
      </p>
    </Section>
  );
}

export function Cover() {
  return (
    <Section id="covered" tone="canvas">
      <Eyebrow n="02" label="What we'll cover" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        What we&rsquo;ll{" "}
        <span className="font-serif italic text-teal-400">cover</span>
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {COVER.items.map((item, i) => (
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

export function Takeaway() {
  return (
    <Section id="takeaway" tone="surface">
      <Eyebrow n="03" label="What you leave with" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        What you{" "}
        <span className="font-serif italic text-teal-400">leave with</span>
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {TAKEAWAY.body}
      </p>
    </Section>
  );
}

export function Teacher() {
  return (
    <Section id="teacher" tone="canvas">
      <Eyebrow n="04" label="Who's teaching" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        Who&rsquo;s{" "}
        <span className="font-serif italic text-teal-400">teaching</span>
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {TEACHER.body}
      </p>
    </Section>
  );
}

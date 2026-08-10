import { Eyebrow, Section } from "@/components/catering/primitives";
import { RECORDING } from "@/lib/webinars";

// 04 · Recording policy: registrants-only, stated plainly. Replaces the
// public-replay archive for session 001 (the PAST_SESSIONS model stays in
// the lib for future months if the policy changes).

export function Recording() {
  return (
    <Section id="recording" tone="canvas">
      <Eyebrow n="04" label="Can't make it live?" />
      <h2 className="mt-5 max-w-[24ch] font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        Register anyway. The{" "}
        <span className="font-serif italic text-teal-400">recording</span>{" "}
        comes to you.
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {RECORDING.body}
      </p>
    </Section>
  );
}

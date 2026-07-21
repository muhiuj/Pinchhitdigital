import { Eyebrow, Section } from "@/components/catering/primitives";
import { WHO } from "@/lib/webinars";

// 03 · Who this is for. One calm paragraph: restaurant owner-operators first,
// door held open for other owner-operated businesses (max three industries
// named, per the positioning rules).

export function WhoItsFor() {
  return (
    <Section id="who" tone="surface">
      <Eyebrow n="03" label="Who this is for" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {WHO.h2}
      </h2>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-body sm:text-lg">
        {WHO.body}
      </p>
    </Section>
  );
}

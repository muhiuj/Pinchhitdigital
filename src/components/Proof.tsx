// Homepage proof slot. Replaces the old "Featured Client" section with a
// single testimonial card that renders ONLY when a real restaurant quote
// exists. Until then the section is invisible: pass no testimonial and the
// component returns null. Never fabricate a quote to fill it.
//
// When the first real testimonial lands, render it from src/app/page.tsx:
//   <Proof
//     testimonial={{
//       quote: "...",
//       name: "First Last",
//       business: "Restaurant Name",
//       city: "Dallas, TX",
//     }}
//   />

import ScrollReveal from "@/components/ScrollReveal";

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  city: string;
}

interface ProofProps {
  testimonial?: Testimonial;
}

export function Proof({ testimonial }: ProofProps) {
  if (!testimonial) return null;

  return (
    <section id="proof" className="bg-cream-50 px-6 py-14 md:px-8 lg:py-20">
      <ScrollReveal className="mx-auto max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
          From a DFW operator
        </p>
        <figure className="mt-6 rounded-2xl border border-ink-900/10 bg-white p-8 md:p-10">
          <blockquote className="font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-ink-900 md:text-3xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <hr className="w-8 border-t border-ink-900/20" />
            <span className="font-sans text-[15px] text-ink-700">
              <span className="font-semibold text-ink-900">
                {testimonial.name}
              </span>
              , {testimonial.business} · {testimonial.city}
            </span>
          </figcaption>
        </figure>
      </ScrollReveal>
    </section>
  );
}

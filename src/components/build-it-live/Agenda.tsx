import { Eyebrow, Section } from "@/components/catering/primitives";
import { AGENDA } from "@/lib/webinars";

// 02 · The agenda: the 50 minutes as a timeline. Mono timestamps anchor each
// row. Copy verbatim from the final copy doc.

export function Agenda() {
  return (
    <Section id="agenda" tone="canvas">
      <Eyebrow n="02" label="The agenda" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {AGENDA.h2}
      </h2>

      <ol className="mt-10 max-w-[760px]">
        {AGENDA.items.map((item, i) => (
          <li
            key={item.time}
            className={`relative flex gap-5 pb-8 sm:gap-8 ${
              i === AGENDA.items.length - 1 ? "pb-0" : ""
            }`}
          >
            {/* Timeline rail */}
            {i < AGENDA.items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[27px] top-8 h-full w-px bg-white/[0.08] sm:left-[31px]"
              />
            )}
            <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-teal-400/30 bg-card font-mono text-[13px] text-teal-400 sm:h-16 sm:w-16">
              {item.time}
            </span>
            <p className="pt-3 font-sans text-[15px] leading-relaxed text-body sm:pt-4 sm:text-base">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

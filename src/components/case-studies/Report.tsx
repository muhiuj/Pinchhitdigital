import Link from "next/link";
import type { ReportPara, ReportSection } from "@/lib/case-studies";

// Long-form report renderer, light editorial register: 720px reading
// column, large body type, mono numbered kickers above each heading.
// Copy lives in src/lib/case-studies.ts; this component only handles
// typography and the spec'd inline cross-links.

function Para({ para, className }: { para: ReportPara; className: string }) {
  if (!para.link) {
    return <p className={className}>{para.text}</p>;
  }

  const { text, link } = para;
  const i = text.indexOf(link.text);
  if (i === -1) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.slice(0, i)}
      <Link
        href={link.href}
        className="underline decoration-teal-700/50 underline-offset-4 transition-colors hover:decoration-teal-700"
      >
        {link.text}
      </Link>
      {text.slice(i + link.text.length)}
    </p>
  );
}

const paraClass =
  "mt-6 font-sans text-[17px] leading-[1.8] text-ink-800 sm:text-lg first:mt-0";

export function Report({
  sections,
  bio,
}: {
  sections: ReportSection[];
  bio?: ReportPara;
}) {
  return (
    <div className="px-[clamp(16px,5vw,40px)]">
      <div className="mx-auto w-full max-w-[720px]">
        {sections.map((section, si) => (
          <section
            key={section.heading ?? `block-${si}`}
            className="mt-16 first:mt-0"
          >
            {section.eyebrow ? (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
                {section.eyebrow}
              </p>
            ) : null}
            {section.heading ? (
              <h2 className="mb-7 font-display text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
                {section.heading}
              </h2>
            ) : null}
            {section.paras.map((para) => (
              <Para key={para.text.slice(0, 40)} para={para} className={paraClass} />
            ))}
          </section>
        ))}

        {bio ? (
          <Para
            para={bio}
            className="mt-14 border-t border-ink-900/10 pt-8 font-sans text-[15px] leading-relaxed text-ink-600"
          />
        ) : null}
      </div>
    </div>
  );
}

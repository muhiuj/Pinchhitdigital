import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Hero stat band shared by both field reports: report-cover feel, not
// dashboard feel. Navy #1A1F36 with white type and teal #4ECDC4 accents
// (spec'd departure from the --phd-* scale, scoped to the studies'
// covers and charts). Single-color headline: no two-tone accents here.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";

export interface StudyHeroData {
  eyebrow: string;
  title: string;
  dek: string;
  stats: readonly { value: string; caption: string }[];
}

export function StudyHero({
  hero,
  crossLink,
}: {
  hero: StudyHeroData;
  crossLink?: { label: string; href: string };
}) {
  return (
    <section
      className="phd-hero-grid-dark px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,104px)]"
      style={{ backgroundColor: NAVY }}
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-[22ch] font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-[58ch] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
          {hero.dek}
        </p>

        {crossLink ? (
          <Link
            href={crossLink.href}
            className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            style={{ color: TEAL }}
          >
            {crossLink.label}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : null}

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <div
              key={stat.caption}
              className="p-6 sm:p-8"
              style={{ backgroundColor: NAVY }}
            >
              <p
                className="font-display text-6xl font-extrabold tracking-[-0.02em] md:text-7xl"
                style={{ color: TEAL }}
              >
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-white/55">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

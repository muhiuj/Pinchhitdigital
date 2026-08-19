import { STUDY_HERO } from "@/lib/case-studies";

// Hero stat band: report-cover feel, not dashboard feel. Navy #1A1F36 with
// white type and teal #4ECDC4 accents per the build spec (a deliberate,
// spec'd departure from the --phd-* scale, scoped to this study's cover and
// charts). Extra bottom padding leaves room for the video card to overlap.

const NAVY = "#1A1F36";
const TEAL = "#4ECDC4";

export function StudyHero() {
  return (
    <section
      className="phd-hero-grid-dark px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,104px)]"
      style={{ backgroundColor: NAVY }}
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
          {STUDY_HERO.eyebrow}
        </p>

        <h1 className="mt-6 max-w-[22ch] font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
          {STUDY_HERO.title}
        </h1>

        <p className="mt-6 max-w-[58ch] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
          {STUDY_HERO.dek}
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {STUDY_HERO.stats.map((stat) => (
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

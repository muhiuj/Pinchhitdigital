import { HERO } from "@/lib/webinars";
import { RegisterForm } from "./RegisterForm";

// Hero: session pitch on the left, the registration form in the hero itself
// (spec: never below the fold, never a link out). Copy verbatim from the
// final copy doc; serif accent on "missed call." per the design system.
// eventLine + gcalUrl come from the live BIL Sessions row (ISR) with the
// static webinars.ts values as fallback.

interface HeroProps {
  eventLine?: string;
  gcalUrl?: string;
}

export function Hero({ eventLine = HERO.eventLine, gcalUrl }: HeroProps) {
  return (
    <section
      id="register"
      className="relative scroll-mt-20 overflow-hidden bg-canvas px-[clamp(16px,5vw,40px)] pt-[clamp(40px,8vw,80px)] pb-[clamp(40px,7vw,72px)]"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 py-[7px] pl-[9px] pr-[14px] font-mono text-xs tracking-[0.04em] text-body">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-teal-400" />
            {HERO.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-5xl lg:text-[60px]">
            The $27,000{" "}
            <span className="font-serif text-[1.08em] italic text-teal-400">
              missed call.
            </span>
          </h1>

          <p className="mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-body sm:text-lg">
            {HERO.subhead}
          </p>

          <p className="mt-6 inline-flex rounded-lg border border-sun-400/30 bg-sun-400/[0.08] px-4 py-2.5 font-mono text-[13px] tracking-[0.02em] text-sun-300">
            {eventLine}
          </p>
        </div>

        <div className="lg:pt-2">
          <RegisterForm gcalUrl={gcalUrl} />
        </div>
      </div>
    </section>
  );
}

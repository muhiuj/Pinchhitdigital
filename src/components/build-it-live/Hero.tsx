import Image from "next/image";
import { HERO } from "@/lib/webinars";
import { RegisterForm } from "./RegisterForm";

// Hero: value-led pitch + the 1A event card art on the left, registration
// form on the right (spec: the form lives in the hero, never below the fold).
// The faint 72px grid gives the band the homepage's texture; the card floats
// gently (CSS only, reduced-motion exempt). H1 matches the promo card:
// "Watch a $3,000 system get built. Free."

interface HeroProps {
  eventLine?: string;
  gcalUrl?: string;
}

export function Hero({ eventLine = HERO.eventLine, gcalUrl }: HeroProps) {
  return (
    <section
      id="register"
      className="phd-hero-grid-dark relative scroll-mt-20 overflow-hidden bg-canvas px-[clamp(16px,5vw,40px)] pt-[clamp(40px,8vw,80px)] pb-[clamp(40px,7vw,72px)]"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 py-[7px] pl-[9px] pr-[14px] font-mono text-xs tracking-[0.04em] text-body">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
            {HERO.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-5xl lg:text-[56px]">
            Watch a{" "}
            <span className="font-serif text-[1.08em] italic text-teal-400">
              $3,000
            </span>{" "}
            system get built. Free.
          </h1>

          <p className="mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-body sm:text-lg">
            {HERO.subhead}
          </p>

          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-body-dim">
            {HERO.priceNote}
          </p>

          <p className="mt-6 inline-flex rounded-lg border border-sun-400/30 bg-sun-400/[0.08] px-4 py-2.5 font-mono text-[13px] tracking-[0.02em] text-sun-300">
            {eventLine}
          </p>

          {/* The 1A event card, as shipped on socials (desktop only). */}
          <div className="mt-10 hidden max-w-[400px] -rotate-[1.5deg] lg:block">
            <div className="phd-float" style={{ "--float-dur": "6.2s" } as React.CSSProperties}>
              <Image
                src="/build-it-live/event-card.jpg"
                alt="Build It Live event card: watch a $3,000 system get built, free. Tuesday, August 18 at 2:00 PM Central, online."
                width={1080}
                height={1080}
                sizes="400px"
                className="rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="lg:pt-2">
          <RegisterForm gcalUrl={gcalUrl} />
        </div>
      </div>
    </section>
  );
}

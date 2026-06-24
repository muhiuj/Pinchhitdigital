import Image from "next/image";
import { HERO } from "@/lib/catering";
import { CateringCTA } from "./CateringCTA";
import { ChaosOrderHero } from "./ChaosOrderHero";

// Hero (spec §4 + §12). Headline is the page's single <h1>. The animated
// chaos→order funnel sits beside it on desktop / below on mobile; its box
// reserves space (fixed height) so there's no layout shift as it loops. A
// giant faint PHD logo watermark sits behind, top-right (from the export).

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-[clamp(16px,5vw,40px)] pt-[clamp(48px,10vw,96px)] pb-[clamp(40px,7vw,72px)]">
      <Image
        src="/phd-logo.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        priority
        className="pointer-events-none absolute -right-40 -top-28 z-0 select-none opacity-[0.05]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 py-[7px] pl-[9px] pr-[14px] font-mono text-xs tracking-[0.04em] text-body">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-teal-400" />
            {HERO.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-5xl lg:text-[56px]">
            You&apos;re not losing catering to a better restaurant. You&apos;re
            losing it to{" "}
            <span className="font-serif text-[1.08em] italic text-teal-400">
              a slower reply.
            </span>
          </h1>

          <p className="mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-body sm:text-lg">
            {HERO.subhead}
          </p>

          <div className="mt-9">
            <CateringCTA section="hero" label={HERO.cta} micro={HERO.ctaMicro} />
          </div>
        </div>

        <div className="lg:pl-4">
          <ChaosOrderHero />
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { FeedbackForm } from "@/components/build-it-live/FeedbackForm";
import { FEEDBACK_COPY } from "@/lib/webinar-kit";

// /build-it-live/feedback?r=<signup row id>&u=<one-click answer> — the
// post-session survey linked from the follow-up email. Unlisted (noindex);
// without a valid token it shows a reply-by-email fallback.

export const metadata: Metadata = {
  title: "Build It Live Feedback | Pinch Hit Digital",
  robots: { index: false, follow: false },
};

export default async function BuildItLiveFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ r?: string; u?: string }>;
}) {
  const { r, u } = await searchParams;
  return (
    <div className="phd-hero-grid-dark min-h-[70vh] bg-canvas px-[clamp(16px,5vw,40px)] py-[clamp(40px,8vw,80px)]">
      <div className="relative z-10 mx-auto w-full max-w-[640px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-400">
          Build It Live · Session 002
        </p>
        <h1 className="mt-4 font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] text-cream-50 sm:text-4xl">
          {FEEDBACK_COPY.heading}
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-body sm:text-lg">
          {FEEDBACK_COPY.intro}
        </p>
        <div className="mt-8">
          <FeedbackForm token={r} initial={u} />
        </div>
      </div>
    </div>
  );
}

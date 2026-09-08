"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import posthog from "posthog-js";
import { useState } from "react";
import { Eyebrow, Section } from "@/components/catering/primitives";
import { NEXT_SESSION, SHARE_SECTION } from "@/lib/webinars";

// 06 · Spread the word. The event card poster with a share affordance:
// native share sheet where the browser has one, clipboard copy otherwise.

// Clipboard with fallbacks: the async API needs a permission some embedded
// browsers deny, so a failed write retries via a hidden textarea and
// execCommand before giving up.
function copyToClipboard(text: string): Promise<boolean> {
  const legacy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  };
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => legacy(),
    );
  }
  return Promise.resolve(legacy());
}

export function ShareSession() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function share() {
    try {
      posthog.capture("share_click", { session: NEXT_SESSION.id });
    } catch {
      /* no-op */
    }
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `Build It Live: ${NEXT_SESSION.title}`,
          url: SHARE_SECTION.shareUrl,
        });
        return;
      } catch {
        return; // user closed the share sheet
      }
    }
    const ok = await copyToClipboard(SHARE_SECTION.shareUrl);
    setState(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setState("idle"), 2500);
  }

  return (
    <Section id="share" tone="canvas">
      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[52ch]">
          <Eyebrow n="06" label="Spread the word" />
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
            Know{" "}
            <span className="font-serif italic text-teal-400">someone</span> who
            should see this?
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-body sm:text-lg">
            {SHARE_SECTION.body}
          </p>
          <button
            type="button"
            onClick={share}
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/[0.16] px-7 font-display text-base font-bold text-cream-50 transition-colors hover:border-teal-400 hover:text-teal-400"
          >
            {state === "copied" ? (
              <>
                <Check className="h-4 w-4 text-teal-400" aria-hidden="true" />
                {SHARE_SECTION.ctaCopied}
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
                {SHARE_SECTION.cta}
              </>
            )}
          </button>
          {state === "failed" && (
            <p className="mt-4 select-all font-mono text-sm text-teal-400">
              {SHARE_SECTION.shareUrl}
            </p>
          )}
        </div>

        <img
          src="/build-it-live/event-card.jpg"
          alt={SHARE_SECTION.cardAlt}
          width={1080}
          height={1080}
          loading="lazy"
          className="w-full max-w-[340px] flex-shrink-0 -rotate-[1.5deg] rounded-2xl border border-white/[0.08] shadow-2xl transition-transform duration-300 hover:rotate-0 md:max-w-[380px]"
        />
      </div>
    </Section>
  );
}

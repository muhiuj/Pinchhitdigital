"use client";

import { Check, Copy } from "lucide-react";
import posthog from "posthog-js";
import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

// A prompt in a code-style box with a one-click copy button. If the
// clipboard is blocked, the text stays selectable so a manual copy works.

interface CopyBlockProps {
  label: string;
  text: string;
  trackId: string;
}

export function CopyBlock({ label, text, trackId }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      posthog.capture("kit_prompt_copy", { prompt: trackId });
    } catch {
      /* no-op */
    }
    if (await copyToClipboard(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b0f14]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-400">
          {label}
        </p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-sun-400 px-4 font-display text-[13px] font-bold text-ink-900 transition-colors hover:bg-sun-300"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy prompt
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-4 font-mono text-[13px] leading-relaxed text-cream-50/90 select-all">
        {text}
      </pre>
    </div>
  );
}

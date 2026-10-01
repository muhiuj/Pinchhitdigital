"use client";

import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import {
  FEEDBACK_COPY,
  FEEDBACK_USEFUL_OPTIONS,
  type FeedbackUsefulKey,
} from "@/lib/webinar-kit";

// Post-session survey. The email's one-click answer arrives as ?u=, and is
// saved the moment the page loads, so a click counts even if the visitor
// leaves without filling in the rest.

const UUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

const inputClass =
  "w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 font-sans text-[15px] text-cream-50 placeholder:text-body-dim focus:border-teal-400 focus:outline-none";
const questionClass = "block font-display text-[17px] font-bold leading-snug text-cream-50";

async function send(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/webinar-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function isUsefulKey(v: string | undefined): v is FeedbackUsefulKey {
  return FEEDBACK_USEFUL_OPTIONS.some((o) => o.key === v);
}

export function FeedbackForm({ token, initial }: { token?: string; initial?: string }) {
  const validToken = Boolean(token && UUID_REGEX.test(token));
  const [useful, setUseful] = useState<FeedbackUsefulKey | "">(
    isUsefulKey(initial) ? initial : "",
  );
  const [drain, setDrain] = useState("");
  const [groups, setGroups] = useState("");
  const [topic, setTopic] = useState("");
  const [wantsHelp, setWantsHelp] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [firstSaved, setFirstSaved] = useState(false);
  const autoSent = useRef(false);

  useEffect(() => {
    if (!validToken || autoSent.current || !isUsefulKey(initial)) return;
    autoSent.current = true;
    send({ r: token, useful: initial }).then((ok) => {
      if (ok) setFirstSaved(true);
    });
    try {
      posthog.capture("bil_feedback_oneclick", { answer: initial });
    } catch {
      /* no-op */
    }
  }, [validToken, token, initial]);

  if (!validToken) {
    return (
      <p className="rounded-2xl border border-white/10 bg-card p-6 font-sans text-[15px] leading-relaxed text-body">
        {FEEDBACK_COPY.invalidLink}
      </p>
    );
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-teal-400/30 bg-card p-6 sm:p-8" role="status">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-cream-50">
          {FEEDBACK_COPY.thanksHeading}
        </h2>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">
          {FEEDBACK_COPY.thanksBody}
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    const ok = await send({
      r: token,
      useful: useful || undefined,
      drain,
      groups,
      topic,
      wantsHelp,
      website,
    });
    if (ok) {
      try {
        posthog.capture("bil_feedback_submit", { useful, wantsHelp });
      } catch {
        /* no-op */
      }
    }
    setState(ok ? "done" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fb-website">Website</label>
        <input
          id="fb-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {firstSaved && (
        <p className="mb-6 rounded-lg border border-teal-400/30 bg-teal-400/[0.06] px-4 py-3 font-sans text-[14px] text-teal-400">
          {FEEDBACK_COPY.recordedNote}
        </p>
      )}

      <fieldset>
        <legend className={questionClass}>{FEEDBACK_COPY.usefulQuestion}</legend>
        <div className="mt-3 grid gap-2">
          {FEEDBACK_USEFUL_OPTIONS.map((o) => (
            <label
              key={o.key}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-sans text-[15px] transition-colors ${
                useful === o.key
                  ? "border-teal-400 bg-teal-400/[0.08] text-cream-50"
                  : "border-white/12 text-body hover:border-white/25"
              }`}
            >
              <input
                type="radio"
                name="useful"
                value={o.key}
                checked={useful === o.key}
                onChange={() => setUseful(o.key)}
                className="accent-[#7ac7c4]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <label htmlFor="fb-drain" className={questionClass}>
          {FEEDBACK_COPY.drainQuestion}
        </label>
        <textarea
          id="fb-drain"
          rows={3}
          value={drain}
          onChange={(e) => setDrain(e.target.value)}
          className={`${inputClass} mt-3`}
        />
      </div>

      <div className="mt-7">
        <label htmlFor="fb-groups" className={questionClass}>
          {FEEDBACK_COPY.groupsQuestion}
        </label>
        <p className="mt-1.5 font-sans text-[13px] text-body-dim">{FEEDBACK_COPY.groupsHint}</p>
        <textarea
          id="fb-groups"
          rows={2}
          value={groups}
          onChange={(e) => setGroups(e.target.value)}
          className={`${inputClass} mt-3`}
        />
      </div>

      <div className="mt-7">
        <label htmlFor="fb-topic" className={questionClass}>
          {FEEDBACK_COPY.topicQuestion}
        </label>
        <textarea
          id="fb-topic"
          rows={2}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={`${inputClass} mt-3`}
        />
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={wantsHelp}
          onChange={(e) => setWantsHelp(e.target.checked)}
          className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#7ac7c4]"
        />
        <span className="font-sans text-[15px] leading-relaxed text-cream-50">
          {FEEDBACK_COPY.helpLabel}
        </span>
      </label>

      {state === "error" && (
        <p className="mt-5 font-sans text-[13px] leading-snug text-[#e3654f]">{FEEDBACK_COPY.error}</p>
      )}

      <button
        type="submit"
        disabled={state === "busy"}
        className="mt-7 flex min-h-[52px] w-full items-center justify-center rounded-full bg-sun-400 px-6 font-display text-base font-bold text-ink-900 transition-colors hover:bg-sun-300 disabled:opacity-60"
      >
        {state === "busy" ? "Sending…" : FEEDBACK_COPY.submit}
      </button>
    </form>
  );
}

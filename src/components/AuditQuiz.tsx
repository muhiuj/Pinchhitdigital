"use client";

/**
 * The /audit "Catering Revenue Score" experience. Mobile-first, one question
 * on screen at a time, instant scored result. Phases: intro → quiz → form →
 * results. Scoring + copy live in src/lib/audit.ts.
 *
 * Lead delivery is best-effort: the POST to /api/audit-submit is awaited but
 * never blocks the result. If it fails, the attendee still sees their score
 * (computed client-side) so the event experience never breaks.
 */
import { useState } from "react";
import {
  BOOKING_URL,
  MAX_SCORE,
  QUESTIONS,
  scoreToTier,
  type Tier,
} from "@/lib/audit";

type Phase = "intro" | "quiz" | "form" | "results";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuditQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    QUESTIONS.map(() => null),
  );

  const [firstName, setFirstName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState<{ score: number; tier: Tier } | null>(
    null,
  );

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setPhase("form");
    }
  };

  const goBack = () => {
    if (phase === "form") {
      setPhase("quiz");
      setQIndex(QUESTIONS.length - 1);
      return;
    }
    if (qIndex > 0) {
      setQIndex((i) => i - 1);
    } else {
      setPhase("intro");
    }
  };

  const computeScore = () =>
    answers.reduce<number>((sum, optIdx, i) => {
      if (optIdx === null) return sum;
      return sum + QUESTIONS[i].options[optIdx].points;
    }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !restaurantName.trim() || !phone.trim() || !email.trim()) {
      setFormError("Please fill in every field.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setFormError("That email doesn't look right.");
      return;
    }
    setFormError(null);
    setSubmitting(true);

    const score = computeScore();
    const tier = scoreToTier(score);
    const answerDetail = QUESTIONS.map((q, i) => {
      const optIdx = answers[i];
      const opt = optIdx === null ? null : q.options[optIdx];
      return {
        question: q.shortLabel,
        answer: opt?.label ?? "—",
        points: opt?.points ?? 0,
      };
    });

    // Best-effort delivery — show the result regardless of the outcome.
    try {
      await fetch("/api/audit-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          restaurantName: restaurantName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          answers: answerDetail,
          score,
          tier: tier.label,
        }),
      });
    } catch {
      // Swallow — the attendee still gets their score below.
    }

    setResult({ score, tier });
    setSubmitting(false);
    setPhase("results");
  };

  const progressPct =
    phase === "quiz"
      ? ((qIndex + 1) / QUESTIONS.length) * 100
      : phase === "form"
        ? 100
        : 0;

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-xl flex-col px-6 py-10 md:py-16">
      {/* Progress bar — shown during quiz + form */}
      {(phase === "quiz" || phase === "form") && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-cream-50/50">
            <span>
              {phase === "form"
                ? "Last step"
                : `Step ${qIndex + 1} of ${QUESTIONS.length}`}
            </span>
            <button
              type="button"
              onClick={goBack}
              className="text-cream-50/50 transition-colors hover:text-sun-400"
            >
              ← Back
            </button>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-50/10">
            <div
              className="h-full rounded-full bg-sun-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* INTRO */}
      {phase === "intro" && (
        <div className="flex flex-1 flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-wider text-sun-400">
            Catering Revenue Audit · 60 seconds
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-cream-50 md:text-4xl">
            Is Your Restaurant Leaving{" "}
            <span className="font-serif italic text-sun-400">
              Catering Revenue
            </span>{" "}
            on the Table?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cream-50/70">
            60% of catering inquiries never get a response within 24 hours. Take
            the 60-second audit to see where your restaurant stands — and what
            it&rsquo;s costing you.
          </p>
          <button
            type="button"
            onClick={() => {
              setPhase("quiz");
              setQIndex(0);
            }}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-8 py-4 font-display text-base font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300 sm:w-auto"
          >
            Start the Audit →
          </button>
        </div>
      )}

      {/* QUIZ */}
      {phase === "quiz" && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-cream-50 md:text-3xl">
            {QUESTIONS[qIndex].prompt}
          </h2>
          <div className="mt-6 space-y-3">
            {QUESTIONS[qIndex].options.map((opt, optIdx) => {
              const selected = answers[qIndex] === optIdx;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => selectAnswer(optIdx)}
                  className={`flex w-full items-center rounded-2xl border p-5 text-left font-sans text-base leading-snug transition-colors ${
                    selected
                      ? "border-sun-400 bg-sun-400/10 text-cream-50"
                      : "border-cream-50/15 bg-cream-50/[0.03] text-cream-50/85 hover:border-sun-400/60 hover:bg-cream-50/[0.06]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* LEAD FORM */}
      {phase === "form" && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-cream-50 md:text-3xl">
            Where should we send your{" "}
            <span className="font-serif italic text-sun-400">
              Catering Revenue Score
            </span>
            ?
          </h2>
          <p className="mt-3 text-base text-cream-50/60">
            Your results are ready. Tell us where to send them.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {(
              [
                { id: "firstName", label: "First name", value: firstName, set: setFirstName, type: "text", autoComplete: "given-name" },
                { id: "restaurantName", label: "Restaurant name", value: restaurantName, set: setRestaurantName, type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone number", value: phone, set: setPhone, type: "tel", autoComplete: "tel" },
                { id: "email", label: "Email address", value: email, set: setEmail, type: "email", autoComplete: "email" },
              ] as const
            ).map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cream-50/50"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  autoComplete={field.autoComplete}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="w-full rounded-xl border border-cream-50/15 bg-cream-50/[0.04] px-4 py-3.5 font-sans text-base text-cream-50 placeholder-cream-50/30 outline-none transition-colors focus:border-sun-400"
                />
              </div>
            ))}

            {formError && (
              <p className="font-sans text-sm text-coral">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-8 py-4 font-display text-base font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Scoring…" : "Get My Catering Score →"}
            </button>
          </form>
        </div>
      )}

      {/* RESULTS */}
      {phase === "results" && result && (
        <div className="flex flex-1 flex-col justify-center text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-cream-50/50">
            Your Catering Revenue Score
          </p>
          <p className="mt-3 font-display text-6xl font-extrabold text-sun-400">
            {result.score}
            <span className="text-3xl text-cream-50/40">/{MAX_SCORE}</span>
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-cream-50 md:text-3xl">
            {result.tier.label}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream-50/70">
            {result.tier.message}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-8 py-4 font-display text-base font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
          >
            Book Your Free 20-Min Audit →
          </a>
          <p className="mt-4 font-sans text-sm text-cream-50/40">
            We&rsquo;ll bring your score to the call.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import posthog from "posthog-js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FORM, GCAL_URL, HERO } from "@/lib/webinars";

// Hero registration form. Three outcomes, none of which lose a registrant:
//   email-only        · no phone given (or consent withheld + phone cleared)
//   verified_phone    · phone + consent → Twilio Verify OTP → registered with
//                       phone_verified: true
//   email fallback    · OTP couldn't start/complete → registered with the
//                       phone dropped ("Skip, register with email only" or an
//                       automatic fallback when Verify is unavailable)
// The webhook payload contract lives in /api/webinar-register.

type Step = "form" | "code" | "done";
type DoneVariant = "verified" | "email_only" | "verify_fallback";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function capture(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props);
  } catch {
    /* no-op */
  }
}

interface RegisterFormProps {
  /** Google Calendar quick-add URL from the live session row; falls back to the static one. */
  gcalUrl?: string;
}

const inputClass =
  "w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 font-sans text-[15px] text-cream-50 placeholder:text-body-dim focus:border-teal-400 focus:outline-none";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-body";
const errorClass = "mt-1.5 font-sans text-[13px] leading-snug text-[#e3654f]";

export function RegisterForm({ gcalUrl = GCAL_URL }: RegisterFormProps = {}) {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [doneVariant, setDoneVariant] = useState<DoneVariant>("email_only");
  // Late-registration contingency: during the live window the confirmation
  // card shows a direct join button (fetched, never in the page HTML).
  const [join, setJoin] = useState<{ url: string; state: string } | null>(null);
  // The E.164 number an OTP was sent to (fixed at the moment of send).
  const verifyPhone = useRef<string>("");
  const lastResend = useRef(0);

  useEffect(() => {
    if (step !== "done") return;
    fetch("/api/webinar-join")
      .then((res) => res.json())
      .then((data: { joinUrl: string | null; state: string }) => {
        if (data.joinUrl) setJoin({ url: data.joinUrl, state: data.state });
      })
      .catch(() => {
        /* no join window, or fetch failed: email path still covers them */
      });
  }, [step]);

  async function register(payload: {
    phone?: string;
    sms_consent: boolean;
    phone_verified: boolean;
  }): Promise<boolean> {
    try {
      const res = await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          restaurant: restaurant.trim(),
          website,
          ...payload,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  function finish(variant: DoneVariant) {
    setDoneVariant(variant);
    setStep("done");
    capture("webinar_register", { method: variant });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = FORM.firstNameError;
    if (!EMAIL_REGEX.test(email.trim())) next.email = FORM.emailError;

    const rawPhone = phone.trim();
    let normalized: string | null = null;
    if (rawPhone) {
      normalized = normalizePhone(rawPhone);
      if (!normalized) next.phone = FORM.phoneError;
      else if (!consent) next.consent = FORM.consentError;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    if (normalized && consent) {
      // Phone path: OTP first, registration after.
      try {
        const res = await fetch("/api/webinar-verify/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalized, website }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
        if (res.ok && data.ok) {
          verifyPhone.current = normalized;
          setStep("code");
          setBusy(false);
          return;
        }
      } catch {
        /* fall through to email-only fallback */
      }
      // Verify unavailable or send failed: register email-only, say so.
      const ok = await register({ sms_consent: false, phone_verified: false });
      setBusy(false);
      if (ok) finish("verify_fallback");
      else setErrors({ submit: FORM.submitError });
      return;
    }

    const ok = await register({ sms_consent: false, phone_verified: false });
    setBusy(false);
    if (ok) finish("email_only");
    else setErrors({ submit: FORM.submitError });
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!/^\d{4,10}$/.test(code.trim())) {
      setErrors({ code: FORM.codeError });
      return;
    }
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/webinar-verify/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: verifyPhone.current, code: code.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        verified?: boolean;
      };
      if (data.ok && data.verified) {
        const ok = await register({
          phone: verifyPhone.current,
          sms_consent: true,
          phone_verified: true,
        });
        setBusy(false);
        if (ok) finish("verified");
        else setErrors({ submit: FORM.submitError });
        return;
      }
      setBusy(false);
      if (data.ok) {
        setErrors({ code: FORM.codeError });
      } else {
        // The check itself failed (Twilio down): point at the skip path.
        setErrors({ code: FORM.codeError });
      }
    } catch {
      setBusy(false);
      setErrors({ code: FORM.codeError });
    }
  }

  async function handleSkip() {
    if (busy) return;
    setBusy(true);
    const ok = await register({ sms_consent: false, phone_verified: false });
    setBusy(false);
    if (ok) finish("email_only");
    else setErrors({ submit: FORM.submitError });
    capture("webinar_otp_skipped");
  }

  async function handleResend() {
    const now = Date.now();
    if (now - lastResend.current < 30_000) return;
    lastResend.current = now;
    try {
      await fetch("/api/webinar-verify/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: verifyPhone.current, website }),
      });
    } catch {
      /* the skip path remains */
    }
  }

  /* ---------------------------------------------------- confirmation */
  if (step === "done") {
    return (
      <div
        className="rounded-2xl border border-teal-400/30 bg-card p-6 sm:p-8"
        role="status"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-400">
          Registration confirmed
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-cream-50">
          {FORM.doneHeading}
        </h3>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">
          {FORM.doneBody}
        </p>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-body">
          {doneVariant === "verified"
            ? FORM.doneVerifiedLine
            : doneVariant === "verify_fallback"
              ? FORM.doneVerifyFallbackLine
              : FORM.doneEmailOnlyLine}
        </p>
        {join && (
          <a
            href={join.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => capture("cta_click", { section: "confirmation-join-now" })}
            className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-teal-400 px-6 font-display text-base font-bold text-ink-900 transition-colors hover:bg-teal-300"
          >
            {join.state === "live"
              ? "We're live. Join the session now"
              : "We start soon. Join the session"}
            <span aria-hidden="true">→</span>
          </a>
        )}
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => capture("cta_click", { section: "confirmation-gcal" })}
          className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sun-400 px-6 font-display text-[15px] font-bold text-ink-900 transition-colors hover:bg-sun-300"
        >
          {FORM.doneGcal}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  /* ------------------------------------------------------- OTP step */
  if (step === "code") {
    return (
      <form
        onSubmit={handleVerify}
        className="rounded-2xl border border-white/10 bg-card p-6 sm:p-8"
      >
        <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-cream-50">
          {FORM.codeHeading}
        </h3>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">
          {FORM.codeBody}{" "}
          <span className="font-semibold text-cream-50">
            {verifyPhone.current}
          </span>
          . Enter it below and your join link will come by text.
        </p>
        <div className="mt-5">
          <label htmlFor="bil-code" className={labelClass}>
            {FORM.codeLabel}
          </label>
          <input
            id="bil-code"
            name="one-time-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-invalid={Boolean(errors.code)}
            aria-describedby={errors.code ? "bil-code-error" : undefined}
            className={`${inputClass} tracking-[0.3em]`}
          />
          {errors.code && (
            <p id="bil-code-error" className={errorClass}>
              {errors.code}
            </p>
          )}
          {errors.submit && <p className={errorClass}>{errors.submit}</p>}
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-6 font-display text-[15px] font-bold text-ink-900 transition-colors hover:bg-sun-300 disabled:opacity-60"
        >
          {busy ? "One moment…" : FORM.codeCta}
        </button>
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleResend}
            className="font-sans text-[13px] text-body underline decoration-white/30 underline-offset-4 hover:text-cream-50"
          >
            {FORM.codeResend}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={busy}
            className="font-sans text-[13px] text-body underline decoration-white/30 underline-offset-4 hover:text-cream-50 disabled:opacity-60"
          >
            {FORM.codeSkip}
          </button>
        </div>
      </form>
    );
  }

  /* ----------------------------------------------------------- form */
  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-white/10 bg-card p-6 sm:p-8"
      aria-label="Register for Build It Live"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="bil-website">Website</label>
        <input
          id="bil-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        <div>
          <label htmlFor="bil-first-name" className={labelClass}>
            {FORM.firstNameLabel}
          </label>
          <input
            id="bil-first-name"
            name="given-name"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "bil-first-name-error" : undefined}
            className={inputClass}
          />
          {errors.firstName && (
            <p id="bil-first-name-error" className={errorClass}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bil-email" className={labelClass}>
            {FORM.emailLabel}
          </label>
          <input
            id="bil-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "bil-email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="bil-email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bil-phone" className={labelClass}>
            {FORM.phoneLabel}
          </label>
          <p className="mb-1.5 font-sans text-[13px] leading-snug text-teal-400">
            {FORM.phonePayoff}
          </p>
          <input
            id="bil-phone"
            name="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "bil-phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p id="bil-phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bil-restaurant" className={labelClass}>
            {FORM.restaurantLabel}
          </label>
          <input
            id="bil-restaurant"
            name="organization"
            type="text"
            autoComplete="organization"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Standalone SMS consent: unchecked by default, never bundled.
            This exact language is quoted in the A2P campaign submission. */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-describedby={errors.consent ? "bil-consent-error" : "bil-consent-links"}
              className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#7ac7c4]"
            />
            <span className="font-sans text-[13px] leading-relaxed text-body">
              {FORM.consentText}{" "}
              <span id="bil-consent-links" className="whitespace-nowrap">
                <Link
                  href="/sms-privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 underline-offset-2 hover:text-cream-50"
                >
                  SMS Privacy Policy
                </Link>{" "}
                ·{" "}
                <Link
                  href="/sms-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 underline-offset-2 hover:text-cream-50"
                >
                  SMS Terms
                </Link>
              </span>
            </span>
          </label>
          {errors.consent && (
            <p id="bil-consent-error" className={errorClass}>
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {errors.submit && <p className={errorClass}>{errors.submit}</p>}

      <button
        type="submit"
        disabled={busy}
        onClick={() => capture("cta_click", { section: "hero-form" })}
        className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-6 font-display text-base font-bold text-ink-900 transition-colors hover:bg-sun-300 disabled:opacity-60"
      >
        {busy ? "Saving your spot…" : HERO.cta}
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-4 font-sans text-[13px] leading-relaxed text-body-dim">
        {HERO.ctaNote}
      </p>
    </form>
  );
}

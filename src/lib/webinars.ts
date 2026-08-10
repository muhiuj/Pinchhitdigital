// Single source of truth for the /build-it-live page: next-session data,
// past-session archive, and every rendered copy string. Hero, cost, and
// agenda copy is verbatim from Jeremy's final copy doc (2026-07-21), with
// one approved adjustment: the session runs at 2:00 PM Central, not 11:30 AM.
// Brand rules: ZERO em dashes, never the word "webinar" in rendered copy
// (it is a "live build" or "session"), no hype adjectives, no exclamation
// points, every statistic names its third-party source in-copy.
//
// THE MONTHLY EDIT POINT: update NEXT_SESSION for each new session and move
// the finished one into PAST_SESSIONS once its edited replay is on YouTube.

export { BOOKING_URL } from "./audit";

export const FOUNDER_EMAIL = "jeremy.muhiu@pinchhitdigital.com";

/* ---------------------------------------------------------------- SEO */
export const SEO = {
  title:
    "Build It Live | Free Monthly Automation Webinar for DFW Business Owners | Pinch Hit Digital",
  description:
    "Watch a $3,000 missed-call text-back system get built from scratch, free and live, in plain English. Follow along with your team and take the recipe home. Registrants get the full recording.",
  slug: "/build-it-live",
  canonical: "https://www.pinchhitdigital.com/build-it-live",
} as const;

/* ------------------------------------------------------ NEXT SESSION */
// startIso/endIso drive the Event JSON-LD and the Google Calendar link.
// Aug 18 2026 is CDT (UTC-5): 2:00 PM Central = 19:00 UTC.
export const NEXT_SESSION = {
  id: "2026-08-build-it-live",
  number: 1,
  title: "The $3,000 Text-Back System",
  topicBuild: "a missed-call text-back system",
  startIso: "2026-08-18T14:00:00-05:00",
  endIso: "2026-08-18T14:50:00-05:00",
  dateLong: "Tuesday, August 18",
  timeLabel: "2:00 PM Central",
} as const;

// Google Calendar quick-add URL (times in UTC). The Zoom join link is not on
// the site by design: n8n emails it, so the invite points people at their inbox.
const GCAL_TEXT = encodeURIComponent(`Build It Live: ${NEXT_SESSION.title}`);
const GCAL_DETAILS = encodeURIComponent(
  "Watch a missed-call text-back system get built from scratch in 30 minutes, in plain English. Your join link arrives by email before the session.\n\nhttps://www.pinchhitdigital.com/build-it-live",
);
export const GCAL_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${GCAL_TEXT}&dates=20260818T190000Z/20260818T195000Z&details=${GCAL_DETAILS}`;

/* ---------------------------------------------------------------- HERO */
export const HERO = {
  eyebrow: "Build It Live · free monthly live build · online",
  // H1 rendered in the component (serif accent on "$3,000").
  subhead:
    "Agencies charge about $3,000 to build a missed-call text-back system: it answers every call your business misses, by text, in seconds. Watch one get built from scratch, live, in plain English. Follow along, test it from your own phone, and take the recipe home.",
  priceNote:
    "$3,000 is a typical agency price for a done-for-you build like this one.",
  eventLine: `${NEXT_SESSION.dateLong} · ${NEXT_SESSION.timeLabel} · 50 minutes · online & recorded`,
  cta: "Save my spot, it's free",
  ctaNote:
    "Built for owner-operated teams of fewer than 50 people. Can't make it live? Register anyway and the full recording comes to you.",
} as const;

/* ---------------------------------------------------------------- FORM */
export const FORM = {
  firstNameLabel: "First name",
  emailLabel: "Email",
  phoneLabel: "Mobile",
  // The payoff, never "(optional)": the phone field earns its keep.
  phonePayoff: "Get your join link by text 15 minutes before we start.",
  restaurantLabel: "Business or organization name (optional)",
  // Carrier-reviewable consent language (spec addendum, verbatim). The two
  // policy links render after this sentence in the component.
  consentText:
    "Text me my join link and up to 4 event reminders per session from Pinch Hit Digital. Message and data rates may apply. Reply STOP to opt out, HELP for help.",
  consentError:
    "To get texts, check the box above, or clear the mobile field to register by email.",
  phoneError: "Enter a 10-digit US mobile number, or leave this blank.",
  firstNameError: "Enter your first name.",
  emailError: "Enter a valid email address.",
  submitError:
    "Something went wrong on our end and your registration did not go through. Try again, or email jeremy.muhiu@pinchhitdigital.com and I will register you by hand.",
  // OTP step
  codeHeading: "Check your phone.",
  codeBody: "We sent a 6-digit code to",
  codeLabel: "Verification code",
  codeCta: "Verify my number",
  codeError: "That code didn't match. Check the text and try again.",
  codeResend: "Resend code",
  codeSkip: "Skip, register with email only",
  // Confirmation state
  doneHeading: "You're in.",
  doneBody:
    "Your calendar invite and join link are on the way to your email. Add the session to your calendar now so the time holds its spot.",
  doneGcal: "Add to Google Calendar",
  doneVerifiedLine:
    "Your join link will also come by text 15 minutes before we start.",
  doneEmailOnlyLine: "Your reminders and join link will come by email.",
  doneVerifyFallbackLine:
    "We couldn't send a verification text just now, so your reminders and join link will come by email instead.",
} as const;

/* -------------------------------------------------- 01 · THE MATH */
export interface MathStat {
  value: string;
  label: string;
  sourceName: string;
  sourceUrl: string;
}

export const MATH = {
  eyebrow: "01 · Decide if it's worth your hour",
  h2: "First, the math. Yours, not ours.",
  lede: "A missed-call system only matters if your business misses calls that carry money. So the session starts there, with two facts and one line of arithmetic.",
  stats: [
    {
      value: "62%",
      label:
        "of calls to small businesses go unanswered, in one study of test calls",
      sourceName: "Source: 411 Locals",
      sourceUrl:
        "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
    },
    {
      value: "21×",
      label:
        "more likely to qualify: leads contacted within 5 minutes versus leads that wait 30",
      sourceName: "Source: Lead Response Management study",
      sourceUrl: "https://www.leadresponsemanagement.org/lrm_study",
    },
  ] as MathStat[],
  closing:
    "The arithmetic is one line: your average sale, times the calls you miss in a week. A plumbing company and an art studio get very different answers, and that is the point. If your number is small, you'll know this build is not for you, and the hour cost you nothing. If it isn't, you'll watch the fix get built in front of you.",
} as const;

/* -------------------------------------------------- 02 · THE AGENDA */
export interface AgendaItem {
  time: string;
  text: string;
}

export const AGENDA = {
  eyebrow: "02 · The agenda",
  h2: "What happens in the 50 minutes",
  items: [
    {
      time: "0:00",
      text: "The evaluation. Does this system make sense for your business? We run the math with your numbers, on screen, and you decide whether to build along or just watch.",
    },
    {
      time: "0:08",
      text: "Tool sign-up. We create the two accounts the system runs on, together. A short sign-up guide arrives by email before the session so you can show up with them ready.",
    },
    {
      time: "0:15",
      text: "The live build. A missed-call text-back system, built from a blank screen, every step narrated in plain language.",
    },
    {
      time: "0:38",
      text: "The test. We call the number, let the call miss, and watch the text-back land in seconds.",
    },
    {
      time: "0:42",
      text: "Q&A. Bring the awkward questions. They are the useful ones.",
    },
    {
      time: "0:48",
      text: "One offer, stated once. A free digital systems audit for anyone who wants help finding what to automate next. That's the whole pitch, and it's the only one.",
    },
  ] as AgendaItem[],
} as const;

/* -------------------------------------------------- 03 · WHO IT'S FOR */
export const WHO = {
  eyebrow: "03 · Who this is for",
  h2: "Built for owners, not developers.",
  body: "Build It Live is for owner-operated organizations of fewer than 50 people: the shops, offices, and studios where whoever answers the phone is also doing the work. No technical background is needed. Every step gets narrated in plain language, and when a technical term shows up, a plain-English explanation follows in the same breath. If you can follow a recipe, you can follow the build.",
} as const;

/* -------------------------------------------------- 04 · PAST SESSIONS */
export interface WebinarSession {
  id: string; // "2026-08-build-it-live"
  number: number; // Session 001, 002…
  title: string;
  date: string; // ISO
  youtubeId?: string; // absent until the edited replay is up
  result: string; // one-line outcome shown on the banner
  coverImage?: string; // /webinars/…jpg; falls back to the YouTube thumbnail
}

export const RECORDING = {
  eyebrow: "04 · Can't make it live?",
  h2: "Register anyway. The recording comes to you.",
  body: "Every registrant gets the full recording after the session, whether or not they attend. That is deliberate: the build is meant to be paused, replayed, and copied at your own speed. The recording goes to registrants only and is not posted publicly, so save your spot even if the time doesn't work.",
} as const;

// Archive starts empty for Session #1. After each session: upload the edited
// replay to YouTube, then add an entry here with the youtubeId.
export const PAST_SESSIONS: WebinarSession[] = [];

/* ---------------------------------------------------------------- 05 · FAQ */
export const FAQ_SECTION = {
  eyebrow: "05 · Straight answers",
  h2: "Questions owners actually ask",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Is it really free?",
    a: "Yes. The session is free, the recording is free for registrants, and the recipe is yours to keep. The business behind it runs on the free digital systems audit, and that gets one mention at the end of the hour, stated as plainly as it is here.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. Every step is narrated in plain language, and every technical term gets a plain-English explanation the moment it appears. If you can follow a recipe, you can follow the build.",
  },
  {
    q: "What if I can't attend live?",
    a: "Register anyway. The full recording goes to every registrant after the session. It is not posted publicly, so registering is the only way to get it.",
  },
  {
    q: "What does the system cost to run?",
    a: "The session is free, and so is the recipe. The system itself runs on two tools with small subscriptions: a few dollars a month for the phone number and texts, plus the automation tool's starter plan. We put the exact numbers on screen during the build so you can decide with real figures.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one hiding. At the end I mention the free digital systems audit, once, for anyone who wants help finding what to automate next. That mention is the entire pitch. The session is meant to be useful whether or not you ever book anything.",
  },
] as const;

/* ---------------------------------------------------------- FINAL CTA */
export const FINAL_CTA = {
  eyebrow: "Save your spot",
  // h2 rendered in the component with the live date.
  body: "Fifty minutes, one working system, and a single mention of the free digital systems audit at the end. Registration takes two fields and about fifteen seconds, and the full recording comes to you whether or not you make it live.",
  cta: "Save my spot, it's free",
  auditLead: "Rather talk through your systems first?",
  auditLink: "Book a free 30-minute digital systems audit.",
} as const;

/* ---------------------------------------------------------- STICKY CTA */
export const STICKY_CTA = {
  label: "Save my spot",
} as const;

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
    "Watch one revenue leak get fixed live each month, free and online. Next session: a missed-call text-back system built from scratch in 30 minutes, in plain English. Register with a name and email.",
  slug: "/build-it-live",
  canonical: "https://www.pinchhitdigital.com/build-it-live",
} as const;

/* ------------------------------------------------------ NEXT SESSION */
// startIso/endIso drive the Event JSON-LD and the Google Calendar link.
// Aug 4 2026 is CDT (UTC-5): 2:00 PM Central = 19:00 UTC.
export const NEXT_SESSION = {
  id: "2026-08-build-it-live",
  number: 1,
  title: "The $27,000 Missed Call",
  startIso: "2026-08-04T14:00:00-05:00",
  endIso: "2026-08-04T14:50:00-05:00",
  dateLong: "Tuesday, August 4",
  timeLabel: "2:00 PM Central",
} as const;

// Google Calendar quick-add URL (times in UTC). The Zoom join link is not on
// the site by design: n8n emails it, so the invite points people at their inbox.
const GCAL_TEXT = encodeURIComponent(`Build It Live: ${NEXT_SESSION.title}`);
const GCAL_DETAILS = encodeURIComponent(
  "Watch a missed-call text-back system get built from scratch in 30 minutes, in plain English. Your join link arrives by email before the session.\n\nhttps://www.pinchhitdigital.com/build-it-live",
);
export const GCAL_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${GCAL_TEXT}&dates=20260804T190000Z/20260804T195000Z&details=${GCAL_DETAILS}`;

/* ---------------------------------------------------------------- HERO */
export const HERO = {
  eyebrow: "Build It Live · free monthly live build · online",
  // H1 rendered in the component (serif accent on "missed call.").
  subhead:
    "Every month, one revenue leak gets fixed live on screen. This session: watch a missed-call text-back system get built from scratch in 30 minutes, in plain English. No slides. No pitch. You take the exact recipe home.",
  eventLine: `${NEXT_SESSION.dateLong} · ${NEXT_SESSION.timeLabel} · 50 minutes · online & recorded`,
  cta: "Save my spot, it's free",
  ctaNote:
    "Built for restaurant owner-operators. Can't make it live? Register anyway and the replay comes to you.",
} as const;

/* ---------------------------------------------------------------- FORM */
export const FORM = {
  firstNameLabel: "First name",
  emailLabel: "Email",
  phoneLabel: "Mobile",
  // The payoff, never "(optional)": the phone field earns its keep.
  phonePayoff: "Get your join link by text 15 minutes before we start.",
  restaurantLabel: "Restaurant or business name (optional)",
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

/* -------------------------------------------------- 01 · THE LEAK */
export interface LeakStat {
  value: string;
  label: string;
  sourceName: string;
  sourceUrl: string;
}

export const LEAK = {
  eyebrow: "01 · The cost of a missed call",
  h2: "The leak, in numbers",
  lede: "Missed calls are not a discipline problem. They are what happens when the phone rings while your team is running a service. The math still lands on you.",
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
      value: "$420",
      label:
        "average catering order in 2025. One missed catering call is a lunch rush.",
      sourceName: "Source: ezCater",
      sourceUrl:
        "https://www.ezcater.com/company/press-release/new-ezcater-data-highlights-workplace-food-as-a-key-growth-driver-for-restaurants/",
    },
    {
      value: "~$27K",
      label:
        "estimated yearly revenue a single location loses to unanswered calls",
      sourceName: "Source: HungerRush",
      sourceUrl:
        "https://www.hungerrush.com/restaurant-operations/heres-how-much-revenue-your-restaurant-loses-from-unanswered-phone-calls/",
    },
  ] as LeakStat[],
  closing:
    "The fix is a system that texts every missed caller back in under a minute, automatically, so the conversation starts even when nobody could pick up. That system is what gets built at this session, start to finish, while you watch.",
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
      text: "The math. What missed calls cost a restaurant like yours, derived on screen with the sources shown. Bring your own missed-call tally and we run your numbers, not the industry's.",
    },
    {
      time: "0:05",
      text: "The live build. A missed-call text-back system, built from a blank screen in about 30 minutes. Every step narrated in plain language. A call comes in, nobody answers, the caller gets a text in under a minute, and the lead is logged.",
    },
    {
      time: "0:35",
      text: "Your version. What the same system looks like at your restaurant, and what it takes to run it.",
    },
    {
      time: "0:40",
      text: "Q&A. Bring the awkward questions. They are the useful ones.",
    },
    {
      time: "0:48",
      text: "One offer, stated once. A free 30-minute Revenue Audit for anyone who wants their own leaks found. That's the whole pitch, and it's the only one.",
    },
  ] as AgendaItem[],
} as const;

/* -------------------------------------------------- 03 · WHO IT'S FOR */
export const WHO = {
  eyebrow: "03 · Who this is for",
  h2: "Built for owners, not developers.",
  body: "Build It Live is for restaurant owner-operators first: the people running the room, the line, and the phone at the same time. No technical background is needed. Every step gets narrated in plain language, and when a technical term shows up, a plain-English explanation follows it in the same breath. The same systems work for any owner-operated business where calls and messages arrive faster than a small team can answer them, so owners from trades, retail, and clinics are just as welcome in the room.",
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

export const PAST_SESSIONS_SECTION = {
  eyebrow: "04 · Past sessions",
  h2: "Watch a past session",
  intro:
    "Every session gets an edited replay, posted here. Free to watch, no signup, no gate.",
  emptyState:
    "Session 001 is the first one. It streams live on August 4, and the edited replay lands here shortly after.",
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
    a: "Yes. The session is free, the replay is free, and the recipe is free. The business behind it runs on the free 30-minute Revenue Audit, and that gets one mention at the end of the hour, stated as plainly as it is here.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. Every step is narrated in plain language, and every technical term gets a plain-English explanation the moment it appears. If you can follow a recipe, you can follow the build.",
  },
  {
    q: "What if I can't attend live?",
    a: "Register anyway. The replay goes to every registrant, and the edited version gets posted on this page, free to watch, no signup. The live hour adds the Q&A, so come if you can.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one hiding. At the end of each session I mention the free 30-minute Revenue Audit, once, for anyone who wants their own leaks found. That mention is the entire pitch. The session is meant to be useful whether or not you ever book anything.",
  },
] as const;

/* ---------------------------------------------------------- FINAL CTA */
export const FINAL_CTA = {
  eyebrow: "Save your spot",
  h2: "One leak gets fixed on August 4.",
  body: "One revenue leak, one live fix, 50 minutes. This session it's the missed call. Next month it's another leak, and this same page registers you for that one too. Registration takes two fields and about fifteen seconds.",
  cta: "Save my spot, it's free",
  auditLead: "Rather have your own leaks found first?",
  auditLink: "Book a free 30-minute Revenue Audit.",
} as const;

/* ---------------------------------------------------------- STICKY CTA */
export const STICKY_CTA = {
  label: "Save my spot",
} as const;

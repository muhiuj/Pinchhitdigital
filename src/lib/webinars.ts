// Single source of truth for the /build-it-live page: session data, the
// replay archive, and every rendered copy string. Session 002 copy is
// verbatim from Jeremy's build prompt (2026-09-08). Brand rules: ZERO em
// dashes, no hype adjectives, no exclamation points, the one provided
// statistic keeps its attribution attached; do not add statistics.
//
// THE MONTHLY EDIT POINT: update NEXT_SESSION for each new session and move
// the finished one into PAST_SESSIONS once its replay is on YouTube. The
// live session facts (dates, calendar link, JSON-LD) come from the BIL
// Sessions Notion row at request time; these values are the fallback.

export const FOUNDER_EMAIL = "jeremy.muhiu@pinchhitdigital.com";

/* ---------------------------------------------------------------- SEO */
export const SEO = {
  title: "Can ChatGPT Find Your Business? Free Live Webinar | Pinch Hit Digital",
  description:
    "Free live session, Tue Sep 29 at 11:30 AM CT. Watch real AI searches for local businesses, learn why the winners get recommended, and leave with a five-minute self-audit.",
  slug: "/build-it-live",
  canonical: "https://www.pinchhitdigital.com/build-it-live",
} as const;

/* ------------------------------------------------------ NEXT SESSION */
// startIso/endIso drive the Event JSON-LD and the Google Calendar link.
// Sep 29 2026 is CDT (UTC-5): 11:30 AM Central = 16:30 UTC.
export const NEXT_SESSION = {
  id: "2026-09-build-it-live",
  number: 2,
  title: "Can ChatGPT Find Your Business?",
  topicBuild: "a live AI search audit of local businesses",
  startIso: "2026-09-29T11:30:00-05:00",
  endIso: "2026-09-29T12:20:00-05:00",
  dateLong: "Tuesday, September 29",
  timeLabel: "11:30 AM Central",
} as const;

const GCAL_TEXT = encodeURIComponent(`Build It Live: ${NEXT_SESSION.title}`);
const GCAL_DETAILS = encodeURIComponent(
  "Watch real AI searches for local businesses, live and in plain English. Your join link arrives by email before the session.\n\nhttps://www.pinchhitdigital.com/build-it-live",
);
export const GCAL_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${GCAL_TEXT}&dates=20260929T163000Z/20260929T172000Z&details=${GCAL_DETAILS}`;

/* ---------------------------------------------------------------- HERO */
export const HERO = {
  badge: "Live webinar",
  // H1 rendered in the component (serif accent on "Your Business?").
  subhead:
    "45% of customers now use AI tools like ChatGPT to decide who to hire, up from 6% a year ago (BrightLocal, 2026). In this free session I run real searches live, break down why AI recommends the businesses it does, and hand you a five-minute check you can run on your own business.",
  eventLine: `${NEXT_SESSION.dateLong} · ${NEXT_SESSION.timeLabel} · 50 minutes · online & recorded`,
  cta: "Save my spot, it's free",
  ctaNote:
    "Free, online, recorded. Can't make it live? Register anyway and the replay comes to your inbox.",
} as const;

/* ---------------------------------------------------------------- FORM */
export const FORM = {
  heading: "Save your spot",
  firstNameLabel: "First name",
  emailLabel: "Email",
  phoneLabel: "Mobile",
  // The payoff, never "(optional)": the phone field earns its keep.
  phonePayoff: "I'll text you the join link 15 minutes before we start.",
  businessLabel: "Business name (optional)",
  businessPayoff:
    "Optional. Run a business? Add the name and I'll take a look at how AI sees it.",
  // Carrier-reviewable consent language (A2P campaign opt-in evidence,
  // verbatim; the two policy links render after this sentence).
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

/* ---------------------------------- 01 · LIVE-SEARCH INVITATION */
export const INVITE = {
  eyebrow: "01 · Bring your industry",
  heading: "Your industry, searched live.",
  body: "We open the session with searches from the room. Show up live, drop your industry in the chat, and watch who AI recommends when a customer in your area asks. Watching on the replay? The same searches work on your phone, and I'll give you the exact prompts.",
} as const;

/* ------------------------------------------- 02 · WHAT WE'LL COVER */
export const COVER = {
  eyebrow: "02 · What we'll cover",
  heading: "What we'll cover",
  items: [
    {
      title: "The new front door.",
      body: "The same customer question, asked three ways: ChatGPT, Google's AI answer, and the classic map results. Different names win each one, and I'll show you why.",
    },
    {
      title: "Why the winners win.",
      body: "We take a recommended business apart piece by piece: reviews, Google Business Profile, website, and mentions around the web. The checklist builds on screen as we go.",
    },
    {
      title: "A real fix, live.",
      body: "I make one change to a real business profile on screen, so you can see that most of these fixes take minutes, not budgets.",
    },
  ],
} as const;

/* -------------------------------------------- 03 · WHAT YOU LEAVE WITH */
export const TAKEAWAY = {
  eyebrow: "03 · What you leave with",
  heading: "What you leave with",
  body: "The five exact prompts I use, plus a ten-point scorecard. Together they let you audit your own business in about five minutes. Dropped in the chat during the session, free, and included with the replay.",
} as const;

/* ------------------------------------------------- 04 · WHO'S TEACHING */
export const TEACHER = {
  eyebrow: "04 · Who's teaching",
  heading: "Who's teaching",
  body: "I'm Jeremy Muhiu. I've spent close to a decade building local search campaigns, starting with more than 100 DFW businesses across dozens of industries at one of the country's largest local marketing companies. AI changed where customers ask. It hasn't changed what earns the recommendation, and that's what this session teaches.",
} as const;

/* --------------------------------------- 05 · LAST SESSION'S PROOF */
export interface WebinarSession {
  id: string;
  number: number;
  title: string;
  date: string; // ISO
  youtubeId?: string; // set when the replay is on YouTube
  result: string;
}

export const REPLAY_SECTION = {
  eyebrow: "05 · Last session's proof",
  heading: "This is session two.",
  body: "In session one I built a missed-call text-back system live, from nothing, in about 30 minutes. Watch the replay and you'll know exactly what to expect.",
} as const;

// Set youtubeId when Jeremy supplies the Session 001 replay video ID; the
// embed hides until it exists (copy still renders).
export const PAST_SESSIONS: WebinarSession[] = [
  {
    id: "2026-08-build-it-live",
    number: 1,
    title: "The $3,000 Text-Back System",
    date: "2026-08-18",
    youtubeId: "dYhdKvqRGX8",
    result:
      "A missed-call text-back system, built live from nothing in about 30 minutes.",
  },
];

/* ---------------------------------------------------------- FINAL CTA */
export const FINAL_CTA = {
  line: "One free hour. You leave knowing whether AI can find your business, and what to fix if it can't.",
  cta: "Save my spot, it's free",
} as const;

/* ---------------------------------------------------------- STICKY CTA */
export const STICKY_CTA = {
  label: "Save my spot",
} as const;

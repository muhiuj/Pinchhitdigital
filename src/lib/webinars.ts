// Single source of truth for the /build-it-live page: session data, the
// replay archive, and every rendered copy string. Session 002 copy is from
// Jeremy's rebuild prompt (2026-09-22, the AI-assistant pivot), lightly
// edited for the house voice. Brand rules: ZERO em dashes, no hype
// adjectives, no exclamation points, no statistics (the prompt supplies
// none; do not invent numbers).
//
// THE MONTHLY EDIT POINT: update NEXT_SESSION for each new session and move
// the finished one into PAST_SESSIONS once its replay is on YouTube. The
// live session facts (dates, calendar link, JSON-LD) come from the BIL
// Sessions Notion row at request time; these values are the fallback.

export const FOUNDER_EMAIL = "jeremy.muhiu@pinchhitdigital.com";

/* ---------------------------------------------------------------- SEO */
export const SEO = {
  title:
    "Build It Live 002: Build Your Own AI Assistant with Claude, Attio, and Google Calendar",
  description:
    "Free live build, Tuesday September 29 at 11:30 AM Central. Watch me connect Claude to my calendar and CRM and run my day with it, then take home the board template, the skill, and the prompt.",
  slug: "/build-it-live",
  canonical: "https://www.pinchhitdigital.com/build-it-live",
} as const;

/* ------------------------------------------------------ NEXT SESSION */
// startIso/endIso drive the Event JSON-LD and the Google Calendar link.
// Sep 29 2026 is CDT (UTC-5): 11:30 AM Central = 16:30 UTC.
// title stays short on purpose: it rides in reminder SMS bodies and email
// subjects via the Notion row; the page headline carries the full phrase.
export const NEXT_SESSION = {
  id: "2026-09-build-it-live",
  number: 2,
  title: "Build Your Own AI Assistant",
  topicBuild: "an AI assistant on Claude, my calendar, and my CRM",
  startIso: "2026-09-29T11:30:00-05:00",
  endIso: "2026-09-29T12:20:00-05:00",
  dateLong: "Tuesday, September 29",
  timeLabel: "11:30 AM Central",
} as const;

const GCAL_TEXT = encodeURIComponent(`Build It Live: ${NEXT_SESSION.title}`);
const GCAL_DETAILS = encodeURIComponent(
  "Watch me build my AI assistant live, then take home the pieces to set up your own. Your join link arrives by email before the session.\n\nhttps://www.pinchhitdigital.com/build-it-live",
);
export const GCAL_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${GCAL_TEXT}&dates=20260929T163000Z/20260929T172000Z&details=${GCAL_DETAILS}`;

/* ---------------------------------------------------------------- HERO */
export const HERO = {
  badge: "Build It Live · Session 002",
  // H1 rendered in the component (serif accent on "AI Assistant").
  subhead:
    "I run my business with an AI assistant I built myself. It doesn't do more for me. It keeps my week honest: two priorities a day, nothing that slips disappears, and dinner is off limits. In 50 minutes I'll build it in front of you, then hand you the pieces to set up your own.",
  eventLine: `${NEXT_SESSION.dateLong} · ${NEXT_SESSION.timeLabel} · 50 minutes · online & recorded`,
  cta: "Register free",
  ctaNote:
    "No spam, and I never share your number. The session is recorded. Register and you get the replay even if you can't make it live.",
} as const;

/* ---------------------------------------------------------------- FORM */
export const FORM = {
  heading: "Save my seat",
  firstNameLabel: "First name",
  emailLabel: "Email",
  phoneLabel: "Mobile",
  // The payoff, never "(optional)": the phone field earns its keep.
  phonePayoff: "I'll text you the join link 15 minutes before we start.",
  businessLabel: "Business name (optional)",
  businessPayoff:
    "Optional. Add it and I'll tailor the examples in the session to your business.",
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

/* ------------------------------------------ 01 · WHAT YOU LEAVE WITH */
export const LEAVE_WITH = {
  eyebrow: "01 · What you leave with",
  heading: "What you leave with",
  items: [
    {
      title: "A month you can actually see.",
      body: "The storyboard method I use: goals first, then a day-by-day board, refreshed every two weeks in one Sunday sitting.",
    },
    {
      title: "A morning brief that tells the truth.",
      body: "What my assistant sends me each morning: today's blocks, what's due, the countdown on live commitments, and one flag when something on my calendar maps to no goal.",
    },
    {
      title: "The one rule that makes it a plan instead of a wish.",
      body: "When something slips, it moves to a real new time slot. Nothing quietly falls off.",
    },
  ],
} as const;

/* ------------------------------------------------ 02 · HOW I GOT HERE */
export const STORY = {
  eyebrow: "02 · How I got here",
  heading: "How I got here",
  paragraphs: [
    "The first version of this system wore me down. I let my assistant fill my calendar with six or seven tasks a day. I'd finish four, and the other three followed me into my evenings and weekends. I never felt like I could rest.",
    "In August I called a hard reset. Two focus priorities a day. Whole blocks of one to two hours for one thing. Deep work in the afternoon when my head is clearest. Day ends at six. Dinner with my wife is untouchable. That wasn't a productivity style. It was a correction.",
    "In September I realized the real problem wasn't volume. I was task-oriented instead of goal-oriented. So I flipped who does what. I write the month myself. My assistant keeps reality synced to what I wrote. Since then, whole projects finish. That's what I'm going to show you.",
  ],
} as const;

/* ----------------------------------------------------- 03 · AGENDA */
export const AGENDA = {
  eyebrow: "03 · The 50 minutes",
  heading: "What happens in the 50 minutes",
  items: [
    {
      time: "5 min",
      body: "The cost of a calendar that lies to you.",
    },
    {
      time: "30 min",
      body: "Live build. I connect Claude to my calendar and my CRM, open my monthly board, and run today's morning brief and debrief in front of you. You see the prompts, the rules, and what happens when something slips.",
    },
    {
      time: "5 min",
      body: "What this looks like in your business, whichever CRM or calendar you already use.",
    },
    {
      time: "5 min",
      body: "Your questions.",
    },
  ],
  kitLine:
    "At the end, everyone who attends live gets the kit: my Miro monthly planning board template, the assistant skill, and the prompt I use to run it.",
} as const;

/* -------------------------------------------------------- 04 · THE KIT */
export const KIT = {
  eyebrow: "04 · The kit",
  heading: "The kit",
  items: [
    {
      title: "The monthly planning board.",
      body: "The Miro template I fill out every two weeks: goals on top, a day-by-day board underneath.",
    },
    {
      title: "The assistant skill.",
      body: "The instructions that turn Claude into the assistant you'll watch me run: what it checks each morning, what it asks each evening, and the one rule about slipped work.",
    },
    {
      title: "The prompt.",
      body: "The exact text I use to start each day, so you can copy it and change the names.",
    },
  ],
  gatingLine:
    "Free for everyone who attends live. Replay viewers get the recording; the kit goes to the people in the room.",
} as const;

/* ------------------------------------------------- 05 · WHO THIS IS FOR */
export const WHO = {
  eyebrow: "05 · Who this is for",
  forHeading: "This is for you if",
  forItems: [
    "You own or run a small business and your calendar is full but your goals are not moving.",
    "You've tried an AI tool for planning and it gave you more to do, not less.",
    "You want a system you can run yourself, not one you have to buy from me.",
  ],
  notHeading: "This is not for you if",
  notItems: [
    "You want an AI to make decisions for you. The whole point is that you write the plan.",
  ],
} as const;

/* ---------------------------------------------------------- 06 · FAQ */
export const FAQ_ITEMS = [
  {
    q: "Will there be a replay?",
    a: "Yes. Everyone who registers gets it. The kit goes to live attendees only.",
  },
  {
    q: "Do I need Attio, Claude, and Google Calendar?",
    a: "No. I build with those three because they are what I use. The method works with any CRM and any calendar, and the planning board works on paper.",
  },
  {
    q: "Is this a sales pitch?",
    a: "No. The kit at the end is free. The 50 minutes are the real build.",
  },
] as const;

/* --------------------------------------- 07 · SESSION 001 REPLAY */
export interface WebinarSession {
  id: string;
  number: number;
  title: string;
  date: string; // ISO
  youtubeId?: string; // set when the replay is on YouTube
  result: string;
}

export const REPLAY_SECTION = {
  eyebrow: "07 · Session 001 replay",
  heading: "Session 001 replay: the missed-call text-back build",
  body: "In August I built a missed-call text-back system live, including the carrier approval most people skip. Watch it here.",
} as const;

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

/* ------------------------------------------- 08 · SPREAD THE WORD */
// The event card art as a poster to pass along (the hero's right column
// stays the form on purpose).
export const SHARE_SECTION = {
  eyebrow: "08 · Spread the word",
  heading: "Know someone who should see this?",
  body: "Build It Live is free every month. If you know a business owner whose calendar is full but whose goals are not moving, send this along and they can grab a seat in about 30 seconds.",
  cta: "Copy the link",
  ctaCopied: "Link copied",
  shareUrl: "https://www.pinchhitdigital.com/build-it-live",
  cardAlt:
    "Build It Live session two event card: Build Your Own AI Assistant with Claude, Attio, and Google Calendar",
} as const;

/* ---------------------------------------------------------- FINAL CTA */
export const FINAL_CTA = {
  line: "50 free minutes. Watch the assistant get built, then go set up your own.",
  cta: "Save my seat",
} as const;

/* ---------------------------------------------------------- STICKY CTA */
export const STICKY_CTA = {
  label: "Save my seat",
} as const;

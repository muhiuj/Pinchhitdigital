// Single source of truth for the /catering-lead-recovery landing page copy.
// Every string is verbatim from docs/CateringPage-Rewritten-Copy.md (The
// Knowledgeable Guide register). Brand rule: ZERO em dashes in any rendered
// string — use periods, colons, or commas. BOOKING_URL is re-exported from
// audit.ts so the CTAs and the audit flow always point at the same calendar.

export { BOOKING_URL } from "./audit";

// Founder / direct contact — reinforces the "one person" promise.
export const FOUNDER_EMAIL = "jeremy.muhiu@pinchhitdigital.com";

/* ---------------------------------------------------------------- SEO */
export const SEO = {
  title: "Catering Lead Recovery for DFW Restaurants | Pinch Hit Digital",
  description:
    "Stop losing catering inquiries to a slow reply. Pinch Hit Digital catches every catering lead across every channel and answers in under five minutes, so DFW restaurants book more events. Free 30-minute Revenue Audit.",
  slug: "/catering-lead-recovery",
  canonical: "https://www.pinchhitdigital.com/catering-lead-recovery",
} as const;

/* ---------------------------------------------------------------- HERO */
export const HERO = {
  eyebrow: "Catering lead recovery for DFW restaurants",
  // H1 is rendered in the component (accent on "a slower reply.").
  subhead:
    "Pinch Hit Digital captures every catering inquiry across every channel, from Instagram and email to voicemail, your website, Google, Yelp, OpenTable, and text, and answers each one in under five minutes. Then it follows up until the event books or the lead says no.",
  cta: "Get my free Revenue Audit",
  ctaMicro: "30 minutes. Free. No pitch.",
  hubChip: "Replied in 4:58",
} as const;

/* -------------------------------------------------- 01 · THE COST */
export interface CostStat {
  value: number | null;
  prefix?: string;
  suffix?: string;
  displayText?: string;
  body: string;
}

export const COST = {
  eyebrow: "01 · The cost of a slow reply",
  h2: "What a slow reply is quietly costing you",
  stats: [
    {
      value: 60,
      suffix: "%",
      body: "of catering inquiries get no reply within 24 hours. By the time anyone looks, the event is usually booked somewhere else.",
    },
    {
      value: null,
      displayText: "Under 5 minutes",
      body: "is how fast the system answers, on every channel, every day, including the middle of a Friday rush.",
    },
    {
      value: 420,
      prefix: "$",
      body: "is the profit in a single 50-person corporate lunch. Most restaurants miss several of these a month without ever knowing they came in.",
    },
  ] as CostStat[],
  closing:
    "Missed inquiries are not a sign that anyone is dropping the ball. They are the predictable result of asking people who are running a dinner service to also watch eight inboxes. Fix the system and the problem takes care of itself.",
} as const;

/* ------------------------------ 02 · THE SAME INQUIRY, TWO ENDINGS */
export interface Scenario {
  head: string;
  without: string;
  withMeta: string | null;
  with: string;
}

export const SCENARIOS_SECTION = {
  eyebrow: "02 · The same inquiry, two endings",
  h2: "The same inquiry, two endings",
  intro: "Here is what changes when the reply goes out in minutes instead of days.",
  labelWithout: "Without a system",
  labelWith: "With the system",
} as const;

export const SCENARIOS: Scenario[] = [
  {
    head: "Saturday, 9:47 PM. Web form: “Need catering for 60 next Friday.”",
    without:
      "It sits in an inbox all weekend. By Monday they have booked someone else.",
    withMeta: "9:51 PM",
    with: "Answered in your voice in four minutes, with menu and date options. The lead is captured and logged.",
  },
  {
    head: "Friday rush, 7:12 PM. An Instagram DM about an office holiday party.",
    without: "Nobody is checking DMs in the middle of service.",
    withMeta: null,
    with: "Replied automatically, the lead is logged, and you find a warm conversation on Monday instead of a missed one.",
  },
  {
    head: "Tuesday morning. A voicemail about a rehearsal dinner.",
    without: "A voicemail nobody had time to play.",
    withMeta: null,
    with: "Transcribed the minute it landed, followed up the same morning, and kept warm until they book.",
  },
];

/* ----------------------------------------- 03 · WHY THIS WORKS (new) */
export const WHY_WORKS = {
  eyebrow: "03 · Why this works",
  h2: "Why fast, central follow-up wins the booking",
  leadIn:
    "Three things are true about catering inquiries. Once you see them, the whole approach makes sense.",
  blocks: [
    {
      title: "Catering leads book with whoever answers first.",
      body: "When someone reaches out about an event, they rarely message only you. They are contacting two or three restaurants at once and comparing the replies. The first useful answer sets the anchor, and most events are won or lost in the first few minutes, long before anyone tastes the food. Answering inside five minutes puts your restaurant at the top of that list instead of the bottom.",
    },
    {
      title: "The real problem is attention, not effort.",
      body: "Catering inquiries arrive in eight different places: a phone you cannot reach mid-service, a Yelp inbox that rarely gets checked, an Instagram DM folder, a website form that emails an address no one opens. Each one is a separate decision about whether to stop and respond, and a busy kitchen loses that decision most nights. Bringing every inquiry into one place removes the decision. When they all land in the same inbox, responding stops depending on whether anyone happened to look.",
    },
    {
      title: "An integration just means your channels stop being islands.",
      body: "Connecting your channels sounds technical. In practice it means one simple thing. Every place a guest can reach you is wired into a single inbox, so a message on any of them triggers the same fast, well-written reply and gets recorded in the same place. You do not log into eight apps, and you do not learn new software. The tools you already use keep working, and they finally talk to each other.",
    },
  ],
} as const;

/* ----------------------------- 04 · EVERY CHANNEL, ONE PLACE */
export type ChannelApp =
  | "instagram"
  | "email"
  | "voicemail"
  | "webform"
  | "google"
  | "yelp"
  | "opentable"
  | "text";

export interface Channel {
  id: ChannelApp;
  tab: string;
  kicker: string;
  title: string;
  sender: string;
  meta: string;
  subject?: string;
  duration?: string;
  transcription?: string;
  formFields?: string[];
  inbound: string;
  reply: string;
  responseTime: string;
}

export const CHANNELS_SECTION = {
  eyebrow: "04 · Every channel, one place",
  h2: "Every channel a catering lead can come from, in one place",
  intro:
    "These are the eight places an event inquiry can land. Tap any one to see how it arrives and how it gets answered, the way it would show up on your own phone.",
  resolveLine:
    "Wherever it comes from, it lands in one inbox and gets a real reply, written in your restaurant's voice, in under five minutes.",
  resolveDetail:
    "Every inquiry is captured, logged, and answered, whether or not anyone on your team had a free hand.",
} as const;

// The eight phone-native mocks, kept as built. Em dashes inside the message
// text replaced with commas/periods per the brand rule.
export const CHANNELS: Channel[] = [
  {
    id: "instagram",
    tab: "Instagram",
    kicker: "Instagram DM · Friday rush",
    title: "A DM lands while you're mid-service.",
    sender: "megan_textiles",
    meta: "Fri 7:12",
    inbound:
      "Hey! Do y'all cater? Need lunch for ~40 at the office on the 18th, possible? 🙏",
    reply:
      "Absolutely, we cater office lunches all the time, and the 18th is open. Sending menu options for 40 now. What time should it arrive?",
    responseTime: "Auto-replied in 3:41",
  },
  {
    id: "email",
    tab: "Email",
    kicker: "Email · late Saturday",
    title: "An email you won't see until Monday.",
    sender: "Megan Torres",
    meta: "9:47 PM",
    subject: "Catering: rehearsal dinner (50 guests)",
    inbound:
      "We're looking for catering for a rehearsal dinner of about 50 on June 28. Do you handle events this size?",
    reply:
      "Hi Megan, yes, 50 for a rehearsal dinner is right in our wheelhouse and June 28 is open. I've attached two menus and a quick quote. Want to grab 10 minutes this week?",
    responseTime: "Auto-replied in 4:58",
  },
  {
    id: "voicemail",
    tab: "Voicemail",
    kicker: "Voicemail · Tuesday morning",
    title: "A voicemail nobody had time to check.",
    sender: "Dave",
    meta: "Tue 11:02",
    duration: "0:18",
    transcription:
      "Hi, this is Dave, calling about catering a retirement party, maybe 35 people, sometime next month. Give me a call back when you get a sec.",
    inbound: "Voicemail transcribed automatically.",
    reply:
      "Hi Dave, got your message about the retirement party for 35. Happy to help! What date are you eyeing, and any budget per head in mind?",
    responseTime: "Auto-replied in 4:12",
  },
  {
    id: "webform",
    tab: "Website",
    kicker: "Website form · Sunday",
    title: "A form fills out while you're closed.",
    sender: "Priya Shah",
    meta: "Sun 2:14 PM",
    formFields: ["Corporate lunch · 60 guests", "Friday the 18th"],
    inbound: "Need boxed lunches delivered by 11:30. A few veggie options please.",
    reply:
      "Hi Priya, boxed lunches for 60 on the 18th, delivered by 11:30, is no problem. Sending three veggie-friendly options now with per-box pricing.",
    responseTime: "Auto-replied in 2:30",
  },
  {
    id: "google",
    tab: "Google",
    kicker: "Google Messages · Thursday",
    title: "A quick question from your Google listing.",
    sender: "+1 (469) 555-0133",
    meta: "Thu 8:30 AM",
    inbound:
      "Do you do drop-off catering for 25? Need it this Thursday if possible.",
    reply:
      "Yes! Drop-off for 25 this Thursday works. Want our most popular taco or sandwich spread? I'll text the menu and a total.",
    responseTime: "Auto-replied in 1:58",
  },
  {
    id: "yelp",
    tab: "Yelp",
    kicker: "Yelp · this week",
    title: "A quote request buried in Yelp.",
    sender: "Rachel C. · Dallas, TX",
    meta: "Birthday party · 30 guests · ~2 weeks",
    inbound:
      "Looking for taco-bar style catering for a 30th birthday. What are my options and roughly what would it run?",
    reply:
      "Happy to help with the birthday! Our taco bar for 30 runs about $14/head with two proteins, sides, and setup. Want me to hold the date?",
    responseTime: "Auto-replied in 4:30",
  },
  {
    id: "opentable",
    tab: "OpenTable",
    kicker: "OpenTable · midweek",
    title: "A large-party request through OpenTable.",
    sender: "Large party · 22 guests",
    meta: "Friday · 7:00 PM",
    inbound:
      "Celebrating an anniversary, and would love to talk about a set menu for the group.",
    reply:
      "Congratulations! Friday at 7 for 22 is available, and a set menu is a great call. Sending two options to choose from now.",
    responseTime: "Auto-replied in 3:20",
  },
  {
    id: "text",
    tab: "Text",
    kicker: "Text message · weekend",
    title: "A text from a friend of a friend.",
    sender: "+1 (469) 555-0148",
    meta: "Sat 1:12 PM",
    inbound:
      "Hi! Got your number from a friend. Do you cater graduation parties? Looking at ~40 people in May.",
    reply:
      "Love it, grad parties are one of our favorites. 40 in May is wide open. What weekend are you thinking? I'll send a menu and lock the date.",
    responseTime: "Auto-replied in 2:44",
  },
];

/* -------------------------- 05 · WHAT WORKING WITH US LOOKS LIKE */
export interface EngagementStep {
  n: string;
  title: string;
  body: string;
}

export const ENGAGEMENT = {
  eyebrow: "05 · What working with us looks like",
  h2: "From the first call to your first recovered lead",
  leadIn:
    "The build starts with your restaurant, not a template. What we connect, and how we write the replies, depends on where your inquiries actually come from and how you already talk to guests.",
  steps: [
    {
      n: "01",
      title: "The Revenue Audit. 30 minutes, free.",
      body: "We look at where catering inquiries reach you today and where they slip through. You leave with a clear number for what a faster response is worth, whether or not you hire us.",
    },
    {
      n: "02",
      title: "The build. About two weeks.",
      body: "We connect your channels into one inbox, write replies that sound like your team, and set the follow-up to match the way you sell. Most builds take about two weeks. Yours takes as long as it needs to be right.",
    },
    {
      n: "03",
      title: "Live, and recovering.",
      body: "Within the first two weeks, replies start going out in under five minutes, and the first lead you would have missed books instead. Every month after that, you get a plain-English report of what came in, what booked, and what you recovered.",
    },
  ] as EngagementStep[],
} as const;

/* ------------------------------------------ 06 · REVENUE-GAP REPORT */
export const REPORT = {
  eyebrow: "06 · You see the money, every month",
  h2: "You see exactly what it recovered, every month",
  body: "Once a month you get a one-page report in plain language. It shows the inquiries that came in, the ones that booked, and the revenue you recovered that would otherwise have slipped away. There are no dashboards to learn. Just the number, and the proof behind it.",
  period: "May 2026",
  recovered: 6200,
  recoveredLine:
    "across 4 booked events that started as inquiries you would have missed.",
  stats: [
    { value: "11", label: "inquiries captured" },
    { value: "1m 12s", label: "fastest response" },
  ],
} as const;

/* ----------------------------- 07 · WHY PINCH HIT DIGITAL (merged) */
export interface WhyCard {
  title: string;
  body: string;
}

export const WHY_PHD = {
  eyebrow: "07 · Why Pinch Hit Digital",
  h2: "Built and run by one person who answers the phone",
  founderLeadIn:
    "A national chain has a sales office answering catering inquiries all day. An independent restaurant has a chef who is already running a dinner service. That gap is about staffing, not effort or skill, and it is exactly the kind of gap the right system closes. I spent years building the response and follow-up systems that companies with whole IT departments rely on. Pinch Hit Digital brings that same capability to independent restaurants across Dallas and Fort Worth, built for your shop and explained in plain English. When you book the audit, you are talking to the person who builds your system and answers when you call.",
  founderName: "Jeremy Muhiu",
  founderTitle: "Founder, Pinch Hit Digital",
  cards: [
    {
      title: "One contact, not a help desk.",
      body: "You work with one person who knows your restaurant. No tickets, no queue, no offshore script.",
    },
    {
      title: "Built for Dallas and Fort Worth.",
      body: "We are local. We meet you at the restaurant or over coffee, not through a support portal.",
    },
    {
      title: "No technical knowledge required.",
      body: "The system sits on top of the tools you already use. You do not switch anything or learn anything new.",
    },
    {
      title: "The person who builds it runs it.",
      body: "The same person who sets up your system is the one who answers when it needs attention.",
    },
  ] as WhyCard[],
} as const;

/* --------------------------------------------------- 08 · FAQ */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_SECTION = {
  eyebrow: "08 · Straight answers",
  h2: "Straight answers",
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does it cost?",
    a: "The Revenue Audit is free and takes 30 minutes, with no pitch. If you decide to work together, the system is a one-time build, which for most catering setups lands in the low four figures, plus a small monthly fee to keep it running and reporting. You get the real number on the call, not a “starting at” range.",
  },
  {
    q: "How fast does it actually reply?",
    a: "Under five minutes, around the clock, on every channel, in your restaurant's voice. Not a generic “we received your message,” but a real answer with the details a guest needs while they are still deciding.",
  },
  {
    q: "Will it work with the tools I already use?",
    a: "Yes. It connects to your existing phone, inbox, Instagram, website, Google, Yelp, and OpenTable. Nothing gets replaced, and there is nothing new to learn. The system sits on top of what you already have.",
  },
  {
    q: "Do you work with restaurant chains?",
    a: "We focus on independent and small-group restaurants across Dallas and Fort Worth. If you run two to five locations, that is right in our lane. If you are larger, raise it on the audit and we will tell you honestly whether we are the right fit.",
  },
];

/* ------------------------------------------------- 09 · FINAL CTA */
export const FINAL_CTA = {
  eyebrow: "Your next step",
  h2: "Find out what a faster reply is worth to your restaurant",
  body: "The Revenue Audit takes 30 minutes, costs nothing, and ends with a clear number: the catering revenue you are likely missing, and what it would take to recover it. We can do it on the phone or over coffee anywhere in Dallas and Fort Worth. After that, the decision is yours.",
  cta: "Get my free Revenue Audit",
  ctaMicro: "30 minutes. Free. No pitch. You leave with the number.",
} as const;

/* ----------------------------------------------------- FOOTER */
export const FOOTER_TAGLINE = "Catering lead recovery for DFW restaurants";

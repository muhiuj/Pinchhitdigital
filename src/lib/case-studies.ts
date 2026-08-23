// Single source of truth for /case-studies (index) and
// /case-studies/dfw-insurance-response-study. Every rendered copy string
// and every data point lives here.
//
// v2 (2026-08-19, Jeremy-approved arc): thesis-first rewrite. The page
// argues the documented speed-to-lead pattern (HBR 2011, Drift 2017,
// Velocify 2014, McKinsey 2016) and presents the DFW field study as its
// local replication. Every study figure below was verified against the
// source or its primary press release before inclusion; every field-study
// figure is re-derived from the study_firms/study_touches logs.
//
// Brand rules enforced: ZERO em dashes anywhere (meta and alt text
// included), no hype adjectives, no exclamation points, the word "AI"
// never appears, no firm is ever named or identifiable (hard rule:
// anon ids only), estimates labeled as estimates, every statistic names
// its source in-copy.

export { BOOKING_URL } from "./audit";

/* ------------------------------------------------------------- index SEO */
export const INDEX_SEO = {
  title: "Case Studies: Field Research on Lead Response in DFW | Pinch Hit Digital",
  description:
    "Original field research from Pinch Hit Digital. Real quote requests to DFW businesses, timed to the minute. Start with the insurance agency response time study.",
  canonical: "https://www.pinchhitdigital.com/case-studies",
} as const;

export const INDEX_HEADER = {
  eyebrow: "Pinch Hit Digital · Research",
  titleLead: "Case",
  titleAccent: "studies",
  dek: "Field research and build write-ups from real DFW businesses. Every number here comes from a timestamped log, and the raw data is available on request.",
} as const;

/* --------------------------------------------------------- index entries */
export type CaseStudyEntry = {
  type: "Research" | "Client Work";
  label: string;
  title: string;
  dek: string;
  date: string;
  href?: string;
  stat?: { value: string; caption: string };
  comingSoon?: boolean;
};

export const ENTRIES: CaseStudyEntry[] = [
  {
    type: "Research",
    label: "Field Report No. 1",
    title:
      "I Asked 34 Dallas Agencies to Quote a Real Business. 22 Never Followed Up.",
    dek: "How DFW independent insurance agencies handle a live commercial inquiry. Part one of a two-industry study.",
    date: "August 19, 2026",
    href: "/case-studies/dfw-insurance-response-study",
    stat: { value: "22 of 34", caption: "No human follow-up by cutoff" },
  },
  {
    type: "Research",
    label: "Field Report No. 2",
    title:
      "I Sent Real Jobs to 49 Dallas Contractors on a Sunday. 31 Never Responded.",
    dek: "How DFW electrical, HVAC, and plumbing contractors handle a live homeowner inquiry. Part two of a two-industry study.",
    date: "August 23, 2026",
    href: "/case-studies/dfw-contractor-response-study",
    stat: { value: "31 of 49", caption: "Never responded" },
  },
];

/* -------------------------------------------------------------- study SEO */
export const STUDY_SEO = {
  title:
    "I Asked 34 Dallas Agencies to Quote a Real Business. 22 Never Followed Up. | Pinch Hit Digital",
  description:
    "A field study of insurance agency response time in DFW. 34 real quote requests, timed to the minute. What came back, what it costs, and one thing to check this week.",
  canonical:
    "https://www.pinchhitdigital.com/case-studies/dfw-insurance-response-study",
  datePublished: "2026-08-19",
} as const;

/* ------------------------------------------------------------- study hero */
export const STUDY_HERO = {
  eyebrow: "Field Report No. 1 · DFW Insurance",
  title:
    "I Asked 34 Dallas Agencies to Quote a Real Business. 22 Never Followed Up.",
  dek: "Field Report No. 1: how DFW independent insurance agencies handle a live commercial inquiry. Part one of a two-industry study.",
  stats: [
    { value: "34", caption: "Agencies asked for a real quote" },
    { value: "22", caption: "Never had a human follow up" },
    { value: "1", caption: "Weekend was all it took" },
  ],
} as const;

/* ------------------------------------------------- report body (v2 copy) */
export type ReportPara = {
  text: string;
  /** Optional single inline link: `link.text` must appear verbatim in `text`. */
  link?: { text: string; href: string };
};

export type ReportSection = {
  /** Mono kicker above the heading, e.g. "01 · The research". */
  eyebrow?: string;
  heading?: string;
  paras: ReportPara[];
};

// The industry evidence: why this study exists. Renders before the test.
export const REPORT_RESEARCH: ReportSection[] = [
  {
    eyebrow: "01 · The research",
    heading: "The pattern the industry already measured",
    paras: [
      {
        text: "Commercial insurance is sold on relationships, but it is won on a clock. The clock starts the moment a business owner asks for a quote, and it runs faster than almost anyone inside the industry assumes.",
      },
      {
        text: "The evidence is not new. In 2011, researchers writing in Harvard Business Review audited 2,241 U.S. companies by sending each one a web inquiry and timing what happened next. The average company took 42 hours to make first contact. Twenty-three percent never responded at all. The same research team studied 1.25 million sales leads and found that firms trying to reach a lead within one hour were nearly seven times as likely to qualify it as firms that waited even an hour longer.",
      },
      {
        text: "Companies did not get faster with time. In 2017, the software company Drift repeated the audit on 433 businesses: real forms, real timers. Seven percent responded within five minutes. Fifty-five percent had not responded after five business days.",
      },
      {
        text: "Read enough of this research and the pattern hardens into a rule: the first useful human response usually wins, and most of the field never enters the race.",
      },
    ],
  },
  {
    eyebrow: "02 · The industry",
    heading: "Insurance already took this test",
    paras: [
      {
        text: "This is not a tech-industry quirk. In 2014, the sales-technology firm Velocify ran the same kind of study on 25 of the country's largest insurance companies: online quote requests, tracked for 22 days. The average buyer waited 2.3 days for a phone call. Thirty-nine percent never received one.",
      },
      {
        text: "While response times stood still, the buyer moved. McKinsey's 2016 research on small commercial insurance found that 70 percent of buyers now start shopping through a channel other than an agent, usually a website, while 82 percent still ultimately bind coverage through an agent. Hold those two numbers together and the shape of the market appears: the relationship still closes the account, but the website form now opens it. The form is the front door.",
      },
      {
        text: "Every study above tested carriers and large companies. Nobody, as far as I can find, had run the audit on the independent agencies of a single market: the shops where a real business owner actually lands when they search for coverage close to home. So I ran it, in the market where I live and work.",
      },
    ],
  },
];

// The test itself: method, then results narrative up to the infographic.
export const REPORT_TEST: ReportSection[] = [
  {
    eyebrow: "03 · The test",
    heading: "34 agencies, one real buyer",
    paras: [
      {
        text: "This was not a simulation. I needed coverage: a business owner's policy, professional liability, and cyber for my small consulting company, which had gone without long enough. Real firm, real risk, real budget.",
        link: { text: "small consulting company", href: "/" },
      },
      {
        text: "I started with 62 independent agencies across Dallas and Fort Worth. Screening cut the list fast. Some websites were dead. Several shops turned out to write life and health only. One site never loaded at all. Two quote forms demanded my driver's license number and home address before anyone would speak with me, and I declined on principle, the same way your prospects do.",
      },
      {
        text: "That left 34 agencies that received a clean, real inquiry through the front door they built for it: their own website form, or the email address they publish. Every inquiry went out on Friday, August 7, between 6:00 and 7:30 in the evening, because that is when a business owner finally has a quiet minute for insurance, after the week is over and the kids are down.",
      },
      {
        text: "Then the measurement rig took over: a dedicated inbox and a dedicated phone number, so every reply, call, text, and voicemail landed in one timestamped log. Automated replies were tracked separately. In this report, a response means a person: a call, a text, or an email written by a human. And no agency gets named, in the numbers or in the stories. This is about a pattern, not any one shop.",
      },
    ],
  },
  {
    eyebrow: "04 · What came back",
    heading: "Two by Saturday. Ten with Monday's coffee.",
    paras: [
      {
        text: "Two agencies reached a human response into my inbox before Monday: one Saturday morning at 9:26, one Saturday afternoon at 2:41. Two, out of 34, across an entire weekend.",
      },
      {
        text: "Then Monday morning happened. Between 8:19 and 11:14am, ten more responses arrived in a single three-hour window. I started calling it the Monday flush: the weekend's leads sitting in an unwatched inbox, waiting for someone to open it with their coffee. At my stated cutoff of Monday noon, the count stood at 12 of 34. Twenty-two agencies had not made contact.",
      },
      {
        text: "The tail was long and thin. Two more responses came Monday afternoon, one arrived Wednesday, and one landed the following Monday, ten days after the inquiry. That is where the count stands as I publish: 16 of 34, with 18 agencies, more than half, still silent. Among the agencies that did respond, the median time to a human was 63 hours. Ten replied by email, five by phone, one by text.",
      },
    ],
  },
];

// After the infographic: the robot receipt, the artifact, the domain finding.
export const REPORT_ROBOT: ReportSection[] = [
  {
    eyebrow: "05 · The robot receipt",
    heading: "An instant receipt, then silence",
    paras: [
      {
        text: "Three agencies sent an automated acknowledgment the moment the form landed, the fastest within seconds of submission. One of the three never followed up with a person at all. That gap deserves a name, and I keep coming back to this one: the tool got bought, and the plumbing behind it never got connected.",
      },
      {
        text: "Auto-replies make the problem worse, not better. Inside the agency, the instant receipt creates the feeling of responsiveness; the system reports the lead as handled. Outside the agency, the buyer is holding a receipt from a robot and waiting days for a person. The receipt raises the very expectation the silence then breaks.",
      },
      {
        text: "One follow-up even argued with the method itself. An agency texted me that letting several brokers quote a business only blocks the carrier market and limits the buyer's options. Whatever the merits of that advice, notice what it concedes: the industry knows buyers shop several agencies at once. That is exactly why the clock, not the argument, decides the winner.",
      },
      {
        text: "One more quiet observation from the log. Of the ten agencies that replied by email, five wrote back from a different domain than the website I contacted: a marketing vendor's system, a sister brand, a network address. Half of the front doors in this sample do not match the house behind them, which says something about how the industry's tools get stitched together.",
      },
    ],
  },
];

// The phone tier and everything after, to the end of the argument.
export const REPORT_PHONE: ReportSection[] = [
  {
    eyebrow: "06 · The phone tier",
    heading: "Then I picked up the phone, and the story improved",
    paras: [
      {
        text: "The following week I called 24 of the agencies with the same real need: three weekday-morning blocks and one block after 6pm. The phone told a different story than the forms did.",
      },
      {
        text: "When a licensed person answered, this industry was excellent. One agent ran intake on the spot, gave me ballpark numbers on the first call, and had written follow-up in my inbox within three hours. Another had a colleague following up the same afternoon. The best agencies in this market are genuinely good at the work.",
      },
      {
        text: "Reaching one was the coin flip. On one morning, five of six agencies answered live. On another, one of six. Same market, same script, same caller. Whether a ready buyer reaches your desk appears to depend mostly on which morning he happens to call. After hours, the door mostly closes: of six evening calls, one was answered, and it was an owner picking up his own line.",
      },
      {
        text: "And a finding I did not expect: the callback muscle is real. Of the twelve voicemails I left, seven were returned, the fastest in four minutes. One agency, once it had my number, logged seventeen separate attempts to reach me across calls, texts, and voicemails. The capacity to chase exists in this industry. It just is not wired to the website.",
      },
    ],
  },
  {
    eyebrow: "07 · The math",
    heading: "What the silence costs",
    paras: [
      {
        text: "Now the math, labeled plainly: these are estimates.",
      },
      {
        text: "A small commercial account of the kind I was shopping runs somewhere between $2,000 and $4,000 a year in premium. Commission on that is typically 10 to 15 percent, call it $300 to $600 a year. Small businesses do not re-shop annually, so a won account retains. One account is plausibly $1,500 to $3,000 of commission over its life, before the first referral it produces.",
      },
      {
        text: "Twenty-two agencies let that account walk past them in a single weekend. Not because they quoted high. Because nobody answered. And I was one buyer, on one Friday. Multiply by every Friday.",
      },
    ],
  },
  {
    eyebrow: "08 · The mechanism",
    heading: "Why this happens, and why it is not a people problem",
    paras: [
      {
        text: "Nobody at these agencies decided to ignore a commercial lead. The lead simply had nowhere to go. A form submission becomes an email to an inbox. The inbox is not watched on weekends. It is not assigned to anyone, so it belongs to everyone, which means it belongs to no one until Monday. By then the buyer has heard from somebody else, because nobody shopping insurance asks only one agency.",
      },
      {
        text: "The phone tier proves the point. The same market that let forms sit for 63 hours returned voicemails in minutes, because a voicemail rings a phone that somebody owns. The two doors differ in wiring, not in character: one channel reaches a person, and the other feeds an inbox that nobody is assigned to watch.",
      },
    ],
  },
  {
    eyebrow: "09 · Homework",
    heading: "One thing to do this week, no vendor required",
    paras: [
      {
        text: "Go to your own website on a Saturday and submit a quote request the way a stranger would. Time how long it takes a human to touch it. Then find out where that submission actually landed, and whose job it was. While you are at it, call your own main line at ten on a weekday morning and count the rings.",
      },
      {
        text: "Most owners I talk to have never done either. The ones who do are usually surprised, in one direction or the other.",
      },
    ],
  },
];

// Closing matter: method notes and the part-two teaser.
export const REPORT_CLOSING: ReportSection[] = [
  {
    heading: "Method notes",
    paras: [
      {
        text: "This was a field study, not an academic one, and I hold it to a field standard: honest counting, stated cutoffs, and raw data I can produce if anyone asks. Every send and every response is timestamped in a log, collected through a dedicated inbox and a dedicated phone number. Automated replies were logged separately from human contact. Response rates reflect first human contact as of the stated cutoffs; the agencies that responded after the cutoff are in the record too, with their timestamps.",
      },
      {
        text: "Disclosures that matter. First, this was a real purchase: one of the 34 agencies in this study is about to write my policy, because one of them made it easy. Second, one form returned an error on submission, so delivery to that agency is uncertain; it stayed in the sample, and for what it is worth, a person from that agency called three days later anyway. Third, the shops screened out before the send (dead sites, life-and-health-only practices, the site that never loaded, the two forms demanding a driver's license) are excluded from the 34 and reported here as observations only.",
      },
    ],
  },
  {
    heading: "What comes next",
    paras: [
      {
        text: "Part two is published: the same audit, run on 49 of DFW's electrical, HVAC, and plumbing contractors, where the story runs almost exactly backwards. Read the contractor study.",
        link: {
          text: "Read the contractor study.",
          href: "/case-studies/dfw-contractor-response-study",
        },
      },
    ],
  },
];

export const REPORT_BIO: ReportPara = {
  text: "Jeremy Muhiu is the founder of Pinch Hit Digital, a Dallas systems consultancy for owner-operated businesses.",
  link: { text: "Pinch Hit Digital", href: "/" },
};

/* ----------------------------------------------- infographic: 34 doors */
// One dot per agency in the blind cohort. `t` is hours since Friday
// August 7, 6:00pm CT (the send window opened at 5:59pm); null = no human
// response as of August 19. All values from the study log.
export type StudyDot = {
  id: string;
  t: number | null;
  when: string | null;
  hrs: number | null;
  channel: "email" | "call" | "text" | null;
};

export const STUDY_DOTS: StudyDot[] = [
  { id: "INS-28", t: 15.4, when: "Sat · 9:26am", hrs: 14.4, channel: "email" },
  { id: "INS-75", t: 20.7, when: "Sat · 2:41pm", hrs: 19.6, channel: "email" },
  { id: "INS-40", t: 62.3, when: "Mon · 8:19am", hrs: 61.5, channel: "email" },
  { id: "INS-71", t: 62.6, when: "Mon · 8:37am", hrs: 61.9, channel: "email" },
  { id: "INS-17", t: 63.2, when: "Mon · 9:09am", hrs: 62.5, channel: "email" },
  { id: "INS-07", t: 63.3, when: "Mon · 9:16am", hrs: 63.1, channel: "call" },
  { id: "INS-58", t: 63.5, when: "Mon · 9:30am", hrs: 62.4, channel: "call" },
  { id: "INS-13", t: 63.7, when: "Mon · 9:42am", hrs: 63.5, channel: "call" },
  { id: "INS-68", t: 64.0, when: "Mon · 9:57am", hrs: 64.0, channel: "email" },
  { id: "INS-61", t: 64.2, when: "Mon · 10:12am", hrs: 63.9, channel: "email" },
  { id: "INS-84", t: 64.3, when: "Mon · 10:16am", hrs: 63.0, channel: "email" },
  { id: "INS-67", t: 65.2, when: "Mon · 11:14am", hrs: 65.1, channel: "call" },
  { id: "INS-27", t: 68.0, when: "Mon · 2:02pm", hrs: 67.5, channel: "call" },
  { id: "INS-11", t: 71.1, when: "Mon · 5:08pm", hrs: 71.0, channel: "text" },
  { id: "INS-42", t: 113.7, when: "Wed · 11:40am", hrs: 112.5, channel: "email" },
  { id: "INS-62", t: 236.1, when: "Aug 17 · 2:04pm", hrs: 235.6, channel: "email" },
  // No human response as of August 19:
  ...[
    "INS-03", "INS-05", "INS-08", "INS-12", "INS-18", "INS-19", "INS-20",
    "INS-32", "INS-45", "INS-52", "INS-55", "INS-56", "INS-60", "INS-69",
    "INS-72", "INS-76", "INS-79", "INS-80",
  ].map((id) => ({ id, t: null, when: null, hrs: null, channel: null }) as StudyDot),
];

export const DOORS = {
  eyebrow: "The weekend, replayed",
  heading: "34 front doors, one clock",
  intro:
    "One dot per agency. The clock starts Friday at 6pm, when the inquiries went out, and each dot lights up at the minute a human responded. Tap any dot for its record.",
  cutoffLabel: "Report cutoff · Mon noon",
  silentLabel: "No human response as of Aug 19",
  replay: "Replay the weekend",
  milestones: [
    { at: 0, text: "Friday evening: 34 inquiries sent", count: 0 },
    { at: 21, text: "Saturday: 2 of 34", count: 2 },
    { at: 65.3, text: "The Monday flush: 12 of 34 by noon", count: 12 },
    { at: 71.2, text: "Monday, after hours: 14 of 34", count: 14 },
    { at: 236.2, text: "The long tail, through Aug 17: 16 of 34", count: 16 },
  ],
  finalText: "16 of 34 · median responder: 63 hours",
  footnote:
    "All times from the study log, Central Time. Sends went out 5:59 to 7:26pm; the axis starts at 6:00pm for readability. Hours shown are per agency, measured from its own send time.",
} as const;

/* --------------------------------------------------- audits table */
export const AUDITS = {
  eyebrow: "The scoreboard",
  heading: "Fifteen years of the same audit",
  intro:
    "Four studies, one method: send a real inquiry, start a clock, count the silence.",
  rows: [
    {
      study: "Harvard Business Review",
      year: "2011",
      sample: "2,241 U.S. companies",
      result: "42-hour average first response. 23% never responded.",
    },
    {
      study: "Velocify",
      year: "2014",
      sample: "25 large insurance companies",
      result: "2.3-day average wait for a call. 39% never called.",
    },
    {
      study: "Drift",
      year: "2017",
      sample: "433 B2B companies",
      result: "7% responded within 5 minutes. 55% silent after 5 business days.",
    },
    {
      study: "This study",
      year: "2026",
      sample: "34 DFW independent agencies",
      result: "63-hour median among responders. 53% still silent 12 days on.",
      own: true,
    },
  ],
  footnote:
    "Methods and cutoffs differ by study; each figure follows its own study's definition. Sources are named in the text above.",
} as const;

/* ------------------------------------------------- two doors comparison */
export const TWO_DOORS = {
  eyebrow: "Same industry, two doors",
  heading: "The form waits. The phone answers.",
  a: {
    label: "The website form",
    value: "63 hrs",
    caption: "Median wait for a human, among the 16 of 34 that responded",
  },
  b: {
    label: "A voicemail",
    value: "4 min",
    caption: "Fastest callback. 7 of the 12 voicemails I left were returned",
  },
  caption:
    "Both doors belong to the same market. One is wired to a person; the other feeds an unwatched inbox.",
} as const;

/* --------------------------------------------------------------- final CTA */
// The booking link is a 30-minute intro meeting; every CTA says 30 minutes.
export const CTA = {
  heading: "Want to know what a commercial buyer would experience with your firm?",
  button: "Book a free 30-minute call",
  buildItLiveLink: "I also build these systems live, in plain English.",
} as const;

/* ================================================================== */
/* Field Report No. 2 — DFW contractor response study (2026-08-23).    */
/* Report copy is VERBATIM from Jeremy's canonical copy doc: do not    */
/* rewrite, tighten, or "improve" it. Same brand rules as part one.    */
/* ================================================================== */

export const STUDY2_SEO = {
  title:
    "I Sent Real Jobs to 49 Dallas Contractors. 31 Never Responded. | Pinch Hit Digital",
  description:
    "A field study of contractor lead response in DFW. 49 real job requests sent on a Sunday, timed to the minute. The fastest reply took 3 minutes. 31 never came.",
  canonical:
    "https://www.pinchhitdigital.com/case-studies/dfw-contractor-response-study",
  datePublished: "2026-08-23",
} as const;

export const STUDY2_HERO = {
  eyebrow: "Field Report No. 2 · DFW Trades",
  title:
    "I Sent Real Jobs to 49 Dallas Contractors on a Sunday. 31 Never Responded.",
  dek: "Field Report No. 2: how DFW electrical, HVAC, and plumbing contractors handle a live homeowner inquiry. Part two of a two-industry study.",
  crossLink: {
    label: "Read part one here",
    href: "/case-studies/dfw-insurance-response-study",
  },
  stats: [
    { value: "49", caption: "Contractors, one Sunday" },
    { value: "3", caption: "Minutes to the fastest human reply" },
    { value: "31", caption: "Never responded" },
  ],
} as const;

// Part one's hero gains the mirror link once part two is live.
export const STUDY1_CROSSLINK = {
  label: "Read part two",
  href: "/case-studies/dfw-contractor-response-study",
} as const;

/* --------------------------------------------- part two report (VERBATIM) */
export const REPORT2_INTRO: ReportSection[] = [
  {
    paras: [
      {
        text: "Two Sundays ago, mid-morning, I sent real work to 49 independent contractors across Dallas and Fort Worth. Electricians got a request for a full electrical inspection on a house headed to market. Plumbers got a cast iron pipe replacement. HVAC shops got a system that needed attention before listing. Real house, real projects, sent through the front door each company built for it: their own website form, or the email address they publish.",
      },
      {
        text: "Then I started a clock on every one of them and measured the same single thing as part one: how long until a human being responded.",
      },
      {
        text: "If you read the insurance study, you know what a weekend does to a quote request in that industry. Two humans out of 34, across two full days. I expected some version of the same story here.",
        link: {
          text: "the insurance study",
          href: "/case-studies/dfw-insurance-response-study",
        },
      },
      {
        text: "The trades told a different one. The story runs backwards.",
      },
    ],
  },
  {
    eyebrow: "01 · What came back",
    heading: "The first 75 minutes",
    paras: [
      {
        text: "A plumber's office replied to my cast iron inquiry three minutes after I hit submit. Not a robot. A person, with a plan to get someone out that week.",
      },
      {
        text: "Two minutes behind them, a plumbing and air company's coordinator texted me about the pipe, riding right behind her own company's automated acknowledgment. Fourteen minutes after another form went in, my phone rang: an HVAC company calling me back. On a Sunday. Within the first 75 minutes, six companies had a human in contact with me. On the insurance side, that number after an entire weekend was two.",
      },
      {
        text: "Monday morning brought the same flush I saw in insurance: eight more companies surfaced between 8:04 and 9:31am as the weekend's inboxes got opened. By the 26-hour mark, 15 of 49 had responded. The count now stands at 18 of 49, with a few late arrivals in between.",
      },
      {
        text: "Which leaves the other number. Thirty-one of 49, nearly two thirds, have never had a human make contact. Not slowly. Not ever.",
      },
      {
        text: "That is the shape of this industry's funnel, and it is not a bell curve. It is a barbell. The companies that respond are stunningly fast, minutes not days. The rest are perfectly silent. There is almost nobody in between.",
      },
    ],
  },
];

export const REPORT2_EVENING: ReportSection[] = [
  {
    eyebrow: "02 · After hours",
    heading: "Then the sun went down, and the phones kept answering",
    paras: [
      {
        text: "In part one I called two dozen insurance agencies and learned that reaching a licensed human was a coin flip, and that evenings were a dead zone. One live answer out of six after-hours calls.",
      },
      {
        text: "I ran the same experiment on the trades on a Tuesday evening, calling eight shops between roughly 5:45 and 6:30pm. Six answered live. A person, picking up the phone, at dinner time.",
      },
      {
        text: "The difference is not virtue. It is economics. An insurance office at 6pm is a dark room. A plumber at 6pm knows that a ringing phone might be a burst pipe, and a burst pipe is revenue. This industry has wired urgency into its phone habits because emergencies taught it to.",
      },
      {
        text: "The voicemail data agrees. I left three voicemails at trades shops across the study. All three came back. One the next morning, apologizing for missing a call from the night before. One sixteen hours later with the same apology. And one four days later, from a man just back from vacation, who returned a stranger's voicemail as nearly the first thing he did at his desk. Three for three. Nobody had to do that.",
      },
    ],
  },
];

export const REPORT2_ROBOTS: ReportSection[] = [
  {
    eyebrow: "03 · The robot receipt",
    heading: "The robots ride along here too, with one difference",
    paras: [
      {
        text: 'The trades have bought the same automation the insurance industry has, and the same failure modes showed up. Instant acknowledgment texts and emails. An opt-in confirmation that arrived from a company that never followed with a person. One automated thank-you email greeted me with the words "Thanks for Contacting [company_name]!", the template variable sitting right there unfilled, a small monument to a tool nobody ever finished setting up. Another company\'s website popup thanked me for subscribing to deals. I had asked about a broken pipe.',
      },
      {
        text: "But here is the difference worth stealing. At the best shops, the robot and the human arrived together. The instant text at 10:35, the coordinator at 10:37. The acknowledgment was a receipt, and the person was right behind it. In the insurance study, the instant reply was usually a stand-in for a person who came days later or never. In the best of the trades, it is a heads-up that a person is already moving.",
      },
    ],
  },
  {
    eyebrow: "04 · The ceiling",
    heading: "Two systems worth naming, no names attached",
    paras: [
      {
        text: "One electrician's operation was the ceiling of the entire two-industry study. The website form booked me a visit for that same evening. A text told me which technician was coming and when. He showed up in the window, looked at the work, and the written estimate was in my phone seven minutes after he left. Form to priced work, same day, every handoff automatic. Nothing about it felt robotic, because a human did the work and the system did the chasing.",
      },
      {
        text: "And one HVAC company did the single smartest thing I saw anywhere. I started their online booking wizard and abandoned it partway, the way real customers do constantly. Two days later the manager called me about the request I never finished submitting. Their system had captured the lead at the moment of abandonment instead of letting it evaporate. Every other company in both studies only ever saw the people who made it all the way through.",
      },
    ],
  },
];

export const REPORT2_CLOSE: ReportSection[] = [
  {
    eyebrow: "05 · The math",
    heading: "What the silence costs",
    paras: [
      {
        text: "Conservative math, plainly labeled as estimates. The cast iron replacement I described runs somewhere between $8,000 and $15,000 in this market depending on scope. The electrical inspection is a smaller ticket, but it is attached to a house sale, which is where repair lists and upgrade work come from. These were not tire-kicker inquiries. They were the kind of jobs that make a contractor's month.",
      },
      {
        text: "Thirty-one companies never found out those jobs existed. Not because they bid high or showed up late. Because a form on their own website emptied into a place nobody looks.",
      },
    ],
  },
  {
    eyebrow: "06 · The mechanism",
    heading: "Why this happens",
    paras: [
      {
        text: "The barbell has a simple mechanism. In the shops that answered in minutes, the website form behaves like a ringing phone: it lands in a dispatch flow, somebody owns it, and it interrupts someone's Sunday. In the silent shops, the form behaves like mail: it lands in an inbox that gets checked when it gets checked, which on a Sunday is Monday and in practice is often never. Same industry, same tools available, opposite wiring.",
      },
      {
        text: "The trades do not have an effort problem. A man returned my voicemail from his vacation backlog. They have a wiring problem, and only in one specific place: the quiet handoff between the website and a human being. The phone side of this industry could teach the insurance industry a clinic. The form side is where the buyer leaks out.",
      },
    ],
  },
  {
    eyebrow: "07 · Homework",
    heading: "The free 20-minute test, no vendor required",
    paras: [
      {
        text: "This Sunday, fill out your own website's contact form the way a homeowner with a $10,000 problem would. Start a timer. Then have someone call your main line at 6pm on a weekday. Two questions decide everything: how long until a human touched the form, and where did that submission actually land, whose job was it?",
      },
      {
        text: "If the phone test passes and the form test fails, you are normal for this industry, and you are also handing the easiest jobs in your market to whoever answers first. You do not have to beat everyone. You have to beat silence, and silence is most of your competition.",
      },
    ],
  },
];

export const REPORT2_CLOSING: ReportSection[] = [
  {
    heading: "Method notes",
    paras: [
      {
        text: "Same field standard as part one: honest counting, stated cutoffs, timestamped logs, raw data available on request. 49 companies received a clean, real inquiry on Sunday morning, August 9. A response means a human: a call, a text, or an email written by a person. Automated acknowledgments were tracked separately. Phone tier: 14 additional calls placed across a Monday business block and a Tuesday evening block. No company is named, in praise or in silence. One disclosure for symmetry with part one: this vertical produced one written estimate, which I reviewed and declined; unlike the insurance study, no purchase resulted.",
        link: {
          text: "the insurance study",
          href: "/case-studies/dfw-insurance-response-study",
        },
      },
    ],
  },
  {
    heading: "What comes next",
    paras: [
      {
        text: "The two-industry comparison is the point of the whole exercise, and it will get its own write-up: two sets of good people, two opposite front doors, and one identical gap where the buyer disappears. If you run a shop and want the full breakdown when it publishes, it will live here.",
      },
    ],
  },
];

/* ------------------------------------------------------- barbell figure */
export const BARBELL = {
  eyebrow: "The distribution",
  heading: "Fast or silent, almost nothing in between",
  intro:
    "Every contractor in the study, grouped by outcome. The responders arrived in minutes; the rest never arrived at all.",
  fast: {
    count: 18,
    label: "Minutes",
    caption: "Responded, most within minutes of the form or the next morning's first coffee",
  },
  middle: "Almost nobody in between",
  never: {
    count: 31,
    label: "Never",
    caption: "No human contact as of publication",
  },
  footnote:
    "All counts from the study log. 49 companies inquired on Sunday, August 9; counts as of publication. Response times measured per company from its own send time.",
} as const;

/* ----------------------------------------------- after-hours comparison */
export const AFTER_HOURS = {
  eyebrow: "Same hour, two industries",
  heading: "6pm, phones ringing in both industries",
  a: {
    label: "Trades shops · Tuesday ~6pm",
    value: "6 of 8",
    caption: "Answered live, a person picking up at dinner time",
  },
  b: {
    label: "Insurance agencies · after hours",
    value: "1 of 6",
    caption: "One live answer, an owner picking up his own line",
  },
  caption:
    "Both counts from the two field studies' phone tiers. A burst pipe is revenue; the trades wired urgency into their phones because emergencies taught them to.",
} as const;

/* --------------------------------------------------------- part two CTA */
export const CTA2 = {
  heading: "Want to know what a customer experiences with your business?",
  button: "Book a free 30-minute call",
  buildItLiveLink: "I also build these systems live, in plain English.",
} as const;

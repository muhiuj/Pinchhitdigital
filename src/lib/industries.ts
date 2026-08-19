// Single source of truth for the industries layer: the nav dropdown, the
// homepage industry cards, and the three landing pages under /industries/.
// 2026-08 pivot: insurance agencies, trades, and construction. Adding a
// vertical is one IndustryPage object here plus one route file.
//
// Copy rules (sitewide, non-negotiable): Knowledgeable Guide register, zero
// em dashes, no hype adjectives, no exclamation points, every statistic
// names its source in-copy, internal study data only when labeled with its
// real sample, the word "AI" never appears, never "clients" reader-facing.

export type IndustrySlug = "insurance-agencies" | "trades" | "construction";

export interface IndustryStat {
  value: string;
  caption: string;
}

export interface IndustryPage {
  slug: IndustrySlug;
  navLabel: string;
  /** Homepage card copy. */
  cardTitle: string;
  cardLine: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    dek: string;
    cta: string;
    secondary?: { label: string; href: string };
  };
  problem: { eyebrow: string; heading: string; paras: string[] };
  proof: {
    eyebrow: string;
    heading: string;
    para: string;
    stats: IndustryStat[];
    link: { label: string; href: string };
  };
  system: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  engagement: { eyebrow: string; heading: string; paras: string[] };
  cta: { heading: string; body: string; button: string };
}

const ENGAGEMENT_SHARED = [
  "It starts with a free 30-minute digital systems audit. We look at your inquiry flow the way a real buyer experiences it: the form, the phone, the after-hours gap, and show you exactly where it leaks.",
  "Engagements are scoped to your business after the audit. No packages and no surprise line items: you see the full cost before anything gets built, and you work directly with the person who builds it.",
];

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: "insurance-agencies",
    navLabel: "Insurance Agencies",
    cardTitle: "Independent Insurance Agencies",
    cardLine:
      "Commercial quote requests answered in minutes, including the ones that land Friday night.",
    seo: {
      title:
        "Insurance Lead Follow-Up Systems for DFW Independent Agencies | Pinch Hit Digital",
      description:
        "Lead follow-up systems for independent insurance agencies in Dallas and Fort Worth. Every quote request answered in minutes, backed by our 34-agency field study.",
    },
    hero: {
      eyebrow: "For independent insurance agencies · DFW",
      h1: "Lead follow-up that answers in minutes, not on Monday.",
      dek: "Your producers are excellent on the phone. Your website form is where commercial accounts go quiet. We build the plumbing that connects the two, for independent agencies across Dallas and Fort Worth.",
      cta: "Book a free walkthrough",
      secondary: {
        label: "Read the field study first",
        href: "/case-studies/dfw-insurance-response-study",
      },
    },
    problem: {
      eyebrow: "01 · The front door moved",
      heading: "The buyer starts at your website now",
      paras: [
        "Commercial buyers changed how they shop before most agencies changed how they answer. In McKinsey's 2016 research on small commercial insurance, 70 percent of buyers started their shopping through a channel other than an agent, usually a website, while 82 percent still ultimately bound coverage through an agent. The relationship still closes the account. The website form now opens it.",
        "That form is usually wired to an inbox nobody is assigned to watch. A quote request that arrives Friday evening sits until Monday coffee. By then the buyer has heard from somebody else, because nobody shopping commercial coverage asks only one agency, and the first useful human response usually wins.",
        "This is not a people problem. The same agencies that let forms sit for days return voicemails in minutes, because a voicemail rings a phone that somebody owns. The difference is wiring, and wiring can be fixed.",
      ],
    },
    proof: {
      eyebrow: "02 · Measured in this market",
      heading: "We ran the test on 34 DFW agencies",
      para: "In August 2026 we sent a real commercial inquiry (a business owner's policy, professional liability, and cyber) to 34 independent agencies across Dallas and Fort Worth, then timed every response against a dedicated inbox and phone number. The full method and results are published.",
      stats: [
        { value: "22 of 34", caption: "No human follow-up by the Monday-noon cutoff" },
        { value: "63 hrs", caption: "Median wait for a human, among those that responded" },
        { value: "4 min", caption: "Fastest voicemail callback. The phones work; the forms don't" },
      ],
      link: {
        label: "Read Field Report No. 1",
        href: "/case-studies/dfw-insurance-response-study",
      },
    },
    system: {
      eyebrow: "03 · The fix, at mechanism level",
      heading: "What a connected front door looks like",
      intro:
        "Four pieces of plumbing, built around how your agency already works. Nothing here replaces a producer; it gets the buyer to one before your competition does.",
      items: [
        {
          title: "Missed calls get a text in seconds",
          body: "A caller who hits voicemail gets an immediate text from your agency's number, so the conversation starts before they dial the next agency on the list.",
        },
        {
          title: "Form fills ring a person",
          body: "Quote requests stop being emails. They become alerts that reach a producer's phone with the buyer's details attached, nights and weekends included.",
        },
        {
          title: "Follow-up that does not forget",
          body: "A sequence keeps the quote alive with reminders, texts, and emails until a human closes the loop. Nothing depends on somebody remembering.",
        },
        {
          title: "A monthly count you can read",
          body: "How many inquiries came in, how fast a human touched each one, and which ones went quiet. One page, every month, in plain English.",
        },
      ],
    },
    engagement: {
      eyebrow: "04 · Working together",
      heading: "How an engagement works",
      paras: ENGAGEMENT_SHARED,
    },
    cta: {
      heading:
        "Want to know what a commercial buyer experiences when they ask your agency for a quote?",
      body: "A free walkthrough of your inquiry flow, on the phone or over coffee anywhere in DFW. You leave with the picture whether we work together or not.",
      button: "Book a free walkthrough",
    },
  },
  {
    slug: "trades",
    navLabel: "Trades",
    cardTitle: "Electrical, HVAC & Plumbing",
    cardLine:
      "Missed calls texted back in seconds while your crew is on the job.",
    seo: {
      title:
        "Missed-Call Text Back for DFW Electricians, HVAC, and Plumbers | Pinch Hit Digital",
      description:
        "Missed-call text-back and lead follow-up systems for electrical, HVAC, and plumbing companies in Dallas and Fort Worth. The calls you miss on the job, answered in seconds.",
    },
    hero: {
      eyebrow: "For electrical, HVAC & plumbing companies · DFW",
      h1: "The calls you miss on the ladder, answered in seconds.",
      dek: "Missed-call text-back and follow-up systems for trades companies across Dallas and Fort Worth, so the job that rings while your hands are full doesn't book with the next shop down the list.",
      cta: "Book a demo",
    },
    problem: {
      eyebrow: "01 · The 4:52 problem",
      heading: "The job goes to the first shop that answers",
      paras: [
        "It's 4:52 on a Friday. A general contractor needs a number on a panel upgrade by Monday. The call hits voicemail because the whole crew is thirty feet up. By the time you call back Saturday morning, two competitors already have. The job didn't go to the best shop. It went to the first one who answered.",
        "The math on missed calls is documented: in one study of test calls to small businesses, 62 percent went unanswered (411 Locals). And speed decides more than people assume: leads contacted within 5 minutes were 21 times more likely to qualify than leads that waited 30, per the Lead Response Management study.",
        "None of this is a work-ethic problem. Your crew is on the job, which is exactly where they should be. The phone just needs a system behind it.",
      ],
    },
    proof: {
      eyebrow: "02 · Measured in this market",
      heading: "We are running the test on DFW trades right now",
      para: "In August 2026 we sent real service inquiries to 49 electrical, HVAC, and plumbing companies across Dallas and Fort Worth and timed every response, the same audit we published for insurance agencies. Field Report No. 2 publishes soon, and the early pattern is worth knowing: the trades answer their phones better than almost any industry we've measured. The website form is still where the job goes quiet.",
      stats: [
        { value: "49", caption: "DFW trades companies in the field study, publishing soon" },
        { value: "62%", caption: "Of test calls to small businesses went unanswered (411 Locals)" },
        { value: "21×", caption: "More likely to qualify when contacted in 5 minutes vs 30 (Lead Response Management study)" },
      ],
      link: { label: "See the research", href: "/case-studies" },
    },
    system: {
      eyebrow: "03 · The fix, at mechanism level",
      heading: "A phone that answers even when nobody can",
      intro:
        "Four pieces of plumbing, built around a crew that works with its hands. Nothing here needs your attention during the workday.",
      items: [
        {
          title: "Missed calls get a text in seconds",
          body: "A caller who hits voicemail gets an immediate text from your business number, so the conversation starts while your hands are still full.",
        },
        {
          title: "Web inquiries reach a phone",
          body: "Quote and service requests become alerts that reach whoever runs your schedule, with the customer's details attached, nights and weekends included.",
        },
        {
          title: "Follow-up that does not forget",
          body: "Estimates and bids stay alive with reminders, texts, and emails until somebody books or says no. Nothing rides on the whiteboard.",
        },
        {
          title: "A monthly count you can read",
          body: "How many calls came in, how many were missed, how fast each one got a response, and which jobs went quiet. One page, every month.",
        },
      ],
    },
    engagement: {
      eyebrow: "04 · Working together",
      heading: "How an engagement works",
      paras: ENGAGEMENT_SHARED,
    },
    cta: {
      heading: "Find out how many calls your shop missed last week.",
      body: "A free 30-minute audit of your inquiry flow, phone and web. You leave with the number whether we work together or not.",
      button: "Book a demo",
    },
  },
  {
    slug: "construction",
    navLabel: "Construction",
    cardTitle: "Construction",
    cardLine: "Bids answered before the competition calls back.",
    seo: {
      title:
        "Lead Response Systems for DFW Construction Companies | Pinch Hit Digital",
      description:
        "Lead response and bid follow-up systems for construction companies in Dallas and Fort Worth. Win the work by being the first one who answers.",
    },
    hero: {
      eyebrow: "For construction companies · DFW",
      h1: "Win the bid by being the first one who answers.",
      dek: "Lead response and follow-up systems for construction companies and GCs across Dallas and Fort Worth, so the bid request that lands during a pour doesn't die in an inbox.",
      cta: "Book a demo",
    },
    problem: {
      eyebrow: "01 · The bid clock",
      heading: "Estimating starts before the estimate",
      paras: [
        "A bid request is a race that starts the moment it's sent. The research on response speed is consistent: leads contacted within 5 minutes were 21 times more likely to qualify than leads that waited 30, per the Lead Response Management study. And in one study of test calls to small businesses, 62 percent went unanswered (411 Locals).",
        "In construction the pattern compounds. The owner or PM who sends a bid request sends several at once, and the first substantive reply frames every conversation after it. Answering first doesn't win the job by itself. It decides who the job is compared against.",
        "Your estimator can't stop a pour to answer the phone. The system behind the phone is what needs to change.",
      ],
    },
    proof: {
      eyebrow: "02 · The research",
      heading: "We measure response time in this market",
      para: "Pinch Hit Digital runs published field studies on how DFW businesses answer real inquiries, timed to the minute against a dedicated inbox and phone number. The first report covers insurance agencies; trades publish next. The pattern repeats across industries: the phones outperform the forms, and the first human response usually wins.",
      stats: [
        { value: "42 hrs", caption: "Average first response in Harvard Business Review's 2011 audit of 2,241 companies" },
        { value: "23%", caption: "Of those companies never responded at all (Harvard Business Review, 2011)" },
        { value: "5 min", caption: "The response window where qualification odds are 21 times higher (Lead Response Management study)" },
      ],
      link: { label: "See the research", href: "/case-studies" },
    },
    system: {
      eyebrow: "03 · The fix, at mechanism level",
      heading: "A front office that never leaves the site",
      intro:
        "Four pieces of plumbing, built for a company that wins work in the field. Nothing here adds a step to your day.",
      items: [
        {
          title: "Missed calls get a text in seconds",
          body: "A caller who hits voicemail gets an immediate text from your business number, so the conversation starts before they call the next GC on the list.",
        },
        {
          title: "Bid requests reach a person",
          body: "Web inquiries become alerts that reach your estimator's phone with the details attached, not emails that wait for a desk day.",
        },
        {
          title: "Follow-up that does not forget",
          body: "Open bids stay alive with scheduled follow-ups until they're won or dead. Nothing rides on a sticky note in the truck.",
        },
        {
          title: "A monthly count you can read",
          body: "Every inquiry, its response time, and its outcome. One page, every month, so you know what the pipeline actually did.",
        },
      ],
    },
    engagement: {
      eyebrow: "04 · Working together",
      heading: "How an engagement works",
      paras: ENGAGEMENT_SHARED,
    },
    cta: {
      heading: "Every bid request answered before the competition calls back.",
      body: "A free 30-minute audit of your inquiry flow. You leave with a clear picture of where bids leak, whether we work together or not.",
      button: "Book a demo",
    },
  },
];

export function getIndustryPage(slug: IndustrySlug): IndustryPage {
  const page = INDUSTRY_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown industry slug: ${slug}`);
  return page;
}

/** Nav dropdown entries, in display order. */
export const INDUSTRY_NAV = INDUSTRY_PAGES.map((p) => ({
  href: `/industries/${p.slug}`,
  label: p.navLabel,
}));

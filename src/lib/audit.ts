// Single source of truth for the /audit "Catering Revenue Score" quiz.
// Questions, point values, scoring tiers, and the booking destination all
// live here so copy/score tweaks are one-line edits and the API route can
// reuse the same scoring logic the client uses.

// Where the post-results CTA sends people. Swap this one line to repoint the
// booking flow (e.g. to a Calendly URL) without touching the page.
export const BOOKING_URL = "https://cal.com/jeremy-muhiu-7gtclu/30min";

export interface AnswerOption {
  label: string;
  points: 0 | 1 | 2 | 3;
}

export interface Question {
  id: number;
  /** Short label for the lead record / email. */
  shortLabel: string;
  prompt: string;
  options: AnswerOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    shortLabel: "Response speed",
    prompt:
      "When a catering inquiry comes in, how quickly does your team typically respond?",
    options: [
      { label: "Within the hour", points: 3 },
      { label: "Same day, a few hours later", points: 2 },
      { label: "Next day or whenever we get to it", points: 1 },
      { label: "Honestly, it depends on who sees it first", points: 0 },
    ],
  },
  {
    id: 2,
    shortLabel: "Follow-up system",
    prompt: "How do you currently track and follow up on catering leads?",
    options: [
      { label: "We have a dedicated process — CRM, spreadsheet, or system", points: 3 },
      { label: "We use our email inbox and try to stay on top of it", points: 2 },
      { label: "Whoever handles it first deals with it", points: 1 },
      { label: "We don't have a formal process for this", points: 0 },
    ],
  },
  {
    id: 3,
    shortLabel: "Lead confidence",
    prompt:
      "How confident are you that you're following up on every catering inquiry you receive?",
    options: [
      { label: "Very confident — nothing slips through", points: 3 },
      { label: "Mostly confident — occasionally things get missed", points: 2 },
      { label: "Not very confident — we know we miss some", points: 1 },
      { label: "We lose some and we know it", points: 0 },
    ],
  },
  {
    id: 4,
    shortLabel: "Revenue awareness",
    prompt:
      "Do you know how many catering inquiries you receive per month and your close rate?",
    options: [
      { label: "Yes, we track this and review it regularly", points: 3 },
      { label: "We get inquiries but don't formally track the numbers", points: 2 },
      { label: "We have some catering but haven't measured it", points: 1 },
      { label: "We don't have a catering program yet", points: 0 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.length * 3; // 12

export interface Tier {
  min: number;
  max: number;
  label: string;
  message: string;
}

// Ordered high → low. scoreToTier returns the first range the score falls in.
export const TIERS: Tier[] = [
  {
    min: 10,
    max: 12,
    label: "Catering Optimized",
    message:
      "You've built solid habits. The gap is scale — most optimized restaurants still lose 20–30% of leads to slow systems. Let's audit what's leaking.",
  },
  {
    min: 5,
    max: 9,
    label: "Revenue Leaving the Table",
    message:
      "You're capturing some catering business, but you're likely missing 40–60% of inquiries due to gaps in speed and follow-up. A system fixes this in 2 weeks.",
  },
  {
    min: 0,
    max: 4,
    label: "Revenue at Risk",
    message:
      "You're losing high-value catering leads every week. The 60% of restaurants that never respond to inquiries in 24 hours? This is that pattern. We need to talk.",
  },
];

export function scoreToTier(score: number): Tier {
  const tier = TIERS.find((t) => score >= t.min && score <= t.max);
  // Fallback to the lowest tier defensively; score is always 0–12 in practice.
  return tier ?? TIERS[TIERS.length - 1];
}

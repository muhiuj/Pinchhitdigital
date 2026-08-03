// Homepage industry picker + industry-aware problem section data. Three ICPs
// per the 2026-08 strategic broadening: Construction & Trades first (new
// primary), Professional Services insurance-first, Restaurants & Catering
// (the original flagship vertical). Copy rules: Knowledgeable Guide register,
// zero em dashes, every statistic names its third-party source, no internal
// PHD stats until 30 real audits exist.

export type IndustryKey = "construction" | "professional" | "restaurants";

export interface IndustryStat {
  value: string;
  body: string;
}

export interface IndustryContent {
  key: IndustryKey;
  label: string;
  cardLine: string;
  narrative: string;
  fix: string;
  stats: [IndustryStat, IndustryStat];
}

// Shared, sourced stats. The 62% figure is the cross-vertical anchor; 43% is
// restaurant-native. The internal "48 hrs" audit claim is intentionally NOT
// used (no self-cited data until the sample is real).
const STAT_21X: IndustryStat = {
  value: "21×",
  body: "more likely to qualify: leads contacted within 5 minutes versus leads that wait 30 (Lead Response Management study).",
};

const STAT_62: IndustryStat = {
  value: "62%",
  body: "of calls to small businesses go unanswered, in one study of test calls (411 Locals).",
};

const STAT_43: IndustryStat = {
  value: "43%",
  body: "of restaurant calls go unanswered during peak hours, per independent studies (Hostie AI, 2025).",
};

export const INDUSTRIES: IndustryContent[] = [
  {
    key: "construction",
    label: "Construction & Trades",
    cardLine:
      "Roofing, HVAC, remodel, concrete. Bids answered before the competition calls back.",
    narrative:
      "It's 4:52 on a Friday. A general contractor needs a number on a re-roof by Monday. The call hits voicemail because your whole crew is thirty feet up. By the time you call back Saturday morning, two competitors already have. The bid didn't go to the best crew. It went to the first one who answered.",
    fix: "Pinch Hit Digital builds the systems that answer for you: an instant text back on every missed call, follow-up that keeps the bid alive through the weekend, and a website that proves you're legit before they ever dial.",
    stats: [STAT_21X, STAT_62],
  },
  {
    key: "professional",
    label: "Professional Services",
    cardLine:
      "Insurance, law, accounting. New clients booked while you're with the current one.",
    narrative:
      "It's 12:40. A prospect calls about a policy quote while you're mid-review with a client. They don't leave a voicemail. They dial the next agency on the list, and that policy, and every renewal behind it, walks out the door before you knew it arrived.",
    fix: "Pinch Hit Digital builds the systems that answer for you: instant response to every inquiry, intake handled by text, and appointments landing on your calendar without a receptionist chained to the phone.",
    stats: [STAT_21X, STAT_62],
  },
  {
    key: "restaurants",
    label: "Restaurants & Catering",
    cardLine:
      "Catering leads caught the moment they land, even mid-service on a Saturday.",
    narrative:
      "It's 7:43 on a Saturday night and a party-of-35 catering inquiry just landed in the inbox. Nobody sees it until Monday morning, and by then the customer has booked the restaurant that answered on Sunday.",
    fix: "Pinch Hit Digital catches the inquiry the moment it arrives, replies in minutes in your voice, and follows up until the event books, all while your team runs the service.",
    stats: [STAT_43, STAT_21X],
  },
];

export const DEFAULT_INDUSTRY: IndustryKey = "construction";

export function isIndustryKey(v: string | null): v is IndustryKey {
  return v === "construction" || v === "professional" || v === "restaurants";
}

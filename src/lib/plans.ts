// Single source of truth for /plans pricing.
//
// Bump prices HERE and the page copy, the "Starting at" blocks, and the
// Service+Offer JSON-LD (src/lib/schema.ts) all update together. Numeric
// `setup` / `monthly` values feed the schema's Offer prices; the display
// strings drive the visible card. Keep the two in sync when editing.
//
// Near-term note (per owner): catering `monthly` rises to $800–$1,000 once
// there are 2–3 documented results. That's a one-line edit below.

export const CAL_URL = "https://cal.com/jeremy-muhiu-7gtclu/30min";
export const CTA_LABEL = "Book a Free Audit →";

export interface Plan {
  /** Stable key for React keys / anchors. */
  id: "catering" | "website" | "bundle";
  name: string;
  /**
   * Optional shorter heading shown ONLY on the pricing card. The full `name`
   * stays canonical for the JSON-LD and for consistency with the homepage and
   * /catering page. Lets us level the card headers without renaming the
   * product everywhere.
   */
  displayName?: string;
  /** Optional ribbon — "Flagship" / "Best Value". */
  badge?: string;
  tagline: string;
  /** Numeric starting prices in USD — also feed the JSON-LD Offers. */
  setup: number;
  monthly: number;
  /** Headline price line, e.g. "Starting at $2,000 setup + $750/mo". */
  priceLine: string;
  /** Terms line under the price (minimum, savings, etc.). */
  terms: string;
  features: string[];
  /** Optional proof line rendered under the checklist. */
  microProof?: string;
  /**
   * Visually distinct "we need both" card. Renders on a dark ink fill so it
   * reads as the closer rather than a third tier in a ladder.
   */
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "catering",
    name: "Catering Lead Recovery System",
    displayName: "Catering Recovery System",
    badge: "Flagship",
    tagline: "Turn missed inquiries into booked events.",
    setup: 2000,
    monthly: 750,
    priceLine: "Starting at $2,000 setup + $750/mo",
    terms: "90-day minimum, then month-to-month.",
    features: [
      "Responds to every catering inquiry (form, email, or voicemail) in under 5 minutes, automatically",
      "Multi-step follow-up sequence that runs until they book or say no",
      "Booking calendar integration",
      "Monthly revenue gap report",
      "Direct line to me, not a ticket queue",
    ],
    microProof:
      "Leads contacted within 5 minutes are up to 21× more likely to qualify than ones that wait 30. This system makes sure none of yours wait.",
  },
  {
    id: "website",
    name: "Website & Digital Presence",
    tagline: "Built to be found. Built to convert.",
    setup: 3500,
    monthly: 350,
    priceLine: "Starting at $3,500 build + $350/mo",
    terms: "Custom build, then ongoing management (90-day minimum).",
    features: [
      "Custom-built site, no templates, no DIY",
      "Google Business Profile optimization",
      "Local SEO for DFW searches",
      "Content & hours management",
      "Monthly performance dashboard",
      "Ongoing updates, not a one-and-done build",
    ],
  },
  {
    id: "bundle",
    name: "The Full Setup",
    badge: "Best Value",
    tagline: "Both systems. One build. One point of contact.",
    setup: 4500,
    monthly: 999,
    priceLine: "Starting at $4,500 setup + $999/mo",
    terms: "Everything in both products. Save $1,000 up front.",
    features: [
      "Everything in the Catering Lead Recovery System",
      "Everything in Website & Digital Presence",
      "One combined onboarding, one monthly report, one person who knows your whole setup",
    ],
    highlight: true,
  },
];

// Homepage FAQ data, shared between the client accordion (FAQ.tsx) and the
// server-rendered FAQPage JSON-LD (app/page.tsx). Lives in a plain module —
// exports from a "use client" file become client references on the server,
// not values, so the data must be defined outside the client boundary.

export interface HomeFaqItem {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

export const FAQ_ITEMS: HomeFaqItem[] = [
  {
    q: "Do I need to know anything about tech?",
    a: "No. We handle all of it: setup, integrations, and ongoing management. You approve the work and the direction; we build and maintain everything else.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Owner-operated businesses where inquiries arrive faster than a small team can answer them. Right now that means independent insurance agencies, electrical, HVAC, and plumbing companies, and construction companies across DFW.",
  },
  {
    q: "How long does it take to get up and running?",
    a: "Most clients see their systems live within two weeks of the free audit. The audit itself is 30 minutes.",
  },
  {
    q: "I already have a website. Can you still help?",
    a: "Yes. Most clients come to us with an existing site. We start with the audit to find the highest-leverage gaps, which is often inquiry response time, not the website itself.",
  },
  {
    q: "Do you work with chains or franchises?",
    a: "Our focus is DFW independents. Single-location or small multi-location operators are exactly who this is built for.",
  },
  {
    q: "What does it cost?",
    a: "Every engagement is scoped to the business, so there is no one-size price list. The free 30-minute audit comes first: it defines the scope, and you see the full cost before anything gets built.",
  },
];

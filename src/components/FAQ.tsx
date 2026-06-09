"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    q: "Do I need to know anything about tech?",
    a: "No. We handle all of it — setup, integrations, and ongoing management. You approve the work and the direction; we build and maintain everything else.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "We focus on DFW independent operators: restaurants, food trucks, cafés, caterers, trades businesses, and retail. If you rely on local customers and referrals, we built this for you.",
  },
  {
    q: "How long does it take to get up and running?",
    a: "Most clients see their systems live within two weeks of the free audit. The audit itself is 20 minutes.",
  },
  {
    q: "I already have a website — can you still help?",
    a: "Yes. Most clients come to us with an existing site. We start with the audit to find the highest-leverage gaps, which is often inquiry response time, not the website itself.",
  },
  {
    q: "Do you work with chains or franchises?",
    a: "Our focus is DFW independents. Single-location or small multi-location operators are exactly who this is built for.",
  },
  {
    q: "What does it cost?",
    a: "Real starting prices are on the plans page — catering lead recovery, websites, and the bundle, with setup and monthly laid out. The audit is always free, and it sets your final scope.",
    link: { href: "/plans", label: "See plans →" },
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-900 px-6 py-14 md:px-8 lg:py-20">
      <ScrollReveal className="mx-auto max-w-[1320px]">
        <p className="font-mono text-xs uppercase tracking-wider text-teal-400">
          FAQ
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold leading-tight text-cream-50 md:text-4xl">
          Your Questions,{" "}
          <span className="font-serif italic text-sun-400">Answered</span>.
        </h2>

        <div className="mx-auto mt-12 max-w-[720px]">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div key={item.q} className="border-b border-cream-50/10 py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="font-display text-lg font-semibold text-cream-50 transition-colors duration-200 group-hover:text-teal-400 md:text-xl">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-teal-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p
                    id={answerId}
                    className="pb-2 pt-3 font-sans text-base leading-relaxed text-cream-50/70 md:text-[17px]"
                  >
                    {item.a}
                    {item.link ? (
                      <>
                        {" "}
                        <Link
                          href={item.link.href}
                          className="font-semibold text-teal-400 underline-offset-4 hover:underline"
                        >
                          {item.link.label}
                        </Link>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

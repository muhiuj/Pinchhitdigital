"use client";

/**
 * Page-specific mini-FAQ for /plans. Same accordion interaction as the
 * homepage FAQ (single-open, accessible expand/collapse) but styled light to
 * sit on the cream page. Questions live here because they're scoped to
 * pricing objections, not the general homepage set.
 */
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Why isn't this a flat monthly fee like the software ads I see?",
    a: "Because I'm not selling you software. I'm building and running the system for you. The setup fee covers the build; the monthly covers running and tuning it. A $159/mo tool is something you set up yourself.",
  },
  {
    q: "Do I have to commit forever?",
    a: "No. The catering system has a 90-day minimum because that's how long it takes to show real results. After that you're month-to-month.",
  },
  {
    q: "What if I only need the website (or only the catering system)?",
    a: "That's fine. They're sold separately. The bundle just saves you money if you need both.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. Thirty minutes, on the phone or over coffee in DFW. No pitch if it's not a fit.",
  },
];

export default function PlansFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[720px]">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        const answerId = `plans-faq-answer-${i}`;
        return (
          <div key={item.q} className="border-b border-ink-200 py-5">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
            >
              <span className="font-display text-lg font-semibold text-ink-900 transition-colors duration-200 group-hover:text-teal-700 md:text-xl">
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-teal-600 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <p
                id={answerId}
                className="pb-2 pt-3 font-sans text-base leading-relaxed text-ink-500 md:text-[17px]"
              >
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

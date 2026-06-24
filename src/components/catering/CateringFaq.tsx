"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS, FAQ_SECTION } from "@/lib/catering";
import { Eyebrow, Section } from "./primitives";

// 08 · Straight answers. Real <button aria-expanded> accordions — reduced-motion
// safe (content always reachable). The matching FAQPage JSON-LD is emitted from
// the page.

export function CateringFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="canvas">
      <Eyebrow n="08" label="Straight answers" />
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 md:text-4xl">
        {FAQ_SECTION.h2}
      </h2>

      <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold tracking-[-0.01em] text-cream-50">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-teal-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                hidden={!isOpen}
                className="pb-6"
              >
                <p className="max-w-[68ch] font-sans text-base leading-relaxed text-body">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

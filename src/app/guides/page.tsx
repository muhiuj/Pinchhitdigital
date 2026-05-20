"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import GuideModal from "@/components/GuideModal";

const guides = [
  {
    number: "01",
    title: "Effective Hourly Revenue",
    description:
      "The metric most restaurant owners have never heard of — and why it predicts your margins better than labor %.",
    fileName: "PHD-Guide-01-Effective-Hourly-Revenue.pdf",
  },
  {
    number: "02",
    title: "Prime Cost 101",
    description:
      "The single most important number in your P&L, and a simple weekly cadence to stop it from bleeding.",
    fileName: "PHD-Guide-02-Prime-Cost.pdf",
  },
  {
    number: "03",
    title: "The Catering Lead Gap",
    description:
      "How to calculate how much catering revenue you're leaving on the table — and the recovery system to get it back.",
    fileName: "PHD-Guide-03-Catering-Lead-Gap.pdf",
  },
];

type ModalState = {
  isOpen: boolean;
  guideName: string;
  fileName: string;
};

export default function GuidesPage() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    guideName: "",
    fileName: "",
  });

  const handleDownload = (fileName: string, title: string) => {
    setModal({ isOpen: true, guideName: title, fileName });
  };

  const closeModal = () =>
    setModal((current) => ({ ...current, isOpen: false }));

  return (
    <div className="bg-cream-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 inline-block rounded-full border border-teal-400 px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-teal-700">
          Free Resources
        </div>

        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-5xl">
          Tools Restaurant Operators Actually Use
        </h1>

        <p className="mt-3 max-w-xl text-lg text-ink-500">
          No fluff. No paywalls. Just the frameworks we use with every PHD
          client.
        </p>

        <hr className="mb-12 mt-10 border-t border-ink-200" />

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard
              key={guide.fileName}
              number={guide.number}
              title={guide.title}
              description={guide.description}
              fileName={guide.fileName}
              onDownload={handleDownload}
            />
          ))}
        </div>

        <section className="rounded-2xl bg-ink-900 px-8 py-16 text-center">
          <h2 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
            Ready to stop guessing?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-400">
            Book a free 20-min revenue audit. We&rsquo;ll show you exactly
            where the leaks are.
          </p>
          <a
            href="https://cal.com/jeremy-muhiu-7gtclu/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-900 transition-colors hover:bg-sun-300"
          >
            Book a Free Audit →
          </a>
        </section>
      </div>

      <GuideModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        guideName={modal.guideName}
        fileName={modal.fileName}
      />
    </div>
  );
}

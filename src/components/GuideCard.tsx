"use client";

interface GuideCardProps {
  number: string;
  title: string;
  description: string;
  fileName: string;
  onDownload: (fileName: string, title: string) => void;
}

export default function GuideCard({
  number,
  title,
  description,
  fileName,
  onDownload,
}: GuideCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-ink-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="mb-4 font-display text-4xl font-extrabold text-teal-500 opacity-20">
          {number}
        </div>
        <h3 className="mb-3 font-display text-xl font-extrabold text-ink-900">
          {title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-ink-500">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDownload(fileName, title)}
        className="w-full cursor-pointer rounded-lg bg-teal-600 px-5 py-3 text-center font-display text-sm font-bold text-white transition-colors hover:bg-teal-700"
      >
        Download Free Guide
      </button>
    </div>
  );
}

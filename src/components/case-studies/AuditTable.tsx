import { AUDITS } from "@/lib/case-studies";

// "Fifteen years of the same audit" — the thesis in one table. Four
// secret-shop studies, ending with this one. Large type, soft rows; the
// study's own row is highlighted. Grid on desktop, stacked cards on
// mobile; no table-scroll needed at any width.

export function AuditTable() {
  return (
    <section className="px-[clamp(16px,5vw,40px)]">
      <div className="mx-auto w-full max-w-[880px]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">
          {AUDITS.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-4xl">
          {AUDITS.heading}
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-base leading-relaxed text-ink-700 sm:text-[17px]">
          {AUDITS.intro}
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-900/10">
          {/* Header row, desktop only */}
          <div className="hidden gap-6 border-b border-ink-900/10 bg-cream-100 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500 md:grid md:grid-cols-[1.3fr_0.5fr_1.1fr_1.8fr]">
            <span>Study</span>
            <span>Year</span>
            <span>Who was tested</span>
            <span>What came back</span>
          </div>
          {AUDITS.rows.map((row) => (
            <div
              key={row.study}
              className={`gap-x-6 gap-y-1.5 border-b border-ink-900/10 px-6 py-5 last:border-b-0 sm:px-7 md:grid md:grid-cols-[1.3fr_0.5fr_1.1fr_1.8fr] md:items-baseline ${
                "own" in row && row.own ? "bg-[#1A1F36]" : "bg-white/60"
              }`}
            >
              <p
                className={`font-display text-lg font-extrabold tracking-[-0.01em] ${
                  "own" in row && row.own ? "text-[#4ECDC4]" : "text-ink-900"
                }`}
              >
                {row.study}
              </p>
              <p
                className={`font-mono text-[13px] ${
                  "own" in row && row.own ? "text-white/60" : "text-ink-500"
                }`}
              >
                {row.year}
              </p>
              <p
                className={`font-sans text-[15px] leading-relaxed ${
                  "own" in row && row.own ? "text-white/80" : "text-ink-700"
                }`}
              >
                {row.sample}
              </p>
              <p
                className={`font-sans text-[15px] font-semibold leading-relaxed ${
                  "own" in row && row.own ? "text-white" : "text-ink-800"
                }`}
              >
                {row.result}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink-500">
          {AUDITS.footnote}
        </p>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

// Shared long-form reading layout for policy pages (SMS Privacy / Terms).
// Uses only existing design tokens — Bricolage (font-display) headings,
// Manrope (font-sans) body, JetBrains (font-mono) meta, ink/cream/teal
// colors. Constrained max-width column for comfortable reading.

export function PolicyLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-cream-50">
      <article className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-500">
          Effective date: {effectiveDate}
        </p>
        <hr className="my-8 border-t border-ink-200" />
        {children}
      </article>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-xl font-bold leading-snug text-ink-900 md:text-2xl">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-700 md:text-[17px]">
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-[16px] leading-relaxed text-ink-700 marker:text-teal-600 md:text-[17px]">
      {children}
    </ul>
  );
}

// Bold inline emphasis — used to keep HELP and STOP bold everywhere.
export function Bold({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink-900">{children}</strong>;
}

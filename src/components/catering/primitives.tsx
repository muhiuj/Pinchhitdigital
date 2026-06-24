import type { ReactNode } from "react";

// Presentational shells shared across the /catering sections. No hooks, so
// these stay server components. Section padding / container width / divider
// match the build spec layout primitives (§2).

interface SectionProps {
  id?: string;
  /** Section background tone. */
  tone?: "canvas" | "surface";
  /** Draw the top hairline divider (skip on the first section after the hero). */
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  tone = "canvas",
  divider = true,
  className = "",
  children,
}: SectionProps) {
  const bg = tone === "surface" ? "bg-surface" : "bg-canvas";
  return (
    <section
      id={id}
      className={`${bg} px-[clamp(16px,5vw,40px)] py-[clamp(56px,9vw,104px)] ${
        divider ? "border-t border-white/[0.07]" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

interface EyebrowProps {
  n?: string;
  label: string;
  className?: string;
}

// Mono number (faint) + uppercase teal label, wide tracking (spec §2).
export function Eyebrow({ n, label, className = "" }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] ${className}`}
    >
      {n && <span className="text-ink-500">{n}</span>}
      <span className="text-teal-400">{label}</span>
    </p>
  );
}

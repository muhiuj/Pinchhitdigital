"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ReactNode } from "react";

// Tracked conversion link for the homepage (server component), closing the
// long-standing gap where hero/process/closing CTAs fired no cta_click.
// Internal hrefs render next/link; external open in a new tab.

export function CtaLink({
  href,
  section,
  className,
  children,
}: {
  href: string;
  section: string;
  className?: string;
  children: ReactNode;
}) {
  const capture = () => {
    try {
      posthog.capture("cta_click", { section });
    } catch {
      /* no-op */
    }
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={capture} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={capture}
      className={className}
    >
      {children}
    </a>
  );
}

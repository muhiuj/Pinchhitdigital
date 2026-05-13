"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

// Capture a $pageview event on every client-side navigation. Required because
// the App Router transitions routes without a full page load, and we disabled
// PostHog's built-in capture_pageview so we control timing here.

function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!pathname || !posthog) return;

    let url = window.origin + pathname;
    const search = searchParams?.toString();
    if (search) url += "?" + search;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
}

export function PostHogPageView() {
  // useSearchParams() can suspend during static generation. Wrapping in
  // Suspense keeps the rest of the page eligible for static rendering.
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  );
}

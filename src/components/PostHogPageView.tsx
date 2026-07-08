"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

// Capture a $pageview event on every client-side navigation. Required because
// the App Router transitions routes without a full page load, and we disabled
// PostHog's built-in capture_pageview so we control timing here.
//
// PostHog init is deferred to idle (see PostHogProvider), so the first run of
// this effect usually happens before init. In that case we skip: the
// provider's `loaded` callback captures the initial pageview instead. The
// shared flag below dedupes the two paths whichever fires first.

let initialPageviewCaptured = false;

/** Returns true exactly once — the caller that gets `true` owns the initial
 *  $pageview capture. */
export function markInitialPageviewCaptured(): boolean {
  if (initialPageviewCaptured) return false;
  initialPageviewCaptured = true;
  return true;
}

function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!pathname || !posthog) return;
    // Before init completes, capture() is a silent no-op on the npm client.
    // Skip; the provider's loaded callback handles the initial view.
    if (!posthog.__loaded) return;

    let url = window.origin + pathname;
    const search = searchParams?.toString();
    if (search) url += "?" + search;

    // First loaded run claims the initial pageview if the provider hasn't.
    markInitialPageviewCaptured();
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

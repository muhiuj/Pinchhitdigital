"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { markInitialPageviewCaptured } from "@/components/PostHogPageView";

// PostHog init is deferred to browser idle time. Initializing on mount pulled
// the recorder/surveys bundles (~90KB) into the hydration window, which
// Lighthouse chains into the LCP dependency graph (the measured mobile-LCP
// blocker). Deferring moves that work after first paint; the initial
// $pageview is captured in the `loaded` callback so nothing is lost while
// <PostHogPageView /> waits for init (it skips capture until posthog is
// loaded, then handles client-side navigations).

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          "PostHog: NEXT_PUBLIC_POSTHOG_KEY is not set — analytics disabled.",
        );
      }
      return;
    }

    const init = () => {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest",
        // ui_host is where the PostHog dashboard lives (not the ingestion
        // endpoint). The SDK uses it to build links back to the UI for the
        // in-app toolbar, session replay, etc.
        ui_host: "https://us.posthog.com",
        // We capture pageviews manually via <PostHogPageView /> because
        // Next.js App Router uses client-side navigation; the default
        // capture_pageview only fires on initial hard load.
        capture_pageview: false,
        capture_pageleave: true,
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") ph.debug();
          // The pre-init pageview from <PostHogPageView /> was skipped;
          // capture it now (deduped via the shared flag).
          if (markInitialPageviewCaptured()) {
            ph.capture("$pageview", { $current_url: window.location.href });
          }
        },
      });
    };

    // requestIdleCallback with a timeout floor; setTimeout fallback for
    // browsers without rIC (Safari).
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(init, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(init, 1500);
    }
    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

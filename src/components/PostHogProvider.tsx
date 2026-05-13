"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

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

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest",
      // ui_host is where the PostHog dashboard lives (not the ingestion
      // endpoint). The SDK uses it to build links back to the UI for the
      // in-app toolbar, session replay, etc.
      ui_host: "https://us.posthog.com",
      // We capture pageviews manually via <PostHogPageView /> because Next.js
      // App Router uses client-side navigation; the default capture_pageview
      // only fires on initial hard load.
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug();
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

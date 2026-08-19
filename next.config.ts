import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small, atomic Tailwind) stylesheet into <head> instead of a
    // render-blocking <link>. PSI flagged render-blocking requests as the
    // primary mobile-LCP driver; with ~13KB of CSS and a mostly-first-visit
    // audience, inlining wins over stylesheet caching (per Next docs).
    inlineCss: true,
  },
  // Allow next/image to optimize images served from Sanity's CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Cap the srcset ladder. Next's default ladder tops out at 3840px, which
    // let high-DPR phones pull desktop-cinema hero assets (the measured LCP
    // blocker). Nothing on the site renders wider than 1320px, so 1920 covers
    // every desktop; the small buckets keep mobile payloads near the ~800px
    // target.
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
  },
  // Old blog slug that Search Console still remembers (the post was never
  // published under this URL). Point it at the closest live post so any
  // residual link equity lands somewhere real.
  async redirects() {
    return [
      {
        source: "/blog/why-you-cant-automate-a-broken-process",
        destination: "/blog/restaurant-ai-adoption-wrong-job-2026",
        permanent: true,
      },
      // 2026-08 pivot: F&B pages and public pricing retired. Catering and
      // audit-quiz URLs land on the homepage; guides' closest equivalent is
      // the research index.
      { source: "/plans", destination: "/", permanent: true },
      { source: "/catering", destination: "/", permanent: true },
      { source: "/catering-lead-recovery", destination: "/", permanent: true },
      { source: "/audit", destination: "/", permanent: true },
      { source: "/guides", destination: "/case-studies", permanent: true },
    ];
  },
  // PostHog reverse proxy. Routes analytics traffic through our own domain so
  // ad-blockers (which target *.i.posthog.com explicitly) can't drop events.
  // See https://posthog.com/docs/advanced/proxy/nextjs
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/flags",
        destination: "https://us.i.posthog.com/flags",
      },
    ];
  },
  // PostHog's API doesn't follow Next's trailing-slash redirect; disabling
  // the redirect prevents 308s on /ingest/* paths.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

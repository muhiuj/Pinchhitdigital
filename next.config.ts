import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image to optimize images served from Sanity's CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
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

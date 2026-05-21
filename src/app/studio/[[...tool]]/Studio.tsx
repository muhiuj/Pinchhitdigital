"use client";

/**
 * Client wrapper around <NextStudio>. The studio is React-only and needs
 * browser APIs, so it has to live in a "use client" file. The parent
 * page.tsx stays a server component so we can export metadata/viewport.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}

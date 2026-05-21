/**
 * Sanity client + image URL helper for reading published content from the
 * Next.js app. The studio writes to the same dataset.
 */
import { createClient } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
// Pin to a specific API date so schema changes don't silently break queries.
// Bump this manually after auditing breaking changes in Sanity's changelog.
export const apiVersion = "2025-01-01";

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn(
    "Sanity: NEXT_PUBLIC_SANITY_PROJECT_ID is not set — client will be unusable until you add it to .env.local.",
  );
}

export const client = createClient({
  projectId: projectId ?? "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * CLI config for the Sanity command-line tooling (e.g. `npx sanity deploy`,
 * `npx sanity dataset export`). Separate from sanity.config.ts because the
 * CLI doesn't run inside Next.js and can't read NEXT_PUBLIC_* env vars from
 * .env.local automatically — it needs SANITY_STUDIO_* env vars or these
 * literals.
 */
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});

/**
 * Sanity Studio configuration for the embedded /studio route.
 * This file is consumed both by the studio (when you run sanity dev or
 * deploy from the CLI) and by the Next.js studio route at app/studio.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./studio/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  // Surface a clear error rather than letting Sanity throw a cryptic one.
  // The studio cannot run without a project ID.
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — create a project at sanity.io/manage and paste the ID into .env.local.",
  );
}

export default defineConfig({
  name: "default",
  title: "pinchhitdigital-blog",
  projectId,
  dataset,
  // Tells the studio it's mounted at /studio in the Next app so it strips
  // that prefix when computing tool routes (otherwise "studio" gets parsed
  // as if it were a tool name and you get "Tool not found: studio").
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

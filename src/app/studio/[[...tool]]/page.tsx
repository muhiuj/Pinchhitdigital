/**
 * Mounts Sanity Studio at /studio. The [[...tool]] catch-all lets the
 * studio handle its own internal routing (e.g. /studio/desk/post;abc123).
 */
import Studio from "./Studio";

// Re-export metadata + viewport from next-sanity so the studio renders with
// the correct viewport, referrer policy, and theme color. Both are server-
// safe exports — they keep this page a server component.
export { metadata, viewport } from "next-sanity/studio";

// Studio is static — no per-request work, no dynamic params.
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}

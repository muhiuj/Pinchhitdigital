import { permanentRedirect } from "next/navigation";

// The catering landing page moved to /catering-lead-recovery (keyword-aligned
// slug). 308-redirect the old path so existing links and SEO equity carry over.
export default function CateringRedirect() {
  permanentRedirect("/catering-lead-recovery");
}

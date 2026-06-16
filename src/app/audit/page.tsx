import type { Metadata } from "next";
import AuditQuiz from "@/components/AuditQuiz";

export const metadata: Metadata = {
  title: "Catering Revenue Audit | Pinch Hit Digital — DFW Restaurants",
  description:
    "60% of catering inquiries never get a response within 24 hours. Take the free 60-second audit to get your restaurant's Catering Revenue Score and see what slow follow-up is costing you.",
};

// Standalone dark landing — destination for the printed leave-behind QR code.
// The interactive quiz is a client component; this server wrapper carries the
// metadata and the brand-dark background.
export default function AuditPage() {
  return (
    <div className="bg-ink-900">
      <AuditQuiz />
    </div>
  );
}

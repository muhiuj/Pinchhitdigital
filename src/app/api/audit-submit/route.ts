import { Client } from "@notionhq/client";
import { type NextRequest, NextResponse } from "next/server";

// Audit lead intake. Delivery is layered + best-effort so a missing
// integration never costs a lead at an event:
//   1. Always console.log the full lead (shows in Vercel runtime logs).
//   2. If NOTION_AUDIT_LEADS_DB_ID is set, write a Notion row.
//   3. If RESEND_API_KEY is set, email TO_EMAIL via the Resend REST API.
// Any integration failure is logged but still returns success — the client
// shows the attendee's score regardless.

// Lead-notification recipient. Defaults to the founder's domain inbox;
// override with the RESEND_TO env var (e.g. a Gmail address) without a
// redeploy. NOTE: an @pinchhitdigital.com address only receives once the
// domain has MX / mail hosting (e.g. Google Workspace) configured.
const DEFAULT_TO_EMAIL = "jeremy.muhiu@pinchhitdigital.com";
const FROM_EMAIL = "PHD Audit <audit@pinchhitdigital.com>";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AnswerDetail = { question: string; answer: string; points: number };

type AuditBody = {
  firstName?: unknown;
  restaurantName?: unknown;
  phone?: unknown;
  email?: unknown;
  answers?: unknown;
  score?: unknown;
  tier?: unknown;
};

function isAnswerArray(v: unknown): v is AnswerDetail[] {
  return (
    Array.isArray(v) &&
    v.every(
      (a) =>
        a &&
        typeof a === "object" &&
        typeof (a as AnswerDetail).question === "string" &&
        typeof (a as AnswerDetail).answer === "string" &&
        typeof (a as AnswerDetail).points === "number",
    )
  );
}

export async function POST(req: NextRequest) {
  let body: AuditBody;
  try {
    body = (await req.json()) as AuditBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const restaurantName =
    typeof body.restaurantName === "string" ? body.restaurantName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const tier = typeof body.tier === "string" ? body.tier.trim() : "";
  const score =
    typeof body.score === "number" && Number.isFinite(body.score)
      ? body.score
      : null;
  const answers = isAnswerArray(body.answers) ? body.answers : [];

  if (!firstName || !restaurantName || !phone || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (score === null || !tier) {
    return NextResponse.json({ error: "Missing score" }, { status: 400 });
  }

  const answersText = answers
    .map((a) => `${a.question}: ${a.answer} (${a.points})`)
    .join("\n");

  // 1. Always log — guaranteed capture in Vercel logs.
  console.log("audit-submit lead:", {
    firstName,
    restaurantName,
    phone,
    email,
    score,
    tier,
    answers: answersText,
  });

  // 2. Notion (optional).
  const notionKey = process.env.NOTION_API_KEY;
  const auditDbId = process.env.NOTION_AUDIT_LEADS_DB_ID;
  if (notionKey && auditDbId) {
    try {
      const notion = new Client({ auth: notionKey });
      await notion.pages.create({
        parent: { database_id: auditDbId },
        properties: {
          Name: { title: [{ text: { content: firstName } }] },
          Restaurant: {
            rich_text: [{ text: { content: restaurantName } }],
          },
          Phone: { phone_number: phone },
          Email: { email },
          Score: { number: score },
          Tier: { select: { name: tier } },
          Answers: { rich_text: [{ text: { content: answersText } }] },
          "Submitted At": { date: { start: new Date().toISOString() } },
        },
      });
    } catch (error) {
      console.error("audit-submit: Notion write failed:", error);
    }
  }

  // 3. Resend email (optional) — via REST API so no extra dependency.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const toEmail = process.env.RESEND_TO?.trim() || DEFAULT_TO_EMAIL;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [toEmail],
          reply_to: email,
          subject: `New Catering Audit lead: ${restaurantName} (${score}/12 — ${tier})`,
          text: `New audit lead from the /audit page:\n\nName: ${firstName}\nRestaurant: ${restaurantName}\nPhone: ${phone}\nEmail: ${email}\n\nScore: ${score}/12 — ${tier}\n\nAnswers:\n${answersText}`,
        }),
      });
      if (!res.ok) {
        console.error(
          "audit-submit: Resend responded",
          res.status,
          await res.text(),
        );
      }
    } catch (error) {
      console.error("audit-submit: Resend send failed:", error);
    }
  }

  return NextResponse.json({ success: true });
}

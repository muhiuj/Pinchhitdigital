import { Client } from "@notionhq/client";
import { type NextRequest, NextResponse } from "next/server";
import { NEXT_SESSION } from "@/lib/webinars";

// Build It Live registration intake. The site stays thin: this route
// validates, writes the prospect row to Notion, then forwards the blueprint
// payload to the n8n webhook (WF1), which owns the confirmation email +
// .ics and every reminder.
//
// Delivery contract (never lose a registrant to a red banner):
//   1. Always console.log the full registrant (shows in Vercel runtime logs).
//   2. If NOTION_WEBINAR_SIGNUPS_DB_ID is set, write a "Webinar Signups"
//      row (best-effort; failures logged, never surfaced).
//   3. If N8N_WEBHOOK_URL is set, forward with the x-phd-secret header.
//      On webhook failure, log + best-effort Resend fallback email, and
//      STILL return 200 to the browser. With no webhook configured
//      (pre-launch mock), the log + Notion row ARE the capture.

const DEFAULT_TO_EMAIL = "jeremy.muhiu@pinchhitdigital.com";
const FROM_EMAIL = "PHD Build It Live <audit@pinchhitdigital.com>";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_US_REGEX = /^\+1\d{10}$/;

type RegisterBody = {
  first_name?: unknown;
  email?: unknown;
  phone?: unknown;
  restaurant?: unknown;
  sms_consent?: unknown;
  phone_verified?: unknown;
  website?: unknown; // honeypot
};

type WebhookPayload = {
  first_name: string;
  email: string;
  phone?: string;
  restaurant: string;
  sms_consent: boolean;
  phone_verified: boolean;
  source: "site";
};

// Session key for the Notion Session select, e.g. "2026-08" from
// "2026-08-build-it-live".
const SESSION_KEY = NEXT_SESSION.id.slice(0, 7);

async function writeNotionRow(payload: WebhookPayload) {
  const notionKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_WEBINAR_SIGNUPS_DB_ID;
  if (!notionKey || !dbId) return;
  try {
    const notion = new Client({ auth: notionKey });
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: payload.first_name } }] },
        Email: { email: payload.email },
        ...(payload.phone ? { Phone: { phone_number: payload.phone } } : {}),
        Restaurant: {
          rich_text: payload.restaurant
            ? [{ text: { content: payload.restaurant } }]
            : [],
        },
        "SMS Consent": { checkbox: payload.sms_consent },
        "Phone Verified": { checkbox: payload.phone_verified },
        Status: { select: { name: "Registered" } },
        Session: { select: { name: SESSION_KEY } },
        Source: { select: { name: "Site" } },
        "Registered At": { date: { start: new Date().toISOString() } },
      },
    });
  } catch (error) {
    console.error("webinar-register: Notion write failed:", error);
  }
}

async function notifyFallback(payload: WebhookPayload, reason: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
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
        subject: `Build It Live registrant (webhook failed): ${payload.first_name}`,
        text: `The n8n webhook did not accept this registration. Add them by hand.\n\nReason: ${reason}\n\n${JSON.stringify(payload, null, 2)}`,
      }),
    });
    if (!res.ok) {
      console.error(
        "webinar-register: Resend fallback responded",
        res.status,
        await res.text(),
      );
    }
  } catch (error) {
    console.error("webinar-register: Resend fallback failed:", error);
  }
}

export async function POST(req: NextRequest) {
  let body: RegisterBody;
  try {
    body = (await req.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const firstName =
    typeof body.first_name === "string" ? body.first_name.trim().slice(0, 100) : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const restaurant =
    typeof body.restaurant === "string" ? body.restaurant.trim().slice(0, 200) : "";
  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const smsConsent = body.sms_consent === true;
  const phoneVerified = body.phone_verified === true;

  if (!firstName) {
    return NextResponse.json({ ok: false, error: "missing_first_name" }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (rawPhone && !E164_US_REGEX.test(rawPhone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  // A phone number only rides along when it was consented to AND OTP-verified
  // (the client enforces this flow; the server re-enforces the invariant).
  const includePhone = Boolean(rawPhone) && smsConsent && phoneVerified;

  const payload: WebhookPayload = {
    first_name: firstName,
    email,
    ...(includePhone ? { phone: rawPhone } : {}),
    restaurant,
    sms_consent: includePhone,
    phone_verified: includePhone,
    source: "site",
  };

  // 1. Always log: guaranteed capture in Vercel runtime logs.
  console.log("webinar-register registrant:", payload);

  // 2. Notion "Webinar Signups" row (best-effort, env-guarded).
  await writeNotionRow(payload);

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("webinar-register: N8N_WEBHOOK_URL not set; skipping forward.");
    return NextResponse.json({ ok: true });
  }

  // 3. Forward to n8n WF1. Short timeout so a slow webhook never stalls the
  // visitor; failures fall through to the fallback notification.
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-phd-secret": process.env.N8N_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      throw new Error(`webhook responded ${res.status}`);
    }
  } catch (error) {
    console.error("webinar-register: webhook forward failed:", error);
    await notifyFallback(payload, error instanceof Error ? error.message : "unknown");
  }

  // 4. The browser always hears yes.
  return NextResponse.json({ ok: true });
}

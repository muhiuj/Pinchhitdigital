import { Client } from "@notionhq/client";
import { type NextRequest, NextResponse } from "next/server";
import { resolveDataSourceId } from "@/lib/webinars-live";
import { FEEDBACK_USEFUL_OPTIONS } from "@/lib/webinar-kit";

// Post-session survey intake. The token `r` is the registrant's own
// Webinar Signups page id (sent only in their follow-up email), so answers
// land on the row we already have and no email address ever rides in a
// URL. The route refuses any page that doesn't live in Webinar Signups,
// and it only writes the Feedback columns.

const DEFAULT_TO_EMAIL = "jeremy.muhiu@pinchhitdigital.com";
const FROM_EMAIL = "PHD Build It Live <audit@pinchhitdigital.com>";
const UUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
const MAX_TEXT = 1500;

type FeedbackBody = {
  r?: unknown;
  useful?: unknown;
  drain?: unknown;
  groups?: unknown;
  topic?: unknown;
  wantsHelp?: unknown;
  website?: unknown; // honeypot
};

const normalizeId = (id: string) => id.replace(/-/g, "").toLowerCase();

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, MAX_TEXT);
  return trimmed || undefined;
}

async function notifyHelpRequest(name: string, email: string, answers: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const toEmail = process.env.RESEND_TO?.trim() || DEFAULT_TO_EMAIL;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [toEmail],
        reply_to: email || undefined,
        subject: `Build It Live: ${name} asked for help setting it up`,
        text: `${name} (${email || "no email on file"}) checked "I'd like help setting this up" in the Session 002 survey.\n\n${answers}`,
      }),
    });
  } catch (error) {
    console.error("webinar-feedback: help notification failed:", error);
  }
}

export async function POST(req: NextRequest) {
  let body: FeedbackBody;
  try {
    body = (await req.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const pageId = typeof body.r === "string" ? body.r.trim() : "";
  if (!UUID_REGEX.test(pageId)) {
    return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 400 });
  }

  const usefulKey = typeof body.useful === "string" ? body.useful : undefined;
  const usefulOption = FEEDBACK_USEFUL_OPTIONS.find((o) => o.key === usefulKey);
  const drain = text(body.drain);
  const groups = text(body.groups);
  const topic = text(body.topic);
  const wantsHelp = body.wantsHelp === true;

  const notionKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_WEBINAR_SIGNUPS_DB_ID;
  if (!notionKey || !dbId) {
    console.error("webinar-feedback: Notion env missing", { pageId, usefulKey });
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const notion = new Client({ auth: notionKey });
    const page = (await notion.pages.retrieve({ page_id: pageId })) as {
      parent?: { type?: string; database_id?: string; data_source_id?: string };
      properties?: Record<string, unknown>;
    };
    const dsId = await resolveDataSourceId(notion, dbId);
    const parentId = page.parent?.database_id ?? page.parent?.data_source_id ?? "";
    const allowed = [dbId, dsId ?? ""].filter(Boolean).map(normalizeId);
    if (!allowed.includes(normalizeId(parentId))) {
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 400 });
    }

    const properties: Record<string, unknown> = {
      "Feedback At": { date: { start: new Date().toISOString() } },
    };
    if (usefulOption) {
      properties["Feedback Useful"] = { select: { name: usefulOption.notion } };
    }
    if (drain) properties["Feedback Time Drain"] = { rich_text: [{ text: { content: drain } }] };
    if (groups) properties["Feedback Groups"] = { rich_text: [{ text: { content: groups } }] };
    if (topic) properties["Feedback Next Topic"] = { rich_text: [{ text: { content: topic } }] };
    if (wantsHelp) properties["Feedback Wants Help"] = { checkbox: true };

    await notion.pages.update({
      page_id: pageId,
      properties: properties as Parameters<typeof notion.pages.update>[0]["properties"],
    });

    if (wantsHelp) {
      const props = page.properties as
        | {
            Name?: { title?: Array<{ plain_text?: string }> };
            Email?: { email?: string | null };
          }
        | undefined;
      const name = props?.Name?.title?.[0]?.plain_text ?? "A registrant";
      const email = props?.Email?.email ?? "";
      const answers = [
        `Useful: ${usefulOption?.label ?? "-"}`,
        `Biggest time drain: ${drain ?? "-"}`,
        `Groups they meet with: ${groups ?? "-"}`,
        `Next topic: ${topic ?? "-"}`,
      ].join("\n");
      await notifyHelpRequest(name, email, answers);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("webinar-feedback: Notion write failed:", error);
    return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });
  }
}

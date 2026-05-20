import { Client } from "@notionhq/client";
import { type NextRequest, NextResponse } from "next/server";

// Allow-list of valid guide names. Lets us reject bogus POSTs that would
// otherwise auto-create stray options in the Notion "Guide" select column.
const VALID_GUIDES = new Set([
  "Effective Hourly Revenue",
  "Prime Cost 101",
  "The Catering Lead Gap",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DownloadBody = {
  name?: unknown;
  email?: unknown;
  guideName?: unknown;
  fileName?: unknown;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_GUIDE_LEADS_DB_ID;

  if (!apiKey || !databaseId) {
    console.error(
      "guide-download: missing NOTION_API_KEY or NOTION_GUIDE_LEADS_DB_ID env var",
    );
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  let body: DownloadBody;
  try {
    body = (await req.json()) as DownloadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const guideName =
    typeof body.guideName === "string" ? body.guideName.trim() : "";
  const fileName =
    typeof body.fileName === "string" ? body.fileName.trim() : "";

  if (!name || !email || !guideName || !fileName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!VALID_GUIDES.has(guideName)) {
    return NextResponse.json({ error: "Unknown guide" }, { status: 400 });
  }

  const notion = new Client({ auth: apiKey });

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Guide: { select: { name: guideName } },
        "Downloaded At": { date: { start: new Date().toISOString() } },
      },
    });
  } catch (error) {
    console.error("guide-download: Notion write failed:", error);
    return NextResponse.json(
      { error: "Failed to record submission" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, url: `/guides/${fileName}` });
}

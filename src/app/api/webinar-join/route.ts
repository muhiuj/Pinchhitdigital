import { NextResponse } from "next/server";
import { getLiveSession } from "@/lib/webinars-live";

// Late-registration contingency: returns the session join link ONLY during
// the live window (60 minutes before start through 10 minutes after end).
// Outside the window, or when the BIL Sessions row has no zoom_link, it
// returns null. This keeps the semi-private join URL out of the page's
// static HTML while letting the on-page confirmation card show a "Join now"
// button to anyone who registers after the reminder emails went out.

const WINDOW_BEFORE_MS = 60 * 60_000;
const WINDOW_AFTER_MS = 10 * 60_000;

export async function GET() {
  const live = await getLiveSession();
  const now = Date.now();
  const start = new Date(live.startIso).getTime();
  const end = new Date(live.endIso).getTime();

  const inWindow =
    Boolean(live.zoomLink) &&
    now >= start - WINDOW_BEFORE_MS &&
    now <= end + WINDOW_AFTER_MS;

  return NextResponse.json(
    inWindow
      ? { joinUrl: live.zoomLink, state: now >= start ? "live" : "soon" }
      : { joinUrl: null, state: "closed" },
    { headers: { "Cache-Control": "no-store" } },
  );
}

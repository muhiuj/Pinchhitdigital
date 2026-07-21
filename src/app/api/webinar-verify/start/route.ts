import { type NextRequest, NextResponse } from "next/server";

// Starts a Twilio Verify OTP for the Build It Live phone field. Twilio
// Verify traffic is Twilio-managed and exempt from A2P 10DLC campaign
// approval, so this works before the reminder campaign is approved.
//
// Plain REST (no twilio SDK dependency), same as the Resend pattern.
// Returns { ok: false, error } with a non-200 whenever verification can't
// happen; the client falls back to email-only registration and never blocks
// the registrant.

const E164_US_REGEX = /^\+1\d{10}$/;

// Best-effort abuse guard: each Verify send costs real money. In-memory maps
// are per-serverless-instance, so this is a speed bump rather than a wall,
// but combined with the honeypot it stops naive scripts.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 8;
const MAX_PER_PHONE = 3;
const ipHits = new Map<string, number[]>();
const phoneHits = new Map<string, number[]>();

function overLimit(map: Map<string, number[]>, key: string, max: number) {
  const now = Date.now();
  const hits = (map.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= max) {
    map.set(key, hits);
    return true;
  }
  hits.push(now);
  map.set(key, hits);
  return false;
}

export async function POST(req: NextRequest) {
  let body: { phone?: unknown; website?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!E164_US_REGEX.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!accountSid || !authToken || !serviceSid) {
    // Not wired up yet (env placeholders): tell the client to register
    // email-only instead of stranding the visitor at a dead code step.
    return NextResponse.json(
      { ok: false, error: "verify_unavailable" },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (overLimit(ipHits, ip, MAX_PER_IP) || overLimit(phoneHits, phone, MAX_PER_PHONE)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const res = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: phone, Channel: "sms" }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.error("webinar-verify/start: Twilio responded", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("webinar-verify/start: Twilio request failed:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

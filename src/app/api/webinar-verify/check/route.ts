import { type NextRequest, NextResponse } from "next/server";

// Checks a Twilio Verify OTP code for the Build It Live phone field.
// { ok: true, verified: boolean } on a completed check; { ok: false } when
// the check itself couldn't run (the client then offers the skip path).

const E164_US_REGEX = /^\+1\d{10}$/;
const CODE_REGEX = /^\d{4,10}$/;

export async function POST(req: NextRequest) {
  let body: { phone?: unknown; code?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!E164_US_REGEX.test(phone) || !CODE_REGEX.test(code)) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!accountSid || !authToken || !serviceSid) {
    return NextResponse.json(
      { ok: false, error: "verify_unavailable" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: phone, Code: code }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      // Twilio 404s a check when the verification expired or was never
      // started; treat as an unverified (wrong/stale code) outcome.
      if (res.status === 404) {
        return NextResponse.json({ ok: true, verified: false });
      }
      console.error("webinar-verify/check: Twilio responded", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "check_failed" }, { status: 502 });
    }
    const data = (await res.json()) as { status?: string };
    return NextResponse.json({ ok: true, verified: data.status === "approved" });
  } catch (error) {
    console.error("webinar-verify/check: Twilio request failed:", error);
    return NextResponse.json({ ok: false, error: "check_failed" }, { status: 502 });
  }
}

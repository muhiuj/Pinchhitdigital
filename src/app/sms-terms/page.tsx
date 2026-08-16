import type { Metadata } from "next";
import Link from "next/link";
import { Bold, H2, P, PolicyLayout } from "@/components/policy";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description:
    "Terms and conditions for the Pinch Hit Digital SMS (text message) program.",
  robots: { index: true, follow: true },
};

export default function SmsTermsPage() {
  return (
    <PolicyLayout title="SMS Terms & Conditions" effectiveDate="August 15, 2026">
      <H2>Program Name</H2>
      <P>Pinch Hit Digital SMS Program</P>

      <H2>Program Description</H2>
      <P>
        When you tap a Pinch Hit Digital NFC business card and send us a text
        message, you consent to receive text messages from Pinch Hit Digital in
        response to your inquiry and as follow-up to our conversation. This is a
        conversational messaging program that is initiated by you.
      </P>
      <P>
        <Bold>Missed-call text-back.</Bold> Pinch Hit Digital also operates a
        missed-call text-back service. If you place a voice call to a phone
        line we operate and we are unable to answer, a recorded greeting
        informs you that you will receive a text message, and we then send a
        text to the number you called from so the conversation can continue by
        text. If you do not reply, we may send up to two brief follow-up
        messages about your inquiry before the conversation closes. Any reply
        from you ends the automated sequence and a person takes over. This
        service sends conversational, customer-care messages only. It never
        sends marketing or promotional content, and your number is used only to
        respond to the inquiry you initiated by calling.
      </P>

      <H2>Message Frequency</H2>
      <P>
        Message frequency varies based on your interaction with us. For the
        missed-call text-back service, we send at most three automated messages
        per inquiry, and no messages at all unless you called us first.
      </P>

      <H2>{"Message & Data Rates"}</H2>
      <P>
        {"Message and data rates may apply, according to your mobile carrier's plan."}
      </P>

      <H2>Help</H2>
      <P>
        For help, reply <Bold>HELP</Bold> at any time, or contact us at
        jeremy.muhiu@pinchhitdigital.com.
      </P>

      <H2>Opt-Out / Cancellation</H2>
      <P>
        You can cancel at any time by replying <Bold>STOP</Bold>. After you send{" "}
        <Bold>STOP</Bold>, we will send you a one-time confirmation message, and
        you will no longer receive text messages from us. To rejoin, simply text
        us again from your device.
      </P>

      <H2>Carrier Disclaimer</H2>
      <P>Carriers are not liable for delayed or undelivered messages.</P>

      <H2>Privacy</H2>
      <P>
        Your information is handled in accordance with our{" "}
        <Link
          href="/sms-privacy"
          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600"
        >
          SMS Privacy Policy
        </Link>
        .
      </P>

      <H2>Contact</H2>
      <P>
        Pinch Hit Digital
        <br />
        Email: jeremy.muhiu@pinchhitdigital.com
        <br />
        Website: https://pinchhitdigital.com
      </P>
    </PolicyLayout>
  );
}

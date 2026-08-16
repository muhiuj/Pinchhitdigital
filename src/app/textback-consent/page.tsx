import type { Metadata } from "next";
import Link from "next/link";
import { Bold, H2, P, PolicyLayout, UL } from "@/components/policy";

export const metadata: Metadata = {
  title: "Missed-Call Text-Back Opt-In Process",
  description:
    "Public documentation of how callers consent to Pinch Hit Digital's missed-call text-back messages, including the greeting recording and full call flow.",
  robots: { index: true, follow: true },
};

export default function TextbackConsentPage() {
  return (
    <PolicyLayout
      title="Missed-Call Text-Back: Opt-In Process"
      effectiveDate="August 16, 2026"
    >
      <P>
        This page publicly documents the complete opt-in experience for Pinch
        Hit Digital&apos;s missed-call text-back program: what a caller hears,
        the exact consent language, and what messages are sent. No text message
        is ever sent through this program without the affirmative consent
        described below.
      </P>

      <H2>The Call Flow, Step by Step</H2>
      <UL>
        <li>
          A consumer places a voice call to our published business number,
          (972) 217-4814, from their own phone.
        </li>
        <li>If we are able to answer, a person answers. No automation runs.</li>
        <li>
          If we cannot answer, the caller hears approximately three rings,
          followed by a recorded greeting that discloses the message program
          and asks for consent by keypress.
        </li>
        <li>
          <Bold>Only if the caller presses 1</Bold> does our system send text
          messages. Callers who press nothing, or any other key, hear a polite
          goodbye and receive no messages of any kind.
        </li>
      </UL>

      <H2>The Greeting Callers Hear (Verbatim)</H2>
      <P>
        &ldquo;Thanks for calling Pinch Hit Digital — we&apos;re with a
        customer right now. To continue by text, press 1 and we&apos;ll send up
        to three messages about your call to this number. Message and data
        rates may apply; reply STOP at any time to opt out. Or just call us
        back a little later.&rdquo;
      </P>
      <P>Recording of the greeting:</P>
      <audio
        controls
        preload="none"
        src="/textback-greeting.m4a"
        className="w-full max-w-xl"
      >
        Your browser does not support the audio element. The greeting text is
        quoted verbatim above.
      </audio>

      <H2>What a Caller Receives After Pressing 1</H2>
      <P>
        A maximum of <Bold>three messages per inquiry</Bold>, all conversational
        customer care, never marketing:
      </P>
      <UL>
        <li>
          One text-back responding to their call, sent to the same number they
          called from: &ldquo;Sorry we missed your call at Pinch Hit Digital.
          This is our text line: reply here with what you need and a real
          person will follow up shortly. Reply STOP to opt out, HELP for
          help.&rdquo;
        </li>
        <li>
          If the caller does not reply, up to two brief follow-up messages
          about that same inquiry, after which the sequence ends automatically.
        </li>
        <li>
          Any reply from the caller ends the automated sequence and a person
          takes over the conversation.
        </li>
      </UL>

      <H2>Disclosures</H2>
      <UL>
        <li>
          Message frequency: maximum three automated messages per inquiry, and
          none without the caller pressing 1.
        </li>
        <li>Message and data rates may apply.</li>
        <li>
          Reply <Bold>STOP</Bold> at any time to opt out, or <Bold>HELP</Bold>{" "}
          for help. Opt-outs are honored immediately.
        </li>
        <li>
          Phone numbers are captured only from calls consumers place to us,
          are never obtained from lists or third parties, and are never shared
          with third parties for marketing purposes.
        </li>
      </UL>

      <H2>Program Terms</H2>
      <P>
        Full terms and privacy practices for this program:{" "}
        <Link
          href="/sms-terms"
          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600"
        >
          SMS Terms &amp; Conditions
        </Link>{" "}
        ·{" "}
        <Link
          href="/sms-privacy"
          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600"
        >
          SMS Privacy Policy
        </Link>
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

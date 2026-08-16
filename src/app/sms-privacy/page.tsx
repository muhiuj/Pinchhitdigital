import type { Metadata } from "next";
import { Bold, H2, P, PolicyLayout, UL } from "@/components/policy";

export const metadata: Metadata = {
  title: "SMS Privacy Policy",
  description:
    "How Pinch Hit Digital collects, uses, and protects information from its SMS (text message) program.",
  robots: { index: true, follow: true },
};

export default function SmsPrivacyPage() {
  return (
    <PolicyLayout title="SMS Privacy Policy" effectiveDate="August 15, 2026">
      <P>
        Pinch Hit Digital {'("we," "us," or "our")'} operates SMS (text message)
        programs, including a digital business card program and a missed-call
        text-back service. This Privacy Policy explains what information we
        collect when you contact us by text message or by phone call, how we
        use it, and how we protect it.
      </P>

      <H2>Information We Collect</H2>
      <P>
        When you tap our NFC business card and send us a text message, or when
        you call a phone line we operate and the call goes unanswered, we may
        collect:
      </P>
      <UL>
        <li>
          Your mobile phone number (provided by you in a text message, or
          captured from caller ID when you place a call to us)
        </li>
        <li>
          Your name and the location or event where we met (if you include them
          in your message)
        </li>
        <li>The date and time of your call, if you called us</li>
        <li>The content and timestamp of the messages you send to us</li>
        <li>
          Records of our communications and your status in our customer
          relationship management (CRM) system
        </li>
      </UL>
      <P>
        For the missed-call text-back service, your phone number is captured
        only from the call you place to us. We do not obtain your number from
        any other source, purchase contact lists, or send messages to anyone
        who has not first contacted us.
      </P>

      <H2>How We Use Your Information</H2>
      <P>We use the information you provide solely to:</P>
      <UL>
        <li>Respond to your message and inquiry</li>
        <li>
          Follow up regarding our conversation and any services you expressed
          interest in
        </li>
        <li>Maintain our business relationship and contact records</li>
      </UL>

      <H2>How We Share Your Information</H2>
      <P>
        We do not sell your personal information. We do not share your personal
        information with third parties or affiliates for their own marketing or
        promotional purposes.
      </P>
      <P>
        We use trusted service providers (such as our SMS provider, Twilio, and
        our CRM platform) only to operate and deliver this messaging service on
        our behalf. These providers may use your information only to provide
        services to us and are obligated to keep it confidential and secure.
      </P>

      <H2>Mobile Information (SMS)</H2>
      <P>
        No mobile information will be shared with third parties or affiliates
        for marketing or promotional purposes. Text messaging originator opt-in
        data and consent will not be shared with any third parties.
      </P>

      <H2>{"Message Frequency & Rates"}</H2>
      <P>
        Message frequency varies based on your interaction with us. For the
        missed-call text-back service, we send at most three automated messages
        per inquiry, and only if you request a text by pressing 1 during our
        greeting. Message and data rates may apply according to your mobile{" "}
        {"carrier's"} plan.
      </P>

      <H2>Your Choices</H2>
      <P>
        You can opt out of receiving text messages from us at any time by
        replying <Bold>STOP</Bold>. For help, reply <Bold>HELP</Bold> or email
        jeremy.muhiu@pinchhitdigital.com.
      </P>

      <H2>{"Data Retention & Security"}</H2>
      <P>
        We retain your information for as long as needed to manage our
        relationship and to meet our legal and operational requirements, and we
        take reasonable administrative and technical measures to protect it.
      </P>

      <H2>Contact Us</H2>
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

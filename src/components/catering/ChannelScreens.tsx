"use client";

import {
  Archive,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CornerUpLeft,
  CornerUpRight,
  Globe,
  Heart,
  Image as ImageIcon,
  Lock,
  Mic,
  MoreVertical,
  Phone,
  Play,
  Share2,
  SkipBack,
  Star,
  Trash2,
  UserPlus,
  Users,
  Video,
  Volume2,
} from "lucide-react";
import type { Channel } from "@/lib/catering";

// Each channel renders inside the phone bezel as its own native app screen, so
// every card reads like a real screenshot of where the inquiry actually lands
// (spec §5). Light/native UIs; system + Roboto font stacks instead of brand
// fonts. No em dashes in any label (brand rule).

const IOS_FONT =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
const ROBOTO = 'Roboto,Arial,"Helvetica Neue",sans-serif';

const SCREEN = "flex min-h-[470px] flex-col";

export function PhoneMock({ channel }: { channel: Channel }) {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="rounded-[36px] border border-white/10 bg-[#0f1113] p-2.5 shadow-2xl shadow-black/40">
        <div className="overflow-hidden rounded-[28px]">
          <ChannelScreen channel={channel} />
        </div>
      </div>
    </div>
  );
}

function ChannelScreen({ channel }: { channel: Channel }) {
  switch (channel.id) {
    case "instagram":
      return <InstagramScreen channel={channel} />;
    case "email":
      return <GmailScreen channel={channel} />;
    case "voicemail":
      return <VoicemailScreen channel={channel} />;
    case "webform":
      return <WebsiteScreen channel={channel} />;
    case "google":
      return <GoogleScreen channel={channel} />;
    case "yelp":
      return <YelpScreen channel={channel} />;
    case "opentable":
      return <OpenTableScreen channel={channel} />;
    case "text":
      return <TextScreen channel={channel} />;
  }
}

/* ----------------------------------------------------------- Instagram */
function InstagramScreen({ channel }: { channel: Channel }) {
  const initial = channel.sender.charAt(0).toUpperCase();
  const ring =
    "linear-gradient(to top right,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)";
  return (
    <div className={`${SCREEN} bg-white text-black`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-3 py-2.5">
        <ChevronLeft className="h-6 w-6 shrink-0" strokeWidth={2.4} />
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white"
          style={{ background: ring }}
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[14px] font-semibold">{channel.sender}</p>
          <p className="truncate text-[11px] text-neutral-500">Active now</p>
        </div>
        <Phone className="h-[22px] w-[22px] shrink-0" strokeWidth={1.9} />
        <Video className="h-[22px] w-[22px] shrink-0" strokeWidth={1.9} />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 px-3 py-4">
        <p className="mb-1 text-center text-[11px] text-neutral-400">{channel.meta}</p>
        <div className="flex items-end gap-1.5">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white"
            style={{ background: ring }}
          >
            {initial}
          </span>
          <p className="max-w-[78%] rounded-[20px] bg-[#efefef] px-3.5 py-2 text-[14px] leading-snug">
            {channel.inbound}
          </p>
        </div>
        <div className="flex justify-end">
          <p
            className="max-w-[78%] rounded-[20px] px-3.5 py-2 text-[14px] leading-snug text-white"
            style={{ background: "linear-gradient(95deg,#5b51d8,#a82ec0,#e0356f)" }}
          >
            {channel.reply}
          </p>
        </div>
        <p className="pr-1 text-right text-[11px] font-medium text-[#0095f6]">
          {channel.responseTime}
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 pb-3 pt-1">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0095f6]">
          <Camera className="h-5 w-5 text-white" strokeWidth={2} />
        </span>
        <div className="flex flex-1 items-center justify-between rounded-full border border-black/15 py-2 pl-4 pr-3">
          <span className="text-[14px] text-neutral-400">Message...</span>
          <div className="flex items-center gap-3">
            <Mic className="h-[18px] w-[18px]" strokeWidth={2} />
            <ImageIcon className="h-[18px] w-[18px]" strokeWidth={2} />
            <Heart className="h-[18px] w-[18px]" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Gmail */
function GmailScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-[#202124]`} style={{ fontFamily: ROBOTO }}>
      <div className="flex items-center gap-5 px-4 py-3 text-[#5f6368]">
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        <div className="flex flex-1 items-center justify-end gap-5">
          <Archive className="h-5 w-5" strokeWidth={2} />
          <Trash2 className="h-5 w-5" strokeWidth={2} />
          <MoreVertical className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      <div className="flex-1 px-4">
        <h3 className="text-[20px] font-normal leading-snug text-[#202124]">
          {channel.subject}
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1a73e8] text-[16px] font-medium text-white">
            {channel.sender.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[14px] font-semibold text-[#202124]">
                {channel.sender}
              </p>
              <span className="shrink-0 text-[12px] text-[#5f6368]">
                {channel.meta}
              </span>
            </div>
            <p className="flex items-center gap-1 text-[12px] text-[#5f6368]">
              to me <ChevronRight className="h-3 w-3 rotate-90" />
            </p>
          </div>
          <Star className="h-5 w-5 shrink-0 text-[#5f6368]" strokeWidth={1.8} />
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-[#202124]">
          {channel.inbound}
        </p>

        <div className="mt-5 rounded-lg border border-[#dadce0] bg-[#f8fbff] p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#1a73e8]">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Auto-replied in {channel.responseTime.replace("Auto-replied in ", "")}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#202124]">
            {channel.reply}
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3">
        {[
          { label: "Reply", Icon: CornerUpLeft },
          { label: "Reply all", Icon: Users },
          { label: "Forward", Icon: CornerUpRight },
        ].map(({ label, Icon }) => (
          <span
            key={label}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#dadce0] py-2 text-[13px] font-medium text-[#3c4043]"
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Voicemail */
function VoicemailScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-black`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex items-center justify-between px-4 pt-4">
        <ChevronLeft className="h-6 w-6 text-[#007aff]" strokeWidth={2.2} />
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#34c759]">
          <Phone className="h-4 w-4 fill-white text-white" />
        </span>
      </div>

      <div className="flex flex-col items-center px-4 pt-2">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#c7c7cc] text-white">
          <Phone className="h-7 w-7 fill-white text-white" />
        </span>
        <p className="mt-2 flex items-center text-[17px] font-semibold">
          {channel.sender}
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </p>
        <p className="text-[12px] text-neutral-500">Unknown · {channel.meta}</p>
      </div>

      {/* scrubber */}
      <div className="px-6 pt-4">
        <div className="relative h-[3px] rounded-full bg-neutral-300">
          <div className="absolute left-0 top-0 h-[3px] w-[10%] rounded-full bg-neutral-500" />
          <div className="absolute left-[10%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-600" />
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-neutral-500">
          <span>00:00</span>
          <span>-{channel.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-7 pt-3 text-black">
        <Share2 className="h-5 w-5" strokeWidth={1.8} />
        <SkipBack className="h-6 w-6 fill-black" />
        <Play className="h-8 w-8 fill-black" />
        <Volume2 className="h-6 w-6" strokeWidth={1.8} />
        <Trash2 className="h-5 w-5" strokeWidth={1.8} />
      </div>

      <div className="flex gap-3 px-5 pt-4">
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f1f1f4] py-2 text-[13px] font-medium text-[#007aff]">
          <UserPlus className="h-4 w-4" strokeWidth={2} /> Add Contact
        </span>
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f1f1f4] py-2 text-[13px] font-medium text-[#ff3b30]">
          Report Spam
        </span>
      </div>

      <div className="flex-1 px-5 pt-4">
        <p className="text-[13px] font-medium text-neutral-500">Transcript</p>
        <p className="mt-1 text-[14px] leading-relaxed text-black">
          {channel.transcription}
        </p>
        <div className="mt-3 border-t border-black/5 pt-3">
          <p className="text-[12px] font-medium text-[#34c759]">
            Texted back in {channel.responseTime.replace("Auto-replied in ", "")}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">
            {channel.reply}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Website */
function WebsiteScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-[#f6f7f9] text-[#1a1d21]`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex items-center gap-2 bg-white px-4 py-2.5 text-[#5f6368] shadow-sm">
        <Lock className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span className="truncate text-[12px]">yourrestaurant.com/catering</span>
      </div>

      <div className="flex-1 px-4 py-5">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#2f7e7c]">
            <Globe className="h-4 w-4" strokeWidth={2} />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              New catering inquiry
            </span>
          </div>

          <dl className="mt-4 space-y-3 text-[14px]">
            <div>
              <dt className="text-[12px] text-neutral-500">Name</dt>
              <dd className="font-medium">{channel.sender}</dd>
            </div>
            {channel.formFields?.map((f) => (
              <div key={f}>
                <dd className="font-medium">{f}</dd>
              </div>
            ))}
            <div>
              <dt className="text-[12px] text-neutral-500">Message</dt>
              <dd className="leading-relaxed">{channel.inbound}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-xl border border-[#7ac7c4]/40 bg-[#7ac7c4]/[0.08] p-3">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2f7e7c]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              {channel.responseTime}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#1a1d21]">
              {channel.reply}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- Google Business Profile */
function GoogleScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-[#202124]`} style={{ fontFamily: ROBOTO }}>
      <div className="flex items-center gap-3 border-b border-[#e8eaed] px-4 py-3">
        <ChevronLeft className="h-5 w-5 text-[#5f6368]" strokeWidth={2} />
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f0fe] text-[15px] font-medium text-[#1a73e8]">
          {channel.sender.replace(/[^0-9]/g, "").slice(-2) || "G"}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[14px] font-medium">{channel.sender}</p>
          <p className="text-[11px] text-[#5f6368]">
            <span className="font-medium text-[#4285f4]">G</span>
            <span className="font-medium text-[#ea4335]">o</span>
            <span className="font-medium text-[#fbbc05]">o</span>
            <span className="font-medium text-[#4285f4]">g</span>
            <span className="font-medium text-[#34a853]">l</span>
            <span className="font-medium text-[#ea4335]">e</span>
            <span> Business messages</span>
          </p>
        </div>
        <MoreVertical className="h-5 w-5 text-[#5f6368]" strokeWidth={2} />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 px-4 py-4">
        <p className="mb-1 text-center text-[11px] text-[#80868b]">{channel.meta}</p>
        <div className="flex justify-start">
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-[#f1f3f4] px-3.5 py-2 text-[14px] leading-snug">
            {channel.inbound}
          </p>
        </div>
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[#1a73e8] px-3.5 py-2 text-[14px] leading-snug text-white">
            {channel.reply}
          </p>
        </div>
        <p className="flex items-center justify-end gap-1 pr-1 text-[11px] text-[#1a73e8]">
          <Check className="h-3 w-3" strokeWidth={3} />
          {channel.responseTime}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Yelp */
function YelpScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-[#2b2b2b]`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex items-center justify-between bg-[#d32323] px-4 py-3 text-white">
        <span className="text-[18px] font-bold tracking-tight">Yelp</span>
        <span className="text-[12px] font-medium opacity-90">Request a Quote</span>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d32323] text-[16px] font-bold text-white">
            {channel.sender.charAt(0).toUpperCase()}
          </span>
          <div className="leading-tight">
            <p className="text-[14px] font-semibold">{channel.sender}</p>
            <p className="text-[12px] text-neutral-500">{channel.meta}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#f5f5f5] p-3">
          <p className="text-[14px] leading-relaxed">{channel.inbound}</p>
        </div>

        <div className="mt-3 flex justify-end">
          <p className="max-w-[88%] rounded-xl bg-[#fff4e5] px-3.5 py-2.5 text-[14px] leading-relaxed">
            {channel.reply}
          </p>
        </div>
        <p className="mt-2 text-right text-[12px] font-medium text-[#d32323]">
          {channel.responseTime}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- OpenTable */
function OpenTableScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-[#2a2a2a]`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex flex-col items-center bg-[#da3743] px-4 py-3 text-white">
        <span className="text-[15px] font-semibold tracking-tight">OpenTable</span>
        <span className="text-[11px] opacity-90">Large party request</span>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-black/[0.08] p-3">
            <Users className="h-4 w-4 text-[#da3743]" strokeWidth={2} />
            <p className="mt-1.5 text-[13px] font-semibold">{channel.sender}</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] p-3">
            <Calendar className="h-4 w-4 text-[#da3743]" strokeWidth={2} />
            <p className="mt-1.5 text-[13px] font-semibold">{channel.meta}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#f6f6f6] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} /> Guest note
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed">{channel.inbound}</p>
        </div>

        <div className="mt-3 flex justify-end">
          <p className="max-w-[88%] rounded-xl bg-[#da3743]/[0.08] px-3.5 py-2.5 text-[14px] leading-relaxed">
            {channel.reply}
          </p>
        </div>
        <p className="mt-2 text-right text-[12px] font-medium text-[#da3743]">
          {channel.responseTime}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Text */
function TextScreen({ channel }: { channel: Channel }) {
  return (
    <div className={`${SCREEN} bg-white text-black`} style={{ fontFamily: IOS_FONT }}>
      <div className="flex flex-col items-center border-b border-black/[0.06] px-4 pb-2 pt-3">
        <div className="flex w-full items-center">
          <ChevronLeft className="h-6 w-6 text-[#007aff]" strokeWidth={2.2} />
          <div className="flex-1" />
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#c7c7cc] text-[16px] font-medium text-white">
          {channel.sender.replace(/[^0-9]/g, "").slice(-2)}
        </span>
        <p className="mt-1 flex items-center text-[12px] font-medium">
          {channel.sender} <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 px-3 py-4">
        <p className="mb-1 text-center text-[11px] text-neutral-400">
          Text Message · {channel.meta}
        </p>
        <div className="flex justify-start">
          <p className="max-w-[78%] rounded-[20px] bg-[#e9e9eb] px-3.5 py-2 text-[15px] leading-snug text-black">
            {channel.inbound}
          </p>
        </div>
        <div className="flex justify-end">
          <p className="max-w-[78%] rounded-[20px] bg-[#34c759] px-3.5 py-2 text-[15px] leading-snug text-white">
            {channel.reply}
          </p>
        </div>
        <p className="pr-1 text-right text-[11px] font-medium text-[#34c759]">
          {channel.responseTime}
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 pb-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 text-neutral-500">
          <Camera className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="flex flex-1 items-center justify-between rounded-full border border-black/15 py-1.5 pl-4 pr-2">
          <span className="text-[14px] text-neutral-400">Text Message</span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#34c759]">
            <ChevronRight className="h-4 w-4 -rotate-90 text-white" strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  );
}

import { Client } from "@notionhq/client";
import { NEXT_SESSION } from "./webinars";

// Live session facts from the Notion "BIL Sessions" DB (the single source of
// truth the n8n workflows also read). The page consumes this with ISR
// (revalidate 300) so a Notion row edit updates the site within ~5 minutes,
// no redeploy. Everything degrades to the baked-in NEXT_SESSION values from
// webinars.ts when Notion is unreachable or the env vars are unset, so the
// page can never break on a Notion outage.
//
// Server-only: imported by the page (server component) and the register
// route. Never import from client components.

export interface LiveSession {
  sessionKey: string; // "2026-08" — must match the Session select in Webinar Signups
  title: string;
  topicBuild: string;
  startIso: string;
  endIso: string;
  dateLong: string; // "Tuesday, August 18"
  dateShort: string; // "August 18"
  timeLabel: string; // "2:00 PM Central"
  eventLine: string;
  gcalUrl: string;
  isFallback: boolean;
}

const CHICAGO = "America/Chicago";
const SESSION_MINUTES = 50;

function fmt(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: CHICAGO }).format(date);
}

function gcalStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildSession(
  sessionKey: string,
  title: string,
  topicBuild: string,
  startIso: string,
  isFallback: boolean,
): LiveSession {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + SESSION_MINUTES * 60_000);
  const dateLong = `${fmt(start, { weekday: "long" })}, ${fmt(start, { month: "long", day: "numeric" })}`;
  const dateShort = fmt(start, { month: "long", day: "numeric" });
  const timeLabel = `${fmt(start, { hour: "numeric", minute: "2-digit", hour12: true })} Central`;
  const gcalText = encodeURIComponent(`Build It Live: ${title}`);
  const gcalDetails = encodeURIComponent(
    `Watch ${topicBuild} get built from scratch in 30 minutes, in plain English. Your join link arrives by email before the session.\n\nhttps://www.pinchhitdigital.com/build-it-live`,
  );
  return {
    sessionKey,
    title,
    topicBuild,
    startIso,
    endIso: end.toISOString(),
    dateLong,
    dateShort,
    timeLabel,
    eventLine: `${dateLong} · ${timeLabel} · 50 minutes · online & recorded`,
    gcalUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalText}&dates=${gcalStamp(start)}/${gcalStamp(end)}&details=${gcalDetails}`,
    isFallback,
  };
}

const FALLBACK: LiveSession = buildSession(
  NEXT_SESSION.id.slice(0, 7),
  NEXT_SESSION.title,
  NEXT_SESSION.topicBuild,
  NEXT_SESSION.startIso,
  true,
);

// Loose shapes for the Notion property values we read.
type NotionProp = {
  type?: string;
  title?: Array<{ plain_text?: string }>;
  rich_text?: Array<{ plain_text?: string }>;
  date?: { start?: string | null } | null;
  select?: { name?: string } | null;
};

function plainText(prop: NotionProp | undefined): string {
  const parts = prop?.title ?? prop?.rich_text ?? [];
  return parts.map((p) => p.plain_text ?? "").join("").trim();
}

// SDK v5 queries data sources, not databases; resolve and cache the data
// source id behind a database id once per server instance.
const dsIdCache = new Map<string, string>();

export async function resolveDataSourceId(
  notion: Client,
  databaseId: string,
): Promise<string | null> {
  const cached = dsIdCache.get(databaseId);
  if (cached) return cached;
  const db = (await notion.databases.retrieve({ database_id: databaseId })) as {
    data_sources?: Array<{ id: string }>;
  };
  const dsId = db.data_sources?.[0]?.id ?? null;
  if (dsId) dsIdCache.set(databaseId, dsId);
  return dsId;
}

let sessionCache: { at: number; value: LiveSession } | null = null;
const CACHE_MS = 5 * 60_000;

export async function getLiveSession(): Promise<LiveSession> {
  if (sessionCache && Date.now() - sessionCache.at < CACHE_MS) {
    return sessionCache.value;
  }
  const notionKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_BIL_SESSIONS_DB_ID;
  if (!notionKey || !dbId) return FALLBACK;

  try {
    const notion = new Client({ auth: notionKey });
    const dsId = await resolveDataSourceId(notion, dbId);
    if (!dsId) return FALLBACK;
    const res = (await notion.dataSources.query({
      data_source_id: dsId,
      filter: { property: "status", select: { equals: "upcoming" } },
      page_size: 1,
    })) as { results: Array<{ properties?: Record<string, NotionProp> }> };

    const props = res.results[0]?.properties;
    if (!props) return FALLBACK;
    const sessionKey = plainText(props.session_key);
    const startIso = props.event_datetime?.date?.start ?? "";
    const title = plainText(props.topic_title);
    const topicBuild = plainText(props.topic_build);
    if (!sessionKey || !startIso || !title || !topicBuild) return FALLBACK;

    const live = buildSession(sessionKey, title, topicBuild, startIso, false);
    sessionCache = { at: Date.now(), value: live };
    return live;
  } catch (error) {
    console.error("webinars-live: falling back to static session:", error);
    return FALLBACK;
  }
}

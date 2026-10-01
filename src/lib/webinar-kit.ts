// Build It Live 002 take-home kit: copy for /build-it-live/kit and the
// feedback survey. The month-plan prompt and the daily rituals are verbatim
// from Jeremy's Miro board (read 2026-10-01); keep them in sync if the board
// changes. Claude setup steps were checked against support.claude.com on
// 2026-10-01: connectors live under Customize > Connectors on every plan,
// Cowork and scheduled tasks need a paid plan. Claude's UI moves often, so
// re-check these steps before reusing the page for a later session.
// Brand rules: zero em dashes, first person, plain language.

export const KIT_UPDATED = "October 1, 2026";

export const KIT_LINKS = {
  miroBoard: "https://miro.com/app/board/uXjVHhWtYTo=/?share_link_id=739495998921",
  // Zoom cloud share link for the Session 002 recording. The pwd param is
  // the recording_play_passcode from the Zoom API; without it viewers hit a
  // passcode wall. Swap for an unlisted YouTube link if the recording moves.
  replay:
    "https://us06web.zoom.us/rec/share/dFCWJ_K5ZuoZzi84mqcYTgR4kzhvXQJv4L4x8ZMek-btTz1TvGGN9v-4fy5Gme2e.nZWfLnPOVbIrKOQa?pwd=DM8sao7iUse6gwuYrgAAIAAAAHzIQ7O8YAAvjKecS6x5CHLjZ3MsoeSuWMocEXBMA548f9ju9M8O8ibrXnawFEpItTAwMDAwNA",
  download: "https://claude.com/download",
  connectors: "https://claude.ai/customize/connectors",
  booking: "https://cal.com/jeremy-muhiu-7gtclu/30min",
} as const;

export const KIT_HERO = {
  eyebrow: "Build It Live · Session 002 kit",
  intro:
    "Everything from Tuesday's session in one place: the planning board, the Claude setup, and the prompts I run every day. Work top to bottom. The whole setup takes about 45 minutes, and step 1 works on paper if you'd rather skip the software.",
} as const;

export interface KitStep {
  id: string;
  minutes: string;
  title: string;
  why: string;
  /** Click path shown as chips, e.g. ["Customize", "Connectors", "+"]. */
  path?: string[];
  substeps: string[];
  note?: string;
}

export const KIT_STEPS: KitStep[] = [
  {
    id: "board",
    minutes: "15 min",
    title: "Copy the planning board",
    why: "Goals come first. Claude can only protect a plan you wrote.",
    substeps: [
      "Open the board with the button above. Miro's free plan includes three editable boards, so you can keep your own copy at no cost.",
      "Sign in to Miro, then choose Duplicate from the board menu to save your own copy.",
      "Sort: put every goal for the month in High, Medium, or Low.",
      "Slot: place them on the 4-week grid. High shows up 2 blocks a week, Medium 1 to 2 blocks a week, Low 2 blocks a month.",
      "Your month holds 40 focus blocks: two a day, five days a week, four weeks. When it fills up, cut a goal. Don't squeeze. Empty blocks are slack, not failure.",
    ],
    note: "Prefer paper? Draw the same grid on one page. Claude reads a photo of it just as well.",
  },
  {
    id: "install",
    minutes: "5 min",
    title: "Install Claude Desktop",
    why: "The desktop app is where your calendar, email, and CRM come together.",
    substeps: [
      "Go to claude.com/download and choose Mac or Windows.",
      "Open the installer, drag Claude into Applications (Mac) or run the setup (Windows).",
      "Open Claude and sign in, or create a free account.",
    ],
    note: "The free plan covers steps 3 through 5. Step 6, where Claude runs your brief automatically every morning, needs the Pro plan. You can still run step 6 by hand on the free plan.",
  },
  {
    id: "calendar",
    minutes: "5 min",
    title: "Connect your calendar and email",
    why: "Claude can only schedule around meetings it can see.",
    path: ["Customize", "Connectors", "+"],
    substeps: [
      "In Claude, open Customize, then Connectors, then click the + button next to Connectors.",
      "Search for Google Calendar, click it, then click Connect.",
      "Sign in with your Google account and approve access.",
      "Repeat for Gmail. On Outlook or another provider? Search the directory for it the same way.",
    ],
    note: "By default, Claude asks for your approval before it sends an email or changes your calendar. You stay in charge of every action.",
  },
  {
    id: "crm",
    minutes: "5 min, optional",
    title: "Connect your CRM",
    why: "This is how Claude knows which client is waiting on you before it plans your week.",
    path: ["Customize", "Connectors", "+"],
    substeps: [
      "Same path as step 3. Search for your CRM: I use Attio, and HubSpot and Salesforce are in the directory too.",
      "Click Connect and sign in to your CRM.",
      "Using Miro? Connect it here too, then paste your board link into a chat and Claude reads the board directly. No photo needed.",
    ],
    note: "No CRM, or yours isn't listed? Skip this step. A calendar and email are enough to start.",
  },
  {
    id: "handoff",
    minutes: "10 min",
    title: "Hand your month to Claude",
    why: "Claude turns your grid into real calendar blocks, but it reads your plan back to you first.",
    substeps: [
      "Take a photo of your grid, or copy your Miro board link if you connected Miro.",
      "Start a new chat in Claude, attach the photo (or paste the link), and paste the prompt below.",
      "Fill in your working hours where it says [your hours].",
      "Check Claude's read-back before you let it build anything. Fix any misread boxes first.",
    ],
    note: "Check it before you trust it. Claude reads your grid back first so you can catch mistakes before they land on your calendar.",
  },
  {
    id: "daily",
    minutes: "5 min, twice a day",
    title: "Run it every day",
    why: "Two 5-minute habits keep the plan alive: a morning plan and a shutdown ritual, adapted from Cal Newport's Deep Work.",
    path: ["Scheduled", "New task", "Create with Claude"],
    substeps: [
      "On the Pro plan, open Claude Cowork, click Scheduled in the left sidebar, then New task, then Create with Claude.",
      "Paste the morning brief prompt below and ask for it to run every weekday at 7:30 AM. Review the schedule Claude proposes, then click Schedule.",
      "Do the same with the shutdown prompt for the end of your workday.",
      "Don't see a Cowork option? You may have the newer version of Claude. Just describe the task and when it should run in any chat, and Claude offers to schedule it.",
      "On the free plan, save both prompts and paste them yourself each morning and evening. Same habit, one extra step.",
    ],
  },
];

export const MONTH_PLAN_PROMPT = `This photo is my month plan. The key lists my goals as H (high),
M (medium), and L (low) priority. Each box in the grid is one
focus block on that day.

1. Read the grid and list what you see, week by week, so I can
   check you read it right. Flag anything you can't read.
2. Once I confirm, turn Week 1 into calendar blocks. I work
   [your hours]. Put high-priority blocks in my best focus hours.
   Schedule around what's already on my calendar. Don't move or
   delete anything. Give each block a specific title with a
   finish line, like "Write 3 subject lines," not "Work on
   marketing." If all you have is my goal code, ask me what done
   looks like for that block before you create it. Don't invent it.
3. Add a 10-minute shutdown at the end of each day.

Ask me before you fill any gaps with your own ideas.`;

export const MORNING_PROMPT = `Run my morning plan.

1. Show today's two focus blocks from my calendar and the goal
   each one belongs to.
2. For each block, ask me to name the finish line if the title
   doesn't already say what done looks like.
3. List anything due today or overdue from my email and CRM.
4. Suggest one window today to batch email and calls together.
5. If anything on today's calendar maps to none of my goals,
   flag it once. Don't move it without asking me.

Keep it short enough to read in two minutes.`;

export const SHUTDOWN_PROMPT = `Run my shutdown ritual.

1. Ask me what I finished today and what I didn't.
2. Give every unfinished task a plan: either a real open slot on
   my calendar this week, or a spot on my list. Ask before you
   book anything. Nothing quietly falls off.
3. Ask me for today's numbers and log them.
4. Write tomorrow's first move in one sentence.
5. Show me the rest of the week at a glance.

When we're done, say "Shutdown complete." Then I stop working.`;

export const COWORK_IDEAS = [
  {
    title: "Turn your inbox into a task list",
    body: "Ask Claude to read the last week of email, pull out every request someone is waiting on, and put each one on your calendar or your list.",
  },
  {
    title: "Prep for every client call",
    body: "Before a meeting, have Claude pull the client's history from your CRM and recent emails into a one-page brief.",
  },
  {
    title: "Clean up a messy folder",
    body: "Point Claude at your Downloads or Documents folder on the desktop app and ask it to sort, rename, and file everything. It asks before deleting anything.",
  },
  {
    title: "Run a Friday review",
    body: "Schedule a weekly task that compares what you planned against what actually happened, so the next week's plan starts from the truth.",
  },
] as const;

/* ------------------------------------------------------------ FEEDBACK */
// Option values are the Notion select names on the Webinar Signups DB.
// Notion rejects commas in select options.
export const FEEDBACK_USEFUL_OPTIONS = [
  { key: "using", label: "I'm already using it", notion: "Already using it" },
  { key: "useful", label: "Useful, haven't started yet", notion: "Useful - not started" },
  { key: "notyet", label: "Not for me yet", notion: "Not for me yet" },
] as const;

export type FeedbackUsefulKey = (typeof FEEDBACK_USEFUL_OPTIONS)[number]["key"];

export const FEEDBACK_COPY = {
  heading: "Help me plan the next one",
  intro:
    "Four quick questions. Every answer shapes what the next Build It Live covers.",
  usefulQuestion: "Will you use the method from the session?",
  drainQuestion: "What eats the most time in your week right now?",
  groupsQuestion:
    "Do you meet regularly with a group of business owners, like an association, chamber, or networking group? Which one?",
  groupsHint:
    "I'd like to bring a session to groups that already meet. Optional.",
  topicQuestion: "What should the next session teach?",
  helpLabel: "I'd like help setting this up for my business",
  submit: "Send my answers",
  thanksHeading: "Thank you. That helps a lot.",
  thanksBody:
    "I read every answer. If you asked for help, I'll reach out by email this week.",
  recordedNote: "Got it. Your first answer is saved.",
  invalidLink:
    "This feedback link didn't come through complete. Reply to my email with your thoughts instead, or write to jeremy.muhiu@pinchhitdigital.com.",
  error:
    "Something went wrong saving your answers. Try again, or reply to my email instead.",
} as const;

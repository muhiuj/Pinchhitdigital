# Production Build Spec — Catering Lead Recovery Landing Page

**For:** Claude Code · **Client:** Pinch Hit Digital (Jeremy Muhiu)
**Source of truth for content/visuals:** `Catering_Lead_Recovery.html` (Claude Design export)
**Target:** Next.js (App Router) + TypeScript + Tailwind + Framer Motion, deployed on Vercel

---

## 0. READ THIS FIRST — how to use the HTML file

`Catering_Lead_Recovery.html` is a **Claude Design export**, not source code. It is a self-extracting bundle: base64-encoded assets + a `dc-runtime` loader + inline-styled markup inside an `<x-dc>` element, with the component logic in a `data-dc-script` block.

**Do not edit the bundle. Do not try to "convert" it.** Treat it strictly as the **visual + content + behavior spec**. Build the page fresh as real, componentized Next.js + Tailwind + Framer Motion. This document gives you the locked copy and tokens so you don't have to parse the bundle yourself.

**Definition of done:** a production route (suggested `app/catering/page.tsx`) that visually matches the export, implements the chaos→order animation properly (§4 — this is the part the export does *not* do well), passes Lighthouse mobile ≥ 90 on Performance/Accessibility/SEO, and wires every CTA to the live booking link.

---

## 1. Stack & dependencies

- **Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion** (`motion`).
- **Fonts via `next/font/google`** (the export embeds them as base64 woff2 — do NOT carry that over):
  - `Bricolage Grotesque` — display / headings (weights 700, 800)
  - `Manrope` — body (weights 500, 600, 700)
  - `JetBrains Mono` — eyebrows, labels, monospace accents (weight 400/500)
  - `Instrument Serif` — optional, appears once; safe to drop.
- **Magic UI Animated Beam** for the hero + unification beams: `https://magicui.design/docs/components/animated-beam` (copy the component into `components/ui/animated-beam.tsx`). MIT-licensed, Tailwind + Framer Motion.
- Suggested: `lucide-react` for icons; `@vercel/analytics` or Plausible for conversion tracking.

---

## 2. Design tokens (exact — pulled from the export)

Add to `tailwind.config.ts` theme. Roles matter — keep color = meaning (teal = system/order, coral = missed/unread, yellow = action/confirmation).

```js
colors: {
  ink:        '#0a0e12', // base canvas (darkest)
  surface:    '#0c1116', // alternating section bg
  surface2:   '#0e1318', // hub / inset
  card:       '#13171c', // cards
  teal:       '#7ac7c4', // PRIMARY accent — system / order / "caught"
  tealDeep:   '#2f7e7c', // teal gradient stop / borders
  yellow:     '#f4b942', // CTA + "Replied" confirmation
  coral:      '#e3654f', // "missed / unread" chaos state ONLY
  cream:      '#fbf7f0', // primary text on dark
  cream2:     '#f3efe6', // secondary cream
  body:       '#b6bcc2', // body text muted
  bodyDim:    '#8a9099', // dimmer body
  faint:      '#6b7681', // labels / mono eyebrows
  onYellow:   '#11161c', // text on yellow sections
  iosBlue:    '#007aff', // iMessage/SMS mock bubbles (keep — it's what makes the phone UI authentic)
  iosGray:    '#c7c7cc',
}
```

Layout primitives used throughout:
- Section padding: `clamp(56px,9vw,104px) clamp(16px,5vw,40px)`; section divider `border-top:1px solid rgba(255,255,255,.07)`.
- Container: `max-width:1120px; margin:0 auto`.
- Cards: `bg-card`, `border:1px solid rgba(255,255,255,.06)`, `border-radius:14px`, padding `28px 24px`.
- Eyebrow pattern: mono number `#6b7681` + uppercase label `#7ac7c4`, `letter-spacing:.16em`.
- Display numbers (stats): `clamp(76px,16vw,128px)`, Bricolage 800 — **render these as the hero design objects**, one per screen on mobile.

---

## 3. Page structure → components

Build each as its own component. Alternate section backgrounds (`ink` / `surface`).

| # | Section | Component | Animation |
|---|---|---|---|
| — | Sticky header (logo, "DFW", CTA) | `<SiteHeader>` | none |
| Hero | Headline + subhead + CTA + **chaos→order funnel** | `<Hero>` + `<ChaosOrderHero>` | **§4 — the priority build** |
| 01 | The cost (3 big stats + absolving line) | `<CostStats>` | numbers count up once on enter |
| 02 | "What it looks like in real life" (3 scenario pairs) | `<ScenarioPairs>` | problem card desaturated→resolved card slides in, staggered |
| 03 | How it works (3 steps) | `<HowItWorks>` | connecting line draws L→R (`pathLength`) |
| 04 | Timeline (Week 1 / Week 2 / Month 1) | `<OutcomeTimeline>` | marker travels the line on scroll; vertical on mobile |
| 05 | Every channel, one system (**tap-through carousel**) | `<ChannelCarousel>` | §5 — preserve behavior |
| 06 | Revenue-gap report | `<RevenueReport>` | number/bar reveal |
| — | **Founder's note** | `<FounderNote>` | fade/stagger |
| 07 | Why PHD (4 cards) | `<WhyPHD>` | stagger |
| 08 | FAQ (accordion) | `<Faq>` | accordion, reduced-motion safe |
| CTA | Final CTA (yellow section) | `<FinalCta>` | beam completes into hub (echo hero) |
| — | Footer | `<SiteFooter>` | none |
| — | Sticky mobile CTA bar | `<StickyCta>` | shows after hero on mobile |

---

## 4. ⭐ THE CHAOS→ORDER HERO — detailed spec (the gap to close)

The export renders a static funnel with a ticking "unread" counter. **That is not the deliverable.** Build the two-state emotional arc.

**State machine:** `"chaos" → "order"`. Trigger `order` on first scroll-into-view (`useInView`) OR a ~2.5s timeout, whichever first (so non-scrollers still see the payoff).

**CHAOS state:**
- 5 channel icons (mobile) / 8 (desktop) positioned scattered near the edges, low opacity, **gently drifting** (looping x/y keyframes) — feels uncaught.
- A coral "unread" badge counter climbing (the export's 540ms tick is a fine reference; cap ~9).
- No beams yet.

**ORDER state:**
- Icons animate to anchored positions around a central hub.
- **Magic UI Animated Beams** switch on, **staggered** (each beam `delay` offset), drawing from each icon into the hub — gradient stops `teal #7ac7c4` → `yellow #f4b942`.
- A `"Replied in 4:58 ✓"` chip springs in at the hub (spring, damping).
- `AnimatePresence` cross-fades the chaos layer out as order mounts — the transition should read as *resolution*, not just movement.

**Motion quality = half the message:** chaos uses jittery/linear loops; order uses spring with damping (calm, confident).

**Variants sketch:**
```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const icon = {
  hidden: { opacity: 0.5, scale: 0.9 },
  show:   { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
};
// chaos drift (only while state === "chaos"):
const drift = { animate: { y: [0,-8,0], x: [0,4,0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
// connector draw:
<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
```

**Mobile (390px):** switch the radial layout to a **vertical funnel** — 4–5 channel chips across the top → beams converging downward → hub → "Replied" chip below. Server-render the resolved "order" state statically; hydrate the animation after.

**Reduced motion (`prefers-reduced-motion`):** render the resolved order state statically, no drift, no counter loop. (Mirror the export's `animateHero=false` behavior.)

---

## 5. Channel carousel (§05) — preserve exactly, it's the best trust asset

8 tappable channel tabs; selecting one swaps in a **phone-native message mock**. Keep the iOS-authentic styling (`iosBlue` bubbles, etc.) — that realism is the whole point ("exactly the way it shows up on your phone"). State: `selChannel` index.

Each channel renders an inbound inquiry + an auto-reply with a response time. Build 8 small mock components: `InstagramDM`, `GmailThread`, `Voicemail` (with transcription), `WebFormNotif`, `SMS`, `YelpQuote`, `OpenTableRequest`, `TextFromFriend`.

**Mobile:** the 8-tab strip must be horizontally scrollable (or 2-row wrap) at 390px — do not let it squash. Tabs need `role="tablist"` / `role="tab"` / `aria-selected`.

Teaser text shown above the device (the `ch` array — keep verbatim):
| Channel | Kicker | Title |
|---|---|---|
| Instagram | Instagram DM · Friday rush | A DM lands while you're mid-service. |
| Email | Email · late Saturday | An email you won't see until Monday. |
| Voicemail | Voicemail · Tuesday morning | A voicemail nobody had time to check. |
| Website | Website form · Sunday | A form fills out while you're closed. |
| Google | Google Messages · Thursday | A quick question from your Google listing. |
| Yelp | Yelp · this week | A quote request buried in Yelp. |
| OpenTable | OpenTable · midweek | A large-party request through OpenTable. |
| Text | Text message · weekend | A text from a friend of a friend. |

(Message bodies per channel are locked in §12.)

---

## 6. CTA & conversion wiring

- **All primary "Get my free Revenue Audit" buttons →** `https://cal.com/jeremy-muhiu-7gtclu/30min` (`target="_blank" rel="noopener"`). There are 4 in the current design (hero, 2 body, final).
  - *Decision to confirm with Jeremy:* direct-to-calendar (current) vs. scroll-to-final-CTA-then-book vs. route to `pinchhitdigital.com/audit`. Default to direct-to-calendar.
- **Footer email:** `mailto:jeremy.muhiu@pinchhitdigital.com` (the founder address — reinforces the "one contact" promise). Do **not** reintroduce `hello@pinchhitdigital.com` (not a real inbox).
- Fire an analytics event on every CTA click (`cta_click` with section label) for conversion tracking.

---

## 7. Mobile-first requirements

- 390px is the **primary** target, not an afterthought. Design/QA there first.
- Sticky bottom CTA bar after the hero (already in the design — keep it).
- Hero = vertical funnel (§4). Channel tabs scroll (§5). Timeline goes vertical.
- Tap targets ≥ 44px; body copy ≥ 16px; big stat numerals stay oversized.
- First paint = resolved/static hero (SSR), then hydrate motion.

---

## 8. Accessibility

- `prefers-reduced-motion`: static order state, no drift, no looping counter, no marquee auto-scroll.
- Semantic headings (one `h1` = hero; sections use `h2`). FAQ = real `<button aria-expanded>` accordions. Carousel = `role="tablist"`.
- Color contrast: verify `body #b6bcc2` and `faint #6b7681` on dark meet AA for their sizes; bump if needed.
- Focus-visible states on all interactive elements; `alt`/`aria-hidden` correct on decorative SVGs.

---

## 9. SEO & meta

- `title`: "Catering Lead Recovery for DFW Restaurants | Pinch Hit Digital"
- `meta description`: reuse/adapt the live site's: recover missed catering leads, automate follow-up, free audit, Dallas–Fort Worth.
- Open Graph + Twitter card image (1200×630). Canonical URL. Favicon.
- JSON-LD: `LocalBusiness` / `Service` schema with DFW `areaServed`, founder, and the audit as the offered service.

---

## 10. Performance

- `next/font` (drop the base64 woff2 from the export). `next/image` for any raster.
- Lazy-mount below-the-fold animated sections; animate only `transform`/`opacity`.
- Target LCP < 2.5s on mobile; avoid layout shift from the hero animation (reserve its space).

---

## 11. Known gaps / backlog (not blockers, but design the slots now)

1. **Real social proof.** No testimonial/case study yet. Add a proof slot near §06/§07 and fill it the moment Cardinal Frames or a catering client yields a real number ("Recovered $X for a DFW shop in Y weeks"). This is the single biggest remaining trust lever.
2. **"Not another login" line.** Add one sentence contrasting PHD with self-serve SaaS tools (Hostie/Sadie/Slang/etc.): you don't run software — the system is built for you and a real person maintains it.
3. **Channel glyphs:** use recognizable-but-trademark-safe channel icons; don't ship pixel-copied brand logos.
4. **Analytics:** GA4 or Plausible + the `cta_click` conversion event.

---

## 12. Locked copy appendix (use verbatim — don't re-derive from the bundle)

**Hero**
- Eyebrow: `Catering lead recovery · DFW`
- H1: `You're not losing catering to a better restaurant. You're losing it to a slower reply.`
- Subhead: `We capture every catering inquiry — Instagram, email, voicemail, your website, Google, Yelp, OpenTable, and text — respond in under 5 minutes, and follow up until they book or say no.`
- CTA: `Get my free Revenue Audit` · microcopy `20 min · free · no pitch`
- Hub chip: `Replied in 4:58`

**01 — The cost of a slow reply**
- `60%` — of catering inquiries get no reply within 24 hours. The party already booked.
- `Under 5 min` — your response time on every channel, every day — including the Friday rush.
- `$420` — profit in one missed 50-person corporate lunch. One. Most shops miss several a month.
- Line: `This is a systems problem, not a discipline problem. You're running a kitchen.`

**02 — What it looks like in real life** (3 pairs)
1. `Saturday · 9:47 PM` — Web form: "Need catering for 60 next Friday." → *Sat in your inbox all weekend* ⇒ `Replied · 9:51 PM` — Answered in your voice in 4 minutes. *Menu + date options sent, lead logged.*
2. `Friday rush · 7:12 PM` — Instagram DM about an office holiday party. → *Nobody's checking DMs mid-service* ⇒ `Handled · instantly` — Auto-replied, lead logged, you're flagged Monday. *A warm thread, ready when you are.*
3. `Tuesday · voicemail` — "Hi, calling about catering a rehearsal dinner…" → *A voicemail nobody checked* ⇒ `Transcribed · followed up` — Drip running until they book. *Transcribed the same minute it landed.*

**03 — How it works · three steps**
1. `Free 20-min Revenue Audit` — We look at where catering inquiries come in today and where they leak. You leave with the number, free, whether you hire us or not.
2. `We build your system (~2 weeks)` — We wire every channel into one inbox, write the replies in your voice, and set the follow-ups. You keep cooking.
3. `It runs. You get warm leads.` — Every inquiry answered in under 5 minutes, followed up until it books, and a plain-English report each month.

**04 — From handshake to first recovered lead**
- `Week 1` — Audit + wired to every channel. We map the leaks and connect all 8 inboxes into one place.
- `Week 2` — Live. First lead recovered. Replies go out in under 5 minutes. The first one you'd have missed lands instead.
- `Month 1` — First revenue-gap report. A one-page number: what came in, what got booked, what you recovered.

**05 — Every channel, one system**
- H2: `Every channel, one system`
- Intro: `Eight places a catering lead can hide. One inbox that catches them all. Tap a channel to see the message land — exactly the way it shows up on your phone.`
- Resolve line: `Wherever it comes from, it lands in one inbox — and gets a real reply, in your voice, in under 5 minutes.` / `Captured, logged, and answered automatically.`
- Channel message mocks (inbound → auto-reply · response time):
  - **Instagram** (megan_textiles, Fri 7:12): "Hey! Do y'all cater? Need lunch for ~40 at the office on the 18th — possible? 🙏" → "Absolutely — we cater office lunches all the time, and the 18th is open. Sending menu options for 40 now. What time should it arrive?" · *Auto-replied in 3:41*
  - **Email** (Megan Torres, 9:47 PM, subject "Catering — rehearsal dinner (50 guests)"): "We're looking for catering for a rehearsal dinner of about 50 on June 28. Do you handle events this size?" → "Hi Megan — yes, 50 for a rehearsal dinner is right in our wheelhouse and June 28 is open. I've attached two menus and a quick quote — want to grab 10 minutes this week?" · *Auto-replied in 4:58*
  - **Voicemail** (Dave, Tue 11:02, 0:18): transcription "Hi, this is Dave — calling about catering a retirement party, maybe 35 people, sometime next month. Give me a call back when you get a sec." → texted back "Hi Dave — got your message about the retirement party for 35. Happy to help! What date are you eyeing, and any budget per head in mind?" · *Auto-replied in 4:12*
  - **Website form** (Priya Shah, corporate lunch, 60 guests, Fri the 18th): "Need boxed lunches delivered by 11:30. A few veggie options please." → "Hi Priya — boxed lunches for 60 on the 18th, delivered by 11:30, is no problem. Sending three veggie-friendly options now with per-box pricing." · *Auto-replied in 2:30*
  - **Text/SMS** (+1 469-555-0133, Thu 8:30 AM): "Do you do drop-off catering for 25? Need it this Thursday if possible." → "Yes! Drop-off for 25 this Thursday works. Want our most popular taco or sandwich spread? I'll text the menu and a total." · *Auto-replied in 1:58*
  - **Yelp** (Rachel C., Dallas TX, birthday party, 30 guests, ~2 weeks): "Looking for taco-bar style catering for a 30th birthday. What are my options and roughly what would it run?" → "Happy to help with the birthday! Our taco bar for 30 runs about $14/head with two proteins, sides, and setup. Want me to hold the date?" · *Auto-replied in 4:30*
  - **OpenTable** (large party, 22 guests, Fri 7:00): "Celebrating an anniversary — would love to talk about a set menu for the group." → "Congratulations! Friday at 7 for 22 is available, and a set menu is a great call — sending two options to choose from now." · *Auto-replied in 3:20*
  - **Text from friend-of-friend** (469-555-0148, Sat 1:12 PM): "Hi! Got your number from a friend — do you cater graduation parties? Looking at ~40 people in May." → "Love it — grad parties are one of our favorites. 40 in May is wide open. What weekend are you thinking? I'll send a menu and lock the date." · *Auto-replied in 2:44*

**06 — You see the money, every month** (`Revenue-gap report`, `May 2026`)
- `Recovered this month $6,200` — across 4 booked events that started as inquiries you'd have missed.
- `11` inquiries captured · `1m 12s` fastest response.

**Founder's note**
- Eyebrow: `From the founder`
- H2: `The big operators have a team for this. You have a Friday night.`
- Body: `For years I built the lead-response and follow-up systems that companies with whole IT departments run on. The catering inquiry sitting unread after a Friday rush is the same problem those systems solve — independent restaurants just never had anyone to build it for them. That's the entire reason Pinch Hit Digital exists. Book the audit and you're not getting a sales rep or a ticket queue — you're getting the person who builds your system, in plain English, and answers when you call.`
- Signature: `Jeremy Muhiu · Founder · Pinch Hit Digital · DFW` (JM monogram avatar; swap for a real photo if provided).

**07 — Why Pinch Hit Digital**
- `One contact, not a help desk` — You text one person who knows your shop. No tickets, no queue, no offshore script.
- `Built for DFW` — We're in Dallas–Fort Worth. We'll meet you at the restaurant or over coffee.
- `No tech knowledge required` — It plugs into the tools you already use. You don't learn anything new. It just works.
- `The founder builds it` — The person who builds your system is the person who answers the phone. That's it.

**08 — Straight answers (FAQ)**
1. **What does it cost?** — The Revenue Audit is free — 20 minutes, no pitch. If you hire us, the system is a one-time build (most catering setups land in the low four figures) plus a small monthly fee to keep it running and reporting. You'll get the real number on the call, not a "starting at" range.
2. **How fast does it actually reply?** — Under 5 minutes, around the clock, on every channel — in your voice, not a robotic "we received your message." Real inquiries get real answers while the lead is still warm.
3. **Will it work with the tools I already use?** — Yes. It plugs into your existing inbox, phone, Instagram, website, Google, Yelp, and OpenTable. You don't switch anything or learn new software — it sits on top of what you've got.
4. **Do you work with restaurant chains?** — We focus on independent and small-group full-service restaurants across Dallas–Fort Worth. If you run 2–5 locations, that's right in our lane. Bigger than that, let's talk on the audit and we'll tell you honestly if we're the right fit.

**Final CTA** (`Your move`)
- H2: `Stop leaving catering revenue on the table.`
- Body: `30 minutes, free, on the phone or over coffee anywhere in DFW. We'll find the number you're missing — then you decide.`
- CTA: `Get my free Revenue Audit` · microcopy `No contract · no pitch · just the number`

**Footer**
- `Pinch Hit Digital` · `Dallas / Fort Worth · jeremy.muhiu@pinchhitdigital.com` · `Find your missing number — 20 min · free · DFW`

---

## Build order (suggested)

1. Scaffold Next.js + tokens + fonts + layout shell.
2. Static sections 01–08 + founder note + footer (copy from §12) — get the page reading top-to-bottom.
3. `<ChannelCarousel>` (§5) — highest-value interactive piece.
4. `<ChaosOrderHero>` (§4) — the priority animation; budget real time here.
5. CTA wiring + analytics (§6), SEO/meta (§9), a11y pass (§8), perf pass (§10).
6. Mobile QA at 390px throughout.

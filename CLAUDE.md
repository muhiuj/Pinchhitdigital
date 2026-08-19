@AGENTS.md

# Pinch Hit Digital — Website

## Positioning (2026-08 pivot — supersedes everything older)
- **Three ICPs, in order**: independent insurance agencies (current campaign focus), trades (electrical/HVAC/plumbing), construction. All DFW.
- Food & beverage is retired: catering/plans/audit/guides pages were removed with 301s. F&B blog posts stay live but unfeatured. Never reintroduce catering copy.
- Proof engine: published field research at /case-studies (Field Report No. 1: DFW insurance response study; No. 2 trades, pending). Site copy cites it instead of hype.
- No public pricing anywhere: engagements are scoped after the free 30-minute digital systems audit.
- IA: homepage → Industries nav dropdown → /industries/{insurance-agencies,trades,construction} landing pages (copy in src/lib/industries.ts).
- Active campaign: reply emails to the studied agencies link the case study (+ `?src=audit-reply` UTM); the site's job is converting that warm cohort to a booked walkthrough.

## Design system (canonical, via Claude Design)

### Fonts (all from Google Fonts via `next/font/google`)
- **Display** — Bricolage Grotesque (weights 400/500/600/700/800): headlines, buttons, eyebrows
- **Body** — Manrope: paragraph copy, navigation
- **Italic accent** — Instrument Serif (italic 400): the accent word in headlines (`.it` span)
- **Mono** — JetBrains Mono: meta tags, numeric labels, eyebrow timestamps

### Colors
Full `--phd-*` token system lives in src/app/globals.css. Key values:

| Role | Token | Hex |
|---|---|---|
| Primary brand (logo) | `--phd-teal-400` | `#7ac7c4` |
| Pop accent | `--phd-sun-400` | `#f4b942` |
| Ink / dark text | `--phd-ink-900` | `#11161c` |
| Warm canvas | `--phd-cream-50` | `#fbf7f0` |
| Coral accent | `--phd-coral` | `#e3654f` |

Full scales available: `teal-{50…950}`, `ink-{0…950}`, `sun-{300,400,500}`, `cream-{50,100,200}`, plus editorial accents `plum-500`, `olive-500`, `cobalt`, `mint`, semantic `success/warning/danger/info`. Use `ink-*` for body text — not Tailwind's default `slate` / `zinc` / `gray`.

### Other tokens (in globals.css)
- Type scale: `--phd-fs-xs (12)` … `--phd-fs-7xl (84)`
- Tracking: `tight (-0.02em)` / `wide (0.04em)` / `wider (0.12em — wordmark vibe)`
- Spacing: 4px grid up to 128px
- Motion: `--phd-ease cubic-bezier(.2,.7,.2,1)`, durations 140 / 220 / 420ms
- Containers: 640 / 880 / 1120 / 1320

### Icons
`lucide-react`. Common picks from the canonical design: map-pin, search-check, globe, route, bot, workflow, messages-square, mail, sparkles, utensils, cake, truck, wine, wrench, frame, stethoscope, store, zap, piggy-bank, user-round, trending-up, line-chart, refresh-ccw, plus.

## Pages
- `/` Home — hero → industries cards → process → services → benefits → about → FAQ → CTA.
- `/industries/insurance-agencies`, `/industries/trades`, `/industries/construction` — per-vertical landing pages (shared template, copy in src/lib/industries.ts).
- `/case-studies` + `/case-studies/dfw-insurance-response-study` — published field research (copy in src/lib/case-studies.ts, verbatim rules inside).
- `/build-it-live` — live-build session page with working registration/SMS automation. Do not touch its files or API routes.
- Removed with 301s (2026-08): /plans, /catering, /catering-lead-recovery, /audit, /guides.

## Key URLs
- Booking (all CTAs): https://cal.com/jeremy-muhiu-7gtclu/30min ("Book a demo" sitewide; "Book a free walkthrough" on insurance surfaces)

## Do not
- Reintroduce F&B/catering copy, public pricing, or the retired ?for= industry picker.
- Use generic small-business filler ("solutions", "leverage", "synergy").
- Use stale color values (`#2A9D8F`, `#0D1B2A`, `#FAF7F0`) — those predate the Claude Design system. Real values are above.
- Use Inter / Montserrat / Cormorant Garamond — the canonical fonts are Bricolage / Manrope / Instrument Serif / JetBrains Mono.
- Build features that require a backend before Sprint 2.

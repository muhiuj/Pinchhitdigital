@AGENTS.md

# Pinch Hit Digital — Website

## Positioning (next 90 days)
- **Primary**: food & beverage operators in DFW (restaurants, cafés, caterers, bakeries, bars/taprooms, food trucks).
- **Welcome but secondary**: any small-business operator (trades, retail, clinics, services). We build automation for any kind of business — never write copy that locks out non-F&B operators.
- Founder distributes physical cards with QR → quiz → guide → catering page funnel.
- Catering Lead Recovery System is the flagship Sprint-2 product.

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
- `/` Home — F&B-forward, small-business-broad. Hero → kitchen feature → industries marquee → process → services → industries split → benefits → stats → featured client → about → FAQ → CTA → footer.
- `/audit` Free 30-min consultation booking page.
- `/catering` (Sprint 2) Catering Lead Recovery System product page. Currently houses the navy "Stop Losing Catering Revenue" hero we built earlier.
- `/guides` (Sprint 2) Guide downloads — Catering Recovery Audit + others.

## Key URLs
- pinchhitdigital.com/audit → consultation booking
- pinchhitdigital.com/catering → product page
- pinchhitdigital.com/guides → guide downloads
- Direct fallback: https://cal.com/jeremy-muhiu-7gtclu/30min

## Do not
- Write copy that locks out non-F&B small businesses (trades, retail, clinics).
- Use generic small-business filler ("solutions", "leverage", "synergy").
- Use stale color values (`#2A9D8F`, `#0D1B2A`, `#FAF7F0`) — those predate the Claude Design system. Real values are above.
- Use Inter / Montserrat / Cormorant Garamond — the canonical fonts are Bricolage / Manrope / Instrument Serif / JetBrains Mono.
- Build features that require a backend before Sprint 2.

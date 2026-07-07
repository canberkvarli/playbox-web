# Playbox Marketing Site — Redesign Design Doc

**Date:** 2026-07-07
**Status:** Validated, ready for implementation
**Source of truth:** Claude Design project "Playbox Design System" (`44254649-…`) + `playbox_v3` app + this brainstorm.

---

## 1. What we're building

A **marketing / launch site** (not a booking product) for **Playbox** — Türkiye's on-demand
sports-gear sharing network. Smart street-locker stations sit next to basketball courts, football
pitches, tennis and volleyball courts: open the app → find the nearest station on a map → unlock it
over Bluetooth → borrow the gear → play → return.

The site's jobs: build awareness, capture the **waitlist** (players) and **sponsor/partner**
interest, and feel like a genuinely crafted, animated, "floodlit street court at night" experience —
distinctly **not** a clone of equip.sport.

Scope decisions (locked in brainstorm):
- Marketing long-scroll, single page. Booking stays in the app.
- **Turkish default**, English toggle. TR is native voice; EN preserves energy, not literal.
- New **Sponsors** section: sponsors get a volt-lit logo wall + player visibility; in return they
  fund **free play hours** players redeem.
- Rebuild both capture forms (waitlist + partner) against existing `/api/waitlist` + `/api/partner`.

## 2. Brand system — "Asphalt Volt" (dark-first)

Palette (from design project `tokens/colors.css` — the locked resolution of the old purple/navy split):

| Token | Hex | Role |
|---|---|---|
| asphalt | `#17181C` | primary background — court asphalt |
| slate | `#2A2C33` | borders, dividers, inactive |
| card | `#202127` | raised surface on asphalt |
| **volt** | `#D6FB3C` | **single** primary action / active / highlight |
| volt-ink | `#A9C72E` | volt-as-text on light surfaces |
| coral | `#FF5C39` | secondary accent / sport / warmth / alerts |
| concrete | `#F4F3EE` | light surface + primary text on dark |
| muted | `#9A9AA6` | secondary text |

Discipline: **one volt action color per screen.** Flat color fields, no photographic hero.
Marketing artboards alternate asphalt / volt / coral grounds for rhythm.

**Type**
- Display = **Archivo Expanded** (client override of Anton). ALL-CAPS, `+0.005em` tracking,
  `0.9` line-height — never tighten. The voice of every headline (`OYNA`, `BUL. AÇ. OYNA.`).
- Body = **Inter** (400–800).
- Mono = **JetBrains Mono** — timers `12:48`, station IDs `IST-KADIKOY-07`, eyebrows, tickers.
- Self-hosted via `next/font` (Google) for perf + no FOUT.

**Shape:** generous rounding — pill chips `999px`, large card/sheet radii, app-tile ~22%,
map-pin teardrop `50% 50% 50% 8px`.

**Logo:** "Bounce" — a geometric ball inside a rounded box (the locker/station), 6px volt strokes
on asphalt, rebuilt as inline **SVG**. Wordmark `PLAYBOX` (one word; volt/coral split on `BOX`
optional). Reads at favicon size.

**Voice & tone (follow exactly):** Turkish-first. Lowercase in UI, ALL-CAPS in marketing headlines.
Informal `sen` (never `siz`/`lütfen`/`sayın`). Imperative, noun-forward (`bul, aç, oyna` ·
`oyna. iade et. tekrar oyna.`). Numbered four-step explainers (`01 bul · 02 aç · 03 oyna`). Warm even
in errors. Sport emoji 🏀 ⚽ 🎾 🏐 + 🔥 ⏱ 📡 used functionally, sparingly.

## 3. Creative concept — "Open the Box"

Playbox is a box you open to unleash play. The signature motif is a **living volt-green energy
ribbon** (SVG path) that flows down the whole page, drawn by scroll — snaking between sections,
whipping around headlines, pouring into each sport. It's the through-line that makes the site feel
alive and flowy instead of a stack of blocks. Ground is asphalt-black; volt is the current running
through it; coral is the heat.

## 4. Page structure (long-scroll)

1. **Nav** — floating, minimal. Bounce mark + `PLAYBOX` wordmark, section links, **TR/EN toggle**
   (TR default), volt "uygulamayı al / get the app" CTA. Shrinks/hides on scroll.
2. **Hero** — full-viewport asphalt. Massive kinetic `PLAYBOX` / `OYNA`, the box *opens* on load and
   the volt ribbon pours out. Turkish tagline (`ANINDA. ÜCRETSİZ. CEBİNDE.`) + waitlist CTA.
   Mouse-reactive parallax.
3. **Ticker** — JetBrains Mono marquee spine: `VOLEYBOL · TENİS · FUTBOL · BASKETBOL · BUL · AÇ · OYNA`.
4. **How it works** — `01 bul · 02 aç · 03 oyna · 04 iade et`, pinned & scroll-animated; each step
   "opens" as you scroll.
5. **The Sports** — showpiece. **Horizontal pinned gallery**: Basketbol 🏀 → Futbol ⚽ → Tenis 🎾 →
   Voleybol 🏐. Each a full panel, big Archivo Expanded type, volt/coral treatment, cursor-tracked
   tilt, scroll-driven reveal.
6. **For Players** — value props (cheap, spontaneous, no gear to own) + waitlist capture.
7. **Sponsors — "Power the play / oyunu güçlendir"** — pitch + volt-lit animated logo wall +
   partner form (company, contact, what they offer) → `/api/partner`.
8. **Waitlist / closing** — big volt moment, email capture → `/api/waitlist`, "Coming to Türkiye" +
   app-store links.
9. **Footer** — wordmark, socials, language, legal, KVKK note.

Compact **FAQ** kept (folded near the end). No About/team page for launch. "Coming to Türkiye" as a
line, not a full map.

## 5. Motion system

- **Lenis** smooth scroll (weighted glide) — already a dependency.
- **GSAP + ScrollTrigger** — pin hero + sports gallery, scrub the volt ribbon path, kinetic letter
  reveals, `24px` upward stagger-fades.
- **Motion (motion.dev)** — layout + gesture micro-interactions.
- **Custom cursor + mouse-tracking hooks** — magnetic volt/coral CTAs (existing `magnetic-button`),
  tilt, parallax. Hand-built, no heavy deps.
- Volt ribbon = lightweight SVG/canvas, no WebGL unless a moment demands it.
- **No spinners** (app rule) — skeletons / stagger-fade entrances only.
- Everything transform/opacity-based; full `prefers-reduced-motion` fallback to a clean static site.

## 6. Tech

- Next.js 15 (App Router) + React 19 + Tailwind v4 (keep). CSS tokens mirrored into Tailwind theme.
- i18n rebuilt in `lib/i18n.ts` as a clean TR/EN dictionary, all copy keyed, language persisted,
  `<html lang>` + hreflang set, TR default.
- Existing API routes reused: `/api/waitlist`, `/api/partner` (Resend).
- Self-hosted fonts via `next/font`.

## 7. Build order

1. Foundation: fonts, Tailwind theme tokens, `globals.css`, Lenis provider, i18n dictionary, SVG logo.
2. Nav + Hero + ticker (the first impression + motion spine).
3. How-it-works + Sports pinned gallery (the showpiece).
4. Players + Sponsors + Waitlist + FAQ + Footer.
5. Motion polish, reduced-motion, responsive, Lighthouse/a11y pass.

Old components under `components/` are wiped and rebuilt against this system.

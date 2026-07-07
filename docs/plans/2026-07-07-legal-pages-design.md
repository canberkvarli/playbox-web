# Legal pages (KVKK / Privacy / Terms) — design

**Date:** 2026-07-07
**Why:** App Store submission requires a publicly hosted privacy policy URL; a terms/EULA link is strongly recommended. Turkish law (KVKK m.10) additionally requires an aydınlatma metni naming the data controller.

## Structure

Three static routes, each a thin server component (for metadata) wrapping a shared client renderer:

- `/kvkk` — KVKK Aydınlatma Metni (Article 10 disclosure)
- `/privacy` — Gizlilik Politikası / Privacy Policy (covers the app **and** the website's waitlist + sponsor forms)
- `/terms` — Kullanım Koşulları / Terms of Use

## Components

- `lib/legal-content.ts` — all document content as plain data (`Record<docKey, Record<Lang, LegalDoc>>`). Body lines starting with `- ` render as bullet lists.
- `components/legal-page.tsx` — shared client renderer: sticky header (logo → home, `LangToggle`), pill nav across the three docs, sections, copyright footer. Follows the asphalt/volt theme.
- Footer: the dangling `#` KVKK link replaced with three `next/link`s (KVKK / Gizlilik / Koşullar).

## Language

Pages follow the site's existing TR/EN toggle (client i18n context, localStorage). Turkish is declared the legally binding version; English is a courtesy translation.

## Placeholders to fill before launch

Marked in the content as `[KÖŞELİ PARANTEZ]` / `[BRACKETS]`:

- Company legal name + address (once incorporated) — the "veri sorumlusu"
- Payment provider name (e.g. iyzico)
- Analytics/crash-reporting provider (e.g. Firebase)

## Note

These documents are templates drafted for App Store readiness, **not legal advice** — have a Turkish attorney review before commercial launch (especially the KVKK metni and consumer-law clauses in the terms).

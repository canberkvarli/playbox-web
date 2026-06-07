# Ops Dashboard — Plan (playbox-web)

**Goal:** An internal operator console (in the existing Next.js 15 app-router marketing site) to triage disputes/quarantines, watch station health, and take support actions — all by calling the Playbox `op_*` Postgres functions with a **server-only service-role** Supabase client.

**Security model (non-negotiable):**
- The Supabase **service-role key is server-only** — used only in server components / server actions / route handlers (`lib/supabase-admin.ts` is `import 'server-only'`). It is NEVER imported by a client component and never sent to the browser.
- Auth: a **shared `OPS_PASSWORD`** → on login, set a **signed httpOnly cookie** (HMAC over `exp` with `OPS_SESSION_SECRET`); `middleware.ts` enforces it on `/ops/*` (except `/ops/login`). Upgrade to per-operator Supabase Auth later.
- The dashboard runtime-depends on the Phase-4 `op_*` functions being deployed to the Supabase project.

**Stack:** Next.js 15 app-router (server components + server actions), `@supabase/supabase-js`, Tailwind 4 + shadcn, vitest for the pure auth-token logic.

---

## Task D1 — foundation (tested)
- `lib/supabase-admin.ts` — `import 'server-only'`; `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {auth:{persistSession:false}})`; export a typed `opRpc(fn, args)` helper. Throws if envs missing.
- `lib/ops-auth.ts` — **pure** session-token sign/verify: `signSession(secret, {exp})` → `base64(payload).hmacHex`; `verifySession(secret, token)` → `{valid, exp}` (constant-time compare, expiry check). No Next imports → unit-testable.
- `.env.example` += `NEXT_PUBLIC_SUPABASE_URL`(not needed client-side actually — use `SUPABASE_URL`), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPS_PASSWORD`, `OPS_SESSION_SECRET`.
- vitest setup (`vitest.config.ts`, `package.json` test script) + `lib/ops-auth.test.ts` (sign→verify round-trips; tampered token → invalid; expired → invalid; wrong secret → invalid; constant-time-ish). 

## Task D2 — auth gate
- `app/ops/login/page.tsx` (password form) + a server action `loginAction` that compares `OPS_PASSWORD` (constant-time), on success `signSession` + `cookies().set` httpOnly/secure/sameSite=lax, redirect to `/ops`.
- `middleware.ts` — match `/ops/:path*`, allow `/ops/login`, else `verifySession(cookie)` → redirect to login if invalid. (Edge-safe: ops-auth uses Web Crypto `crypto.subtle` HMAC so it runs in middleware.)
- `logoutAction` (clear cookie).

## Task D3 — pages (server components)
- `app/ops/page.tsx` — **attention queue**: `opRpc('op_attention_queue')` → a table (reservation id, user, status, deposit_state, disputed/quarantined, reason, settle_attempts) with row links to the detail + inline action buttons.
- `app/ops/stations/page.tsx` — **station health**: `opRpc('op_station_health')` → table (station, fw, battery_pct + low badge, last_seen + stale badge, seq_drift).
- `app/ops/reservation/[id]/page.tsx` — **dispute timeline**: `opRpc('op_dispute_timeline',{p_reservation_id:id})` → ordered timeline (source-tagged) + the action panel.
- shadcn Table/Badge/Button (add via the existing components.json), an `/ops` layout with nav + logout.

## Task D4 — actions + README
- Server actions: `markDisputed`, `resolveDispute(action)`, `unquarantine` → `opRpc('op_*', {...})` with an `admin` label (from the session/a fixed 'ops' for the shared-password model) + `revalidatePath`. Wire to the detail page + queue.
- `docs/ops-dashboard-plan.md` README section: env setup, the op_* deploy dependency, the shared-password caveat, the per-operator upgrade path.

## Out of scope
- Per-operator identity/audit (shared password for now).
- `op_gear_reports` (depends on the photo-lostgear branch merging) — add a panel once both land.

## Done when
Service-role server-only; signed-cookie auth (tested) gates /ops/*; attention-queue + station-health + dispute-timeline pages render from op_*; mark/resolve/unquarantine actions work; README documents env + the op_* dependency.

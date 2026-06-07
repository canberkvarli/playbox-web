import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client for the ops console.
 *
 * The `import "server-only"` above makes importing this module from a client
 * component a build error — the SERVICE-ROLE key must NEVER reach the browser.
 *
 * This client is used exclusively to invoke the Playbox `op_*` Postgres
 * functions, which are SECURITY DEFINER and GRANTed to `service_role`:
 *   - op_attention_queue   — items needing operator attention
 *   - op_station_health    — per-station health snapshot
 *   - op_dispute_timeline  — event timeline for a dispute
 *   - op_mark_disputed     — flag a record as disputed
 *   - op_resolve_dispute   — resolve an open dispute
 *   - op_unquarantine      — release a quarantined station/item
 */

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url) {
  throw new Error(
    "supabase-admin: SUPABASE_URL is not set (server-only env var required).",
  );
}
if (!key) {
  throw new Error(
    "supabase-admin: SUPABASE_SERVICE_ROLE_KEY is not set (server-only env var required).",
  );
}

/**
 * Returns a service-role Supabase client. Sessions are never persisted and
 * tokens are never auto-refreshed — this is a stateless server credential.
 */
export function supabaseAdmin() {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type OpRpcResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/**
 * Thin typed wrapper around a single `op_*` RPC call. Never throws — any
 * Postgres/transport error is returned as `{ ok: false, error }`.
 */
export async function opRpc<T = unknown>(
  fn: string,
  args?: Record<string, unknown>,
): Promise<OpRpcResult<T>> {
  try {
    const { data, error } = await supabaseAdmin().rpc(fn, args);
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: data as T };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

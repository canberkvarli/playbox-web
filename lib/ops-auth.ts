/**
 * ops-auth — pure, edge-compatible signed-session helpers.
 *
 * This gates an INTERNAL operator console. A correct signed cookie is the only
 * credential; the signing secret is `OPS_SESSION_SECRET` (32+ random bytes).
 *
 * PURE by design:
 *  - No Next.js imports (can be called from middleware on the edge runtime).
 *  - No `node:crypto` — uses Web Crypto (`globalThis.crypto.subtle`) so it runs
 *    in the edge runtime, the node runtime, and tests alike.
 *  - Every export is total: malformed input yields a result, never a throw.
 *
 * Token format: `${payload}.${sig}` where
 *  - payload = `String(expEpochSec)` (the absolute expiry, seconds since epoch)
 *  - sig     = lowercase hex of HMAC-SHA256(secret, payload)
 */

/** Session lifetime: 12 hours. */
export const OPS_SESSION_TTL_SEC = 60 * 60 * 12;

/** Absolute expiry epoch-seconds for a session minted at `nowEpochSec`. */
export function sessionExp(nowEpochSec: number): number {
  return nowEpochSec + OPS_SESSION_TTL_SEC;
}

const encoder = new TextEncoder();

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  const bytes = new Uint8Array(sigBuf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * Constant-time comparison of two hex strings.
 * Length-checked first, then XOR-accumulates every char code so the time spent
 * does not reveal where the first difference is. Returns false on any mismatch.
 */
export function constantTimeEqualHex(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Sign a session that expires at `expEpochSec`. Returns `${payload}.${sig}`. */
export async function signSession(
  secret: string,
  expEpochSec: number,
): Promise<string> {
  const payload = String(expEpochSec);
  const sig = await hmacHex(secret, payload);
  return `${payload}.${sig}`;
}

export type VerifyResult = {
  valid: boolean;
  reason?: "missing" | "malformed" | "bad_sig" | "expired";
};

/**
 * Verify a session token against `secret` at `nowEpochSec`.
 * Total — never throws. Failure modes:
 *  - missing:   token is null/undefined/empty
 *  - malformed: not exactly `payload.sig`, or payload is not an integer
 *  - bad_sig:   HMAC does not match (constant-time compared)
 *  - expired:   exp <= now
 */
export async function verifySession(
  secret: string,
  token: string | undefined | null,
  nowEpochSec: number,
): Promise<VerifyResult> {
  if (!token) return { valid: false, reason: "missing" };

  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false, reason: "malformed" };

  const [payload, sig] = parts;
  if (payload.length === 0 || sig.length === 0) {
    return { valid: false, reason: "malformed" };
  }

  // payload must be a clean non-negative integer string.
  if (!/^\d+$/.test(payload)) return { valid: false, reason: "malformed" };
  const expEpochSec = Number(payload);
  if (!Number.isFinite(expEpochSec)) {
    return { valid: false, reason: "malformed" };
  }

  let expectedSig: string;
  try {
    expectedSig = await hmacHex(secret, payload);
  } catch {
    return { valid: false, reason: "bad_sig" };
  }

  if (!constantTimeEqualHex(sig, expectedSig)) {
    return { valid: false, reason: "bad_sig" };
  }

  if (expEpochSec <= nowEpochSec) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true };
}

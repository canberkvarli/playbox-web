import "server-only";

import { cookies } from "next/headers";

import {
  OPS_SESSION_TTL_SEC,
  constantTimeEqualHex,
  sessionExp,
  signSession,
} from "@/lib/ops-auth";

const COOKIE = "ops_session";

/** The session cookie name. Middleware needs this to read the cookie. */
export const OPS_COOKIE = COOKIE;

const encoder = new TextEncoder();

/**
 * The HMAC signing secret. Throws if unset OR shorter than 32 chars — the D1
 * review's secret-strength requirement. A weak secret is a fail-closed config
 * error, never silently downgraded.
 */
function opsSecret(): string {
  const secret = process.env.OPS_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "OPS_SESSION_SECRET must be set and at least 32 characters long",
    );
  }
  return secret;
}

/** The operator password. Throws if unset. */
function opsPassword(): string {
  const password = process.env.OPS_PASSWORD;
  if (!password) {
    throw new Error("OPS_PASSWORD must be set");
  }
  return password;
}

/** Lowercase hex of HMAC-SHA256(secret, message). */
async function hmacHex(secret: string, message: string): Promise<string> {
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
    encoder.encode(message),
  );
  const bytes = new Uint8Array(sigBuf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

/** Mint a signed session and set it as an httpOnly, secure, strict cookie. */
export async function createOpsSession(): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const token = await signSession(opsSecret(), sessionExp(now));
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: OPS_SESSION_TTL_SEC,
  });
}

/** Remove the session cookie. */
export async function clearOpsSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/**
 * Constant-time password check.
 *
 * Compares HMAC(secret, input) vs HMAC(secret, password) as hex via
 * `constantTimeEqualHex`. The two hex digests are equal iff input === password,
 * the comparison is constant-time, and — because both sides are fixed-width
 * SHA-256 digests — it leaks neither the password length nor where a mismatch
 * occurs. We deliberately never use `===` on the raw passwords (timing leak).
 */
export async function checkPassword(input: string): Promise<boolean> {
  const secret = opsSecret();
  const password = opsPassword();
  const inputHex = await hmacHex(secret, input);
  const passwordHex = await hmacHex(secret, password);
  return constantTimeEqualHex(inputHex, passwordHex);
}

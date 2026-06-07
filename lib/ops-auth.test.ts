import { describe, it, expect } from "vitest";
import {
  signSession,
  verifySession,
  constantTimeEqualHex,
  sessionExp,
  OPS_SESSION_TTL_SEC,
} from "./ops-auth";

const SECRET = "test-secret-which-is-at-least-32-bytes-long!!";
const NOW = 1_700_000_000; // fixed reference epoch-seconds

describe("ops-auth signSession/verifySession", () => {
  it("round-trips a valid session (exp in the future)", async () => {
    const exp = NOW + 100;
    const token = await signSession(SECRET, exp);
    expect(token).toMatch(/^\d+\.[0-9a-f]{64}$/);

    const res = await verifySession(SECRET, token, NOW);
    expect(res).toEqual({ valid: true });
  });

  it("rejects a tampered payload as bad_sig", async () => {
    const exp = NOW + 100;
    const token = await signSession(SECRET, exp);
    const [, sig] = token.split(".");
    const tampered = `${exp + 1}.${sig}`; // valid shape, wrong payload

    const res = await verifySession(SECRET, tampered, NOW);
    expect(res).toEqual({ valid: false, reason: "bad_sig" });
  });

  it("rejects a tampered signature as bad_sig", async () => {
    const exp = NOW + 100;
    const token = await signSession(SECRET, exp);
    const [payload, sig] = token.split(".");
    // flip the first hex char
    const flipped = (sig[0] === "0" ? "1" : "0") + sig.slice(1);
    const tampered = `${payload}.${flipped}`;

    const res = await verifySession(SECRET, tampered, NOW);
    expect(res).toEqual({ valid: false, reason: "bad_sig" });
  });

  it("rejects an expired session", async () => {
    const exp = NOW - 1;
    const token = await signSession(SECRET, exp);

    const res = await verifySession(SECRET, token, NOW);
    expect(res).toEqual({ valid: false, reason: "expired" });
  });

  it("treats exp === now as expired (exclusive)", async () => {
    const token = await signSession(SECRET, NOW);
    const res = await verifySession(SECRET, token, NOW);
    expect(res).toEqual({ valid: false, reason: "expired" });
  });

  it("rejects a token signed with a different secret", async () => {
    const exp = NOW + 100;
    const token = await signSession("a-totally-different-secret-value-here", exp);

    const res = await verifySession(SECRET, token, NOW);
    expect(res).toEqual({ valid: false, reason: "bad_sig" });
  });

  it("reports missing for undefined/null/empty tokens", async () => {
    expect(await verifySession(SECRET, undefined, NOW)).toEqual({
      valid: false,
      reason: "missing",
    });
    expect(await verifySession(SECRET, null, NOW)).toEqual({
      valid: false,
      reason: "missing",
    });
    expect(await verifySession(SECRET, "", NOW)).toEqual({
      valid: false,
      reason: "missing",
    });
  });

  it("reports malformed for shape violations", async () => {
    for (const bad of [
      "nodot",
      "too.many.dots",
      ".onlysig",
      "onlypayload.",
      "notanumber.deadbeef",
    ]) {
      const res = await verifySession(SECRET, bad, NOW);
      expect(res).toEqual({ valid: false, reason: "malformed" });
    }
  });
});

describe("constantTimeEqualHex", () => {
  it("returns true for identical strings", () => {
    expect(constantTimeEqualHex("deadbeef", "deadbeef")).toBe(true);
  });

  it("returns false for different same-length strings", () => {
    expect(constantTimeEqualHex("deadbeef", "deadbee0")).toBe(false);
  });

  it("returns false on length mismatch", () => {
    expect(constantTimeEqualHex("dead", "deadbeef")).toBe(false);
  });
});

describe("ttl helpers", () => {
  it("OPS_SESSION_TTL_SEC is 12 hours", () => {
    expect(OPS_SESSION_TTL_SEC).toBe(60 * 60 * 12);
  });

  it("sessionExp adds the TTL to now", () => {
    expect(sessionExp(NOW)).toBe(NOW + OPS_SESSION_TTL_SEC);
  });
});

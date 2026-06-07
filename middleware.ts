import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifySession } from "@/lib/ops-auth";

const OPS_COOKIE = "ops_session";

/**
 * Gate everything under /ops/*.
 *
 * Edge-safe by construction: this file imports ONLY `lib/ops-auth` (pure
 * Web-Crypto, no Next/node-only APIs). It must NOT import `lib/ops-session`,
 * which is `server-only` and uses `next/headers`.
 *
 * Fails CLOSED: a missing secret, a missing cookie, or an invalid/expired token
 * all redirect to the login page. There is no path that opens the gate without
 * a valid signed session.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page itself must be reachable while unauthenticated.
  if (pathname === "/ops/login" || pathname.startsWith("/ops/login/")) {
    return NextResponse.next();
  }

  const secret = process.env.OPS_SESSION_SECRET;
  const token = req.cookies.get(OPS_COOKIE)?.value;

  // Fail closed: no secret means we cannot verify anything, so deny.
  const ok = secret
    ? (await verifySession(secret, token, Math.floor(Date.now() / 1000))).valid
    : false;

  if (!ok) {
    return NextResponse.redirect(new URL("/ops/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ops/:path*"],
};

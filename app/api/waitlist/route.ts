import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

const buckets = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= LIMIT) return false;
  bucket.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const { email } = parsed.data;

  if (!supabase) {
    console.log("[waitlist] no Supabase config. would have stored:", email);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  // Plain insert (not upsert): the lead tables have no anon SELECT policy, and
  // upsert's ON CONFLICT needs to see the existing row, so it trips RLS. Instead
  // we let the unique(email) constraint reject repeats and treat 23505 (already
  // on the list) as an idempotent success.
  const { error } = await supabase
    .from("waitlist_signups")
    .insert({ email, ip, source: "web" });

  if (error && error.code !== "23505") {
    console.error("[waitlist] supabase error", error);
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

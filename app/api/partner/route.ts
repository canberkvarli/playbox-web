import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(80),
  company: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().max(500).optional(),
});

const buckets = new Map<string, { count: number; reset: number }>();
const LIMIT = 3;
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

  const { name, company, email, message } = parsed.data;

  if (!supabase) {
    console.log("[sponsor-form] no Supabase config. would have stored:", parsed.data);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const { error } = await supabase
    .from("sponsor_inquiries")
    .insert({ name, company, email, message: message ?? null, ip });

  if (error) {
    console.error("[sponsor-form] supabase error", error);
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

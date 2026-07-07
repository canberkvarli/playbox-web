import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

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
  const inbox = (process.env.PARTNER_INBOX ?? "canberkvarli@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[waitlist] no RESEND_API_KEY. would have added:", email);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const resend = new Resend(apiKey);

  try {
    // MAIL_FROM must use a Resend-verified domain (e.g. actorrise.com) to deliver
    // to arbitrary recipients. Switch to a playboxsport.com address once it's verified.
    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Playbox <onboarding@resend.dev>",
      to: inbox,
      replyTo: email,
      subject: `Waitlist signup: ${email}`,
      html: `
        <div style="font-family:-apple-system,Inter,sans-serif;color:#1a1f3a;line-height:1.6">
          <h2 style="color:#e87527;margin:0 0 16px">New waitlist signup</h2>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#999;font-size:12px">Sent from playboxsport.com waitlist</p>
        </div>
      `,
    });
    if (error) {
      console.error("[waitlist] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] resend error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

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
  const inbox = process.env.PARTNER_INBOX ?? "canberkvarli@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[sponsor-form] no RESEND_API_KEY. would have sent:", parsed.data);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      // onboarding@resend.dev works with only an API key (no verified domain).
      // Once playbox.com.tr is verified in Resend, set MAIL_FROM=Playbox <sponsors@playbox.com.tr>.
      from: process.env.MAIL_FROM ?? "Playbox <onboarding@resend.dev>",
      to: inbox,
      replyTo: email,
      subject: `New sponsor inquiry — ${company} (${name})`,
      html: `
        <div style="font-family:'JetBrains Mono',-apple-system,monospace;background:#17181c;color:#f4f3ee;padding:32px;line-height:1.6">
          <h2 style="color:#d6fb3c;margin:0 0 16px;font-family:sans-serif">New sponsor inquiry ⚡</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Email:</strong> <a style="color:#d6fb3c" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          ${message ? `<p><strong>Offer / message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
          <hr style="border:none;border-top:1px solid #2a2c33;margin:24px 0"/>
          <p style="color:#9a9aa6;font-size:12px">Sent from playbox.com.tr sponsors form</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sponsor-form] resend error", err);
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

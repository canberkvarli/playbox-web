import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(80),
  venueType: z.enum(["cafe", "gym", "park", "school", "hotel", "other"]),
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

  const { name, venueType, email, message } = parsed.data;
  const inbox = process.env.PARTNER_INBOX ?? "canberkvarli@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[partner-form] no RESEND_API_KEY — would have sent:", parsed.data);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Playbox Web <partner@playbox.com.tr>",
      to: inbox,
      replyTo: email,
      subject: `New partner inquiry — ${name} (${venueType})`,
      html: `
        <div style="font-family:-apple-system,Inter,sans-serif;color:#1a1f3a;line-height:1.6">
          <h2 style="color:#e87527;margin:0 0 16px">New partner inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Venue type:</strong> ${escapeHtml(venueType)}</p>
          ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#999;font-size:12px">Sent from playbox.com.tr partner form</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partner-form] resend error", err);
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

import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().max(140).optional().default("Portfolio inquiry"),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  rec.count += 1;
  return rec.count <= 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many messages. Try again in a minute." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input." }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }); // silent honeypot pass
  }
  // In production: forward to Resend / Slack / DB. Here we log + succeed.
  console.log("[contact]", { ...parsed.data, ip, at: new Date().toISOString() });
  return NextResponse.json({ ok: true, message: "Message received. I reply within 48h." });
}

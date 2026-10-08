import { NextRequest, NextResponse } from "next/server";
import { LINKEDIN_SESSION_COOKIE, messageDeliveryConfig, privateHeaders, readLinkedinMember, sameOrigin } from "@/lib/public-linkedin";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers: privateHeaders });
  const member = await readLinkedinMember(request.cookies.get(LINKEDIN_SESSION_COOKIE)?.value);
  if (!member) return NextResponse.json({ error: "sign_in_required" }, { status: 401, headers: privateHeaders });
  const delivery = messageDeliveryConfig();
  if (!delivery) return NextResponse.json({ error: "delivery_unavailable" }, { status: 503, headers: privateHeaders });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "invalid_message" }, { status: 415, headers: privateHeaders });
  // Bound the streamed body rather than trusting Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "invalid_message" }, { status: 400, headers: privateHeaders });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    size += chunk.value.length;
    if (size > 32000) { await reader.cancel(); return NextResponse.json({ error: "message_too_large" }, { status: 413, headers: privateHeaders }); }
    chunks.push(chunk.value);
  }
  let data;
  try { data = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return NextResponse.json({ error: "invalid_message" }, { status: 400, headers: privateHeaders }); }
  if (!data || typeof data !== "object" || typeof data.message !== "string" || !data.message.trim() || data.message.length > 2000 || typeof data.subject !== "string" || data.subject.length > 200 || !Array.isArray(data.context) || data.context.length > 80 || data.context.some((text: unknown) => typeof text !== "string" || text.length > 2000)) return NextResponse.json({ error: "invalid_message" }, { status: 400, headers: privateHeaders });
  try {
    const delivered = await fetch(delivery.url, { method: "POST", redirect: "error", signal: AbortSignal.timeout(15000), headers: { "Content-Type": "application/json", ...(delivery.token ? { Authorization: `Bearer ${delivery.token}` } : {}) }, body: JSON.stringify({ recipient: "patrick-chassany", sender: member, subject: data.subject.trim(), message: data.message.trim(), context: data.context }) });
    if (!delivered.ok) throw new Error("Delivery rejected.");
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch { return NextResponse.json({ error: "delivery_failed" }, { status: 502, headers: privateHeaders }); }
}

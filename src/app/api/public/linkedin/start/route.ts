import { NextRequest, NextResponse } from "next/server";
import { authCookieOptions, beginLinkedin, linkedinConfig, LINKEDIN_TRANSACTION_COOKIE, privateHeaders, sameOrigin } from "@/lib/public-linkedin";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers: privateHeaders });
  const config = linkedinConfig();
  if (!config) return NextResponse.json({ error: "not_configured" }, { status: 503, headers: privateHeaders });
  const { transaction, url } = await beginLinkedin();
  const response = NextResponse.json({ url }, { headers: privateHeaders });
  response.cookies.set(LINKEDIN_TRANSACTION_COOKIE, transaction, authCookieOptions(config.secure, 600));
  return response;
}

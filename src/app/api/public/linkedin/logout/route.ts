import { NextRequest, NextResponse } from "next/server";
import { authCookieOptions, linkedinConfig, LINKEDIN_SESSION_COOKIE, LINKEDIN_TRANSACTION_COOKIE, privateHeaders, sameOrigin } from "@/lib/public-linkedin";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers: privateHeaders });
  const response = NextResponse.json({ ok: true }, { headers: privateHeaders });
  const options = authCookieOptions(linkedinConfig()?.secure ?? request.nextUrl.protocol === "https:", 0);
  response.cookies.set(LINKEDIN_SESSION_COOKIE, "", options);
  response.cookies.set(LINKEDIN_TRANSACTION_COOKIE, "", options);
  return response;
}

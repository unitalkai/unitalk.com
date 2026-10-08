import { NextRequest, NextResponse } from "next/server";
import { linkedinConfig, LINKEDIN_SESSION_COOKIE, messageDeliveryConfig, privateHeaders, PUBLIC_CALENDLY_URL, readLinkedinMember } from "@/lib/public-linkedin";

export async function GET(request: NextRequest) {
  const member = await readLinkedinMember(request.cookies.get(LINKEDIN_SESSION_COOKIE)?.value);
  return NextResponse.json({ ready: Boolean(linkedinConfig()), member, messageDeliveryReady: Boolean(messageDeliveryConfig()), ...(member ? { calendarUrl: PUBLIC_CALENDLY_URL } : {}) }, { headers: privateHeaders });
}

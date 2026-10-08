import { NextRequest, NextResponse } from "next/server";
import { authCookieOptions, finishLinkedin, linkedinConfig, LINKEDIN_SESSION_COOKIE, LINKEDIN_TRANSACTION_COOKIE } from "@/lib/public-linkedin";

export async function GET(request: NextRequest) {
  const config = linkedinConfig();
  const origin = config?.origin ?? request.nextUrl.origin;
  let session: string | null = null;
  try {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const transaction = request.cookies.get(LINKEDIN_TRANSACTION_COOKIE)?.value;
    if (!config || request.nextUrl.searchParams.has("error") || !code || !state || !transaction) throw new Error("Invalid callback.");
    session = (await finishLinkedin(code, state, transaction)).session;
  } catch { /* Provider failures return no tokens or sensitive details to the browser. */ }
  const nonce = crypto.randomUUID();
  const result = session ? "success" : "failed";
  const response = new NextResponse(`<!doctype html><html lang="en"><meta charset="utf-8"><title>LinkedIn sign-in</title><body><p>${session ? "Signed in. You can return to Patrick’s page." : "Sign-in could not be completed. Return to Patrick’s page and try again."}</p><a href="/@patrick-chassany">Return to Patrick’s page</a><script nonce="${nonce}">if(window.opener){window.opener.postMessage({type:"unitalk-linkedin",result:${JSON.stringify(result)}},${JSON.stringify(origin)});window.close();}</script></body></html>`, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'` },
  });
  response.cookies.set(LINKEDIN_TRANSACTION_COOKIE, "", authCookieOptions(config?.secure ?? request.nextUrl.protocol === "https:", 0));
  if (session) response.cookies.set(LINKEDIN_SESSION_COOKIE, session, authCookieOptions(config!.secure, 3600));
  return response;
}

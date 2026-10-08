import { randomBytes, timingSafeEqual } from "node:crypto";
import { createRemoteJWKSet, EncryptJWT, jwtDecrypt, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export const LINKEDIN_SESSION_COOKIE = "unitalk_public_linkedin";
export const LINKEDIN_TRANSACTION_COOKIE = "unitalk_linkedin_transaction";
export const PUBLIC_CALENDLY_URL = "https://calendly.com/patrick-chassany";
const issuer = "unitalk-public-linkedin";
const keys = createRemoteJWKSet(new URL("https://www.linkedin.com/oauth/openid/jwks"));
export type LinkedInMember = { subject: string; name: string; email?: string };

export function linkedinConfig() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const secret = process.env.PUBLIC_AUTH_SECRET;
  const callback = process.env.LINKEDIN_REDIRECT_URI;
  if (!clientId || !clientSecret || !secret || !callback) return null;
  let key: Buffer;
  let redirect: URL;
  try { key = Buffer.from(secret, "base64url"); redirect = new URL(callback); } catch { return null; }
  if (key.length !== 32 || redirect.pathname !== "/api/public/linkedin/callback" || redirect.search || redirect.hash) return null;
  if (redirect.protocol !== "https:" && !(redirect.protocol === "http:" && ["localhost", "127.0.0.1"].includes(redirect.hostname))) return null;
  return { clientId, clientSecret, key, redirectUri: redirect.href, origin: redirect.origin, secure: redirect.protocol === "https:" };
}

export function sameOrigin(request: NextRequest) {
  const config = linkedinConfig();
  const localOrigin = `${request.nextUrl.protocol}//${request.headers.get("host")}`;
  return request.headers.get("origin") === (config?.origin ?? localOrigin);
}

export const privateHeaders = { "Cache-Control": "no-store, private", "Vary": "Cookie" };
export function authCookieOptions(secure: boolean, maxAge: number) {
  return { httpOnly: true, secure, sameSite: "lax" as const, path: "/api/public", maxAge };
}

async function seal(data: Record<string, unknown>, purpose: "transaction" | "session", seconds: number) {
  const config = linkedinConfig();
  if (!config) throw new Error("LinkedIn is not configured.");
  return new EncryptJWT(data).setProtectedHeader({ alg: "dir", enc: "A256GCM" }).setIssuer(issuer).setAudience(purpose).setIssuedAt().setExpirationTime(`${seconds}s`).encrypt(config.key);
}

async function unseal(token: string, purpose: "transaction" | "session") {
  const config = linkedinConfig();
  if (!config) return null;
  try { return (await jwtDecrypt(token, config.key, { issuer, audience: purpose, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: ["A256GCM"] })).payload; } catch { return null; }
}

export async function beginLinkedin() {
  const config = linkedinConfig();
  if (!config) throw new Error("LinkedIn is not configured.");
  const state = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  const transaction = await seal({ state, nonce }, "transaction", 600);
  const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
  url.search = new URLSearchParams({ response_type: "code", client_id: config.clientId, redirect_uri: config.redirectUri, scope: "openid profile email", state, nonce }).toString();
  return { transaction, url: url.href };
}

export async function finishLinkedin(code: string, state: string, transaction: string) {
  const config = linkedinConfig();
  const pending = await unseal(transaction, "transaction");
  if (!config || !pending || typeof pending.state !== "string" || typeof pending.nonce !== "string") throw new Error("Invalid sign-in transaction.");
  const received = Buffer.from(state);
  const expected = Buffer.from(pending.state);
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) throw new Error("Invalid sign-in state.");
  const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST", cache: "no-store", signal: AbortSignal.timeout(15000),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, client_id: config.clientId, client_secret: config.clientSecret, redirect_uri: config.redirectUri }),
  });
  if (!tokenResponse.ok) throw new Error("LinkedIn sign-in failed.");
  const tokens = await tokenResponse.json();
  if (typeof tokens.id_token !== "string" || typeof tokens.access_token !== "string") throw new Error("Missing LinkedIn token.");
  // LinkedIn's published discovery document is authoritative for the issuer.
  const discoveryResponse = await fetch("https://www.linkedin.com/oauth/.well-known/openid-configuration", { cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!discoveryResponse.ok) throw new Error("LinkedIn metadata unavailable.");
  const discovery = await discoveryResponse.json();
  if (!["https://www.linkedin.com", "https://www.linkedin.com/oauth"].includes(discovery.issuer)) throw new Error("Unexpected LinkedIn issuer.");
  const { payload } = await jwtVerify(tokens.id_token, keys, { algorithms: ["RS256"], issuer: discovery.issuer, audience: config.clientId, requiredClaims: ["sub", "iat", "exp", "nonce"], maxTokenAge: "10m" });
  if (payload.nonce !== pending.nonce || !payload.sub) throw new Error("Invalid LinkedIn nonce.");
  const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${tokens.access_token}` }, cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!profileResponse.ok) throw new Error("LinkedIn profile unavailable.");
  const profile = await profileResponse.json();
  if (profile.sub !== payload.sub || typeof profile.name !== "string" || !profile.name.trim()) throw new Error("LinkedIn profile mismatch.");
  const member: LinkedInMember = { subject: payload.sub, name: profile.name.slice(0, 150), ...(typeof profile.email === "string" && profile.email_verified === true ? { email: profile.email.slice(0, 254) } : {}) };
  return { member, session: await seal(member, "session", 3600) };
}

export async function readLinkedinMember(token?: string): Promise<LinkedInMember | null> {
  if (!token) return null;
  const data = await unseal(token, "session");
  if (!data || typeof data.subject !== "string" || typeof data.name !== "string") return null;
  return { subject: data.subject, name: data.name, ...(typeof data.email === "string" ? { email: data.email } : {}) };
}

export function messageDeliveryConfig() {
  try {
    const url = new URL(process.env.PUBLIC_MESSAGE_WEBHOOK_URL ?? "");
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return { url: url.href, token: process.env.PUBLIC_MESSAGE_WEBHOOK_TOKEN };
  } catch { return null; }
}

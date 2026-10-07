import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SignupForm } from "@/components/signup-form";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";
import { marketingMetadata } from "@/lib/marketing-language";
import "../home.css";

export const metadata: Metadata = { ...marketingMetadata("/signup", "en", "Sign up — Start for free", "Start signup for your AI Collaborator. Choose a first mission and your optional setup preferences."), robots: { index: false, follow: false } };

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const query = await searchParams;
  const preferences = readCollaboratorPreferences(query);
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const channel = query.channel === "linkedin" ? "LinkedIn" : undefined;
  return <div lang="en" className="marketing-signup"><SiteHeader language="en" /><main id="main-content" className="meet-main content-container"><SignupForm key={`${initialUrl ?? ""}:${channel ?? ""}:${JSON.stringify(preferences)}`} initialUrl={initialUrl} initialChannel={channel} preferences={preferences} /></main><SiteFooter language="en" /></div>;
}

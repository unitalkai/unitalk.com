import type { Metadata } from "next";
import { SignupForm } from "@/components/signup-form";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";
import { marketingMetadata } from "@/lib/marketing-language";
import "../signup.css";

export const metadata: Metadata = { ...marketingMetadata("/signup", "en", "Sign up — Start for free", "Start signup for your AI Collaborator. Choose a first mission and your optional setup preferences."), robots: { index: false, follow: false } };

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const query = await searchParams;
  const preferences = readCollaboratorPreferences(query);
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const channel = query.channel === "linkedin" ? "LinkedIn" : undefined;
  return <div lang="en" className="signup-page"><SignupForm key={`${initialUrl ?? ""}:${channel ?? ""}:${JSON.stringify(preferences)}`} initialUrl={initialUrl} initialChannel={channel} preferences={preferences} /></div>;
}
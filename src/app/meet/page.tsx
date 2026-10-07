import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnglishEncounter } from "@/components/english-encounter";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";
import "../home.css";

export const metadata: Metadata = { title: "Meet your AI Collaborator", description: "Start with one mission and explore what your own AI Collaborator could prepare.", robots: { index: false, follow: false } };

export default async function MeetPage({ searchParams }: PageProps<"/meet">) {
  const query = await searchParams;
  const preferences = readCollaboratorPreferences(query);
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const channel = query.channel === "linkedin" ? "LinkedIn" : undefined;
  return <div lang="en" className="marketing-meet"><SiteHeader language="en" /><main id="main-content" className="meet-main content-container"><EnglishEncounter key={`${initialUrl ?? ""}:${channel ?? ""}:${JSON.stringify(preferences)}`} initialUrl={initialUrl} initialChannel={channel} preferences={preferences} /></main><SiteFooter language="en" /></div>;
}

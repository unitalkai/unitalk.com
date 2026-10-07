import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnglishEncounter } from "@/components/english-encounter";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";
import { marketingMetadata } from "@/lib/marketing-language";
import "../../home.css";

export const metadata = { ...marketingMetadata("/meet", "fr", "Rencontrez votre Collaborateur IA", "Commencez par une mission et découvrez ce que votre Collaborateur IA pourrait préparer."), robots: { index: false, follow: false } };

export default async function FrenchMeetPage({ searchParams }: PageProps<"/fr/meet">) {
  const query = await searchParams;
  const preferences = readCollaboratorPreferences(query);
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const channel = query.channel === "linkedin" ? "LinkedIn" : undefined;
  return <div lang="fr" className="marketing-meet"><SiteHeader language="fr" /><main id="main-content" className="meet-main content-container"><EnglishEncounter key={`fr:${initialUrl ?? ""}:${channel ?? ""}:${JSON.stringify(preferences)}`} language="fr" initialUrl={initialUrl} initialChannel={channel} preferences={preferences} /></main><SiteFooter language="fr" /></div>;
}

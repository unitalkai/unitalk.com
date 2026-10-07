import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SignupForm } from "@/components/signup-form";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";
import { marketingMetadata } from "@/lib/marketing-language";
import "../../home.css";

export const metadata = { ...marketingMetadata("/signup", "fr", "Inscription — Commencez gratuitement", "Commencez votre inscription pour votre Collaborateur IA. Choisissez une première mission et vos options de configuration."), robots: { index: false, follow: false } };

export default async function FrenchSignupPage({ searchParams }: PageProps<"/fr/signup">) {
  const query = await searchParams;
  const preferences = readCollaboratorPreferences(query);
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const channel = query.channel === "linkedin" ? "LinkedIn" : undefined;
  return <div lang="fr" className="marketing-signup"><SiteHeader language="fr" /><main id="main-content" className="meet-main content-container"><SignupForm key={`fr:${initialUrl ?? ""}:${channel ?? ""}:${JSON.stringify(preferences)}`} language="fr" initialUrl={initialUrl} initialChannel={channel} preferences={preferences} /></main><SiteFooter language="fr" /></div>;
}

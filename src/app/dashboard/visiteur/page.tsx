import type { Metadata } from "next";
import { VisitorDashboard } from "@/components/visitor-dashboard";
import { SiteHeader, DemoNotice } from "@/components/site-shell";
import { readCollaboratorPreferences } from "@/lib/collaborator-offer";

export const metadata: Metadata = { title: "Espace visiteur — Démo", robots: { index: false, follow: false } };

export default async function VisitorPage({ searchParams }: PageProps<"/dashboard/visiteur">) {
  const query = await searchParams;
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  const startEncounter = query.rencontre === "1";
  const preferences = readCollaboratorPreferences(query);
  return <><SiteHeader role="visiteur" /><DemoNotice role="visiteur" /><VisitorDashboard key={`${startEncounter ? "encounter" : "visitor"}:${JSON.stringify(preferences)}`} initialUrl={initialUrl} startEncounter={startEncounter} preferences={preferences} /></>;
}

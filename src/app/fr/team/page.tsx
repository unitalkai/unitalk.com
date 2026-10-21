import { SharedWorkspace } from "@/components/shared-workspace";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/team", "fr", "Your team — Votre équipe, vos agents IA et vos projets", "Un espace commun pour votre équipe et ses agents IA spécialisés : échanges, planification, gestion de projet, Git, revues de code et pull requests.");
export default function TeamPage() { return <SharedWorkspace key="team-fr" mode="team" language="fr" />; }

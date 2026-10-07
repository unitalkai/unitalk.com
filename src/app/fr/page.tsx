import { MarketingHome } from "@/components/marketing-home";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/", "fr", "Votre Collaborateur IA. Il travaille pour vous.", "Votre Collaborateur IA. Il travaille pour vous. Des suivis préparés, des opportunités clarifiées, des rendez-vous prêts. Rencontrez le vôtre et gardez le dernier mot.");

export default function FrenchHome() { return <MarketingHome language="fr" />; }

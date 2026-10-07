import { MarketingGuide } from "@/components/marketing-guide";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/how-it-works", "fr", "Comment ça marche — Rencontrez votre Collaborateur", "Rencontrez votre Collaborateur IA. Connectez vos canaux, donnez-lui des connaissances et des outils, fixez ses limites et laissez-le travailler pour vous.");
export default function FrenchGuide() { return <MarketingGuide language="fr" />; }

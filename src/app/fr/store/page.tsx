import { MarketingStore } from "@/components/marketing-store";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/store", "fr", "Boutique — Plus de possibilités", "Explorez les applications, outils, compétences et configurations de Collaborateurs des dépôts publics de Unitalk.");
export default function FrenchStorePage() { return <MarketingStore language="fr" />; }

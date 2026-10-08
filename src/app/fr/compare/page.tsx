import { ComparePage } from "@/components/compare-page";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/compare", "fr", "Comparer — Qu’est-ce que ça change ?", "Comparez les outils IA selon le travail confié, le contexte, les échanges avec vos contacts et le contrôle. Découvrez le parti pris du Collaborateur IA Unitalk.");

export default function FrenchComparePage() {
  return <ComparePage language="fr" />;
}

import { MarketingPricing } from "@/components/marketing-pricing";
import { marketingMetadata, localizedOffer } from "@/lib/marketing-language";

const offer = localizedOffer("fr");
export const metadata = marketingMetadata("/pricing", "fr", `Tarifs — Votre Collaborateur dès ${offer.monthly}/mois`, `Votre Collaborateur IA pour ${offer.monthly}/mois ou ${offer.annual}/an. Choisissez son intelligence, son hébergement et son autorité.`);
export default function FrenchPricing() { return <MarketingPricing language="fr" />; }

import { MarketingPrivacy } from "@/components/marketing-privacy";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/privacy", "fr", "Confidentialité — Votre contexte. Votre contrôle.", "Comprenez les permissions, la mémoire, les espaces publics et privés, les choix d’hébergement et les informations conservées sur ce site.");
export default function FrenchPrivacyPage() { return <MarketingPrivacy language="fr" />; }

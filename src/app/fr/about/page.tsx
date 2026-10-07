import { MarketingAbout } from "@/components/marketing-about";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/about", "fr", "À propos — Une intelligence qui vous appartient", "La vision de Patrick Chassany pour Unitalk : des noms de domaine et de l’hébergement chez AMEN en 1999 aux Collaborateurs IA qui vous appartiennent aujourd’hui.");
export default function FrenchAboutPage() { return <MarketingAbout language="fr" />; }

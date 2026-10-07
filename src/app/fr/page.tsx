import { MarketingHome } from "@/components/marketing-home";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/", "fr", "Votre Collaborateur IA. Il garde le fil de vos relations.", "Vos contacts, leur histoire et les prochaines étapes. Un Collaborateur IA pour suivre les relations, avec 5 millions de tokens inclus chaque mois. Vous gardez les décisions.");

export default function FrenchHome() { return <MarketingHome language="fr" />; }

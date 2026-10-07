import { MarketingBusinesses } from "@/components/marketing-businesses";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/for-businesses", "fr", "Pour les entreprises — Commençons par votre site", "Indiquez le domaine de votre entreprise et explorez une première mission pour votre Collaborateur. Découvrez Unitalk pour les entreprises.");
export default function FrenchBusinessesPage() { return <MarketingBusinesses language="fr" />; }

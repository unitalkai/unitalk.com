import { CustomerLogin } from "@/components/customer-login";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = { ...marketingMetadata("/login", "fr", "Connexion — Clients Unitalk", "Connectez-vous à votre compte Unitalk existant."), robots: { index: false, follow: false } };
export default function FrenchLoginPage() { return <CustomerLogin language="fr" />; }

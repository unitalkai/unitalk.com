import { MarketingForYou } from "@/components/marketing-for-you";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/for-you", "fr", "For you — Votre Collaborateur IA pour vendre et suivre vos clients", "Découvrez un Collaborateur IA conçu pour prospecter par email et téléphone, prendre rendez-vous, vendre des Collaborateurs IA, du code, des contenus ou des missions, encaisser et suivre clients et affiliés.");
export default function ForYouPage() { return <MarketingForYou language="fr" />; }

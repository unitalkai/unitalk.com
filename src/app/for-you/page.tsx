import { MarketingForYou } from "@/components/marketing-for-you";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/for-you", "en", "For you — Your AI Collaborator for sales and customer relationships", "Explore an AI Collaborator designed for email and phone outreach, appointments, selling AI Collaborators, code, content and missions, payments, affiliates and customer relationships.");
export default function ForYouPage() { return <MarketingForYou />; }

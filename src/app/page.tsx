import { MarketingHome } from "@/components/marketing-home";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/", "en", "Your AI Collaborator. It keeps your relationships moving.", "Your contacts, their history and their next steps. An AI Collaborator to follow relationships, with 5 million tokens included each month. You keep the decisions.");

export default function Home() { return <MarketingHome />; }

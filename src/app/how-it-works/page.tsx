import { MarketingGuide } from "@/components/marketing-guide";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/how-it-works", "en", "How it works — Meet your Collaborator", "Meet your AI Collaborator. Connect your channels, give it knowledge and tools, set its authority, and let it keep working for you.");
export default function HowItWorksPage() { return <MarketingGuide />; }

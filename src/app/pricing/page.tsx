import { MarketingPricing } from "@/components/marketing-pricing";
import { marketingMetadata, localizedOffer } from "@/lib/marketing-language";

const offer = localizedOffer("en");
export const metadata = marketingMetadata("/pricing", "en", `Pricing — Your Collaborator from ${offer.monthly}/month`, `Your relationship-focused AI Collaborator for ${offer.monthly}/month or ${offer.annual}/year. ${offer.monthlyTokens} Optional hosted CRM and support apps.`);
export default function PricingPage() { return <MarketingPricing />; }

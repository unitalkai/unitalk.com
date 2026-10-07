import { MarketingPricing } from "@/components/marketing-pricing";
import { marketingMetadata, localizedOffer } from "@/lib/marketing-language";

const offer = localizedOffer("en");
export const metadata = marketingMetadata("/pricing", "en", `Pricing — Your Collaborator from ${offer.monthly}/month`, `Your own AI Collaborator for ${offer.monthly}/month or ${offer.annual}/year. Choose your intelligence, hosting and authority. Own your intelligence.`);
export default function PricingPage() { return <MarketingPricing />; }

import { MarketingStore } from "@/components/marketing-store";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/store", "en", "Store — More ways to work", "Explore public apps, tools, skills and Collaborator configurations from Unitalk’s repositories.");
export default function StorePage() { return <MarketingStore />; }

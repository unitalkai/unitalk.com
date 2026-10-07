import { MarketingBusinesses } from "@/components/marketing-businesses";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/for-businesses", "en", "For businesses — Start with your website", "Start with your business domain and explore a first Collaborator mission. Discover Unitalk for businesses.");
export default function BusinessesPage() { return <MarketingBusinesses />; }

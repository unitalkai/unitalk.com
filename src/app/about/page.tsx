import { MarketingAbout } from "@/components/marketing-about";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/about", "en", "About — Own your intelligence", "Patrick Chassany’s vision for Unitalk: from domain names and web hosting at AMEN in 1999 to AI Collaborators you own today.");
export default function AboutPage() { return <MarketingAbout />; }

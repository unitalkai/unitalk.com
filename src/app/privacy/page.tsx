import { MarketingPrivacy } from "@/components/marketing-privacy";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/privacy", "en", "Privacy — Your context. Your control.", "Understand your Collaborator’s permissions, public and private context, memory, hosting choices and the information this site stores.");
export default function PrivacyPage() { return <MarketingPrivacy />; }

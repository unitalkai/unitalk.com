import { MarketingHome } from "@/components/marketing-home";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/", "en", "Your AI Collaborator. It works for you.", "Your AI Collaborator. It works for you. Follow-ups prepared. Opportunities clarified. Meetings ready. See the work, meet yours, and keep the final say.");

export default function Home() { return <MarketingHome />; }

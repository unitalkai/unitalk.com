import { SharedWorkspace } from "@/components/shared-workspace";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/team", "en", "Your team — People, AI agents and projects together", "A shared workspace for your team and specialized AI agents: conversations, planning, project management, Git, code reviews and pull requests.");
export default function TeamPage() { return <SharedWorkspace key="team-en" mode="team" language="en" />; }

import { SharedWorkspace } from "@/components/shared-workspace";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/community", "en", "Your community — A forum for your audience", "Bring your audience together in a discussion forum with an AI Collaborator for moderation, relevant topic digests and member questions. Explore a content creator’s example community.");
export default function CommunityPage() { return <SharedWorkspace key="community-en" mode="community" language="en" />; }

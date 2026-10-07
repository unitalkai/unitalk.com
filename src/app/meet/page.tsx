import { permanentRedirect } from "next/navigation";
import { readCollaboratorPreferences, signupLink } from "@/lib/collaborator-offer";

export default async function LegacyMeetPage({ searchParams }: PageProps<"/meet">) {
  const query = await searchParams;
  permanentRedirect(signupLink(readCollaboratorPreferences(query), "en", {
    channel: query.channel === "linkedin" ? "linkedin" : undefined,
    url: typeof query.url === "string" ? query.url : undefined,
  }));
}

import { permanentRedirect } from "next/navigation";
import { readCollaboratorPreferences, signupLink } from "@/lib/collaborator-offer";

export default async function LegacyFrenchMeetPage({ searchParams }: PageProps<"/fr/meet">) {
  const query = await searchParams;
  permanentRedirect(signupLink(readCollaboratorPreferences(query), "fr", {
    channel: query.channel === "linkedin" ? "linkedin" : undefined,
    url: typeof query.url === "string" ? query.url : undefined,
  }));
}

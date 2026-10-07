import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PublicCollaborator } from "@/components/public-collaborator";

export function generateStaticParams() {
  return [{ profile: "@patrick-chassany" }];
}

export async function generateMetadata({ params }: PageProps<"/[profile]">): Promise<Metadata> {
  const { profile } = await params;
  if (profile !== "@patrick-chassany" && profile !== "%40patrick-chassany") return {};
  return {
    title: { absolute: "Patrick Chassany — Here’s how to interact with me" },
    description: "Meet Patrick’s public AI Collaborator. Ask a question, explore his work or prepare a meeting in this interactive demo.",
    alternates: { canonical: "/@patrick-chassany" },
    openGraph: { type: "website", title: "Patrick Chassany — His public AI Collaborator", description: "Here’s how to interact with me. Meet Patrick’s Collaborator in an interactive demo.", url: "https://unitalk.com/@patrick-chassany", locale: "en_GB" },
    twitter: { card: "summary", title: "Patrick Chassany — His public AI Collaborator", description: "Here’s how to interact with me. Meet Patrick’s Collaborator in an interactive demo." },
  };
}

export default async function PublicProfile({ params }: PageProps<"/[profile]">) {
  const { profile } = await params;
  if (profile === "@patrick" || profile === "%40patrick") permanentRedirect("/@patrick-chassany");
  if (profile !== "@patrick-chassany" && profile !== "%40patrick-chassany") notFound();

  return <PublicCollaborator />;
}

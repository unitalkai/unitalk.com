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
    title: { absolute: "Patrick Chassany — His AI Collaborator" },
    description: "Ask Patrick’s AI Collaborator anything, prepare a meeting, leave a message or start a connection.",
    alternates: { canonical: "/@patrick-chassany" },
    openGraph: { type: "website", title: "Patrick Chassany — His public AI Collaborator", description: "Ask, meet, message or connect with Patrick’s AI Collaborator.", url: "https://unitalk.com/@patrick-chassany", locale: "en_GB" },
    twitter: { card: "summary", title: "Patrick Chassany — His public AI Collaborator", description: "Ask, meet, message or connect with Patrick’s AI Collaborator." },
  };
}

export default async function PublicProfile({ params }: PageProps<"/[profile]">) {
  const { profile } = await params;
  if (profile === "@patrick" || profile === "%40patrick") permanentRedirect("/@patrick-chassany");
  if (profile !== "@patrick-chassany" && profile !== "%40patrick-chassany") notFound();

  return <PublicCollaborator />;
}

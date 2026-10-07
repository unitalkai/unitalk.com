import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Conversation } from "@/components/conversation";
import { Icon } from "@/components/icons";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export function generateStaticParams() {
  return [{ profile: "@patrick-chassany" }];
}

export async function generateMetadata({ params }: PageProps<"/[profile]">): Promise<Metadata> {
  const { profile } = await params;
  if (profile !== "@patrick-chassany" && profile !== "%40patrick-chassany") return {};
  return { title: "Le Collaborateur IA de Patrick Chassany", alternates: { canonical: "/@patrick-chassany" }, openGraph: { type: "profile", title: "Patrick Chassany — Collaborateur IA", description: "Découvrez les connaissances professionnelles publiques du Collaborateur de Patrick dans une conversation de démonstration.", url: "https://unitalk.com/@patrick-chassany" } };
}

export default async function PublicProfile({ params }: PageProps<"/[profile]">) {
  const { profile } = await params;
  if (profile !== "@patrick-chassany" && profile !== "%40patrick-chassany") notFound();

  return <><SiteHeader /><main id="main-content" className="public-main content-container"><section className="public-intro"><span className="avatar avatar-profile">PC</span><h1>Le Collaborateur<br />de <span>Patrick<br /> Chassany.</span></h1><p className="public-role">Collaborateur IA public</p><p>Les connaissances professionnelles de Patrick. Son travail, ses entreprises et ses idées. Une autre façon de le rencontrer.</p><div className="public-topics"><span>Unitalk</span><span>Entrepreneuriat</span><span>Le travail de Patrick</span></div><p className="public-demo"><span className="demo-label">Démo interactive</span>Les réponses de cet aperçu sont prédéfinies. Aucune mission réelle n’est exécutée.</p><Link className="text-link" href="/dashboard/visiteur">Retrouver mon espace visiteur <Icon name="arrow" /></Link></section><section className="public-chat" aria-label="Parler au Collaborateur de Patrick"><Conversation /></section></main><section className="public-create"><h2>Vous aussi,<br /><span>vous pouvez avoir le vôtre.</span></h2><Link className="button button-primary" href="/#creer">Commencer avec mon URL <Icon name="arrow" /></Link></section><SiteFooter /></>;
}

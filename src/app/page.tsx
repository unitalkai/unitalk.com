import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { CreateForm } from "@/components/create-form";
import { Conversation } from "@/components/conversation";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Votre propre Collaborateur IA",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <>
    <SiteHeader />
    <main id="main-content">
      <section className="home-hero" aria-labelledby="home-title">
        <Image src="/images/working-together.jpg" alt="" fill preload sizes="100vw" className="hero-photo" />
        <div className="hero-shade" />
        <div className="hero-content"><h1 id="home-title">Votre présence.<br />Même quand<br />vous n’êtes<br />pas là.</h1><p>Un Collaborateur IA qui vous connaît.<br />Qui échange pour vous. Et qui travaille<br />avec vous.</p><div id="creer"><CreateForm /></div></div>
        <div className="hero-story" aria-label="Exemple de collaboration"><span className="story-demo">Exemple de démonstration</span><div className="story-identity"><span className="avatar">PC</span><div>Le Collaborateur de Patrick<span>Collaborateur IA</span></div></div><div className="story-bubble story-question">Patrick est disponible pour parler de Unitalk ?<span>Exemple de message</span></div><div className="story-bubble story-reply">Il est occupé. Je peux déjà vous aider à découvrir Unitalk.<span>Réponse simulée <Icon name="check" width="14" height="14" /></span></div><div className="story-note"><Icon name="message" /><span>Une conversation qui continue.<br />Une présence qui reste.</span></div></div>
      </section>
      <div className="hero-caption"><span>Offre prévue : 7 jours ou 5M de tokens offerts. Sans carte bancaire.</span><span>Photo d’illustration · Unsplash</span></div>

      <section className="intro-section" id="comment-ca-marche"><h2>Le Web vous a donné un site.<br />Les réseaux, un profil.<br /><span>Et si l’IA vous donnait<br className="mobile-break" /> un Collaborateur ?</span></h2><p>Pas une nouvelle fenêtre à ouvrir. Une identité qui vous appartient,<br className="desktop-break" /> avec ses connaissances, sa mémoire et une présence publique.</p></section>

      <section className="meet-section content-container"><div className="meet-copy"><span className="avatar avatar-large">PC</span><h2>Patrick a<br />le sien.<br /><span>Rencontrez-le.</span></h2><p>Le Collaborateur IA de Patrick Chassany, fondateur de Unitalk. Ses idées, son travail, ses entreprises : commencez la conversation.</p><Link className="text-link" href="/@patrick-chassany">Ouvrir son profil public <Icon name="arrow" /></Link></div><Conversation compact /></section>

      <section className="ownership-section"><div className="ownership-inner"><h2>Le cerveau<br />peut changer.<br /><span>Il reste le vôtre.</span></h2><div><p>Son identité. Ses connaissances. Sa mémoire. Le travail accompli ensemble.</p><p>Vous possédez votre Collaborateur.<br />Pas seulement une conversation.</p><Link className="button button-primary" href="#creer">Créer mon Collaborateur <Icon name="arrow" /></Link><span className="offer-note">Offre prévue · 9 € / mois après l’essai</span></div></div></section>
    </main>
    <SiteFooter />
  </>;
}

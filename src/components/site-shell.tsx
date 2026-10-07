"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";
import { EncounterLink } from "./collaborator-offer-context";

export function Brand({ language = "fr" }: { language?: "fr" | "en" }) {
  return <Link className="brand" href="/" aria-label={language === "en" ? "Unitalk — home" : "Unitalk — accueil"}><Icon name="message" width="31" height="31" /><span>unitalk</span></Link>;
}

export function SiteHeader({ role, language = "fr" }: { role?: "patrick" | "visiteur"; language?: "fr" | "en" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const english = language === "en";
  const links = english ? [
    { href: "/how-it-works", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "#privacy", label: "Privacy" },
  ] : [
    { href: "/", label: "Accueil" },
    { href: "/@patrick-chassany", label: "Le Collaborateur de Patrick" },
  ];

  return <header className="site-header">
    <div className={`header-inner${english ? " marketing-header" : ""}`}>
      <Brand language={language} />
      <nav className="desktop-nav" aria-label={english ? "Main navigation" : "Navigation principale"}>
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        {!english && <Link href="/how-it-works">Comment ça marche</Link>}
      </nav>
      <div className="header-actions">
        {role ? <div className="account-pill"><span className="avatar avatar-small">{role === "patrick" ? "PC" : "V"}</span><span>{role === "patrick" ? "Patrick" : "Visiteur"}</span><span className="demo-label">Démo</span></div> : <details className="account-menu">
          <summary className="button button-outline button-small">{english ? "Log in" : "Se connecter"} <Icon name="chevron" /></summary>
          <div className="account-dropdown"><p>{english ? "Choose a demo workspace" : "Choisir un espace de démonstration"}</p><Link href="/dashboard/patrick">{english ? "Patrick’s workspace" : "Espace Patrick"} <Icon name="arrow" /></Link><Link href="/dashboard/visiteur">{english ? "Visitor workspace" : "Espace visiteur"} <Icon name="arrow" /></Link></div>
        </details>}
        <EncounterLink className="button button-primary button-small header-create">{english ? "Get your Collaborator" : "Rencontrer le mien"} <Icon name="arrow" /></EncounterLink>
        <button className="icon-button mobile-menu-toggle" aria-label={english ? (open ? "Close navigation" : "Open navigation") : (open ? "Fermer la navigation" : "Ouvrir la navigation")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label={english ? "Mobile navigation" : "Navigation mobile"}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}
      <EncounterLink onClick={() => setOpen(false)}>{english ? "Get your Collaborator" : "Rencontrer mon Collaborateur"}<Icon name="arrow" /></EncounterLink>
      <Link href="/dashboard/patrick" onClick={() => setOpen(false)}>{english ? "Patrick’s workspace" : "Espace Patrick"} <span className="demo-label">{english ? "Demo" : "Démo"}</span></Link>
      <Link href="/dashboard/visiteur" onClick={() => setOpen(false)}>{english ? "Visitor workspace" : "Espace visiteur"} <span className="demo-label">{english ? "Demo" : "Démo"}</span></Link>
    </nav>}
  </header>;
}

export function SiteFooter({ language = "fr" }: { language?: "fr" | "en" }) {
  if (language === "en") return <footer className="site-footer marketing-footer">
    <div className="footer-inner"><div><Brand language="en" /><p>Create and deploy<br />AI Collaborators you own.</p></div><nav aria-label="Footer navigation"><Link href="/how-it-works">Product <Icon name="arrow" /></Link><Link href="/pricing">Pricing <Icon name="arrow" /></Link><Link href="#privacy">Privacy <Icon name="arrow" /></Link><Link href="#terms">Terms <Icon name="arrow" /></Link></nav></div>
    <div className="footer-information">
      <section id="privacy"><details><summary>Privacy in this preview <Icon name="plus" /></summary><p>Conversations and encounter inputs are held in the page’s memory. This prototype does not connect to your LinkedIn, email, WhatsApp or AI accounts, and it does not import your history. Hosting and billing preferences may appear in the page URL; never enter secrets there. Normal page requests are still handled by the website host.</p></details></section>
      <section id="terms"><details><summary>About this product preview <Icon name="plus" /></summary><p>The listed plans and deployment choices describe the intended offer. This demo does not take payment, start a subscription or deploy an AI runtime. Commercial terms for the paid service are not yet published here.</p></details></section>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span><span>Interactive prototype · AI activity is simulated</span></div>
  </footer>;
  return <footer className="site-footer"><div className="footer-inner"><div><Brand /><p>Il travaille pour vous.<br />Il vous appartient.</p></div><nav aria-label="Navigation de pied de page"><Link href="/@patrick-chassany">Le Collaborateur de Patrick <Icon name="arrow" /></Link><Link href="/dashboard/patrick">Dashboard Patrick <span>Démo</span></Link><Link href="/dashboard/visiteur">Dashboard visiteur <span>Démo</span></Link></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span><span>Prototype interactif · fonctions IA simulées</span></div></footer>;
}

export function DemoNotice({ role }: { role: "patrick" | "visiteur" }) {
  return <div className="demo-notice"><span className="demo-label">Mode démo</span><span>Espace {role === "patrick" ? "Patrick" : "visiteur"} · connexion simulée, données d’exemple.</span><Link href="/">Quitter la démo <Icon name="arrow" /></Link></div>;
}

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
        {role ? <div className="account-pill"><span className="avatar avatar-small">{role === "patrick" ? "PC" : "V"}</span><span>{role === "patrick" ? "Patrick" : "Visiteur"}</span><span className="demo-label">Démo</span></div> : <Link href="/login" className="button button-outline button-small customer-login" aria-current={pathname === "/login" ? "page" : undefined}>{english ? "Log in" : "Se connecter"}</Link>}
        <EncounterLink language={language} className="button button-primary button-small header-create">{english ? "Meet your Collaborator" : "Rencontrer le mien"} <Icon name="arrow" /></EncounterLink>
        <button className="icon-button mobile-menu-toggle" aria-label={english ? (open ? "Close navigation" : "Open navigation") : (open ? "Fermer la navigation" : "Ouvrir la navigation")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label={english ? "Mobile navigation" : "Navigation mobile"}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}
      <EncounterLink language={language} onClick={() => setOpen(false)}>{english ? "Meet your Collaborator" : "Rencontrer mon Collaborateur"}<Icon name="arrow" /></EncounterLink>
      {!role && <Link href="/login" onClick={() => setOpen(false)}>{english ? "Log in" : "Se connecter"}<Icon name="arrow" /></Link>}
    </nav>}
  </header>;
}

export function SiteFooter({ language = "fr" }: { language?: "fr" | "en" }) {
  if (language === "en") return <footer className="site-footer marketing-footer">
    <div className="footer-inner"><div><Brand language="en" /><p>Create and deploy<br />AI Collaborators you own.</p></div><nav aria-label="Footer navigation"><Link href="/how-it-works">Product <Icon name="arrow" /></Link><Link href="/pricing">Pricing <Icon name="arrow" /></Link></nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span></div>
  </footer>;
  return <footer className="site-footer"><div className="footer-inner"><div><Brand /><p>Il travaille pour vous.<br />Il vous appartient.</p></div><nav aria-label="Navigation de pied de page"><Link href="/@patrick-chassany">Le Collaborateur de Patrick <Icon name="arrow" /></Link><Link href="/dashboard/patrick">Dashboard Patrick <span>Démo</span></Link><Link href="/dashboard/visiteur">Dashboard visiteur <span>Démo</span></Link></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span></div></footer>;
}

export function DemoNotice({ role }: { role: "patrick" | "visiteur" }) {
  return <div className="demo-notice"><span className="demo-label">Démo</span><span>Espace {role === "patrick" ? "Patrick" : "visiteur"}</span><Link href="/">Accueil <Icon name="arrow" /></Link></div>;
}

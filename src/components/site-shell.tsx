"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

export function Brand() {
  return <Link className="brand" href="/" aria-label="Unitalk — accueil"><Icon name="message" width="31" height="31" /><span>unitalk</span></Link>;
}

export function SiteHeader({ role }: { role?: "patrick" | "visiteur" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Accueil" },
    { href: "/@patrick-chassany", label: "Rencontrer le Collaborateur" },
  ];

  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Navigation principale">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        <Link href="/#comment-ca-marche">Comment ça marche</Link>
      </nav>
      <div className="header-actions">
        {role ? <div className="account-pill"><span className="avatar avatar-small">{role === "patrick" ? "PC" : "V"}</span><span>{role === "patrick" ? "Patrick" : "Visiteur"}</span><span className="demo-label">Démo</span></div> : <details className="account-menu">
          <summary className="button button-outline button-small">Se connecter <Icon name="chevron" /></summary>
          <div className="account-dropdown"><p>Choisir un espace de démonstration</p><Link href="/dashboard/patrick">Espace Patrick <Icon name="arrow" /></Link><Link href="/dashboard/visiteur">Espace visiteur <Icon name="arrow" /></Link></div>
        </details>}
        <Link className="button button-primary button-small header-create" href="/#creer">Créer le mien <Icon name="plus" /></Link>
        <button className="icon-button mobile-menu-toggle" aria-label={open ? "Fermer la navigation" : "Ouvrir la navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Navigation mobile">
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}
      <Link href="/#creer" onClick={() => setOpen(false)}>Créer mon Collaborateur<Icon name="plus" /></Link>
      <Link href="/dashboard/patrick" onClick={() => setOpen(false)}>Espace Patrick <span className="demo-label">Démo</span></Link>
      <Link href="/dashboard/visiteur" onClick={() => setOpen(false)}>Espace visiteur <span className="demo-label">Démo</span></Link>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-inner"><div><Brand /><p>Une présence. Des conversations.<br />Un Collaborateur qui vous appartient.</p></div><nav aria-label="Navigation de pied de page"><Link href="/@patrick-chassany">Le Collaborateur de Patrick <Icon name="arrow" /></Link><Link href="/dashboard/patrick">Dashboard Patrick <span>Démo</span></Link><Link href="/dashboard/visiteur">Dashboard visiteur <span>Démo</span></Link></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span><span>Prototype interactif · fonctions IA simulées</span></div></footer>;
}

export function DemoNotice({ role }: { role: "patrick" | "visiteur" }) {
  return <div className="demo-notice"><span className="demo-label">Mode démo</span><span>Espace {role === "patrick" ? "Patrick" : "visiteur"} · connexion simulée, données d’exemple.</span><Link href="/">Quitter la démo <Icon name="arrow" /></Link></div>;
}

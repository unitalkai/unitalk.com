"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";
import { UnitalkMark } from "./unitalk-mark";
import { EncounterLink } from "./collaborator-offer-context";
import { FooterSocialLinks } from "./footer-social-links";
import { FooterLanguage } from "./footer-language";
import { marketingPath } from "@/lib/marketing-language";
import "./site-footer.css";
import "./marketing-resources.css";

export function Brand({ language = "fr" }: { language?: "fr" | "en" }) {
  return <Link className="brand" href={marketingPath("/", language)} aria-label={language === "en" ? "Unitalk — home" : "Unitalk — accueil"}>
    <UnitalkMark />
    <span>unitalk</span>
  </Link>;
}

export function SiteHeader({ role, language = "fr" }: { role?: "patrick" | "visiteur"; language?: "fr" | "en" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const english = language === "en";
  const links = !role ? [
    { href: marketingPath("/how-it-works", language), label: english ? "How it works" : "Comment ça marche" },
    { href: marketingPath("/pricing", language), label: english ? "Pricing" : "Tarifs" },
    { href: marketingPath("/privacy", language), label: english ? "Privacy" : "Confidentialité" },
    { href: marketingPath("/store", language), label: english ? "Store" : "Boutique" },
    { href: marketingPath("/for-businesses", language), label: english ? "For businesses" : "Pour les entreprises" },
  ] : [
    { href: "/", label: "Accueil" },
    { href: "/@patrick-chassany", label: "Le Collaborateur de Patrick" },
  ];

  return <header className="site-header">
    <div className={`header-inner${!role ? " marketing-header marketing-header-expanded" : ""}`}>
      <Brand language={language} />
      <nav className="desktop-nav" aria-label={english ? "Main navigation" : "Navigation principale"}>
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        {role && <Link href="/fr/how-it-works">Comment ça marche</Link>}
      </nav>
      <div className="header-actions">
        {!role && <Link href="/@patrick-chassany" className="header-sales" title={english ? "Talk to Patrick’s AI Collaborator" : "Parler au Collaborateur IA de Patrick"}>{english ? "Talk to sales" : "Contacter les ventes"}</Link>}
        {role ? <div className="account-pill"><span className="avatar avatar-small">{role === "patrick" ? "PC" : "V"}</span><span>{role === "patrick" ? "Patrick" : "Visiteur"}</span><span className="demo-label">Démo</span></div> : <Link href={marketingPath("/login", language)} className="button button-outline button-small customer-login" aria-current={pathname === marketingPath("/login", language) ? "page" : undefined}>{english ? "Log in" : "Se connecter"}</Link>}
        <EncounterLink language={language} marketing={!role} className="button button-primary button-small header-create">{role ? "Rencontrer le mien" : english ? "Start for free" : "Commencer gratuitement"} <Icon name="arrow" /></EncounterLink>
        <button className="icon-button mobile-menu-toggle" aria-label={english ? (open ? "Close navigation" : "Open navigation") : (open ? "Fermer la navigation" : "Ouvrir la navigation")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label={english ? "Mobile navigation" : "Navigation mobile"}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}
      <EncounterLink language={language} marketing={!role} onClick={() => setOpen(false)}>{role ? "Rencontrer mon Collaborateur" : english ? "Start for free" : "Commencer gratuitement"}<Icon name="arrow" /></EncounterLink>
      {!role && <Link href="/@patrick-chassany" onClick={() => setOpen(false)} title={english ? "Talk to Patrick’s AI Collaborator" : "Parler au Collaborateur IA de Patrick"}>{english ? "Talk to sales" : "Contacter les ventes"}<Icon name="arrow" /></Link>}
      {!role && <Link href={marketingPath("/login", language)} onClick={() => setOpen(false)}>{english ? "Log in" : "Se connecter"}<Icon name="arrow" /></Link>}
    </nav>}
  </header>;
}

export function SiteFooter({ language = "fr" }: { language?: "fr" | "en" }) {
  const english = language === "en";
  return <footer className="site-footer marketing-footer">
    <div className="footer-inner">
      <div className="footer-identity"><Brand language={language} /><p className="footer-tagline" lang="en">Own your intelligence.</p></div>
      <nav className="footer-navigation" aria-label={english ? "Footer navigation" : "Navigation de pied de page"}><Link href={marketingPath("/how-it-works", language)}>{english ? "How it works" : "Comment ça marche"}</Link><Link href={marketingPath("/pricing", language)}>{english ? "Pricing" : "Tarifs"}</Link><Link href={marketingPath("/store", language)}>{english ? "Store" : "Boutique"}</Link><Link href={marketingPath("/privacy", language)}>{english ? "Privacy" : "Confidentialité"}</Link><Link href={marketingPath("/compare", language)}>{english ? "Compare" : "Comparer"}</Link><Link href={marketingPath("/about", language)}>{english ? "About" : "À propos"}</Link><Link href="/@patrick-chassany" lang="en">Talk to Patrick</Link></nav>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Unitalk</span><FooterSocialLinks language={language} /><FooterLanguage language={language} /></div>
  </footer>;
}

export function DemoNotice({ role }: { role: "patrick" | "visiteur" }) {
  return <div className="demo-notice"><span className="demo-label">Démo</span><span>Espace {role === "patrick" ? "Patrick" : "visiteur"}</span><Link href="/">Accueil <Icon name="arrow" /></Link></div>;
}

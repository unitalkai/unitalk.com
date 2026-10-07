import Link from "next/link";
import { Brand, SiteFooter } from "@/components/site-shell";
import { Icon } from "@/components/icons";
import { marketingPath } from "@/lib/marketing-language";
import "../app/login/login.css";

export function CustomerLogin({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const home = marketingPath("/", language);
  return <div lang={language} className="customer-login-page">
    <header className="customer-login-header content-container"><Brand language={language} /><Link href={home} className="text-link">{fr ? "Revenir à Unitalk" : "Back to Unitalk"} <Icon name="arrow" /></Link></header>
    <main id="main-content" className="customer-login-main content-container">
      <div className="customer-login-content"><h1>{fr ? "Heureux de vous revoir." : "Welcome back."}</h1><p>{fr ? "Connectez-vous à votre compte Unitalk existant." : "Log in to your existing Unitalk account."}</p><div className="customer-login-status"><Icon name="lock" /><h2>{fr ? "La connexion client n’est pas encore disponible." : "Customer sign-in is not available yet."}</h2><p>{fr ? "Nous préparons l’accès aux comptes. Revenez lorsque la connexion sera disponible." : "We’re preparing account access. Please return when sign-in is available."}</p></div><Link href={home} className="button button-outline">{fr ? "Revenir à l’accueil" : "Back to the homepage"} <Icon name="arrow" /></Link></div>
    </main>
    <SiteFooter language={language} />
  </div>;
}

import { SiteHeader, SiteFooter } from "./site-shell";
import { StoreDirectory } from "./store-directory";

export function MarketingStore({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  return <div lang={language} className="marketing-home marketing-document store-page"><SiteHeader language={language} /><main id="main-content"><section className="resource-hero content-container"><h1>{fr ? <>Plus de possibilités.<br /><span>Pour votre Collaborateur.</span></> : <>More ways to work.<br /><span>For your Collaborator.</span></>}</h1><p>{fr ? "Applications, outils, compétences et Collaborateurs. Explorez les ressources publiques, puis choisissez ce qui convient à votre travail." : "Apps, tools, skills and Collaborators. Explore public resources, then choose what fits your work."}</p><p className="capability-note">{fr ? "Les liens ouvrent les dépôts sources. L’installation et l’achat ne sont pas disponibles ici." : "Links open the source repositories. Installation and purchasing are not available here."}</p></section><StoreDirectory language={language} /></main><SiteFooter language={language} /></div>;
}

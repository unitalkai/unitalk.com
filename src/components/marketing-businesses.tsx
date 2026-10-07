import { SiteHeader, SiteFooter } from "./site-shell";
import { BusinessDomainForm } from "./business-domain-form";
import { Icon } from "./icons";
import "./marketing-businesses.css";

export function MarketingBusinesses({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  return <div lang={language} className="marketing-home marketing-document business-page">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="business-hero content-container" aria-labelledby="business-title">
        <div className="business-intro"><h1 id="business-title">{fr ? <>Votre entreprise.<br /><span>Un prochain pas utile.</span></> : <>Your business.<br /><span>A useful next step.</span></>}</h1><p>{fr ? "Des demandes entrantes aux suivis clients : explorez ce qu’un Collaborateur pourrait préparer pour votre entreprise." : "From incoming enquiries to customer follow-ups: explore what a Collaborator could prepare for your business."}</p><a className="text-link business-platform-link" href="https://unitalk.ai">{fr ? "Découvrir Unitalk pour les entreprises" : "Explore Unitalk for businesses"}<Icon name="external" width="16" height="16" /></a></div>
        <div className="business-entry"><h2>{fr ? "Commençons par votre site." : "Start with your website."}</h2><p>{fr ? "Indiquez votre domaine, puis choisissez une première mission." : "Enter your domain, then choose a first mission."}</p><BusinessDomainForm language={language} /></div>
      </section>
      <section className="business-missions content-container" aria-labelledby="business-missions-title"><h2 id="business-missions-title">{fr ? "Que souhaitez-vous lui confier ?" : "What would you like to hand over?"}</h2><dl>{(fr ? [["Qualifier les demandes", "Comprendre le besoin, le calendrier et les informations manquantes avant un échange."], ["Préparer les réponses", "Transformer le contexte en un brouillon que vous pouvez relire et approuver."], ["Garder le fil des suivis", "Préparer le prochain pas après un appel, un message ou un rendez-vous."]] : [["Qualify enquiries", "Understand the need, timing and missing information before a conversation."], ["Prepare replies", "Turn the context into a draft you can review and approve."], ["Keep follow-ups moving", "Prepare the next step after a call, message or meeting."]]).map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

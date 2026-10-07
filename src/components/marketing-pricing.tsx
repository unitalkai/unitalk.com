import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { PricingHosting } from "@/components/pricing-hosting";
import { Icon } from "@/components/icons";
import { localizedOffer, marketingPath } from "@/lib/marketing-language";

const englishIncluded = [
  { title: "Identity", description: "Your own name, voice and presence." },
  { title: "Knowledge & memory", description: "Knowledge Bases, private knowledge and persistent memory." },
  { title: "Connections", description: "LinkedIn, email, WhatsApp, calendar and phone." },
  { title: "Tools", description: "MCP connectors, CRM, browser, search and APIs." },
  { title: "Work", description: "Skills, autonomous tasks, follow-ups and actions." },
  { title: "Control", description: "Permissions, authority rules and approvals." },
  { title: "Public", description: "Your own public Collaborator and URL." },
  { title: "Migration", description: "Import your ChatGPT, Claude or OpenClaw history." },
];

export function MarketingPricing({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const offer = localizedOffer(language);
  const included = fr ? [
    { title: "Identité", description: "Votre nom, votre voix et votre présence." },
    { title: "Connaissances et mémoire", description: "Bases de connaissances, informations privées et mémoire durable." },
    { title: "Connexions", description: "LinkedIn, email, WhatsApp, calendrier et téléphone." },
    { title: "Outils", description: "Connecteurs MCP, CRM, navigateur, recherche et APIs." },
    { title: "Travail", description: "Compétences, missions autonomes, suivis et actions." },
    { title: "Contrôle", description: "Permissions, règles d’autorité et validations." },
    { title: "Présence publique", description: "Votre Collaborateur public et son URL." },
    { title: "Migration", description: "Importez votre historique ChatGPT, Claude ou OpenClaw." },
  ] : englishIncluded;
  return <div lang={language} className="marketing-home marketing-document pricing-page">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="document-hero pricing-page-hero content-container" aria-labelledby="pricing-page-title"><div><h1 id="pricing-page-title">{fr ? <>Votre propre<br /><span>Collaborateur IA.</span></> : <>Your own<br /><span>AI Collaborator.</span></>}</h1><p>{fr ? "Tout pour commencer." : "Everything you need to get started."}</p><p>{fr ? <>Une identité. Votre contexte.<br />Un travail qui avance.</> : <>One identity. Your context.<br />Work that keeps moving.</>}</p></div><CollaboratorPricing language={language} showComponents={false} /></section>

      <section className="included-section content-container" id="included" aria-labelledby="included-title"><div className="section-title-row"><h2 id="included-title">{fr ? "Inclus." : "Included."}</h2><Link className="text-link" href={marketingPath("/how-it-works", language)}>{fr ? "Voir comment ça marche" : "See how it works"} <Icon name="arrow" /></Link></div><p className="capability-note">{fr ? "Les huit dimensions de l’offre Collaborateur prévue." : "The eight parts of the planned Collaborator offer."}</p><dl className="included-features">{included.map(item => <div key={item.title}><dt><Icon name="check" />{item.title}</dt><dd>{item.description}</dd></div>)}</dl></section>

      <section className="intelligence-section" id="intelligence"><div className="content-container"><h2>{fr ? <>Choisissez votre<br /><span>intelligence.</span></> : <>Choose your<br /><span>intelligence.</span></>}</h2><p>{fr ? "Votre Collaborateur n’est pas lié à un seul fournisseur IA." : "Your Collaborator isn’t tied to one AI provider."}</p><div className="intelligence-choices">
        <article><h3>{fr ? "Crédits Unitalk" : "Unitalk Credits"}</h3><p className="option-summary">{fr ? "L’option simple." : "The simple option."}</p><p>{fr ? <>Nous fournissons l’IA.<br />Achetez des crédits selon vos besoins.</> : <>We provide the AI.<br />You buy credits when you need them.</>}</p><EncounterLink language={language} marketing className="button button-primary" choices={{ intelligence: "credits" }}>{fr ? "Utiliser les crédits Unitalk" : "Use Unitalk Credits"} <Icon name="arrow" /></EncounterLink></article>
        <article><h3>{fr ? "Vos propres clés API" : "Your own API keys"}</h3><p>{fr ? "Utilisez vos clés des fournisseurs de votre choix." : "Bring your own keys from the providers you choose."}</p><EncounterLink language={language} marketing className="button button-outline" choices={{ intelligence: "keys" }}>{fr ? "Apporter mes clés" : "Bring my keys"} <Icon name="arrow" /></EncounterLink></article>
        <article><h3>{fr ? "Votre passerelle IA existante" : "Your existing AI gateway"}</h3><p>{fr ? <>Une passerelle IA ou une instance Hermes ?<br />Connectez-la.</> : <>Already have an AI gateway or Hermes instance?<br />Connect it.</>}</p><EncounterLink language={language} marketing className="button button-outline" choices={{ intelligence: "gateway" }}>{fr ? "La connecter" : "Connect it"} <Icon name="arrow" /></EncounterLink></article>
      </div><p className="capability-note intelligence-billing-note">{fr ? "L’usage de l’IA est facturé séparément de l’abonnement Collaborateur." : "AI usage is purchased separately from the Collaborator plan."}</p></div></section>

      <section className="hosting-pricing-section content-container" id="hosting"><h2>{fr ? <>Choisissez<br /><span>où il fonctionne.</span></> : <>Choose<br /><span>where it runs.</span></>}</h2><div className="hosting-comparison"><div><h3>Unitalk Cloud</h3><p className="option-summary">Simple.</p><p>{fr ? "Votre Collaborateur fonctionne sur l’infrastructure Unitalk." : "Your Collaborator runs on Unitalk infrastructure."}</p><p className="cloud-price">{offer.monthly}<span> / {fr ? "mois" : "month"}</span></p><p className="capability-note">{fr ? "Le même abonnement Collaborateur, sans second forfait. L’hébergement cloud est prévu." : "The same Collaborator plan, not a second subscription. Cloud hosting is planned."}</p></div><div><h3>{fr ? "Votre infrastructure" : "Your infrastructure"}</h3><p>{fr ? "Faites-le fonctionner sur :" : "Run it on:"}</p><ul className="infrastructure-list"><li>OVH</li><li>Hostinger</li><li>{fr ? "Votre serveur" : "Your server"}</li><li>{fr ? "Un cloud compatible" : "Compatible cloud"}</li></ul><p>{fr ? <>Ou connectez une instance Hermes existante.<br />Votre Collaborateur reste le vôtre.</> : <>Or connect an existing Hermes instance.<br />Your Collaborator stays yours.</>}</p><blockquote>{fr ? "Aucune dépendance à un hébergeur." : "No infrastructure lock-in."}</blockquote></div></div><PricingHosting language={language} /></section>

      <section className="hermes-section ownership-section"><div className="marketing-section content-container"><div><h2>{fr ? <>Un moteur ouvert.<br /><span>Un Collaborateur<br />qui vous appartient.</span></> : <>An open engine.<br /><span>A Collaborator<br />you own.</span></>}</h2><p><a className="runtime-link" href="https://github.com/NousResearch/hermes-agent">Hermes <Icon name="external" width="16" height="16" /></a>{fr ? " est un moteur IA autonome et open source." : " is an autonomous, open-source AI runtime."}</p></div><div><p>{fr ? "Unitalk lui donne une identité, des connaissances, une mémoire, des compétences, des outils, des canaux et un lieu de travail." : "Unitalk gives it identity, knowledge, memory, skills, tools, communication and a place to work."}</p><ul className="portability-list">{(fr ? ["Déplacez votre Collaborateur.", "Exportez-le.", "Faites-le fonctionner ailleurs."] : ["You can move your Collaborator.", "You can export it.", "You can run it elsewhere."]).map(item => <li key={item}>{item}</li>)}</ul><blockquote>{fr ? <>Vous choisissez où il fonctionne.<br /><span>Vous choisissez son intelligence.</span></> : <>You choose where it runs.<br /><span>You choose what powers it.</span></>}</blockquote><p className="capability-note">{fr ? "Architecture prévue. L’intégration Hermes, les exports et le déploiement restent à venir." : "The intended architecture. Hermes integration, exports and deployment are planned."}</p></div></div></section>

      <section className="pricing-page-close content-container"><h2>{fr ? <>Un prix.<br /><span>Votre choix.</span></> : <>One price.<br /><span>Your choice.</span></>}</h2><p className="closing-price">{offer.monthly} <span>/ {fr ? "mois" : "month"}</span><span className="closing-or">{fr ? "ou" : "or"}</span>{offer.annual} <span>/ {fr ? "an" : "year"}</span></p><EncounterLink language={language} marketing className="button button-primary">{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink><p>{fr ? <>Pas de forfait entreprise.<br />Pas de labyrinthe d’options.<br />Pas de dépendance.</> : <>No enterprise plan.<br />No feature maze.<br />No lock-in.</>}</p></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

import { SiteHeader, SiteFooter } from "./site-shell";
import { Icon } from "./icons";
import { EncounterLink } from "./collaborator-offer-context";
import type { MarketingLanguage } from "@/lib/marketing-language";

export function MarketingPrivacy({ language = "en" }: { language?: MarketingLanguage }) {
  const fr = language === "fr";
  const principles = fr ? [
    ["Vous choisissez les accès.", "Votre Collaborateur est conçu pour utiliser les sources et les outils que vous autorisez. Lire un échange, préparer une réponse et l’envoyer sont des permissions distinctes.", "Le choix d’un canal dans la rencontre exprime votre préférence ; il ne connecte pas de compte."],
    ["Le privé reste distinct du public.", "Le Collaborateur public de Patrick représente ses connaissances professionnelles publiques. Ses informations privées et son espace propriétaire sont des surfaces séparées.", "Les tableaux de bord actuels utilisent des rôles d’exemple. Ils ne constituent pas une authentification ou un contrôle d’accès."],
    ["Connaissances et mémoire, séparées.", "Les connaissances viennent des sources fournies. La mémoire vient des échanges et du travail. Le modèle du produit vous permet de comprendre ce qui est retenu et de le corriger ou le supprimer.", "Dans le tableau de bord actuel, les modifications de mémoire restent dans la page et sont réinitialisées au rechargement."],
    ["Vous choisissez où il fonctionne.", "L’offre prévoit Unitalk Cloud, votre infrastructure et une instance Hermes existante. Vous choisissez aussi le fournisseur IA. Ces choix déterminent où vos informations pourront être traitées.", "L’hébergement et les connexions aux fournisseurs ne sont pas encore activés sur ce site. Les conditions de chaque fournisseur doivent être vérifiées avant connexion."],
  ] : [
    ["You choose what it can access.", "Your Collaborator is designed to use the sources and tools you authorise. Reading a conversation, preparing a reply and sending it are separate permissions.", "Selecting a channel during the encounter records your preference; it does not connect an account."],
    ["Private and public stay distinct.", "Patrick’s public Collaborator represents his public professional knowledge. His private information and owner workspace are separate surfaces.", "The current dashboards use example roles. They are not authentication or access controls."],
    ["Knowledge and memory are separate.", "Knowledge comes from supplied sources. Memory comes from conversations and work. The product model gives you visibility into what is remembered and the ability to correct or remove it.", "In the current dashboard, memory edits stay within the page and reset on reload."],
    ["You choose where it runs.", "The planned offer includes Unitalk Cloud, your infrastructure and an existing Hermes instance. You also choose the AI provider. Those choices determine where your information may be processed.", "Hosting and provider connections are not activated on this site. Review each provider’s terms before connecting it."],
  ];
  return <div lang={language} className="marketing-home marketing-document privacy-page"><SiteHeader language={language} /><main id="main-content">
    <section className="resource-hero content-container"><h1>{fr ? <>Votre contexte.<br /><span>Votre contrôle.</span></> : <>Your context.<br /><span>Your control.</span></>}</h1><p>{fr ? "La confidentialité commence par des choix clairs : ce que votre Collaborateur connaît, ce qu’il peut utiliser et où il travaille." : "Privacy starts with clear choices: what your Collaborator knows, what it can use and where it works."}</p><EncounterLink language={language} marketing className="button button-primary">{fr ? "Commencer gratuitement" : "Start for free"}<Icon name="arrow" /></EncounterLink></section>
    <section className="privacy-principles content-container" aria-label={fr ? "Confidentialité et contrôle" : "Privacy and control"}>
      {principles.map(([title, body, detail]) => <section className="privacy-principle" key={title}><h2>{title}</h2><div><p>{body}</p><p className="privacy-detail">{detail}</p></div></section>)}
      <section className="privacy-controls"><h2>{fr ? "Ce que ce site conserve aujourd’hui." : "What this site stores today."}</h2><ul>
        <li><strong>{fr ? "Rencontre et préférences." : "Encounter and preferences."}</strong> {fr ? "Le nom, la mission et les choix restent dans la page. Une URL source et les options de configuration peuvent figurer dans l’adresse de la rencontre." : "Your name, mission and choices stay in page state. A source URL and setup options may appear in the encounter’s address."}</li>
        <li><strong>{fr ? "Conversation publique." : "Public conversation."}</strong> {fr ? "Si le stockage du navigateur est disponible, sessionStorage conserve le fil et le prénom dans cet onglet. « Clear conversation » les efface. Aucun historique partagé entre appareils n’est connecté." : "When browser storage is available, sessionStorage keeps the transcript and first name in this tab. Clear conversation removes them. No cross-device conversation history is connected."}</li>
        <li><strong>{fr ? "Voix." : "Voice."}</strong> {fr ? "La dictée utilise la reconnaissance vocale du navigateur, qui peut dépendre de son service. Elle remplit un brouillon à relire avant envoi." : "Dictation uses your browser’s speech recognition, which may rely on its service. It fills a draft for you to review before sending."}</li>
      </ul></section>
    </section>
  </main><SiteFooter language={language} /></div>;
}

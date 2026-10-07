import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { OwnershipOptions } from "@/components/ownership-options";
import { Icon } from "@/components/icons";
import "./guide-tool-details.css";

const englishSteps = [
  { id: "connect", title: "Connect your life" },
  { id: "knowledge", title: "Give it knowledge" },
  { id: "tools", title: "Give it tools" },
  { id: "job", title: "Give it a job" },
  { id: "work", title: "Let it work" },
  { id: "control", title: "You stay in control" },
  { id: "hosting", title: "Run it your way" },
  { id: "presence", title: "Give it a public presence" },
];

const frenchTitles = ["Connectez votre quotidien", "Donnez-lui des connaissances", "Donnez-lui des outils", "Confiez-lui une mission", "Laissez-le travailler", "Gardez le contrôle", "Choisissez où il fonctionne", "Donnez-lui une présence publique"];

function GuideStep({ number, dark = false, children, language }: { number: number; dark?: boolean; children: ReactNode; language: "en" | "fr" }) {
  const step = englishSteps[number - 1];
  return <li id={step.id} className={`guide-step${dark ? " guide-step-dark ownership-section ownership-config" : ""}`}>
    <div className="guide-step-inner content-container"><div className="guide-step-heading"><span className="guide-number" aria-hidden="true">{number}.</span><h2>{language === "fr" ? frenchTitles[number - 1] : step.title}.</h2></div><div className="guide-step-body">{children}</div></div>
  </li>;
}

function Topics({ items }: { items: string[] }) {
  return <ul className="guide-topics">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function MarketingGuide({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const steps = englishSteps.map((step, index) => ({ ...step, title: fr ? frenchTitles[index] : step.title }));
  return <div lang={language} className="marketing-home marketing-document how-page">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="document-hero content-container" aria-labelledby="how-title">
        <div><h1 id="how-title">{fr ? <>Rencontrez votre<br /><span>Collaborateur.</span></> : <>Meet your<br /><span>Collaborator.</span></>}</h1><p>{fr ? "Votre Collaborateur IA est toujours prêt à travailler." : "Your AI Collaborator is always ready to work."}</p><p>{fr ? "Il vous connaît, utilise vos outils et continue d’avancer lorsque vous êtes ailleurs." : "It knows you, connects to the tools you use, and keeps working when you’re away."}</p><EncounterLink language={language} marketing className="button button-primary">{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink></div>
        <dl className="collaborator-principles">{(fr ? [["Sait", "Bases de connaissances + Mémoire"], ["Connecte", "Vos canaux professionnels"], ["Utilise", "Connecteurs MCP + Outils + APIs"], ["Travaille", "En autonomie, en arrière-plan"], ["Décide", "Dans les limites que vous fixez"]] : [["Knows", "Knowledge Bases + Memory"], ["Connects", "Your professional channels"], ["Uses", "MCP connectors + Tools + APIs"], ["Works", "Autonomously, in the background"], ["Decides", "Within the authority you give it"]]).map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
      </section>
      <nav className="guide-contents content-container" aria-label={fr ? "Les étapes" : "How it works steps"}><ol>{steps.map((step, index) => <li key={step.id}><Link href={`#${step.id}`}><span>{index + 1}.</span>{step.title}<Icon name="chevron" width="14" height="14" /></Link></li>)}</ol></nav>

      <ol className="guide-steps">
        <GuideStep number={1} language={language}><p>{fr ? "Connectez les canaux de votre vie professionnelle." : "Connect the channels where your professional life happens."}</p><Topics items={fr ? ["LinkedIn", "Email", "WhatsApp", "Calendrier", "Téléphone"] : ["LinkedIn", "Email", "WhatsApp", "Calendar", "Phone"]} /><p>{fr ? "Votre Collaborateur peut lire, écrire, organiser et appeler — uniquement avec vos permissions." : "Your Collaborator can read, write, schedule and call — only with the permissions you give it."}</p></GuideStep>
        <GuideStep number={2} language={language}><p>{fr ? <>Connectez vos <strong>bases de connaissances.</strong></> : <>Connect your <strong>Knowledge Bases.</strong></>}</p><Topics items={fr ? ["Sites web", "Documents", "Connaissances métier", "Fichiers privés", "Bases de données"] : ["Websites", "Documents", "Company knowledge", "Private files", "Databases"]} /><p>{fr ? "Votre Collaborateur comprend durablement ce qui compte pour vous." : "Your Collaborator builds a persistent understanding of what matters to you."}</p><p className="knowledge-distinction">{fr ? <>Ses connaissances : ce qu’il sait.<br />Sa mémoire : ce qu’il retient.</> : <>Knowledge is what it knows.<br />Memory is what it remembers.</>}</p><div className="guide-import"><p>{fr ? "Vous utilisez déjà une autre IA ?" : "Already using another AI?"}</p><p>{fr ? "Importez votre historique ChatGPT, Claude ou OpenClaw en un clic." : "Import your ChatGPT, Claude or OpenClaw history in one click."}</p><blockquote>{fr ? "Vous ne partez pas de zéro." : "You don’t start from zero."}</blockquote><p className="capability-note">{fr ? "Import de l’historique · bientôt disponible." : "History import · coming soon."}</p></div></GuideStep>
        <GuideStep number={3} language={language}><p>{fr ? "Retrouver le contact. Garder l’historique. Suivre le prochain pas." : "Find the contact. Keep the history. Follow the next step."}</p><p>{fr ? "Le CRM et le support donnent une suite aux échanges, même lorsqu’ils passent d’un message à un appel." : "CRM and support give conversations a next step, even when they move from a message to a call."}</p><Topics items={fr ? ["Contacts", "Opportunités", "Demandes clients", "Historique"] : ["Contacts", "Opportunities", "Customer requests", "History"]} /><details className="guide-tool-details"><summary>{fr ? "Les outils derrière le suivi" : "The tools behind the follow-up"}<Icon name="plus" /></summary><p>{fr ? "L’architecture prévoit Twenty pour les contacts et opportunités, et Chatwoot pour les demandes de support, sur un serveur privé connecté au Collaborateur. Ces services ne sont pas reliés à ce site." : "The architecture includes Twenty for contacts and opportunities, and Chatwoot for support requests, on a private server connected to the Collaborator. These services are not connected to this site."}</p><div><a className="text-link" href="https://twenty.com">Twenty CRM<Icon name="external" width="16" height="16" /></a><a className="text-link" href="https://www.chatwoot.com">Chatwoot<Icon name="external" width="16" height="16" /></a></div><p>{fr ? "Les connecteurs MCP donnent accès aux outils autorisés : recherche, navigateur, APIs et applications métier." : "MCP connectors provide access to authorised tools: search, browser, APIs and business apps."}</p></details><blockquote>{fr ? "Vous décidez de ses accès." : "You decide what it can access."}</blockquote></GuideStep>
        <GuideStep number={4} language={language}><p>{fr ? <>Ne dictez pas chaque étape.<br /><strong>Confiez-lui un résultat.</strong></> : <>Don’t tell it every step.<br /><strong>Give it an outcome.</strong></>}</p><blockquote className="job-brief">{fr ? <>« Traite mes demandes.<br />Qualifie les opportunités.<br />Organise les rendez-vous.<br />Prépare les suivis. »</> : <>“Handle my inbound.<br />Qualify opportunities.<br />Book meetings.<br />Follow up.”</>}</blockquote><p>{fr ? "Votre Collaborateur prépare les prochaines étapes et avance." : "Your Collaborator figures out the next steps and keeps moving."}</p></GuideStep>
        <GuideStep number={5} language={language} dark><p>{fr ? "Votre Collaborateur peut travailler en arrière-plan." : "Your Collaborator can work in the background."}</p><ul className="work-verbs">{(fr ? ["Lit.", "Comprend.", "Organise.", "Répond.", "Agit.", "Relance."] : ["Reads.", "Understands.", "Organizes.", "Responds.", "Acts.", "Follows up."]).map(verb => <li key={verb}>{verb}</li>)}</ul><p>{fr ? "Il garde le fil de vos relations et de votre travail sur les canaux connectés." : "It keeps your relationships and work moving across your connected channels."}</p><p>{fr ? "Quand il a besoin de vous, il vous le dit." : "When something needs you, it tells you."}</p><blockquote>{fr ? <>Vous intervenez<br /><span>lorsqu’on a besoin de vous.</span></> : <>You only get involved<br /><span>when you’re needed.</span></>}</blockquote></GuideStep>
        <GuideStep number={6} language={language}><p>{fr ? "Vous décidez de ce que votre Collaborateur peut faire." : "You decide what your Collaborator can do."}</p><dl className="guide-authority"><div><dt lang="en"><Icon name="check" />DO IT</dt><dd>{fr ? "Agir en autonomie." : "Act autonomously."}</dd></div><div><dt lang="en"><Icon name="message" />ASK ME</dt><dd>{fr ? "Demander votre accord." : "Get approval."}</dd></div><div><dt lang="en"><Icon name="close" />NEVER DO IT</dt><dd>{fr ? "Ne jamais franchir la limite." : "Never cross the line."}</dd></div></dl><p>{fr ? "Modifiez ses permissions, mettez en pause ou reprenez la main à tout moment." : "You can change permissions, pause it or take over at any time."}</p><Link className="text-link" href="/dashboard/patrick">{fr ? "Essayer une validation" : "Try an approval example"} <Icon name="arrow" /></Link></GuideStep>
        <GuideStep number={7} language={language} dark><p>{fr ? "Conçu pour fonctionner sur " : "Designed to run on "}<a className="runtime-link" href="https://github.com/NousResearch/hermes-agent">Hermes <Icon name="external" width="16" height="16" /></a>{fr ? ", un moteur IA autonome et open source." : ", an autonomous open-source AI runtime."}</p><OwnershipOptions language={language} /></GuideStep>
        <GuideStep number={8} language={language}><p>{fr ? "Votre Collaborateur a sa propre identité et son URL." : "Your Collaborator has its own identity and URL."}</p><Link className="guide-public-url" href="/@patrick"><Icon name="link" />unitalk.com/@patrick <Icon name="arrow" /></Link><p>{fr ? "Partagez-la sur LinkedIn, votre site, votre signature email ou un QR code." : "Put it on your LinkedIn, website, email signature or QR code."}</p><blockquote>{fr ? "Voici comment échanger avec moi." : "Here’s how to interact with me."}</blockquote><p>{fr ? "Votre Collaborateur peut accueillir vos contacts tout en continuant de travailler pour vous en privé." : "Your Collaborator can be your professional front door — while continuing to work for you in private."}</p><Link className="text-link" href="/@patrick">{fr ? "Rencontrer un Collaborateur public" : "Meet a public Collaborator"} <Icon name="arrow" /></Link></GuideStep>
      </ol>
      <section className="guide-closing content-container"><h2>{fr ? "C’est tout." : "That’s it."}</h2><p>{fr ? <>Connectez-le.<br />Donnez-lui des connaissances.<br />Confiez-lui une mission.<br /><span>Laissez-le travailler.</span></> : <>Connect it.<br />Give it knowledge.<br />Give it a job.<br /><span>Let it work.</span></>}</p><EncounterLink language={language} marketing className="button button-primary">{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

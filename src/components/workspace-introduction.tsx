import { Icon } from "./icons";
import type { MarketingLanguage } from "@/lib/marketing-language";
import type { WorkspaceMode } from "@/lib/workspace-demo";

export function WorkspaceIntroduction({ mode, language }: { mode: WorkspaceMode; language: MarketingLanguage }) {
  const fr = language === "fr";
  const community = mode === "community";
  const benefits = community ? fr ? [
    ["Modérer les échanges", "Repérer les messages à examiner, rappeler les règles du groupe et aider la créatrice à garder des discussions utiles. La décision de modération reste entre ses mains."],
    ["Assurer une veille", "Suivre les sujets qui intéressent les membres, rassembler les ressources et préparer une synthèse pour nourrir les échanges et les prochains contenus."],
    ["Répondre aux questions", "S’appuyer sur les vidéos, guides et ressources de la créatrice pour orienter les membres, expliquer un point et retrouver une réponse déjà partagée."],
  ] : [
    ["Moderate the discussions", "Identify posts that need review, remind members of the group rules and help the creator keep discussions useful. Moderation decisions stay with the creator."],
    ["Keep up with relevant topics", "Follow members’ interests, gather useful resources and prepare a digest to inform discussions and inspire the creator’s next content."],
    ["Answer members’ questions", "Use the creator’s videos, guides and resources to point members in the right direction, explain a topic and find an answer already shared."],
  ] : fr ? [
    ["Communiquer avec votre équipe", "Réunissez les personnes, le contexte, les décisions et les prochaines étapes dans un même espace. Les discussions, documents et avancées restent liés au projet."],
    ["Faire collaborer vos agents IA", "Des agents spécialisés pour vos méthodes de travail : ils peuvent comparer leurs informations, se répartir les tâches et travailler avec les mêmes connaissances que l’équipe."],
    ["Gérer vos projets Git", "Passez de la discussion à la planification, à la gestion de projet, au code, aux revues et aux pull requests, dans la continuité du travail collectif."],
  ] : [
    ["Communicate with your team", "Keep people, context, decisions and next steps in one shared space. Conversations, documents and progress stay connected to the project."],
    ["Bring your AI agents together", "Agents tailored to your workflows can compare notes, divide work and build on the same knowledge as your team."],
    ["Manage your Git projects", "Move from discussion into planning, project management, code, reviews and pull requests, as part of the same shared workflow."],
  ];
  return <section className="workspace-introduction" aria-labelledby="workspace-product-title">
    <div className="workspace-product-copy"><h1 id="workspace-product-title">{community ? fr ? <>Votre audience.<br /><span>Une communauté qui échange.</span></> : <>Your audience.<br /><span>A community in conversation.</span></> : fr ? <>Votre équipe. Vos agents.<br /><span>Vos projets. Au même endroit.</span></> : <>Your people. Your agents.<br /><span>Your projects. All in one place.</span></>}</h1>
      <p>{community ? fr ? "Un groupe de discussion et un forum autour de vos vidéos, de votre newsletter ou de vos formations. Votre Collaborateur IA aide à modérer, à faire de la veille et à répondre aux questions, pendant que les membres échangent entre eux." : "A discussion group and forum around your videos, newsletter or courses. Your AI Collaborator helps with moderation, topic monitoring and member questions, while people learn from each other." : fr ? "Un espace de travail commun pour les personnes et les agents IA. Échangez avec vos collègues et vos agents spécialisés, puis avancez ensemble sur les plans, les projets et le développement." : "A shared workspace for people and AI agents. Talk with teammates and specialized agents, then move together into planning, project management and development."}</p>
      <a className="button button-primary" href="#workspace-example">{community ? fr ? "Explorer le forum de Léa" : "Explore Léa’s forum" : fr ? "Explorer le teamspace" : "Explore the teamspace"}<Icon name="arrow" /></a>
    </div>
    <div className="workspace-product-benefits">{benefits.map(([title, body]) => <article key={title}><h2>{title}</h2><p>{body}</p></article>)}</div>
    <p className="workspace-product-scope">{community ? fr ? "Exemple fictif : Léa partage des tutoriels photo et une newsletter. Le forum ci-dessous utilise des échanges préécrits, une veille d’exemple et des actions de modération locales. La veille en direct et la modération par une IA restent à connecter." : "Fictional example: Léa shares photography tutorials and a newsletter. The forum below uses prewritten exchanges, a sample digest and local moderation actions. Live topic monitoring and AI moderation remain to be connected." : fr ? "Explorez le fonctionnement dans l’espace local ci-dessous. Les connexions aux agents, aux dépôts Git et aux outils de développement restent à mettre en place." : "Explore the workflow in the local space below. Agent connections, Git repositories and development tools remain to be connected."}</p>
  </section>;
}

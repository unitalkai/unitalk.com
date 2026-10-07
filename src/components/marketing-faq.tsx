import { Icon } from "./icons";
import { localizedOffer, type MarketingLanguage } from "@/lib/marketing-language";
import "./marketing-faq.css";

export function MarketingFAQ({ language = "en" }: { language?: MarketingLanguage }) {
  const fr = language === "fr";
  const price = localizedOffer(language);
  const questions = fr ? [
    ["Qu’est-ce qu’un AI Collaborator ?", "Un Collaborateur IA est conçu pour garder le contexte de votre travail, utiliser les outils autorisés et faire avancer les missions que vous lui confiez. Vous définissez ses responsabilités et les décisions qui restent les vôtres."],
    ["Combien coûte un Collaborateur ?", `L’offre prévue est de ${price.monthly} par mois, résiliable à tout moment, ou ${price.annual} par an, soit 2 mois offerts. L’usage de l’IA est facturé séparément.`],
    ["Puis-je utiliser mon abonnement ChatGPT ?", "Hermes propose une connexion avec un abonnement ChatGPT/Codex. Cette option n’est pas encore connectée à Unitalk. Les formules éligibles et leurs limites doivent être confirmées ; l’API OpenAI classique est facturée séparément."],
    ["Qu’est-ce qui m’appartient ?", "Le modèle de Unitalk repose sur un Collaborateur qui vous appartient : son identité, ses connaissances, sa mémoire, ses compétences, ses outils et son autorité. Il est conçu pour rester portable lorsque vous changez d’hébergement ou de fournisseur IA."],
    ["Puis-je l’héberger chez moi ?", "L’offre prévoit Unitalk Cloud, votre serveur OVH ou Hostinger, votre infrastructure et une instance Hermes existante. Vous choisissez l’emplacement ; l’intégration et le déploiement sont encore prévus."],
    ["Comment garder le contrôle ?", "Définissez trois niveaux : DO IT pour agir dans vos limites, ASK ME pour demander votre accord et NEVER DO IT pour vos interdictions. Vous pouvez revoir ces règles, mettre en pause ou reprendre la main."],
  ] : [
    ["What is an AI Collaborator?", "An AI Collaborator is designed to keep the context of your work, use authorised tools and move entrusted missions forward. You set its responsibilities and the decisions that stay yours."],
    ["How much does a Collaborator cost?", `The planned offer is ${price.monthly} per month, cancel anytime, or ${price.annual} per year — 2 months free. AI usage is billed separately.`],
    ["Can I use my ChatGPT subscription?", "Hermes supports a ChatGPT/Codex subscription connection. This option is not yet connected to Unitalk. Eligible plans and limits still need to be confirmed; the standard OpenAI API is billed separately."],
    ["What do I own?", "Unitalk’s model is a Collaborator you own: its identity, knowledge, memory, skills, tools and authority. It is designed to stay portable when you change hosting or AI providers."],
    ["Can I host it myself?", "The planned choices are Unitalk Cloud, your OVH or Hostinger server, your infrastructure and an existing Hermes instance. You choose the placement; integration and deployment are still planned."],
    ["How do I stay in control?", "Set three levels: DO IT for work inside your boundaries, ASK ME for decisions that need approval and NEVER DO IT for hard limits. You can review those rules, pause or take over."],
  ];
  return <section id="faq" className="marketing-faq content-container" aria-labelledby="faq-title"><div className="faq-intro"><h2 id="faq-title">{fr ? <>Les questions.<br /><span>Les réponses.</span></> : <>A few questions.<br /><span>Clear answers.</span></>}</h2><p>{fr ? "Le coût. Le contrôle. Ce qui vous appartient." : "The cost. The control. What stays yours."}</p></div><div className="faq-questions">{questions.map(([question, answer]) => <details key={question} name="unitalk-faq"><summary>{question}<Icon name="plus" /></summary><p>{answer}</p></details>)}</div></section>;
}

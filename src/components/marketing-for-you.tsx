import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-shell";
import { EncounterLink } from "./collaborator-offer-context";
import { PublicDoorPreview } from "./public-door-preview";
import { Icon } from "./icons";
import { marketingPath, type MarketingLanguage } from "@/lib/marketing-language";
import "./marketing-for-you.css";

export function MarketingForYou({ language = "en" }: { language?: MarketingLanguage }) {
  const fr = language === "fr";
  const benefits = fr ? [
    ["Contacter vos prospects.", "Par email et par téléphone.", "Aller vers les prospects que vous lui confiez, personnaliser la prise de contact, appeler et relancer selon vos consignes. Votre Collaborateur est conçu pour engager la conversation, pas seulement attendre une visite sur votre profil."],
    ["Prendre des rendez-vous.", "Avec le bon contexte.", "Qualifier le besoin, répondre aux premières questions et organiser un rendez-vous via votre agenda connecté. Vous retrouvez le sujet, l’historique et les attentes de votre interlocuteur avant l’échange."],
    ["Répondre à chaque étape.", "Avant, pendant et après la vente.", "Avant : expliquer l’offre et aider à choisir. Pendant : préciser le périmètre, les conditions et les prochaines étapes. Après : accompagner la prise en main, répondre aux questions et suivre les demandes d’assistance."],
    ["Vendre et encaisser.", "De l’offre au paiement.", "Présenter vos offres, accompagner la commande, proposer le paiement et en suivre le statut avec vos services de vente et d’encaissement connectés. Les conditions commerciales restent les vôtres."],
    ["Recruter des affiliés.", "Et entretenir la relation.", "Contacter des partenaires potentiels, présenter votre programme d’affiliation, répondre à leurs questions et accompagner leur candidature. Puis garder le contact pour les aider à recommander vos offres."],
    ["Gérer la relation client.", "Et les échanges avec tous vos contacts.", "Prospects, clients, affiliés, partenaires : réunir les emails, appels, rendez-vous et autres interactions dans le contexte de chaque contact. Garder l’historique, suivre les demandes et préparer la prochaine action dans vos outils de relation client."],
  ] : [
    ["Reach out to prospects.", "By email and by phone.", "Work with the prospects you provide, personalize outreach, make calls and follow up according to your instructions. Your Collaborator is designed to start conversations, as well as welcome people to your profile."],
    ["Book appointments.", "With the right context.", "Qualify the need, answer initial questions and arrange a meeting through your connected calendar. Bring the topic, history and your contact’s expectations into the conversation."],
    ["Answer at every stage.", "Before, during and after the sale.", "Before: explain the offer and help people choose. During: clarify the scope, terms and next steps. After: help customers get started, answer questions and follow up on support requests."],
    ["Sell and collect payments.", "From the offer to checkout.", "Present your offers, help customers place an order, offer payment and track its status through your connected sales and payment services. The commercial terms remain yours."],
    ["Recruit affiliates.", "And keep the relationship going.", "Contact potential partners, explain your affiliate program, answer their questions and guide their application. Then stay in touch to help them recommend your offers."],
    ["Manage customer relationships.", "And conversations with every contact.", "Prospects, customers, affiliates and partners: bring emails, calls, appointments and other interactions into each contact’s context. Keep the history, follow up on requests and prepare the next action in your CRM tools."],
  ];
  const offers = fr ? [
    ["Collaborateurs IA", "Présenter leur rôle et leurs compétences, expliquer leurs usages et aider à choisir le bon Collaborateur."],
    ["Code", "Vendre un script, un module ou une application en expliquant ses prérequis, son fonctionnement et sa prise en main."],
    ["Contenus", "Présenter une formation, un guide ou une ressource, puis répondre aux questions avant et après l’achat."],
    ["Missions", "Qualifier une demande, préciser le périmètre d’une prestation et accompagner le client tout au long de la mission."],
  ] : [
    ["AI Collaborators", "Present their roles and skills, explain their use cases and help people choose the right Collaborator."],
    ["Code", "Sell a script, module or application while explaining its requirements, how it works and how to get started."],
    ["Content", "Present a course, guide or resource, then answer questions before and after the purchase."],
    ["Missions", "Qualify a service request, clarify the scope and support the customer throughout the engagement."],
  ];

  return <div className="for-you-page" lang={language}>
    <SiteHeader language={language} />
    <main id="main-content">
      <div className="content-container for-you-home"><Link href={marketingPath("/", language)}><Icon name="home" width={16} height={16} />{fr ? "Accueil" : "Home"}</Link></div>
      <section className="for-you-hero content-container" aria-labelledby="for-you-title">
        <div className="for-you-intro">
          <h1 id="for-you-title">{fr ? <>Prospecter. Vendre.<br /><span>Garder le lien.</span></> : <>Reach out. Sell.<br /><span>Keep the connection.</span></>}</h1>
          <p className="for-you-lead">{fr ? "Votre Collaborateur IA est conçu pour contacter vos prospects par email et téléphone, prendre rendez-vous, vendre et encaisser, puis suivre la relation client. Il répond aux questions avant, pendant et après la vente." : "Your AI Collaborator is designed to reach prospects by email and phone, book appointments, sell and collect payments, then manage customer relationships. It answers questions before, during and after the sale."}</p>
          <p className="for-you-offer-summary">{fr ? "Vos Collaborateurs IA, votre code, vos contenus, vos missions." : "Your AI Collaborators, your code, your content, your missions."}</p>
          <div className="for-you-actions"><EncounterLink language={language} marketing className="button button-primary">{fr ? "Créer mon Collaborateur" : "Create my Collaborator"}<Icon name="arrow" /></EncounterLink><a className="for-you-text-link" href="#profile-example">{fr ? "Voir un exemple" : "See an example"}<Icon name="arrow" width={16} height={16} /></a></div>
          <p className="for-you-share">{fr ? "Votre profil public accueille les demandes. Vos canaux connectés lui permettent aussi d’aller vers vos contacts et de recruter des affiliés." : "Your public profile welcomes enquiries. Connected channels also let your Collaborator reach out to contacts and recruit affiliates."}</p>
        </div>
        <div className="for-you-preview"><PublicDoorPreview language={language} mission={fr ? "Vous cherchez un Collaborateur IA, du code, un contenu ou une mission ? Parlons de votre besoin." : "Looking for an AI Collaborator, code, content or a mission? Let’s talk about what you need."} /><p>{fr ? "Aperçu de votre accueil public. Les fonctions commerciales présentées sont le parcours cible ; les connexions sont encore à mettre en place." : "A preview of your public welcome. The commercial capabilities describe the intended journey; integrations are still to be connected."}</p></div>
      </section>

      <section className="for-you-offers content-container" aria-labelledby="for-you-offers-title"><div className="for-you-section-intro"><h2 id="for-you-offers-title">{fr ? <>Vos offres.<br />Un même Collaborateur pour les vendre.</> : <>Your offers.<br />One Collaborator to sell them.</>}</h2><p>{fr ? "Des produits numériques aux prestations de service, il est conçu pour expliquer ce que vous vendez et accompagner chaque acheteur." : "From digital products to services, it is designed to explain what you sell and support each buyer."}</p></div><dl className="for-you-offer-list">{offers.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></section>

      <section className="for-you-benefits content-container" aria-labelledby="for-you-benefits-title">
        <div className="for-you-section-intro"><h2 id="for-you-benefits-title">{fr ? <>Du premier contact<br />à la relation qui dure.</> : <>From the first contact<br />to a lasting relationship.</>}</h2><p>{fr ? "Le parcours commercial prévu relie votre profil public, l’email, le téléphone, l’agenda, le paiement et vos outils de relation client." : "The intended commercial journey connects your public profile, email, phone, calendar, payments and customer relationship tools."}</p></div>
        <div className="for-you-benefit-list">{benefits.map(([title, subtitle, body]) => <article key={title}><h3>{title}<span>{subtitle}</span></h3><p>{body}</p></article>)}</div>
      </section>

      <section id="profile-example" className="for-you-example content-container" aria-labelledby="for-you-example-title">
        <div><h2 id="for-you-example-title">{fr ? "Essayez l’accueil avec Patrick." : "Try the public welcome with Patrick."}</h2><p>{fr ? "Son profil donne un aperçu du point d’entrée public : poser une question, préparer un message ou une demande de rendez-vous, et essayer les interfaces interactives. La prospection, la vente et l’encaissement ne sont pas exécutés dans cet exemple." : "His profile demonstrates the public entry point: ask a question, prepare a message or meeting request, and try interactive answers. This example does not carry out outbound prospecting, sales or payment collection."}</p><Link className="button button-outline" href="/@patrick-chassany">{fr ? "Explorer son profil public" : "Explore his public profile"}<Icon name="arrow" /></Link></div>
        <div className="for-you-example-person"><Image src="/images/patrick-chassany.jpg" width={120} height={120} alt="Patrick Chassany" sizes="120px" /><div><h3>Patrick Chassany</h3><p>{fr ? "Son Collaborateur IA public" : "His public AI Collaborator"}</p><span>@patrick-chassany</span></div></div>
      </section>

      <section className="for-you-control content-container" aria-labelledby="for-you-control-title"><h2 id="for-you-control-title">{fr ? <>Il suit les interactions.<br />Vous gardez la main.</> : <>It follows the interactions.<br />You stay in control.</>}</h2><div><p>{fr ? "Vous définissez qui il peut contacter, ce qu’il peut proposer et les engagements qui demandent votre validation. Sa connaissance de vos offres reste distincte de la mémoire des échanges avec chaque contact. Vos prix, vos conditions de vente et les règles de votre programme d’affiliation restent sous votre contrôle." : "You define who it can contact, what it can offer and which commitments need your approval. Its knowledge of your offers stays distinct from its memory of each contact’s conversations. Your prices, sales terms and affiliate-program rules remain under your control."}</p><Link className="for-you-text-link" href={marketingPath("/privacy", language)}>{fr ? "Comprendre les choix de confidentialité" : "Understand your privacy choices"}<Icon name="arrow" width={16} height={16} /></Link></div></section>

      <section className="for-you-closing content-container" aria-labelledby="for-you-closing-title"><h2 id="for-you-closing-title">{fr ? "Confiez-lui le suivi. Développez la relation." : "Hand over the follow-up. Grow the relationship."}</h2><div className="for-you-actions"><EncounterLink language={language} marketing className="button button-primary">{fr ? "Créer mon Collaborateur" : "Create my Collaborator"}<Icon name="arrow" /></EncounterLink><Link className="for-you-text-link" href={marketingPath("/pricing", language)}>{fr ? "Découvrir l’offre" : "Explore the offer"}<Icon name="arrow" width={16} height={16} /></Link></div><p>{fr ? "Disponible aujourd’hui : les aperçus interactifs. La publication du profil, l’IA en direct, la prospection par email et téléphone, la vente, l’encaissement, l’affiliation et la synchronisation CRM restent à connecter. Les rendez-vous et messages dépendent des services configurés." : "Available today: interactive previews. Profile publishing, live AI, email and phone outreach, sales, payment collection, affiliate management and CRM sync remain to be connected. Meetings and message delivery depend on configured services."}</p></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

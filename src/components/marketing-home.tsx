import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { OwnershipOptions } from "@/components/ownership-options";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { ChannelRibbon } from "@/components/channel-ribbon";
import { AI_HISTORY_SOURCES, AIProviderLogo } from "@/components/ai-provider-logo";
import { HeroWorkProof, WorkDemo } from "@/components/work-demo";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { Icon } from "@/components/icons";
import { LinkedInLogo } from "./linkedin-logo";
import { localizedOffer, marketingPath } from "@/lib/marketing-language";
import { MarketingFAQ } from "./marketing-faq";
import { PublicDoorPreview } from "./public-door-preview";
import "../app/home.css";

export function MarketingHome({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const offer = localizedOffer(language);
  return <div lang={language} className="marketing-home conversion-home">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="home-hero work-hero english-hero" id="creer" aria-labelledby="home-title">
        <div className="hero-content">
          <h1 id="home-title"><span className="hero-title-line">{fr ? "Votre Collaborateur IA." : "Your AI Collaborator."}</span><span className="hero-title-promise">{fr ? "Il garde le fil de vos relations." : "It keeps your relationships moving."}</span></h1>
          <p className="hero-outcome">{fr ? "Messages, appels, rendez-vous : il comprend le contexte et fait avancer la suite." : "Messages, calls, meetings: it understands the context and moves the next step forward."}</p>
          <p className="hero-explanation">{fr ? "Vous gardez les décisions." : "You keep the decisions."}</p>
          <div className="hero-conversion-actions"><EncounterLink className="button button-primary" language={language} marketing channel="linkedin"><LinkedInLogo className="linkedin-button-mark" /><span>{fr ? "Commencer gratuitement" : "Start for free"}</span><Icon name="arrow" /></EncounterLink><Link href={marketingPath("/how-it-works", language)} className="hero-secondary-action">{fr ? "Comment ça marche" : "How it works"} <Icon name="arrow" /></Link></div>
          <p className="hero-price">{offer.monthly} / {fr ? "mois · Résiliable à tout moment" : "month · Cancel anytime"}</p>
          <p className="hero-allowance">{offer.monthlyTokens}</p>
          <p className="hero-usage">{offer.trialShort}</p>
        </div>
        <div className="home-hero-media">
          <Image src="/images/professional-conversation.jpg" alt={fr ? "Deux professionnelles échangent autour d’un ordinateur." : "Two professionals exchanging ideas over a laptop."} fill preload sizes="(max-width: 959px) 100vw, 68vw" className="home-hero-photo" />
          <div className="home-hero-overlay" />
          <HeroWorkProof language={language} />
        </div>
      </section>

      <section className="home-relationships" id="how-it-works" aria-labelledby="work-title">
        <div className="relationship-ribbon relationship-ribbon-top" aria-hidden="true">
          <Image src="/images/portrait-01.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 64px, 100px" className="relationship-portrait portrait-one" />
          <span className="relationship-message relationship-message-white">{fr ? "Trouvons un moment pour échanger." : "Let’s find a time to talk."}</span>
          <Image src="/images/portrait-02.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 56px, 80px" className="relationship-portrait portrait-two" />
          <span className="relationship-message relationship-message-pink">{fr ? "Je prépare le suivi." : "I’ll prepare the follow-up."} <Icon name="check" width="18" height="18" /></span>
          <Image src="/images/portrait-03.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 72px, 112px" className="relationship-portrait portrait-three" />
        </div>
        <div className="marketing-section work-summary content-container">
          <div className="work-conversion-copy"><h2 id="work-title">{fr ? <>Transformez un échange<br /><span className="work-title-highlight">en prochain pas utile.</span></> : <>Turn a conversation<br /><span className="work-title-highlight">into a useful next step.</span></>}</h2><p>{fr ? "Une demande arrive. Un prospect appelle. Un client a besoin d’aide." : "An enquiry arrives. A prospect calls. A customer needs help."}</p><p>{fr ? "Votre Collaborateur retrouve le contact, garde l’historique et suit les engagements. Vous intervenez lorsqu’une décision compte." : "Your Collaborator finds the contact, keeps the history and follows commitments. You step in when a decision matters."}</p></div>
          <div id="work-example" className="work-example-anchor"><WorkDemo language={language} /></div>
          <div className="work-start"><ChannelRibbon /><p className="work-connection-copy">{fr ? "Vos échanges, là où ils arrivent : email, site, WhatsApp, LinkedIn, Slack, Telegram, Discord et Google Meet." : "Your conversations, wherever they arrive: email, website, WhatsApp, LinkedIn, Slack, Telegram, Discord and Google Meet."}</p><p className="work-phone-copy"><Icon name="phone" /><span>{fr ? "Un numéro pour répondre aux appels et rappeler pour vous, selon vos permissions. Connexion téléphonique prévue." : "A number to receive calls and call back for you, with your permission. Phone connection planned."}</span></p></div>
        </div>
      </section>

      <section className="migration-section" id="history" aria-labelledby="history-title">
        <div className="marketing-section content-container">
          <div><h2 id="history-title">{fr ? <>Votre contexte.<br /><span>Une longueur d’avance.</span></> : <>Your context.<br /><span>A head start.</span></>}</h2><p>{fr ? "Vous avez déjà expliqué votre travail à l’IA. Votre Collaborateur ne devrait pas repartir de zéro." : "You’ve already explained your work to AI. Your Collaborator shouldn’t have to start from zero."}</p><p className="migration-promise">{fr ? "Apportez l’histoire. Gardez le contexte." : "Bring the history. Keep the context."}</p><p className="capability-note">{fr ? "L’import en un clic est prévu pour ces sources." : "One-click import is planned for these sources."}</p></div>
          <div className="history-illustration" aria-label={fr ? "Votre contexte IA précédent, transmis à votre Collaborateur" : "Your previous AI context, brought to your Collaborator"}><ul>{AI_HISTORY_SOURCES.map(source => <li key={source}><span className="history-provider-logo"><AIProviderLogo provider={source} /></span><span>{source}</span></li>)}</ul><div className="history-destination"><Icon name="message" width="30" height="30" /><span>{fr ? "Votre Collaborateur" : "Your Collaborator"}</span></div><p>{fr ? "Vous ne partez pas de zéro." : "You don’t start from zero."}</p></div>
        </div>
      </section>

      <section className="ownership-section ownership-config" id="ownership" aria-labelledby="ownership-title">
        <div className="marketing-section content-container">
          <div><h2 id="ownership-title">{fr ? <>À vous.<br /><span>À vos conditions.</span></> : <>Yours.<br /><span>On your terms.</span></>}</h2><p className="runtime-copy">{fr ? "Votre identité. Vos connaissances. Votre mémoire. Un Collaborateur conçu pour vous accompagner dans la durée." : "Your identity. Your knowledge. Your memory. A Collaborator designed to stay with you over time."}</p></div>
          <div className="ownership-simple"><p>{fr ? "Commencez par une mission. Vous pourrez ensuite choisir son hébergement et son intelligence." : "Start with one mission. Choose its hosting and intelligence when you need to."}</p><EncounterLink className="button button-primary" language={language} marketing>{fr ? "Commencer gratuitement" : "Start for free"}<Icon name="arrow" /></EncounterLink><details className="ownership-choices"><summary>{fr ? "Hébergement et intelligence" : "Hosting and intelligence"}<Icon name="plus" /></summary><OwnershipOptions language={language} /><p className="ownership-runtime-note">{fr ? "Conçu pour fonctionner sur " : "Designed to run on "}<a href="https://github.com/NousResearch/hermes-agent">Hermes<Icon name="external" width="16" height="16" /></a>{fr ? ". Intégration et déploiement prévus." : ". Integration and deployment planned."}</p></details></div>
        </div>
      </section>

      <section className="authority-section content-container" id="authority" aria-labelledby="authority-title">
        <div className="authority-heading"><h2 id="authority-title">{fr ? <>Déléguez le travail.<br /><span>Gardez les décisions.</span></> : <>Delegate the work.<br /><span>Keep the decisions.</span></>}</h2><p>{fr ? <>Définissez les limites.<br />Intervenez là où votre jugement compte.</> : <>Set the boundaries once.<br />Stay involved where your judgment matters.</>}</p></div>
        <dl className="authority-levels"><div><dt lang="en"><Icon name="check" />DO IT</dt><dd>{fr ? <>Préparer. Organiser le contexte.<br />Travailler selon vos règles.</> : <>Prepare briefs. Organize context.<br />Work inside the rules you set.</>}</dd></div><div><dt lang="en"><Icon name="message" />ASK ME</dt><dd>{fr ? <>Envoyer une réponse importante ?<br />Prendre un engagement ? Vous décidez.</> : <>Send an important reply?<br />Make a commitment? You decide.</>}</dd></div><div><dt lang="en"><Icon name="close" />NEVER DO IT</dt><dd>{fr ? <>Vos limites absolues.<br />Aucune exception.</> : <>Your hard boundaries.<br />No exceptions.</>}</dd></div></dl>
      </section>

      <aside className="home-privacy-note content-container" aria-label={fr ? "Confidentialité" : "Privacy"}><Icon name="lock" /><p>{fr ? "Votre contexte. Vos permissions. Votre choix d’hébergement." : "Your context. Your permissions. Your choice of hosting."}</p><Link className="text-link" href={marketingPath("/privacy", language)}>{fr ? "Comprendre vos choix" : "Understand your choices"}<Icon name="arrow" /></Link></aside>

      <section className="marketing-section collaborator-showcase public-door content-container" id="public-presence" aria-labelledby="door-title">
        <div><h2 id="door-title">{fr ? <>Votre porte<br /><span>d’entrée publique.</span></> : <>Your public<br /><span>front door.</span></>}</h2><p>{fr ? "Un lien. Votre Collaborateur accueille et prépare la suite." : "One link. Your Collaborator welcomes people and prepares the next step."}</p><p>{fr ? "Depuis votre site, LinkedIn ou votre signature email. Vous intervenez lorsqu’on a besoin de vous." : "From your website, LinkedIn or email signature. You step in when you’re needed."}</p><EncounterLink className="button button-primary" language={language} marketing>{fr ? "Commencer gratuitement" : "Start for free"}<Icon name="arrow" /></EncounterLink><Link className="text-link public-door-patrick-link" href="/@patrick">{fr ? "Parler au Collaborateur de Patrick" : "Talk to Patrick’s Collaborator"} <Icon name="arrow" /></Link></div>
        <PublicDoorPreview language={language} />
      </section>

      <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
        <div className="marketing-section content-container"><div><h2 id="pricing-title">{fr ? <>Vos relations.<br /><span>Un Collaborateur.</span></> : <>Your relationships.<br /><span>One Collaborator.</span></>}</h2><p>{fr ? "Vos contacts, leur histoire et les prochaines étapes. Un Collaborateur pour garder le fil, avec de l’IA incluse." : "Your contacts, their history and their next steps. One Collaborator to keep the thread, with AI included."}</p><p className="pricing-ownership-line">{fr ? "CRM et support en option, seulement si vous en avez besoin." : "Optional CRM and support apps, only when you need them."}</p><Link className="text-link" href={`${marketingPath("/pricing", language)}#applications`}>{fr ? "Voir les applications facultatives" : "Explore optional apps"}<Icon name="arrow" /></Link></div><CollaboratorPricing language={language} /></div>
      </section>

      <MarketingFAQ language={language} />
      <section className="closing-section content-container"><h2>{fr ? <>Vous n’avez pas à<br />être partout.<br /><span>Votre Collaborateur peut.</span></> : <>You don’t have to<br />be everywhere.<br /><span>Your Collaborator can.</span></>}</h2><p>{fr ? "Commencez par ce que vous aimeriez déléguer." : "Start with one thing you’d like off your plate."}</p><EncounterLink className="button button-primary" language={language} marketing>{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

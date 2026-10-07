import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { OwnershipOptions } from "@/components/ownership-options";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { HomeEntry } from "@/components/home-entry";
import { ChannelRibbon } from "@/components/channel-ribbon";
import { AI_HISTORY_SOURCES, AIProviderLogo } from "@/components/ai-provider-logo";
import { HeroWorkProof, WorkDemo } from "@/components/work-demo";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { Icon } from "@/components/icons";
import { localizedOffer } from "@/lib/marketing-language";
import { MarketingFAQ } from "./marketing-faq";
import "../app/home.css";

export function MarketingHome({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const offer = localizedOffer(language);
  return <div lang={language} className="marketing-home conversion-home">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="home-hero work-hero english-hero" id="creer" aria-labelledby="home-title">
        <div className="hero-content">
          <h1 id="home-title">{fr ? <>Votre Collaborateur<br />IA.<br /><span>Il travaille pour vous.</span></> : <>Your AI<br />Collaborator.<br /><span>It works for you.</span></>}</h1>
          <p className="hero-outcome">{fr ? <>Le suivi. Le prochain rendez-vous.<br />L’opportunité à ne pas manquer.</> : <>The follow-up. The next meeting.<br />The opportunity you don’t want to miss.</>}</p>
          <p className="hero-explanation">{fr ? "Confiez-lui le travail. Gardez le dernier mot." : "Give it the work. Keep the final say."}</p>
          <div className="hero-conversion-actions"><Link href="#work-example" className="button button-primary">{fr ? "Voir le travail" : "See it do the work"} <Icon name="arrow" /></Link><EncounterLink className="hero-secondary-action" language={language} marketing>{fr ? "Rencontrer le mien" : "Meet yours"} <Icon name="arrow" /></EncounterLink></div>
          <p className="hero-price">{offer.monthly} / {fr ? "mois · Résiliable à tout moment" : "month · Cancel anytime"}</p>
          <p className="hero-usage">{fr ? "Usage IA facturé séparément." : "AI usage separate."}</p>
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
          <div className="work-conversion-copy"><h2 id="work-title">{fr ? <>Moins de relances.<br /><span>Plus d’avancées.</span></> : <>Less chasing.<br /><span>More moving forward.</span></>}</h2><p>{fr ? "Un échange devient un prochain pas utile. Un suivi à relire. Une piste à qualifier. Une préparation avant le rendez-vous." : "Turn a conversation into a useful next step. A follow-up to review. A lead to qualify. A brief before you meet."}</p></div>
          <div id="work-example" className="work-example-anchor"><WorkDemo language={language} /></div>
          <div className="work-start"><ChannelRibbon /><p className="work-connection-copy">{fr ? "Conçu pour votre site, email, WhatsApp, Slack, LinkedIn et plus encore." : "Designed for your website, email, WhatsApp, Slack, LinkedIn and more."}</p><HomeEntry language={language} /></div>
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
          <div><h2 id="ownership-title">{fr ? <>À vous.<br /><span>À vos conditions.</span></> : <>Yours.<br /><span>On your terms.</span></>}</h2><p className="runtime-copy">{fr ? <>Votre identité. Vos connaissances. Votre mémoire.<br />Choisissez où votre Collaborateur travaille et ce qui lui donne son intelligence.</> : <>Your identity. Your knowledge. Your memory.<br />Choose where your Collaborator runs and what powers it.</>}</p><details className="runtime-details"><summary>{fr ? "Conçu pour rester portable" : "Built for portability"} <Icon name="plus" /></summary><p>{fr ? "Conçu pour fonctionner sur " : "Designed to run on "}<a href="https://github.com/NousResearch/hermes-agent" className="runtime-link">Hermes <Icon name="external" width="16" height="16" /></a>{fr ? ", un moteur open source. L’intégration est prévue." : ", an open-source runtime. Integration is planned."}</p></details></div>
          <OwnershipOptions language={language} />
        </div>
      </section>

      <section className="authority-section content-container" id="authority" aria-labelledby="authority-title">
        <div className="authority-heading"><h2 id="authority-title">{fr ? <>Déléguez le travail.<br /><span>Gardez les décisions.</span></> : <>Delegate the work.<br /><span>Keep the decisions.</span></>}</h2><p>{fr ? <>Définissez les limites.<br />Intervenez là où votre jugement compte.</> : <>Set the boundaries once.<br />Stay involved where your judgment matters.</>}</p></div>
        <dl className="authority-levels"><div><dt lang="en"><Icon name="check" />DO IT</dt><dd>{fr ? <>Préparer. Organiser le contexte.<br />Travailler selon vos règles.</> : <>Prepare briefs. Organize context.<br />Work inside the rules you set.</>}</dd></div><div><dt lang="en"><Icon name="message" />ASK ME</dt><dd>{fr ? <>Envoyer une réponse importante ?<br />Prendre un engagement ? Vous décidez.</> : <>Send an important reply?<br />Make a commitment? You decide.</>}</dd></div><div><dt lang="en"><Icon name="close" />NEVER DO IT</dt><dd>{fr ? <>Vos limites absolues.<br />Aucune exception.</> : <>Your hard boundaries.<br />No exceptions.</>}</dd></div></dl>
      </section>

      <section className="marketing-section collaborator-showcase public-door content-container" id="public-presence" aria-labelledby="door-title">
        <div><h2 id="door-title">{fr ? <>Votre porte<br /><span>d’entrée publique.</span></> : <>Your public<br /><span>front door.</span></>}</h2><p>{fr ? "Un lien. Un premier échange utile." : "One link. A useful first conversation."}</p><p>{fr ? "Accueillez vos contacts depuis votre site, LinkedIn ou votre signature email. Vous intervenez lorsqu’on a besoin de vous." : "Let people reach your Collaborator from your website, LinkedIn or email signature. You step in when you’re needed."}</p><Link className="button button-primary" href="/@patrick">{fr ? "Parler au Collaborateur de Patrick" : "Talk to Patrick’s Collaborator"} <Icon name="arrow" /></Link></div>
        <div className="patrick-invitation"><div className="invitation-identity"><span className="avatar">PC</span><div><strong>{fr ? "Le Collaborateur de Patrick" : "Patrick’s Collaborator"}</strong><span>Patrick Chassany · {fr ? "Fondateur de Unitalk" : "Founder Unitalk"}</span></div></div><blockquote>{fr ? <>Voici comment<br /><span>échanger avec moi.</span></> : <>Here’s how to<br /><span>interact with me.</span></>}</blockquote><Link href="/@patrick" className="public-address"><Icon name="link" /><span>unitalk.com/@patrick</span><Icon name="arrow" /></Link></div>
      </section>

      <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
        <div className="marketing-section content-container"><div><h2 id="pricing-title">{fr ? <>Un Collaborateur.<br /><span>À faire grandir.</span></> : <>One Collaborator.<br /><span>Yours to build on.</span></>}</h2><p>{fr ? "Identité, connaissances, mémoire, compétences, outils et autorité. Un Collaborateur qui garde le fil, façonné autour de votre travail." : "Identity, knowledge, memory, skills, tools and authority. One ongoing Collaborator, shaped around your work."}</p><p className="pricing-ownership-line">{fr ? <>Un abonnement pour votre Collaborateur.<br />L’usage de l’IA séparé, à votre façon.</> : <>A subscription for your Collaborator.<br />AI usage funded separately, your way.</>}</p></div><CollaboratorPricing language={language} /></div>
      </section>

      <MarketingFAQ language={language} />
      <section className="closing-section content-container"><h2>{fr ? <>Vous n’avez pas à<br />être partout.<br /><span>Votre Collaborateur peut.</span></> : <>You don’t have to<br />be everywhere.<br /><span>Your Collaborator can.</span></>}</h2><p>{fr ? "Commencez par ce que vous aimeriez déléguer." : "Start with one thing you’d like off your plate."}</p><EncounterLink className="button button-primary" language={language} marketing>{fr ? "Rencontrer mon Collaborateur" : "Meet your Collaborator"} <Icon name="arrow" /></EncounterLink></section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

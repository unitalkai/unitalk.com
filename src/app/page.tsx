import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { OwnershipOptions } from "@/components/ownership-options";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { HomeEntry } from "@/components/home-entry";
import { HeroWorkProof, WorkDemo } from "@/components/work-demo";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { Icon } from "@/components/icons";
import { COLLABORATOR_OFFER } from "@/lib/collaborator-offer";

const description = "Your AI Collaborator. It works for you. Follow-ups prepared. Opportunities clarified. Meetings ready. See the work, meet yours, and keep the final say.";

export const metadata: Metadata = {
  title: "Your AI Collaborator. It works for you.",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Your AI Collaborator. It works for you.", description, url: "https://unitalk.com", siteName: "Unitalk", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Your AI Collaborator. It works for you.", description },
};

export default function Home() {
  return <div lang="en" className="marketing-home">
    <SiteHeader language="en" />
    <main id="main-content">
      <section className="home-hero work-hero english-hero" id="creer" aria-labelledby="home-title">
        <div className="hero-content">
          <h1 id="home-title">Your AI<br />Collaborator.<br /><span>It works for you.</span></h1>
          <p className="hero-outcome">The follow-up. The next meeting.<br />The opportunity you don’t want to miss.</p>
          <p className="hero-explanation">Give it the work. Keep the final say.</p>
          <div className="hero-conversion-actions"><Link href="#work-example" className="button button-primary">See it do the work <Icon name="arrow" /></Link><EncounterLink className="hero-secondary-action" language="en">Meet yours <Icon name="arrow" /></EncounterLink></div>
          <p className="hero-price">{COLLABORATOR_OFFER.monthly} / month · Cancel anytime</p>
          <p className="hero-usage">AI usage separate. Explore the demo without payment.</p>
        </div>
        <div className="home-hero-media">
          <Image src="/images/professional-conversation.jpg" alt="Two professionals exchanging ideas over a laptop." fill preload sizes="(max-width: 959px) 100vw, 68vw" className="home-hero-photo" />
          <div className="home-hero-overlay" />
          <HeroWorkProof />
        </div>
      </section>

      <section className="home-relationships" id="how-it-works" aria-labelledby="work-title">
        <div className="relationship-ribbon relationship-ribbon-top" aria-hidden="true">
          <Image src="/images/portrait-01.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 64px, 100px" className="relationship-portrait portrait-one" />
          <span className="relationship-message relationship-message-white">Let’s find a time to talk.</span>
          <Image src="/images/portrait-02.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 56px, 80px" className="relationship-portrait portrait-two" />
          <span className="relationship-message relationship-message-pink">I’ll prepare the follow-up. <Icon name="check" width="18" height="18" /></span>
          <Image src="/images/portrait-03.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 72px, 112px" className="relationship-portrait portrait-three" />
        </div>
        <div className="marketing-section work-summary content-container">
          <div className="work-conversion-copy"><h2 id="work-title">Less chasing.<br /><span>More moving forward.</span></h2><p>Turn a conversation into a useful next step. A follow-up to review. A lead to qualify. A brief before you meet.</p><p className="work-connection-copy">Designed for your website, email, WhatsApp, Slack, LinkedIn and more.</p><HomeEntry /></div>
          <div id="work-example" className="work-example-anchor"><WorkDemo /></div>
        </div>
        <div className="relationship-ribbon relationship-ribbon-bottom" aria-hidden="true">
          <span className="relationship-message relationship-message-pink">What should we do next?</span>
          <Image src="/images/portrait-04.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 64px, 96px" className="relationship-portrait portrait-four" />
          <span className="relationship-message relationship-message-white"><Icon name="message" width="20" height="20" />When it matters, I’ll ask you.</span>
          <Image src="/images/portrait-05.jpg" alt="" width={480} height={480} sizes="(max-width: 699px) 64px, 88px" className="relationship-portrait portrait-five" />
        </div>
        <p className="relationship-caption">Illustrative portraits and conversations · Unsplash</p>
      </section>

      <section className="marketing-section collaborator-showcase patrick-proof content-container" id="patrick" aria-labelledby="patrick-title">
        <div><h2 id="patrick-title">Patrick already<br />has one.<br /><span>Meet his Collaborator.</span></h2><Link className="button button-primary" href="/@patrick">Talk to Patrick’s Collaborator <Icon name="arrow" /></Link></div>
        <div className="patrick-invitation"><div className="invitation-identity"><span className="avatar">PC</span><div><strong>Patrick’s Collaborator</strong><span>Public AI Collaborator</span></div></div><blockquote>Hi. I’m Patrick’s<br />Collaborator.<br /><span>What brings you here?</span></blockquote><p><span className="demo-label">Interactive demo</span></p></div>
      </section>

      <section className="migration-section" id="history" aria-labelledby="history-title">
        <div className="marketing-section content-container">
          <div><h2 id="history-title">Your context.<br /><span>A head start.</span></h2><p>You’ve already explained your work to AI. Your Collaborator shouldn’t have to start from zero.</p><p className="migration-promise">Bring the history. Keep the context.</p><p className="capability-note">One-click import is planned for these sources.</p></div>
          <div className="history-illustration" aria-label="Your previous AI context, brought to your Collaborator"><ul>{["ChatGPT", "Claude", "OpenClaw", "Gemini", "Grok", "Hermes"].map(source => <li key={source}><Icon name="message" /><span>{source}</span><Icon name="arrow" /></li>)}</ul><div className="history-destination"><Icon name="message" width="30" height="30" /><span>Your Collaborator</span></div><p>You don’t start from zero.</p></div>
        </div>
      </section>

      <section className="ownership-section ownership-config" id="ownership" aria-labelledby="ownership-title">
        <div className="marketing-section content-container">
          <div><h2 id="ownership-title">Yours.<br /><span>On your terms.</span></h2><p className="runtime-copy">Your identity. Your knowledge. Your memory.<br />Choose where your Collaborator runs and what powers it.</p><details className="runtime-details"><summary>Built for portability <Icon name="plus" /></summary><p>Designed to run on <a href="https://github.com/NousResearch/hermes-agent" className="runtime-link">Hermes <Icon name="external" width="16" height="16" /></a>, an open-source runtime. Integration is planned.</p></details></div>
          <OwnershipOptions />
        </div>
      </section>

      <section className="authority-section content-container" id="authority" aria-labelledby="authority-title">
        <div className="authority-heading"><h2 id="authority-title">Delegate the work.<br /><span>Keep the decisions.</span></h2><p>Set the boundaries once.<br />Stay involved where your judgment matters.</p></div>
        <dl className="authority-levels"><div><dt><Icon name="check" />DO IT</dt><dd>Prepare briefs. Organize context.<br />Work inside the rules you set.</dd></div><div><dt><Icon name="message" />ASK ME</dt><dd>Send an important reply?<br />Make a commitment? You decide.</dd></div><div><dt><Icon name="close" />NEVER DO IT</dt><dd>Your hard boundaries.<br />No exceptions.</dd></div></dl>
      </section>

      <section className="marketing-section collaborator-showcase public-door content-container" id="public-presence" aria-labelledby="door-title">
        <div><h2 id="door-title">Your public<br /><span>front door.</span></h2><p>One link. A useful first conversation.</p><p>Let people reach your Collaborator from your website, LinkedIn or email signature. You step in when you’re needed.</p><Link className="button button-primary" href="/@patrick">See Patrick’s front door <Icon name="arrow" /></Link></div>
        <div className="patrick-invitation"><div className="invitation-identity"><span className="avatar">PC</span><div><strong>Patrick’s Collaborator</strong><span>A public way to reach me.</span></div></div><blockquote>Here’s how to<br /><span>interact with me.</span></blockquote><Link href="/@patrick" className="public-address"><Icon name="link" /><span>unitalk.com/@patrick</span><Icon name="arrow" /></Link></div>
      </section>

      <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
        <div className="marketing-section content-container"><div><h2 id="pricing-title">One Collaborator.<br /><span>Yours to build on.</span></h2><p>Identity, knowledge, memory, skills, tools and authority. One ongoing Collaborator, shaped around your work.</p><p className="pricing-ownership-line">A subscription for your Collaborator.<br />AI usage funded separately, your way.</p></div><CollaboratorPricing language="en" /></div>
      </section>

      <section className="closing-section content-container"><h2>You don’t have to<br />be everywhere.<br /><span>Your Collaborator can.</span></h2><p>Start with one thing you’d like off your plate.</p><EncounterLink className="button button-primary" language="en">Meet your Collaborator <Icon name="arrow" /></EncounterLink><p className="ownership-signature">Own your intelligence.</p></section>
    </main>
    <SiteFooter language="en" />
  </div>;
}

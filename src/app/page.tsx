import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { OwnershipOptions } from "@/components/ownership-options";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { HomeEntry } from "@/components/home-entry";
import { Icon } from "@/components/icons";
import { COLLABORATOR_OFFER } from "@/lib/collaborator-offer";

const description = "Your AI Collaborator. It works for you. It learns who you are, understands your relationships, and handles the work you give it. Own your intelligence.";

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
        <Image src="/images/working-together.jpg" alt="" fill preload sizes="100vw" className="hero-photo" />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1 id="home-title">Your AI<br />Collaborator.<br /><span>It works for you.</span></h1>
          <p>Connect it to your website, email, WhatsApp, Slack, LinkedIn and more.</p>
          <p className="hero-explanation">It learns who you are, understands your relationships, and handles the work you give it.</p>
          <HomeEntry />
          <p className="hero-price">{COLLABORATOR_OFFER.monthly} / month · Cancel anytime</p>
        </div>
        <Image src="/images/working-together.jpg" alt="An illustrative working scene, not the Unitalk team." width={1800} height={1200} sizes="(max-width: 699px) 100vw, 1px" className="hero-mobile-photo" />
      </section>
      <div className="hero-caption"><span>Illustrative photograph · Unsplash</span></div>

      <section className="marketing-section work-summary content-container" id="how-it-works" aria-labelledby="work-title">
        <h2 id="work-title">It starts working<br /><span>when you connect it.</span></h2>
        <div className="section-copy"><p>It reads your conversations, understands your relationships, organizes your contacts and opportunities, responds, follows up and acts.</p><p>When only you can decide, it asks you.</p><blockquote>You only get involved<br /><span>when you’re needed.</span></blockquote></div>
      </section>

      <section className="marketing-section collaborator-showcase patrick-proof content-container" id="patrick" aria-labelledby="patrick-title">
        <div><h2 id="patrick-title">Patrick already<br />has one.<br /><span>Meet his Collaborator.</span></h2><Link className="button button-primary" href="/@patrick">Talk to Patrick’s Collaborator <Icon name="arrow" /></Link></div>
        <div className="patrick-invitation"><div className="invitation-identity"><span className="avatar">PC</span><div><strong>Patrick’s Collaborator</strong><span>Public AI Collaborator</span></div></div><blockquote>Hi. I’m Patrick’s<br />Collaborator.<br /><span>What brings you here?</span></blockquote><p><span className="demo-label">Interactive demo</span></p></div>
      </section>

      <section className="migration-section" id="history" aria-labelledby="history-title">
        <div className="marketing-section content-container">
          <div><h2 id="history-title">Bring your<br /><span>AI history.</span></h2><p>Already using ChatGPT, Claude, OpenClaw, Gemini, Grok or Hermes?</p><p className="migration-promise">Import your history in one click.</p><p className="capability-note">History import is planned for these sources.<br />It isn’t available in this preview.</p></div>
          <div className="history-illustration" aria-label="Your previous AI context, brought to your Collaborator"><ul>{["ChatGPT", "Claude", "OpenClaw", "Gemini", "Grok", "Hermes"].map(source => <li key={source}><Icon name="message" /><span>{source}</span><Icon name="arrow" /></li>)}</ul><div className="history-destination"><Icon name="message" width="30" height="30" /><span>Your Collaborator</span></div><p>You don’t start from zero.</p></div>
        </div>
      </section>

      <section className="ownership-section ownership-config" id="ownership" aria-labelledby="ownership-title">
        <div className="marketing-section content-container">
          <div><h2 id="ownership-title">Yours<br /><span>means yours.</span></h2><p className="runtime-copy">Designed to run on <a href="https://github.com/NousResearch/hermes-agent" className="runtime-link">Hermes <Icon name="external" width="16" height="16" /></a>, an autonomous open-source AI runtime.</p><p className="runtime-support">Your Collaborator is the identity.<br />Hermes is the engine.</p></div>
          <OwnershipOptions />
        </div>
      </section>

      <section className="authority-section content-container" id="authority" aria-labelledby="authority-title">
        <h2 id="authority-title">You decide<br /><span>what it can decide.</span></h2>
        <dl className="authority-levels"><div><dt><Icon name="check" />DO IT</dt><dd>Act within its authority.</dd></div><div><dt><Icon name="message" />ASK ME</dt><dd>Ask before important decisions.</dd></div><div><dt><Icon name="close" />NEVER DO IT</dt><dd>Never cross the line.</dd></div></dl>
        <blockquote>“Handle my inbound. Book meetings. Qualify opportunities. Ask me before anything important.”</blockquote>
      </section>

      <section className="marketing-section collaborator-showcase public-door content-container" id="public-presence" aria-labelledby="door-title">
        <div><h2 id="door-title">Your public<br /><span>front door.</span></h2><p>Your Collaborator has its own identity and URL.</p><p>Put it on LinkedIn, your email signature, website or QR code.</p><Link className="button button-primary" href="/@patrick">See a public Collaborator <Icon name="arrow" /></Link></div>
        <div className="patrick-invitation"><div className="invitation-identity"><span className="avatar">PC</span><div><strong>Patrick’s Collaborator</strong><span>A public way to reach me.</span></div></div><blockquote>Here’s how to<br /><span>interact with me.</span></blockquote><Link href="/@patrick" className="public-address"><Icon name="link" /><span>unitalk.com/@patrick</span><Icon name="arrow" /></Link></div>
      </section>

      <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
        <div className="marketing-section content-container"><div><h2 id="pricing-title">Your own<br />AI Collaborator.<br /><span>One simple price.</span></h2><p>Identity. Memory. Knowledge.<br />Skills. Tools. Authority.</p><p className="pricing-ownership-line">The work it does.<br />The context you build.<br />Yours.</p></div><CollaboratorPricing /></div>
      </section>

      <section className="closing-section content-container"><h2>You don’t have to<br />be everywhere.<br /><span>Your Collaborator can.</span></h2><p>Own your intelligence.</p><Link className="text-link" href="#home-domain">Enter your domain name <Icon name="arrow" /></Link></section>
    </main>
    <SiteFooter language="en" />
  </div>;
}

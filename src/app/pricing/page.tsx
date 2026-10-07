import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { CollaboratorPricing } from "@/components/collaborator-pricing";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { PricingHosting } from "@/components/pricing-hosting";
import { COLLABORATOR_OFFER } from "@/lib/collaborator-offer";
import { Icon } from "@/components/icons";

const description = `Your own AI Collaborator for ${COLLABORATOR_OFFER.monthly}/month or ${COLLABORATOR_OFFER.annual}/year. Choose your intelligence, hosting and authority. Own your intelligence.`;

export const metadata: Metadata = {
  title: `Pricing — Your Collaborator from ${COLLABORATOR_OFFER.monthly}/month`,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { type: "website", title: "Unitalk pricing — One price. Your choice.", description, url: "https://unitalk.com/pricing", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Unitalk pricing — One price. Your choice.", description },
};

const included = [
  { title: "Identity", description: "Your own name, voice and presence." },
  { title: "Knowledge & memory", description: "Knowledge Bases, private knowledge and persistent memory." },
  { title: "Connections", description: "LinkedIn, email, WhatsApp, calendar and phone." },
  { title: "Tools", description: "MCP connectors, CRM, browser, search and APIs." },
  { title: "Work", description: "Skills, autonomous tasks, follow-ups and actions." },
  { title: "Control", description: "Permissions, authority rules and approvals." },
  { title: "Public", description: "Your own public Collaborator and URL." },
  { title: "Migration", description: "Import your ChatGPT, Claude or OpenClaw history." },
];

export default function PricingPage() {
  return <div lang="en" className="marketing-home marketing-document pricing-page">
    <SiteHeader language="en" />
    <main id="main-content">
      <section className="document-hero pricing-page-hero content-container" aria-labelledby="pricing-page-title"><div><h1 id="pricing-page-title">Your own<br /><span>AI Collaborator.</span></h1><p>Everything you need to get started.</p><p>One identity. Your context.<br />Work that keeps moving.</p><p className="capability-note">Planned offer. Connections, voice, autonomous work and migration are not active in this prototype.</p></div><CollaboratorPricing showComponents={false} /></section>

      <section className="included-section content-container" id="included" aria-labelledby="included-title"><div className="section-title-row"><h2 id="included-title">Included.</h2><Link className="text-link" href="/how-it-works">See how it works <Icon name="arrow" /></Link></div><p className="capability-note">The eight parts of the planned Collaborator offer.</p><dl className="included-features">{included.map(item => <div key={item.title}><dt><Icon name="check" />{item.title}</dt><dd>{item.description}</dd></div>)}</dl></section>

      <section className="intelligence-section" id="intelligence"><div className="content-container"><h2>Choose your<br /><span>intelligence.</span></h2><p>Your Collaborator isn’t tied to one AI provider.</p><div className="intelligence-choices">
        <article><h3>Unitalk Credits</h3><p className="option-summary">The simple option.</p><p>We provide the AI.<br />You buy credits when you need them.</p><EncounterLink className="button button-primary" choices={{ intelligence: "credits" }}>Use Unitalk Credits <Icon name="arrow" /></EncounterLink></article>
        <article><h3>Your own API keys</h3><p>Bring your own keys from the providers you choose.</p><EncounterLink className="button button-outline" choices={{ intelligence: "keys" }}>Bring my keys <Icon name="arrow" /></EncounterLink></article>
        <article><h3>Your existing AI gateway</h3><p>Already have an AI gateway or Hermes instance?<br />Connect it.</p><EncounterLink className="button button-outline" choices={{ intelligence: "gateway" }}>Connect it <Icon name="arrow" /></EncounterLink></article>
      </div><p className="capability-note intelligence-billing-note">AI usage is purchased separately from the Collaborator plan. Credit packs and provider connections are not sold or activated in this demo. These buttons prepare your preference; no API key is requested.</p></div></section>

      <section className="hosting-pricing-section content-container" id="hosting"><h2>Choose<br /><span>where it runs.</span></h2><div className="hosting-comparison"><div><h3>Unitalk Cloud</h3><p className="option-summary">Simple.</p><p>Your Collaborator runs on Unitalk infrastructure.</p><p className="cloud-price">{COLLABORATOR_OFFER.monthly}<span> / month</span></p><p className="capability-note">The same Collaborator plan, not a second subscription. Cloud hosting is planned.</p></div><div><h3>Your infrastructure</h3><p>Run it on:</p><ul className="infrastructure-list"><li>OVH</li><li>Hostinger</li><li>Your server</li><li>Compatible cloud</li></ul><p>Or connect an existing Hermes instance.<br />Your Collaborator stays yours.</p><blockquote>No infrastructure lock-in.</blockquote></div></div><PricingHosting /></section>

      <section className="hermes-section ownership-section"><div className="marketing-section content-container"><div><h2>An open engine.<br /><span>A Collaborator<br />you own.</span></h2><p><a className="runtime-link" href="https://github.com/NousResearch/hermes-agent">Hermes <Icon name="external" width="16" height="16" /></a> is an autonomous, open-source AI runtime.</p></div><div><p>Unitalk gives it identity, knowledge, memory, skills, tools, communication and a place to work.</p><ul className="portability-list"><li>You can move your Collaborator.</li><li>You can export it.</li><li>You can run it elsewhere.</li></ul><blockquote>You choose where it runs.<br /><span>You choose what powers it.</span></blockquote><p className="capability-note">The intended architecture. Hermes integration, exports and deployment are planned.</p></div></div></section>

      <section className="pricing-page-close content-container"><h2>One price.<br /><span>Your choice.</span></h2><p className="closing-price">{COLLABORATOR_OFFER.monthly} <span>/ month</span><span className="closing-or">or</span>{COLLABORATOR_OFFER.annual} <span>/ year</span></p><EncounterLink className="button button-primary">Get your Collaborator <Icon name="arrow" /></EncounterLink><p>No enterprise plan.<br />No feature maze.<br />No lock-in.</p><p className="ownership-signature">Own your intelligence.</p></section>
    </main>
    <SiteFooter language="en" />
  </div>;
}

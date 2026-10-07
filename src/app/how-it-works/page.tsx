import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { OwnershipOptions } from "@/components/ownership-options";
import { Icon } from "@/components/icons";

const description = "Meet your AI Collaborator. Connect your channels, give it knowledge and tools, set its authority, and let it keep working for you.";

export const metadata: Metadata = {
  title: "How it works — Meet your Collaborator",
  description,
  alternates: { canonical: "/how-it-works" },
  openGraph: { type: "website", title: "How Unitalk works", description, url: "https://unitalk.com/how-it-works", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "How Unitalk works", description },
};

const steps = [
  { id: "connect", title: "Connect your life" },
  { id: "knowledge", title: "Give it knowledge" },
  { id: "tools", title: "Give it tools" },
  { id: "job", title: "Give it a job" },
  { id: "work", title: "Let it work" },
  { id: "control", title: "You stay in control" },
  { id: "hosting", title: "Run it your way" },
  { id: "presence", title: "Give it a public presence" },
];

function GuideStep({ number, dark = false, children }: { number: number; dark?: boolean; children: ReactNode }) {
  const step = steps[number - 1];
  return <li id={step.id} className={`guide-step${dark ? " guide-step-dark ownership-section ownership-config" : ""}`}>
    <div className="guide-step-inner content-container"><div className="guide-step-heading"><span className="guide-number" aria-hidden="true">{number}.</span><h2>{step.title}.</h2></div><div className="guide-step-body">{children}</div></div>
  </li>;
}

function Topics({ items }: { items: string[] }) {
  return <ul className="guide-topics">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export default function HowItWorksPage() {
  return <div lang="en" className="marketing-home marketing-document how-page">
    <SiteHeader language="en" />
    <main id="main-content">
      <section className="document-hero content-container" aria-labelledby="how-title">
        <div><h1 id="how-title">Meet your<br /><span>Collaborator.</span></h1><p>Your AI Collaborator is always ready to work.</p><p>It knows you, connects to the tools you use, and keeps working when you’re away.</p><EncounterLink language="en" className="button button-primary">Meet your Collaborator <Icon name="arrow" /></EncounterLink><p className="capability-note">Explore the intended product. Connections, background work and deployment are not active in this demo.</p></div>
        <dl className="collaborator-principles"><div><dt>Knows</dt><dd>Knowledge Bases + Memory</dd></div><div><dt>Connects</dt><dd>Your professional channels</dd></div><div><dt>Uses</dt><dd>MCP connectors + Tools + APIs</dd></div><div><dt>Works</dt><dd>Autonomously, in the background</dd></div><div><dt>Decides</dt><dd>Within the authority you give it</dd></div></dl>
      </section>
      <nav className="guide-contents content-container" aria-label="How it works steps"><ol>{steps.map((step, index) => <li key={step.id}><Link href={`#${step.id}`}><span>{index + 1}.</span>{step.title}<Icon name="chevron" width="14" height="14" /></Link></li>)}</ol></nav>

      <ol className="guide-steps">
        <GuideStep number={1}><p>Connect the channels where your professional life happens.</p><Topics items={["LinkedIn", "Email", "WhatsApp", "Calendar", "Phone"]} /><p>Your Collaborator can read, write, schedule and call — only with the permissions you give it.</p></GuideStep>
        <GuideStep number={2}><p>Connect your <strong>Knowledge Bases.</strong></p><Topics items={["Websites", "Documents", "Company knowledge", "Private files", "Databases"]} /><p>Your Collaborator builds a persistent understanding of what matters to you.</p><p className="knowledge-distinction">Knowledge is what it knows.<br />Memory is what it remembers.</p><div className="guide-import"><p>Already using another AI?</p><p>Import your ChatGPT, Claude or OpenClaw history in one click.</p><blockquote>You don’t start from zero.</blockquote><p className="capability-note">History import is planned; it isn’t available in this preview.</p></div></GuideStep>
        <GuideStep number={3}><p>Connect the tools it needs to work.</p><p><strong>MCP connectors</strong> give your Collaborator access to the services you authorize.</p><Topics items={["CRM", "Search", "Browser", "APIs", "Business apps"]} /><blockquote>You decide what it can access.</blockquote></GuideStep>
        <GuideStep number={4}><p>Don’t tell it every step.<br /><strong>Give it an outcome.</strong></p><blockquote className="job-brief">“Handle my inbound.<br />Qualify opportunities.<br />Book meetings.<br />Follow up.”</blockquote><p>Your Collaborator figures out the next steps and keeps moving.</p></GuideStep>
        <GuideStep number={5} dark><p>Your Collaborator can work in the background.</p><ul className="work-verbs">{["Reads.", "Understands.", "Organizes.", "Responds.", "Acts.", "Follows up."].map(verb => <li key={verb}>{verb}</li>)}</ul><p>It keeps your relationships and work moving across your connected channels.</p><p>When something needs you, it tells you.</p><blockquote>You only get involved<br /><span>when you’re needed.</span></blockquote><p className="capability-note">Background work is part of the intended service. This preview does not run autonomous tasks.</p></GuideStep>
        <GuideStep number={6}><p>You decide what your Collaborator can do.</p><dl className="guide-authority"><div><dt><Icon name="check" />DO IT</dt><dd>Act autonomously.</dd></div><div><dt><Icon name="message" />ASK ME</dt><dd>Get approval.</dd></div><div><dt><Icon name="close" />NEVER DO IT</dt><dd>Never cross the line.</dd></div></dl><p>You can change permissions, pause it or take over at any time.</p><Link className="text-link" href="/dashboard/patrick">Try an approval example <Icon name="arrow" /></Link></GuideStep>
        <GuideStep number={7} dark><p>Designed to run on <a className="runtime-link" href="https://github.com/NousResearch/hermes-agent">Hermes <Icon name="external" width="16" height="16" /></a>, an autonomous open-source AI runtime.</p><OwnershipOptions language="en" /></GuideStep>
        <GuideStep number={8}><p>Your Collaborator has its own identity and URL.</p><Link className="guide-public-url" href="/@patrick"><Icon name="link" />unitalk.com/@patrick <Icon name="arrow" /></Link><p>Put it on your LinkedIn, website, email signature or QR code.</p><blockquote>Here’s how to interact with me.</blockquote><p>Your Collaborator can be your professional front door — while continuing to work for you in private.</p><Link className="text-link" href="/@patrick">Meet a public Collaborator <Icon name="arrow" /></Link></GuideStep>
      </ol>
      <section className="guide-closing content-container"><h2>That’s it.</h2><p>Connect it.<br />Give it knowledge.<br />Give it a job.<br /><span>Let it work.</span></p><EncounterLink language="en" className="button button-primary">Meet your Collaborator <Icon name="arrow" /></EncounterLink><p className="ownership-signature">Own your intelligence.</p></section>
    </main>
    <SiteFooter language="en" />
  </div>;
}

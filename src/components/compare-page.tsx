"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EncounterLink } from "@/components/collaborator-offer-context";
import { Icon } from "@/components/icons";
import { COMPARISON_CRITERIA, COMPARISON_PRODUCTS, COMPARISON_SUPPORTING_TOOLS, type ComparisonCriterion } from "@/lib/collaborator-comparison";
import "./compare.css";

export function ComparePage({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";

  const [criterion, setCriterion] = useState<ComparisonCriterion>("work");
  const selected = COMPARISON_CRITERIA.find(item => item.id === criterion)!;
  const unitalk = fr ? [
    "Réponses, relances, préparation de rendez-vous, classement d’emails et propositions de mise à jour CRM : du travail organisé autour de vos relations.",
    "Les contacts, leur histoire, les engagements et la prochaine étape. Connaissances et mémoire restent deux éléments distincts.",
    "Un Collaborateur public que vos contacts peuvent rencontrer par un lien, relié à votre espace de suivi privé. Email, téléphone et messageries font partie des connexions prévues.",
    "DO IT / ASK ME / NEVER DO IT : définir ce qu’il peut faire, ce qui demande votre accord et vos limites absolues, avec pause et reprise humaine.",
  ] : [
    "Replies, follow-ups, meeting preparation, email filing and proposed CRM updates: work organized around your relationships.",
    "Contacts, their history, commitments and the next step. Knowledge and memory remain distinct.",
    "A public Collaborator your contacts can meet through a link, connected to your private follow-up workspace. Email, phone and messaging are planned connections.",
    "DO IT / ASK ME / NEVER DO IT: define allowed work, approvals and hard boundaries, with pause and human takeover.",
  ];

  return <div lang={language} className="marketing-home marketing-compare">
    <SiteHeader language={language} />
    <main id="main-content">
      <section className="compare-hero content-container" aria-labelledby="compare-title">
        <h1 id="compare-title">{fr ? <>Un Collaborateur IA.<br /><span>Qu’est-ce que ça change{"\u00a0"}?</span></> : <>An AI Collaborator.<br /><span>What’s the difference?</span></>}</h1>
        <p>{fr ? "Comparez les outils que vous utilisez déjà avec un Collaborateur qui garde le contexte de vos relations et prépare la suite." : "Compare the tools you already use with a Collaborator that remembers your relationships and prepares what comes next."}</p>
      </section>

      <section className="compare-options content-container" aria-labelledby="compare-options-title">
        <div className="compare-section-heading"><h2 id="compare-options-title">{fr ? "Comparez ce qui compte pour vous." : "Compare what matters to you."}</h2><p>{fr ? "Ces offres font déjà du travail, conservent du contexte et proposent des contrôles. Leurs usages et leur configuration diffèrent." : "These offerings already do work, retain context and provide controls. Their focus and setup differ."}</p></div>
        <div className="compare-criteria" role="group" aria-label={fr ? "Choisir un critère de comparaison" : "Choose a comparison criterion"}>{COMPARISON_CRITERIA.map(item => <button type="button" key={item.id} aria-pressed={item.id === criterion} aria-controls="compare-results" onClick={() => setCriterion(item.id)}>{item[language].label}</button>)}</div>
        <div id="compare-results" className="compare-results" aria-labelledby="compare-question">
          <h3 id="compare-question" className="compare-question" aria-live="polite">{selected[language].question}</h3>
          <dl className="compare-products">{COMPARISON_PRODUCTS.map(product => <div className="compare-product" key={product.name}><dt><strong>{product.name}</strong><a href={product.source} target="_blank" rel="noreferrer" aria-label={fr ? `Source officielle : ${product.name} (nouvel onglet)` : `Official source: ${product.name} (new tab)`}>{fr ? "Source officielle" : "Official source"}<Icon name="external" width="14" height="14" /></a></dt><dd>{product[language][criterion]}</dd></div>)}</dl>
        </div>
        <p className="compare-source-note">{fr ? "Synthèse des pages officielles consultées le 8 octobre 2026. Les fonctions et accès varient selon le forfait, le pays, les connexions et la configuration." : "Summary of official pages consulted on October 8, 2026. Features and access vary by plan, country, connections and configuration."}</p>
        <details className="compare-specialists"><summary>{fr ? "Et les outils de service client ou de rendez-vous ?" : "What about customer service and scheduling tools?"}<Icon name="plus" /></summary><p>{fr ? "Ils vont aussi au-delà d’un simple formulaire ou arbre de décision. Ils peuvent compléter votre organisation selon le travail à effectuer." : "These also go beyond a simple form or decision tree. They can complement your setup for specific jobs."}</p><ul>{COMPARISON_SUPPORTING_TOOLS.map(tool => <li key={tool.name}><a href={tool.source} target="_blank" rel="noreferrer">{tool.name}<Icon name="external" width="14" height="14" /></a><p>{tool[language]}</p></li>)}</ul></details>
      </section>

      <section className="compare-insight content-container" aria-labelledby="compare-unitalk-title">
        <div className="compare-section-heading"><h2 id="compare-unitalk-title">{fr ? <>Unitalk : le travail,<br /><span>autour de vos relations.</span></> : <>Unitalk: work,<br /><span>around your relationships.</span></>}</h2><p>{fr ? "Notre parti pris : un Collaborateur à vous, une porte d’entrée publique et un espace privé pour suivre les échanges. Mémoire, autonomie et permissions existent aussi ailleurs." : "Our focus: a Collaborator of your own, a public front door and a private workspace to follow through. Memory, autonomy and permissions exist elsewhere too."}</p></div>
        <dl className="compare-unitalk-criteria">{COMPARISON_CRITERIA.map((item, index) => <div key={item.id}><dt>{item[language].label}</dt><dd>{unitalk[index]}</dd></div>)}</dl>
        <p className="compare-current-state">{fr ? "Aujourd’hui, vous pouvez explorer les exemples interactifs et rencontrer le Collaborateur public de Patrick. Le travail présenté est simulé ; connexions, mémoire durable et exécution restent à intégrer." : "Today, you can explore interactive examples and meet Patrick’s public Collaborator. The work shown is simulated; connections, durable memory and execution remain to be integrated."}</p>
      </section>

      <section className="compare-cta content-container">
        <h2>{fr ? "Voyez ce que ça change." : "See what changes."}</h2>
        <p>{fr ? "Rencontrez le Collaborateur de Patrick, ou commencez avec votre propre mission." : "Meet Patrick’s Collaborator, or start with a mission of your own."}</p>
        <div className="compare-cta-actions">
          <Link href="/@patrick-chassany" className="button button-primary">{fr ? "Parler au Collaborateur de Patrick" : "Talk to Patrick’s Collaborator"} <Icon name="arrow" /></Link>
          <EncounterLink language={language} marketing className="button button-outline">{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink>
        </div>
      </section>
    </main>
    <SiteFooter language={language} />
  </div>;
}

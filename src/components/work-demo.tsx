"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { WORK_EXAMPLES, getWorkExample, type WorkExampleId } from "@/lib/work-examples";

export function HeroWorkProof({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  return <div className="hero-work-proof" aria-label={fr ? "Exemple de travail" : "Example work, not live activity"}>
    <p className="hero-proof-request">{fr ? "« Garde le fil avec mes contacts importants. »" : "“Keep track of my important contacts.”"}</p>
    <div className="hero-proof-delivery"><strong>{fr ? "Le bon moment pour reprendre contact." : "The right moment to reconnect."}</strong><p>{fr ? "Lors de votre dernier échange, ce contact avait demandé de reprendre le projet en octobre. J’ai préparé un message qui reprend là où vous en étiez." : "Last time, this contact asked to revisit the project in October. I’ve prepared a message that picks up where you left off."}</p></div>
    <div className="hero-proof-boundary"><Icon name="message" /><strong>{fr ? "Prêt à relire et à approuver." : "Ready for your review."}</strong></div>
  </div>;
}

export function WorkDemo({ initialExample = "follow-up", compact = false, language = "en" }: { initialExample?: WorkExampleId; compact?: boolean; language?: "en" | "fr" }) {
  const [exampleId, setExampleId] = useState<WorkExampleId>(initialExample);
  const example = getWorkExample(exampleId, language);
  const fr = language === "fr";
  const [draft, setDraft] = useState<string>(example.draft);
  const [editing, setEditing] = useState(false);
  const [approved, setApproved] = useState(false);

  function choose(id: WorkExampleId) {
    setExampleId(id);
    setDraft(getWorkExample(id, language).draft);
    setApproved(false);
    setEditing(false);
  }

  return <div className={`work-demo${compact ? " work-demo-compact" : ""}`}>
    {!compact && <div className="work-demo-choices" aria-label={fr ? "Choisir un exemple de travail" : "Choose a work example"}>{WORK_EXAMPLES.map(item => <button type="button" key={item.id} aria-pressed={item.id === exampleId} onClick={() => choose(item.id)}>{getWorkExample(item.id, language).label}</button>)}</div>}
    <div className="work-demo-top"><span><Icon name="message" />{fr ? "Votre Collaborateur" : "Your Collaborator"}</span><span className="demo-label">{fr ? "Démo" : "Demo"}</span></div>
    <div className="work-demo-request"><span>{example.sender}</span><p>{example.request}</p></div>
    <div className="work-demo-delivery" key={exampleId} aria-live="polite">
      <div className="work-demo-delivery-heading"><Icon name="check" /><h3>{example.title}</h3></div>
      <p className="work-demo-context">{example.context}</p>
      <dl className="work-demo-continuity"><div><dt>{fr ? "Compris" : "Understood"}</dt><dd>{example.classification}</dd></div><div><dt>{fr ? "Contexte" : "Context"}</dt><dd>{example.record}</dd></div><div><dt>{fr ? "Prochain pas" : "Next step"}</dt><dd>{example.nextStep}</dd></div></dl>
      <p className="work-demo-subject">{example.subject}</p>
      {editing ? <><label className="sr-only" htmlFor={compact ? "meet-work-draft" : "home-work-draft"}>{fr ? "Modifier le brouillon d’exemple" : "Edit the example draft"}</label><textarea id={compact ? "meet-work-draft" : "home-work-draft"} value={draft} maxLength={1500} onChange={event => { setDraft(event.target.value); setApproved(false); }} /></> : <p className="work-demo-draft">{draft}</p>}
    </div>
    <p className="work-demo-boundary"><Icon name="message" />{example.boundary}</p>
    <div className="work-demo-actions"><button className="button button-primary" type="button" disabled={!draft.trim() || approved} onClick={() => { setApproved(true); setEditing(false); }}>{approved ? fr ? "Approuvé" : "Approved" : fr ? "Approuver le brouillon" : "Approve the draft"}<Icon name="check" /></button><button className="work-demo-edit" type="button" onClick={() => { setEditing(!editing); setApproved(false); }}>{editing ? fr ? "Conserver mes modifications" : "Keep my edits" : fr ? "Modifier le brouillon" : "Edit the draft"}</button></div>
    {approved && <p className="work-demo-truth" role="status">{example.result}</p>}
  </div>;
}

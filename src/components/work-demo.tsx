"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { WORK_EXAMPLES, getWorkExample, type WorkExampleId } from "@/lib/work-examples";

export function HeroWorkProof({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  return <div className="hero-work-proof" aria-label={fr ? "Exemple de travail" : "Example work, not live activity"}>
    <div className="work-proof-status"><span><Icon name="check" />{fr ? "Exemple de suivi" : "Example follow-up"}</span></div>
    <p className="hero-proof-request">{fr ? "« Prépare le suivi de notre rendez-vous. »" : "“Follow up after our meeting.”"}</p>
    <div className="hero-proof-delivery"><strong>{fr ? "Un prochain pas clair" : "A clear next step"}</strong><p>{fr ? "Merci pour notre échange. Pourrions-nous définir ensemble le périmètre et les priorités la semaine prochaine ?" : "Thanks for the conversation. Shall we define the scope and priorities together next week?"}</p></div>
    <div className="hero-proof-boundary"><Icon name="message" /><span>{fr ? "Préparé pour vous." : "Prepared for you."}<br /><strong>{fr ? "Envoyé uniquement avec votre accord." : "Sent only with your approval."}</strong></span></div>
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
    <div className="work-demo-request"><span>{fr ? "Vous" : "You"}</span><p>{example.request}</p></div>
    <div className="work-demo-delivery" key={exampleId} aria-live="polite">
      <div className="work-demo-delivery-heading"><Icon name="check" /><h3>{example.title}</h3></div>
      <p className="work-demo-context">{example.context}</p>
      <p className="work-demo-subject">{example.subject}</p>
      {editing ? <><label className="sr-only" htmlFor={compact ? "meet-work-draft" : "home-work-draft"}>{fr ? "Modifier le brouillon d’exemple" : "Edit the example draft"}</label><textarea id={compact ? "meet-work-draft" : "home-work-draft"} value={draft} maxLength={1500} onChange={event => { setDraft(event.target.value); setApproved(false); }} /></> : <p className="work-demo-draft">{draft}</p>}
    </div>
    <p className="work-demo-boundary"><Icon name="message" />{example.boundary}</p>
    <div className="work-demo-actions"><button className="button button-primary" type="button" disabled={!draft.trim() || approved} onClick={() => { setApproved(true); setEditing(false); }}>{approved ? fr ? "Approuvé" : "Approved" : fr ? "Approuver le brouillon" : "Approve the draft"}<Icon name="check" /></button><button className="work-demo-edit" type="button" onClick={() => { setEditing(!editing); setApproved(false); }}>{editing ? fr ? "Conserver mes modifications" : "Keep my edits" : fr ? "Modifier le brouillon" : "Edit the draft"}</button></div>
    {approved && <p className="work-demo-truth" role="status">{example.result}</p>}
  </div>;
}

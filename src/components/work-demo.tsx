"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { WORK_EXAMPLES, getWorkExample, type WorkExampleId } from "@/lib/work-examples";

export function HeroWorkProof() {
  return <div className="hero-work-proof" aria-label="Example work, not live activity">
    <div className="work-proof-status"><span><Icon name="check" />Example follow-up</span></div>
    <p className="hero-proof-request">“Follow up after our meeting.”</p>
    <div className="hero-proof-delivery"><strong>A clear next step</strong><p>Thanks for the conversation. Shall we define the scope and priorities together next week?</p></div>
    <div className="hero-proof-boundary"><Icon name="message" /><span>Prepared for you.<br /><strong>Sent only with your approval.</strong></span></div>
  </div>;
}

export function WorkDemo({ initialExample = "follow-up", compact = false }: { initialExample?: WorkExampleId; compact?: boolean }) {
  const [exampleId, setExampleId] = useState<WorkExampleId>(initialExample);
  const example = getWorkExample(exampleId);
  const [draft, setDraft] = useState<string>(example.draft);
  const [editing, setEditing] = useState(false);
  const [approved, setApproved] = useState(false);

  function choose(id: WorkExampleId) {
    setExampleId(id);
    setDraft(getWorkExample(id).draft);
    setApproved(false);
    setEditing(false);
  }

  return <div className={`work-demo${compact ? " work-demo-compact" : ""}`}>
    {!compact && <div className="work-demo-choices" aria-label="Choose a work example">{WORK_EXAMPLES.map(item => <button type="button" key={item.id} aria-pressed={item.id === exampleId} onClick={() => choose(item.id)}>{item.label}</button>)}</div>}
    <div className="work-demo-top"><span><Icon name="message" />Your Collaborator</span><span className="demo-label">Demo</span></div>
    <div className="work-demo-request"><span>You</span><p>{example.request}</p></div>
    <div className="work-demo-delivery" key={exampleId} aria-live="polite">
      <div className="work-demo-delivery-heading"><Icon name="check" /><h3>{example.title}</h3></div>
      <p className="work-demo-context">{example.context}</p>
      <p className="work-demo-subject">{example.subject}</p>
      {editing ? <><label className="sr-only" htmlFor={compact ? "meet-work-draft" : "home-work-draft"}>Edit the example draft</label><textarea id={compact ? "meet-work-draft" : "home-work-draft"} value={draft} maxLength={1500} onChange={event => { setDraft(event.target.value); setApproved(false); }} /></> : <p className="work-demo-draft">{draft}</p>}
    </div>
    <p className="work-demo-boundary"><Icon name="message" />{example.boundary}</p>
    <div className="work-demo-actions"><button className="button button-primary" type="button" disabled={!draft.trim() || approved} onClick={() => { setApproved(true); setEditing(false); }}>{approved ? "Approved" : "Approve the draft"}<Icon name="check" /></button><button className="work-demo-edit" type="button" onClick={() => { setEditing(!editing); setApproved(false); }}>{editing ? "Keep my edits" : "Edit the draft"}</button></div>
    {approved && <p className="work-demo-truth" role="status">{example.result}</p>}
  </div>;
}

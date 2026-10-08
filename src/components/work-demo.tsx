"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./icons";
import { WORK_EXAMPLES, getWorkExample, type WorkExampleId } from "@/lib/work-examples";
import { HERO_WORK_EXAMPLES } from "@/lib/hero-work-examples";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function HeroWorkProof({ language = "en", carousel = false }: { language?: "en" | "fr"; carousel?: boolean }) {
  return carousel ? <HeroWorkCarousel language={language} /> : <aside className="hero-work-proof" aria-label={language === "fr" ? "Exemple de travail avec Sarah" : "Example work with Sarah"}><HeroProofSlide example={HERO_WORK_EXAMPLES[0]} language={language} onInteract={() => {}} /></aside>;
}

function HeroWorkCarousel({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);
  const container = useRef<HTMLElement>(null);
  const rotating = !paused && !reducedMotion && !hovered && !focused && visible && pageVisible;

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .25), { threshold: .25 });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % HERO_WORK_EXAMPLES.length), 8000);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function choose(index: number) {
    setPaused(true);
    setActive((index + HERO_WORK_EXAMPLES.length) % HERO_WORK_EXAMPLES.length);
  }

  return <aside ref={container} className="hero-work-proof" aria-roledescription={fr ? "carrousel" : "carousel"} aria-label={fr ? "Exemples de travail du Collaborateur" : "Collaborator work examples"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="hero-proof-slides" aria-live={rotating ? "off" : "polite"}>
      {HERO_WORK_EXAMPLES.map((example, index) => <div className="hero-proof-slide" data-active={index === active} inert={index !== active} aria-hidden={index !== active} role="group" aria-roledescription={fr ? "diapositive" : "slide"} aria-label={`${index + 1} / ${HERO_WORK_EXAMPLES.length} — ${example[language].label}`} key={example.en.label}>
        <HeroProofSlide example={example} language={language} onInteract={() => setPaused(true)} />
      </div>)}
    </div>
    <div className="hero-proof-navigation">
      <div className="hero-proof-dots">{HERO_WORK_EXAMPLES.map((example, index) => <button type="button" key={example.en.label} aria-label={fr ? `Voir l’exemple : ${example.fr.label}` : `Show example: ${example.en.label}`} aria-pressed={index === active} onClick={() => choose(index)}><span /></button>)}</div>
      <div className="hero-proof-arrows">
        <button type="button" aria-label={fr ? "Exemple précédent" : "Previous example"} onClick={() => choose(active - 1)}><Icon name="chevron" className="hero-proof-previous" /></button>
        {!reducedMotion && <button type="button" aria-label={paused ? fr ? "Reprendre le défilement" : "Resume slideshow" : fr ? "Mettre le défilement en pause" : "Pause slideshow"} onClick={() => setPaused(!paused)}><Icon name={paused ? "play" : "pause"} /></button>}
        <button type="button" aria-label={fr ? "Exemple suivant" : "Next example"} onClick={() => choose(active + 1)}><Icon name="chevron" /></button>
      </div>
    </div>
  </aside>;
}

function HeroProofSlide({ example, language, onInteract }: { example: (typeof HERO_WORK_EXAMPLES)[number]; language: "en" | "fr"; onInteract: () => void }) {
  const fr = language === "fr";
  const copy = example[language];
  const name = example.name === "Vous" && !fr ? "You" : example.name;
  const [draft, setDraft] = useState<string>(copy.draft);
  const [editing, setEditing] = useState(false);
  const [approved, setApproved] = useState(false);
  const draftId = useId();
  const draftInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) draftInput.current?.focus();
  }, [editing]);

  return <>
    <div className="hero-proof-top"><span><span className="hero-proof-avatar"><Icon name="profile" /></span><strong>{name}</strong></span><span className="hero-proof-kind">{copy.label}</span></div>
    <dl className="hero-proof-continuity">
      <div><dt>{fr ? "En mémoire" : "Remembered"}</dt><dd><q>{copy.remembered}</q><span className="hero-proof-context">{copy.when}</span></dd></div>
      <div><dt>{fr ? "À présent" : "Now"}</dt><dd>{copy.next}</dd></div>
    </dl>
    {editing ? <><label className="sr-only" htmlFor={draftId}>{fr ? `Modifier le brouillon d’exemple : ${copy.label}` : `Edit the example draft: ${copy.label}`}</label><textarea ref={draftInput} id={draftId} className="hero-proof-draft hero-proof-input" value={draft} maxLength={1500} rows={4} onChange={event => { setDraft(event.target.value); setApproved(false); }} /></> : <blockquote className="hero-proof-draft">{draft}</blockquote>}
    <div className="hero-proof-boundary" role="status"><Icon name="check" /><strong>{approved ? fr ? "Brouillon d’exemple approuvé." : "Example draft approved." : !draft.trim() ? fr ? "Ajoutez un message pour le valider." : "Add a message to approve this draft." : fr ? "À vous de valider." : "Ready for your review."}</strong></div>
    <div className="hero-proof-actions"><button className="button hero-proof-approve" type="button" disabled={!draft.trim() || approved} onClick={() => { onInteract(); setApproved(true); setEditing(false); }}>{approved ? fr ? "Approuvé" : "Approved" : fr ? "Approuver" : "Approve draft"}<Icon name="check" /></button><button className="work-demo-edit" type="button" onClick={() => { onInteract(); setEditing(!editing); setApproved(false); }}>{editing ? fr ? "Conserver mes modifications" : "Keep my edits" : fr ? "Modifier" : "Edit draft"}</button></div>
  </>;
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

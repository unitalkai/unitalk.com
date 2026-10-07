"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CreateForm } from "./create-form";
import { Icon } from "./icons";
import { COLLABORATOR_OFFER, HOSTING_OPTIONS, INTELLIGENCE_OPTIONS, type CollaboratorPreferences } from "@/lib/collaborator-offer";

const channels = ["LinkedIn", "Email", "WhatsApp", "Calendrier", "Téléphone"];
const missions = ["Préparer mes suivis", "Organiser mes relations", "Repérer mes priorités"];

export function MeetCollaborator({ initialUrl, preferences, onContinue }: { initialUrl?: string; preferences?: CollaboratorPreferences; onContinue: () => void }) {
  const [name, setName] = useState("");
  const [mission, setMission] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [source, setSource] = useState(initialUrl ?? "");
  const [error, setError] = useState("");
  const [met, setMet] = useState(false);
  const responseHeading = useRef<HTMLHeadingElement>(null);
  const hosting = HOSTING_OPTIONS.find(option => option.value === preferences?.hosting);
  const intelligence = INTELLIGENCE_OPTIONS.find(option => option.value === preferences?.intelligence);

  useEffect(() => {
    if (!met) return;
    const heading = responseHeading.current;
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [met]);

  function meet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Indiquez votre nom pour commencer la rencontre."); return; }
    if (!mission.trim()) { setError("Choisissez ou écrivez une première mission à lui confier."); return; }
    setError("");
    setMet(true);
  }

  return <div className="encounter-workspace">
    <div className="encounter-inputs">
      <h2>Faisons connaissance.</h2>
      <p>Votre nom. Une première mission.<br />C’est assez pour commencer la rencontre.</p>
      {(hosting || intelligence || preferences?.billing) && <div className="encounter-preferences"><p>Vos choix</p><dl>{hosting && <div><dt>Hébergement</dt><dd lang="en">{hosting.label}</dd></div>}{intelligence && <div><dt>Intelligence</dt><dd lang="en">{intelligence.label}</dd></div>}{preferences?.billing && <div><dt>Offre envisagée</dt><dd>{preferences.billing === "annual" ? `${COLLABORATOR_OFFER.annual} / an` : `${COLLABORATOR_OFFER.monthly} / mois`}</dd></div>}</dl></div>}
      <form className="encounter-form" onSubmit={meet} noValidate>
        <label htmlFor="encounter-name">Comment vous appelez-vous ?</label>
        <input id="encounter-name" className="preview-name-input" autoComplete="name" maxLength={70} value={name} onChange={event => { setName(event.target.value); setError(""); setMet(false); }} placeholder="Votre nom" aria-invalid={Boolean(error && !name.trim())} aria-describedby={error ? "encounter-error" : undefined} />
        <label htmlFor="encounter-mission">Qu’aimeriez-vous lui confier ?</label>
        <textarea id="encounter-mission" value={mission} onChange={event => { setMission(event.target.value); setError(""); setMet(false); }} placeholder="Par exemple, préparer mes suivis après chaque rendez-vous." maxLength={600} aria-invalid={Boolean(error && !mission.trim())} aria-describedby={error ? "encounter-error" : undefined} />
        <div className="mission-suggestions" aria-label="Exemples de missions">{missions.map(item => <button key={item} type="button" onClick={() => { setMission(item); setMet(false); setError(""); }}>{item}</button>)}</div>
        <fieldset className="encounter-channels"><legend>Où sont vos échanges ? <span>Facultatif</span></legend><div>{channels.map(channel => <label key={channel}><input type="checkbox" checked={selectedChannels.includes(channel)} onChange={event => { setSelectedChannels(previous => event.target.checked ? [...previous, channel] : previous.filter(item => item !== channel)); setMet(false); }} />{channel}</label>)}</div></fieldset>
        {error && <p id="encounter-error" className="form-error" role="alert">{error}</p>}
        <button className="button button-primary" type="submit">{met ? "Reprendre la rencontre" : "Rencontrer mon Collaborateur"}<Icon name="arrow" /></button>
      </form>
      <details className="optional-source"><summary>Ajouter une source publique <span>Facultatif</span></summary><CreateForm compact onPreview={url => { setSource(url); setMet(false); }} />{source && <p className="form-hint">Source indiquée : {new URL(source).hostname} · non analysée.</p>}</details>
    </div>
    <section className="encounter-preview" aria-label="Première rencontre" aria-live="polite">
      <div className="encounter-preview-top"><span className="avatar avatar-large">{name.trim() ? name.trim().slice(0, 2).toUpperCase() : <Icon name="message" width="30" height="30" />}</span><span className="demo-label">Démo</span></div>
      {met ? <>
        <h2 ref={responseHeading} tabIndex={-1}>Bonjour {name.trim()}.<br /><span>Commençons par vous.</span></h2>
        <div className="encounter-message"><p>Vous voulez me confier :</p><strong>{mission.trim()}</strong><p>{selectedChannels.length ? `Vos échanges passent par ${selectedChannels.join(", ")}.` : "Nous choisirons ensuite les canaux utiles à cette mission."}</p></div>
        <h3>Votre prochain pas.</h3><p>Voyez comment Patrick relit ce que son Collaborateur prépare et garde la main sur les décisions.</p>
        <Link className="button button-primary" href="/dashboard/patrick">Voir un exemple de travail <Icon name="arrow" /></Link>
        <button className="text-link" type="button" onClick={onContinue}>Parler au Collaborateur de Patrick <Icon name="message" /></button>
      </> : <><h2>Votre Collaborateur.<br /><span>À votre rencontre.</span></h2><p>Indiquez votre nom et ce que vous voulez lui confier. La rencontre prendra forme ici.</p></>}
    </section>
  </div>;
}

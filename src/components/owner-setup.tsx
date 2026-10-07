"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

export function OwnerSetup({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"meet" | "found" | "mission" | "work" | "ready">("meet");
  const [name, setName] = useState("Patrick Chassany");
  const [website, setWebsite] = useState("");
  const [mission, setMission] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [voice, setVoice] = useState(false);

  function meet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Indiquez votre nom pour commencer."); return; }
    if (website.trim()) { try { const url = new URL(website); if (!["https:", "http:"].includes(url.protocol)) throw new Error(); } catch { setError("Indiquez une adresse complète, comme https://votresite.com, ou laissez ce champ vide."); return; } }
    setError(""); setStep("found");
  }
  return <div className="owner-setup"><span className="owner-collaborator-avatar"><Icon name="message" width="38" height="38" /></span><span className="demo-label">Démo</span>
    {step === "meet" && <><h1>Rencontrez votre Collaborator.</h1><p>Dites-moi qui vous êtes.</p><button className="button button-outline" onClick={() => setError("La connexion LinkedIn est prévue. Vous pouvez commencer avec votre nom ci-dessous.")}>Commencer avec LinkedIn<Icon name="link" /></button><form className="owner-form" onSubmit={meet} noValidate><label htmlFor="setup-name">Votre nom</label><input id="setup-name" value={name} maxLength={70} onChange={event => { setName(event.target.value); setError(""); }} autoComplete="name" aria-invalid={Boolean(error && !name.trim())} /><label htmlFor="setup-website">Votre site <span>Facultatif</span></label><input id="setup-website" type="url" value={website} onChange={event => { setWebsite(event.target.value); setError(""); }} placeholder="https://votresite.com" maxLength={500} />{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary">Faire connaissance<Icon name="arrow" /></button></form><button className="owner-text-action" onClick={() => setVoice(true)}><Icon name="mic" />Parler à la place</button>{voice && <p className="owner-inline-notice" role="status">La voix est prévue. Pour cet aperçu, écrivez votre nom et votre mission.</p>}</>}
    {step === "found" && <><h1>Commençons par vous.</h1><p className="owner-setup-name">{name.trim()}</p><p>J’ai votre nom{website ? " et la source que vous m’avez indiquée" : ""}. Nous avons de quoi commencer la rencontre.</p>{website && <p className="owner-supporting">{website} · référence non analysée</p>}<button className="button button-primary" onClick={() => setStep("mission")}>Continuer<Icon name="arrow" /></button><button className="owner-text-action" onClick={() => setStep("meet")}>Corriger mes informations</button></>}
    {step === "mission" && <><h1>Qu’aimeriez-vous me confier ?</h1><p>Une responsabilité. Pas une liste de tâches.</p><form className="owner-form" onSubmit={event => { event.preventDefault(); if (!mission.trim()) { setError("Décrivez ce que vous voulez me confier."); return; } setError(""); setStep("work"); }} noValidate><label htmlFor="setup-mission">Votre première mission</label><textarea id="setup-mission" rows={4} value={mission} maxLength={600} onChange={event => { setMission(event.target.value); setError(""); }} placeholder="Suivre mes relations et me demander seulement lorsque ma décision compte." aria-invalid={Boolean(error)} /><fieldset className="owner-permissions"><legend>Où sont vos échanges ?</legend>{["LinkedIn", "Email", "WhatsApp", "Calendrier"].map(channel => <label key={channel}><input type="checkbox" checked={channels.includes(channel)} onChange={event => setChannels(previous => event.target.checked ? [...previous, channel] : previous.filter(item => item !== channel))} />{channel}</label>)}</fieldset>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary">Voir le premier travail<Icon name="arrow" /></button></form></>}
    {step === "work" && <><h1>Voici comment je prends le relais.</h1><p>Votre mission : {mission}</p><ol className="owner-work-steps"><li><Icon name="check" />Je reprends le contexte disponible.</li><li><Icon name="check" />J’organise les relations qui comptent.</li><li><Icon name="check" />Je distingue ce que je peux faire de ce qui a besoin de vous.</li></ol><button className="button button-primary" onClick={() => setStep("ready")}>Voir le résultat<Icon name="arrow" /></button></>}
    {step === "ready" && <><h1>Prêt à vous montrer.</h1><p>Dans l’exemple de Patrick : Sarah, Acme et David. Trois situations qui ont besoin de son jugement. Le reste se raconte dans mon activité.</p><button className="button button-primary" onClick={onComplete}>Voir le Collaborator au travail<Icon name="arrow" /></button></>}
  </div>;
}

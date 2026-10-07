"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { WorkDemo } from "./work-demo";
import { parsePublicUrl } from "./create-form";
import { WORK_EXAMPLES, getWorkExample, type WorkExampleId } from "@/lib/work-examples";
import { HOSTING_OPTIONS, INTELLIGENCE_OPTIONS, type CollaboratorPreferences } from "@/lib/collaborator-offer";
import { hostingLabel, intelligenceLabel, localizedOffer, marketingPath } from "@/lib/marketing-language";
import { PublicDoorPreview } from "./public-door-preview";

export function EnglishEncounter({ initialUrl, initialChannel, preferences, language = "en" }: { initialUrl?: string; initialChannel?: string; preferences: CollaboratorPreferences; language?: "en" | "fr" }) {
  const [name, setName] = useState("");
  const [example, setExample] = useState<WorkExampleId>("follow-up");
  const [met, setMet] = useState(false);
  const [error, setError] = useState("");
  const [cloudOption, setCloudOption] = useState("standard");
  const heading = useRef<HTMLHeadingElement>(null);
  const source = initialUrl ? parsePublicUrl(initialUrl) : null;
  const hosting = HOSTING_OPTIONS.find(option => option.value === preferences.hosting);
  const intelligence = INTELLIGENCE_OPTIONS.find(option => option.value === preferences.intelligence);
  const fr = language === "fr";
  const offer = localizedOffer(language);

  useEffect(() => {
    if (!met) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [met]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (met) {
      setMet(false);
      setError("");
      document.getElementById("meet-name")?.focus();
      return;
    }
    if (!name.trim()) { setError(fr ? "Indiquez votre nom pour commencer la rencontre." : "Tell us your name to start the encounter."); return; }
    setError("");
    setMet(true);
  }

  return <>
    <div className="meet-heading"><Link href={`${marketingPath("/", language)}#work-example`} className="meet-back"><Icon name="arrow" />{fr ? "Revenir au travail" : "Back to the work"}</Link><h1>{fr ? <>Commencez gratuitement.<br /><span>Une mission suffit.</span></> : <>Start for free.<br /><span>Start with one mission.</span></>}</h1></div>
    <div className="meet-workspace">
      <div className="meet-inputs">
        <h2>{fr ? <>Un peu de contexte.<br />Un premier pas utile.</> : <>A little context.<br />A useful first step.</>}</h2>
        {source && <div className="meet-source"><Icon name="link" /><div><strong>{fr ? "Site de référence" : "Website reference"}: {source.hostname}</strong></div></div>}
        {initialUrl && !source && <p className="form-error" role="alert">{fr ? "Ce site n’est pas valide. Vous pouvez commencer par une mission." : "That website reference isn’t valid. You can still start with a mission."}</p>}
        {initialChannel && <div className="meet-source"><Icon name="message" /><div><strong>{fr ? "Canal souhaité" : "Preferred channel"}: {initialChannel}</strong></div></div>}
        <form className="meet-form" onSubmit={submit} noValidate>
          <label htmlFor="meet-name">{fr ? "Comment votre Collaborateur doit-il vous appeler ?" : "What should your Collaborator call you?"}</label>
          <input id="meet-name" autoComplete="name" placeholder={fr ? "Votre prénom" : "Your first name"} maxLength={70} value={name} onChange={event => { setName(event.target.value); setError(""); setMet(false); }} aria-invalid={Boolean(error)} aria-describedby={error ? "meet-error" : undefined} />
          <fieldset><legend>{fr ? "Qu’aimeriez-vous lui confier ?" : "What would you like off your plate?"}</legend>{WORK_EXAMPLES.map(item => <label className="meet-mission" key={item.id}><input type="radio" name="mission" value={item.id} checked={example === item.id} onChange={() => { setExample(item.id); setMet(false); }} /><span>{getWorkExample(item.id, language).mission}</span></label>)}</fieldset>
          {(!preferences.hosting || preferences.hosting === "unitalk") && <details className="meet-cloud-option"><summary>{fr ? "Options Unitalk Cloud · facultatif" : "Unitalk Cloud options · optional"}<Icon name="plus" /></summary><label htmlFor="meet-cloud-option">{fr ? "Service managé" : "Managed service"}</label><select id="meet-cloud-option" value={cloudOption} onChange={event => { setCloudOption(event.target.value); setMet(false); }} aria-describedby="meet-cloud-option-note"><option value="standard">Unitalk Cloud</option><option value="secnumcloud">{fr ? "Unitalk Cloud — OVHcloud SecNumCloud · option à venir" : "Unitalk Cloud — OVHcloud SecNumCloud · planned option"}</option></select><p id="meet-cloud-option-note">{fr ? "Option de service managé sur une offre OVHcloud qualifiée SecNumCloud. Service précis et supplément à confirmer. Ce choix prépare une préférence ; il ne commande ni ne déploie un hébergement." : "Managed-service option on a SecNumCloud-qualified OVHcloud offering. Exact service and surcharge to be confirmed. This records a preference; it does not order or deploy hosting."}</p></details>}
          {error && <p id="meet-error" className="form-error" role="alert">{error}</p>}
          <button className="button button-primary" type="submit">{met ? fr ? "Recommencer" : "Start again" : fr ? "Commencer gratuitement" : "Start for free"}<Icon name="arrow" /></button>
        </form>
        {(hosting || intelligence || preferences.billing) && <details className="meet-preferences"><summary>{fr ? "Vos choix de configuration" : "Your setup choices"} <Icon name="chevron" /></summary><dl>{hosting && <div><dt>{fr ? "Hébergement" : "Hosting"}</dt><dd>{hostingLabel(hosting.value, hosting.label, language)}</dd></div>}{intelligence && <div><dt>Intelligence</dt><dd>{intelligenceLabel(intelligence.value, intelligence.label, language)}</dd></div>}{preferences.billing && <div><dt>{fr ? "Préférence d’abonnement" : "Subscription preference"}</dt><dd>{preferences.billing === "annual" ? `${offer.annual} / ${fr ? "an" : "year"}` : `${offer.monthly} / ${fr ? "mois" : "month"}`}</dd></div>}</dl></details>}
      </div>
      <section className="meet-result" aria-label={fr ? "Votre première rencontre" : "Your local encounter"} aria-live="polite">
        {met ? <><h2 ref={heading} tabIndex={-1}>{fr ? "Bonjour" : "Hi"} {name.trim()}.<br /><span>{fr ? "Facilitons le prochain pas." : "Let’s make the next step easier."}</span></h2><p>{fr ? "Relisez. Modifiez. Gardez le dernier mot." : "Review the draft. Edit it. Keep the final say."}</p><WorkDemo key={`${language}:${example}`} initialExample={example} language={language} compact /><div className="meet-public-preview"><h3>{fr ? "Votre porte d’entrée, à votre nom." : "Your front door, with your name."}</h3><PublicDoorPreview language={language} ownerName={name} /></div>{cloudOption === "secnumcloud" && <p className="meet-cloud-preference">{fr ? "Préférence préparée : service managé Unitalk Cloud — OVHcloud SecNumCloud. Option à venir, service et supplément à confirmer." : "Preference prepared: Unitalk Cloud — OVHcloud SecNumCloud managed service. Planned option; exact service and surcharge to be confirmed."}</p>}<div className="meet-next"><h3>{fr ? "La suite reste votre choix." : "Your next step stays yours."}</h3><button type="button" className="text-link" onClick={() => { setMet(false); document.getElementById("meet-name")?.focus(); }}>{fr ? "Essayer une autre mission" : "Try another mission"} <Icon name="arrow" /></button></div></> : <div className="meet-empty"><span className="demo-label">{fr ? "Démo" : "Demo"}</span><Icon name="message" width="44" height="44" /><h2>{fr ? <>Votre travail.<br /><span>Votre Collaborateur.</span></> : <>Your work.<br /><span>Your Collaborator.</span></>}</h2><p>{fr ? "Choisissez une mission. Découvrez un brouillon. Gardez le dernier mot." : "Choose a mission. See a prepared draft. Keep the final say."}</p></div>}
      </section>
    </div>
  </>;
}

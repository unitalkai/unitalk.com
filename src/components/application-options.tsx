"use client";

import { APPLICATION_MODES, APPLICATION_OFFER, applicationModeLabel, type ApplicationMode, type CollaboratorPreferences } from "@/lib/collaborator-offer";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import "./application-options.css";

export function ApplicationChoices({ language, preferences, onChange, idPrefix }: { language: "en" | "fr"; preferences: CollaboratorPreferences; onChange: (choices: CollaboratorPreferences) => void; idPrefix: string }) {
  const fr = language === "fr";
  const apps = [{ key: "twenty" as const, name: "Twenty CRM", benefit: fr ? "Une interface complète pour vos contacts et opportunités." : "A full CRM interface for your contacts and opportunities." }, { key: "chatwoot" as const, name: "Chatwoot Support", benefit: fr ? "Un espace partagé pour suivre les demandes clients." : "A shared workspace for customer support requests." }];
  return <div className="application-choices"><p className="application-intro">{fr ? "Votre Collaborateur suit déjà les contacts et leurs prochaines étapes. Ces applications sont facultatives." : "Your Collaborator’s core role is following contacts and their next steps. These apps are optional."}</p>{apps.map(app => <div className="application-choice" key={app.key}><label htmlFor={`${idPrefix}-${app.key}`}>{app.name}</label><p>{app.benefit}</p><p className="application-price">+{fr ? APPLICATION_OFFER.frenchMonthly : APPLICATION_OFFER.monthly} / {fr ? "mois · hébergement, maintenance et connexion" : "month · hosting, maintenance and connection"}</p><select id={`${idPrefix}-${app.key}`} value={preferences[app.key] ?? "none"} onChange={event => onChange({ [app.key]: event.target.value as ApplicationMode })}>{APPLICATION_MODES.map(mode => <option value={mode} key={mode}>{applicationModeLabel(mode, language)}</option>)}</select></div>)}<p className="application-note">{fr ? "Déjà client SaaS ? La connexion est incluse côté Unitalk ; votre abonnement Twenty ou Chatwoot reste payé au fournisseur. Options et connexions prévues." : "Already using the SaaS version? Unitalk’s connection is included; your Twenty or Chatwoot subscription stays with the provider. Apps and connections are planned."}</p></div>;
}

export function ApplicationOptions({ language = "en" }: { language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  return <section className="optional-applications content-container" id="applications" aria-labelledby="applications-title"><h2 id="applications-title">{language === "fr" ? <>Des applications.<br /><span>Si vous en avez besoin.</span></> : <>Extra apps.<br /><span>When you need them.</span></>}</h2><ApplicationChoices language={language} preferences={preferences} onChange={choices => setPreferences(previous => ({ ...previous, ...choices }))} idPrefix="pricing-app" /></section>;
}

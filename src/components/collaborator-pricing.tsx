"use client";

import { EncounterLink, useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";
import { localizedOffer } from "@/lib/marketing-language";
import { TrialDetails } from "./trial-details";

export function CollaboratorPricing({ showComponents = true, language }: { showComponents?: boolean; language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  const billing = preferences.billing ?? "monthly";
  const fr = language === "fr";
  const offer = localizedOffer(language ?? "en");
  const setBilling = (value: "monthly" | "annual") => setPreferences(previous => ({ ...previous, billing: value }));

  return <div className="pricing-offer">
    <fieldset className="billing-choice"><legend className="sr-only">{fr ? "Période de facturation" : "Billing period"}</legend>
      <label className={billing === "monthly" ? "selected" : ""}><input type="radio" name="billing" value="monthly" checked={billing === "monthly"} onChange={() => setBilling("monthly")} />{fr ? "Mensuel" : "Monthly"}</label>
      <label className={billing === "annual" ? "selected" : ""}><input type="radio" name="billing" value="annual" checked={billing === "annual"} onChange={() => setBilling("annual")} />{fr ? "Annuel" : "Yearly"} <span>{offer.annualSaving}</span></label>
    </fieldset>
    <div className="pricing-amount" aria-live="polite"><strong>{billing === "monthly" ? offer.monthly : offer.annual}</strong><span>/ {billing === "monthly" ? fr ? "mois" : "month" : fr ? "an" : "year"}</span></div>
    <p className="pricing-subtitle">{fr ? "Votre propre Collaborateur IA." : "Your own AI Collaborator."}</p>
    {showComponents && <ul className="pricing-inclusions" aria-label={fr ? "Composants du Collaborateur" : "Collaborator components"}>{(fr ? ["Identité", "Mémoire", "Connaissances", "Compétences", "Outils", "Autorité"] : ["Identity", "Memory", "Knowledge", "Skills", "Tools", "Authority"]).map(item => <li key={item}>{item}</li>)}</ul>}
    <p className="pricing-yearly">{billing === "monthly" ? `${offer.annual} / ${fr ? "an" : "year"} — ${offer.annualSaving}` : `${offer.monthly} / ${fr ? "mois en facturation mensuelle" : "month with monthly billing"}`}<br /><span>{fr ? "Résiliable à tout moment." : "Cancel anytime."}</span></p>
    <p className="pricing-usage-note">{offer.trialShort}</p>
    <EncounterLink className="button button-primary" language={language} marketing defaults={{ billing: "monthly" }}>{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink>
    <TrialDetails language={language} />
  </div>;
}

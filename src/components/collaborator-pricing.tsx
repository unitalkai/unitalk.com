"use client";

import { COLLABORATOR_OFFER } from "@/lib/collaborator-offer";
import { EncounterLink, useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";

export function CollaboratorPricing({ showComponents = true, language }: { showComponents?: boolean; language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  const billing = preferences.billing ?? "monthly";
  const setBilling = (value: "monthly" | "annual") => setPreferences(previous => ({ ...previous, billing: value }));

  return <div className="pricing-offer">
    <fieldset className="billing-choice"><legend className="sr-only">Billing period</legend>
      <label className={billing === "monthly" ? "selected" : ""}><input type="radio" name="billing" value="monthly" checked={billing === "monthly"} onChange={() => setBilling("monthly")} />Monthly</label>
      <label className={billing === "annual" ? "selected" : ""}><input type="radio" name="billing" value="annual" checked={billing === "annual"} onChange={() => setBilling("annual")} />Yearly <span>{COLLABORATOR_OFFER.annualSaving}</span></label>
    </fieldset>
    <div className="pricing-amount" aria-live="polite"><strong>{billing === "monthly" ? COLLABORATOR_OFFER.monthly : COLLABORATOR_OFFER.annual}</strong><span>/ {billing === "monthly" ? "month" : "year"}</span></div>
    <p className="pricing-subtitle">Your own AI Collaborator.</p>
    {showComponents && <ul className="pricing-inclusions" aria-label="Collaborator components">{["Identity", "Memory", "Knowledge", "Skills", "Tools", "Authority"].map(item => <li key={item}>{item}</li>)}</ul>}
    <p className="pricing-yearly">{billing === "monthly" ? `${COLLABORATOR_OFFER.annual} / year — ${COLLABORATOR_OFFER.annualSaving}` : `${COLLABORATOR_OFFER.monthly} / month with monthly billing`}<br /><span>Cancel anytime.</span></p>
    <p className="pricing-usage-note">AI usage is separate: buy Unitalk Credits or use your own provider.</p>
    <EncounterLink className="button button-primary" language={language} defaults={{ billing: "monthly" }}>Meet your Collaborator <Icon name="arrow" /></EncounterLink>
    <p className="capability-note">Planned offer · try the demo today. No payment is taken.</p>
  </div>;
}

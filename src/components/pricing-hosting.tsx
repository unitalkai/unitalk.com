"use client";

import { HOSTING_OPTIONS } from "@/lib/collaborator-offer";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";
import { hostingLabel } from "@/lib/marketing-language";

export function PricingHosting({ language = "en" }: { language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  return <div className="pricing-hosting-control">
    <label htmlFor="pricing-hosting-choice">{language === "fr" ? "Votre hébergement" : "Your hosting"}</label>
    <div className="select-shell"><select id="pricing-hosting-choice" value={preferences.hosting ?? "unitalk"} onChange={event => {
      const hosting = HOSTING_OPTIONS.find(option => option.value === event.target.value)?.value;
      setPreferences(previous => ({ ...previous, hosting }));
    }}>{HOSTING_OPTIONS.map(option => <option key={option.value} value={option.value}>{hostingLabel(option.value, option.label, language)}</option>)}</select><Icon name="chevron" /></div>
  </div>;
}

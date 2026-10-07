"use client";

import { HOSTING_OPTIONS, INTELLIGENCE_OPTIONS } from "@/lib/collaborator-offer";
import { EncounterLink, useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";
import { hostingLabel, intelligenceLabel } from "@/lib/marketing-language";

export function OwnershipOptions({ language }: { language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  const hosting = preferences.hosting ?? "unitalk";
  const intelligence = preferences.intelligence ?? "credits";
  const fr = language === "fr";

  return <div className="ownership-options">
    <div className="ownership-field">
      <label htmlFor="hosting-choice">{fr ? "Hébergement multi-cloud" : "Multi cloud hosting"}</label>
      <div className="select-shell"><select id="hosting-choice" value={hosting} onChange={event => setPreferences(previous => ({ ...previous, hosting: event.target.value as typeof hosting }))}>{HOSTING_OPTIONS.map(option => <option key={option.value} value={option.value}>{hostingLabel(option.value, option.label, language)}</option>)}</select><Icon name="chevron" /></div>
      <p>{fr ? "Cloud géré ou votre propre infrastructure." : "Managed cloud or your own infrastructure."}</p>
    </div>
    <div className="ownership-field">
      <label htmlFor="intelligence-choice">{fr ? "Intelligence multi-modèles" : "Multi model intelligence"}</label>
      <div className="select-shell"><select id="intelligence-choice" value={intelligence} onChange={event => setPreferences(previous => ({ ...previous, intelligence: event.target.value as typeof intelligence }))}>{INTELLIGENCE_OPTIONS.map(option => <option key={option.value} value={option.value}>{intelligenceLabel(option.value, option.label, language)}</option>)}</select><Icon name="chevron" /></div>
      <p>{fr ? "Crédits, vos clés API ou une passerelle existante." : "Use credits, your API keys or an existing gateway."}</p>
    </div>
    <EncounterLink className="button button-primary" language={language} marketing defaults={{ hosting: "unitalk", intelligence: "credits" }}>{fr ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink>
  </div>;
}

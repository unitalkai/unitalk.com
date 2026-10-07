"use client";

import { HOSTING_OPTIONS, INTELLIGENCE_OPTIONS } from "@/lib/collaborator-offer";
import { EncounterLink, useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";

export function OwnershipOptions({ language }: { language?: "en" | "fr" }) {
  const { preferences, setPreferences } = useCollaboratorOffer();
  const hosting = preferences.hosting ?? "unitalk";
  const intelligence = preferences.intelligence ?? "credits";

  return <div className="ownership-options">
    <div className="ownership-field">
      <label htmlFor="hosting-choice">Multi cloud hosting</label>
      <div className="select-shell"><select id="hosting-choice" value={hosting} onChange={event => setPreferences(previous => ({ ...previous, hosting: event.target.value as typeof hosting }))}>{HOSTING_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Icon name="chevron" /></div>
      <p>Managed cloud or your own infrastructure.</p>
    </div>
    <div className="ownership-field">
      <label htmlFor="intelligence-choice">Multi model intelligence</label>
      <div className="select-shell"><select id="intelligence-choice" value={intelligence} onChange={event => setPreferences(previous => ({ ...previous, intelligence: event.target.value as typeof intelligence }))}>{INTELLIGENCE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Icon name="chevron" /></div>
      <p>Use credits, your API keys or an existing gateway.</p>
    </div>
    <EncounterLink className="button button-primary" language={language} defaults={{ hosting: "unitalk", intelligence: "credits" }}>Meet yours with these choices <Icon name="arrow" /></EncounterLink>
  </div>;
}

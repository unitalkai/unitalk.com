"use client";

import { HOSTING_OPTIONS, INTELLIGENCE_OPTIONS } from "@/lib/collaborator-offer";
import { EncounterLink, useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";

export function OwnershipOptions() {
  const { preferences, setPreferences } = useCollaboratorOffer();
  const hosting = preferences.hosting ?? "unitalk";
  const intelligence = preferences.intelligence ?? "credits";

  return <div className="ownership-options">
    <div className="ownership-field">
      <label htmlFor="hosting-choice">Multi cloud hosting</label>
      <div className="select-shell"><select id="hosting-choice" value={hosting} onChange={event => setPreferences(previous => ({ ...previous, hosting: event.target.value as typeof hosting }))}>{HOSTING_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Icon name="chevron" /></div>
      <p>Unitalk Cloud · Your OVH server · Your Hostinger server · Your infrastructure · Existing Hermes</p>
    </div>
    <div className="ownership-field">
      <label htmlFor="intelligence-choice">Multi model intelligence</label>
      <div className="select-shell"><select id="intelligence-choice" value={intelligence} onChange={event => setPreferences(previous => ({ ...previous, intelligence: event.target.value as typeof intelligence }))}>{INTELLIGENCE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Icon name="chevron" /></div>
      <p>Unitalk Credits · Your API keys · Your AI gateway</p>
    </div>
    <p className="ownership-choice-promise">You choose where it runs.<br /><span>You choose what powers it.</span></p>
    <EncounterLink className="button button-primary" defaults={{ hosting: "unitalk", intelligence: "credits" }}>Create my Collaborator <Icon name="arrow" /></EncounterLink>
  </div>;
}

"use client";

import { HOSTING_OPTIONS } from "@/lib/collaborator-offer";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import { Icon } from "./icons";

export function PricingHosting() {
  const { preferences, setPreferences } = useCollaboratorOffer();
  return <div className="pricing-hosting-control">
    <label htmlFor="pricing-hosting-choice">Your hosting</label>
    <div className="select-shell"><select id="pricing-hosting-choice" value={preferences.hosting ?? "unitalk"} aria-describedby="pricing-hosting-note" onChange={event => {
      const hosting = HOSTING_OPTIONS.find(option => option.value === event.target.value)?.value;
      setPreferences(previous => ({ ...previous, hosting }));
    }}>{HOSTING_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Icon name="chevron" /></div>
    <p id="pricing-hosting-note">This preference follows you into the demo. No infrastructure is provisioned.</p>
  </div>;
}

"use client";

import Link from "next/link";
import { createContext, useContext, useState, type ComponentProps, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { encounterLink, type CollaboratorPreferences } from "@/lib/collaborator-offer";

type OfferContext = {
  preferences: CollaboratorPreferences;
  setPreferences: Dispatch<SetStateAction<CollaboratorPreferences>>;
};

const CollaboratorOfferContext = createContext<OfferContext | null>(null);

export function CollaboratorOfferProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CollaboratorPreferences>({});
  return <CollaboratorOfferContext.Provider value={{ preferences, setPreferences }}>{children}</CollaboratorOfferContext.Provider>;
}

export function useCollaboratorOffer() {
  const context = useContext(CollaboratorOfferContext);
  if (!context) throw new Error("Collaborator offer controls require CollaboratorOfferProvider.");
  return context;
}

export function EncounterLink({ defaults, choices, language, marketing, channel, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { defaults?: CollaboratorPreferences; choices?: CollaboratorPreferences; language?: "en" | "fr"; marketing?: boolean; channel?: "linkedin" }) {
  const context = useContext(CollaboratorOfferContext);
  const href = encounterLink({ ...defaults, ...context?.preferences, ...choices }, language, marketing);
  return <Link {...props} href={`${href}${channel ? `&channel=${channel}` : ""}`} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && choices) context?.setPreferences(previous => ({ ...previous, ...choices }));
  }} />;
}

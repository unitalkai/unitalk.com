export const COLLABORATOR_OFFER = {
  monthly: "€9.99",
  annual: "€99",
  annualSaving: "2 months free",
  trial: "One-week free trial. No credit card required.",
  french: { monthly: "9,99 €", annual: "99 €", annualSaving: "2 mois offerts", trial: "Une semaine d’essai gratuit. Sans carte bancaire." },
} as const;

export const HOSTING_OPTIONS = [
  { value: "unitalk", label: "Unitalk Cloud" },
  { value: "ovh", label: "Your OVH server" },
  { value: "hostinger", label: "Your Hostinger server" },
  { value: "infrastructure", label: "Your infrastructure" },
  { value: "hermes", label: "Existing Hermes" },
] as const;

export const INTELLIGENCE_OPTIONS = [
  { value: "credits", label: "Unitalk Credits" },
  { value: "keys", label: "Your API keys" },
  { value: "gateway", label: "Your AI gateway" },
] as const;

export type CollaboratorPreferences = {
  hosting?: (typeof HOSTING_OPTIONS)[number]["value"];
  intelligence?: (typeof INTELLIGENCE_OPTIONS)[number]["value"];
  billing?: "monthly" | "annual";
};

export function readCollaboratorPreferences(query: Record<string, string | string[] | undefined>): CollaboratorPreferences {
  return {
    hosting: HOSTING_OPTIONS.find(option => option.value === query.hosting)?.value,
    intelligence: INTELLIGENCE_OPTIONS.find(option => option.value === query.intelligence)?.value,
    billing: query.billing === "monthly" || query.billing === "annual" ? query.billing : undefined,
  };
}

export function encounterLink(preferences: CollaboratorPreferences = {}, language?: "en" | "fr", marketing = false) {
  const query = new URLSearchParams({ rencontre: "1" });
  if (preferences.hosting) query.set("hosting", preferences.hosting);
  if (preferences.intelligence) query.set("intelligence", preferences.intelligence);
  if (preferences.billing) query.set("billing", preferences.billing);
  return `${language === "en" ? "/meet" : marketing ? "/fr/meet" : "/dashboard/visiteur"}?${query.toString()}`;
}

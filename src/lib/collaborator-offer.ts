export const COLLABORATOR_OFFER = {
  monthly: "€9.99",
  annual: "€99",
  annualSaving: "2 months free",
  monthlyTokens: "5 million tokens included each month.",
  trial: "One-week free trial. 5 million tokens included. No credit card required.",
  trialShort: "One-week free trial. No credit card required.",
  french: { monthly: "9,99 €", annual: "99 €", annualSaving: "2 mois offerts", monthlyTokens: "5 millions de tokens inclus chaque mois.", trial: "Une semaine d’essai gratuit. 5 millions de tokens inclus. Sans carte bancaire.", trialShort: "Une semaine d’essai gratuit. Sans carte bancaire." },
} as const;

export const APPLICATION_OFFER = { monthly: "€9.99", frenchMonthly: "9,99 €" } as const;
export const APPLICATION_MODES = ["none", "managed", "existing"] as const;
export type ApplicationMode = (typeof APPLICATION_MODES)[number];

export function applicationModeLabel(mode: ApplicationMode, language: "en" | "fr") {
  if (mode === "managed") return language === "fr" ? `Hébergé et géré · +${APPLICATION_OFFER.frenchMonthly}/mois` : `Hosted and managed · +${APPLICATION_OFFER.monthly}/month`;
  if (mode === "existing") return language === "fr" ? "Connecter mon compte · connexion incluse" : "Connect my account · connection included";
  return language === "fr" ? "Sans cette application" : "Without this app";
}

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
  twenty?: ApplicationMode;
  chatwoot?: ApplicationMode;
};

export function readCollaboratorPreferences(query: Record<string, string | string[] | undefined>): CollaboratorPreferences {
  return {
    hosting: HOSTING_OPTIONS.find(option => option.value === query.hosting)?.value,
    intelligence: INTELLIGENCE_OPTIONS.find(option => option.value === query.intelligence)?.value,
    billing: query.billing === "monthly" || query.billing === "annual" ? query.billing : undefined,
    twenty: APPLICATION_MODES.find(mode => mode === query.twenty),
    chatwoot: APPLICATION_MODES.find(mode => mode === query.chatwoot),
  };
}

export function encounterLink(preferences: CollaboratorPreferences = {}, language?: "en" | "fr", marketing = false) {
  const query = new URLSearchParams({ rencontre: "1" });
  if (preferences.hosting) query.set("hosting", preferences.hosting);
  if (preferences.intelligence) query.set("intelligence", preferences.intelligence);
  if (preferences.billing) query.set("billing", preferences.billing);
  if (preferences.twenty) query.set("twenty", preferences.twenty);
  if (preferences.chatwoot) query.set("chatwoot", preferences.chatwoot);
  return `${language === "en" ? "/meet" : marketing ? "/fr/meet" : "/dashboard/visiteur"}?${query.toString()}`;
}

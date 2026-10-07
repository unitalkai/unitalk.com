import type { Metadata } from "next";
import { COLLABORATOR_OFFER } from "./collaborator-offer";

export type MarketingLanguage = "en" | "fr";

export function marketingPath(path: string, language: MarketingLanguage) {
  return language === "fr" ? `/fr${path === "/" ? "" : path}` : path;
}

export function equivalentMarketingPath(pathname: string, language: MarketingLanguage) {
  const path = pathname === "/fr" ? "/" : pathname.startsWith("/fr/") ? pathname.slice(3) : pathname;
  return marketingPath(["/", "/how-it-works", "/pricing", "/meet", "/login"].includes(path) ? path : "/", language);
}

export function localizedOffer(language: MarketingLanguage) {
  return language === "fr" ? COLLABORATOR_OFFER.french : COLLABORATOR_OFFER;
}

export function hostingLabel(value: string, fallback: string, language?: MarketingLanguage) {
  if (language !== "fr") return fallback;
  return ({ unitalk: "Unitalk Cloud", ovh: "Votre serveur OVH", hostinger: "Votre serveur Hostinger", infrastructure: "Votre infrastructure", hermes: "Hermes existant" } as Record<string, string>)[value] ?? fallback;
}

export function intelligenceLabel(value: string, fallback: string, language?: MarketingLanguage) {
  if (language !== "fr") return fallback;
  return ({ credits: "Crédits Unitalk", keys: "Vos clés API", gateway: "Votre passerelle IA" } as Record<string, string>)[value] ?? fallback;
}

export function marketingMetadata(path: string, language: MarketingLanguage, title: string, description: string): Metadata {
  return {
    title, description,
    alternates: { canonical: marketingPath(path, language), languages: { en: path, fr: marketingPath(path, "fr"), "x-default": path } },
    openGraph: { type: "website", title, description, url: `https://unitalk.com${marketingPath(path, language)}`, siteName: "Unitalk", locale: language === "fr" ? "fr_FR" : "en_US", alternateLocale: language === "fr" ? "en_US" : "fr_FR" },
    twitter: { card: "summary_large_image", title, description },
  };
}

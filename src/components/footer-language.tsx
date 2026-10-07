"use client";

import { usePathname, useRouter } from "next/navigation";
import { equivalentMarketingPath, type MarketingLanguage } from "@/lib/marketing-language";
import { Icon } from "./icons";

export function FooterLanguage({ language }: { language: MarketingLanguage }) {
  const pathname = usePathname();
  const router = useRouter();
  return <div className="footer-language"><Icon name="globe" /><label className="sr-only" htmlFor="footer-language">{language === "fr" ? "Langue du site" : "Website language"}</label><select id="footer-language" value={language} onChange={event => {
    const next = event.target.value as MarketingLanguage;
    if (next === language) return;
    const path = equivalentMarketingPath(pathname, next);
    const url = new URL(window.location.href);
    const query = new URLSearchParams();
    for (const key of ["rencontre", "url", "channel", "hosting", "intelligence", "billing", "twenty", "chatwoot"]) {
      const value = url.searchParams.get(key);
      if (value) query.set(key, value);
    }
    router.push(`${path}${query.size ? `?${query}` : ""}${url.hash}`);
  }}><option value="en" lang="en">English</option><option value="fr" lang="fr">Français</option></select><Icon name="chevron" /></div>;
}

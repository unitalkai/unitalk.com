"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import { parsePublicUrl } from "./create-form";
import { Icon } from "./icons";
import { encounterLink } from "@/lib/collaborator-offer";

export function HomeEntry({ language = "en" }: { language?: "en" | "fr" }) {
  const router = useRouter();
  const { preferences } = useCollaboratorOffer();
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const fr = language === "fr";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = parsePublicUrl(domain.trim());
    if (!url) {
      setError(fr ? "Indiquez un nom de domaine valide, par exemple exemple.fr." : "Enter a valid domain name, such as example.com.");
      return;
    }
    setError("");
    setPending(true);
    router.push(`${encounterLink(preferences, language, true)}&url=${encodeURIComponent(url.toString())}`);
  }

  return <div className="hero-entry">
    <form className="create-form" onSubmit={submit} noValidate>
      <div className="url-control"><Icon name="link" /><input id="home-domain" name="domain" type="text" inputMode="url" autoComplete="url" aria-label={fr ? "Votre nom de domaine" : "Enter your domain name"} placeholder={fr ? "Votre nom de domaine" : "Enter your domain name"} value={domain} onChange={event => { setDomain(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "home-domain-error" : undefined} disabled={pending} /><button className="button button-primary" type="submit" disabled={pending}>{pending ? fr ? "Ouverture…" : "Opening…" : fr ? "Rencontrer le mien" : "Meet yours"}<Icon name="arrow" /></button></div>
      {error && <p id="home-domain-error" className="form-error" role="alert">{error}</p>}
    </form>
    <div className="hero-entry-alternative"><span>{fr ? "ou" : "or"}</span><Link className="text-link" href={`${encounterLink(preferences, language, true)}&channel=linkedin`}>{fr ? "Commencer avec LinkedIn" : "Start with LinkedIn"} <Icon name="arrow" /></Link></div>
  </div>;
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import { parsePublicUrl } from "./create-form";
import { Icon } from "./icons";
import { signupLink } from "@/lib/collaborator-offer";

export function BusinessDomainForm({ language = "en" }: { language?: "en" | "fr" }) {
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
    router.push(signupLink(preferences, language, { url: url.toString() }));
  }

  return <form className="create-form business-domain-form" onSubmit={submit} noValidate>
    <label htmlFor="business-domain">{fr ? "Le site de votre entreprise" : "Your business website"}</label>
    <div className="url-control"><Icon name="link" /><input id="business-domain" name="domain" type="text" inputMode="url" autoComplete="url" placeholder={fr ? "Votre nom de domaine" : "Enter your domain name"} value={domain} onChange={event => { setDomain(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "business-domain-error" : "business-domain-hint"} disabled={pending} /><button className="button button-primary" type="submit" disabled={pending}>{pending ? fr ? "Ouverture…" : "Opening…" : fr ? "Continuer" : "Continue"}<Icon name="arrow" /></button></div>
    {error && <p id="business-domain-error" className="form-error" role="alert">{error}</p>}
    <p id="business-domain-hint" className="business-form-hint">{fr ? "Un point de départ pour votre inscription. Le site est ajouté comme référence." : "A starting point for signup. Your website is added as a reference."}</p>
  </form>;
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCollaboratorOffer } from "./collaborator-offer-context";
import { parsePublicUrl } from "./create-form";
import { Icon } from "./icons";
import { encounterLink } from "@/lib/collaborator-offer";

export function HomeEntry() {
  const router = useRouter();
  const { preferences } = useCollaboratorOffer();
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = parsePublicUrl(domain.trim());
    if (!url) {
      setError("Enter a valid domain name, such as example.com.");
      return;
    }
    setError("");
    setPending(true);
    router.push(`${encounterLink(preferences, "en")}&url=${encodeURIComponent(url.toString())}`);
  }

  return <div className="hero-entry">
    <form className="create-form" onSubmit={submit} noValidate>
      <label htmlFor="home-domain">Enter your domain name</label>
      <div className="url-control"><Icon name="link" /><input id="home-domain" name="domain" type="text" inputMode="url" autoComplete="url" placeholder="example.com" value={domain} onChange={event => { setDomain(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "home-domain-error" : "home-entry-hint"} disabled={pending} /><button className="button button-primary" type="submit" disabled={pending}>{pending ? "Opening…" : "Meet yours"}<Icon name="arrow" /></button></div>
      {error && <p id="home-domain-error" className="form-error" role="alert">{error}</p>}
    </form>
    <div className="hero-entry-alternative"><span>or</span><Link className="text-link" href={`${encounterLink(preferences, "en")}&channel=linkedin`}>Start with LinkedIn <Icon name="arrow" /></Link></div>
    <p className="home-entry-hint" id="home-entry-hint">Website and LinkedIn connections are planned. Start a local demo today.</p>
  </div>;
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";

export function parsePublicUrl(value: string): URL | null {
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return ["https:", "http:"].includes(url.protocol) && url.hostname.includes(".") && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

export function CreateForm({ compact = false, onPreview }: { compact?: boolean; onPreview?: (url: string) => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = parsePublicUrl(value.trim());
    if (!url) {
      setError("Ajoutez une URL publique valide, par exemple votre-site.com.");
      return;
    }
    setError("");
    if (onPreview) {
      onPreview(url.toString());
    } else {
      setPending(true);
      router.push(`/dashboard/visiteur?url=${encodeURIComponent(url.toString())}`);
    }
  }

  return <form className={`create-form${compact ? " create-form-compact" : ""}`} onSubmit={submit} noValidate>
    <label htmlFor={compact ? "create-url-compact" : "create-url"}>Commencez avec votre URL</label>
    <div className="url-control"><Icon name="link" /><input id={compact ? "create-url-compact" : "create-url"} name="url" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.com" value={value} onChange={e => { setValue(e.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "url-error" : "url-demo-hint"} disabled={pending} /><button className="button button-primary" type="submit" disabled={pending}>{pending ? "Ouverture…" : "Créer le mien"}<Icon name="arrow" /></button></div>
    {error ? <p className="form-error" id="url-error" role="alert">{error}</p> : <p className="form-hint" id="url-demo-hint">Aperçu de démonstration · aucune URL analysée.</p>}
  </form>;
}

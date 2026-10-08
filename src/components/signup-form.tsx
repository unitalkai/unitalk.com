"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import { UnitalkMark } from "./unitalk-mark";
import { LinkedInLogo } from "./linkedin-logo";
import { parsePublicUrl } from "./create-form";
import { type CollaboratorPreferences } from "@/lib/collaborator-offer";
import { localizedOffer, marketingPath } from "@/lib/marketing-language";
import { PublicDoorPreview } from "./public-door-preview";

const MISSION_SUGGESTIONS = {
  en: [
    { label: "Follow-ups", text: "Keep track of my important contacts and prepare follow-ups." },
    { label: "Qualify", text: "Qualify incoming leads and flag the promising ones." },
    { label: "Support", text: "Handle customer support requests and prepare replies." },
  ],
  fr: [
    { label: "Relances", text: "Suivre mes contacts importants et préparer les relances." },
    { label: "Qualifier", text: "Qualifier les demandes entrantes et me signaler les plus prometteuses." },
    { label: "Support", text: "Traiter les demandes de support client et préparer les réponses." },
  ],
} as const;

export function SignupForm({ initialUrl, initialChannel, preferences, language = "en" }: { initialUrl?: string; initialChannel?: string; preferences: CollaboratorPreferences; language?: "en" | "fr" }) {
  const [name, setName] = useState("");
  const [mission, setMission] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"identity" | "mission">("identity");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const source = initialUrl ? parsePublicUrl(initialUrl) : null;
  const fr = language === "fr";
  const offer = localizedOffer(language);
  const suggestions = MISSION_SUGGESTIONS[language];

  useEffect(() => {
    if (step !== "mission") return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [step]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === "identity") {
      if (!email.trim()) { setError(fr ? "Indiquez votre adresse e-mail." : "Enter your email address."); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError(fr ? "Cette adresse e-mail n'est pas valide." : "That email address isn't valid."); return; }
      setError("");
      setStep("mission");
      return;
    }
    if (!name.trim()) { setError(fr ? "Indiquez votre prénom." : "Enter your first name."); return; }
    if (!mission.trim()) { setError(fr ? "Décrivez ce que vous voulez confier à votre Collaborateur." : "Describe what you'd like your Collaborator to handle."); return; }
    setError("");
  }

  function pickSuggestion(text: string) { setMission(text); setError(""); }

  return <div className="signup-layout">
    <div className="signup-form-pane">
      <div className="signup-brand"><Link href={marketingPath("/", language)} className="signup-logo" aria-label="Unitalk"><UnitalkMark /></Link></div>

      {source && <div className="signup-source"><Icon name="link" /><div><strong>{fr ? "Site de référence" : "Website reference"}: {source.hostname}</strong></div></div>}
      {initialUrl && !source && <p className="form-error" role="alert">{fr ? "Ce site n'est pas valide. Vous pouvez continuer." : "That website reference isn't valid. You can still continue."}</p>}
      {initialChannel && <div className="signup-source"><Icon name="message" /><div><strong>{fr ? "Canal souhaité" : "Preferred channel"}: {initialChannel}</strong></div></div>}

      {step === "identity" && <form className="signup-create" onSubmit={submit} noValidate>
        <h1>{fr ? "Créez votre compte." : "Create your account."}</h1>
        <p className="signup-subtitle">{fr ? "Une semaine offerte. Sans carte bancaire." : "One week free. No credit card required."}</p>

        <div className="signup-sso">
          <button type="button" className="signup-sso-button" onClick={() => { setEmail("demo@google.account"); setError(""); setStep("mission"); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            {fr ? "Continuer avec Google" : "Continue with Google"}
          </button>
          <button type="button" className="signup-sso-button" onClick={() => { setEmail("demo@linkedin.account"); setError(""); setStep("mission"); }}>
            <LinkedInLogo className="signup-sso-linkedin" />
            {fr ? "Continuer avec LinkedIn" : "Continue with LinkedIn"}
          </button>
        </div>

        <div className="signup-separator"><span>{fr ? "ou" : "or"}</span></div>

        <label htmlFor="signup-email">{fr ? "Adresse e-mail" : "Email address"}</label>
        <input id="signup-email" type="email" autoComplete="email" placeholder={fr ? "vous@entreprise.com" : "you@company.com"} maxLength={254} value={email} onChange={event => { setEmail(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "signup-error" : undefined} />

        {error && <p id="signup-error" className="form-error" role="alert">{error}</p>}
        <button className="signup-submit" type="submit">{fr ? "Continuer" : "Continue"} <Icon name="arrow" /></button>

        <div className="signup-login-row"><span>{fr ? "Déjà inscrit ?" : "Already have an account?"}</span><Link href={marketingPath("/login", language)} className="button button-outline button-small">{fr ? "Se connecter" : "Log in"}</Link></div>
      </form>}

      {step === "mission" && <form className="signup-mission" onSubmit={submit} noValidate>
        <h1 ref={heading} tabIndex={-1}>{fr ? "Que voulez-vous lui confier ?" : "What would you like to hand over?"}</h1>
        <p className="signup-subtitle">{fr ? "Une mission. Pas une liste de tâches." : "One mission. Not a to-do list."}</p>

        <label htmlFor="signup-name">{fr ? "Votre prénom" : "Your first name"}</label>
        <input id="signup-name" autoComplete="name" placeholder={fr ? "Comment votre Collaborateur doit-il vous appeler ?" : "What should your Collaborator call you?"} maxLength={70} value={name} onChange={event => { setName(event.target.value); setError(""); }} />

        <label htmlFor="signup-mission">{fr ? "Sa première mission" : "Its first mission"}</label>
        <textarea id="signup-mission" rows={3} maxLength={600} value={mission} onChange={event => { setMission(event.target.value); setError(""); }} placeholder={fr ? "Par exemple : suivre mes contacts importants, préparer les relances et me demander quand une décision est nécessaire." : "e.g. Keep track of my important contacts, prepare follow-ups and ask me when a decision is needed."} aria-invalid={Boolean(error)} aria-describedby={error ? "signup-mission-error" : undefined} />
        <div className="signup-suggestions" aria-label={fr ? "Suggestions de mission" : "Mission suggestions"}>{suggestions.map(item => <button type="button" key={item.label} onClick={() => pickSuggestion(item.text)}>{item.label}</button>)}</div>

        {error && <p id="signup-mission-error" className="form-error" role="alert">{error}</p>}
        <button className="signup-submit" type="submit">{fr ? "Continuer" : "Continue"} <Icon name="arrow" /></button>
        <button type="button" className="signup-back" onClick={() => { setStep("identity"); setError(""); }}>{fr ? "← Modifier mon e-mail" : "← Change my email"}</button>
      </form>}
    </div>

    <aside className="signup-preview-pane">
      <Image src="/images/professional-conversation.jpg" alt="" fill sizes="50vw" className="signup-preview-photo" />
      <div className="signup-preview-overlay" />
      <div className="signup-door-preview">
        <h2>{fr ? <>Votre porte d&apos;entrée.<br /><span>À votre nom.</span></> : <>Your front door.<br /><span>With your name.</span></>}</h2>
        <PublicDoorPreview language={language} ownerName={name} />
      </div>
    </aside>
  </div>;
}
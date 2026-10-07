"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { WorkDemo } from "./work-demo";
import { parsePublicUrl } from "./create-form";
import { WORK_EXAMPLES, type WorkExampleId } from "@/lib/work-examples";
import { COLLABORATOR_OFFER, HOSTING_OPTIONS, INTELLIGENCE_OPTIONS, type CollaboratorPreferences } from "@/lib/collaborator-offer";

export function EnglishEncounter({ initialUrl, initialChannel, preferences }: { initialUrl?: string; initialChannel?: string; preferences: CollaboratorPreferences }) {
  const [name, setName] = useState("");
  const [example, setExample] = useState<WorkExampleId>("follow-up");
  const [met, setMet] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const source = initialUrl ? parsePublicUrl(initialUrl) : null;
  const hosting = HOSTING_OPTIONS.find(option => option.value === preferences.hosting);
  const intelligence = INTELLIGENCE_OPTIONS.find(option => option.value === preferences.intelligence);

  useEffect(() => {
    if (!met) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [met]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Tell us your name to start the encounter."); return; }
    setError("");
    setMet(true);
  }

  return <>
    <div className="meet-heading"><Link href="/#work-example" className="meet-back"><Icon name="arrow" />Back to the work</Link><h1>Meet yours.<br /><span>Start with one mission.</span></h1><p>No account or payment needed for this local demo.</p></div>
    <div className="meet-workspace">
      <div className="meet-inputs">
        <h2>A little context.<br />A useful first step.</h2>
        {source && <div className="meet-source"><Icon name="link" /><div><strong>Website received: {source.hostname}</strong><p>A reference for this encounter. Not analysed or connected.</p></div></div>}
        {initialUrl && !source && <p className="form-error" role="alert">That website reference isn’t valid. You can still start with a mission.</p>}
        {initialChannel && <div className="meet-source"><Icon name="message" /><div><strong>Starting with {initialChannel}</strong><p>Your intended channel. No {initialChannel} account is connected.</p></div></div>}
        <form className="meet-form" onSubmit={submit} noValidate>
          <label htmlFor="meet-name">What should your Collaborator call you?</label>
          <input id="meet-name" autoComplete="name" placeholder="Your first name" maxLength={70} value={name} onChange={event => { setName(event.target.value); setError(""); setMet(false); }} aria-invalid={Boolean(error)} aria-describedby={error ? "meet-error" : undefined} />
          <fieldset><legend>What would you like off your plate?</legend>{WORK_EXAMPLES.map(item => <label className="meet-mission" key={item.id}><input type="radio" name="mission" value={item.id} checked={example === item.id} onChange={() => { setExample(item.id); setMet(false); }} /><span>{item.mission}</span></label>)}</fieldset>
          {error && <p id="meet-error" className="form-error" role="alert">{error}</p>}
          <button className="button button-primary" type="submit">{met ? "Start again" : "Meet my Collaborator"}<Icon name="arrow" /></button>
        </form>
        {(hosting || intelligence || preferences.billing) && <details className="meet-preferences"><summary>Your setup choices <Icon name="chevron" /></summary><dl>{hosting && <div><dt>Hosting</dt><dd>{hosting.label}</dd></div>}{intelligence && <div><dt>Intelligence</dt><dd>{intelligence.label}</dd></div>}{preferences.billing && <div><dt>Subscription preference</dt><dd>{preferences.billing === "annual" ? `${COLLABORATOR_OFFER.annual} / year` : `${COLLABORATOR_OFFER.monthly} / month`}</dd></div>}</dl><p>Preview preferences. No deployment or subscription activated.</p></details>}
      </div>
      <section className="meet-result" aria-label="Your local encounter" aria-live="polite">
        {met ? <><h2 ref={heading} tabIndex={-1}>Hi {name.trim()}.<br /><span>Let’s make the next step easier.</span></h2><p>This is the kind of work your Collaborator could prepare. Try editing it and approving the example.</p><WorkDemo key={example} initialExample={example} compact /><div className="meet-next"><h3>Your next step stays yours.</h3><p>In the intended product, you’d connect your context and set the authority for this mission. This demo keeps it local.</p><button type="button" className="text-link" onClick={() => { setMet(false); document.getElementById("meet-name")?.focus(); }}>Try another mission <Icon name="arrow" /></button></div></> : <div className="meet-empty"><span className="demo-label">Local encounter</span><Icon name="message" width="44" height="44" /><h2>Your work.<br /><span>Your Collaborator.</span></h2><p>Choose a mission. See a prepared example. Keep the final say.</p><p className="meet-demo-note">Prewritten examples, no connected AI or external action.</p></div>}
      </section>
    </div>
  </>;
}

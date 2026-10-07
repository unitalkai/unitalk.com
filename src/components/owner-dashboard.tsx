"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { Brand } from "./site-shell";
import { OwnerCollaborator, type CollaboratorDetail } from "./owner-collaborator";
import { OwnerSetup } from "./owner-setup";
import { authorityZones, initialActivity, initialAuthority, meetingSlots, ownerDecisions, ownerPeople, proposalDraft, type AuthorityLevel, type DecisionId, type OwnerActivity } from "@/lib/owner-demo";

type Section = "home" | "people" | "collaborator";
type View = "main" | "decision" | "activity" | "person" | "conversation" | "setup";
const sections = [{ id: "home" as const, label: "Accueil", mobile: "Accueil", icon: "home" as const }, { id: "people" as const, label: "People", mobile: "People", icon: "people" as const }, { id: "collaborator" as const, label: "Collaborator", mobile: "Moi", icon: "message" as const }];

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="owner-back" onClick={onClick}><Icon name="arrow" />{label}</button>;
}

function back(label: string, onClick: () => void) {
  return <BackButton label={label} onClick={onClick} />;
}

export function OwnerDashboard() {
  const [section, setSection] = useState<Section>("home");
  const [collaboratorDetail, setCollaboratorDetail] = useState<CollaboratorDetail>("overview");
  const [view, setView] = useState<View>("main");
  const [decisionId, setDecisionId] = useState<DecisionId>("sarah");
  const [done, setDone] = useState<DecisionId[]>([]);
  const [activity, setActivity] = useState(initialActivity);
  const [activityFilter, setActivityFilter] = useState("all");
  const [activityDetail, setActivityDetail] = useState<string | null>(null);
  const [personId, setPersonId] = useState("sarah");
  const [search, setSearch] = useState("");
  const [slot, setSlot] = useState(meetingSlots[1]);
  const [showSlots, setShowSlots] = useState(false);
  const [draft, setDraft] = useState(proposalDraft);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [paused, setPaused] = useState(false);
  const [workState, setWorkState] = useState("working");
  const [authority, setAuthority] = useState(initialAuthority);
  const [takeovers, setTakeovers] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<Record<string, string[]>>({});
  const [ownerReply, setOwnerReply] = useState("");
  const [identity, setIdentity] = useState("Le Collaborator de Patrick");
  const [talkOpen, setTalkOpen] = useState(false);
  const [talkPrompt, setTalkPrompt] = useState("");
  const [chat, setChat] = useState<{ role: "owner" | "collaborator"; text: string }[]>([]);
  const [thinking, setThinking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState("");
  const talkDialog = useRef<HTMLDialogElement>(null);
  const talkInput = useRef<HTMLInputElement>(null);
  const talkLog = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const accountMenu = useRef<HTMLDetailsElement>(null);
  const pending = ownerDecisions.filter(item => !done.includes(item.id));
  const current = ownerDecisions.find(item => item.id === decisionId)!;
  const person = ownerPeople.find(item => item.id === personId)!;
  const status = paused ? "En pause" : thinking ? "Je réfléchis" : talkOpen ? "À l’écoute" : workState === "waiting" ? "En attente" : workState === "needs" && pending.length ? "Besoin de vous" : "Au travail";
  const stateLine = paused ? "Je n’agis pas pour le moment." : workState === "waiting" ? "Je reste à l’écoute." : workState === "needs" && pending.length ? "J’ai besoin de vous." : "J’y travaille.";
  const blockedRule = authority.find(item => item.id === (current.id === "sarah" ? "meetings" : current.id === "acme" ? "proposals" : "sensitive"))?.level === "never";

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (accountMenu.current) accountMenu.current.open = false;
    const visibleHeading = section === "collaborator" ? document.querySelector<HTMLHeadingElement>(".owner-main > div:not([hidden]) h1") : heading.current;
    visibleHeading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, section, personId, decisionId]);

  useEffect(() => {
    if (talkOpen && !talkDialog.current?.open) talkDialog.current?.showModal();
    else if (!talkOpen && talkDialog.current?.open) talkDialog.current?.close();
  }, [talkOpen]);

  useEffect(() => { talkLog.current?.scrollTo({ top: talkLog.current.scrollHeight }); }, [chat, thinking]);
  useEffect(() => () => { if (replyTimer.current) clearTimeout(replyTimer.current); }, []);

  function navigate(next: Section, nextView: View = "main") {
    setSection(next); setView(nextView); setError(""); setNotice(""); setActivityDetail(null);
    setCollaboratorDetail("overview");
  }
  function openDecision(id: DecisionId, chosenSlot?: string) {
    setDecisionId(id); setShowSlots(false); setError(""); setNotice("");
    if (chosenSlot) setSlot(chosenSlot);
    setSection("home"); setView("decision");
  }
  function openPerson(id: string, conversation = false) {
    setPersonId(id); setSection("people"); setView(conversation ? "conversation" : "person");
    setOwnerReply(""); setError(""); setNotice("");
  }
  function openTalk(prompt = "") { setTalkPrompt(prompt); setVoiceNotice(""); setTalkOpen(true); }
  function addActivity(title: string, channel: string, kind: OwnerActivity["kind"], relatedPerson?: string, detail = title) {
    setActivity(previous => [{ id: `local-${crypto.randomUUID()}`, time: "À l’instant", day: "Aujourd’hui", title, channel, kind, person: relatedPerson, detail }, ...previous]);
  }
  function approve() {
    if (done.includes(current.id) || paused || takeovers.includes(current.id) || blockedRule) return;
    if (current.id === "david" && !answer.trim()) { setError("Indiquez vos priorités avant de valider la réponse."); return; }
    if (current.id === "acme" && !draft.trim()) { setError("Le brouillon est vide. Écrivez la réponse à approuver."); return; }
    setDone(previous => [...previous, current.id]);
    const result = current.id === "sarah" ? `Le créneau ${slot.toLowerCase()} est approuvé pour Sarah.` : current.id === "acme" ? "Votre réponse à Acme est approuvée." : "Votre réponse à David est validée.";
    addActivity(current.id === "sarah" ? `J’ai confirmé le rendez-vous avec Sarah : ${slot.toLowerCase()}.` : current.id === "acme" ? "J’ai répondu à la proposition d’Acme." : "J’ai transmis vos priorités à David.", current.id === "sarah" ? "Calendrier" : "Email", current.id === "sarah" ? "meetings" : "conversations", current.id, result);
    setView("main"); setNotice(result); setError("");
  }
  function updateAuthority(id: string, level: AuthorityLevel) {
    setAuthority(previous => previous.map(item => item.id === id ? { ...item, level } : item));
    const rule = authority.find(item => item.id === id)!;
    const zone = authorityZones.find(item => item.id === level)!;
    setNotice(`« ${rule.label} » : ${zone.label}. Règle mise à jour.`);
    addActivity(`J’ai pris en compte votre nouvelle limite : ${rule.label.toLowerCase()}.`, "Autorité", "actions");
  }
  function sendTalk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = talkPrompt.trim();
    if (!message || thinking) return;
    setChat(previous => [...previous, { role: "owner", text: message }]); setTalkPrompt(""); setThinking(true);
    const normalized = message.toLocaleLowerCase("fr");
    let response = "Je peux vous aider à lire le contexte, revoir une décision ou ajuster mes limites. Quel échange souhaitez-vous reprendre ?";
    if (normalized.includes("acme")) response = done.includes("acme") ? "Vous avez approuvé la réponse à Acme. Le prochain pas du scénario est un échange sur le pilote de quatre semaines. Aucun engagement contractuel n’a été pris." : "Acme propose un pilote de quatre semaines. J’ai relu la proposition et préparé une réponse sans engagement contractuel. Votre accord est le seul point qui m’arrête.";
    else if (normalized.includes("sarah")) response = done.includes("sarah") ? `Vous avez approuvé ${slot.toLowerCase()} pour Sarah. Elle évalue Unitalk pour son agence : préparez vos exemples de suivi client et ses besoins.` : "Sarah évalue Unitalk pour son agence. Elle veut déplacer le rendez-vous. Je recommande jeudi à 14 h : elle préfère les après-midi. Vous pouvez confirmer depuis l’Accueil.";
    else if (normalized.includes("pause") || normalized.includes("arrête tout")) { setPaused(true); response = "Je suis en pause. Je conserve le contexte et les décisions en attente. Vous pouvez me faire reprendre depuis mon état d’activité."; }
    else if ((normalized.includes("investisseur") || normalized.includes("david")) && (normalized.includes("stop") || normalized.includes("arrête"))) { setTakeovers(previous => previous.includes("david") ? previous : [...previous, "david"]); response = "Vous reprenez la main sur l’échange avec David. Je ne poursuis pas cette conversation tant que vous ne me rendez pas la main."; }
    else if (normalized.includes("attention") || normalized.includes("besoin de moi")) response = pending.length ? `Il reste ${pending.length} situation${pending.length > 1 ? "s" : ""} qui ${pending.length > 1 ? "ont" : "a"} besoin de vous : ${pending.map(item => `${item.name} (${item.reason.toLowerCase()})`).join(", ")}. Le contexte et ma recommandation sont prêts dans l’Accueil.` : "Rien n’a besoin de vous. Les trois exceptions ont été résolues. Vous pouvez retrouver les résultats dans l’activité.";
    else if (normalized.includes("vivatech") || normalized.includes("relanc")) response = "Je n’ai pas de liste VivaTech à utiliser. Vous pouvez déjà définir vos règles de relance dans Collaborator → Autorité.";
    replyTimer.current = setTimeout(() => { setChat(previous => [...previous, { role: "collaborator", text: response }]); setThinking(false); }, 600);
  }
  function sendOwnerReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ownerReply.trim()) return;
    setSentMessages(previous => ({ ...previous, [person.id]: [...(previous[person.id] ?? []), ownerReply.trim()] }));
    addActivity(`Vous avez repris la conversation avec ${person.name}.`, person.channel, "conversations", person.id, ownerReply.trim());
    setOwnerReply(""); setNotice("Réponse ajoutée à la conversation.");
  }
  function relationshipNext(id: string) { return done.includes(id as DecisionId) ? id === "sarah" ? `Rendez-vous ${slot.toLowerCase()}` : "Poursuivre l’échange" : ownerPeople.find(item => item.id === id)!.next; }

  return <div className="owner-app" lang="fr">
    <header className="owner-shell">
      <div className="owner-shell-top"><Link href="/dashboard/patrick" className="owner-identity" aria-label="Accueil du Collaborator de Patrick"><span className="owner-mark"><Icon name="message" width="23" height="23" /></span><span>{identity}<small>AI Collaborator</small></span></Link><div className="owner-shell-actions"><button className={`owner-status${paused ? " is-paused" : ""}`} onClick={() => navigate("home", "activity")} aria-label={`${status} — ouvrir l’activité`}><span className="owner-status-dot" />{status}</button><details ref={accountMenu} className="owner-account"><summary className="icon-button" aria-label="Compte et réglages de Patrick"><Icon name="settings" /></summary><div className="account-dropdown"><p>Patrick Chassany</p><button onClick={() => navigate("collaborator")}>Mon Collaborator<Icon name="arrow" /></button><Link href="/@patrick-chassany">Présence publique<Icon name="external" /></Link><button onClick={() => navigate("home", "setup")}>Rejouer la première rencontre<Icon name="arrow" /></button><Link href="/dashboard/visiteur">Espace visiteur<Icon name="arrow" /></Link><Link href="/">Accueil<Icon name="arrow" /></Link></div></details></div></div>
      <div className="owner-shell-bottom"><nav className="owner-desktop-nav" aria-label="Navigation de l’app propriétaire">{sections.map(item => <button key={item.id} aria-current={section === item.id ? "page" : undefined} onClick={() => navigate(item.id)}>{item.label}</button>)}</nav><button className="owner-talk-link" onClick={() => openTalk()}><Icon name="message" />Parler à mon Collaborator</button></div>
    </header>
    <div className="owner-demo-strip"><span className="demo-label">Démo</span></div>
    <main id="main-content" className="owner-main">
      {notice && <div className="owner-result" role="status"><Icon name="check" /><div><strong>C’est fait.</strong><p>{notice}</p><span className="demo-label">Démo</span></div><button className="icon-button" aria-label="Fermer la confirmation" onClick={() => setNotice("")}><Icon name="close" /></button></div>}

      {view === "setup" ? <OwnerSetup onComplete={() => { navigate("home"); setNotice("La rencontre est terminée. Retrouvez le travail du Collaborator de Patrick."); }} /> : section === "home" && view === "main" ? <>
        <div className="owner-intro"><div><h1 ref={heading} tabIndex={-1}>{stateLine}</h1><p>{paused ? "Je garde le contexte. Je reprendrai quand vous le souhaiterez." : workState === "waiting" ? "Rien ne demande mon attention pour le moment. Je vous préviendrai quand ce sera le cas." : "Vous gardez les décisions. Je garde le fil."}</p></div>{paused && <button className="button button-primary" onClick={() => setPaused(false)}>Reprendre<Icon name="arrow" /></button>}</div>
        <section className="owner-home-section" aria-labelledby="you-heading"><div className="owner-section-title"><h2 id="you-heading">Vous</h2><span>{pending.length ? `${pending.length} chose${pending.length > 1 ? "s" : ""} ${pending.length > 1 ? "ont" : "a"} besoin de vous` : "Rien n’a besoin de vous."}</span></div>
          {pending.length ? <div className="owner-exceptions">{pending.map(item => <article className="owner-exception" key={item.id}><div className="owner-exception-person"><span className="avatar avatar-neutral">{item.initials}</span><div><h3><button onClick={() => openDecision(item.id)}>{item.name}</button></h3><span>{item.reason}</span></div><button className="icon-button owner-open-decision" aria-label={`Voir la décision pour ${item.name}`} onClick={() => openDecision(item.id)}><Icon name="arrow" /></button></div><div className="owner-exception-body"><p>{item.summary}</p><p>{item.prepared}</p><div className="owner-inline-actions">{item.id === "sarah" ? meetingSlots.map(value => <button key={value} className={`button button-small ${value === meetingSlots[1] ? "button-primary" : "button-outline"}`} onClick={() => openDecision(item.id, value)}>{value}</button>) : <button className="button button-outline button-small" onClick={() => openDecision(item.id)}>{item.id === "acme" ? "Relire la proposition" : "Répondre"}<Icon name="arrow" /></button>}</div></div></article>)}</div> : <div className="owner-all-clear"><Icon name="check" width="28" height="28" /><div><h3>Vous pouvez passer à autre chose.</h3><p>{paused ? "Les décisions sont résolues. Je suis en pause pour le moment." : "Je m’occupe de ce qui entre dans mon autorité."}</p></div></div>}
        </section>
        <section className="owner-home-section" aria-labelledby="working-heading"><div className="owner-section-title"><h2 id="working-heading">J’y travaille</h2><button className="owner-text-action" onClick={() => navigate("home", "activity")}>Voir l’activité<Icon name="arrow" /></button></div><ol className="owner-activity-preview">{activity.slice(0, 4).map(item => <li key={item.id}><span>{item.time === "À l’instant" ? "À l’instant" : item.day === "Hier" ? "Hier" : item.time}</span><button onClick={() => { navigate("home", "activity"); setActivityDetail(item.id); }}>{item.title}<Icon name="arrow" /></button></li>)}</ol></section>
        <section className="owner-home-section" aria-labelledby="home-people-heading"><div className="owner-section-title"><h2 id="home-people-heading">People</h2><button className="owner-text-action" onClick={() => navigate("people")}>Voir les relations<Icon name="arrow" /></button></div><div className="owner-people-preview">{ownerPeople.filter(item => item.id !== "jean").map(item => <button key={item.id} onClick={() => openPerson(item.id)}><span className="avatar avatar-neutral">{item.initials}</span><span>{item.name}<small>{item.role}</small></span><Icon name="chevron" /></button>)}</div></section>
      </> : section === "home" && view === "decision" ? <div className="owner-focused">
        {back("Accueil", () => navigate("home"))}<div className="owner-detail-person"><span className="avatar avatar-neutral">{current.initials}</span><span>{current.name}<small>{current.reason}</small></span></div><h1 ref={heading} tabIndex={-1}>{current.title}</h1>
        <div className="owner-decision-context"><section><h2>Le contexte</h2><p>{current.context}</p></section><section className="owner-recommendation"><h2>{current.id === "sarah" && slot !== meetingSlots[1] ? "Votre choix" : "Ma recommandation"}</h2><p>{current.id === "sarah" ? slot : current.recommendation}</p></section><section><h2>Pourquoi</h2><p>{current.id === "sarah" && slot !== meetingSlots[1] ? "Ce créneau est disponible dans le scénario. Ma recommandation reste jeudi à 14 h, car Sarah préfère les après-midi. Votre choix a le dernier mot." : current.why}</p></section><section><h2>Ce que je peux faire</h2><p>{current.canDo}</p></section></div>
        {current.id === "acme" && <div className="owner-form"><label htmlFor="proposal-draft">La réponse que je propose</label><textarea id="proposal-draft" rows={10} value={draft} maxLength={5000} onChange={event => { setDraft(event.target.value); setError(""); }} aria-invalid={Boolean(error)} /></div>}
        {current.id === "david" && <div className="owner-form"><label htmlFor="investor-answer">Vos priorités, avec vos mots</label><textarea id="investor-answer" rows={4} placeholder="Ce que je souhaite partager avec David…" value={answer} maxLength={3000} onChange={event => { setAnswer(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "decision-error" : undefined} /></div>}
        {current.id === "sarah" && showSlots && <fieldset className="owner-slot-picker"><legend>Choisir un autre créneau</legend>{meetingSlots.map(value => <label key={value}><input type="radio" name="meeting-slot" checked={slot === value} onChange={() => setSlot(value)} />{value}</label>)}</fieldset>}
        {error && <p className="form-error" id="decision-error" role="alert">{error}</p>}
        {(paused || takeovers.includes(current.id) || blockedRule) && <p className="owner-inline-notice">{blockedRule ? "Votre autorité place cette action dans NEVER DO IT. Modifiez cette règle dans Collaborator → Autorité pour me la confier." : paused ? "Je suis en pause. Reprenez mon activité pour me confier cette action." : "Vous avez repris cette conversation. Rendez-moi la main pour me confier cette action."}</p>}
        <div className="owner-decision-actions"><button className="button button-primary" onClick={approve} disabled={paused || takeovers.includes(current.id) || blockedRule}>{current.id === "sarah" ? `Approuver ${slot.toLowerCase()}` : current.action}<Icon name="check" /></button>{current.id === "sarah" && <button className="button button-outline" onClick={() => setShowSlots(!showSlots)} aria-expanded={showSlots}>Choisir un autre créneau</button>}</div><div className="owner-secondary-actions"><button onClick={() => openPerson(current.id, true)}>Parler à {current.name}<Icon name="arrow" /></button><button onClick={() => openTalk(`Dites-m’en plus sur ${current.name}.`)}>Dites-m’en plus<Icon name="message" /></button></div>
      </div> : section === "home" && view === "activity" ? <>
        {back("Accueil", () => navigate("home"))}<div className="owner-page-title"><h1 ref={heading} tabIndex={-1}>Mon activité.</h1><p>Ce que j’ai pris en charge.</p></div><div className="owner-state-control"><div><span className={`owner-status${paused ? " is-paused" : ""}`}><span className="owner-status-dot" />{status}</span><p>{paused ? "Je n’agis pas pour le moment. Le contexte est conservé." : "Je poursuis ce qui entre dans mon autorité. Je vous demande lorsque c’est nécessaire."}</p></div><button className={`button ${paused ? "button-primary" : "button-outline"} button-small`} onClick={() => setPaused(!paused)}><Icon name={paused ? "play" : "pause"} />{paused ? "Reprendre" : "Mettre en pause"}</button></div>
        <div className="owner-demo-state"><label htmlFor="demo-work-state">État d’activité</label><select id="demo-work-state" value={workState} onChange={event => setWorkState(event.target.value)}><option value="working">Au travail</option><option value="waiting">En attente</option><option value="needs">Besoin de vous</option></select></div>
        <div className="owner-filters" aria-label="Filtrer l’activité">{[{ id: "all", label: "Tout" }, { id: "conversations", label: "Conversations" }, { id: "meetings", label: "Rendez-vous" }, { id: "actions", label: "Actions" }].map(item => <button key={item.id} aria-pressed={activityFilter === item.id} onClick={() => { setActivityFilter(item.id); setActivityDetail(null); }}>{item.label}</button>)}</div>
        {["Aujourd’hui", "Hier"].map(day => { const entries = activity.filter(item => item.day === day && (activityFilter === "all" || item.kind === activityFilter)); return entries.length > 0 && <section className="owner-activity-day" key={day}><h2>{day}</h2><ol>{entries.map(item => <li key={item.id}><button className="owner-activity-entry" aria-expanded={activityDetail === item.id} onClick={() => setActivityDetail(activityDetail === item.id ? null : item.id)}><span>{item.time}</span><span>{item.title}<small>{item.channel}</small></span><Icon name="chevron" /></button>{activityDetail === item.id && <div className="owner-activity-detail"><p>{item.detail}</p><span className="demo-label">Activité simulée</span>{item.person && <button className="owner-text-action" onClick={() => openPerson(item.person!)}>Voir la relation<Icon name="arrow" /></button>}</div>}</li>)}</ol></section>; })}
        {!activity.some(item => activityFilter === "all" || item.kind === activityFilter) && <div className="owner-all-clear"><p>Aucune activité de ce type dans le scénario.</p></div>}
      </> : section === "people" && view === "main" ? <>
        <div className="owner-page-title"><h1 ref={heading} tabIndex={-1}>Les bonnes personnes.<br /><span>Le contexte avec elles.</span></h1><p>Je garde le fil de vos relations.</p></div><div className="owner-search"><Icon name="search" /><label className="sr-only" htmlFor="people-search">Rechercher une personne ou une entreprise</label><input id="people-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher une personne…" /></div><div className="owner-people-list">{ownerPeople.filter(item => `${item.name} ${item.role}`.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr").trim())).map(item => <button className="owner-person-row" key={item.id} onClick={() => openPerson(item.id)}><span className="avatar avatar-neutral">{item.initials}</span><span><strong>{item.name}</strong><small>{item.role} · {item.state}</small></span><span className="owner-person-next">{relationshipNext(item.id)}</span><Icon name="arrow" /></button>)}</div>{!ownerPeople.some(item => `${item.name} ${item.role}`.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr").trim())) && <div className="owner-all-clear"><div><h2>Aucune relation trouvée.</h2><p>Essayez un nom ou une autre recherche.</p><button className="owner-text-action" onClick={() => setSearch("")}>Effacer la recherche<Icon name="arrow" /></button></div></div>}
      </> : section === "people" && view === "person" ? <div className="owner-focused">
        {back("People", () => navigate("people"))}<div className="owner-person-heading"><span className="avatar avatar-large avatar-neutral">{person.initials}</span><div><h1 ref={heading} tabIndex={-1}>{person.name}</h1><p>{person.role} · {person.state}</p></div></div><p className="owner-last-interaction">Dernier échange · {person.last.toLowerCase()}</p><section className="owner-narrative"><h2>Ce qui se passe</h2><p>{person.context}</p>{done.includes(person.id as DecisionId) && <p className="owner-inline-notice">{person.id === "sarah" ? `Le créneau ${slot.toLowerCase()} est approuvé.` : "Votre réponse a été validée."}</p>}</section><section className="owner-narrative"><h2>La relation</h2><dl className="owner-facts"><div><dt>Premier contact</dt><dd>{person.first}</dd></div><div><dt>Dernière conversation</dt><dd>{person.last}</dd></div><div><dt>Prochain pas</dt><dd>{relationshipNext(person.id)}</dd></div></dl></section><section className="owner-narrative"><h2>Votre Collaborator</h2><p>{takeovers.includes(person.id) ? "Vous avez repris la main. Je garde le contexte sans poursuivre cette conversation." : person.handling}</p><div className="owner-inline-actions"><button className="button button-primary" onClick={() => openTalk(`Préparez-moi pour mon échange avec ${person.name}.`)}>Parler de {person.name}<Icon name="message" /></button><button className="button button-outline" onClick={() => { setView("conversation"); setNotice(""); }}>Voir la conversation<Icon name="arrow" /></button></div></section>
      </div> : section === "people" && view === "conversation" ? <div className="owner-focused">
        {back(person.name, () => { setView("person"); setNotice(""); })}<div className="owner-page-title"><h1 ref={heading} tabIndex={-1}>{person.name}</h1><p>{person.channel} <span className="demo-label">Démo</span></p></div><div className="owner-conversation-control"><span>{takeovers.includes(person.id) ? "Vous avez la main." : "Je m’occupe de cet échange."}</span><button className="button button-outline button-small" onClick={() => { setTakeovers(previous => previous.includes(person.id) ? previous.filter(id => id !== person.id) : [...previous, person.id]); setNotice(takeovers.includes(person.id) ? "Le Collaborator reprend la conversation selon son autorité." : "Vous avez la main. Le Collaborator ne répond plus dans cet échange."); }}>{takeovers.includes(person.id) ? "Laisser le Collaborator continuer" : "Prendre la main"}</button></div><div className="owner-conversation-thread">{person.messages.map((message, index) => <article className={`owner-thread-message ${message.author === "Collaborator" ? "from-collaborator" : ""}`} key={index}><span>{message.author}</span><p>{message.text}</p></article>)}{done.includes(person.id as DecisionId) && <article className="owner-thread-message from-collaborator"><span>Collaborator · après votre validation</span><p>{person.id === "sarah" ? `Le créneau ${slot.toLowerCase()} est approuvé.` : person.id === "acme" ? draft : answer}</p></article>}{(sentMessages[person.id] ?? []).map((text, index) => <article className="owner-thread-message from-owner" key={`owner-${index}`}><span>Patrick</span><p>{text}</p></article>)}</div>{takeovers.includes(person.id) && <form className="owner-form" onSubmit={sendOwnerReply}><label htmlFor="owner-reply">Votre réponse</label><textarea id="owner-reply" rows={3} value={ownerReply} maxLength={3000} onChange={event => setOwnerReply(event.target.value)} placeholder="Écrivez à la place du Collaborator…" /><button className="button button-primary" disabled={!ownerReply.trim()}>Ajouter la réponse<Icon name="send" /></button></form>}
      </div> : null}
      <div hidden={section !== "collaborator" || view === "setup"}><OwnerCollaborator identity={identity} onIdentityChange={setIdentity} authority={authority} onAuthorityChange={updateAuthority} paused={paused} onPauseChange={setPaused} onTalk={openTalk} onNotice={setNotice} pendingCount={pending.length} detail={collaboratorDetail} onDetailChange={setCollaboratorDetail} /></div>
    </main>
    <footer className="owner-footer"><Brand /><span>Il travaille pour vous. Il vous appartient.</span><span>Patrick Chassany</span></footer>
    <nav className="owner-mobile-nav" aria-label="Navigation mobile de l’app">{sections.map(item => <button key={item.id} aria-current={section === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><Icon name={item.icon} />{item.mobile}</button>)}</nav>
    <dialog ref={talkDialog} className="owner-talk-dialog" aria-label="Conversation avec votre Collaborator" onCancel={() => setTalkOpen(false)} onClose={() => setTalkOpen(false)}><div className="owner-talk-header"><div><strong>{identity}</strong><span className="owner-status"><span className="owner-status-dot" />{status} <span className="demo-label">Démo</span></span></div><button className="icon-button" aria-label="Fermer la conversation" onClick={() => setTalkOpen(false)}><Icon name="close" /></button></div><div ref={talkLog} className="owner-talk-log" aria-live="polite" aria-relevant="additions"><p className="owner-talk-greeting">Qu’aimeriez-vous me confier ?</p>{chat.map((message, index) => <article className={`owner-talk-message ${message.role === "owner" ? "from-owner" : ""}`} key={index}><span>{message.role === "owner" ? "Vous" : "Collaborator"}</span><p>{message.text}</p></article>)}{thinking && <p className="owner-supporting" role="status">Je reprends le contexte…</p>}</div><div className="owner-talk-prompts">{["Que se passe-t-il avec Acme ?", "Qui a besoin de moi ?", "Préparez mon rendez-vous avec Sarah."].map(prompt => <button key={prompt} onClick={() => { setTalkPrompt(prompt); talkInput.current?.focus(); }}>{prompt}</button>)}</div><form className="owner-talk-composer" onSubmit={sendTalk}><label className="sr-only" htmlFor="collaborator-message">Votre message au Collaborator</label><input ref={talkInput} id="collaborator-message" autoComplete="off" maxLength={1000} value={talkPrompt} onChange={event => setTalkPrompt(event.target.value)} placeholder="Écrivez-moi…" /><button type="button" className="icon-button" aria-label="Parler à voix haute — fonctionnalité prévue" onClick={() => setVoiceNotice("La voix est prévue. Vous pouvez écrire votre demande ci-dessous.")}><Icon name="mic" /></button><button className="icon-button send-button" aria-label="Envoyer au Collaborator" disabled={!talkPrompt.trim() || thinking}><Icon name="send" /></button></form>{voiceNotice && <p className="owner-voice-notice" role="status">{voiceNotice}</p>}</dialog>
  </div>;
}

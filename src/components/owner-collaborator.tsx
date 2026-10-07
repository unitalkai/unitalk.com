"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { authorityZones, type AuthorityLevel, type initialAuthority } from "@/lib/owner-demo";
import { COLLABORATOR_OFFER, HOSTING_OPTIONS, INTELLIGENCE_OPTIONS } from "@/lib/collaborator-offer";

export type CollaboratorDetail = "overview" | "knowledge" | "history" | "capabilities" | "authority" | "connections" | "tools" | "infrastructure" | "memory" | "identity" | "public" | "account";
type Detail = CollaboratorDetail;
const detailTitles: Record<Exclude<Detail, "overview">, [string, string]> = {
  knowledge: ["Ce que je sais.", "Les sources de vos connaissances professionnelles."],
  history: ["Apportez votre histoire.", "Vous ne devriez pas repartir de zéro avec une nouvelle IA."],
  capabilities: ["Ce que je peux faire.", "Comprendre, préparer, agir. Vous demander quand il le faut."],
  authority: ["Vous décidez ce que je décide.", "Mon autonomie a des limites explicites."],
  connections: ["Là où je travaille.", "Vos canaux professionnels, avec vos permissions."],
  tools: ["Mes outils.", "Les services dont j’ai besoin pour avancer."],
  infrastructure: ["Ce qui me fait fonctionner.", "Votre Collaborator vous appartient, où qu’il travaille."],
  memory: ["Ce dont je me souviens.", "Ce que les échanges et le travail m’ont appris."],
  identity: ["Mon identité.", "Un Collaborator. Une identité, à travers les canaux."],
  public: ["Votre porte d’entrée.", "Votre Collaborator peut accueillir les personnes qui vous cherchent."],
  account: ["Votre compte.", "Les détails du service restent ici."],
};
const capabilities = [{ label: "Lire et comprendre", text: "Reprendre les échanges autorisés et retrouver ce qui compte." }, { label: "Répondre et suivre", text: "Préparer les réponses et maintenir le fil d’une relation." }, { label: "Organiser", text: "Trouver les créneaux utiles et confirmer selon mon autorité." }, { label: "Rechercher", text: "Rassembler le contexte utile à une décision ou à un échange." }, { label: "Agir", text: "Utiliser les outils autorisés pour faire avancer le travail." }, { label: "Vous demander", text: "Faire remonter une décision, une information manquante ou une exception." }];
const memoryDefaults = ["Patrick préfère les rendez-vous courts.", "Sarah évalue Unitalk pour son agence.", "Acme envisage un partenariat.", "Patrick veut être impliqué dans les discussions de prix."];
const permissionNames = ["Lire les échanges", "Lire le profil ou les événements", "Préparer les réponses", "Écrire ou créer des événements"];

export function OwnerCollaborator({ identity, onIdentityChange, authority, onAuthorityChange, paused, onPauseChange, onTalk, onNotice, pendingCount, detail, onDetailChange }: {
  identity: string; onIdentityChange: (name: string) => void; authority: typeof initialAuthority;
  onAuthorityChange: (id: string, level: AuthorityLevel) => void; paused: boolean; onPauseChange: (paused: boolean) => void;
  onTalk: (prompt?: string) => void; onNotice: (notice: string) => void; pendingCount: number;
  detail: Detail; onDetailChange: (detail: Detail) => void;
}) {
  const [sources, setSources] = useState([{ id: "profile", label: "Patrick Chassany", type: "Profil d’exemple" }, { id: "unitalk", label: "Unitalk · principes et offre", type: "Connaissances d’exemple" }]);
  const [addingSource, setAddingSource] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const [sourceType, setSourceType] = useState("Site web");
  const [sourceError, setSourceError] = useState("");
  const [memories, setMemories] = useState(memoryDefaults.map((text, index) => ({ id: `m${index}`, text })));
  const [editingMemory, setEditingMemory] = useState<string | null>(null);
  const [memoryText, setMemoryText] = useState("");
  const [memoryError, setMemoryError] = useState("");
  const [connections, setConnections] = useState<Record<string, boolean[]>>({});
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [permissions, setPermissions] = useState([true, true, true, false]);
  const [historyProvider, setHistoryProvider] = useState("ChatGPT");
  const [historyPreview, setHistoryPreview] = useState(false);
  const [tool, setTool] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [name, setName] = useState(identity);
  const [role, setRole] = useState("AI Collaborator professionnel");
  const [nameError, setNameError] = useState("");
  const [hosting, setHosting] = useState("unitalk");
  const [intelligence, setIntelligence] = useState("credits");
  const [billing, setBilling] = useState("monthly");
  const [copyNotice, setCopyNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const visited = useRef(false);
  const changedAuthority = useRef<string | null>(null);

  useEffect(() => {
    if (!changedAuthority.current) return;
    document.getElementById(`authority-${changedAuthority.current}`)?.focus({ preventScroll: true });
    changedAuthority.current = null;
  }, [authority]);

  function changeAuthority(id: string, level: AuthorityLevel) {
    changedAuthority.current = id;
    onAuthorityChange(id, level);
  }

  useEffect(() => {
    if (!visited.current) { visited.current = true; return; }
    if (heading.current?.closest("[hidden]")) return;
    heading.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" });
  }, [detail]);

  function open(next: Detail) { onDetailChange(next); onNotice(""); }
  function link(label: string, next: Detail) { return <button className="owner-text-action" onClick={() => open(next)}>{label}<Icon name="arrow" /></button>; }
  function addSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sourceName.trim()) { setSourceError("Indiquez le nom ou l’adresse de la source."); return; }
    if (sourceType === "Site web") { try { const url = new URL(sourceName); if (!["https:", "http:"].includes(url.protocol)) throw new Error(); } catch { setSourceError("Utilisez une adresse complète, par exemple https://votresite.com."); return; } }
    setSources(previous => [...previous, { id: crypto.randomUUID(), label: sourceName.trim(), type: `${sourceType} · référence locale, non analysée` }]);
    setSourceName(""); setAddingSource(false); setSourceError(""); onNotice("La référence est ajoutée à la liste.");
  }
  function saveMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!memoryText.trim()) { setMemoryError("Écrivez le souvenir corrigé ou utilisez Supprimer."); return; }
    setMemories(previous => previous.map(item => item.id === editingMemory ? { ...item, text: memoryText.trim() } : item)); setEditingMemory(null); setMemoryError(""); onNotice("Le souvenir a été corrigé.");
  }
  async function copyPublicUrl() {
    try { await navigator.clipboard.writeText("https://unitalk.com/@patrick-chassany"); setCopyNotice("Lien copié."); }
    catch { setCopyNotice("Copie indisponible. Vous pouvez sélectionner le lien affiché ci-dessus."); }
  }

  if (detail === "overview") return <>
    <div className="owner-collaborator-intro"><span className="owner-collaborator-avatar"><Icon name="message" width="38" height="38" /></span><div><h1 ref={heading} tabIndex={-1}>{identity}</h1><p>{paused ? "Je suis en pause." : "J’y travaille."}</p></div><button className="button button-primary" onClick={() => onTalk()}>Parlez-moi<Icon name="message" /></button></div>
    <section className="owner-definition"><h2>Qui je suis</h2><div><p>Le AI Collaborator professionnel de Patrick.</p><p>Je représente Patrick dans ses relations professionnelles. Je garde le contexte, fais avancer le travail et lui demande lorsque sa décision est nécessaire.</p>{link("Voir mon identité", "identity")}</div></section>
    <section className="owner-definition"><h2>Ce que je sais</h2><div><p>Patrick. Unitalk. Ses entreprises, son travail public et ses relations.</p>{link("Voir les connaissances", "knowledge")}</div></section>
    <section className="owner-definition"><h2>Ce que je peux faire</h2><div><p>Lire. Comprendre. Répondre. Organiser. Relancer. Rechercher. Agir. Vous demander.</p>{link("Voir mes capacités", "capabilities")}</div></section>
    <section className="owner-definition"><h2>Ce que je peux décider</h2><div><div className="owner-authority-summary">{authorityZones.map(zone => <div key={zone.id}><span lang="en">{zone.label}</span><p>{zone.description}</p></div>)}</div>{link("Définir mon autorité", "authority")}</div></section>
    <section className="owner-definition"><h2>Là où je travaille</h2><div><p>LinkedIn. Email. WhatsApp. Calendrier. Téléphone.</p>{link("Voir les connexions", "connections")}</div></section>
    <section className="owner-definition"><h2>Ce qui me fait fonctionner</h2><div><p>Une intelligence. Des outils. Des connecteurs MCP. Des Knowledge Bases. Ma mémoire.</p><div className="owner-secondary-actions">{link("Mon infrastructure", "infrastructure")}{link("Ma mémoire", "memory")}</div></div></section>
    <section className="owner-definition"><h2>Ma présence publique</h2><div><p>Votre porte d’entrée professionnelle.</p>{link("Voir ma présence publique", "public")}</div></section>
    <div className="owner-secondary-actions owner-bottom-links">{link("Compte et abonnement", "account")}<button className="owner-text-action" onClick={() => { onPauseChange(!paused); onNotice(paused ? "Le Collaborator reprend." : "Le Collaborator est en pause."); }}><Icon name={paused ? "play" : "pause"} />{paused ? "Reprendre mon activité" : "Mettre en pause"}</button></div>
  </>;

  return <div className="owner-collaborator-detail">
    <button className="owner-back" onClick={() => open("overview")}><Icon name="arrow" />Collaborator</button><div className="owner-page-title"><h1 ref={heading} tabIndex={-1}>{detailTitles[detail][0]}</h1><p>{detailTitles[detail][1]}</p></div>

    {detail === "knowledge" && <>
      <ul className="owner-source-list">{sources.map(item => <li key={item.id}><Icon name="link" /><span>{item.label}<small>{item.type}</small></span><button className="icon-button" aria-label={`Retirer la source ${item.label}`} onClick={() => { setSources(previous => previous.filter(source => source.id !== item.id)); onNotice("Source retirée de la liste."); }}><Icon name="trash" /></button></li>)}</ul>{!sources.length && <p className="owner-inline-notice">Aucune source dans la liste. Ajoutez une référence pour préparer vos connaissances.</p>}
      <button className="button button-primary" onClick={() => setAddingSource(!addingSource)} aria-expanded={addingSource}>Ajouter des connaissances<Icon name="plus" /></button>
      {addingSource && <form className="owner-form owner-inline-form" onSubmit={addSource} noValidate><label htmlFor="source-type">Type de source</label><select id="source-type" value={sourceType} onChange={event => { setSourceType(event.target.value); setSourceError(""); }}>{["Site web", "Document", "Fichier privé", "Base de données", "Knowledge Base"].map(item => <option key={item}>{item}</option>)}</select><label htmlFor="source-reference">{sourceType === "Site web" ? "Adresse du site" : "Nom de la référence"}</label><input id="source-reference" value={sourceName} onChange={event => { setSourceName(event.target.value); setSourceError(""); }} maxLength={500} placeholder={sourceType === "Site web" ? "https://votresite.com" : "Par exemple : présentation de l’entreprise"} aria-invalid={Boolean(sourceError)} />{sourceError && <p className="form-error" role="alert">{sourceError}</p>}<button className="button button-primary">Ajouter la référence<Icon name="plus" /></button></form>}
      <section className="owner-narrative"><h2>Vos conversations précédentes comptent.</h2><p>ChatGPT, Claude, OpenClaw : l’import de votre histoire est prévu.</p>{link("Apporter mon histoire IA", "history")}</section>
    </>}

    {detail === "history" && <><p className="owner-reading-lead">Vos échanges précédents peuvent apporter du contexte à votre Collaborator.</p><fieldset className="owner-slot-picker"><legend>Votre IA actuelle</legend>{["ChatGPT", "Claude", "OpenClaw"].map(provider => <label key={provider}><input type="radio" name="history-provider" checked={historyProvider === provider} onChange={() => { setHistoryProvider(provider); setHistoryPreview(false); }} />{provider}</label>)}</fieldset><button className="button button-primary" onClick={() => setHistoryPreview(true)}>Voir l’aperçu de migration<Icon name="arrow" /></button>{historyPreview && <section className="owner-narrative"><h2>Votre histoire {historyProvider}, avec vous.</h2><p>Le parcours prévu vous permettra de choisir un export, vérifier ce qu’il contient et décider quelles conversations votre Collaborator pourra apprendre.</p></section>}</>}

    {detail === "capabilities" && <><div className="owner-capability-list">{capabilities.map(item => <section key={item.label}><h2>{item.label}</h2><p>{item.text}</p><span className="demo-label">Capacité prévue</span></section>)}</div>{link("Décider de mes limites", "authority")}</>}

    {detail === "authority" && <><p className="owner-inline-notice">Une règle « NEVER DO IT » bloque l’action correspondante. Les décisions déjà en attente gardent votre validation explicite.</p>{authorityZones.map(zone => <section className={`owner-authority-zone zone-${zone.id}`} key={zone.id}><h2 lang="en">{zone.label}</h2><p>{zone.description}</p><div>{authority.filter(item => item.level === zone.id).map(item => <div className="owner-authority-rule" key={item.id}><span>{item.label}</span><label className="sr-only" htmlFor={`authority-${item.id}`}>Autorité pour {item.label}</label><select id={`authority-${item.id}`} value={item.level} onChange={event => changeAuthority(item.id, event.target.value as AuthorityLevel)}>{authorityZones.map(option => <option value={option.id} key={option.id}>{option.label}</option>)}</select></div>)}</div>{!authority.some(item => item.level === zone.id) && <p className="owner-supporting">Aucune capacité dans cette zone.</p>}</section>)}</>}

    {detail === "connections" && <><div className="owner-connection-list">{["LinkedIn", "Email", "Calendrier", "WhatsApp", "Téléphone"].map(channel => <button key={channel} onClick={() => { setSelectedConnection(channel); setPermissions(connections[channel] ?? [true, true, true, false]); }} aria-pressed={selectedConnection === channel}><Icon name="link" /><span>{channel}<small>{connections[channel] ? "Permissions préparées · non connecté" : "Connexion prévue"}</small></span><Icon name="chevron" /></button>)}</div>{selectedConnection && <form className="owner-form owner-inline-form" onSubmit={event => { event.preventDefault(); setConnections(previous => ({ ...previous, [selectedConnection]: permissions })); onNotice(`Permissions ${selectedConnection} enregistrées.`); }}><h2>{selectedConnection}</h2><p className="owner-supporting">Vous choisissez ce que je pourrai faire.</p><fieldset className="owner-permissions"><legend>Permissions envisagées</legend>{permissionNames.map((permission, index) => <label key={permission}><input type="checkbox" checked={permissions[index]} onChange={event => setPermissions(previous => previous.map((value, i) => i === index ? event.target.checked : value))} />{permission}</label>)}</fieldset><div className="owner-inline-actions"><button className="button button-primary">Enregistrer les choix<Icon name="check" /></button>{connections[selectedConnection] && <button type="button" className="button button-outline" onClick={() => { setConnections(previous => { const next = { ...previous }; delete next[selectedConnection]; return next; }); setPermissions([true, true, true, false]); onNotice(`Les choix ${selectedConnection} ont été retirés.`); }}>Retirer ces choix</button>}</div></form>}</>}

    {detail === "tools" && <><p className="owner-reading-lead">Recherche, navigateur, APIs, applications métier ou CRM : des outils au service du travail, accessibles via des connecteurs MCP autorisés.</p>{tools.length > 0 && <ul className="owner-source-list">{tools.map(item => <li key={item}><Icon name="link" /><span>{item}<small>Outil envisagé · non connecté</small></span><button className="icon-button" aria-label={`Retirer ${item}`} onClick={() => setTools(previous => previous.filter(value => value !== item))}><Icon name="trash" /></button></li>)}</ul>}<form className="owner-form" onSubmit={event => { event.preventDefault(); if (!tool.trim()) return; setTools(previous => [...new Set([...previous, tool.trim()])]); setTool(""); onNotice("Outil ajouté aux choix."); }}><label htmlFor="tool-name">Quel outil voulez-vous me donner ?</label><input id="tool-name" value={tool} maxLength={100} onChange={event => setTool(event.target.value)} placeholder="Par exemple : Twenty, recherche, navigateur…" /><button className="button button-primary" disabled={!tool.trim()}>Ajouter un outil envisagé<Icon name="plus" /></button></form></>}

    {detail === "memory" && <><p className="owner-supporting">Vous pouvez corriger ou retirer ces souvenirs.</p><div className="owner-memory-list">{memories.map(item => <section key={item.id}>{editingMemory === item.id ? <form className="owner-form" onSubmit={saveMemory}><label htmlFor="memory-correction">Corriger ce souvenir</label><textarea id="memory-correction" rows={3} maxLength={500} value={memoryText} onChange={event => { setMemoryText(event.target.value); setMemoryError(""); }} aria-invalid={Boolean(memoryError)} />{memoryError && <p className="form-error" role="alert">{memoryError}</p>}<div className="owner-inline-actions"><button className="button button-primary button-small">Enregistrer<Icon name="check" /></button><button type="button" className="button button-outline button-small" onClick={() => setEditingMemory(null)}>Annuler</button></div></form> : <><p>{item.text}</p><div><button className="owner-text-action" onClick={() => { setEditingMemory(item.id); setMemoryText(item.text); setMemoryError(""); }}>Corriger</button><button className="icon-button" aria-label={`Supprimer le souvenir : ${item.text}`} onClick={() => { setMemories(previous => previous.filter(memory => memory.id !== item.id)); onNotice("Ce souvenir a été retiré."); }}><Icon name="trash" /></button></div></>}</section>)}</div>{!memories.length && <div className="owner-all-clear"><div><h2>Vous avez fait place nette.</h2><p>Aucun souvenir conservé.</p></div></div>}<section className="owner-narrative"><h2>La mémoire n’est pas la connaissance.</h2><p>Mes connaissances viennent des sources que vous me donnez. Ma mémoire vient de ce que le travail et les échanges m’apprennent.</p>{link("Voir les connaissances", "knowledge")}</section></>}

    {detail === "identity" && <><form className="owner-form" onSubmit={event => { event.preventDefault(); if (!name.trim() || !role.trim()) { setNameError("Indiquez un nom et un rôle pour votre Collaborator."); return; } onIdentityChange(name.trim()); setNameError(""); onNotice("Identité mise à jour dans l’app pour cette session. La présence publique reste celle de Patrick."); }} noValidate><label htmlFor="identity-name">Nom</label><input id="identity-name" value={name} maxLength={80} onChange={event => { setName(event.target.value); setNameError(""); }} aria-invalid={Boolean(nameError && !name.trim())} /><label htmlFor="identity-role">Rôle</label><input id="identity-role" value={role} maxLength={120} onChange={event => { setRole(event.target.value); setNameError(""); }} aria-invalid={Boolean(nameError && !role.trim())} /><label htmlFor="identity-voice">Voix</label><select id="identity-voice" disabled><option>Voix du Collaborator · prévue</option></select>{nameError && <p className="form-error" role="alert">{nameError}</p>}<button className="button button-primary">Enregistrer l’identité de démo<Icon name="check" /></button></form><dl className="owner-facts owner-identity-facts"><div><dt>Présence publique</dt><dd><Link href="/@patrick-chassany">unitalk.com/@patrick-chassany</Link></dd></div><div><dt>Email</dt><dd>Non attribué · prévu</dd></div><div><dt>Téléphone</dt><dd>Non attribué · prévu</dd></div></dl>{link("Ouvrir ma présence publique", "public")}</>}

    {detail === "public" && <><div className="owner-public-link"><Icon name="message" width="36" height="36" /><p>unitalk.com/@patrick-chassany</p><div className="owner-inline-actions"><Link className="button button-primary" href="/@patrick-chassany">Ouvrir le profil public<Icon name="external" /></Link><button className="button button-outline" onClick={copyPublicUrl}>Copier le lien<Icon name="link" /></button></div>{copyNotice && <p className="owner-supporting" role="status">{copyNotice}</p>}</div><section className="owner-narrative"><h2>Là où les autres vous trouvent.</h2><p>Votre profil LinkedIn. Votre signature email. Votre site. Un QR code. La même porte d’entrée vers votre Collaborator.</p><p className="owner-supporting">Le lien court unitalk.com/@patrick ouvre la même présence publique.</p></section></>}

    {detail === "infrastructure" && <><div className="owner-form"><label htmlFor="owner-hosting">Où je travaille</label><select id="owner-hosting" value={hosting} onChange={event => setHosting(event.target.value)}>{HOSTING_OPTIONS.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select><label htmlFor="owner-intelligence">Ce qui me donne mon intelligence</label><select id="owner-intelligence" value={intelligence} onChange={event => setIntelligence(event.target.value)}>{INTELLIGENCE_OPTIONS.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select><p className="owner-supporting">L’usage de l’IA est séparé de l’abonnement.</p><button className="button button-primary" onClick={() => onNotice("Préférences conservées.")}>Conserver ces préférences<Icon name="check" /></button></div><section className="owner-narrative"><h2>Des outils, pas une console technique.</h2><p>Les connecteurs MCP et les Knowledge Bases servent votre Collaborator. Vous pouvez les explorer quand vous en avez besoin.</p><div className="owner-secondary-actions">{link("Mes outils et connecteurs MCP", "tools")}{link("Mes connaissances", "knowledge")}{link("Ma mémoire", "memory")}</div></section><section className="owner-narrative"><h2>Portabilité</h2><p>Hermes est le moteur open source envisagé pour l’exécution autonome. Son intégration et les sauvegardes de production restent prévues.</p>{link("Compte, export et abonnement", "account")}</section></>}

    {detail === "account" && <><section className="owner-narrative"><h2>Patrick Chassany</h2><p>Rôle propriétaire simulé. Cette sélection de démo ne vaut pas authentification.</p></section><section className="owner-narrative"><h2>Votre abonnement</h2><p>{billing === "annual" ? `${COLLABORATOR_OFFER.annual} / an` : `${COLLABORATOR_OFFER.monthly} / mois`} · offre prévue</p><fieldset className="owner-slot-picker"><legend>Préférence de facturation</legend><label><input type="radio" name="owner-billing" checked={billing === "monthly"} onChange={() => setBilling("monthly")} />Mensuel</label><label><input type="radio" name="owner-billing" checked={billing === "annual"} onChange={() => setBilling("annual")} />Annuel · 2 mois offerts</label></fieldset><p className="owner-supporting">Aucun abonnement souscrit, aucun paiement effectué. Usage IA séparé.</p></section><section className="owner-narrative"><h2>Votre contrôle</h2><p>{pendingCount} situation{pendingCount > 1 ? "s" : ""} en attente. Vos décisions et règles restent dans cette page jusqu’à son rechargement.</p><button className="button button-outline" onClick={() => { const blob = new Blob([JSON.stringify({ demo: true, identity, authority, memories, sources, tools, connections, hosting, intelligence, billing }, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "unitalk-demo-preferences.json"; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); onNotice("Les préférences de cette démo ont été exportées. Ce fichier n’est pas une sauvegarde d’un Collaborator réel."); }}>Exporter les préférences de démo<Icon name="external" /></button></section><details className="owner-secondary-disclosure"><summary>Sécurité, sauvegardes et configuration avancée<Icon name="plus" /></summary><p>L’authentification, les clés API, les sauvegardes durables, les journaux d’audit et la configuration développeur seront accessibles ici lorsque les services seront intégrés. Aucun de ces services n’est actif dans la démo.</p></details><div className="owner-secondary-actions">{link("Hébergement et intelligence", "infrastructure")}<Link className="owner-text-action" href="/">Quitter la démo<Icon name="arrow" /></Link></div></>}
  </div>;
}

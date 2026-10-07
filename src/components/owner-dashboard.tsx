"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

const tabs = [{ id: "you", label: "Vous" }, { id: "me", label: "Votre Collaborateur" }, { id: "people", label: "Relations" }, { id: "collaborator", label: "Connaissances & capacités" }] as const;
type Tab = (typeof tabs)[number]["id"];
const decisions = [
  { id: "proposal", title: "Valider la proposition Acme", detail: "Proposition préparée", contact: "Jean Dupont · Acme", subject: "Une proposition prête à relire.", draft: "Bonjour Jean,\n\nVoici la proposition que nous avons préparée suite à notre échange. Elle reprend les objectifs discutés, le périmètre de la mission et les prochaines étapes.\n\nPatrick", action: "Valider la proposition" },
  { id: "meeting", title: "Choisir le créneau de Sarah", detail: "Deux créneaux proposés", contact: "Sarah Martin · Prospect", subject: "Quel créneau vous convient ?", draft: "Sarah souhaite échanger avec Patrick. Deux créneaux ont été préparés dans cet exemple : mardi à 10 h ou jeudi à 14 h.\n\nChoisissez un créneau pour simuler la confirmation. Aucun rendez-vous ne sera créé.", action: "Confirmer le créneau" },
  { id: "investor", title: "Relire la réponse à l’investisseur", detail: "Brouillon prêt", contact: "David Cohen · Investisseur", subject: "Une réponse, avec votre dernier mot.", draft: "Bonjour David,\n\nMerci pour votre intérêt pour Unitalk. Nous souhaitons permettre à chacun de créer et de posséder son Collaborateur IA public. Je serais ravi de poursuivre la discussion.\n\nPatrick", action: "Valider le brouillon" },
];
const people = [{ name: "Jean Dupont", initials: "JD", role: "Client", status: "Proposition à valider", context: "Le Collaborateur a préparé une proposition. Patrick garde le dernier mot avant l’envoi." }, { name: "Sarah Martin", initials: "SM", role: "Prospect", status: "Rendez-vous à confirmer", context: "Deux créneaux ont été proposés dans cet exemple. Aucun calendrier réel n’est connecté." }, { name: "David Cohen", initials: "DC", role: "Investisseur", status: "Réponse à relire", context: "Un brouillon de réponse est disponible. Le Collaborateur attend une validation dans la démonstration." }];

export function OwnerDashboard() {
  const [tab, setTab] = useState<Tab>("you");
  const [selected, setSelected] = useState("proposal");
  const [done, setDone] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [slot, setSlot] = useState("Mardi · 10 h");
  const [person, setPerson] = useState(people[0]);
  const [completedReview, setCompletedReview] = useState<string | null>(null);
  const pending = decisions.filter(decision => !done.includes(decision.id));
  const current = pending.find(decision => decision.id === selected) ?? pending[0];
  const reviewed = decisions.find(decision => decision.id === completedReview);
  const personDecision = decisions[people.findIndex(item => item.name === person.name)];
  const personDone = done.includes(personDecision.id);

  function approve() {
    if (!current) return;
    setDone(previous => [...previous, current.id]);
    setNotice(`${current.title} : validé dans la démo${current.id === "meeting" ? ` (${slot})` : ""}. Aucun envoi ni rendez-vous réel.`);
  }

  return <main id="main-content" className="dashboard-main content-container">
    <div className="dashboard-identity"><span className="avatar">PC</span><div><strong>Votre Collaborateur IA</strong><span>Il prépare. Vous décidez.</span></div><Link className="text-link" href="/@patrick-chassany">Voir le profil public <Icon name="external" /></Link></div>
    <nav className="dashboard-tabs" aria-label="Sections du dashboard Patrick">{tabs.map(item => <button key={item.id} type="button" aria-current={tab === item.id ? "page" : undefined} onClick={() => { setTab(item.id); setNotice(""); }}>{item.label}{item.id === "you" && <span className="tab-count">{pending.length}</span>}</button>)}</nav>

    {tab === "you" && <section><div className="dashboard-heading"><h1>Bonjour Patrick.<br /><span>{pending.length ? `${pending.length} décision${pending.length > 1 ? "s" : ""} vous attend${pending.length > 1 ? "ent" : ""}.` : "Tout est relu."}</span></h1><p>Juste ce qui a besoin de vous.<br />Le reste est dans l’activité du Collaborateur.</p></div>{notice && <p className="action-notice" role="status"><Icon name="check" />{notice}</p>}{pending.length ? <div className="decision-workspace"><div className="decision-list"><h2>À vous de décider</h2>{pending.map((decision, index) => <button className={`decision-row${current?.id === decision.id ? " selected" : ""}`} key={decision.id} type="button" onClick={() => setSelected(decision.id)} aria-pressed={current?.id === decision.id}><span className="decision-index">{index + 1}</span><span><strong>{decision.title}</strong><span>{decision.detail}</span></span><Icon name="chevron" /></button>)}<p className="quiet-note">Exemples de décisions · aucune connexion externe.</p></div>{current && <section className="decision-detail" aria-labelledby="decision-title"><div className="detail-top"><span>{current.contact}</span><span className="demo-label">Brouillon démo</span></div><h2 id="decision-title">{current.subject}</h2><p className="draft-text">{current.draft}</p>{current.id === "meeting" && <fieldset className="slot-options"><legend>Choisir un créneau</legend>{["Mardi · 10 h", "Jeudi · 14 h"].map(value => <label key={value}><input type="radio" name="slot" value={value} checked={slot === value} onChange={() => setSlot(value)} />{value}</label>)}</fieldset>}<div className="detail-actions"><button className="button button-primary" onClick={approve}>{current.action}<Icon name="check" /></button><button className="button button-outline" onClick={() => setNotice("Décision conservée en attente. Vous pouvez la reprendre quand vous voulez.")}>Plus tard</button></div><p className="form-hint">La validation est locale à cette démonstration.</p></section>}</div> : <div className="empty-state"><Icon name="check" width="40" height="40" /><h2>Vous avez le dernier mot.<br />Et maintenant, du temps.</h2><p>Toutes les décisions d’exemple sont relues.</p><button className="button button-outline" onClick={() => { setDone([]); setNotice(""); }}>Recommencer la démo<Icon name="arrow" /></button></div>}</section>}

    {tab === "me" && <section>
      <div className="dashboard-heading"><h1>Le travail avance.<br /><span>Voici ce qui a été préparé.</span></h1><p>Un aperçu de l’activité.<br />Toutes les données ci-dessous sont simulées.</p></div>
      <div className="activity-totals"><div><strong>47</strong><span>conversations</span></div><div><strong>18</strong><span>suivis préparés</span></div><div><strong>6</strong><span>opportunités</span></div><div><strong>61</strong><span>contacts actualisés</span></div></div>
      <div className="activity-list"><h2>Dans cet exemple</h2>{[
        { title: "Une proposition pour Acme", detail: "Brouillon préparé · attend votre validation" },
        { title: "Un échange avec Sarah", detail: "Deux créneaux préparés · attend votre choix" },
        { title: "Une réponse pour David", detail: "Brouillon préparé · attend votre relecture" },
      ].map((item, index) => {
        const decision = decisions[index];
        const complete = done.includes(decision.id);
        return <button className="activity-row" key={item.title} onClick={() => {
          if (complete) setCompletedReview(decision.id);
          else { setTab("you"); setSelected(decision.id); }
        }}><span><strong>{item.title}</strong><span>{complete ? "Validé dans la démo · consulter le brouillon" : item.detail}</span></span><Icon name={complete ? "check" : "arrow"} /></button>;
      })}</div>
      {reviewed && done.includes(reviewed.id) && <section className="decision-detail completed-review" aria-labelledby="completed-title">
        <div className="detail-top"><span>{reviewed.contact}</span><span className="demo-label">Validé dans la démo</span></div>
        <h2 id="completed-title">{reviewed.subject}</h2><p className="draft-text">{reviewed.draft}</p>
        {reviewed.id === "meeting" && <p className="quiet-note">Créneau retenu : {slot}</p>}
        <p className="form-hint">Lecture seule · aucun envoi ni rendez-vous réel.</p>
        <button className="button button-outline" onClick={() => setCompletedReview(null)}>Fermer la relecture</button>
      </section>}
      <p className="quiet-note">Ces chiffres illustrent le dashboard. Ils ne représentent pas une activité réelle.</p>
    </section>}

    {tab === "people" && <section><div className="dashboard-heading"><h1>Des personnes.<br /><span>Pas juste des contacts.</span></h1><p>Le contexte d’une relation,<br />à retrouver sans tout réexpliquer.</p></div><div className="people-workspace"><div className="people-list">{people.map(item => <button key={item.name} className={`person-row${person.name === item.name ? " selected" : ""}`} onClick={() => setPerson(item)} aria-pressed={person.name === item.name}><span className="avatar avatar-neutral">{item.initials}</span><span><strong>{item.name}</strong><span>{item.role}</span></span><Icon name="chevron" /></button>)}</div><section className="person-detail"><span className="avatar avatar-large avatar-neutral">{person.initials}</span><h2>{person.name}</h2><p className="person-status">{personDone ? "Validé dans la démo" : person.status}</p><p>{personDone ? `${personDecision.title} : validation locale terminée. Aucun envoi ni rendez-vous réel.${personDecision.id === "meeting" ? ` Créneau retenu : ${slot}.` : ""}` : person.context}</p><span className="demo-label">Relation d’exemple</span></section></div></section>}

    {tab === "collaborator" && <section><div className="dashboard-heading"><h1>Ce qu’il sait.<br /><span>Ce qu’il peut faire.</span></h1><p>Connaissances, mémoire et permissions.<br />Chaque chose à sa place.</p></div><div className="capability-sections">{[{ title: "Connaissances", description: "Ce qu’il sait à partir de vos sources.", items: ["Le travail public de Patrick", "Ses entreprises", "Unitalk et ses principes"] }, { title: "Mémoire", description: "Ce qu’il retient des interactions.", items: ["Le contexte des conversations", "Les préférences exprimées", "Les décisions précédentes"] }, { title: "Capacités", description: "Les façons de travailler prévues.", items: ["Rechercher et préparer", "Rédiger et qualifier", "Suivre une conversation"] }, { title: "Permissions", description: "Vous gardez le contrôle.", items: ["Les brouillons restent à valider", "Aucun envoi dans cette démo", "Aucun outil externe connecté"] }].map(block => <section key={block.title}><h2>{block.title}</h2><p>{block.description}</p><ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div><div className="connection-summary"><Icon name="link" /><div><h2>Les connexions viendront ensuite.</h2><p>Email, calendrier, messagerie et téléphone : aucune intégration réelle dans cet aperçu.</p></div><span className="demo-label">Non connecté</span></div></section>}
  </main>;
}

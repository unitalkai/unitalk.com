"use client";

import Link from "next/link";
import { useState } from "react";
import { Conversation } from "./conversation";
import { CreateForm, parsePublicUrl } from "./create-form";
import { Icon } from "./icons";

export function VisitorDashboard({ initialUrl }: { initialUrl?: string }) {
  const validatedInitialUrl = initialUrl ? parsePublicUrl(initialUrl)?.toString() : undefined;
  const [tab, setTab] = useState<"conversations" | "create">(initialUrl ? "create" : "conversations");
  const [previewUrl, setPreviewUrl] = useState(validatedInitialUrl ?? "");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const hostname = previewUrl ? new URL(previewUrl).hostname.replace(/^www\./, "") : "";

  return <main id="main-content" className="dashboard-main visitor-main content-container">
    <nav className="dashboard-tabs" aria-label="Sections du dashboard visiteur">
      <button aria-current={tab === "conversations" ? "page" : undefined} onClick={() => setTab("conversations")}>Mes conversations <span className="tab-count">1</span></button>
      <button aria-current={tab === "create" ? "page" : undefined} onClick={() => setTab("create")}>Mon Collaborateur <Icon name="plus" /></button>
    </nav>
    <section hidden={tab !== "conversations"}>
      <div className="dashboard-heading"><h1>Bienvenue.<br /><span>La conversation continue.</span></h1><p>Votre espace, vos échanges.<br />Rencontrez un Collaborateur, puis créez le vôtre.</p></div>
      <div className="visitor-workspace">
        <aside className="visitor-conversations">
          <h2>Vos conversations</h2>
          <div className="visitor-contact"><span className="avatar">PC</span><div><strong>Le Collaborateur de Patrick</strong><span>Conversation de démonstration</span></div></div>
          <p>Un espace pour découvrir son travail et Unitalk.</p>
          <Link className="text-link" href="/@patrick-chassany">Voir le profil public <Icon name="external" /></Link>
          <div className="visitor-create-invite"><h3>Et votre Collaborateur ?</h3><p>Commencez avec votre URL.<br />Rencontrez ce qu’il pourrait devenir.</p><button className="button button-outline" onClick={() => setTab("create")}>Créer le mien <Icon name="plus" /></button></div>
        </aside>
        <Conversation light hidden={tab !== "conversations"} />
      </div>
    </section>
    <section hidden={tab !== "create"}>
      <div className="dashboard-heading"><h1>Votre Collaborateur.<br /><span>Il commence avec vous.</span></h1><p>Une URL publique pour commencer.<br />Un aperçu local pour se projeter.</p></div>
      <div className="create-workspace">
        <div className="create-explanation">
          <h2>Votre site est un début.</h2>
          <p>Le produit est conçu pour créer un Collaborateur à partir de vos informations publiques. Ce prototype vous permet d’en préparer l’identité.</p>
          <CreateForm compact onPreview={url => { setPreviewUrl(url); setSaved(false); }} />
          <div className="creation-truth"><span className="demo-label">Aperçu local</span><p>Aucune analyse du site, aucun modèle IA et aucune publication. Votre URL sert seulement à afficher cet aperçu.</p></div>
        </div>
        <section className={`collaborator-preview${previewUrl ? " preview-ready" : ""}`} aria-label="Aperçu de votre Collaborateur">
          {previewUrl ? <>
            <span className="avatar avatar-profile">{(name.trim() || hostname).slice(0, 2).toUpperCase()}</span>
            <h2>{name.trim() ? `Le Collaborateur de ${name.trim()}` : "Votre futur Collaborateur"}</h2>
            <p className="preview-source"><Icon name="link" />{hostname}</p>
            <label className="preview-name-label" htmlFor="owner-name">Votre nom</label>
            <input className="preview-name-input" id="owner-name" value={name} onChange={e => { setName(e.target.value); setSaved(false); }} maxLength={70} placeholder="Comment vous appelez-vous ?" />
            <p>Une identité à imaginer.<br />Ses connaissances restent à construire.</p>
            <button className="button button-primary" onClick={() => setSaved(true)} disabled={saved}>{saved ? "Aperçu confirmé" : "Confirmer cet aperçu"}<Icon name="check" /></button>
            <p className="form-hint" role="status">{saved ? "Confirmé dans cette page seulement. Aucun Collaborateur réel créé." : "Aperçu non publié · état local à cette page"}</p>
          </> : <><span className="preview-placeholder"><Icon name="message" width="64" height="64" /></span><h2>Bientôt,<br />ce sera le vôtre.</h2><p>Ajoutez votre URL pour commencer<br />l’aperçu de votre Collaborateur.</p></>}
        </section>
      </div>
    </section>
  </main>;
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Conversation } from "./conversation";
import { parsePublicUrl } from "./create-form";
import { MeetCollaborator } from "./meet-collaborator";
import { Icon } from "./icons";
import type { CollaboratorPreferences } from "@/lib/collaborator-offer";

export function VisitorDashboard({ initialUrl, startEncounter = false, preferences }: { initialUrl?: string; startEncounter?: boolean; preferences?: CollaboratorPreferences }) {
  const validatedInitialUrl = initialUrl ? parsePublicUrl(initialUrl)?.toString() : undefined;
  const [tab, setTab] = useState<"conversations" | "create">(initialUrl || startEncounter ? "create" : "conversations");

  return <main id="main-content" className="dashboard-main visitor-main content-container">
    <nav className="dashboard-tabs" aria-label="Sections du dashboard visiteur">
      <button aria-current={tab === "conversations" ? "page" : undefined} onClick={() => setTab("conversations")}>Mes conversations <span className="tab-count">1</span></button>
      <button aria-current={tab === "create" ? "page" : undefined} onClick={() => setTab("create")}>Mon Collaborateur <Icon name="plus" /></button>
    </nav>
    <section hidden={tab !== "conversations"}>
      <div className="dashboard-heading"><h1>Bienvenue.<br /><span>La conversation continue.</span></h1><p>Votre espace, vos échanges.<br />Rencontrez celui de Patrick, puis le vôtre.</p></div>
      <div className="visitor-workspace">
        <aside className="visitor-conversations"><h2>Vos conversations</h2><div className="visitor-contact"><span className="avatar">PC</span><div><strong>Le Collaborateur de Patrick</strong><span>Conversation de démonstration</span></div></div><p>Un espace pour découvrir son travail et Unitalk.</p><Link className="text-link" href="/@patrick-chassany">Voir le profil public <Icon name="external" /></Link></aside>
        <Conversation light hidden={tab !== "conversations"} />
      </div>
      <div className="visitor-create-invite"><h3>Et votre Collaborateur ?</h3><p>Une première rencontre.<br />Une mission que vous aimeriez lui confier.</p><button className="button button-outline" onClick={() => setTab("create")}>Rencontrer le mien <Icon name="arrow" /></button></div>
    </section>
    <section hidden={tab !== "create"}>
      <div className="dashboard-heading"><h1>Rencontrez<br /><span>votre Collaborateur.</span></h1><p>Ce que vous voulez lui confier<br />vient avant les réglages.</p></div>
      <MeetCollaborator initialUrl={validatedInitialUrl} preferences={preferences} onContinue={() => setTab("conversations")} />
    </section>
  </main>;
}

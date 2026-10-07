"use client";

import { useState } from "react";
import { Icon } from "./icons";
import "./public-door-preview.css";

export function PublicDoorPreview({ language = "en", ownerName }: { language?: "en" | "fr"; ownerName?: string }) {
  const [draftName, setDraftName] = useState("");
  const fr = language === "fr";
  const name = (ownerName ?? draftName).trim() || "your_name";
  const slug = name === "your_name" ? "your_name" : name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "your_name";

  return <div className="public-door-preview">
    <div className="public-door-preview-heading"><span className="public-door-preview-mark"><Icon name="message" width="24" height="24" /></span><div><strong>{fr ? "Votre Collaborateur" : "Your Collaborator"}</strong><span>{fr ? "Aperçu de votre présence publique" : "Your public presence preview"}</span></div></div>
    {ownerName === undefined && <div className="public-door-name"><label htmlFor="public-door-name">{fr ? "Essayez avec votre prénom" : "Try it with your first name"}</label><input id="public-door-name" value={draftName} maxLength={40} autoComplete="given-name" placeholder="your_name" onChange={event => setDraftName(event.target.value)} /></div>}
    <blockquote>{fr ? <>Bonjour. Je suis le Collaborateur de <span>{name}</span>.<br />Qu’est-ce qui vous amène ?</> : <>Hi. I’m <span>{name}</span>’s Collaborator.<br />What brings you here?</>}</blockquote>
    <div className="public-door-example-address"><Icon name="link" /><span>unitalk.com/@{slug}</span></div>
  </div>;
}

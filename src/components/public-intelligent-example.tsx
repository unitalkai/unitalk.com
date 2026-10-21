"use client";

import "@/lib/public-openui-devtools";
import { Renderer, type ActionEvent, type OpenUIError } from "@openuidev/react-lang";
import { Component, useCallback, useState, type ReactNode } from "react";
import { demoTools } from "open-intelligent-ui/src/lib/demo-data";
import { runLibraryAction } from "open-intelligent-ui/src/lib/actions";
import { webUrl } from "open-intelligent-ui/src/lib/components/style";
import { getIntelligentExample } from "@/lib/public-intelligent-catalog";
import type { PublicLanguage } from "@/lib/public-collaborator-language";
import { intelligentLibrary } from "./public-intelligent-library";
import "./public-intelligent-examples.css";

class ExampleBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function PublicIntelligentExample({ id, language, initialState, onStateChange, onPrompt }: {
  id: string; language: PublicLanguage; initialState?: Record<string, unknown>;
  onStateChange: (state: Record<string, unknown>) => void; onPrompt: (prompt: string) => void;
}) {
  const example = getIntelligentExample(id);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<OpenUIError[]>([]);
  const [attempt, setAttempt] = useState(0);
  const fr = language === "fr";
  const onError = useCallback((list: OpenUIError[]) => setErrors(list.filter(error => error.severity !== "warning")), []);
  const onAction = (event: ActionEvent) => {
    const copied = runLibraryAction(event);
    if (copied) { void copied.then(ok => setNotice(ok ? (fr ? "Copié." : "Copied.") : (fr ? "La copie a échoué. Réessayez." : "Copy failed. Try again."))); return; }
    if (event.type === "open_url") {
      const url = webUrl((event.params as { url?: unknown })?.url);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    if (event.type === "continue_conversation" && event.humanFriendlyMessage) {
      onPrompt(event.humanFriendlyMessage);
      setNotice(fr ? "Demande ajoutée au champ de conversation. Les exemples sont préécrits ; leur modification par une IA n’est pas connectée." : "Request added to the composer. Examples are prewritten; AI-generated changes are not connected.");
    }
  };
  if (!example) return <p role="status">{fr ? "Cet exemple n’est plus disponible. Choisissez-en un dans la galerie." : "This example is no longer available. Choose another from the gallery."}</p>;
  const retry = <div role="alert"><p>{fr ? "Impossible d’afficher cet exemple." : "This example could not be displayed."}</p><button type="button" className="presence-text-button" onClick={() => { setErrors([]); setAttempt(value => value + 1); }}>{fr ? "Réessayer" : "Try again"}</button></div>;
  return <section className="public-intelligent-example" aria-label={example.title} data-example-id={id}>
    <div className="public-example-source"><span>{fr ? "Exemple interactif" : "Interactive example"}</span><a href="https://github.com/thesysdev/open-intelligent-ui" target="_blank" rel="noopener noreferrer">Open Intelligent UI</a></div>
    <ExampleBoundary key={`${id}-${attempt}`} fallback={retry}>
      {errors.length > 0 && retry}
      <div className="public-example-render" lang="en" data-theme="light" hidden={errors.length > 0}>
        <Renderer response={example.code} library={intelligentLibrary} isStreaming={false} initialState={initialState} onStateUpdate={onStateChange} onAction={onAction} onError={onError} toolProvider={demoTools} publishObservability={false} />
      </div>
    </ExampleBoundary>
    {notice && <p className="public-example-notice" role="status">{notice}</p>}
  </section>;
}

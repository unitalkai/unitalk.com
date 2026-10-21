"use client";

import { useState } from "react";
import { intelligentExamples, intelligentGroups } from "@/lib/public-intelligent-catalog";
import type { PublicLanguage } from "@/lib/public-collaborator-language";
import { Icon } from "./icons";
import "./public-intelligent-examples.css";

export default function PublicIntelligentGallery({ language, disabled, onSelect }: { language: PublicLanguage; disabled: boolean; onSelect: (id: string, prompt: string) => void }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const fr = language === "fr";
  const matches = intelligentExamples.filter(example => (group === "all" || example.group === group) && `${example.title} ${example.prompt} ${example.note}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <div className="public-example-gallery">
    <p>{fr ? `${intelligentExamples.length} exemples à manipuler ici. Les contenus d’origine sont en anglais et utilisent des données d’exemple.` : `${intelligentExamples.length} examples to try here. Original content is in English and uses sample data.`}</p>
    <div className="public-gallery-filters">
      <label>{fr ? "Rechercher un exemple" : "Find an example"}<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={fr ? "Ex. : map, game, chart…" : "Map, game, chart…"} /></label>
      <label>{fr ? "Catégorie" : "Category"}<select value={group} onChange={event => setGroup(event.target.value)}><option value="all">{fr ? "Tous les exemples" : "All examples"}</option>{intelligentGroups.map(item => <option key={item.id} value={item.id}>{fr ? item.fr : item.title}</option>)}</select></label>
    </div>
    <p className="sr-only" role="status">{matches.length} {fr ? "résultats" : "results"}</p>
    <div className="public-gallery-list">
      {intelligentGroups.filter(item => group === "all" || item.id === group).map(item => {
        const examples = matches.filter(example => example.group === item.id);
        return examples.length > 0 && <section key={item.id} aria-labelledby={`gallery-${item.id}`}><h3 id={`gallery-${item.id}`}>{fr ? item.fr : item.title}<span>{examples.length}</span></h3>{examples.map(example => <button key={example.id} type="button" disabled={disabled} onClick={() => onSelect(example.id, example.prompt)} data-example-option={example.id}><span lang="en">{example.title}</span><Icon name="arrow" width={16} height={16} /></button>)}</section>;
      })}
      {matches.length === 0 && <p>{fr ? "Aucun exemple trouvé. Essayez un autre mot ou une autre catégorie." : "No examples found. Try another word or category."}</p>}
    </div>
  </div>;
}

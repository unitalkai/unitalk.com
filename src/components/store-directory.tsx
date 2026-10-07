"use client";

import { useState } from "react";
import { STORE_CATEGORIES, STORE_ENTRIES, type StoreCategory } from "@/lib/store-catalog";
import { Icon } from "./icons";

export function StoreDirectory({ language }: { language: "en" | "fr" }) {
  const [category, setCategory] = useState<StoreCategory>("all");
  const fr = language === "fr";
  const labels = fr ? { all: "Tout", apps: "Applications", tools: "Outils", skills: "Compétences", collaborators: "Collaborateurs" } : { all: "All", apps: "Apps", tools: "Tools", skills: "Skills", collaborators: "Collaborators" };
  const entries = STORE_ENTRIES.filter(item => category === "all" || category === item.category);
  return <section className="store-directory content-container" aria-label={fr ? "Catalogue" : "Directory"}><div className="store-filter" aria-label={fr ? "Filtrer par catégorie" : "Filter by category"}>{STORE_CATEGORIES.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{labels[value]}</button>)}</div><p className="store-results-count" role="status">{entries.length} {fr ? entries.length === 1 ? "ressource" : "ressources" : entries.length === 1 ? "resource" : "resources"}</p><div>{entries.map(item => <article className="store-entry" key={item.id}><span className="store-entry-category"><Icon name={item.category === "apps" ? "mic" : item.category === "tools" ? "link" : item.category === "skills" ? "check" : "message"} />{labels[item.category]}</span><div><h2>{item.title === "Collaborator distributions" && fr ? "Distributions de Collaborateurs" : item.title}</h2><p>{fr ? item.fr : item.en}</p><p className="store-entry-origin">{fr ? item.originFr : item.originEn}</p></div><a href={item.href} className="text-link" target="_blank" rel="noopener noreferrer">{fr ? "Voir le dépôt" : "View repository"}<Icon name="external" width="16" height="16" /><span className="sr-only">{fr ? "Ouvre un nouvel onglet" : "Opens a new tab"}</span></a></article>)}</div></section>;
}

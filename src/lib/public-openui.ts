import type { PublicLanguage } from "./public-collaborator-language";

export type PublicPresentation = "profile" | "knowledge" | "actions";

export function publicToolIntent(text: string): "meeting" | "message" | null {
  if (/book|meet|call|calendar|slot|rendez-vous|r[eé]serv|appel|cr[eé]neau|calendrier/i.test(text)) return "meeting";
  if (/message|send|write|[eé]crire|envoyer|transmettre|contact/i.test(text)) return "message";
  return null;
}

export function publicPresentation(text: string): PublicPresentation | undefined {
  if (publicToolIntent(text)) return undefined;
  if (/patrick|founder|fondateur|entrepreneur|profil/i.test(text)) return "profile";
  if (/unitalk|collaborat|knowledge|memory|connaissance|m[eé]moire/i.test(text)) return "knowledge";
  return "actions";
}

// Programs are composed only from trusted components. Every text argument is
// serialized as a string literal, including restored or visitor-authored text.
export function publicResponseProgram(text: string, presentation: PublicPresentation | undefined, language: PublicLanguage) {
  const fr = language === "fr";
  const quote = JSON.stringify;
  const blocks = [`Text(${quote(text)})`];
  if (presentation === "profile") blocks.push(`Profile(${quote(fr ? "Fondateur de Unitalk" : "Founder of Unitalk")}, ${quote(fr ? "Voir son profil LinkedIn" : "View his LinkedIn profile")})`);
  if (presentation === "knowledge") {
    blocks.push(`Card([Title(${quote(fr ? "Connaissances et mémoire" : "Knowledge and memory")}), Text(${quote(fr ? "Les connaissances sont ce que le Collaborateur sait. La mémoire est ce qu’il retient des échanges et du travail." : "Knowledge is what the Collaborator knows. Memory is what it remembers from conversations and work.")})])`);
  }
  if (presentation) {
    const meeting = fr ? "Prendre rendez-vous" : "Book a call";
    const message = fr ? "Écrire à Patrick" : "Message Patrick";
    blocks.push(`Row([Button(${quote(meeting)}, @ToAssistant(${quote(meeting)})), Button(${quote(message)}, @ToAssistant(${quote(message)}))])`);
  }
  return `root = Col([${blocks.join(", ")}])`;
}

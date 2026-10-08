import { COLLABORATOR_OFFER } from "./collaborator-offer";
import { localizedOffer } from "./marketing-language";
import type { PublicLanguage } from "./public-collaborator-language";

export const PATRICK_LINKEDIN = "https://www.linkedin.com/in/patrickchassany/";

export type PublicMessage = { id: number; role: "collaborator" | "visitor"; text: string; kind?: "selection" };
export type MeetingStage = "idle" | "reason" | "context" | "time" | "details" | "confirmed";
export type Meeting = { reason: string; context: string; slot: string; name: string; email: string };
export const emptyMeeting: Meeting = { reason: "", context: "", slot: "", name: "", email: "" };
export const startingPoints = ["Work with Patrick", "Ask a question", "Talk about Unitalk", "Something else"];
export const meetingTopics = ["Unitalk", "Partnership", "Advisory", "Investment", "Something else"];
export const publicTopics = ["AI Collaborators", "Entrepreneurship", "Unitalk", "Internet", "Open source", "Building companies", "Investing"];

export function publicDemoReply(text: string, language: PublicLanguage = "en") {
  const query = text.toLowerCase();
  if (language === "fr") {
    if (/rendez-vous|r[eé]serv|appel|cr[eé]neau|calendrier/.test(query)) return "Vous pouvez choisir un créneau dans le calendrier Calendly de Patrick. Connectez-vous avec LinkedIn pour continuer ci-dessous.";
    if (/message|[eé]crire|envoyer|transmettre|contact/.test(query)) return "Connectez-vous avec LinkedIn pour écrire un message à Patrick. Vos informations de compte accompagneront votre message.";
    if (/prix|price|pricing|co[uû]t|€|tarif/.test(query)) { const offer = localizedOffer("fr"); return `L’abonnement Collaborateur prévu est de ${offer.monthly} par mois ou ${offer.annual} par an. ${offer.monthlyTokens} Vous pouvez aussi utiliser vos propres clés API ou votre passerelle IA ; les frais des fournisseurs externes restent séparés.`; }
    if (/linkedin|github|twitter|site|r[eé]seau|social|lien|profil/.test(query)) return `Vous trouverez Patrick sur LinkedIn : ${PATRICK_LINKEDIN} Vous pouvez aussi préparer un message ou une présentation ici.`;
    if (/personnel|opinion|confidentiel|priv[eé]|envoy|transmet|contact|joindre/.test(query)) return "Je peux vous aider à formuler votre demande. Pour avoir le point de vue personnel de Patrick, nous pouvons préparer un message avec le contexte de cette conversation.";
    if (/absent|disponib|occup[eé]|en ligne/.test(query)) return "Je n’ai pas accès à la disponibilité de Patrick en temps réel. Nous pouvons préciser votre demande, explorer son travail ou préparer un rendez-vous ensemble.";
    if (/agence/.test(query)) return "Vous explorez Unitalk pour votre agence. Un Collaborateur IA est conçu pour comprendre vos relations professionnelles, réaliser le travail confié et vous solliciter lorsqu’une décision personnelle compte. Que souhaiteriez-vous lui déléguer ?";
    if (/partenari|partnership|partner/.test(query)) return "Vous souhaitez discuter d’un partenariat. Quelle est votre idée et comment voudriez-vous que Patrick y participe ? Nous pouvons explorer le sujet, préparer un rendez-vous ou formuler votre demande.";
    if (/conseil|advisory|travailler|conf[eé]rence|invit|invest/.test(query)) return "Commençons par ce que vous avez en tête. Que construisez-vous et comment souhaiteriez-vous impliquer Patrick ? Je peux vous aider à préparer une présentation ou un rendez-vous.";
    if (/fotolia|amen|patrick|fondateur|entrepreneur|entreprise|internet/.test(query)) return "Patrick est le fondateur de Unitalk. Il construit des Collaborateurs IA qui vous appartiennent. Que souhaitez-vous savoir sur Unitalk ?";
    if (/open source|hermes|propri[eé]t|h[eé]bergement/.test(query)) return "Le modèle prévu par Unitalk est un Collaborateur IA qui vous appartient : son identité, ses connaissances, sa mémoire, ses compétences, ses outils et son autorité. Hermes est le moteur open source prévu. Vous choisissez son hébergement et son intelligence.";
    if (/unitalk|collaborat|expliq/.test(query)) return "Unitalk construit des Collaborateurs IA qui vous appartiennent. Ils sont conçus pour comprendre votre contexte, utiliser les outils autorisés, poursuivre le travail en cours et vous solliciter lorsque votre jugement compte. Les connaissances sont ce qu’ils savent ; la mémoire est ce qu’ils retiennent des échanges et du travail. Que souhaiteriez-vous confier au vôtre ?";
    if (/question/.test(query)) return "Bien sûr. Que souhaitez-vous savoir sur Patrick, Unitalk ou son travail ? Posez votre question librement.";
    return "Que souhaiteriez-vous que Patrick comprenne de votre demande ? Je peux vous aider à la préciser, préparer un rendez-vous ou rassembler le contexte pour lui.";
  }
  if (/book|meet|call|calendar|slot/.test(query)) return "You can choose a time in Patrick’s Calendly calendar. Sign in with LinkedIn to continue below.";
  if (/message|send|write|contact/.test(query)) return "Sign in with LinkedIn to write Patrick a message. Your account information will accompany your message.";
  if (/price|pricing|cost|€|tarif/.test(query)) return `The planned Collaborator subscription is ${COLLABORATOR_OFFER.monthly} per month or ${COLLABORATOR_OFFER.annual} per year. ${COLLABORATOR_OFFER.monthlyTokens} You can also use your own API keys or AI gateway; external provider fees stay separate.`;
  if (/linkedin|github|twitter|website|social|\bx\b/.test(query) && /link|find|where|url|profile/.test(query)) return `You can find Patrick on LinkedIn: ${PATRICK_LINKEDIN} You can also prepare a message or an introduction here.`;
  if (/personal|opinion|confidential|private|send|pass|forward|contact|reach/.test(query)) return "I can help you put the request into words. If you’d like Patrick’s personal view, I can prepare it for him with the context of our conversation.";
  if (/away|available|busy|online/.test(query)) return "I don’t have Patrick’s live availability. We can clarify your request, explore his work or prepare a meeting together.";
  if (/agency|agencies/.test(query)) return "You’re exploring Unitalk for your agency. An AI Collaborator is designed to understand professional relationships, handle entrusted work and involve its owner when a personal decision matters. What would you like it to take care of for your agency? We can explore that, prepare a meeting or put your request together for Patrick.";
  if (/partner|partnership/.test(query)) return "You’d like to discuss a partnership. What do you have in mind, and how would you like Patrick to be involved? We can explore the idea, prepare a meeting or put your request together for him.";
  if (/advisory|advice|work with|speaking|speak|invite|investment|investing/.test(query)) return "Let’s start with what you have in mind. What are you building, and where would you like Patrick’s involvement? I can help prepare the introduction or a meeting.";
  if (/fotolia|amen|patrick|founder|entrepreneur|building companies|internet/.test(query)) return "Patrick is the founder of Unitalk. He's building AI Collaborators you own. What would you like to know about Unitalk?";
  if (/open source|hermes|own|ownership/.test(query)) return "Unitalk’s intended model is an AI Collaborator you own: its identity, knowledge, memory, skills, tools and authority. Hermes is the planned open-source runtime. You choose where it runs and what powers it.";
  if (/unitalk|collaborator|explain/.test(query)) return "Unitalk is building AI Collaborators you own. A Collaborator is designed to understand your context, use authorised tools, carry ongoing work forward and bring you in when your judgment matters. Knowledge is what it knows; memory is what it remembers from interactions and work. What would you want your Collaborator to work on?";
  if (/question/.test(query)) return "Of course. What would you like to know about Patrick, Unitalk or his work? Ask in your own words.";
  return "What would you like Patrick to understand about your request? I can help clarify it, prepare a meeting or put the context together for him.";
}

export function exampleMeetingSlots(language: PublicLanguage = "en") {
  const start = new Date();
  const dates: Date[] = [];
  for (let offset = 1; dates.length < 3; offset++) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
    if (day.getDay() !== 0 && day.getDay() !== 6) dates.push(day);
  }
  return dates.map((date, index) => `${new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-GB", { weekday: "short", day: "numeric", month: "short" }).format(date)} · ${["10:00", "14:30", "11:00"][index]} ${language === "fr" ? "heure de Paris" : "Paris time"} · 30 min`);
}

export type PublicSession = { messages: PublicMessage[]; name: string };
export const PUBLIC_SESSION_KEY = "unitalk-patrick-public-demo-v1";

export function readPublicSession(): PublicSession | null {
  try {
    const data: unknown = JSON.parse(sessionStorage.getItem(PUBLIC_SESSION_KEY) ?? "null");
    if (!data || typeof data !== "object" || !("messages" in data) || !Array.isArray(data.messages) || !("name" in data) || typeof data.name !== "string") return null;
    const messages = data.messages.slice(-80).filter((message): message is PublicMessage => Boolean(message) && typeof message === "object" && typeof message.id === "number" && (message.role === "visitor" || message.role === "collaborator") && typeof message.text === "string" && message.text.length <= 4000);
    return messages.length ? { messages, name: data.name.slice(0, 100) } : null;
  } catch { return null; }
}

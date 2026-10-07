import { COLLABORATOR_OFFER } from "./collaborator-offer";

export type PublicMessage = { id: number; role: "collaborator" | "visitor"; text: string; kind?: "selection" };
export type MeetingStage = "idle" | "reason" | "context" | "time" | "details" | "confirmed";
export type Meeting = { reason: string; context: string; slot: string; name: string; email: string };
export const emptyMeeting: Meeting = { reason: "", context: "", slot: "", name: "", email: "" };
export const startingPoints = ["Work with Patrick", "Ask a question", "Talk about Unitalk", "Something else"];
export const meetingTopics = ["Unitalk", "Partnership", "Advisory", "Investment", "Something else"];
export const publicTopics = ["AI Collaborators", "Entrepreneurship", "Unitalk", "Internet", "Open source", "Building companies", "Investing"];

export function publicDemoReply(text: string) {
  const query = text.toLowerCase();
  if (/price|pricing|cost|€|tarif/.test(query)) return `The planned Collaborator subscription is ${COLLABORATOR_OFFER.monthly} per month or ${COLLABORATOR_OFFER.annual} per year. AI usage is separate. You can use Unitalk Credits, your API keys or your AI gateway.`;
  if (/linkedin|github|twitter|website|social|\bx\b/.test(query) && /link|find|where|url|profile/.test(query)) return "Patrick’s verified social links have not been added yet. You can continue the conversation here, or prepare a message for him.";
  if (/personal|opinion|confidential|private|send|pass|forward|contact|reach/.test(query)) return "I can help you put the request into words. If you’d like Patrick’s personal view, I can prepare it for him with the context of our conversation.";
  if (/away|available|busy|online/.test(query)) return "I don’t have Patrick’s live availability. We can clarify your request, explore his work or prepare a meeting together.";
  if (/agency|agencies/.test(query)) return "You’re exploring Unitalk for your agency. An AI Collaborator is designed to understand professional relationships, handle entrusted work and involve its owner when a personal decision matters. What would you like it to take care of for your agency? We can explore that, prepare a meeting or put your request together for Patrick.";
  if (/partner|partnership/.test(query)) return "You’d like to discuss a partnership. What do you have in mind, and how would you like Patrick to be involved? We can explore the idea, prepare a meeting or put your request together for him.";
  if (/advisory|advice|work with|speaking|speak|invite|investment|investing/.test(query)) return "Let’s start with what you have in mind. What are you building, and where would you like Patrick’s involvement? I can help prepare the introduction or a meeting.";
  if (/fotolia|amen|patrick|founder|entrepreneur|building companies|internet/.test(query)) return "Patrick Chassany is a founder, builder and investor with 37+ years building internet companies and products. His work spans Amen, internet infrastructure founded in 1998; Fotolia, which he co-founded and which was acquired by Adobe; and Unitalk today. What part of his work would you like to explore?";
  if (/open source|hermes|own|ownership/.test(query)) return "Unitalk’s intended model is an AI Collaborator you own: its identity, knowledge, memory, skills, tools and authority. Hermes is the planned open-source runtime. You choose where it runs and what powers it.";
  if (/unitalk|collaborator|explain/.test(query)) return "Unitalk is building AI Collaborators you own. A Collaborator is designed to understand your context, use authorised tools, carry ongoing work forward and bring you in when your judgment matters. Knowledge is what it knows; memory is what it remembers from interactions and work. What would you want your Collaborator to work on?";
  if (/question/.test(query)) return "Of course. What would you like to know about Patrick, Unitalk or his work? Ask in your own words.";
  return "What would you like Patrick to understand about your request? I can help clarify it, prepare a meeting or put the context together for him.";
}

export function exampleMeetingSlots() {
  const start = new Date();
  const dates: Date[] = [];
  for (let offset = 1; dates.length < 3; offset++) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
    if (day.getDay() !== 0 && day.getDay() !== 6) dates.push(day);
  }
  return dates.map((date, index) => `${new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" }).format(date)} · ${["10:00", "14:30", "11:00"][index]} Paris time · 30 min`);
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

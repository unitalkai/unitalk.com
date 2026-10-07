"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./icons";
import { COLLABORATOR_OFFER } from "@/lib/collaborator-offer";

type Message = { id: number; role: "collaborator" | "visitor"; text: string };
const prompts = ["Qu’est-ce que Unitalk ?", "Que sais-tu de Patrick ?", "Comment créer le mien ?"];

function demoReply(question: string) {
  const query = question.toLowerCase();
  if (/prix|combien|tarif/.test(query)) return `L’offre prévue est de ${COLLABORATOR_OFFER.monthly} par mois, résiliable à tout moment, ou ${COLLABORATOR_OFFER.annual} par an. Elle comprend un Collaborateur avec son identité, sa mémoire, ses connaissances, ses compétences, ses outils et ses permissions.`;
  if (/patrick|chassany|entreprise/.test(query)) return "Patrick Chassany est le fondateur de Unitalk. Son Collaborateur IA est destiné à représenter ses connaissances professionnelles publiques : son travail, ses entreprises et ses idées. Cet aperçu ne consulte pas ses données privées.";
  if (/créer|creer|url|mien|prix|combien/.test(query)) return "Commencez par « Rencontrer mon Collaborateur » : indiquez votre nom et une première mission. LinkedIn, email et WhatsApp sont les canaux de travail envisagés ; une URL publique peut fournir une source supplémentaire.";
  if (/unitalk|collaborateur|différence/.test(query)) return "Unitalk vous permet de rencontrer et de posséder un Collaborateur IA qui travaille pour vous. Il est conçu pour comprendre vos relations, organiser un CRM, préparer les suivis et agir selon vos permissions. Ses connaissances sont ce qu’il sait ; sa mémoire est ce qu’il retient.";
  return "Parlons de Patrick, de Unitalk ou de votre futur Collaborateur. Qu’aimeriez-vous découvrir ?";
}

export function Conversation({ light = false, compact = false, hidden = false }: { light?: boolean; compact?: boolean; hidden?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "collaborator", text: "Bonjour, je suis le Collaborateur IA de Patrick. Parlons de son travail ou de Unitalk." }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, pending]);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    setMessages(previous => [...previous, { id: Date.now(), role: "visitor", text }]);
    setInput("");
    setPending(true);
    timer.current = setTimeout(() => {
      setMessages(previous => [...previous, { id: Date.now() + 1, role: "collaborator", text: demoReply(text) }]);
      setPending(false);
    }, 550);
  }

  return <div hidden={hidden} className={`conversation${light ? " conversation-light" : ""}${compact ? " conversation-compact" : ""}`}>
    <div className="conversation-header"><span className="avatar">PC</span><div><strong>Le Collaborateur de Patrick</strong><span>Collaborateur IA public</span></div><span className="demo-label">Démo</span></div>
    <div className="conversation-log" ref={log} role="log" aria-label="Conversation avec le Collaborateur" aria-live="polite" aria-relevant="additions">{messages.map(message => <div key={message.id} className={`chat-message chat-message-${message.role}`}><span className="sr-only">{message.role === "visitor" ? "Vous : " : "Collaborateur : "}</span><p>{message.text}</p><span className="message-caption">{message.role === "visitor" ? "Vous" : "Collaborateur"}</span></div>)}{pending && <p className="chat-pending" role="status">Préparation de la réponse…</p>}</div>
    <div className="conversation-prompts" aria-label="Suggestions de questions">{prompts.map(prompt => <button key={prompt} type="button" onClick={() => setInput(prompt)} disabled={pending}>{prompt}</button>)}</div>
    <form className="chat-composer" onSubmit={send}><label className="sr-only" htmlFor={compact ? "message-compact" : "message"}>Votre message au Collaborateur</label><input id={compact ? "message-compact" : "message"} value={input} onChange={e => setInput(e.target.value)} maxLength={2000} placeholder="Écrivez au Collaborateur…" autoComplete="off" /><button className="icon-button send-button" type="submit" aria-label="Envoyer le message" disabled={!input.trim() || pending}><Icon name="send" /></button></form>
  </div>;
}

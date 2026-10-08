"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";
import { EncounterLink } from "./collaborator-offer-context";
import { PATRICK_LINKEDIN, PUBLIC_SESSION_KEY, publicDemoReply, readPublicSession, type PublicMessage, type PublicSession } from "@/lib/public-collaborator-demo";
import { publicText, type PublicLanguage } from "@/lib/public-collaborator-language";
import { PublicMeeting, PublicMessageForm, usePublicLinkedin } from "./public-linkedin-tools";
import "./public-collaborator.css";

const greeting: PublicMessage = { id: 0, role: "collaborator", text: "Hey, I'm Patrick's AI Collaborator. Ask me anything, book a call, or send him a message — I've got it." };

type VoiceRecognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void; abort: () => void;
};
type VoiceWindow = Window & { SpeechRecognition?: new () => VoiceRecognition; webkitSpeechRecognition?: new () => VoiceRecognition };

export function PublicCollaborator() {
  const searchParams = useSearchParams();
  const context = useMemo(() => {
    const name = (searchParams.get("name") ?? "").trim().slice(0, 70);
    const company = (searchParams.get("company") ?? "").trim().slice(0, 70);
    const topic = (searchParams.get("context") ?? "").trim().slice(0, 120);
    if (!name) return null;
    return { name, company, topic };
  }, [searchParams]);

  const [language, setLanguage] = useState<PublicLanguage>("en");
  const t = (text: string) => publicText(language, text);
  const linkedin = usePublicLinkedin();
  const [messages, setMessages] = useState<PublicMessage[]>(() => {
    if (!context) return [greeting];
    const intro = context.company
      ? `Hi ${context.name} from ${context.company}. ${context.topic ? `Let's talk about ${context.topic}.` : "What brings you here today?"}`
      : `Hi ${context.name}. ${context.topic ? `Let's talk about ${context.topic}.` : "What brings you here today?"}`;
    return [greeting, { id: 1, role: "collaborator", text: intro }];
  });
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState("");
  const [saved, setSaved] = useState<PublicSession | null>(null);
  const [visitorName, setVisitorName] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const composer = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognition = useRef<VoiceRecognition | null>(null);
  const sequence = useRef(1);


  useEffect(() => {
    const restore = setTimeout(() => setSaved(readPublicSession()), 0);
    return () => { clearTimeout(restore); if (timer.current) clearTimeout(timer.current); recognition.current?.abort(); };
  }, []);
  useEffect(() => {
    if (messages.length < 2) return;
    try { sessionStorage.setItem(PUBLIC_SESSION_KEY, JSON.stringify({ messages: messages.slice(-80), name: visitorName })); } catch { /* Tab storage is optional. */ }
  }, [messages, visitorName]);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, pending]);

  function restoreConversation() {
    if (!saved || messages.length !== 1) return;
    setMessages(saved.messages); setVisitorName(saved.name);
    sequence.current = Math.max(...saved.messages.map(m => m.id)) + 1;
    setSaved(null);
    requestAnimationFrame(() => composer.current?.focus());
  }

  function append(role: PublicMessage["role"], text: string) {
    setMessages(prev => [...prev, { id: sequence.current++, role, text }]);
  }

  function submitText(text: string) {
    if (!text.trim() || pending || text.length > 2000) return;
    restoreConversation();
    setInput(""); append("visitor", text.trim()); setPending(true);
    timer.current = setTimeout(() => {
      const reply = publicDemoReply(text.trim(), language);
      append("collaborator", reply); setPending(false); timer.current = null;

      // Keep the requested tool inline with this conversation.
      const lower = text.toLowerCase();
      if (/book|meet|call|rendez-vous|appel|créneau|calendrier/.test(lower)) {
        setShowCalendar(true); setShowMessageForm(false);
      } else if (/message|send|write|écrire|envoyer|transmettre|contact/.test(lower)) {
        setShowMessageForm(true); setShowCalendar(false);
      } else {
        setShowCalendar(false); setShowMessageForm(false);
      }
    }, 550);
  }

  function talk() {
    if (listening) { recognition.current?.abort(); setListening(false); return; }
    const browser = window as VoiceWindow;
    const Speech = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Speech) { setVoiceNotice(t("Voice input isn't supported in this browser. You can write your question instead.")); return; }
    const speech = new Speech(); recognition.current = speech;
    speech.lang = language === "fr" ? "fr-FR" : "en-GB"; speech.continuous = false; speech.interimResults = false;
    speech.onresult = event => {
      setInput(Array.from(event.results).map(r => r[0].transcript).join(" ").slice(0, 2000));
      setVoiceNotice(t("Your words are in the message box. Review them, then send.")); composer.current?.focus();
    };
    speech.onerror = event => { setListening(false); setVoiceNotice(t(event.error === "not-allowed" ? "Microphone access was not allowed. Enable it in your browser or write your question." : "Voice input stopped. Try again or write your question.")); };
    speech.onend = () => setListening(false);
    try { speech.start(); setListening(true); setVoiceNotice(t("Listening. Speak, then review your draft before sending.")); }
    catch { setListening(false); setVoiceNotice(t("Voice input couldn't start. Try again or write your question.")); }
  }

  function stopVoice() { recognition.current?.abort(); setListening(false); setVoiceNotice(""); }

  function changeLanguage(next: PublicLanguage) {
    recognition.current?.abort(); setListening(false); setVoiceNotice(""); setLanguage(next);
  }

  return <div className="public-presence" lang={language}>
    <header className="site-header public-header">
      <div className="header-inner">
        <span className="public-header-owner">
          <Image src="/images/patrick-chassany.jpg" width={36} height={36} alt="" className="public-header-avatar" />
          <span className="public-header-name">Patrick Chassany</span>
        </span>
        <div className="header-actions public-header-actions">
          <EncounterLink language={language} marketing className="button button-primary button-small">{language === "fr" ? "Commencer gratuitement" : "Start for free"} <Icon name="arrow" /></EncounterLink>
        </div>
      </div>
    </header>

    <main id="main-content">
      <section className="public-hero" aria-labelledby="public-title">
        <div className="public-hero-copy">
          <h1 id="public-title">{language === "fr" ? <>Le Collaborateur IA<br />de Patrick.</> : <>Patrick&apos;s<br />AI Collaborator.</>}</h1>
          <p className="public-hero-intro">{t("One conversation. Ask a question, book a call, or send a message — I'll handle it.")}</p>
          <p className="public-hero-signature">{t("Unitalk gives you a public AI Collaborator that works for you. It remembers your context, handles entrusted work and involves you when your judgment matters. One conversation. Ask a question, book a call, or send a message — I'll handle it.")}</p>
          <div className="public-hero-actions">
            <EncounterLink language={language} marketing className="button button-primary">{language === "fr" ? "Créer le vôtre" : "Create yours"} <Icon name="arrow" /></EncounterLink>
          </div>
        </div>

        <div className="public-workspace">
          {saved && messages.length === 1 && <div className="public-return"><p>{saved.name ? language === "fr" ? `Heureux de vous revoir, ${saved.name}.` : `Welcome back, ${saved.name}.` : t("Welcome back.")} {t("Your previous conversation is in this browser tab.")}</p><button type="button" className="presence-text-button" onClick={restoreConversation}>{t("Continue conversation")} <Icon name="arrow" /></button></div>}

          <div className="presence-log" ref={log} role="log" aria-label={t("Conversation with Patrick's AI Collaborator")} aria-live="polite" aria-relevant="additions">
            {messages.map(message => <div key={message.id} className={`presence-message presence-message-${message.role}`}><span className="sr-only">{t(message.role === "visitor" ? "You: " : "Patrick's AI Collaborator: ")}</span><p>{message.id === 0 ? t(greeting.text) : message.text}</p></div>)}
            {pending && <p className="presence-thinking" role="status"><span className="presence-dot" />{t("Preparing a reply…")}</p>}
          </div>

          {messages.length === 1 && !saved && <div className="presence-suggestions" aria-label={t("Suggested")}>
            {["What is Unitalk?", "I'd like to book a call", "Send a message to Patrick", "Why do you need an AI Collaborator?"].map(prompt => <button key={prompt} type="button" disabled={pending} onClick={() => submitText(t(prompt))}>{t(prompt)}<Icon name="arrow" width="16" height="16" /></button>)}
          </div>}

          <form className="presence-composer" onSubmit={event => { event.preventDefault(); submitText(input); }}>
            <label className="sr-only" htmlFor="public-message">{t("Type your message")}</label>
            <textarea id="public-message" ref={composer} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submitText(input); } }} maxLength={2000} rows={2} placeholder={t("Type anything — a question, a request, an idea…")} />
            <div>
              <button type="button" className={`icon-button${listening ? " is-listening" : ""}`} onClick={listening ? stopVoice : talk} aria-label={t(listening ? "Stop voice input" : "Use voice input")} aria-pressed={listening}><Icon name={listening ? "pause" : "mic"} /></button>
              <button type="submit" className="icon-button send-button" disabled={!input.trim() || pending} aria-label={t("Send")}><Icon name="arrow" /></button>
            </div>
          </form>
          {voiceNotice && <p className="presence-voice-notice" role="status">{voiceNotice}</p>}

          <PublicMeeting language={language} linkedin={linkedin} active={showCalendar} />
          <PublicMessageForm language={language} linkedin={linkedin} conversationContext={messages.filter(message => message.role === "visitor").map(message => message.text)} active={showMessageForm} />
        </div>
      </section>
    </main>

    <footer className="public-footer">
      <Link href={language === "fr" ? "/fr" : "/"} className="public-powered">{t("Powered by")} <span>Unitalk</span></Link>
      <div className="public-footer-controls">
        <a className="public-social-link" href={PATRICK_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={t("Patrick Chassany on LinkedIn")}><LinkedInMark /><span className="sr-only">{t("Opens a new tab")}</span></a>
        <div className="public-language-toggle">
          <button type="button" aria-pressed={language === "en"} onClick={() => changeLanguage("en")} lang="en">EN</button>
          <button type="button" aria-pressed={language === "fr"} onClick={() => changeLanguage("fr")} lang="fr">FR</button>
        </div>
      </div>
    </footer>
  </div>;
}

function LinkedInMark() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

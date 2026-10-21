"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Brain, Calculator, Compass, Drum, Gamepad2, MapPinned, TentTree, UtensilsCrossed } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";
import { EncounterLink } from "./collaborator-offer-context";
import { PATRICK_LINKEDIN, PUBLIC_SESSION_KEY, publicDemoReply, readPublicSession, type PublicMessage, type PublicSession } from "@/lib/public-collaborator-demo";
import { publicText, type PublicLanguage } from "@/lib/public-collaborator-language";
import { PublicMeeting, PublicMessageForm, usePublicLinkedin } from "./public-linkedin-tools";
import PublicOpenUIResponse from "./public-openui-response";
import { publicPresentation, publicToolIntent } from "@/lib/public-openui";
import { findIntelligentStarter, intelligentStarters } from "@/lib/public-intelligent-starters";
import { productNavigation } from "@/lib/product-navigation";
import "./public-collaborator.css";
import "./public-intelligent-examples.css";
import "./product-navigation.css";

const IntelligentExample = dynamic(() => import("./public-intelligent-example"), { ssr: false, loading: () => <p role="status">Loading OpenUI…</p> });
const IntelligentGallery = dynamic(() => import("./public-intelligent-gallery"), { loading: () => <p role="status">Loading OpenUI…</p> });
const starterIcons = { map: MapPinned, compass: Compass, tent: TentTree, meal: UtensilsCrossed, calculator: Calculator, game: Gamepad2, drum: Drum, brain: Brain };

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
  const [navigationOpen, setNavigationOpen] = useState(false);
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeExampleMessage, setActiveExampleMessage] = useState<number | null>(null);
  const [exampleNotice, setExampleNotice] = useState("");
  const composer = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognition = useRef<VoiceRecognition | null>(null);
  const sequence = useRef(context ? 2 : 1);
  const exampleRequest = useRef(0);
  const cancelExampleRequest = useCallback(() => { exampleRequest.current++; }, []);


  useEffect(() => {
    const restore = setTimeout(() => setSaved(readPublicSession()), 0);
    return () => { clearTimeout(restore); if (timer.current) clearTimeout(timer.current); recognition.current?.abort(); cancelExampleRequest(); };
  }, [cancelExampleRequest]);
  useEffect(() => {
    if (messages.length < 2) return;
    try { sessionStorage.setItem(PUBLIC_SESSION_KEY, JSON.stringify({ messages: messages.slice(-80), name: visitorName })); } catch { /* Tab storage is optional. */ }
  }, [messages, visitorName]);
  useEffect(() => {
    if (messages.length > 1) log.current?.lastElementChild?.scrollIntoView({ block: "nearest" });
  }, [messages.length, pending]);

  function restoreConversation() {
    if (!saved || messages.length !== 1) return;
    setMessages(saved.messages); setVisitorName(saved.name);
    sequence.current = Math.max(...saved.messages.map(m => m.id)) + 1;
    setSaved(null);
    setActiveExampleMessage(saved.messages.findLast(message => message.exampleId)?.id ?? null);
    const lastRequest = saved.messages.findLast(message => message.role === "visitor");
    const intent = publicToolIntent(lastRequest?.text ?? "");
    setShowCalendar(intent === "meeting"); setShowMessageForm(intent === "message");
    requestAnimationFrame(() => composer.current?.focus());
  }

  function append(role: PublicMessage["role"], text: string, presentation?: PublicMessage["presentation"], exampleId?: string) {
    const message: PublicMessage = { id: sequence.current++, role, text, presentation, language, exampleId };
    setMessages(prev => [...prev, message]);
    return message.id;
  }

  async function openExample(id: string, prompt: string) {
    if (pending) return;
    restoreConversation(); setPending(true); setInput(""); setExampleNotice("");
    const request = ++exampleRequest.current;
    try {
      const { getIntelligentExample } = await import("@/lib/public-intelligent-catalog");
      if (request !== exampleRequest.current) return;
      const example = getIntelligentExample(id);
      if (!example) throw new Error("Unknown example");
      append("visitor", prompt);
      const messageId = append("collaborator", example.title, undefined, id);
      setActiveExampleMessage(messageId); setGalleryOpen(false);
      setShowCalendar(false); setShowMessageForm(false);
    } catch {
      if (request === exampleRequest.current) setExampleNotice(language === "fr" ? "Impossible de charger l’exemple. Réessayez depuis les suggestions ou la galerie." : "Could not load the example. Try again from the starters or gallery.");
    } finally {
      if (request === exampleRequest.current) setPending(false);
    }
  }

  const saveExampleState = useCallback((id: number, state: Record<string, unknown>) => {
    const serialized = JSON.stringify(state);
    if (serialized.length >= 100000) return;
    setMessages(previous => {
      const message = previous.find(item => item.id === id);
      if (!message || JSON.stringify(message.uiState) === serialized) return previous;
      return previous.map(item => item.id === id ? { ...item, uiState: state } : item);
    });
  }, []);

  function draftExamplePrompt(prompt: string) {
    setInput(prompt.slice(0, 2000));
    requestAnimationFrame(() => { composer.current?.focus(); composer.current?.scrollIntoView({ block: "center" }); });
  }

  function submitText(text: string) {
    if (!text.trim() || pending || text.length > 2000) return;
    const starter = findIntelligentStarter(text);
    if (starter) { void openExample(starter.id, starter.prompt); return; }
    restoreConversation();
    setInput(""); append("visitor", text.trim()); setPending(true);
    timer.current = setTimeout(() => {
      const reply = publicDemoReply(text.trim(), language);
      append("collaborator", reply, publicPresentation(text)); setPending(false); timer.current = null;

      // Keep the requested tool inline with this conversation.
      const intent = publicToolIntent(text);
      setShowCalendar(intent === "meeting"); setShowMessageForm(intent === "message");
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

  function clearConversation() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null; stopVoice(); setPending(false);
    setMessages([greeting]); setInput(""); setSaved(null); setVisitorName("");
    setShowCalendar(false); setShowMessageForm(false); sequence.current = 1;
    exampleRequest.current++; setActiveExampleMessage(null); setGalleryOpen(false); setExampleNotice("");
    try { sessionStorage.removeItem(PUBLIC_SESSION_KEY); } catch { /* Tab storage is optional. */ }
    composer.current?.focus();
  }

  return <div className="public-presence public-intelligent" lang={language}>
    <header className="site-header public-header">
      <div className="header-inner product-header">
        <span className="public-header-owner">
          <Image src="/images/patrick-chassany.jpg" width={36} height={36} alt="" className="public-header-avatar" />
          <span className="public-header-name">Patrick Chassany</span>
        </span>
        <nav className="desktop-nav" aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>{productNavigation(language).map(link => <Link key={link.href} href={link.href} lang="en">{link.label}</Link>)}</nav>
        <div className="header-actions public-header-actions">
          {messages.length > 1 && <button type="button" className="public-new-chat" onClick={clearConversation} aria-label={language === "fr" ? "Nouvelle conversation" : "New conversation"} title={language === "fr" ? "Nouvelle conversation" : "New conversation"}><Icon name="plus" /></button>}
          <EncounterLink language={language} marketing className="button button-primary button-small">{language === "fr" ? "Écrivez ou parlez gratuitement" : "Chat or Talk for free"} <Icon name="arrow" /></EncounterLink>
          <button type="button" className="icon-button mobile-menu-toggle" aria-label={language === "fr" ? navigationOpen ? "Fermer la navigation" : "Ouvrir la navigation" : navigationOpen ? "Close navigation" : "Open navigation"} aria-expanded={navigationOpen} aria-controls="public-product-navigation" onClick={() => setNavigationOpen(value => !value)}><Icon name={navigationOpen ? "close" : "menu"} /></button>
        </div>
      </div>
      {navigationOpen && <nav id="public-product-navigation" className="mobile-navigation" aria-label={language === "fr" ? "Navigation mobile" : "Mobile navigation"}>{productNavigation(language).map(link => <Link key={link.href} href={link.href} lang="en" onClick={() => setNavigationOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}</nav>}
    </header>

    <main id="main-content">
      <section className={`public-conversation${messages.length > 1 ? " has-conversation" : ""}`} aria-labelledby="public-title">
        <div className="public-welcome">
          <Image src="/images/patrick-chassany.jpg" width={80} height={80} alt="Patrick Chassany" className="public-welcome-avatar" priority />
          <h1 id="public-title">{language === "fr" ? "Le Collaborateur IA de Patrick." : "Patrick’s AI Collaborator."}</h1>
          <p className="public-hero-intro">{t("One conversation. Ask a question, book a call, or send a message — I'll handle it.")}</p>
        </div>

        <div className="public-workspace">
          {saved && messages.length === 1 && <div className="public-return"><p>{saved.name ? language === "fr" ? `Heureux de vous revoir, ${saved.name}.` : `Welcome back, ${saved.name}.` : t("Welcome back.")} {t("Your previous conversation is in this browser tab.")}</p><button type="button" className="presence-text-button" onClick={restoreConversation}>{t("Continue conversation")} <Icon name="arrow" /></button></div>}

          <div className="presence-log" ref={log} role="log" aria-label={t("Conversation with Patrick's AI Collaborator")} aria-live="polite" aria-relevant="additions" hidden={messages.length === 1}>
            {messages.map(message => <div key={message.id} className={`presence-message presence-message-${message.role}`}><span className="sr-only">{t(message.role === "visitor" ? "You: " : "Patrick's AI Collaborator: ")}</span>{message.exampleId ? activeExampleMessage === message.id ? <IntelligentExample id={message.exampleId} language={language} initialState={message.uiState} onStateChange={state => saveExampleState(message.id, state)} onPrompt={draftExamplePrompt} /> : <button type="button" className="public-example-resume" onClick={() => setActiveExampleMessage(message.id)}><span>{message.text}</span><span>{language === "fr" ? "Ouvrir" : "Open"} <Icon name="arrow" /></span></button> : message.role === "visitor" || message.id === 0 ? <p>{message.id === 0 ? t(greeting.text) : message.text}</p> : <PublicOpenUIResponse text={message.text} presentation={message.presentation} language={message.language ?? language} onPrompt={submitText} disabled={pending} />}</div>)}
            {pending && <p className="presence-thinking" role="status"><span className="presence-dot" />{t("Preparing a reply…")}</p>}
          </div>


          <PublicMeeting language={language} linkedin={linkedin} active={showCalendar} />
          <PublicMessageForm language={language} linkedin={linkedin} conversationContext={messages.filter(message => message.role === "visitor").map(message => message.text)} active={showMessageForm} />

          <form className="presence-composer" onSubmit={event => { event.preventDefault(); submitText(input); }}>
            <label className="sr-only" htmlFor="public-message">{t("Type your message")}</label>
            <textarea id="public-message" ref={composer} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submitText(input); } }} maxLength={2000} rows={2} placeholder={t("Type anything — a question, a request, an idea…")} />
            <div>
              <button type="button" className={`icon-button${listening ? " is-listening" : ""}`} onClick={listening ? stopVoice : talk} aria-label={t(listening ? "Stop voice input" : "Use voice input")} aria-pressed={listening}><Icon name={listening ? "pause" : "mic"} /></button>
              <button type="submit" className="icon-button send-button" disabled={!input.trim() || pending} aria-label={t("Send")}><Icon name="arrow" /></button>
            </div>
          </form>
          {voiceNotice && <p className="presence-voice-notice" role="status">{voiceNotice}</p>}
          {exampleNotice && <p className="public-example-notice" role="alert">{exampleNotice}</p>}

          {messages.length === 1 && !saved && <div className="presence-suggestions" aria-label={t("Suggested")}>
            {intelligentStarters.map(starter => { const StarterIcon = starterIcons[starter.icon]; return <button key={starter.id} type="button" disabled={pending} onClick={() => void openExample(starter.id, starter.prompt)}><StarterIcon size={18} aria-hidden="true" /><span>{language === "fr" ? starter.fr : starter.label}</span><Icon name="arrow" width={16} height={16} /></button>; })}
          </div>}
          <details className="public-example-browser" open={galleryOpen} onToggle={event => setGalleryOpen(event.currentTarget.open)}>
            <summary>{language === "fr" ? "Explorer tous les exemples Intelligent UI" : "Explore all Intelligent UI examples"}<Icon name="arrow" /></summary>
            {galleryOpen && <IntelligentGallery language={language} disabled={pending} onSelect={(id, prompt) => void openExample(id, prompt)} />}
          </details>
          <div className="public-profile-shortcuts" aria-label={language === "fr" ? "Contacter Patrick" : "Connect with Patrick"}>
            <button type="button" disabled={pending} onClick={() => submitText(language === "fr" ? "Qui est Patrick ?" : "Who is Patrick?")}>{language === "fr" ? "Découvrir Patrick" : "Meet Patrick"}</button>
            <button type="button" disabled={pending} onClick={() => submitText(t("What is Unitalk?"))}>{t("What is Unitalk?")}</button>
            <button type="button" disabled={pending} onClick={() => submitText(t("I'd like to book a call"))}>{language === "fr" ? "Prendre rendez-vous" : "Book a call"}</button>
            <button type="button" disabled={pending} onClick={() => submitText(t("Send a message to Patrick"))}>{language === "fr" ? "Écrire à Patrick" : "Message Patrick"}</button>
          </div>
        </div>
        {messages.length === 1 && <details className="public-about"><summary>{language === "fr" ? "À propos de ce Collaborateur" : "About this Collaborator"}</summary><p>{t("Unitalk gives you a public AI Collaborator that works for you. It remembers your context, handles entrusted work and involves you when your judgment matters. One conversation. Ask a question, book a call, or send a message — I'll handle it.")}</p><EncounterLink language={language} marketing className="presence-text-button">{language === "fr" ? "Créer le vôtre" : "Create yours"}<Icon name="arrow" /></EncounterLink></details>}
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

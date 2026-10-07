"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Brand } from "./site-shell";
import { Icon } from "./icons";
import { emptyMeeting, exampleMeetingSlots, meetingTopics, PUBLIC_SESSION_KEY, publicDemoReply, publicTopics, readPublicSession, startingPoints, type Meeting, type MeetingStage, type PublicMessage, type PublicSession } from "@/lib/public-collaborator-demo";
import "./public-collaborator.css";

type VoiceRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};
type VoiceWindow = Window & { SpeechRecognition?: new () => VoiceRecognition; webkitSpeechRecognition?: new () => VoiceRecognition };
const greeting: PublicMessage = { id: 0, role: "collaborator", text: "Hi. I’m Patrick’s Collaborator.\nWhat brings you here?" };
const abilities = [
  ["Answer", "Questions about Patrick, Unitalk and his work."],
  ["Understand", "Why you are here and what you need."],
  ["Introduce", "Connect the right person with Patrick."],
  ["Book", "Find a suitable time and prepare the meeting."],
  ["Escalate", "Bring Patrick in when his personal input matters."],
];

export function PublicCollaborator() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<PublicMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [stage, setStage] = useState<MeetingStage>("idle");
  const [meeting, setMeeting] = useState<Meeting>(emptyMeeting);
  const [slots, setSlots] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState<"idle" | "review" | "prepared">("idle");
  const [listening, setListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState("");
  const [saved, setSaved] = useState<PublicSession | null>(null);
  const [visitorName, setVisitorName] = useState("");
  const [showWork, setShowWork] = useState(false);
  const [away, setAway] = useState(false);
  const conversation = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognition = useRef<VoiceRecognition | null>(null);
  const sequence = useRef(1);
  const opener = useRef<HTMLButtonElement | null>(null);
  const isBooking = stage !== "idle" && stage !== "confirmed";
  const lastRequest = [...messages].reverse().find(message => message.role === "visitor" && message.kind !== "selection")?.text;
  const handoffRequest = stage === "confirmed" ? `${meeting.reason}${meeting.context ? `\n${meeting.context}` : ""}` : lastRequest;

  useEffect(() => {
    const restore = setTimeout(() => setSaved(readPublicSession()), 0);
    return () => { clearTimeout(restore); if (timer.current) clearTimeout(timer.current); recognition.current?.abort(); };
  }, []);
  useEffect(() => {
    if (!open || messages.length < 2) return;
    try { sessionStorage.setItem(PUBLIC_SESSION_KEY, JSON.stringify({ messages: messages.slice(-80), name: visitorName })); } catch { /* Conversation remains usable when browser storage is unavailable. */ }
  }, [messages, open, visitorName]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, pending, stage, handoff]);
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      if (stage === "details") document.getElementById("public-meeting-name")?.focus({ preventScroll: true });
      else if (stage === "time") document.getElementById("public-meeting-times")?.focus({ preventScroll: true });
      else if (handoff === "review") document.getElementById("public-handoff-title")?.focus({ preventScroll: true });
      else composer.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, stage, handoff]);

  function append(role: PublicMessage["role"], text: string, kind?: PublicMessage["kind"]) {
    const message = { id: sequence.current++, role, text, ...(kind ? { kind } : {}) };
    setMessages(previous => [...previous, message]);
  }

  function reveal(button?: HTMLButtonElement, restore = true) {
    if (restore && !open && saved && messages.length === 1) {
      setMessages(saved.messages);
      sequence.current = Math.max(...saved.messages.map(message => message.id)) + 1;
      setVisitorName(saved.name);
    }
    if (button) opener.current = button;
    setOpen(true);
    requestAnimationFrame(() => conversation.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
  }

  function startConversation(button: HTMLButtonElement, fresh = false) {
    if (fresh) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null; recognition.current?.abort(); recognition.current = null;
      setPending(false); setListening(false); setInput(""); setError(""); setSlots([]); setShowWork(false);
      setMessages([greeting]); setSaved(null); setVisitorName(""); setStage("idle"); setMeeting(emptyMeeting); setHandoff("idle"); setVoiceNotice(""); sequence.current = 1;
      try { sessionStorage.removeItem(PUBLIC_SESSION_KEY); } catch { /* Storage is optional. */ }
    }
    reveal(button, !fresh);
  }

  function respond(text: string) {
    setPending(true);
    timer.current = setTimeout(() => {
      append("collaborator", publicDemoReply(text));
      setPending(false);
      if (/work|advisory|speak|agency|partner|unitalk|invest/i.test(text)) setShowWork(true);
    }, 550);
  }

  function submitText(text: string) {
    if (!text.trim() || pending || text.length > 2000) return;
    setInput(""); setError(""); append("visitor", text.trim());
    if (stage === "reason") {
      setMeeting(previous => ({ ...previous, reason: text.trim() }));
      append("collaborator", "Anything Patrick should know before the meeting?"); setStage("context");
    } else if (stage === "context") {
      setMeeting(previous => ({ ...previous, context: text.trim() })); offerTimes();
    } else respond(text.trim());
  }

  function send(event: FormEvent<HTMLFormElement>) { event.preventDefault(); submitText(input); }

  function startBooking(button?: HTMLButtonElement) {
    if (pending) return;
    reveal(button);
    if (isBooking) return;
    setHandoff("idle"); setMeeting(emptyMeeting); setError(""); setInput("");
    append("collaborator", "What would you like to discuss with Patrick?"); setStage("reason");
  }

  function offerTimes() {
    setSlots(exampleMeetingSlots());
    append("collaborator", "Let’s find a time. Which of these example slots would suit you?");
    setStage("time");
  }

  function selectTime(slot: string) {
    setMeeting(previous => ({ ...previous, slot })); append("visitor", slot, "selection");
    append("collaborator", "Who should Patrick expect? Add your name and email to finish the meeting preview."); setStage("details");
  }

  function confirmMeeting(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!meeting.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meeting.email.trim())) {
      setError("Add your name and a valid email address to complete the preview.");
      document.getElementById(!meeting.name.trim() ? "public-meeting-name" : "public-meeting-email")?.focus(); return;
    }
    setError(""); setVisitorName(meeting.name.trim());
    append("collaborator", `Meeting preview prepared, ${meeting.name.trim()}.\n${meeting.slot}\n\nYour discussion and context are included below.`);
    setStage("confirmed");
  }

  function closeConversation() {
    recognition.current?.abort(); setListening(false); setOpen(false);
    if (messages.length > 1) setSaved({ messages, name: visitorName });
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  }

  function talk(button?: HTMLButtonElement) {
    reveal(button);
    if (listening) { recognition.current?.abort(); setListening(false); return; }
    const browser = window as VoiceWindow;
    const Speech = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Speech) { setVoiceNotice("Voice input isn’t supported in this browser. You can write in the same conversation below."); return; }
    const speech = new Speech(); recognition.current = speech;
    speech.lang = "en-GB"; speech.continuous = false; speech.interimResults = false;
    speech.onresult = event => {
      setInput(Array.from(event.results).map(result => result[0].transcript).join(" ").slice(0, 2000));
      setVoiceNotice("Your words are in the message box. Review them, then send."); composer.current?.focus();
    };
    speech.onerror = event => { setListening(false); setVoiceNotice(event.error === "not-allowed" ? "Microphone access was not allowed. You can enable it in your browser or write your message." : "Voice input stopped. Try again or write your message below."); };
    speech.onend = () => setListening(false);
    try { speech.start(); setListening(true); setVoiceNotice("Listening through your browser. Speak, then review your message before sending."); }
    catch { setListening(false); setVoiceNotice("Voice input couldn’t start. Try again or write your message below."); }
  }

  function topic(text: string, button: HTMLButtonElement) {
    if (pending) return;
    reveal(button); setStage("idle"); setHandoff("idle"); setInput("");
    const request = `I’d like to talk about ${text}.`;
    append("visitor", request); respond(request);
  }

  return <div className="public-presence" lang="en">
    <main id="main-content">
      <section className="presence-hero presence-container" aria-labelledby="presence-title">
        <p className="presence-name">Patrick Chassany</p>
        <h1 id="presence-title">Here’s how to<br className="presence-desktop-break" /> interact with me.</h1>
        <div className={`presence-collaborator${open ? " is-open" : ""}`} ref={conversation}>
          <div className="presence-conversation-heading"><h2><span className="presence-dot" />Patrick’s Collaborator</h2>{open && <button type="button" className="presence-close" onClick={closeConversation} aria-label="Close conversation"><Icon name="close" /></button>}</div>
          {!open ? <>
            <blockquote className="presence-greeting">{saved ? <>{saved.name ? `Hi ${saved.name}.` : "Welcome back."} Good to see you again.<br /><span>Would you like to continue?</span></> : <>Hi. I’m Patrick’s Collaborator.<br />What can I help you with?</>}</blockquote>
            {saved && <p className="presence-return-context">Last time: {saved.messages.filter(message => message.role === "visitor").at(-1)?.text.slice(0, 180)}<span>Remembered in this browser tab only.</span></p>}
            <div className="presence-actions"><button type="button" className="button button-primary" onClick={event => startConversation(event.currentTarget)}>{saved ? "Continue conversation" : "Send a message"}<Icon name="arrow" /></button><button type="button" className="button button-outline" onClick={event => startBooking(event.currentTarget)}>Book a meeting</button></div>
            {saved && <button type="button" className="presence-text-button" onClick={event => startConversation(event.currentTarget, true)}>Something else</button>}
            <button type="button" className="presence-voice" onClick={event => talk(event.currentTarget)}>Talk instead <Icon name="mic" /></button>
            <p className="presence-availability"><span className="presence-dot" />Available <span className="presence-demo">Demo</span></p>
          </> : <>
            <div className="presence-log" ref={log} role="log" aria-label="Conversation with Patrick’s Collaborator" aria-live="polite" aria-relevant="additions">
              {messages.map(message => <div key={message.id} className={`presence-message presence-message-${message.role}`}><span className="sr-only">{message.role === "visitor" ? "You: " : "Patrick’s Collaborator: "}</span><p>{message.text}</p></div>)}
              {pending && <p className="presence-thinking" role="status"><span className="presence-dot" />Thinking</p>}
            </div>
            {stage === "idle" && messages.length === 1 && <div className="presence-suggestions" aria-label="Suggested starting points">{startingPoints.map(prompt => <button type="button" key={prompt} onClick={() => submitText(prompt)}>{prompt}</button>)}</div>}
            {stage === "reason" && <div className="presence-suggestions" aria-label="Meeting topics">{meetingTopics.map(prompt => <button type="button" key={prompt} onClick={() => submitText(prompt)}>{prompt}</button>)}</div>}
            {stage === "context" && <button type="button" className="presence-text-button" onClick={offerTimes}>Nothing to add — show example times <Icon name="arrow" /></button>}
            {stage === "time" && <fieldset className="presence-slots" id="public-meeting-times" tabIndex={-1}><legend>Example times · 30-minute meeting</legend>{slots.map(slot => <button type="button" key={slot} onClick={() => selectTime(slot)}>{slot}<Icon name="arrow" /></button>)}</fieldset>}
            {stage === "details" && <form className="presence-booking-form" onSubmit={confirmMeeting} noValidate><div><label htmlFor="public-meeting-name">Name</label><input id="public-meeting-name" autoComplete="name" maxLength={100} value={meeting.name} aria-invalid={Boolean(error && !meeting.name.trim())} aria-describedby={error ? "public-booking-error" : undefined} onChange={event => setMeeting(previous => ({ ...previous, name: event.target.value }))} required /></div><div><label htmlFor="public-meeting-email">Email</label><input id="public-meeting-email" type="email" autoComplete="email" maxLength={254} value={meeting.email} aria-invalid={Boolean(error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meeting.email.trim()))} aria-describedby={error ? "public-booking-error" : undefined} onChange={event => setMeeting(previous => ({ ...previous, email: event.target.value }))} required /></div>{error && <p id="public-booking-error" className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-primary">Prepare meeting <Icon name="check" /></button></form>}
            {stage === "confirmed" && <section className="presence-result" aria-label="Prepared meeting"><h3><Icon name="check" />Meeting preview <span className="presence-demo">Demo</span></h3><dl><div><dt>Who</dt><dd>{meeting.name} · {meeting.email}</dd></div><div><dt>Why</dt><dd>{meeting.reason}</dd></div>{meeting.context && <div><dt>Context</dt><dd>{meeting.context}</dd></div>}<div><dt>When</dt><dd>{meeting.slot}</dd></div></dl><details><summary>Conversation included</summary>{messages.filter(message => message.role === "visitor").map(message => <p key={message.id}>{message.text}</p>)}</details><button type="button" className="presence-text-button" onClick={() => setStage("idle")}>Continue the conversation <Icon name="arrow" /></button></section>}
            {handoff === "review" && <section className="presence-result" aria-labelledby="public-handoff-title"><h3 id="public-handoff-title" tabIndex={-1}>Prepare a message for Patrick <span className="presence-demo">Demo</span></h3><p>Your conversation and this request will be included:</p><blockquote>{handoffRequest}</blockquote><div className="presence-actions"><button type="button" className="button button-primary" onClick={() => { setHandoff("prepared"); append("collaborator", "Your message is prepared for Patrick, with the context of our conversation."); }}>Prepare handoff <Icon name="check" /></button><button type="button" className="presence-text-button" onClick={() => setHandoff("idle")}>Keep talking</button></div></section>}
            {(stage === "idle" || stage === "confirmed") && messages.length > 1 && handoff !== "review" && <div className="presence-next-actions" aria-label="Next useful actions"><button type="button" disabled={pending} onClick={() => submitText("Explain Unitalk")}>Explain Unitalk</button><button type="button" disabled={pending} onClick={() => startBooking()}>Book a meeting</button><button type="button" disabled={pending || !lastRequest} onClick={() => setHandoff("review")}>{handoff === "prepared" ? "Review another handoff" : "Prepare a message for Patrick"}</button></div>}
            {stage !== "time" && stage !== "details" && handoff !== "review" && <form className="presence-composer" onSubmit={send}><label className="sr-only" htmlFor="public-message">Write a message to Patrick’s Collaborator</label><textarea id="public-message" ref={composer} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submitText(input); } }} maxLength={2000} rows={2} placeholder="Write a message…" /><div><button type="button" className={`icon-button${listening ? " is-listening" : ""}`} onClick={() => talk()} aria-label={listening ? "Stop voice input" : "Use voice input"} aria-pressed={listening}><Icon name={listening ? "pause" : "mic"} /></button><button type="submit" className="icon-button send-button" disabled={!input.trim() || pending} aria-label="Send message"><Icon name="arrow" /></button></div></form>}
            {voiceNotice && <p className="presence-voice-notice" role="status">{voiceNotice}</p>}
            <div className="presence-session-bottom"><p className="presence-availability"><span className="presence-dot" />{listening ? "Listening" : pending ? "Thinking" : "Available"}<span className="presence-demo">Demo</span></p>{isBooking && <button type="button" className="presence-text-button" onClick={() => { setStage("idle"); setError(""); append("collaborator", "We can come back to the meeting. What else would you like to discuss?"); }}>Return to conversation</button>}<button type="button" className="presence-text-button" onClick={() => { if (timer.current) clearTimeout(timer.current); setPending(false); recognition.current?.abort(); setListening(false); startConversation(opener.current ?? document.activeElement as HTMLButtonElement, true); }}>Clear conversation</button></div>
          </>}
        </div>
      </section>

      <section className="presence-capabilities presence-container presence-section" aria-labelledby="presence-can"><h2 id="presence-can">I can</h2><dl>{abilities.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl></section>

      <section className="presence-person presence-container presence-section" aria-labelledby="presence-patrick"><h2 id="presence-patrick">Patrick Chassany</h2><p className="presence-person-title">Founder.<br />Builder.<br /><span>Investor.</span></p><div className="presence-person-copy"><p>Patrick has spent 37+ years building internet companies and products.</p><p className="presence-companies">Amen · Fotolia · Unitalk</p><button type="button" className="presence-text-button" disabled={pending} onClick={event => topic("Patrick’s work", event.currentTarget)}>More about Patrick <Icon name="arrow" /></button></div><dl className="presence-timeline"><div><dt>Amen</dt><dd><span>1998</span>Internet infrastructure.</dd></div><div><dt>Fotolia</dt><dd><span>Co-founder</span>Acquired by Adobe.</dd></div><div><dt>Unitalk</dt><dd><span>Today</span>AI Collaborators you own.</dd></div></dl></section>

      <section className="presence-topics presence-container presence-section" aria-labelledby="presence-topics-title"><h2 id="presence-topics-title">Talk to Patrick about</h2><div>{publicTopics.map(name => <button type="button" key={name} disabled={pending} onClick={event => topic(name, event.currentTarget)}>{name}<Icon name="arrow" width="28" height="28" /></button>)}</div></section>

      {showWork && <section className="presence-work presence-container presence-section" aria-labelledby="presence-work-title"><h2 id="presence-work-title">Work with Patrick</h2><div>{[["Advisory", "Discuss"], ["Speaking", "Invite Patrick"], ["Unitalk", "Discover Unitalk"]].map(([name, label]) => <div key={name}><h3>{name}</h3><button type="button" className="presence-text-button" disabled={pending} onClick={event => topic(name, event.currentTarget)}>{label}<Icon name="arrow" /></button></div>)}</div></section>}

      <section className="presence-away presence-container presence-section" aria-labelledby="presence-away-title"><h2 id="presence-away-title">Presence without<br />being present.</h2><button type="button" className="presence-text-button" aria-expanded={away} onClick={() => setAway(!away)}>{away ? "Close away preview" : "When Patrick is away"}<Icon name={away ? "close" : "plus"} /></button>{away && <div className="presence-away-preview"><p className="presence-availability"><span className="presence-dot" />Patrick is away <span className="presence-demo">Demo</span></p><blockquote>You don’t need to wait.<br /><span>I can answer questions, understand what you need and get Patrick involved when necessary.</span></blockquote><div className="presence-actions"><button type="button" className="button button-primary" onClick={event => startConversation(event.currentTarget)}>Send a message <Icon name="arrow" /></button><button type="button" className="button button-outline" onClick={event => startBooking(event.currentTarget)}>Book a meeting</button></div></div>}</section>

      <section className="presence-social presence-container" aria-label="Patrick’s social links"><h2>Patrick</h2><button type="button" className="presence-text-button" disabled={pending} onClick={event => topic("Patrick’s social links", event.currentTarget)}>Ask for Patrick’s links <Icon name="arrow" /></button></section>
    </main>
    <footer className="presence-footer"><Brand language="en" /></footer>
  </div>;
}

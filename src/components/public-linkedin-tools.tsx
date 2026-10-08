"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./icons";
import { publicText, type PublicLanguage } from "@/lib/public-collaborator-language";
import type { LinkedInMember } from "@/lib/public-linkedin";

export type PublicLinkedin = {
  loading: boolean; ready: boolean; member: LinkedInMember | null; calendarUrl?: string; messageDeliveryReady: boolean;
  busy: boolean; error: string; signIn: () => Promise<void>; signOut: () => Promise<void>; refresh: () => Promise<void>;
};

export function LinkedInMark() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

export function usePublicLinkedin(): PublicLinkedin {
  const [state, setState] = useState({ loading: true, ready: false, member: null as LinkedInMember | null, calendarUrl: undefined as string | undefined, messageDeliveryReady: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const popup = useRef<Window | null>(null);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  async function refresh() {
    try {
      const response = await fetch("/api/public/linkedin/session", { cache: "no-store" });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setState({ loading: false, ready: Boolean(data.ready), member: data.member, calendarUrl: data.calendarUrl, messageDeliveryReady: Boolean(data.messageDeliveryReady) });
      setError("");
    } catch { setState(previous => ({ ...previous, loading: false, member: null, calendarUrl: undefined })); setError("Sign-in status couldn’t load. Try again."); }
  }

  useEffect(() => {
    const controller = new AbortController();
fetch("/api/public/linkedin/session", { cache: "no-store", signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const data = await response.json();
      setState({ loading: false, ready: Boolean(data.ready), member: data.member, calendarUrl: data.calendarUrl, messageDeliveryReady: Boolean(data.messageDeliveryReady) });
    }).catch((reason: unknown) => { if (reason instanceof DOMException && reason.name === "AbortError") return; setState(previous => ({ ...previous, loading: false })); setError("Sign-in status couldn't load. Try again."); });
    return () => { controller.abort(); if (poll.current) clearInterval(poll.current); popup.current?.close(); };
  }, []);

  useEffect(() => {
    async function completed(event: MessageEvent) {
      if (event.origin !== window.location.origin || !popup.current || event.source !== popup.current || event.data?.type !== "unitalk-linkedin") return;
      if (poll.current) clearInterval(poll.current);
      popup.current = null; setBusy(false);
      if (event.data.result !== "success") { setError("LinkedIn sign-in couldn’t be completed. Try again."); return; }
      await refresh();
    }
    window.addEventListener("message", completed);
    function focused() { if (!popup.current) void refresh(); }
    window.addEventListener("focus", focused);
    return () => { window.removeEventListener("message", completed); window.removeEventListener("focus", focused); };
  }, []);

  async function signIn() {
    if (busy || !state.ready) return;
    setError("");
    const opened = window.open("about:blank", "unitalk-linkedin-sign-in", "popup,width=600,height=720");
    if (!opened) { setError("Allow popups to sign in with LinkedIn, then try again."); return; }
    opened.document.title = "LinkedIn sign-in";
    popup.current = opened; setBusy(true);
    try {
      const response = await fetch("/api/public/linkedin/start", { method: "POST" });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const url = new URL(data.url);
      if (url.origin !== "https://www.linkedin.com" || url.pathname !== "/oauth/v2/authorization") throw new Error();
      opened.location.href = url.href;
      const started = Date.now();
      poll.current = setInterval(() => {
        if (!opened.closed && Date.now() - started < 600000) return;
        if (poll.current) clearInterval(poll.current);
        if (popup.current === opened) { popup.current = null; setBusy(false); setError("LinkedIn sign-in couldn’t be completed. Try again."); opened.close(); }
      }, 700);
    } catch { opened.close(); popup.current = null; setBusy(false); setError("LinkedIn sign-in couldn’t be completed. Try again."); }
  }

  async function signOut() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/public/linkedin/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      setState(previous => ({ ...previous, member: null, calendarUrl: undefined }));
    } catch { setError("Sign-out couldn’t be completed. Try again."); }
    finally { setBusy(false); }
  }
  return { ...state, busy, error, signIn, signOut, refresh };
}

function LinkedInGate({ language, linkedin }: { language: PublicLanguage; linkedin: PublicLinkedin }) {
  const t = (text: string) => publicText(language, text);
  if (linkedin.member) return <div className="public-account"><div><Icon name="check" /><span>{t("Signed in with LinkedIn")}<strong>{linkedin.member.name}</strong></span></div><button type="button" className="presence-text-button" disabled={linkedin.busy} onClick={linkedin.signOut}>{t("Sign out")}</button>{linkedin.error && <p className="form-error" role="alert">{t(linkedin.error)}</p>}</div>;
  return <div className="public-linkedin-gate">
    <div className="public-linkedin-mark"><LinkedInMark /></div>
    <h3>{t("Continue with LinkedIn")}</h3>
    <p>{t("Sign in to continue using your LinkedIn account.")}</p>
    <button type="button" className="button button-primary" disabled={linkedin.loading || !linkedin.ready || linkedin.busy} onClick={linkedin.signIn}><LinkedInMark />{t(linkedin.loading ? "Checking sign-in…" : linkedin.busy ? "Opening LinkedIn…" : "Sign in with LinkedIn")}</button>
    {!linkedin.loading && !linkedin.ready && <p className="public-integration-note">{t("LinkedIn sign-in is being configured. Please check back soon.")}</p>}
    {linkedin.error && <p className="form-error" role="alert">{t(linkedin.error)}</p>}
    {!linkedin.loading && linkedin.error && <button type="button" className="presence-text-button" onClick={linkedin.refresh}>{t("Try again")}</button>}
  </div>;
}

export function PublicMeeting({ language, linkedin, active }: { language: PublicLanguage; linkedin: PublicLinkedin; active: boolean }) {
  const t = (text: string) => publicText(language, text);
  const [calendarOpened, setCalendarOpened] = useState(false);
  useEffect(() => {
    if (active && linkedin.member) { const frame = requestAnimationFrame(() => setCalendarOpened(true)); return () => cancelAnimationFrame(frame); }
  }, [active, linkedin.member]);
  const url = linkedin.calendarUrl ? new URL(linkedin.calendarUrl) : null;
  if (url) { url.searchParams.set("embed_domain", "unitalk.com"); url.searchParams.set("embed_type", "Inline"); url.searchParams.set("locale", language === "fr" ? "fr" : "en"); url.searchParams.set("primary_color", "e01b84"); }
  return <section className="public-inline-tool" hidden={!active} aria-labelledby="public-meeting-title">
    <h2 id="public-meeting-title" className="public-space-title">{t("Book a meeting")}</h2>
    <p className="public-space-intro">{t("Choose a time in Patrick’s calendar.")}</p>
    <LinkedInGate language={language} linkedin={linkedin} />
    {linkedin.member && url && calendarOpened && <div className="public-calendar"><iframe title={t("Patrick Chassany’s Calendly calendar")} src={url.href} referrerPolicy="strict-origin-when-cross-origin" /><a href={linkedin.calendarUrl} target="_blank" rel="noopener noreferrer" className="presence-text-button">{t("Open calendar in a new tab")} <Icon name="external" /></a></div>}
  </section>;
}

export function PublicMessageForm({ language, linkedin, conversationContext, active }: { language: PublicLanguage; linkedin: PublicLinkedin; conversationContext: string[]; active: boolean }) {
  const t = (text: string) => publicText(language, text);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [includeContext, setIncludeContext] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !linkedin.member || !linkedin.messageDeliveryReady) return;
    if (!message.trim()) { setError("Write your message before sending."); input.current?.focus(); return; }
    setSending(true); setError("");
    try {
      const response = await fetch("/api/public/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, message, context: includeContext ? conversationContext : [] }) });
      if (!response.ok) { if (response.status === 401) { await linkedin.refresh(); throw new Error("Your LinkedIn session expired. Sign in again to send your message."); } throw new Error("Your message couldn’t be sent. Please try again."); }
      setSent(true);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Your message couldn’t be sent. Please try again."); }
    finally { setSending(false); }
  }
  return <section className="public-inline-tool" hidden={!active} aria-labelledby="public-send-message-title">
    <h2 id="public-send-message-title" className="public-space-title">{t("Send a message")}</h2>
    <p className="public-space-intro">{t("Sign in with LinkedIn to send Patrick a message.")}</p>
    <LinkedInGate language={language} linkedin={linkedin} />
    {linkedin.member && (sent ? <section className="public-result" role="status"><h3><Icon name="check" />{t("Your message has been sent.")}</h3><button type="button" className="presence-text-button" onClick={() => { setSent(false); setSubject(""); setMessage(""); }}>{t("Write another message")}</button></section> : <form className="public-form" onSubmit={send} noValidate>
      <div><label htmlFor="public-auth-subject">{t("Subject")} <span>{t("Optional")}</span></label><input id="public-auth-subject" value={subject} maxLength={200} disabled={sending} onChange={event => setSubject(event.target.value)} /></div>
      <div><label htmlFor="public-auth-message">{t("Your message")}</label><textarea id="public-auth-message" ref={input} value={message} maxLength={2000} rows={5} disabled={sending} onChange={event => { setMessage(event.target.value); setError(""); }} placeholder={t("What would you like Patrick to know?")} required aria-invalid={Boolean(error)} aria-describedby={error ? "public-auth-message-error" : undefined} /></div>
      {conversationContext.length > 0 && <label className="public-include-context"><input type="checkbox" checked={includeContext} disabled={sending} onChange={event => setIncludeContext(event.target.checked)} />{t("Include my questions from this conversation")}</label>}
      {error && <p id="public-auth-message-error" className="form-error" role="alert">{t(error)}</p>}
      {!linkedin.messageDeliveryReady && <p className="public-integration-note">{t("Message delivery is being configured. Your draft stays here.")}</p>}
      <button type="submit" className="button button-primary" disabled={sending || !linkedin.messageDeliveryReady}>{t(sending ? "Sending…" : "Send message")} <Icon name="arrow" /></button>
    </form>)}
  </section>;
}

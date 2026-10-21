"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Check, FileText, Hash, Lock, MessageSquare, Plus, Search, Send, ShieldCheck, ThumbsUp, Users, X } from "lucide-react";
import { workspaceDemo, type WorkspaceChannel, type WorkspaceMessage, type WorkspaceMode } from "@/lib/workspace-demo";
import type { MarketingLanguage } from "@/lib/marketing-language";
import { SiteHeader } from "./site-shell";
import { FooterLanguage } from "./footer-language";
import { WorkspaceIntroduction } from "./workspace-introduction";
import "./shared-workspace.css";

export function SharedWorkspace({ mode, language }: { mode: WorkspaceMode; language: MarketingLanguage }) {
  const fr = language === "fr";
  const community = mode === "community";
  const demo = useMemo(() => workspaceDemo(mode, language), [mode, language]);
  const [channels, setChannels] = useState(demo.channels);
  const [channelId, setChannelId] = useState(demo.channels[0].id);
  const [view, setView] = useState<"conversation" | "canvas" | "moderation">("conversation");
  const [panel, setPanel] = useState<"members" | "thread" | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [canvasDrafts, setCanvasDrafts] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [newChannel, setNewChannel] = useState("");
  const [channelError, setChannelError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState<{ channel: string; thread?: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequence = useRef(1);
  const lastLog = useRef({ channel: demo.channels[0].id, count: demo.channels[0].messages.length });
  const log = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const channel = channels.find(item => item.id === channelId)!;
  const visibleMessages = (item: WorkspaceChannel) => item.messages.filter(message => !message.hidden && (!message.replyTo || !item.messages.find(parent => parent.id === message.replyTo)?.hidden));
  const thread = visibleMessages(channel).find(message => message.id === threadId);
  const replies = visibleMessages(channel).filter(message => message.replyTo === threadId);
  const reports = channels.flatMap(item => item.messages.filter(message => message.reported).map(message => ({ channel: item, message })));
  const results = search.trim() ? channels.flatMap(item => visibleMessages(item).filter(message => `${message.title ?? ""} ${message.author} ${message.body}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())).map(message => ({ channel: item, message }))) : [];

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (log.current) log.current.scrollTop = lastLog.current.channel === channelId && channel.messages.length > lastLog.current.count ? log.current.scrollHeight : 0;
    lastLog.current = { channel: channelId, count: channel.messages.length };
  }, [channelId, channel.messages.length]);

  function updateChannel(id: string, update: (item: WorkspaceChannel) => WorkspaceChannel) {
    setChannels(previous => previous.map(item => item.id === id ? update(item) : item));
  }
  function selectChannel(id: string) { setChannelId(id); setPanel(null); setThreadId(null); setView("conversation"); setNotice(""); }
  function addMessage(body: string, replyTo?: string) {
    if (!body.trim() || body.length > 2000 || pending) return;
    const currentChannel = channel;
    const text = body.trim();
    const message: WorkspaceMessage = { id: `local-${sequence.current++}`, author: fr ? "Vous" : "You", body: text, time: fr ? "À l’instant" : "Just now", replyTo, likes: 0 };
    updateChannel(channelId, item => ({ ...item, messages: [...item.messages, message] }));
    if (replyTo) setReplyDrafts(previous => ({ ...previous, [replyTo]: "" }));
    else setDrafts(previous => ({ ...previous, [channelId]: "" }));
    if (/@collaborat(?:or|eur)\b/i.test(text)) {
      const responseThread = community ? replyTo ?? message.id : replyTo;
      if (community) openThread(responseThread!);
      setPending({ channel: channelId, thread: responseThread });
      timer.current = setTimeout(() => {
        const next = currentChannel.tasks.filter(task => !task.done).map(task => `• ${task.text}`).join("\n");
        const response: WorkspaceMessage = {
          id: `local-${sequence.current++}`, author: "Collaborator", agent: true, replyTo: responseThread, likes: 0, time: fr ? "À l’instant" : "Just now",
          body: community ? (fr ? `Réponse d’exemple à partir des ressources de « ${currentChannel.name} » :\n\n${currentChannel.canvas || "Ajoutez des ressources dans cette rubrique pour donner du contexte au Collaborateur."}` : `Example answer from the resources in “${currentChannel.name}”:\n\n${currentChannel.canvas || "Add resources to this category to give the Collaborator context."}`) : fr ? `Récapitulatif d’exemple de #${currentChannel.name}\n\n${currentChannel.canvas}\n\nProchaines étapes :\n${next || "Toutes les étapes du canevas sont cochées."}` : `Example recap of #${currentChannel.name}\n\n${currentChannel.canvas}\n\nNext steps:\n${next || "All canvas steps are checked."}`,
        };
        updateChannel(currentChannel.id, item => ({ ...item, messages: [...item.messages, response] }));
        setPending(null); timer.current = null;
      }, 650);
    }
  }
  function like(id: string) { updateChannel(channelId, item => ({ ...item, messages: item.messages.map(message => message.id === id ? { ...message, liked: !message.liked, likes: message.likes + (message.liked ? -1 : 1) } : message) })); }
  function addChannel(event: React.FormEvent) {
    event.preventDefault();
    const name = newChannel.trim().replace(/^#/, "");
    if (name.length < 2 || name.length > 32) { setChannelError(fr ? "Choisissez un nom de 2 à 32 caractères." : "Choose a name between 2 and 32 characters."); return; }
    if (channels.some(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase())) { setChannelError(fr ? "Ce canal existe déjà." : "That channel already exists."); return; }
    const id = `channel-${sequence.current++}`;
    setChannels(previous => [...previous, { id, name, description: fr ? "Un nouveau canal dans cet aperçu." : "A new channel in this preview.", canvas: "", tasks: [], messages: [] }]);
    setNewChannel(""); setChannelError(""); selectChannel(id);
  }
  function openThread(id: string) { setThreadId(id); setPanel("thread"); }
  function moderate(targetChannel: string, messageId: string, action: "keep" | "hide" | "restore") {
    updateChannel(targetChannel, item => ({ ...item, messages: item.messages.map(message => message.id === messageId ? { ...message, hidden: action === "hide", reported: action === "keep" ? undefined : message.reported } : message) }));
    if (action === "hide" && threadId === messageId) { setThreadId(null); setPanel(null); }
    setNotice(fr ? action === "hide" ? "Discussion masquée dans cet aperçu. Vous pouvez la rétablir." : action === "restore" ? "Discussion rétablie dans cet aperçu." : "Signalement classé dans cet aperçu." : action === "hide" ? "Discussion hidden in this preview. You can restore it." : action === "restore" ? "Discussion restored in this preview." : "Report dismissed in this preview.");
  }
  function forumRow(message: WorkspaceMessage) {
    const count = visibleMessages(channel).filter(item => item.replyTo === message.id).length;
    return <button key={message.id} type="button" className="workspace-forum-topic" onClick={() => openThread(message.id)} aria-label={`${fr ? "Ouvrir la discussion" : "Open discussion"}: ${message.title ?? message.body.slice(0, 80)}`}>
      <span className="workspace-avatar" aria-hidden="true">{message.agent ? <Bot size={19} /> : message.author[0]}</span>
      <span className="workspace-forum-content"><strong>{message.title ?? message.body.split("\n")[0].slice(0, 100)}</strong><span>{message.body.length > 150 ? `${message.body.slice(0, 150)}…` : message.body}</span><span className="workspace-forum-meta">{message.author} · {message.time} · {count} {fr ? count === 1 ? "réponse" : "réponses" : count === 1 ? "reply" : "replies"}</span></span><MessageSquare size={18} aria-hidden="true" />
    </button>;
  }
  function messageRow(message: WorkspaceMessage, inThread = false) {
    const count = visibleMessages(channel).filter(item => item.replyTo === message.id).length;
    return <article key={message.id} className={`workspace-message${message.agent ? " workspace-message-agent" : ""}`}>
      <span className="workspace-avatar" aria-hidden="true">{message.agent ? <Bot size={19} /> : message.author.slice(0, 1)}</span>
      <div className="workspace-message-body"><div className="workspace-message-meta"><strong>{message.author}</strong>{message.agent && <span>AI Collaborator</span>}<span>{message.time}</span></div><p>{message.body}</p>
        <div className="workspace-message-actions"><button type="button" onClick={() => like(message.id)} aria-pressed={Boolean(message.liked)} aria-label={`${fr ? "Apprécier le message de" : "Like message from"} ${message.author}`}><ThumbsUp size={14} />{message.likes}</button>{!inThread && <button type="button" onClick={() => openThread(message.id)}><MessageSquare size={14} />{count ? `${count} ${fr ? count > 1 ? "réponses" : "réponse" : count > 1 ? "replies" : "reply"}` : fr ? "Répondre" : "Reply"}</button>}</div>
      </div>
    </article>;
  }

  return <div className="shared-workspace-page" lang={language}>
    <SiteHeader language={language} />
    <main id="main-content" className="workspace-main">
      <WorkspaceIntroduction mode={mode} language={language} />
      <div id="workspace-example" className={`workspace-shell${panel ? " has-detail" : ""}`}>
        <aside className="workspace-sidebar" aria-label={fr ? "Canaux de l’espace" : "Workspace channels"}>
          <div className="workspace-identity"><span className="workspace-space-mark" aria-hidden="true">{mode === "team" ? <Users size={24} /> : <MessageSquare size={24} />}</span><div><h2>{demo.name}</h2><p lang="en">{mode === "team" ? "Your team" : "Your community"}</p></div></div>
          <p className="workspace-private"><Lock size={13} />{fr ? "Privé · Sur invitation" : "Private · Invite only"}</p>
          <nav className="workspace-channel-list" aria-label={community ? fr ? "Rubriques du forum" : "Forum categories" : fr ? "Canaux" : "Channels"}><h2>{community ? fr ? "Rubriques" : "Categories" : fr ? "Canaux" : "Channels"}</h2>{channels.map(item => <button type="button" key={item.id} onClick={() => selectChannel(item.id)} aria-current={channelId === item.id ? "page" : undefined}>{community ? <MessageSquare size={17} /> : <Hash size={17} />}<span>{item.name}</span></button>)}</nav>
          <details className="workspace-new-channel"><summary><Plus size={16} />{fr ? "Ajouter un canal" : "Add a channel"}</summary><form onSubmit={addChannel}><label htmlFor="workspace-channel-name">{fr ? "Nom du canal" : "Channel name"}</label><input id="workspace-channel-name" value={newChannel} maxLength={32} onChange={event => { setNewChannel(event.target.value); setChannelError(""); }} aria-invalid={Boolean(channelError)} aria-describedby={channelError ? "workspace-channel-error" : undefined} />{channelError && <p id="workspace-channel-error" role="alert">{channelError}</p>}<button type="submit">{fr ? "Ajouter à l’aperçu" : "Add to preview"}</button></form></details>
          <div className="workspace-agent-summary"><Bot size={20} /><div><strong>Collaborator</strong><p>{fr ? "Le contexte de votre espace" : "Your workspace context"}</p></div></div>
          <p className="workspace-sidebar-note">{demo.description}</p>
        </aside>
        <section className="workspace-room" aria-labelledby="workspace-channel-title">
          <div className="workspace-room-header"><div><h2 id="workspace-channel-title"><Hash size={22} />{channel.name}</h2><p>{channel.description}</p></div><button type="button" className="workspace-members-button" onClick={() => setPanel(panel === "members" ? null : "members")} aria-expanded={panel === "members"} aria-label={`${fr ? "Membres" : "Members"} (${demo.members.length})`}><Users size={18} /><span>{fr ? "Membres" : "Members"}</span><span>{demo.members.length}</span></button></div>
          <div className="workspace-mobile-channel"><label htmlFor="workspace-channel-select">{fr ? "Canal" : "Channel"}</label><select id="workspace-channel-select" value={channelId} onChange={event => selectChannel(event.target.value)}>{channels.map(item => <option key={item.id} value={item.id}># {item.name}</option>)}</select></div>
          <div className="workspace-room-toolbar"><div className="workspace-views" aria-label={fr ? "Vue du canal" : "Channel view"}><button type="button" aria-pressed={view === "conversation"} onClick={() => setView("conversation")}><MessageSquare size={16} />{community ? fr ? "Discussions" : "Discussions" : "Conversation"}</button><button type="button" aria-pressed={view === "canvas"} onClick={() => setView("canvas")}><FileText size={16} />{community ? fr ? "Ressources" : "Resources" : fr ? "Canevas" : "Canvas"}</button>{community && <button type="button" aria-pressed={view === "moderation"} onClick={() => { setView("moderation"); setNotice(""); }}><ShieldCheck size={16} />{fr ? "Modération" : "Moderation"}</button>}</div><label className="workspace-search"><Search size={16} /><span className="sr-only">{fr ? "Rechercher dans cet espace" : "Search this workspace"}</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={fr ? "Rechercher dans cet espace" : "Search this workspace"} /></label></div>
          {search.trim() ? <div className="workspace-search-results"><p role="status">{results.length} {fr ? "résultat(s) dans cet espace" : "result(s) in this workspace"}</p>{results.map(result => <button type="button" key={result.message.id} onClick={() => { selectChannel(result.channel.id); setSearch(""); if (result.message.replyTo) { setThreadId(result.message.replyTo); setPanel("thread"); } }}><span>#{result.channel.name} · {result.message.author}</span><p>{result.message.body}</p></button>)}{results.length === 0 && <p>{fr ? "Essayez un autre mot." : "Try another search."}</p>}</div>
            : view === "moderation" ? <div className="workspace-moderation"><h3>{fr ? "Les signalements à examiner" : "Reports to review"}</h3><p>{fr ? "Vue d’exemple de la créatrice. Ces décisions modifient uniquement le forum local ; aucune détection automatique par IA n’est active." : "Example creator view. These decisions only change the local forum; no automated AI detection is active."}</p>{reports.map(report => <article key={report.message.id}><span>{report.message.reported}</span><h4>{report.message.title ?? report.message.body.slice(0, 80)}</h4><p>{report.message.body}</p><div>{report.message.hidden ? <button type="button" onClick={() => moderate(report.channel.id, report.message.id, "restore")}>{fr ? "Rétablir la discussion" : "Restore discussion"}</button> : <><button type="button" onClick={() => moderate(report.channel.id, report.message.id, "keep")}>{fr ? "Conserver" : "Keep"}</button><button type="button" onClick={() => moderate(report.channel.id, report.message.id, "hide")}>{fr ? "Masquer dans l’aperçu" : "Hide in preview"}</button></>}</div></article>)}{reports.length === 0 && <p>{fr ? "Aucun signalement en attente dans cet aperçu." : "No reports pending in this preview."}</p>}{notice && <p role="status">{notice}</p>}</div>
            : view === "canvas" ? <div className="workspace-canvas"><h3>{community ? fr ? "Les ressources du studio" : "Studio resources" : fr ? "Le contexte partagé" : "The shared context"}</h3><p>{community ? fr ? "Les contenus de Léa donnent le contexte des réponses et des discussions." : "Léa’s content provides context for answers and discussions." : fr ? "Un point de départ commun pour les personnes et le Collaborateur." : "A common starting point for people and the Collaborator."}</p><label htmlFor="workspace-canvas-text">{fr ? "Brief du canal" : "Channel brief"}</label><textarea id="workspace-canvas-text" rows={6} maxLength={4000} value={canvasDrafts[channelId] ?? channel.canvas} onChange={event => setCanvasDrafts(previous => ({ ...previous, [channelId]: event.target.value }))} /><button type="button" className="button button-primary button-small" onClick={() => { updateChannel(channelId, item => ({ ...item, canvas: canvasDrafts[channelId] ?? item.canvas })); setNotice(fr ? "Canevas enregistré dans cet aperçu." : "Canvas saved in this preview."); }}><Check size={16} />{fr ? "Enregistrer" : "Save changes"}</button><h3>{fr ? "Prochaines étapes" : "Next steps"}</h3>{channel.tasks.map(task => <label key={task.id} className="workspace-task"><input type="checkbox" checked={task.done} onChange={() => updateChannel(channelId, item => ({ ...item, tasks: item.tasks.map(value => value.id === task.id ? { ...value, done: !value.done } : value) }))} /><span>{task.text}</span></label>)}{channel.tasks.length === 0 && <p>{fr ? "Ajoutez vos prochaines étapes au brief de ce nouveau canal." : "Add your next steps to this new channel’s brief."}</p>}{notice && <p role="status" className="workspace-notice">{notice}</p>}</div>
            : <><div ref={log} className="workspace-log" role="log" aria-label={fr ? "Messages du canal" : "Channel messages"} aria-live="polite" aria-relevant="additions">{visibleMessages(channel).filter(message => !message.replyTo).map(message => community ? forumRow(message) : messageRow(message))}{visibleMessages(channel).length === 0 && <div className="workspace-empty"><MessageSquare size={28} /><h3>{fr ? "La conversation commence ici." : "The conversation starts here."}</h3><p>{fr ? "Partagez une idée ou mentionnez @collaborator pour essayer un récapitulatif." : "Share an idea or mention @collaborator to try a recap."}</p></div>}{pending?.channel === channelId && !pending.thread && <p className="workspace-pending" role="status">{fr ? "Le Collaborateur prépare une réponse d’exemple…" : "Collaborator is preparing an example reply…"}</p>}</div><form className="workspace-composer" onSubmit={event => { event.preventDefault(); addMessage(drafts[channelId] ?? ""); }}><label className="sr-only" htmlFor="workspace-message">{community ? fr ? "Nouvelle discussion" : "New discussion" : fr ? "Message dans le canal" : "Message this channel"}</label><textarea id="workspace-message" ref={composer} rows={2} maxLength={2000} value={drafts[channelId] ?? ""} onChange={event => setDrafts(previous => ({ ...previous, [channelId]: event.target.value }))} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); addMessage(drafts[channelId] ?? ""); } }} placeholder={community ? fr ? "Lancez une discussion ou posez une question…" : "Start a discussion or ask a question…" : fr ? `Écrire dans #${channel.name}` : `Message #${channel.name}`} /><div><button type="button" className="workspace-mention" onClick={() => { setDrafts(previous => ({ ...previous, [channelId]: `@collaborator ${previous[channelId] ?? ""}`.slice(0, 2000) })); composer.current?.focus(); }}><Bot size={16} />{fr ? "Mentionner le Collaborateur" : "Mention Collaborator"}</button><button type="submit" className="workspace-send" disabled={!(drafts[channelId] ?? "").trim() || Boolean(pending)} aria-label={fr ? "Envoyer le message" : "Send message"}><Send size={18} /></button></div></form></>}
        </section>
        {panel && <aside className="workspace-detail" aria-label={panel === "members" ? fr ? "Membres de l’espace" : "Workspace members" : fr ? "Fil de discussion" : "Thread"}>
          <div className="workspace-detail-heading"><h2>{panel === "members" ? fr ? "Membres" : "Members" : fr ? "Fil de discussion" : "Thread"}</h2><button type="button" aria-label={fr ? "Fermer le panneau" : "Close panel"} onClick={() => setPanel(null)}><X size={18} /></button></div>
          {panel === "members" ? <><p className="workspace-detail-note">{fr ? "Participants d’exemple de cet espace." : "Example participants in this workspace."}</p>{demo.members.map(member => <div className="workspace-member" key={member.name}><span className="workspace-avatar">{member.name === "Collaborator" ? <Bot size={18} /> : member.name[0]}</span><div><strong>{member.name}</strong><p>{member.role}</p></div></div>)}<p className="workspace-detail-note">{fr ? "La connexion des comptes et les invitations réelles ne sont pas encore disponibles." : "Account connections and live invitations are not available yet."}</p></> : thread && <>{messageRow(thread, true)}<div className="workspace-thread-replies" role="log" aria-label={fr ? "Réponses du fil" : "Thread replies"}>{replies.map(message => messageRow(message, true))}{pending?.thread === thread.id && <p role="status">{fr ? "Préparation d’une réponse d’exemple…" : "Preparing an example reply…"}</p>}</div><form className="workspace-thread-form" onSubmit={event => { event.preventDefault(); addMessage(replyDrafts[thread.id] ?? "", thread.id); }}><label htmlFor="workspace-thread-reply">{fr ? "Répondre dans le fil" : "Reply in thread"}</label><textarea id="workspace-thread-reply" rows={3} maxLength={2000} value={replyDrafts[thread.id] ?? ""} onChange={event => setReplyDrafts(previous => ({ ...previous, [thread.id]: event.target.value }))} /><button type="submit" className="button button-primary button-small" disabled={!(replyDrafts[thread.id] ?? "").trim() || Boolean(pending)}>{fr ? "Répondre" : "Reply"}<Send size={16} /></button></form></>}
        </aside>}
      </div>
      <div className="workspace-footer"><span>{fr ? "Un espace pour les personnes et leur Collaborateur IA." : "A space for people and their AI Collaborator."}</span><FooterLanguage language={language} /></div>
    </main>
  </div>;
}

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Professionals who want someone to handle their professional relationships and delegated work, and the people who interact with their Collaborator.

**Primary user — the owner.** A professional, founder, or expert whose relationships span LinkedIn, email and WhatsApp. They want their Collaborator to understand conversations, organize contacts and a CRM, identify what needs attention, and respond or act within the authority they give it. They meet someone who will work for them, rather than begin by configuring software.

**Secondary user — the visitor.** Someone who lands on a public Collaborator profile, talks to it, gets a real answer or a real piece of work done. This is the discovery audience, and the future owner.

The first public Collaborator is Patrick Chassany's (founder of Unitalk), representing his public professional knowledge: Patrick, his work, his companies, his ideas, Unitalk. It represents Patrick, not a fictional example or mascot. It is never called "Pacha"; Pacha is a future, separate Collaborator.

**Implementation truth:** this repository is a frontend prototype. Sign-in is simulated, replies are predefined, validations and previews are local. There is no connected AI model, LinkedIn, email, WhatsApp, CRM, history importer, Hermes runtime, deployment service or billing integration. Product capabilities below describe the intended product, not integrations already shipped here. Demonstrations must remain visibly labelled. Hosting, intelligence and billing selectors carry preferences into the encounter without provisioning anything.

## Product Purpose

Unitalk lets anyone meet and own an **AI Collaborator that works for them**.

An AI Collaborator connects to the owner's professional channels, learns their context, understands their relationships and handles entrusted work. It is designed to analyze conversations, find contacts, organize a CRM, surface important decisions, and respond or act for the owner. The owner intervenes where their judgment or authorization is needed. Its public presence is one surface of the product, not the whole value proposition.

The core promise:

> **Your AI Collaborator. It works for you. Meet your Collaborator.**

Success means a visitor moves from meeting someone else's Collaborator to owning their own. The conversion is **visitor → Collaborator owner** — not visitor → account, dashboard, or subscription. The account exists only to support ownership.

## Positioning

The first promise is concrete: **someone who can manage your professional relationships and work for you**.

The intended mechanism is **connect → understand relationships → work → involve the owner when needed**, with one persistent, owned Collaborator across channels.

- The first experience is a meeting. Website, email, WhatsApp, Slack and LinkedIn are intended connection sources. The homepage now starts with “Enter your domain name” or “Connect with LinkedIn”; both lead into the local encounter. Domain input supplies an unanalysed public source, and the LinkedIn entry does not connect an account. Connection and authority setup follow the encounter.
- Ownership applies to the Collaborator's identity, memory, knowledge, skills, tools, authority and work. A recurring Unitalk service plan must not turn that into a rented, disposable conversation. The user chooses where it runs and what powers it.
- **A chatbot answers. A Collaborator works.** A Collaborator receives a goal and executes it using its knowledge, skills and tools, showing meaningful progress and delivering a result.

The Collaborator has five complementary dimensions:
- **KNOWS** — Knowledge Bases and memory. Knowledge is supplied context; memory comes from work and interactions.
- **CONNECTS** — LinkedIn, email, WhatsApp, calendar and phone, within the owner's permissions.
- **USES** — Authorized MCP connectors, tools and APIs. MCP is the connection standard, not the product name.
- **WORKS** — Pursues an outcome autonomously and in the background, between conversations.
- **DECIDES** — Acts within authority, asks when approval is needed, and respects explicit boundaries.

The distinction from a one-off chatbot request is an ongoing responsibility. The Dots reference informs autonomy, context, connected tools and human approval, not Unitalk's name, visual identity or vocabulary.

## Core Concepts

### The Collaborator

Persistent components, all owned by the user:

- **Identity** — name, role, avatar, public URL, email where enabled, phone where enabled, voice.
- **Soul** — personality, communication style, rules, values, boundaries.
- **Knowledge** — public information, private information, documents, websites, FAQs, professional knowledge.
- **Memory** — persistent information learned through interaction and work.
- **Skills** — reusable ways of working: research, sales, writing, analysis, coding, lead qualification.
- **Tools** — capabilities and external systems: web, search, email, calendar, CRM, phone, messaging, APIs, applications.
- **Work** — the actual missions, tasks, results and history.

**Knowledge = what it knows. Memory = what it remembers.** They are different things.

### Public means public

A Collaborator has a public identity. People can discover it, open its profile, read about it, talk to it, give it appropriate work, and understand what it represents. Its public profile is part of the product, not an account dashboard. **The profile is alive** — it should feel more like meeting someone than visiting a settings page.

### Voice

Voice is a first-class product capability, not an add-on. A visitor can start a conversation, interrupt where supported, ask follow-up questions, give a task, and continue a previous conversation. The same Collaborator identity persists across supported channels — web, voice, phone, email, messaging. These are interfaces to one Collaborator, never disconnected products.

### Work

A Collaborator receives a goal and performs work using its knowledge, skills and tools. Progress is shown meaningfully (researching, qualifying, preparing) and ends in a delivery, not a debug console. Results are never fabricated: demo data must be clearly real or clearly simulated.

### Migration and runtime ownership

- Planned one-click history import from **ChatGPT, Claude and OpenClaw**: the user does not start from zero. The current UI states that import is planned; it does not claim to have ingested history.
- **Hermes** is the intended autonomous open-source runtime, not the product presented first. Mention it in the ownership section as the engine supporting portability. Reference: https://github.com/NousResearch/hermes-agent (MIT). No runtime is integrated in this repository yet.
- Hosting choices: **Unitalk Cloud**, **Your OVH server**, **Your Hostinger server**, **Your infrastructure**, **Existing Hermes**.
- Intelligence choices: **Unitalk Credits**, **Your API keys**, **Your AI gateway**. No keys are collected by the preview and no included credit allowance has been specified.
- Authority has three clear levels: **DO IT** (act within authority), **ASK ME** (important decisions), **NEVER DO IT** (hard boundaries).
- Public identity is the front door. `unitalk.com/@patrick` is the short alias of Patrick's canonical public route `@patrick-chassany`, rather than a new persona.

### Workforce

Multiple Collaborators working together. The user starts with one and adds more when needed — Sales, Research, Marketing, Operations, Development. Workforce is the natural expansion and is never the first-screen pitch: **the homepage sells the first Collaborator.**

## Public Collaborator scope and demo boundary

Patrick's canonical public surface at `/@patrick-chassany` is now English (`lang="en"`, English route metadata). `/@patrick` remains a permanent alias redirect to it; both raw `@` and encoded `%40` route parameters are accepted, and unknown profiles return 404. This public interaction is independent of the French visitor chat and owner workspace.

- **Meet the Collaborator first.** The user-pinned first screen is headerless: Patrick's name, “Here’s how to interact with me.”, the Collaborator's identity and greeting, Send a message and Book a meeting, with quieter Talk instead and labelled demo availability. There is no portrait, avatar, banner or biography on that screen. Conversation expands inline; capabilities, Patrick's work and topics follow lower down. The footer contains only the Unitalk logo link. Composition and intentional editorial type ranges belong in the public surface brief and `src/components/public-collaborator.css`.
- **Conversation is simulated.** Free-text input and starting requests receive predefined replies from `src/lib/public-collaborator-demo.ts`, not live AI answers. Topics and contextual work invitations return to that same conversation. Public knowledge stays distinct from private information and memory. Advisory, speaking and investment invitations are example discussion starters, not confirmed engagements. Available/thinking/listening are labelled demo interaction states; the away preview is a simulated scenario, not Patrick's live status.
- **Voice is browser dictation.** Where SpeechRecognition is supported, speech fills an editable draft for the visitor to review before sending; it is not automatically sent. Unsupported browsers, denied microphone permission and recognition/start errors show notices and retain the written conversation path. There is no connected voice-call service or spoken Collaborator response.
- **Meetings are local previews.** Collect a discussion reason, optional context, an example 30-minute Paris-time slot, name and email. Example times are generated for the next three weekdays, not read from Patrick's calendar. Local validation precedes a summary of who, why, context and when, with visitor conversation entries available to review. No calendar event, invitation or email is sent. The handoff review uses the request/context rather than a slot-selection message; confirming prepares a local handoff only and sends nothing to Patrick.
- **Continuity is optional and tab-local.** When browser storage is available, `sessionStorage` retains up to 80 transcript messages and the supplied visitor name for same-tab reload and continuation. A returning greeting and last-message context offer continuation; reopening during the mounted visit also retains the conversation. Clear conversation (or Something else from the returning greeting) deletes the tab transcript/name, cancels pending demo work/dictation and starts fresh. This is not cross-device, authenticated or persistent backend memory. The booking workflow, structured meeting data and handoff state are not restored on reload, even when their transcript text remains. Storage failure leaves the conversation usable without reload continuity.
- **Assets remain outstanding.** A real editorial portrait of Patrick and verified social URLs have not been supplied. The current public surface renders no portrait and offers a conversation action to ask for links; its predefined answer acknowledges that verified links are absent. Never substitute stock people or fake social links.

**Verification status:** the finish review accepted the visual direction and requested four behavior corrections. Its final verdict pass scored all four resolved and returned **SHIP within the frontend-demo scope**. Lint, route generation, TypeScript, production build and browser checks passed, including 320–1440px layouts, all conversation entry paths, fresh-start cleanup, meeting/handoff context and voice fallback/draft behavior. This is approval of the corrected demo, not live integration or deployment verification. Portrait and verified social URLs remain outstanding.

## Owner app scope and UX — wireframe v1.0

The user-pinned owner app at `/dashboard/patrick` is a French operational experience. Its three navigation areas are **Accueil / People / Collaborator**, labelled **Accueil / People / Moi** in mobile bottom navigation. These are areas of one owner dashboard; the homepage, public Collaborator, owner dashboard and visitor dashboard remain four distinct product surfaces.

- **Accueil = exceptions + proof of work.** “J’y travaille.” introduces the work, “Vous” shows three example situations requiring judgment: Sarah’s meeting slot, Acme’s proposed partnership response, and David’s missing priorities. First-person activity and a People preview follow. The exception count is contextual; there is no metrics grid or performance claim.
- **Decide in context.** Each focused decision has a back control, context, recommendation, reasons and what the Collaborator can do. Choose Sarah’s slot, edit Acme’s draft, or supply David’s priorities. Local approval removes the exception, adds an activity outcome and updates the relationship’s next step and conversation. Resolving all three exposes the all-clear state.
- **People = narrative relationships.** Search people or companies, read what is happening, the relationship history and next step, and inspect the simulated conversation. Take over, add a local owner reply, then let the Collaborator continue. Talking about a person opens the same owner conversation dialog, with predefined scenario responses.
- **Authority is explicit.** Rules move between **DO IT / ASK ME / NEVER DO IT** and changes add local activity. **NEVER DO IT blocks the corresponding demo approval**; pause and relationship takeover also block it. Changing a rule to DO IT does not automatically resolve an existing exception: pending decisions still require explicit approval. Activity exposes pause/resume and labelled scenario states for working, waiting and needing the owner.
- **Collaborator holds secondary controls.** Knowledge references can be added/removed without loading their contents; ChatGPT/Claude/OpenClaw history has a migration preview only. Capabilities and tools/MCP are planned, with local tool choices and per-channel permission previews. Memory is separate from knowledge and supports correction/deletion. Identity edits are local; opening/copying Patrick’s public URL leaves the public identity independent.
- **Infrastructure and account stay secondary.** Hosting/intelligence and monthly/annual billing choices are previews using the existing offer. Export downloads the local demo preferences as JSON, not a durable Collaborator backup. Authentication, API keys, production backups and advanced configuration remain planned.
- **Replay the owner onboarding.** The account menu opens a local first meeting: name, optional unanalysed website reference, mission and intended channels, then scripted work/results leading back to Patrick’s existing example relationships. LinkedIn and voice controls explain that they are planned. Replay creates no real Collaborator and does not personalize the dashboard’s scenario data.

**Implementation boundary:** visibly labelled demo work, conversations and results; simulated owner role, no authentication/authorization, connected AI, external action, ingestion or durable persistence. Local state survives section changes within the mounted page and resets on reload. The owner app inherits the existing WhatsApp–fuchsia world and tokens; its composition and scoped `src/app/owner.css` extend that system.

## Offer

- **Collaborator — €9.99 / month**, cancel anytime.
- **Annual — €99 / year**, marketed as **2 months free** compared with monthly billing.
- One AI Collaborator: **Identity · Memory · Knowledge · Skills · Tools · Authority**.
- The current homepage shows the intended offer; no payment, subscription or deployment is activated in this prototype. Price labels and validated setup choices live in `src/lib/collaborator-offer.ts`.
- **AI usage is separate from the subscription**: Unitalk Credits are bought when needed, or the owner uses API keys/an existing gateway. Do not invent a credit allowance, credit-pack price or provider fee.
- The Cloud price shown on the Pricing page is the same Collaborator plan, not a second subscription. Self-hosting and an existing Hermes instance are placement options, not different feature tiers. No enterprise plan or feature matrix is introduced.
- Earlier €9/month and token-trial copy are superseded by this offer. Do not reintroduce them on the homepage.

## Product Language

Always prefer **AI Collaborator**. The term **AI worker** is acceptable only when explaining the concept in plain language.

Never use: AI agent, chatbot, assistant, copilot, bot, AI employee, digital twin.

Never call the Collaborator a "profile" — a profile is static, a Collaborator works.

## Copy Principles

- Be direct: short sentences, simple words, concrete claims.
- Show, don't explain. If the product can demonstrate something, demonstrate it.
- One idea per section. Never create a section just because a feature exists.
- Banned SaaS language: platform, ecosystem, seamless, next-generation, revolutionary, powerful, intelligent automation, all-in-one, end-to-end, unlock, transform your workflow.
- Never oversell. The novelty of the product is strong enough.

English homepage entry: **“Enter your domain name”** with **“Continue”**, or **“Connect with LinkedIn”**. Header/pricing CTA: **“Get your Collaborator”**. Ownership CTA: **“Create my Collaborator”**. Supporting guide CTA: **“Meet your Collaborator”**. Patrick's proof CTA: **“Talk to Patrick's Collaborator”**. French encounter CTA remains **“Rencontrer mon Collaborateur”**. A URL also remains an optional source inside the visitor experience.

## Constraints

The homepage has one job: **make someone want to meet a Collaborator who will work for them.**

Homepage order: **WORK → PROOF → MIGRATE → OWN → CONTROL → PRESENCE → PRICE**. Use the user-approved English copy: “Your AI Collaborator. It works for you.” Patrick is a direct greeting and conversation CTA, without a biography or case study. Follow with history import, ownership through hosting/intelligence choices, authority boundaries, the public front door and pricing. Include the monthly price under the hero CTA and a fuller pricing section later. End with “You don't have to be everywhere. Your Collaborator can.” and “Own your intelligence.” The newer request supersedes the previous price-free, four-section homepage brief.

Supporting English routes:
- **`/how-it-works`** explains eight steps: connect your life; give it knowledge; give it tools; give it a job; let it work; stay in control; run it your way; give it a public presence. The owner can change permissions, pause or take over in the intended product. The current preview does not execute those capabilities.
- **`/pricing`** explains eight planned included categories (identity, knowledge/memory, connections, tools, work, control, public, migration), followed by separately funded intelligence, hosting options, Hermes portability and one monthly/annual offer.
- Shared navigation opens these pages rather than only scrolling the homepage. Offer preferences survive client navigation in the root layout; a specific pricing CTA explicitly overrides only its named intelligence choice.

It is not, and must never become: a feature encyclopedia, a generic AI landing page, a chatbot comparison page, a pricing-first SaaS page, a technical architecture page, an enterprise sales page, an AI agent marketplace, a giant integration grid, or a long manifesto.

Trust is part of the product. Never fake work results, online status, activity, conversations, customer numbers, revenue, testimonials, or Collaborator activity. A demo may be simulated but must be clearly identifiable as a demo.

## Success Test

A new visitor understands within seconds, without documentation:

1. This is an AI Collaborator.
2. Patrick has one.
3. I can talk to it.
4. I can meet my own Collaborator.
5. Its intended connected work handles my professional relationships and delegated tasks.
6. I keep control when my decision is necessary and I own the Collaborator.

The ultimate test is not "does this explain Unitalk?" but **"does this make me want one?"**

North-star loop: **MEET → CONNECT → UNDERSTAND → WORK → OWN.** Long-term: **CREATE → OWN → WORK → EARN → CREATE.**

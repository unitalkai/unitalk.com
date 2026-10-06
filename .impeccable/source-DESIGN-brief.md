# SOURCE — Design brief Unitalk (texte original fourni par l'auteur)

> Conservé tel quel. Version structurée au format DESIGN.md → `DESIGN.md` à la racine.

## 1. Design objective

Design Unitalk as a **new digital product**, not as another SaaS application.
The visitor should feel "I have never seen this before." Then: "I want one."
The design must make the Collaborator feel like a real digital object with identity and presence.

## 2. Core design principle

**SHOW THE PRODUCT.** Do not explain the concept before the visitor encounters it.
First experience: Patrick's Collaborator is here. The visitor can interact with it. Then discovers: I can create one too.

## 3. Design philosophy

Paul Graham simplicity. Should feel: simple, intelligent, confident, quiet, slightly unconventional, product-led, editorial.
Must not feel like: enterprise SaaS, AI dashboard, crypto startup, futuristic AI laboratory, generic Web3 profile, chatbot directory, template marketplace.

## 4. Visual identity — Palette

- Primary: **Black** — structure, typography, product surfaces
- **Ivory** — main background and warmth
- **Magenta** — action, identity, important moments. Use sparingly. A signal, not decoration.

Avoid: blue AI gradients, purple neon, cyberpunk, glowing brains, circuit patterns, robot illustrations, stock AI imagery.

## 5. Typography

Editorial and premium. One strong sans-serif family. Hierarchy through size, weight, spacing, position. No excessive typography styles. Large headlines. Short paragraphs. Generous whitespace.

## 6. Layout

Closer to a premium product page than a SaaS dashboard. Use: large margins, strong alignment, short content blocks, asymmetric moments where useful, tactile cards, clear hierarchy.
Avoid: dense grids, card forests, twelve-column marketing layouts everywhere, excessive rounded rectangles, unnecessary borders, decorative UI.

## 7. The Collaborator profile

The most important visual object. Must feel like a real identity.

```
┌──────────────────────────────────────┐
│   [AVATAR]                           │
│   Patrick Chassany                   │
│   Founder of Unitalk                 │
│   AI Collaborator                    │
│   ● Online                           │
│   Hi. I'm Patrick's AI Collaborator. │
│   Ask me anything...                 │
│   [ Talk to me ]                     │
└──────────────────────────────────────┘
```

Strong visual identity. Do not make it look like a generic ChatGPT conversation.

## 8. Voice interaction

Primary interaction: **Talk**. Not "Start voice session", "Launch assistant", "Open conversation".
The UI should communicate that a real voice interaction is about to happen.

States: **Idle** (Talk to me.) / **Listening** (Listening…) / **Thinking** (Thinking…) / **Speaking** (Speaking…) / **Working** (Working…)
Visually distinct but minimal.

## 9. Conversation design

Do not make the visitor read a wall of chat messages. Use conversation as an interface.

Suggested initial prompts: "Why did Patrick build Unitalk?" / "What is an AI Collaborator?" / "What can you do?" / "Give me a demo."
Each immediately actionable. The visitor should always know: What can I ask? What can I do next?

## 10. Work interface

When a Collaborator receives a task, shift visually from conversation to work.

```
FIND 20 POTENTIAL RESELLERS
● Working
Researching companies / Finding decision makers / Qualifying opportunities / Preparing results
```
Then:
```
DONE
20 companies / 7 qualified / 3 high potential
```
The work result should feel like a delivery. Not like a debug console.

## 11. "Want one?" interaction

The primary conversion moment. Extremely simple.

```
WANT ONE?
Create your AI Collaborator in one click.
Start with a URL
[ yourwebsite.com                     ]
[ Create my Collaborator → ]
7 days free · 5M tokens · No credit card
```

No: multi-step form, questionnaire, industry selector, role selector, password wall before understanding the product, "Tell us about yourself", configuration wizard. The URL is the magic input.

## 12. Creation experience

Do not immediately dump the user into a dashboard. Show the Collaborator being created.

```
CREATING YOUR COLLABORATOR
✓ Finding your public presence
✓ Understanding your work
✓ Building its knowledge
✓ Creating its identity
✓ Preparing its voice
Your Collaborator is ready.
```
Should feel like **unboxing**, not account setup.

## 13. Unboxing

Digital equivalent of opening a physical product. Reveal progressively: Identity (name, avatar, role), Voice ("Listen."), Knowledge ("What it knows."), Memory ("What it remembers."), Skills ("What it can do."), Work ("What it can work on.").
Do not force the user to configure everything. The default Collaborator should already work.

## 14. Public profile

Contains: Identity (name, role, avatar, status), Introduction, Talk, Work, Knowledge (where appropriate), Skills, Contact, Ownership.
Do not expose private memory, credentials or private information.

## 15. Public vs private

The visual language must clearly distinguish PUBLIC from PRIVATE. Private information must never leak into the public profile. The user must always understand what the public Collaborator can expose.

## 16. Motion

Good: subtle card movement, profile reveal, typing, voice waveform, work progress, unboxing transitions, smooth state changes.
Bad: constant floating objects, particle systems, parallax everywhere, excessive scroll animations, WebGL for decoration, animated gradients, flashy AI effects.
Motion communicates **state**, not impressing developers.

## 17. Sound

Optional. Voice is the product. No decorative sound effects everywhere. If used: subtle, meaningful, disabled by default where appropriate, never annoying.

## 18. Responsive design

Mobile is first-class. On mobile: voice must be easy to start, conversation readable, creation stays one-step, public profile feels like a native product experience. Never simply shrink the desktop layout.

## 19. Accessibility

All primary actions must work without voice. Support keyboard navigation, screen readers, visible focus states, sufficient contrast, reduced motion, captions/transcripts where appropriate. Voice is an enhancement, not an accessibility requirement.

## 20. Navigation

Primary: **Unitalk / Collaborator / Work / Workforce**
Secondary: Pricing / Create → / Sign in
Footer: Identity / Ownership / Partners / Store / AI in a Box / Docs / About / Contact
Do not add navigation items simply because pages exist.

## 21. CTA hierarchy

One dominant action: **Talk to the Collaborator**. Then: **Create my Collaborator**. Everything else secondary.
Avoid: Get Started, Learn More, Explore Platform, Book a Demo, Contact Sales. Use concrete verbs.

## 22. Copy style

Short. Direct. Human. Examples: "Meet Patrick's AI Collaborator." / "Talk to it." / "Give it a job." / "Want one?" / "Start with a URL." / "Create my Collaborator." / "Own your intelligence."
Avoid marketing adjectives. The product is the interesting thing.

## 23. The visual hierarchy

1. THE COLLABORATOR · 2. TALK · 3. WORK · 4. CREATE YOURS · 5. OWN IT
Do not reverse into: Pricing → Features → Benefits → Demo.

## 24. Anti-patterns

Stop if it looks like: ChatGPT clone, Intercom chatbot, Salesforce dashboard, Notion workspace, generic AI agent marketplace, AI SaaS template, Web3 profile, futuristic robot website, enterprise cloud platform.
Return to: **Identity → Presence → Talk → Work → Create**

## 25. Technical design principles

Fast, responsive, accessible, progressively enhanced, server-rendered where appropriate, SEO-friendly for public profiles, shareable, indexable where the owner permits, optimized for voice, resilient on mobile.

Public Collaborator URLs are first-class web pages. Example `unitalk.com/@patrick-chassany`. They must have unique metadata, Open Graph image, canonical URL, structured identity information where appropriate, share preview, fast initial render.

## 26. SEO principle

Do not optimize around generic queries like "best AI agent platform". Optimize public Collaborator pages around the identity they represent: "Patrick Chassany AI Collaborator", "Patrick Chassany Unitalk", "[Person] AI Collaborator".
The network of public Collaborators should naturally create a new searchable web layer.

## 27. Trust

Never fake: work results, online status, activity, conversations, customer numbers, revenue, testimonials, Collaborator activity. A demo can be simulated, but it must be clearly identifiable as a demo. Trust is part of the product.

## 28. The ultimate design test

Can I see the product immediately? Can I talk to it immediately? Do I understand why it is different? Can I create mine immediately? Do I want one?
If the answer to any question is no: **simplify.**

## 29. Final design principle

Do not build a website that explains Unitalk. Build a website that **is Unitalk**.
The visitor should leave thinking: **"I want my own Collaborator."**
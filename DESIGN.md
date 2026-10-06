---
name: Unitalk
description: The public profile of a Public AI Collaborator.
colors:
  ink: "#0A0A0A"
  ink-raised: "#161514"
  ink-line: "#2A2724"
  ivory: "#F5F1EA"
  ivory-sunk: "#EDE7DC"
  ivory-line: "#DCD4C6"
  signal: "#E01B84"
  signal-deep: "#B01567"
  muted: "#8A8172"
  muted-ink: "#A39C90"
typography:
  display:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.011em"
  label:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "14px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  prompt-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.full}"
    padding: "9px 16px"
  field:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.md}"
    padding: "18px 20px"
  card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.lg}"
    padding: "40px"
  card-raised:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.lg}"
    padding: "40px"
---

## Overview

This is not a marketing site. It is the **public profile of a Public AI Collaborator** — the first one, Patrick Chassany's. The page has to feel like *meeting someone*, not like visiting a settings page or reading a product pitch.

The page exists to carry the visitor through one sequence, in order: **MEET → TALK → WANT ONE → CREATE.** Nothing may interrupt it. No feature list, no explanation of the concept, no pricing table, no architecture diagram.

Register: **brand** (persuade). Editorial, quiet, confident, slightly unconventional. The design must feel like Paul Graham's plainness with the craft of a premium magazine — never like enterprise SaaS, an AI dashboard, a crypto startup, a futuristic lab, a Web3 profile, or a chatbot directory. If it looks like any of those, stop and return to **Identity → Presence → Talk → Work → Create.**

The test is not "does this explain Unitalk?" but **"does this make me want one?"**

## Colors

Three colors, and only three, do the work.

- **Ink `#0A0A0A`** — structure, typography, and the Collaborator's own surface. The card is black because the Collaborator is an *object*, not a section of the page.
- **Ivory `#F5F1EA`** — the world the object sits in. Warm, never pure white. Pure `#FFF` is banned.
- **Signal `#E01B84`** — magenta. Action, identity, important moments. It is a **signal, not a decoration.**

The rule that matters: **signal magenta owns exactly one meaning — talking to the Collaborator.** One accent serving two masters signals nothing. So:

- Magenta is allowed on: the status dot, the primary *Talk* action when it is the dominant action, a live/working state, the single accent inside the Collaborator's identity.
- Magenta is **not** used for generic links, borders, section eyebrows, or a second button competing with Talk. The *Create* CTA is ink-on-ivory, not magenta.
- Never more than one magenta element in the viewport at a time.

Banned outright: blue AI gradients, purple neon, cyberpunk, glowing brains, circuit patterns, robot illustrations, animated gradients, stock AI imagery. The dark surfaces are warm-tinted (`#161514`, `#2A2724` — brown-black), never cold blue-grey.

## Typography

Two families, each with one job. This is the whole type system — do not add a third.

- **Display — a serif** (`--font-display`). Carries the Collaborator's name, the section headlines, the numbers in a work result. Editorial, human, slightly literary. Used at large sizes with tight tracking (`-0.03em`) for presence.
- **Body — a sans** (`--font-sans`). Carries everything functional: conversation, form fields, prompts, copy, navigation. Reserved for reading and operating.
- **Labels** — the sans in uppercase at `0.6875rem` / `0.12em` tracking. Only for eyebrows like `PUBLIC PROFILE`, `WORKING`, `DONE`.

Hierarchy is built from **size, weight, spacing and position** — not from adding styles. Large headlines, short paragraphs, generous whitespace. Body copy is never justified, never centered when longer than two lines, and measures roughly 60–70 characters.

## Layout

**One column. One dominant object.** The page is a portrait, not a dashboard.

- Container max-width `72rem`, with margins that stay large on every breakpoint (`24px` mobile → `64px`+ desktop). Whitespace is the primary material.
- Content blocks stay short. If a section needs more than three sentences of prose, it is probably a section that should not exist.
- The Collaborator card is centered and optically dominant at all times. Nothing beside it competes for weight.
- Asymmetry is allowed and encouraged where it adds confidence — a headline set off-axis, a result block pulled left, an eyebrow offset from its heading. Symmetry everywhere reads as a template.
- On mobile, everything collapses to full width, but **it is not a shrunken desktop**: the card goes edge-to-edge as a tactile object, the Talk action stays reachable by thumb, and the creation flow stays one step.

Banned: dense grids, card forests, twelve-column marketing scaffolding, decorative borders, gratuitous containers. If a border or a wrapper does not carry information, delete it.

## Elevation & Depth

The system is **flat and tonal**, not shadowed.

Depth is expressed by **surface contrast and one quiet plane shift**: the black card sits on the ivory world; raised elements inside the card step to `#161514` rather than gaining a shadow. Hairlines (`#DCD4C6` on ivory, `#2A2724` on ink) separate where separation is real.

Allowed sparingly: a single soft, wide, low-opacity shadow under the Collaborator card to seat it in the page — one shadow, once, at low intensity. Nothing else casts.

Banned: drop shadows on buttons, glow effects, neon bloom, glassmorphism for its own sake, floating elements that suggest depth without meaning it.

## Shapes

- Radii are **small and deliberate**: `3px` (chips, tags), `6px` (buttons, fields), `14px` (the card). Pills are `9999px` and reserved for prompt chips only.
- The card's `14px` is the largest radius in the system. Nothing else approaches it — the Collaborator is the only "soft" object; the rest of the page is squared and precise.
- Borders are **1px hairlines**, never thicker, never doubled, never used as decoration on an element that already has a surface.
- No excessive rounded rectangles. If a rectangle has no content and no function, it is a border with ambition — remove it.

## Components

**Collaborator card** — the most important object on the page and the reason the site exists. Black `#0A0A0A` surface, `14px` radius, `40px` internal padding (reduced proportionally on mobile, never below `24px`). Contains, in order: avatar; name in display serif at headline scale; role in muted sans; a `AI Collaborator` label; the status line; the opening line in body; the dominant *Talk* action; and a row of prompt chips. It must read as a real identity with presence — never as a generic chat window.

**Status** — a `7px` dot plus a label. States are visually distinct but minimal, and the dot is the *only* place color signals state:
- `● Online` — signal magenta
- `Working` — ink-raised dot with a slow, physical pulse; the label switches to a `WORKING` eyebrow
- `Demo` — muted grey dot, with the label stating it plainly. Never a fake magenta "Online".

**Primary action** — ink background, ivory text, `6px` radius, `16px 28px` padding. One per viewport. On hover it either shifts to signal (when talking is the action) or lifts one tonal step — never both, and never a scale transform.

**Prompt chips** — transparent, `1px` hairline, pill-shaped, muted-ink text. They are invitations, not buttons: they must look like something you can say. They fill the input on click; they never navigate away.

**URL field** — ink-raised surface, ivory text, mono-feeling placeholder in a muted tone. It is the single input of the creation moment. No label above it beyond `Start with a URL`, no helper text, no validation theatre.

**Work result** — a delivery, not a console. Progress lines are a short vertical list with a single accent on the active line; the result is stated as three numbers in display serif, with a `DONE` eyebrow. Never a log, never a spinner-only state, never formatted like a terminal.

## Do's and Don'ts

**Do**
- Do show the product before explaining it. The visitor should meet the Collaborator before reading a single claim about Unitalk.
- Do keep one dominant action per viewport, and let *Talk* be it.
- Do let the Collaborator **work**: when given a task, shift from conversation to a result the visitor can read.
- Do label anything simulated. A demo is allowed; an ambiguous demo is not. `Demo` state exists precisely so honesty is visual, not a footnote.
- Do keep voice (when it exists) one tap away, and give every primary action a keyboard- and screen-reader-reachable path without it.
- Do design mobile as a first-class target: native-feeling, thumb-reachable, one-step creation.

**Don't**
- Don't build a homepage that explains Unitalk. Build one that **is** Unitalk.
- Don't turn the page into a feature encyclopedia, a chatbot comparison, a pricing-first SaaS page, an architecture page, an integration grid, or a manifesto. The page has exactly one job: **make someone want their own Public AI Collaborator.**
- Don't use two magenta elements at once, and don't spend the accent on anything that is not the Collaborator's identity or action.
- Don't fake online status, activity, results, testimonials or numbers. Trust is part of the product.
- Don't write "Get Started", "Learn More", "Explore Platform", "Book a Demo" or "Contact Sales". Use concrete verbs: *Talk to it. Give it a job. Want one? Start with a URL.*
- Don't use SaaS vocabulary: platform, ecosystem, seamless, next-generation, revolutionary, powerful, intelligent automation, all-in-one, end-to-end, unlock, transform your workflow.
- Don't dress it in blue gradients, neon, circuits, robots or glowing brains. The novelty of the product is strong enough.
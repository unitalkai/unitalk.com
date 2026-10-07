---
name: Unitalk
description: WhatsApp-derived warmth and conversational clarity, with fuchsia as the action color.
colors:
  ink: "#1C1E21"
  ink-raised: "#111B21"
  ink-line: "#35434A"
  ivory: "#FCF5EB"
  ivory-sunk: "#F4ECE0"
  ivory-line: "#E3DACB"
  signal: "#E01B84"
  signal-deep: "#B01567"
  signal-light: "#FF6ABA"
  signal-wash: "#FCE8F2"
  muted: "#5E5E5E"
  muted-ink: "#C9C8C5"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  dashboard:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.2
  small:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  control: "50px"
  panel: "24px"
  panel-mobile: "20px"
  menu: "16px"
  bubble: "14px"
  row: "12px"
  tail: "3px"
spacing:
  micro: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  panel: "24px"
  block: "32px"
  gutter: "48px"
  section-mobile: "64px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "15px 28px"
    height: "53px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "15px 28px"
    height: "53px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-small:
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "46px"
  field:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 20px"
    height: "53px"
  demo-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.control}"
    padding: "4px 9px"
  reading-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "30px"
  conversation-panel:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "24px"
  conversation-panel-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  message-collaborator:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "15px 17px 10px"
  message-visitor:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "15px 17px 10px"
  prompt-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  selected-row:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "23px 16px"
---

# Design System: Unitalk

## Overview

**Creative North Star: "WhatsApp website grammar, in fuchsia"**

The user-selected reference is whatsapp.com: warm cream, near-black ink, normal-weight sans-serif headings, photographic panels, pill controls and conversational bubbles. Fuchsia replaces its green. The visual authority is the implemented `src/app/globals.css`, with Archivo loaded in `src/app/layout.tsx`; this specification replaces the former serif, public-single-page system.

One reusable family supports four distinct surfaces: `/` (homepage), `/@patrick-chassany` (public AI Collaborator), `/dashboard/patrick` (owner demo) and `/dashboard/visiteur` (visitor demo). Public pages use expressive scale; role-specific dashboards use smaller, functional hierarchy and standard list/detail organization. These routes are implemented prototypes: role selection, responses, work and URL previews are simulated or local, with no real login, AI execution or crawl implied. Surface composition belongs in `.impeccable/surfaces/`.

**Key Characteristics:**
- Warm cream and dark tonal planes, with hairline separation.
- Archivo throughout; large public headings and compact operational hierarchy.
- Fuchsia actions, contextual accent text and pink selections.
- Pill controls, generous panels and recognizable message silhouettes.
- Visible demo labels and local illustrative photography.

## Colors

**Primary.** Signal is the solid action and identity color; primary controls use white text. White on signal is approximately **4.51:1**. Signal-deep supplies accent text on cream, error copy, focus outlines and the send control's hover. Signal-light supplies accent text on dark sections; it is currently a source literal, not a root custom property. Signal-wash marks visitor messages, selections, demo notices and invitation planes.

**Neutral.** Ivory is the page and header canvas; ivory-sunk is a quieter inset plane; ivory-line divides light surfaces. Ink is primary text and the standard button-hover fill. Ink-raised forms conversation and footer planes; ink-line divides their contents. Muted is supporting text on light surfaces, muted-ink on dark. White is intentionally used for controls, messages and reading panels.

**The Contextual Accent Rule.** Use signal for solid actions, signal-deep for accent text on cream, and signal-light for accent text on dark. Pink wash carries selection without making every item a solid action.

Selection uses signal with white text; the input caret uses signal; keyboard focus uses signal-deep. Page scrollbars use muted on ivory; chat scrollbars are thin, muted on transparent. The implementation has contextual light/dark planes, not a separate automatic dark-mode theme. Color ramps in the sidecar are synthesized swatch metadata, not additional shipping palette tokens.

## Typography

Archivo is the only font family, loaded through `next/font/google` into `--font-body`; `--font-display` aliases it. Both display and body use the same sans-serif, with Arial/sans-serif fallbacks. Headings are normal weight and balance their wrapping; weight 500 distinguishes controls and functional labels, and the wordmark uses 600.

The reusable hierarchy is display / headline / dashboard / title / body / control / small / caption, bound to the eight `--text-*` variables in CSS. Public display, headline and the smaller large-heading tier reach **80 / 60 / 48px** respectively. Public line heights vary narrowly by component (1–1.1); the headline token records the dark section's 1.04. Dashboard headings reach 48px and become 32px on mobile. Panel titles are 24px, general body 18px, controls and desktop chat text 16px, compact copy 14px and captions 12px. Message text is weight 400, while buttons use 500; captions inherit 1.5 except the demo chip's 1.25.

**The Functional Scale Rule.** Carry the same sans-serif identity into dashboards, using the dashboard and title tiers instead of public hero scale. Keep ordinary prose at weight 400, and use size, spacing and position to establish hierarchy.

Public copy commonly measures 34–42ch; dashboard summaries 27–45ch. Drafts preserve line breaks and use 1.65 line height. Messages wrap long content and preserve newlines. Activity numbers and counters use tabular figures. Mobile overrides are component-specific, including a fluid hero title and 44px public headline; do not replace them with one global shrink factor.

## Layout

The sticky header is 80px on desktop, with a 1320px maximum inner width and 48px outer gutters. Main content is centered at a maximum of 1152px with the same gutters. The stylesheet's three responsive thresholds are maximum widths of **1199 / 959 / 699px**: header gutters first reduce to 32px, desktop navigation changes to mobile navigation at 959px, and content gutters reduce to 20px at 699px. The mobile header is 72px.

Public pages use the user-pinned WhatsApp convention of two-column identity/copy and conversation/photo compositions. These grids are intentional. The homepage hero has 32px outer spacing and a photographic plane; generous section spacing reaches 120px. Role-specific dashboards use list/detail and conversation/creation workspaces with approximately 24–70px gaps, restrained rows and inline reading panels. Owner section buttons are sections of its dashboard, not substitutes for the four routes. At mobile width the principal workspaces stack, sections tighten toward 48–64px, tabs wrap, and compound URL fields put the action on its own row.

Desktop control height is a minimum, not a fixed clipping constraint: standard actions are 53px, compact actions and icon controls 46px, and prompts at least 44px. Compound input wrappers have their own padding; reuse those patterns rather than forcing every field to the button's total height.

Photography is local and illustrative. `public/images/working-together.jpg` is sourced from Unsplash, recorded in `public/images/SOURCES.md`, with embedded provenance and a visible illustration credit. It depicts a general working scene, not Patrick, Unitalk's team or a customer. PC initials provide Patrick's current identity representation. Gradients are photographic legibility overlays, not accent decoration.

## Elevation & Depth

Depth is predominantly flat: cream, white, pink wash and dark planes do the work, with 1px hairlines where content needs separation. The shadow vocabulary has two implemented roles: illustrative hero bubbles (`0 4px 16px #111b2120`) and the account menu (`0 12px 30px #111b211a`). Ordinary conversation messages, buttons and reading panels have no shadow.

**The Tonal Depth Rule.** Establish depth with surface contrast and hairlines. Reserve shadows for illustrative message bubbles and the account dropdown.

## Shapes

Controls and chips use 50px pill radii. Major panels use 24px; the hero, conversation and decision panel reduce to 20px on mobile, while other panels retain their source-specific treatment. Menu and connection containers use 16px, message bubbles 14px, selected decision/person rows 12px. Message direction is expressed by a 3px upper corner: left for the Collaborator, right for the visitor. These corners form the tail cue; there is no extra triangular tail element. Avatars and icon buttons are circular.

Borders are usually 1px hairlines; navigation indicators deliberately use 2px for public links and 3px for dashboard sections. Keyboard outlines are 3px. These are distinct roles, not a universal one-pixel prohibition.

## Components

- **Primary action:** signal fill and border, white text, pill silhouette, minimum 53px height, 15px 28px padding and a 24px icon gap. Hover changes both fill and border to ink; outline actions change from transparent/ink to ink/white. The dark ownership section overrides primary hover to white/ink for contrast. Standard buttons transition color, fill and border over 200ms; their icons travel 3px horizontally. No button shadow or scale transform is implemented. Disabled controls use 0.55 opacity and a default cursor.
- **Keyboard focus:** anchors, buttons, inputs, summaries and focusable elements receive a 3px signal-deep outline with 4px offset. Compound URL inputs reduce outline offset to zero. This is an outline, not a shadow. The skip link becomes visible on focus.
- **Fields:** standalone identity fields use ivory fill, ink text, a light hairline, 50px radius and 14px 20px padding. URL and chat composers use light pill wrappers around borderless inputs and a trailing action; compact/mobile URL wrappers become 20px rounded stacks. Placeholder text is muted; the caret is signal. URL validation supplies a real inline message and `aria-invalid`; errors on the dark hero use white text on signal-deep. There is no separate implemented error-border style.
- **Navigation:** desktop links are 16px normal weight with a 2px fuchsia underline revealed on hover or current page (220ms easing). Owner/visitor section buttons use muted text until current/hover, a 3px current indicator and pink count badges. Mobile navigation uses 53px minimum link rows, hairlines and an explicitly labelled expand/collapse control. The account menu's “Se connecter” entry opens demo role choices; it is not authentication.
- **Demo chip:** compact outline pill, 12px text, 4px 9px padding and a current-color border. Muted on light, muted-ink on dark, signal-deep in the pink notice. It describes simulation, never online status. Role notices state simulated connection and example data; result captions continue to identify demo output.
- **Panels and rows:** white reading panels use light hairlines and no shadow; dark conversation panels use ink-raised and ink-line. Selected decision and person rows use pink wash; unselected decision hover uses ivory-sunk. Selection is also exposed through `aria-pressed`, not color alone.
- **Messages and prompts:** ordinary Collaborator bubbles are white on dark, ivory in the visitor's light conversation; visitor bubbles are pink wash in both. Chat padding is 15px 17px 10px, with 16px normal text, a right-aligned 12px caption and directional corners. Hero story bubbles are the shadowed, 18px illustrative variant. Prompt chips have outline borders, at least 44px height and a tonal hover; they fill the composer rather than navigate. The circular send action is signal/white and hovers to signal-deep.

Motion stays small and contextual: 200ms button transitions, 220ms link underlines and a 650ms hero reply arrival use the existing easing vocabulary. Reply arrival is enabled only with no reduced-motion preference. Reduced motion disables transitions and smooth scrolling. The sidecar includes nine self-contained HTML/CSS samples bound to native project variables; they illustrate appearance and CSS states, not React behavior or backend capabilities.

## Do's and Don'ts

- Do use the WhatsApp-derived cream, sans-serif, pill-control and conversational family consistently across all four surfaces.
- Do preserve the smaller functional hierarchy and distinct owner/visitor navigation in dashboards.
- Do use contextual fuchsia shades, pink wash, white panels and hairlines according to their roles.
- Do keep keyboard focus visible and honor reduced motion.
- Do label simulated responses, activity, validation and URL previews visibly; keep knowledge distinct from memory and use AI Collaborator terminology.
- Do retain local illustrative assets, source records and embedded provenance without presenting them as real people or product evidence.
- Don't restore the obsolete serif, single-column-only, white-ban or one-fuchsia-element constraints.
- Don't add shadows to ordinary controls, chat messages or reading panels.
- Don't describe demo role selection as real login, local previews as crawling or deployment, or predefined answers as live AI work.
- Don't rename Patrick's AI Collaborator to Pacha or present owner sections as the four application surfaces.

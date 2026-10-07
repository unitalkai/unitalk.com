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
  native-select:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px 52px 16px 22px"
    height: "60px"
  billing-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  billing-option-selected:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.signal-deep}"
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

One reusable family supports four distinct surfaces: `/` (homepage), `/@patrick-chassany` (public AI Collaborator), `/dashboard/patrick` (owner demo) and `/dashboard/visiteur` (visitor demo). The homepage is English; the public Collaborator and both dashboards remain French, with language-aware shared shell components. Public pages use expressive scale; role-specific dashboards use smaller, functional hierarchy and standard list/detail organization. These routes are implemented prototypes: role selection, responses, work and URL previews are simulated or local, with no real login, AI execution or crawl implied. Surface composition belongs in `.impeccable/surfaces/`.

**Key Characteristics:**
- Warm cream and dark tonal planes, with hairline separation.
- Archivo throughout; large public headings and compact operational hierarchy.
- Fuchsia actions, contextual accent text and pink selections.
- Pill controls, generous panels and recognizable message silhouettes.
- Visible demo labels and local illustrative photography.

## Colors

**Primary.** Signal is the solid action and identity color; primary controls use white text. White on signal is approximately **4.51:1**. Signal-deep supplies accent text on cream, error copy, focus outlines and the send control's hover. Signal-light supplies dark-section accents and focus outlines for ownership and footer controls; it is currently a source literal, not a root custom property. Signal-wash marks visitor messages, selections, demo notices, encounter preferences and invitation planes.

**Neutral.** Ivory is the page and header canvas; ivory-sunk is a quieter inset plane; ivory-line divides light surfaces. Ink is primary text and the standard button-hover fill. Ink-raised forms conversation and footer planes; ink-line divides their contents. Muted is supporting text on light surfaces, muted-ink on dark. White is intentionally used for controls, messages and reading panels.

**The Contextual Accent Rule.** Use signal for solid actions, signal-deep for accent text on cream, and signal-light for accent text on dark. Pink wash carries selection without making every item a solid action.

Selection uses signal with white text; the input caret uses signal; keyboard focus defaults to signal-deep, with signal-light on ownership links, buttons, selects and summaries, and footer links, buttons and summaries. Page scrollbars use muted on ivory; chat scrollbars are thin, muted on transparent. The implementation has contextual light/dark planes, not a separate automatic dark-mode theme. Color ramps in the sidecar are synthesized swatch metadata, not additional shipping palette tokens.

## Typography

Archivo is the only font family, loaded through `next/font/google` into `--font-body`; `--font-display` aliases it. Both display and body use the same sans-serif, with Arial/sans-serif fallbacks. Headings are normal weight and balance their wrapping; weight 500 distinguishes controls and functional labels, and the wordmark uses 600.

The reusable hierarchy is display / headline / dashboard / title / body / control / small / caption, bound to the eight `--text-*` variables in CSS. Public display, headline and the smaller large-heading tier reach **80 / 60 / 48px** respectively. Public line heights vary narrowly by component (1–1.1); the headline token records the retained ownership heading's 1.04. The English hero uses 1.04 with its secondary line at 0.8em; English section headings use 1.06. Dashboard headings reach 48px and become 32px on mobile. Panel titles are 24px, general body 18px, controls and desktop chat text 16px, compact copy 14px and captions 12px. Message text is weight 400, while buttons use 500; captions inherit 1.5 except the demo chip's 1.25.

**The Functional Scale Rule.** Carry the same sans-serif identity into dashboards, using the dashboard and title tiers instead of public hero scale. Keep ordinary prose at weight 400, and use size, spacing and position to establish hierarchy.

Public copy commonly measures 34–42ch; dashboard summaries 27–45ch. The homepage hero offer uses a deliberate 20px (1.25rem) size, larger than body copy, for “€9.99 / month · Cancel anytime”. Drafts preserve line breaks and use 1.65 line height. Messages wrap long content and preserve newlines. Activity numbers and counters use tabular figures. Mobile overrides are component-specific, including a fluid hero title and 44px public headline ceiling (fluid on the English homepage); do not replace them with one global shrink factor.

## Layout

The sticky header is 80px on desktop, with a 1320px maximum inner width and 48px outer gutters. Main content is centered at a maximum of 1152px with the same gutters. The stylesheet's three responsive thresholds are maximum widths of **1199 / 959 / 699px**: header gutters first reduce to 32px, desktop navigation changes to mobile navigation at 959px, and content gutters reduce to 20px at 699px. The mobile header is 72px.

Public pages combine identity/copy with photographic or conversation panels; column arrangements follow the component, and the current photographic homepage hero uses a single content block. The homepage hero has 32px outer spacing and a photographic plane; generous section spacing reaches 120px. Role-specific dashboards use list/detail, conversation and local encounter workspaces with approximately 24–64px gaps, restrained rows and inline reading panels. Owner section buttons are sections of its dashboard, not substitutes for the four routes. At mobile width the principal workspaces stack, sections tighten toward 48–64px, tabs wrap, and compound URL fields put the action on its own row.

The English homepage's WORK → PROOF → MIGRATE → OWN → CONTROL → PRESENCE → PRICE sequence is recorded in its surface brief. Its reusable marketing sections use equal columns, 100px gaps and 100px vertical padding; gaps reduce to 52px at 1199px and 36px at 959px, with 72px padding at 959px. At 699px they stack with 32px gaps and 64px padding. Authority rows and footer disclosures also stack at this threshold.

Desktop control height is a minimum, not a fixed clipping constraint: standard actions are 53px, compact actions and icon controls 46px, native ownership selects 60px, and prompts and billing segments at least 44px. Compound input wrappers have their own padding; reuse those patterns rather than forcing every field to the button's total height.

Photography is local and illustrative. `public/images/working-together.jpg` is sourced from Unsplash, recorded in `public/images/SOURCES.md`, with embedded provenance and a visible illustration credit. It depicts a general working scene, not Patrick, Unitalk's team or a customer. Desktop uses a full photographic hero with a legibility overlay; mobile places a recognizable 210px-high crop below the CTA within the same dark panel. PC initials provide Patrick's current identity representation. Gradients are photographic legibility overlays, not accent decoration.

## Elevation & Depth

Depth is predominantly flat: cream, white, pink wash and dark planes do the work, with 1px hairlines where content needs separation. The stylesheet retains two shadow roles: illustrative story bubbles (`0 4px 16px #111b2120`), which the current homepage does not render, and the account menu (`0 12px 30px #111b211a`). Ordinary conversation messages, buttons and reading panels have no shadow.

**The Tonal Depth Rule.** Establish depth with surface contrast and hairlines. Reserve shadows for illustrative message bubbles and the account dropdown.

## Shapes

Controls and chips use 50px pill radii. Major panels use 24px; the hero, conversation and decision panel reduce to 20px on mobile, while other panels retain their source-specific treatment. Menu and connection containers use 16px, message bubbles 14px, selected decision/person rows 12px. Message direction is expressed by a 3px upper corner: left for the Collaborator, right for the visitor. These corners form the tail cue; there is no extra triangular tail element. Avatars and icon buttons are circular.

Borders are usually 1px hairlines; navigation indicators deliberately use 2px for public links and 3px for dashboard sections. Keyboard outlines are 3px. These are distinct roles, not a universal one-pixel prohibition.

## Components

- **Primary action:** signal fill and border, white text, pill silhouette, minimum 53px height, 15px 28px padding and a 24px icon gap. Hover changes both fill and border to ink; outline actions change from transparent/ink to ink/white. The dark ownership section overrides primary hover to white/ink for contrast. Standard buttons transition color, fill and border over 200ms; their icons travel 3px horizontally. No button shadow or scale transform is implemented. Disabled controls use 0.55 opacity and a default cursor.
- **Keyboard focus:** anchors, buttons, inputs, textareas, selects, summaries and focusable elements receive a 3px signal-deep outline with 4px offset. Ownership links, buttons, selects and summaries, plus footer links, buttons and summaries, use signal-light against their dark planes with the same 3px width and 4px offset. Billing segments transfer the radio's visible outline to its label with a 3px offset. Compound URL inputs reduce outline offset to zero. This is an outline, not a shadow. The skip link becomes visible on focus.
- **Encounter result:** successful submission focuses its response heading and brings it into view. Scroll is instant with reduced motion and smooth otherwise; invalid submissions retain form-local error messages.
- **Encounter preferences:** a pink-wash summary above the form uses the message radius, 20px padding, 14px copy and a 12px preview note. Definition-list labels and values align across each row, then stack on mobile. Only supplied, allowlisted hosting, intelligence and billing preferences appear; English option labels retain `lang="en"` in the French encounter. These are preview choices, with no deployment, connection or subscription activated. `src/lib/collaborator-offer.ts` owns option and price labels; offer truth belongs there and in `PRODUCT.md`.
- **Shared encounter links:** `src/components/collaborator-offer-context.tsx` holds homepage hosting, intelligence and billing choices in shared in-page state. `EncounterLink` merges each link's explicit defaults with those choices, with user-selected values taking precedence, so every homepage encounter CTA preserves the combined selection. The homepage composes this client provider while route pages retain server-owned metadata.
- **Fields:** the standalone encounter-name field uses ivory fill, ink text, a light hairline, 50px radius and 14px 20px padding. The local encounter pairs it with a white mission textarea; optional channel checkboxes indicate intended channels, with no account connection. URL and chat composers use light pill wrappers around borderless inputs and a trailing action; compact/mobile URL wrappers become 20px rounded stacks. The encounter's optional URL action is “Ajouter la source”; the source is not analyzed. Placeholder text is muted; the caret is signal. URL and encounter validation supply inline messages and `aria-invalid`. There is no separate implemented error-border style.
- **Homepage entry:** `home-entry.tsx` uses the existing white compound URL control with a persistent “Enter your domain name” label, example.com placeholder and fuchsia Continue action. It validates a public URL and carries it plus shared offer preferences into the local encounter. A white “Connect with LinkedIn” text link opens the demo encounter; it does not connect an account. The form is at most 520px wide, with stacked input/action on mobile. Focus uses signal-light on the photographic plane and signal-deep inside the white field.
- **Native selects:** `ownership-options.tsx` places white/ink selects labelled “Multi cloud hosting” and “Multi model intelligence” on the dark ownership plane. They use the control radius, a white 1px border, 60px minimum height and 16px 52px 16px 22px padding. A non-interactive inline chevron replaces the visual native arrow; the select retains native selection and keyboard behavior. Labels use the title tier and supporting copy uses 14px/1.6. Hover remains native; focus uses the contextual light accent. The selects update shared hosting and intelligence preferences carried by every homepage encounter CTA; deployment and Hermes integration remain planned. The former setup-preview sentence and its description references are removed.
- **Billing choice:** `collaborator-pricing.tsx` uses a native radio group with a visually hidden legend inside a pill hairline enclosure (5px padding, 4px gap). Equal-width labels have 44px minimum height and 10px 12px padding; checked labels use pink wash and signal-deep text. Transparent radios cover the labels and retain native keyboard behavior; focus is drawn on the label. There is no custom hover fill. The annual saving is caption-sized, stacking at 959px and wrapping inline at 699px. The application updates the price in a polite live region and shares the chosen period with every homepage encounter CTA, without taking payment.
- **Navigation:** desktop links are 16px normal weight with a 2px fuchsia underline revealed on hover or current page (220ms easing). Owner/visitor section buttons use muted text until current/hover, a 3px current indicator and pink count badges. Mobile navigation uses 53px minimum link rows, hairlines and an explicitly labelled expand/collapse control. The account menu's “Se connecter” entry opens demo role choices; it is not authentication.
- **Marketing footer:** the English `site-shell.tsx` footer keeps the dark plane, brand, ownership copy, Product/Pricing navigation and copyright below a hairline. The preview privacy/terms disclosures and simulation tagline are removed. Their former fragment links are also removed from shared English navigation. Demo activity remains labelled at the point of use.
- **Collaborator showcases:** Patrick’s proof and “Your public front door” share the `collaborator-showcase` composition: cream copy and fuchsia primary action on the left, dark rounded invitation with compact avatar/identity and large white/pink quote on the right. On mobile the copy/action precedes the invitation. The public-front-door invitation includes Patrick’s real public route below an ink hairline, with light-accent hover and focus.
- **Demo chip:** compact outline pill, 12px text, 4px 9px padding and a current-color border. Muted on light, muted-ink on dark, signal-deep in the pink notice. It describes simulation, never online status. Role notices state simulated connection and example data; result captions continue to identify demo output.
- **Panels and rows:** white reading panels use light hairlines and no shadow; dark conversation panels use ink-raised and ink-line. Selected decision and person rows use pink wash; unselected decision hover uses ivory-sunk. Selection is also exposed through `aria-pressed`, not color alone.
- **Messages and prompts:** ordinary Collaborator bubbles are white on dark, ivory in the visitor's light conversation; visitor bubbles are pink wash in both. Chat padding is 15px 17px 10px, with 16px normal text, a right-aligned 12px caption and directional corners. Retained story-bubble CSS defines a shadowed, 18px illustrative variant; the current homepage does not render it. Prompt chips have outline borders, at least 44px height and a tonal hover; they fill the composer rather than navigate. The circular send action is signal/white and hovers to signal-deep.

Motion stays small and contextual: 200ms button transitions and 220ms link underlines use the existing easing vocabulary. Retained story-reply CSS defines a 650ms arrival only with no reduced-motion preference; it is not rendered on the current homepage. Reduced motion disables transitions and smooth scrolling. The sidecar includes eleven self-contained HTML/CSS samples bound to native project variables; they illustrate appearance and CSS states, not React behavior or backend capabilities. The native select and billing examples extend the established WhatsApp–fuchsia system; the radio sample uses checked-state CSS to mirror the application's selected class without requiring React.

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

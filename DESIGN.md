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

One reusable family supports four distinct core surfaces: `/` (homepage), `/@patrick-chassany` (public AI Collaborator), `/dashboard/patrick` (owner demo) and `/dashboard/visiteur` (visitor demo). The homepage, public Collaborator and supporting marketing routes are English; both dashboards remain French, with language-aware shared shell components where used. The English `/meet` marketing encounter extends this family through `src/app/home.css` and stays independent of the dashboards. Public pages use expressive scale; the visitor dashboard retains smaller functional hierarchy and standard list/detail organization. The owner app uses a compact, exception-led flow with focused decisions and narrative relationships under Accueil / People / Collaborator (mobile: Accueil / People / Moi). Its scoped `src/app/owner.css` inherits the global WhatsApp–fuchsia tokens. Patrick's public surface likewise extends this family through `src/components/public-collaborator.css`. These routes are implemented prototypes: role selection, responses, work and URL previews are simulated or local, with no real login, AI execution or crawl implied. Surface composition belongs in `.impeccable/surfaces/`.

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

The reusable hierarchy is display / headline / dashboard / title / body / control / small / caption, bound to the eight `--text-*` variables in CSS. Shared display, headline and the smaller large-heading tier reach **80 / 60 / 48px** respectively. Shared public heading line heights vary narrowly by component (1–1.1); the headline token records the retained ownership heading's 1.04. The English homepage hero uses 1.04 with its secondary line at 0.8em; English marketing section headings use 1.06. Dashboard headings reach 48px and become 32px on mobile. Panel titles are 24px, general body 18px, controls and desktop chat text 16px, compact copy 14px and captions 12px. Message text is weight 400, while buttons use 500; captions inherit 1.5 except the demo chip's 1.25. Patrick's public route intentionally uses larger editorial headings and greeting copy in `src/components/public-collaborator.css`; its exact ranges and responsive overrides belong in `.impeccable/surfaces/src-app-profile-page-tsx.md`, without changing this shared token ramp.

**The Functional Scale Rule.** Carry the same sans-serif identity into dashboards, using the dashboard and title tiers instead of public hero scale. Keep ordinary prose at weight 400, and use size, spacing and position to establish hierarchy.

Public copy commonly measures 34–42ch; dashboard summaries 27–45ch. The homepage hero offer uses a deliberate 20px (1.25rem) size, larger than body copy, for “€9.99 / month · Cancel anytime”. Drafts preserve line breaks and use 1.65 line height. Messages wrap long content and preserve newlines. Activity numbers and counters use tabular figures. Mobile overrides are component-specific, including a fluid homepage hero title and 44px shared public headline ceiling (fluid on the English homepage); Patrick's public route follows its own brief and CSS overrides. Do not replace them with one global shrink factor.

## Layout

The shared sticky header is 80px on desktop, with a 1320px maximum inner width and 48px outer gutters. Shared main content is centered at a maximum of 1152px with the same gutters. The global stylesheet's three responsive thresholds are maximum widths of **1199 / 959 / 699px**: header gutters first reduce to 32px, desktop navigation changes to mobile navigation at 959px, and content gutters reduce to 20px at 699px. The shared mobile header is 72px. Patrick's public route is headerless, with a centered inline interaction and the Unitalk logo only in its cream footer; its route-specific composition is recorded in the public surface brief and `src/components/public-collaborator.css`.

Marketing pages combine copy with photographic or invitation panels; column arrangements follow the component, and the current photographic homepage hero uses a single content block. The homepage hero has 32px outer spacing and a photographic plane; generous section spacing reaches 120px. Patrick's public first screen has no portrait, avatar, banner or biography; its white greeting expands into conversation in place, without an enclosing chat-widget card. The visitor dashboard retains list/detail, conversation and local encounter workspaces with approximately 24–64px gaps, restrained rows and inline reading panels. At mobile width those principal workspaces stack, sections tighten toward 48–64px, tabs wrap, and compound URL fields put the action on its own row.

The owner wireframe v1.0 has its own sticky identity/status shell (1040px maximum) and a quieter single-column main (880px maximum), with focused detail views capped at 740px and onboarding at 640px. Accueil stacks white exception summaries, first-person proof of work and a People preview; metrics are not part of this owner composition. Decisions and narrative relationships open focused screens with explicit back controls. Collaborator uses hairline-separated definition rows leading to secondary controls. Owner gutters are 48px, reducing to 32px at 959px and 20px at 699px; home section gaps reduce from 56px to 40px at 699px. At that threshold, desktop navigation yields to fixed Accueil / People / Moi bottom navigation with safe-area padding. These three areas belong to one owner dashboard, distinct from the four product surfaces.

The English homepage's current composition is recorded in its surface brief; Patrick's invitation now belongs to the public-front-door section, with no separate early proof section. Shared marketing sections use equal columns, 100px gaps and 100px vertical padding; gaps reduce to 52px at 1199px and 36px at 959px, with 72px padding at 959px. At 699px they stack with 32px gaps and 64px padding. The homepage extension overrides section padding to 80px, then 64px at 959px and 56px at 699px. Its work area uses a 64px column gap: copy and entry on the left, an interactive white draft panel on the right. At 959px it becomes copy → work example → entry in one column. Authority rows also stack on mobile.

On short desktop viewports (width ≥960px, height ≤820px), the homepage hero retains 16px top spacing and uses 28px vertical content padding with a route-specific height-aware 44–80px title. Work actions and the 20px offer plus AI-usage qualification remain visible above the fold; domain/channel entry now belongs to the following work section. The local hero minimum is `max(490px, calc(100svh - 128px))`, compared with 660px on taller desktops. Mobile actions wrap naturally and the price may wrap at 320px; the artifact continues below the fold. These adaptations live in `src/app/home.css`, not in shared typography tokens; evidence and review status are recorded in the surface brief.

The English `/meet` uses the shared cream container and header, a back link and lightweight heading, then a two-column 0.85:1.15 workspace with a 72px gap (40px at 1199px). Below 699px, form and result stack with a 32px gap. A dark rounded empty-state panel yields to an inline greeting and the same white work artifact after submission. Source/channel confirmations use pink wash; setup preferences stay in a native disclosure. Exact route behavior belongs in `PRODUCT.md` and `.impeccable/surfaces/src-app-meet-page-tsx.md`.

Desktop control height is a minimum, not a fixed clipping constraint: standard actions are 53px, compact actions and icon controls 46px, native ownership selects 60px, and prompts and billing segments at least 44px. Compound input wrappers have their own padding; reuse those patterns rather than forcing every field to the button's total height.

Photography is local and illustrative. The homepage retains `public/images/professional-conversation.jpg` and currently renders portrait-01 through portrait-03; all five existing Unsplash portrait files and `working-together.jpg` remain recorded in `public/images/SOURCES.md` with embedded provenance. These images depict general professional relationships, not Patrick, Unitalk's team or customers. A single responsive hero Image places the photograph on the right at desktop widths, with a left-concentrated legibility overlay; at widths ≤959px its media becomes an in-flow 480px-high area below the copy/actions, reducing to 375px at ≤699px within the same dark panel. A flat white work artifact overlays that photograph. One staggered portrait-and-message ribbon introduces the work summary; mobile retains only its first portrait and pink message. PC initials remain in Patrick's public-front-door invitation and dashboard identity, not his public first screen. A real editorial Patrick portrait and verified social URLs are outstanding assets for the public surface; never substitute stock people or invented links there. Gradients are photographic legibility overlays, not accent decoration. No asset is created by this documentation extension; existing stock provenance is unchanged.

## Elevation & Depth

Depth is predominantly flat: cream, white, pink wash and dark planes do the work, with 1px hairlines where content needs separation. The homepage hero artifact and interactive work panels have no shadow; portrait-ribbon bubbles use the illustrative shadow (`0 4px 16px #111b210d`). Retained, unrendered story-bubble CSS defines `0 4px 16px #111b2120`. The account menu uses its existing shadow (`0 12px 30px #111b211a`). Ordinary conversation messages, buttons and reading panels have no shadow.

**The Tonal Depth Rule.** Establish depth with surface contrast and hairlines. Reserve shadows for illustrative message bubbles and the account dropdown.

## Shapes

Controls and chips use 50px pill radii. Major panels use 24px; the hero, conversation and decision panel reduce to 20px on mobile, while other panels retain their source-specific treatment. Menu and connection containers use 16px, message bubbles 14px, selected decision/person rows 12px. Message direction is expressed by a 3px upper corner: left for the Collaborator, right for the visitor. These corners form the tail cue; there is no extra triangular tail element. Avatars and icon buttons are circular.

Borders are usually 1px hairlines; navigation indicators deliberately use 2px for public links and 3px for dashboard sections. Keyboard outlines are 3px. These are distinct roles, not a universal one-pixel prohibition.

## Components

- **AI history-source marks:** the homepage retains its two-column, hairline-separated provider list with six decorative SVGs beside visible names. `ai-provider-logo.tsx` renders the OpenAI knot, Claude burst, OpenClaw mascot, Gemini star, Grok mark and official Hermes wing. Icon slots are 32px, ordinary marks 26px, the narrower Hermes wing 18 × 32px. Third-party terracotta/red/blue belong only to their marks, with ink for OpenAI and Grok. Source and MIT license records live under `public/brand-marks/`; no additional icon dependency or remote browser image request is introduced.
- **Customer login entry:** Log in / Se connecter is a direct outline link to `/login` on desktop and a direct link in mobile navigation. The role-workspace dropdown and its mobile equivalents are removed. The customer route inherits cream/Archivo, a brand/back header, a centered 560px column, hairline-separated unavailable state and pill return action. It collects no credentials while authentication is unconnected. Its route-local CSS lives in `src/app/login/login.css`.
- **Homepage channel ribbon:** `channel-ribbon.tsx` adds decorative WhatsApp, LinkedIn, Slack and email marks above the intended-channel copy, using local inline SVG. White circles vary between 56–64px (44–48px on mobile), stagger vertically and remain smaller than the portraits. Brand marks retain WhatsApp #25D366, LinkedIn #0A66C2 and Slack #E01E5A / #36C5F0 / #2EB67D / #ECB22E; these colors belong only to the third-party marks. A pink message bubble and fuchsia email outline tie the row to Unitalk. The ribbon has no links or connected-account states and is hidden from assistive technology because the adjacent text names the channels. Composition lives in `src/app/home.css`.

- **Primary action:** signal fill and border, white text, pill silhouette, minimum 53px height, 15px 28px padding and a 24px icon gap. Hover changes both fill and border to ink; outline actions change from transparent/ink to ink/white. Dark ownership and hero work actions override primary hover to white/ink for contrast. Standard buttons transition color, fill and border over 200ms; their icons travel 3px horizontally. No button shadow or scale transform is implemented. Disabled controls use 0.55 opacity and a default cursor.
- **Keyboard focus:** anchors, buttons, inputs, textareas, selects, summaries and focusable elements receive a 3px signal-deep outline with 4px offset. Ownership links, buttons, selects and summaries, plus footer links, buttons and summaries, use signal-light against their dark planes with the same 3px width and 4px offset. Billing segments transfer the radio's visible outline to its label with a 3px offset. Compound URL inputs reduce outline offset to zero. This is an outline, not a shadow. The skip link becomes visible on focus.
- **Encounter result:** successful submission focuses its response heading and brings it into view. Scroll is instant with reduced motion and smooth otherwise; invalid submissions retain form-local error messages. The English result reuses the work draft panel rather than a dashboard. Its restart controls return to the form and discard the mounted example's edits/approval; the corrected restart behavior passed desktop/mobile checks and the final reviewer scored it resolved.
- **Encounter preferences:** the French dashboard encounter uses a pink-wash summary above its form, with the message radius, 20px padding and 14px copy; definition-list rows stack on mobile. English `/meet` uses a hairline-separated Your setup choices disclosure beneath its form, with 14px labels/values. Repeated preview footnotes are removed. Its pink-wash panels confirm the website reference or preferred channel. Only supplied, allowlisted hosting, intelligence and billing preferences appear; English option labels retain `lang="en"` in the French encounter. `src/lib/collaborator-offer.ts` owns option and price labels; offer truth belongs there and in `PRODUCT.md`.
- **Shared encounter links:** `src/components/collaborator-offer-context.tsx` holds hosting, intelligence and billing preferences in the root-layout provider so choices survive client navigation between marketing pages. `EncounterLink` merges defaults, shared preferences, then explicit `choices`; explicit fields win and update the shared selection on an accepted click. English links use `/meet`, while omitted/French language uses `/dashboard/visiteur`. Route pages retain server-owned metadata. These are local preference handoffs, not provisioning or payment.
- **Fields:** the French encounter-name field uses ivory fill, ink text, a light hairline, 50px radius and 14px 20px padding, beside a white mission textarea and optional intended-channel checkboxes. English `/meet` uses a white name pill and native mission radio rows with hairline separation and 53px minimum height. URL and chat composers use light pill wrappers around borderless inputs and a trailing action; compact/mobile URL wrappers become 20px rounded stacks. The French encounter's optional URL action remains “Ajouter la source”; the source is not analyzed. Placeholder text is muted; the caret is signal. URL and encounter validation supply inline messages and `aria-invalid`. There is no separate implemented error-border style.
- **Homepage entry:** `home-entry.tsx` sits after the work example in mobile reading order, using a white compound URL control with “Enter your domain name” as its accessible name and placeholder, and a fuchsia Meet yours action. It validates a public URL and carries it plus shared preferences into English `/meet`. The ink “Start with LinkedIn” text link opens that same local encounter with an intended channel; no OAuth is invoked. The form is at most 520px wide, with stacked input/action on mobile and signal-deep focus against cream/white. The explanatory demo note is removed; `aria-describedby` references only a present validation error.
- **Work artifact:** `work-demo.tsx` shares a flat white, 24px rounded draft panel across homepage and English encounter, reducing to 20px corners/padding on mobile. Pink request bubbles, 1px hairlines, a normal-weight 24px title and 16px/1.65 draft text make the delivery readable; long text wraps and line breaks remain. The homepage's three tab-like native buttons use `aria-pressed`, 44px minimum targets and pink-wash/deep-fuchsia selection. Edit opens an ivory textarea; approval uses the existing fuchsia pill and reports a concise outcome beneath it only after approval, without reserved footnote space. Compact Demo labels remain; repeated no-action copy is removed. The hero's non-interactive artifact uses the same white/pink vocabulary; its approval sentence describes intended authority, not a send capability.
- **Native selects:** `ownership-options.tsx` places white/ink selects labelled “Multi cloud hosting” and “Multi model intelligence” on the dark ownership plane. They use the control radius, a white 1px border, 60px minimum height and 16px 52px 16px 22px padding. A non-interactive inline chevron replaces the visual native arrow; the select retains native selection and keyboard behavior. Labels use the title tier and supporting copy uses 14px/1.6. Hover remains native; focus uses the contextual light accent. The selects update shared hosting and intelligence preferences carried by every homepage encounter CTA; deployment and Hermes integration remain planned. The former setup-preview sentence and its description references are removed.
- **Billing choice:** `collaborator-pricing.tsx` uses a native radio group with a visually hidden legend inside a pill hairline enclosure (5px padding, 4px gap). Equal-width labels have 44px minimum height and 10px 12px padding; checked labels use pink wash and signal-deep text. Transparent radios cover the labels and retain native keyboard behavior; focus is drawn on the label. There is no custom hover fill. The annual saving is caption-sized, stacking at 959px and wrapping inline at 699px. The application updates the price in a polite live region and shares the chosen period with every homepage encounter CTA, without taking payment.
- **Navigation:** desktop links are 16px normal weight with a 2px fuchsia underline revealed on hover or current page (220ms easing). Visitor section buttons use muted text until current/hover, a 3px current indicator and pink count badges. Shared mobile navigation uses 53px minimum link rows, hairlines and an explicitly labelled expand/collapse control. Customer login links open `/login` directly; the owner dashboard's secondary account menu remains separate.
- **Owner controls:** desktop Accueil / People / Collaborator buttons have 56px minimum height, muted resting text and a 3px signal current indicator exposed through `aria-current`, without count badges. Mobile Accueil / People / Moi buttons have 54px minimum height and pink-wash/deep-fuchsia current state. The clickable demo work status opens activity; pause uses muted text. White exception summaries use the panel radius, reducing to 20px on mobile. Local outcomes use a pink-wash status panel; narrative rows stay flat with hairlines. Owner inputs/selects inherit pill radii, while textareas use 16px corners; authority selects and permission checkboxes remain native. The cream native conversation dialog uses white/pink bubbles and inherited keyboard focus. A 3s demo-status opacity pulse and 350ms local-result arrival are gated to no reduced-motion preference. This is a scoped extension of the existing family; behavior and implementation boundaries belong in `PRODUCT.md` and the owner surface brief.
- **Public interaction:** Patrick's route reuses fuchsia/white and ink-outline pill actions, white Collaborator bubbles and pink visitor bubbles directly on ivory. Its composer has the panel radius, while meeting inputs retain pills and local summaries use hairlines. Quieter voice and text actions retain visible keyboard focus and at least 44px targets. Demo availability is labelled beside the status; it does not report Patrick's actual presence. Route-only spacing, greeting scale, message padding and reduced-motion-gated status animation live in `src/components/public-collaborator.css` and the public surface brief; simulation and tab-storage boundaries belong in `PRODUCT.md`.
- **Marketing footer:** `site-shell.tsx` and `site-footer.css` compose the dark footer around the white logo and **“Own your intelligence.”** at the dashboard type tier, with a fuchsia encounter CTA. Two compact navigation groups contain guide, pricing, FAQ, Patrick’s public Collaborator, businesses and customer login. The lower hairline row places copyright, four 48px outline social circles and a 48px native language pill across desktop; mobile stacks the controls while keeping navigation in two columns. Social icons are local, monochrome SVGs with accessible names and the verified user-supplied `unitalkai` destinations. Hover fills social controls white/ink; keyboard focus is light fuchsia. English/Français opens equivalent translated routes without a role-dashboard redirect. The tagline stays English with its own language annotation. No preview legal/disclaimer copy is reintroduced.
- **Homepage FAQ:** `marketing-faq.tsx` and its CSS add six native details/summary questions between pricing and the closing action. Desktop pairs a headline/short introduction with hairline-separated questions; mobile stacks them. A shared `name` permits one open question at a time; Enter/Space uses native summary behavior. Plus icons rotate to close cues when open. Questions use the body tier, answers 16px/1.65, and focus inherits fuchsia outlines. Both languages explain purpose, price, subscription compatibility, ownership, hosting and authority without adding unsupported integration claims.
- **Marketing localization:** server route wrappers retain metadata while `marketing-home.tsx`, `marketing-guide.tsx`, `marketing-pricing.tsx`, the encounter and login components accept English/French. `/fr` and its guide/pricing/meet/login children inherit the same composition, typography and assets. Longer French controls wrap naturally; the encounter’s mobile grid uses `minmax(0, 1fr)`. Offer labels are localized from the shared offer constants; preference identifiers and explicit CTA precedence remain unchanged. `marketing-language.ts` owns route equivalence, option labels and localized metadata alternates.
- **Collaborator showcase:** the homepage's “Your public front door” consolidates Patrick's proof: cream copy and a fuchsia public-conversation action on the left, a dark rounded invitation with PC initials/identity and large white/pink quote on the right. On mobile the copy/action precedes the invitation. Patrick’s public alias appears below an ink hairline, with light-accent hover and focus. There is no separate early Patrick showcase in the latest homepage source.
- **Demo chip:** compact outline pill, 12px text, 4px 9px padding and a current-color border. Muted on light, muted-ink on dark, signal-deep in the pink notice. Demo / Démo chips identify simulated work, interactions, role selection and results. Repeated simulation paragraphs, no-send explanations and prototype footer taglines are removed. Concise planned-capability availability and functional validation/voice errors remain.
- **Panels and rows:** white reading panels use light hairlines and no shadow; dark conversation panels use ink-raised and ink-line. Selected decision and person rows use pink wash; unselected decision hover uses ivory-sunk. Selection is also exposed through `aria-pressed`, not color alone.
- **Messages and prompts:** shared chat Collaborator bubbles are white on dark, ivory in the visitor's light conversation; visitor bubbles are pink wash in both. Shared chat padding is 15px 17px 10px, with 16px normal text, a right-aligned 12px caption and directional corners. The homepage's white work artifact contains a pink request; its decorative portrait ribbon retains white/pink bubbles and is `aria-hidden`. Its three rendered 480 × 480 stock portraits display at 80–112px desktop sizes, reduced to one 64px portrait on mobile. Removed photograph/conversation captions stay removed; the work artifacts instead carry visible Demo/Interactive demo labels and local-action boundaries. Retained story-bubble CSS defines a separate, unrendered 18px illustrative variant. Shared prompt chips have outline borders, at least 44px height and a tonal hover; they fill the composer rather than navigate. Patrick's public suggestions instead submit predefined starting requests in the same inline conversation. The circular send action is signal/white and hovers to signal-deep.

Motion stays small and contextual: 200ms button transitions and 220ms link underlines use the existing easing vocabulary. The work delivery uses a 350ms, 6px vertical arrival only with no reduced-motion preference. Retained story-reply CSS defines a 650ms arrival under the same preference gate; it is not rendered on the current homepage. Reduced motion disables transitions and smooth scrolling. The sidecar's eleven self-contained HTML/CSS samples illustrate appearance and CSS states, not React behavior or backend capabilities. The native select and billing examples extend the established WhatsApp–fuchsia system; the radio sample uses checked-state CSS to mirror the application's selected class without requiring React. This prose-only extension preserves the normative frontmatter and `.impeccable/design.json`; older sidecar narrative/samples do not describe the new work artifact or `/meet`, and are not refreshed here.

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

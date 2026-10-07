---
version: 1
slug: "src-app-profile-page-tsx"
primary_target: "src/app/[profile]/page.tsx"
related_targets: ["src/components/public-collaborator.tsx", "src/lib/public-collaborator-demo.ts", "src/components/public-collaborator.css"]
---

# Patrick's public Collaborator

Mode: Operate. English, interaction-first public presence. Visitors speak freely, prepare a meeting or prepare a handoff, within a visibly labelled local demo. Public knowledge stays distinct from Patrick's private workspace.

## Direction contract

THESIS: “Here’s how to interact with me.” The Collaborator is the first experience and prepares the relationship before Patrick joins it.

OWN-WORLD: Inherit Archivo, ivory, black, magenta and pill actions. Editorial scale and generous whitespace replace the former two-column profile-and-chat composition. No enclosing chat-widget card. This is an ordinary extension of the established WhatsApp–fuchsia family, implemented in `src/components/public-collaborator.css`; shared global tokens and typography remain the authority for reusable roles.

STORY: Speak or prepare a meeting first; discover capabilities, Patrick and his companies later. Topics and relevant work invitations return to the same conversation. No Unitalk marketing block.

FIRST VIEWPORT: Patrick’s name, oversized uppercase statement, then the Collaborator’s identity and white greeting. Exactly two main actions, Send a message and Book a meeting; quieter voice affordance and demo availability. No header/navigation, photo, portrait/avatar, banner or biography. Opening a conversation expands this same centered focal point in place. Unitalk appears only as the logo link in the cream footer, without the shared marketing header/footer composition.

FORM: User-pinned final master layout; code-led, no seed required. Mobile preserves the sequence and stacks the two actions. Native inline inputs, local conversational booking and explicitly simulated handoff. A real editorial portrait and verified social URLs are not supplied; never substitute stock people or invented links.

FINISH: Visual direction accepted; final verdict pass scored all four requested behavior corrections resolved and returned SHIP within the frontend-demo scope. Documentation is reconciled. The real editorial Patrick portrait and verified social URLs remain outstanding; any future shipping raster must carry provenance.

## Route-only composition and typography

- The outer container is capped at 1120px with 48px side gutters, reducing to 32px at 959px and 20px at 699px. The first section has a 100svh minimum height; the inline interaction is capped at 640px and centered within it. Its contents remain left-aligned. Opening reveals the same conversation, not a detached overlay or widget.
- The uppercase hero is intentionally oversized: `clamp(3.5rem, 6.7vw, 6rem)` (56–96px), line height 1, tracking −0.04em. At 959px it uses `clamp(3rem, 7.1vw, 4.5rem)` (48–72px); at 699px it uses `clamp(2.4rem, 10.1vw, 4.2rem)` (38.4–67.2px), line height 1.03, without the forced desktop break. Do not apply the shared 80px display or 44px mobile headline ceilings here.
- The white greeting intentionally uses `clamp(1.375rem, 2.2vw, 1.875rem)` (22–30px), line height 1.4, tracking −0.025em, with 28px 32px padding and the panel radius plus a 3px upper-left corner. Mobile keeps 22px text with 24px padding. The first open-log greeting is 22px on desktop and 18px on mobile; ordinary messages retain 16px text.
- Lower “Founder. Builder. Investor.” copy intentionally uses `clamp(3rem, 6.4vw, 5.5rem)` (48–88px), line height 1.05, tracking −0.04em, with Investor in signal-deep. Its mobile override is `clamp(3.25rem, 12vw, 5rem)` (52–80px). These are public-route editorial choices, not new global type tokens.
- Conversation bubbles are flat white/pink on ivory, padded 20px 24px (16px 20px mobile), with directional 3px corners. The log scrolls within a maximum of `min(440px, 50svh)` (45svh mobile). The white composer uses panel corners and 44px mic/send controls; meeting inputs remain pill-shaped. Global keyboard focus is inherited. Thinking/listening opacity animation is gated to no reduced-motion preference; reveal scrolling respects reduced motion.
- Lower sections use hairlines and 100px vertical padding, reducing to 64px at 699px. Capabilities, founder/timeline and topics stack on mobile; the two first-screen actions and booking fields also stack. Conditional work invitations and the labelled away scenario return to the same interaction. There is no Unitalk marketing block or substitute portrait.

## Implemented interaction and simulation truth

- The canonical `/@patrick-chassany` page and its metadata are English. `/@patrick` is a permanent alias redirect; raw `@` and `%40` parameters work for both names, with unknown profiles returning 404. The owner and visitor dashboards remain distinct French experiences, and the existing visitor chat is independent.
- Free-text messages, suggested starting points and topics receive predefined local replies, never connected AI execution. Topics leave the active booking flow and submit a topic request into the same conversation. Available/thinking/listening are labelled demo states; the away scenario does not report Patrick's actual status. Knowledge is public supplied context, distinct from interaction-derived memory and Patrick's private workspace.
- Voice uses browser SpeechRecognition (`en-GB`) for dictation into the editable composer. Visitors review the draft before send. Unsupported browsers, denied permission and recognition/start errors display notices with a written path; no automatic voice send, voice call or spoken reply is implemented.
- Booking collects reason, optional context, an example Paris-time 30-minute slot, name and email. The next three weekdays supply example times, not Patrick's live calendar. Local validation leads to a who/why/context/when summary and reviewable visitor conversation entries. No event or email is sent. Handoff review uses the confirmed meeting's reason/context or the last non-slot visitor request; Prepare handoff retains local context and sends nothing to Patrick.
- Optional `sessionStorage` under `unitalk-patrick-public-demo-v1` keeps up to 80 transcript messages and visitor name for same-tab reload. A returning greeting offers continuation and a last-message excerpt; reveal entry points share transcript restoration, and closing/reopening within the mounted visit keeps context. Clear conversation and the returning greeting's Something else remove the tab transcript/name, reset local interaction state and cancel pending replies/dictation. Browser storage failure is tolerated.
- Transcript continuity is not cross-device, authenticated or persistent backend memory. Booking stage, structured meeting data and handoff state are not restored after reload, even if prior meeting/handoff text remains in the transcript. Name/email fields are for the local preview; there is no connected calendar or delivery backend.
- Real editorial Patrick portrait and verified social URLs are missing assets. The current lower founder section is text-only, and Ask for Patrick's links returns an honest predefined missing-links answer. Never use stock people or fake URLs to fill those gaps.

## Verification and review

`npm.cmd run lint -- src`, `npx.cmd next typegen`, `npx.cmd tsc --noEmit`, `npm.cmd run build` and browser checks passed. Initial-screen checks cover 320/390/768/1024/1280/1440px without horizontal overflow or duplicate IDs. Functional checks cover free text, conditional work, meeting validation/context, local handoff, returning visitors through every entry path, draft/work cleanup and pending-reply cancellation, neutral partnership wording, away preview, topics, unsupported voice and dictated draft, raw/encoded canonical and alias routes, unknown 404 and no runtime exceptions. Captures: `.impeccable/review/public-collaborator-{desktop,mobile}.png`, corresponding hero/conversation files and meeting captures. Two bounded visual rounds; detector produced only advisory route-type exceptions documented above. The review's verdict pass scored its four behavior fixes resolved; it does not verify live AI, microphone permissions on actual devices, calendar, delivery, backend memory or production deployment.

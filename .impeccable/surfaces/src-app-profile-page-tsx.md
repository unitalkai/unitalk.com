---
version: 1
slug: "src-app-profile-page-tsx"
primary_target: "src/app/[profile]/page.tsx"
related_targets: ["src/components/public-collaborator.tsx", "src/components/public-linkedin-tools.tsx", "src/lib/public-collaborator-demo.ts", "src/lib/public-collaborator-language.ts", "src/lib/public-linkedin.ts", "src/components/public-collaborator.css"]
---

# Patrick's public Collaborator

Mode: Operate. English/French public conversation. User confirmed keeping the concurrently introduced single-conversation structure instead of returning to four spaces. Public page only: remove Demo / Démo labels; keep owner/visitor dashboards distinct.

## Direction contract

THESIS: One conversation answers questions and reveals the next relevant tool: meeting or message.

OWN-WORLD: Homepage-derived cream header, Archivo, dark rounded hero, white task workspace, fuchsia pills and ivory/pink messages. Actual Patrick portrait/name own the header. Footer keeps attribution, Compare, LinkedIn and EN/FR controls.

STORY: Ask or select a starting request. For meetings/messages, authenticate a LinkedIn account. Calendly then offers Patrick’s actual calendar; messages use authenticated account details and a configured delivery endpoint. Until configured, explain availability without pretending to authenticate, book or send.

FIRST VIEWPORT: Identity/short introduction and biography left; conversation/greeting/suggestions/composer right. Meeting/message tool opens below the composer. Mobile stacks copy then chat. No sections below the hero; only footer.

FORM: User confirmed the current single-conversation version and selected Calendly plus true LinkedIn account sign-in. Supplied calendar: https://calendly.com/patrick-chassany. LinkedIn application is not configured. Code-led refinement within the pinned visual world.

FINISH: Targeted lint, types, build and detector passed. Desktop/mobile unconfigured-state screenshots inspected; provider/crypto and configured-UI tests use fixtures. Real provider authentication, booking and delivery require setup and are not claimed. Earlier independent four-space SHIP verdict is historical.

## Implementation

- Canonical `/@patrick-chassany` and alias `/@patrick`, raw/encoded @ support and English server metadata retain their route behavior. English/French interface is local; existing authored messages remain unchanged when toggled. Predefined replies remain in `public-collaborator-demo.ts`.
- Actual LinkedIn photo is local `public/images/patrick-chassany.jpg`; source in SOURCES.md and embedded JPEG metadata. Header has name/photo, account acquisition actions and no task menu. Current chat has one composer, four starting requests and no Demo label. Inline tools stay mounted via `hidden` so drafted authenticated messages survive intent/language changes. Clear conversation clears tab transcript/timer/dictation and hides tools; it does not sign out.
- Intent detection reveals booking for call/meeting requests, messaging for message/contact requests, otherwise hides tools. User confirmed this structure after concurrent changes; the prior four-space layout, fake time slots, name/email booking fields and local handoff previews are superseded.
- LinkedIn helper uses server-only env, encrypted state/nonce and session, RS256 signature verification against LinkedIn JWKS, authoritative discovery issuer, audience/time/nonce checks and userinfo subject match. Name/account ID required; verified email optional. No OAuth tokens persist in cookie or client. Same-origin POST enforcement on start/logout/message routes. Signed-in account authenticates a LinkedIn account, not real-world identity and not owner/visitor authorization.
- Unconfigured state disables sign-in and explains configuration pending. Once configured, popup flow opens LinkedIn, validates window/source/origin on completion and refreshes the shared session; popup blocking, cancellation, timeout and provider failures have recovery text. Cookie is HttpOnly/SameSite=Lax, Secure on HTTPS, one-hour expiry. Signup/customer login remain separate existing routes.
- Booking loads `https://calendly.com/patrick-chassany` only after server-confirmed membership and opening the tool. Iframe uses Calendly inline params, selected locale and fuchsia primary color; 720px high, with external fallback. Calendar itself is public and Calendly owns availability/booking/invitations. No client booking-success assertion or synthetic times.
- Message requires server-confirmed session; subject/body and optional visitor-question context replace sender identity fields. Server derives sender, bounds/validates JSON and submits to configured HTTPS webhook. UI reports sent only after endpoint acceptance. Missing recipient config disables send while retaining draft; session expiry/delivery errors preserve work. No LinkedIn direct-message API.
- Tab transcript restoration remains optional and independent; auth uses a separate encrypted cookie. Browser dictation remains reviewed draft, en-GB/fr-FR, stops on language switch. Provider session does not grant private dashboard access.
- `LINKEDIN-SETUP.md` documents required client ID/secret, exact callback URL, random 32-byte base64url session secret and optional HTTPS recipient webhook/token. No actual application credentials, recipient endpoint, account or booking configured in the repo.

## Verification (2026-10-08)

- Lint targets, generated route types, TypeScript and production build pass. Mechanical detector `[]` for public-collaborator.tsx and public-linkedin-tools.tsx. Whitespace check passes.
- Actual application: session endpoint unconfigured/no member, forged cookie rejected, cross-origin POST403, configured-origin start503, unauthenticated message401, invalid callback no session. Current UI at 1440/390/320 shows sign-in configuration state, no fabricated calendar/identity forms or Demo labels, English/French copy and no overflow/runtime exceptions.
- In-memory crypto/provider fixtures: authorization state/nonce match; valid provider-signed token/profile yields encrypted session; wrong state, tampered ciphertext, nonce, issuer, audience, expiry and profile subject reject; transaction cannot act as session, session has no tokens, absent verified email tolerated. No real LinkedIn round trip performed.
- Browser fixtures: authenticated calendar URL/inline iframe, no booking form, authenticated message fields with no self-entered sender, selected-language draft continuity, endpoint response success, server-derived sender expectation and logout removing calendar. Calendly iframe response fixture is not evidence of live widget appearance.
- Screenshots inspected: `C:\Users\pc\AppData\Local\Temp\opencode\linkedin-unconfigured-meeting-{1440,390}.png`. Fixture capture `linkedin-calendar-fixture-mobile.png` establishes containment only, not actual Calendly rendering. Live booking/delivery remains to verify after setup.

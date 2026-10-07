---
version: 1
slug: "src-app-login-page-tsx"
primary_target: "src/app/login/page.tsx"
related_targets: ["src/app/login/login.css", "src/components/site-shell.tsx"]
---

# Customer login

`src/components/customer-login.tsx` now supplies the shared English `/login` and French `/fr/login` composition. Translated unavailable-state copy retains the same unconnected-authentication boundary. The bilingual footer contains official Unitalk social links, the pinned English tagline and equivalent-route switching. Both languages passed checks at 1440, 1280 × 600, 390 and 320px; lint, TypeScript and production build passed.

Mode: Operate. Existing customers reach `/login` directly from the shared header or mobile menu. The user supplied this route. The repository has no authentication service or existing customer endpoint, so the page currently presents an unavailable state without collecting credentials or granting dashboard access.

## Direction contract

THESIS: Customer access is a direct destination, never a role or example-workspace chooser.

OWN-WORLD: Inherit cream, Archivo, fuchsia, hairlines and pill actions from the pinned WhatsApp–fuchsia family.

STORY: Welcome returning customers, explain that sign-in is unavailable, and provide a clear return to the homepage.

FIRST VIEWPORT: Brand and back link above a centered, 560px-wide column. “Welcome back.”, customer-only intent, a restrained unavailable-state section and homepage action. Mobile keeps this reading order without horizontal overflow.

FORM: Precisely scoped customer-entry correction; code-led translation of the incumbent world. No credential form is active until an authentication service is supplied. Route metadata is noindex/nofollow.

FINISH: Verify the header destination, absent workspace chooser, responsive route and truthful unavailable state; document the remaining authentication dependency.

## Verification

Lint, generated route types and TypeScript passed. Browser checks at 1440px, 1280 × 600, 390px and 320px verified direct customer navigation from the header/mobile menu, no role/workspace chooser or credential fields, the unavailable-state heading and working homepage return. No horizontal overflow or runtime exceptions were observed. Authentication remains the outstanding service dependency.

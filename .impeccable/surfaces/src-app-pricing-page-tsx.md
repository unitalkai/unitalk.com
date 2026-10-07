---
version: 1
slug: "src-app-pricing-page-tsx"
primary_target: "src/app/pricing/page.tsx"
related_targets: ["src/components/pricing-hosting.tsx"]
---

# Pricing

The shared composition now lives in `src/components/marketing-pricing.tsx`, rendered by `/pricing` and translated `/fr/pricing`. French price labels (9,99 € / mois and 99 € / an), billing controls, hosting/intelligence labels and CTAs retain the same allowlisted preferences and explicit override precedence. The bilingual shared footer has official social links and equivalent-route switching. Both languages and French pricing-to-encounter preference handoff passed checks at 1440, 1280 × 600, 390 and 320px; lint, TypeScript and production build passed.

Mode: Persuade. One base offer and clear separate choices for intelligence and infrastructure. English page, inherited WhatsApp–fuchsia identity.

## Direction contract

THESIS: One Collaborator subscription, with control over where it runs and which intelligence powers it. Explain the distinction between subscription and AI usage.

OWN-WORLD: Cream ground, normal-weight Archivo headings, a white billing panel, pink radio selection and fuchsia pill actions. Lists and hairlines carry the included features, not a forest of equal cards.

STORY: €9.99/month or €99/year; see the eight included categories, choose credits/API keys/gateway, choose Unitalk Cloud or infrastructure, understand Hermes portability, then meet the Collaborator. The page identifies this as a planned offer without a live checkout.

FIRST VIEWPORT: “Your own AI Collaborator.” and brief value copy beside the reused monthly/yearly offer control. AI usage is explicitly separate. Below are included categories followed by intelligence choices and hosting.

FORM: User-specified offer structure in the existing world. Concrete intelligence CTAs override only their named choice, retaining billing and hosting; generic encounter CTAs retain all selections across marketing-page navigation.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

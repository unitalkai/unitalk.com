# English ownership homepage

## Delivered scope

User-pinned WhatsApp–fuchsia system, English homepage and shared shell variant.
Sequence: WORK → PROOF → MIGRATE → OWN → CONTROL → PRESENCE → PRICE.
Patrick remains a greeting and a public conversation CTA, with no case study.
The French public profile and two demo dashboards remain distinct surfaces.

Hermes is the intended open-source engine, not the product headline. Runtime
deployment and ChatGPT/Claude/OpenClaw history import are explicitly planned.
The proposed offer is €9.99/month or €99/year, with the annual discount described
as two months free. The prototype takes no payment.

## Interaction evidence

- English menu, section order, pricing and intended-capability copy verified.
- Five hosting options and three intelligence options work as native selects.
- A shared preference context retains hosting, intelligence and billing choices
  through every homepage encounter CTA; the server accepts only allowlisted IDs.
- Combined OVH + gateway + annual choice displays all three values in the encounter.
- Invalid query options are ignored; no API keys or payment details are collected.
- Monthly/yearly radio choices update the amount and planned billing preference.
- Mobile navigation and the Privacy/Terms preview disclosures work.
- Raw and encoded `@patrick` aliases redirect to `@patrick-chassany`; unknown
  profiles return 404.
- Dark ownership/footer keyboard focus uses a visible 3px light-fuchsia outline.
- No browser runtime exceptions in the exercised paths.

## Visual evidence

Desktop 1440px and mobile 390px captures; overflow checks at 320, 768 and 1024px.
Use `owned-hero-mobile.png` for the actual mobile photograph; the long-page
capture has the previously identified compositing omission.
Dedicated ownership/pricing screenshots supplement the full-page overviews.

`owned-combined-desktop.png` and `owned-combined-mobile.png` show cumulative
preferences. `owned-focus-footer.png` shows the improved keyboard outline.
The ownership-focus capture is misframed; the CSS and browser-computed
focus-visible color/width establish that correction instead.

## Verification and review

- Application lint, type generation, TypeScript and final production build passed.
- One detector run over the changed UI targets returned `[]`.
- No raster asset added or replaced; existing illustration and provenance retained.
- DESIGN.md and schema-v2 sidecar updated for native selects, billing choices,
  disclosures, shared preferences and light focus on dark surfaces.
- Independent review first requested two fixes: cumulative preferences and dark
  keyboard focus. Both were scored resolved in the verdict pass.
- Final disposition: **ship**, at the scope of those two fixes.

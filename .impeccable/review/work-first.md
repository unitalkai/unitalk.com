# Work-first homepage refinement

User direction: **Votre Collaborateur IA. Il travaille pour vous.**

Sequence implemented: work-first hero and encounter CTA → intended connected
relationship work → Patrick's public Collaborator → ownership. Homepage URL
form, pricing, website/social analogy, early predetermined chat and abstract
brain-change section removed.

CTA: `/dashboard/visiteur?rencontre=1`, with a local name/mission encounter,
optional intended channels and optional public URL source. Actual authentication,
AI, LinkedIn, email, WhatsApp and execution remain unimplemented and labelled.

## Verification

- Application lint, type generation, TypeScript check and production build passed.
- Desktop 1440px, mobile 390px and overflow checks 320px passed.
- Browser checks passed for meeting CTA, required-field validation, mission and
  channel preview, optional source validation, work-first predefined answers,
  retained visitor chat, and response focus/scroll after successful submission.
- One detector run on changed UI targets returned `[]`.
- Existing illustration reused; no new raster asset.

## Finish review

Initial disposition: **fix**. Both targeted issues resolved:
- Mobile response discoverability: result heading gains focus and scrolls into view.
- Mobile photograph: a recognizable in-flow workplace crop is visible below CTA.

Final disposition: **ship**, at this two-fix scope.

`work-home-mobile-viewport.png` is the valid first-screen photographic evidence.
The full-page mobile capture omits the image due to capture compositing; source,
decoded pixel inspection and native viewport screenshot confirm its visibility.

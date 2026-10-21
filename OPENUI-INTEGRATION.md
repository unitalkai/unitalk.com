# Patrick's public profile — Open Intelligent UI

The public `/@patrick-chassany` page uses an adaptation of [Open Intelligent UI](https://github.com/thesysdev/open-intelligent-ui). The user confirmed **interface first** on 2026-10-21.

## Full gallery and upstream starters

The follow-up request imports all **45 upstream gallery examples**, plus the **8 original conversation starters**. Seven starters have no matching handwritten upstream answer (the original app sends those prompts to a model), so `public-intelligent-starter-programs.ts` provides seven additional working local programs. The San Francisco starter uses the original route example. The profile therefore exposes **52 examples**:

- 18 original working tools, including 16 Intelligent UI scenarios and two dashboards;
- 19 original component examples;
- 4 original compositions and 4 original worked prompt examples;
- 7 local starter answers: Lisbon, weekend comparison, vegetarian meal, calculator, handheld Snake, drum pad and trivia.

`open-intelligent-ui` is an npm dependency pinned to the archive for commit `03213439358bf3408ad61a46ec9e3230c5572e48`. Components, styles, functions, sandboxed HTML rendering, demo data and original program strings are imported from its source rather than rewritten. `transpilePackages` compiles the dependency. npm overrides deduplicate its React, React DOM, Next.js and OpenUI runtime with the host app. Check these contracts on upgrades; the upstream project is an application, not a stable component package.

The eight English starter labels and prompts are preserved in `public-intelligent-starters.ts`; their displayed French labels are translated. Original example contents remain English and are marked `lang="en"`. A searchable, categorized disclosure lists every example. Only the selected example runtime is mounted; earlier examples can be reopened. OpenUI variable/form state is retained in the optional tab transcript with a size limit; sandboxed HTML game/audio execution state resets when its iframe is reopened. Example follow-up actions place their request in the composer and explicitly explain that AI-generated edits are not connected.

`public-intelligent-library.ts` retains the full upstream library and adds a numeric conversion function for the calculator. Example code is loaded only from the allowlisted catalog; storage contains IDs and bounded UI state, never arbitrary executable programs. The renderer is loaded on demand. The three same-origin `GET /api/wiki`, `/api/image-search` and `/api/street-route` handlers delegate to the pinned upstream implementations, including their input limits, external-request timeouts, bounded caches and unavailable states. Photographs come from Wikipedia/Wikimedia; map attribution remains visible. The OSRM geometry is a driving-road overview, not walking directions.

The public header now shares **For you / Your team / Your community** navigation. The last two destinations are separate local workspaces documented in `WORKSPACES.md`.

## Integration

- `@openuidev/react-lang` 1.0.1 supplies the real OpenUI Lang renderer, component schemas, library and action runtime.
- `src/components/public-openui-response.tsx` adapts the upstream `defineComponent` / `createLibrary` / `Renderer` pattern. Its scoped library contains `Col`, `Row`, `Text`, `Title`, `Card`, `Button` and a Patrick-specific `Profile` component.
- `src/lib/public-openui.ts` composes handwritten OpenUI programs from the existing reply text and the request's presentation. Arguments are serialized with `JSON.stringify`; visitor text is never interpreted as a program. Profile identity, portrait and external destination are fixed by the application.
- Patrick-specific `@ToAssistant` actions feed the existing conversation. Meeting/message intents reveal the existing LinkedIn-gated tools before the composer. The expanded gallery imports the upstream map/component library; the generic chat shell, model endpoint and upstream chat-storage system are not imported.
- The welcome follows the source project's conversation-first composition, adapted to Unitalk cream, Archivo and fuchsia. Patrick's supplied local photo is retained; its provenance remains in `public/images/SOURCES.md`.
- Response presentation and authored language survive optional tab restoration. Existing transcripts remain readable. Renderer failures retain the plain-text answer. New conversation clears the tab transcript and pending reply without signing out of LinkedIn.
- `public-openui-devtools.ts` uses the upstream application's auto-mount opt-out before importing react-lang, preventing its development overlay on mobile. This is coupled to react-lang 1.0.1's bootstrap flag and should be checked on upgrades. Renderer observability publication is disabled.

## Operational boundary

No API key is needed. Responses remain predefined in `public-collaborator-demo.ts`; no LLM or generated streaming response is connected. LinkedIn authentication and recipient delivery still require the configuration in `LINKEDIN-SETUP.md`. OpenUI buttons do not simulate an authenticated session, a booking or message delivery.

To connect a model later, implement a server endpoint and supply its validated OpenUI output to the scoped renderer. Any additional components or actions must be explicitly registered. Keep credentials server-side and preserve the existing authorization boundary for meeting/message tools.

## Source license

The upstream adaptations and MIT notice are recorded in `THIRD-PARTY-NOTICES.md`.

## Verification

Final production build and TypeScript passed. Full application lint returned no errors and two existing unused-variable warnings in `signup-form.tsx`; changed-file lint was clean. The expanded profile and workspace visual review returned **SHIP at interface-first, local-interactive prototype scope**.

Targeted ESLint, generated Next.js route types, TypeScript and production build. Initial browser checks cover profile and knowledge artifacts, OpenUI follow-up actions, unconfigured LinkedIn gates, EN/FR, transcript restoration, reset, input escaping, draft continuity and canonical/alias/unknown routes. Expanded checks parse all 52 programs without errors or unresolved/orphaned statements and verify all 8 starter mappings. Every example rendered in a browser; calculator arithmetic, trivia scoring, guest changes, origami steps, handheld play/pause, real synthesized drum audio, state restoration and reset were exercised. Catalog coverage uses media-service fixtures; a separate live check returned Wikipedia/Wikimedia photographs and OSRM geometry, loaded all 11 San Francisco example images and created its map canvas. Invalid media-service parameters returned 400. No real provider authentication, booking or delivery was exercised.

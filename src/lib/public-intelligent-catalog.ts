import { toolPrograms } from "open-intelligent-ui/src/app/gallery/tool-programs";
import { compositionPrograms } from "open-intelligent-ui/src/app/gallery/composition-programs";
import { programs } from "open-intelligent-ui/src/app/gallery/programs";
import { exampleDashboard, exampleShoppingList, exampleSteps, exampleTrip } from "open-intelligent-ui/src/lib/prompt-options";
import { starterPrograms } from "./public-intelligent-starter-programs";

export const intelligentGroups = [
  { id: "tools", title: "Working tools", fr: "Outils interactifs", examples: toolPrograms },
  { id: "starters", title: "Starter experiences", fr: "Suggestions de conversation", examples: starterPrograms },
  { id: "composition", title: "Composition", fr: "Compositions", examples: compositionPrograms },
  { id: "components", title: "Components", fr: "Composants", examples: programs },
  { id: "worked", title: "Worked examples", fr: "Exemples du guide", examples: [
    { id: "example-list", title: "Shopping list", note: "The upstream shopping-list prompt example.", code: exampleShoppingList },
    { id: "example-trip", title: "A composed trip", note: "The upstream itinerary prompt example.", code: exampleTrip },
    { id: "example-steps", title: "Steps with drawings", note: "The upstream SVG instructions example.", code: exampleSteps },
    { id: "example-dashboard", title: "Query-backed dashboard", note: "The upstream dashboard over sample data.", code: exampleDashboard },
  ] },
];

export const intelligentExamples = intelligentGroups.flatMap(group => group.examples.map(example => ({ ...example, group: group.id, prompt: "prompt" in example ? String(example.prompt) : example.title })));
export function getIntelligentExample(id: string) { return intelligentExamples.find(example => example.id === id); }

// Exact English labels/prompts from the pinned upstream src/app/page.tsx.
// Its starters normally call a model; these IDs select working local examples.
export const intelligentStarters = [
  { id: "route", label: "Plan a day out", fr: "Organiser une journée", prompt: "I'm in San Francisco for a day, plan a sightseeing route for me", icon: "map" },
  { id: "starter-lisbon", label: "Explore a city", fr: "Explorer une ville", prompt: "Plan a relaxed afternoon exploring Lisbon, with three stops and a map", icon: "compass" },
  { id: "starter-weekend", label: "Find weekend ideas", fr: "Trouver des idées de week-end", prompt: "Help me find a weekend getaway from San Francisco. Compare three destinations", icon: "tent" },
  { id: "starter-meal", label: "Plan a meal", fr: "Préparer un repas", prompt: "Help me plan a simple vegetarian dinner for six people", icon: "meal" },
  { id: "starter-calculator", label: "Build a calculator", fr: "Créer une calculatrice", prompt: "Build me a working calculator app with a display and keypad", icon: "calculator" },
  { id: "starter-gameboy", label: "Play on a Game Boy", fr: "Jouer sur une Game Boy", prompt: "Make a playable Game Boy-style handheld game with a screen, D-pad and A/B buttons", icon: "game" },
  { id: "starter-drums", label: "Jam on a drum pad", fr: "Jouer de la batterie", prompt: "Make a drum pad I can play, with a few pads and a beat counter", icon: "drum" },
  { id: "starter-trivia", label: "Take a trivia quiz", fr: "Faire un quiz", prompt: "Quiz me with five fun trivia questions and keep score", icon: "brain" },
] as const;

export function findIntelligentStarter(text: string) {
  const query = text.trim().toLocaleLowerCase();
  return intelligentStarters.find(starter => [starter.prompt, starter.label, starter.fr].some(value => value.toLocaleLowerCase() === query));
}

export const WORK_EXAMPLES = [
  {
    id: "follow-up",
    label: "Follow up",
    mission: "Prepare my follow-ups",
    request: "Keep the conversation moving after my meetings.",
    title: "A follow-up, ready to review.",
    context: "Example meeting · a potential collaboration",
    subject: "A clear next step",
    draft: "Thanks for the conversation. Shall we define the scope and priorities for a first project together next week?",
    boundary: "I’ll wait for your approval before sending.",
    result: "Follow-up approved.",
  },
  {
    id: "opportunity",
    label: "Qualify a lead",
    mission: "Qualify my opportunities",
    request: "Help me decide which opportunities deserve a conversation.",
    title: "An opportunity, with the gaps filled in.",
    context: "Example enquiry · a new potential client",
    subject: "Three questions before we meet",
    draft: "Thanks for reaching out. What outcome are you aiming for, what’s your timeline and who will be involved in the decision? That will help us prepare a useful conversation.",
    boundary: "I can prepare the questions. You decide whether to proceed.",
    result: "Qualification draft approved.",
  },
  {
    id: "meeting",
    label: "Prepare a meeting",
    mission: "Prepare my meetings",
    request: "Make sure I walk into every meeting with a clear next step.",
    title: "A meeting brief, without the scramble.",
    context: "Example meeting · a first project discussion",
    subject: "Your conversation brief",
    draft: "Goal: agree on a useful first project.\n\nAsk: What matters most? What would success look like? What constraints should we know?\n\nLeave with: one owner, one next step and a date to reconnect.",
    boundary: "The brief is ready. Commitments stay yours to make.",
    result: "Meeting brief approved.",
  },
] as const;

export type WorkExampleId = (typeof WORK_EXAMPLES)[number]["id"];

const frenchExamples = {
  "follow-up": { label: "Préparer un suivi", mission: "Préparer mes suivis", request: "Garder le fil après mes rendez-vous.", title: "Un suivi, prêt à relire.", context: "Rendez-vous d’exemple · une collaboration possible", subject: "Un prochain pas clair", draft: "Merci pour notre échange. Pourrions-nous définir ensemble le périmètre et les priorités d’un premier projet la semaine prochaine ?", boundary: "J’attends votre accord avant d’envoyer.", result: "Suivi approuvé." },
  opportunity: { label: "Qualifier une piste", mission: "Qualifier mes opportunités", request: "M’aider à choisir les opportunités qui méritent un échange.", title: "Une opportunité, avec le bon contexte.", context: "Demande d’exemple · un client potentiel", subject: "Trois questions avant notre échange", draft: "Merci de nous avoir contactés. Quel résultat recherchez-vous, quel est votre calendrier et qui participera à la décision ? Cela nous aidera à préparer un échange utile.", boundary: "Je prépare les questions. Vous décidez de la suite.", result: "Brouillon de qualification approuvé." },
  meeting: { label: "Préparer un rendez-vous", mission: "Préparer mes rendez-vous", request: "Arriver à chaque rendez-vous avec un prochain pas clair.", title: "Un rendez-vous préparé, sans précipitation.", context: "Rendez-vous d’exemple · un premier projet", subject: "Votre préparation d’entretien", draft: "Objectif : définir un premier projet utile.\n\nQuestions : Qu’est-ce qui compte le plus ? À quoi ressemble la réussite ? Quelles contraintes faut-il connaître ?\n\nRepartir avec : un responsable, un prochain pas et une date pour se retrouver.", boundary: "La préparation est prête. Les engagements restent les vôtres.", result: "Préparation de rendez-vous approuvée." },
};

export function getWorkExample(id?: string, language: "en" | "fr" = "en") {
  const example = WORK_EXAMPLES.find(example => example.id === id) ?? WORK_EXAMPLES[0];
  return language === "fr" ? { ...example, ...frenchExamples[example.id] } : example;
}

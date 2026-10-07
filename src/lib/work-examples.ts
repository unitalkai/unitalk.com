export const WORK_EXAMPLES = [
  {
    id: "follow-up", label: "An enquiry", mission: "Prepare replies to incoming enquiries",
    sender: "Incoming enquiry", request: "We’d like to discuss a first project. Could you tell us what you need to get started?",
    title: "A reply, ready to review.", context: "Example contact form · a potential client",
    classification: "New enquiry · needs a reply", record: "Contact reference and enquiry summary prepared",
    nextStep: "Clarify the scope and prepare a first conversation",
    subject: "A useful first reply",
    draft: "Thanks for reaching out. What would you like to achieve, and what’s your timeline? With that context, we can prepare a useful first conversation.",
    boundary: "You approve the reply. I keep the next step ready.", result: "Reply approved.",
  },
  {
    id: "opportunity", label: "A prospect calls", mission: "Prepare prospect callbacks and follow-ups",
    sender: "Incoming call", request: "I’m looking for a way to follow up with our prospects. Could someone call me back this afternoon?",
    title: "A callback, with the context.", context: "Example call · a prospect requesting a callback",
    classification: "Sales enquiry · callback requested", record: "Contact reference and opportunity note prepared",
    nextStep: "Confirm a callback time and clarify the need",
    subject: "Your callback brief",
    draft: "Reason: the prospect wants a better way to follow up with leads.\n\nAsk: How do you handle follow-ups today? What gets missed? Who will use it?\n\nNext step: agree on a useful first conversation and record the outcome.",
    boundary: "The call brief is prepared. Calling requires your permission.", result: "Callback brief approved.",
  },
  {
    id: "support", label: "A customer needs help", mission: "Prepare replies to customer support requests",
    sender: "Customer message", request: "I can’t access my account. I’ve tried resetting my password, but the email hasn’t arrived.",
    title: "A support request, with a next step.", context: "Example customer message · account access",
    classification: "Support · access blocked", record: "Customer context and support note prepared",
    nextStep: "Check the account reference and route unresolved access to support",
    subject: "A reply that moves it forward",
    draft: "Thanks for letting us know. Please check your spam folder and confirm the email address used for your account. Don’t share your password. If the reset email still hasn’t arrived, we’ll pass the account reference and what you’ve already tried to support.",
    boundary: "You approve the reply. Account changes stay with authorised support.", result: "Support reply approved.",
  },
] as const;

export type WorkExampleId = (typeof WORK_EXAMPLES)[number]["id"];

const frenchExamples = {
  "follow-up": {
    label: "Une demande arrive", mission: "Préparer les réponses aux demandes entrantes",
    sender: "Demande entrante", request: "Nous aimerions discuter d’un premier projet. De quoi avez-vous besoin pour commencer ?",
    title: "Une réponse, prête à relire.", context: "Formulaire d’exemple · un client potentiel",
    classification: "Nouvelle demande · réponse à préparer", record: "Référence du contact et résumé de la demande préparés",
    nextStep: "Préciser le périmètre et préparer un premier échange",
    subject: "Une première réponse utile",
    draft: "Merci de nous avoir contactés. Quel résultat souhaitez-vous obtenir et quel est votre calendrier ? Avec ce contexte, nous pourrons préparer un premier échange utile.",
    boundary: "Vous approuvez la réponse. Je garde le prochain pas prêt.", result: "Réponse approuvée.",
  },
  opportunity: {
    label: "Un prospect appelle", mission: "Préparer les rappels et suivis des prospects",
    sender: "Appel entrant", request: "Je cherche une façon de mieux suivre nos prospects. Pourriez-vous me rappeler cet après-midi ?",
    title: "Un rappel, avec le contexte.", context: "Appel d’exemple · un prospect à rappeler",
    classification: "Demande commerciale · rappel demandé", record: "Référence du contact et note d’opportunité préparées",
    nextStep: "Confirmer l’heure du rappel et préciser le besoin",
    subject: "Votre préparation d’appel",
    draft: "Motif : le prospect souhaite mieux suivre ses pistes commerciales.\n\nQuestions : Comment gérez-vous les suivis aujourd’hui ? Qu’est-ce qui se perd ? Qui utilisera la solution ?\n\nProchain pas : convenir d’un premier échange utile et consigner le résultat.",
    boundary: "La préparation est prête. Appeler nécessite votre permission.", result: "Préparation de rappel approuvée.",
  },
  support: {
    label: "Un client a besoin d’aide", mission: "Préparer les réponses aux demandes de support",
    sender: "Message client", request: "Je n’arrive pas à accéder à mon compte. J’ai demandé à réinitialiser mon mot de passe, mais l’email n’arrive pas.",
    title: "Une demande de support, avec une suite.", context: "Message client d’exemple · accès au compte",
    classification: "Support · accès bloqué", record: "Contexte client et note de support préparés",
    nextStep: "Vérifier la référence du compte et transmettre au support si nécessaire",
    subject: "Une réponse pour avancer",
    draft: "Merci de nous avoir prévenus. Vérifiez votre dossier de courriers indésirables et confirmez l’adresse email utilisée pour votre compte. Ne partagez pas votre mot de passe. Si l’email de réinitialisation n’arrive toujours pas, nous transmettrons au support la référence du compte et les vérifications déjà effectuées.",
    boundary: "Vous approuvez la réponse. Les modifications du compte restent au support autorisé.", result: "Réponse de support approuvée.",
  },
};

export function getWorkExample(id?: string, language: "en" | "fr" = "en") {
  const example = WORK_EXAMPLES.find(example => example.id === id) ?? WORK_EXAMPLES[0];
  return language === "fr" ? { ...example, ...frenchExamples[example.id] } : example;
}

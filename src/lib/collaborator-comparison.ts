export type ComparisonCriterion = "work" | "context" | "contacts" | "control";

export const COMPARISON_CRITERIA = [
  { id: "work", en: { label: "Work", question: "What work can I delegate?" }, fr: { label: "Travail", question: "Quel travail puis-je lui confier ?" } },
  { id: "context", en: { label: "Context", question: "What context does it keep?" }, fr: { label: "Contexte", question: "Quel contexte conserve-t-il ?" } },
  { id: "contacts", en: { label: "Contacts", question: "How does it interact with my contacts?" }, fr: { label: "Contacts", question: "Comment interagit-il avec mes contacts ?" } },
  { id: "control", en: { label: "Control", question: "Which decisions stay with me?" }, fr: { label: "Contrôle", question: "Quelles décisions restent entre mes mains ?" } },
] as const;

export const COMPARISON_PRODUCTS: {
  name: string;
  source: string;
  en: Record<ComparisonCriterion, string>;
  fr: Record<ComparisonCriterion, string>;
}[] = [
  {
    name: "ChatGPT Dots", source: "https://chatgpt.com/features/dots/",
    en: {
      work: "Ongoing responsibilities, research, documents and projects. Dots can keep working between conversations on their own cloud computers.",
      context: "Starts from ChatGPT memory and uses connected apps. Instructions and feedback guide ongoing work.",
      contacts: "Works in ChatGPT, Slack and Teams. Connected tools can support sharing work and coordinating with other people.",
      control: "Choose app access and custom rules: allow an action, require approval or block it. Review work, redirect or pause.",
    },
    fr: {
      work: "Responsabilités suivies, recherches, documents et projets. Dots peut continuer à travailler entre les conversations sur son ordinateur cloud.",
      context: "S’appuie sur la mémoire ChatGPT et les applications connectées. Vos consignes et retours orientent le travail dans la durée.",
      contacts: "Disponible dans ChatGPT, Slack et Teams. Les outils connectés permettent de partager le travail et de coordonner les échanges.",
      control: "Choisissez les accès et les règles : autoriser une action, demander une validation ou la bloquer. Vous pouvez réorienter ou mettre en pause.",
    },
  },
  {
    name: "Claude Cowork", source: "https://claude.com/product/cowork",
    en: {
      work: "Research, analysis, file organization and document creation across folders and connected tools. Recurring tasks can run on a schedule.",
      context: "Uses the files, knowledge, connectors and skills you provide. Plugins can tailor it to a role or workflow.",
      contacts: "Can prepare sales research and meeting material from connected sources. Actions in other apps depend on the available tools and permissions.",
      control: "Choose folders and tools, follow the steps and stop or redirect work. Permission settings govern significant actions; deletion needs approval.",
    },
    fr: {
      work: "Recherche, analyse, classement de fichiers et création de documents dans vos dossiers et outils connectés. Les tâches récurrentes peuvent être planifiées.",
      context: "Utilise les fichiers, connaissances, connecteurs et compétences fournis. Des plugins l’adaptent à un métier ou à un processus.",
      contacts: "Peut préparer une recherche commerciale et des documents de rendez-vous. Les actions dans vos applications dépendent des outils et permissions disponibles.",
      control: "Choisissez les dossiers et outils, suivez les étapes, arrêtez ou réorientez le travail. Les actions importantes dépendent des permissions ; supprimer nécessite votre accord.",
    },
  },
  {
    name: "Gemini Spark", source: "https://gemini.google/overview/agent/spark/?hl=en",
    en: {
      work: "Multi-step background tasks, inbox organization, research and scheduled work across Google apps, including Gmail, Calendar and Drive.",
      context: "Uses connected apps and Personal Intelligence. Reusable skills capture how you want recurring tasks handled.",
      contacts: "Can draft or send emails, organize meeting time and extract leads into Sheets, depending on enabled connections and access.",
      control: "Connections are off by default. You enable access, direct the work and review major actions; availability varies by plan and country.",
    },
    fr: {
      work: "Tâches en plusieurs étapes, organisation des emails, recherches et travail planifié dans les applications Google, dont Gmail, Agenda et Drive.",
      context: "Utilise les applications connectées et Personal Intelligence. Des compétences réutilisables retiennent vos consignes pour les tâches récurrentes.",
      contacts: "Peut préparer ou envoyer des emails, organiser des créneaux et extraire des prospects dans Sheets, selon les connexions et accès activés.",
      control: "Les connexions sont désactivées par défaut. Vous activez les accès, guidez le travail et validez les actions importantes ; disponibilité selon le forfait et le pays.",
    },
  },
  {
    name: "Meta Muse", source: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
    en: {
      work: "Personal tasks and longer-term goals, including emails, travel and browser actions. Work continues after the app is closed.",
      context: "Learns from conversations and remembers preferences and details. You can ask it to forget what it has learned.",
      contacts: "You can talk to Muse in its app or WhatsApp. Connected services let it send emails or coordinate tasks on your behalf.",
      control: "Choose connected services and read/send access. Sensitive actions need approval, and an audit trail shows completed and planned work.",
    },
    fr: {
      work: "Tâches personnelles et objectifs suivis : emails, voyages et actions dans un navigateur. Le travail continue après la fermeture de l’application.",
      context: "Apprend des conversations et retient préférences et détails. Vous pouvez lui demander d’oublier ce qu’il a appris.",
      contacts: "Vous échangez avec Muse dans son application ou WhatsApp. Les services connectés lui permettent d’envoyer des emails ou de coordonner des tâches pour vous.",
      control: "Choisissez les services et les droits de lecture ou d’envoi. Les actions sensibles demandent une validation ; un historique montre le travail réalisé et prévu.",
    },
  },
  {
    name: "Delos AI Workers", source: "https://www.delos.so/",
    en: {
      work: "Specialized workers for marketing, development, finance and other functions. Delegated tasks run through connected business tools.",
      context: "Delos describes workers with their own skills, personality and persistent memory, grounded in connected company data.",
      contacts: "Workers use connected tools such as Gmail, HubSpot or Salesforce and communicate through channels including Slack and Teams.",
      control: "Configure each worker’s access and permissions. Check the approval behavior for the particular worker and integration you choose.",
    },
    fr: {
      work: "Workers spécialisés en marketing, développement, finance et autres métiers. Les tâches confiées s’appuient sur des outils professionnels connectés.",
      context: "Delos décrit des workers avec compétences, personnalité et mémoire persistante, alimentés par les données de l’entreprise.",
      contacts: "Utilisent des outils connectés comme Gmail, HubSpot ou Salesforce, avec des échanges notamment dans Slack et Teams.",
      control: "Configurez les accès et permissions de chaque worker. Vérifiez les validations propres au worker et à l’intégration choisis.",
    },
  },
  {
    name: "Dust", source: "https://dust.tt/",
    en: {
      work: "Shared agents for team workflows: research, proposals, support triage and CRM hygiene across connected company systems.",
      context: "Brings together company knowledge from tools such as Slack, Drive, Notion and Salesforce. Supports reusable skills and multiple model providers.",
      contacts: "Sales and support workflows can use customer records, log emails and next steps, or draft context-aware replies through configured tools.",
      control: "Separate permissions for agent access and who can use it, with admin controls, human review, audit logs and usage monitoring.",
    },
    fr: {
      work: "Agents partagés pour le travail d’équipe : recherches, propositions, tri du support et suivi CRM dans les systèmes connectés de l’entreprise.",
      context: "Réunit les connaissances de Slack, Drive, Notion ou Salesforce. Propose des compétences réutilisables et plusieurs fournisseurs de modèles.",
      contacts: "Les processus commerciaux et de support peuvent exploiter les fiches clients, consigner emails et prochaines étapes ou préparer des réponses contextualisées.",
      control: "Permissions distinctes pour les accès de l’agent et ses utilisateurs, avec contrôles administrateur, revue humaine, journaux d’audit et suivi d’usage.",
    },
  },
  {
    name: "ElevenLabs · ElevenAgents", source: "https://elevenlabs.io/agents",
    en: {
      work: "Customer-facing voice and chat workflows: support, lead qualification, scheduling and operational tasks.",
      context: "Uses configured knowledge, conversation history and data from connected CRM, ticketing and calendar systems.",
      contacts: "Deployed on phone, web and messaging channels, including WhatsApp and email. Communication is central to the offering.",
      control: "Configure tools, workflows and guardrails; test with simulations and monitor transcripts and outcomes. Human handoff depends on your setup.",
    },
    fr: {
      work: "Parcours clients par voix et chat : support, qualification de prospects, prise de rendez-vous et tâches opérationnelles.",
      context: "Utilise les connaissances configurées, l’historique des conversations et les données de CRM, support et agendas connectés.",
      contacts: "Déployable par téléphone, sur le web et en messagerie, dont WhatsApp et email. La communication est au cœur de l’offre.",
      control: "Configurez outils, processus et limites ; testez par simulation et suivez les conversations et résultats. La reprise humaine dépend de votre configuration.",
    },
  },
];

export const COMPARISON_SUPPORTING_TOOLS = [
  { name: "Intercom · Fin", source: "https://fin.ai/", en: "Customer service and sales, with customer context, connected actions and human handoff.", fr: "Service client et vente, avec contexte client, actions connectées et reprise humaine." },
  { name: "Zendesk AI agents", source: "https://www.zendesk.com/service/ai/ai-agents/", en: "Multi-step service requests across messaging, email and voice, governed by business policies.", fr: "Demandes de service en plusieurs étapes par messagerie, email et voix, selon les règles de l’entreprise." },
  { name: "Calendly", source: "https://calendly.com/features", en: "Scheduling, reminders and routing, alongside meeting notes, contact tools and its Callie AI offering.", fr: "Planification, rappels et orientation, avec notes de réunion, outils de contacts et son offre IA Callie." },
] as const;

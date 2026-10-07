export type DecisionId = "sarah" | "acme" | "david";
export type AuthorityLevel = "do" | "ask" | "never";
export type ActivityKind = "conversations" | "meetings" | "actions";

export const meetingSlots = ["Jeudi · 10 h", "Jeudi · 14 h", "Vendredi · 9 h"];

export const ownerDecisions = [
  { id: "sarah" as const, name: "Sarah Martin", initials: "SM", reason: "Un choix de créneau", title: "Déplacer le rendez-vous de demain ?", summary: "Sarah souhaite reporter votre rendez-vous à jeudi.", prepared: "J’ai trouvé trois créneaux possibles. À vous de choisir.", context: "Sarah évalue Unitalk pour son agence. Vous avez échangé deux fois ce mois-ci et ce rendez-vous doit préciser ses besoins.", recommendation: "Jeudi · 14 h", why: "Dans cet exemple, vous êtes tous les deux disponibles. Sarah a déjà indiqué qu’elle préférait les après-midi.", canDo: "Confirmer le créneau à Sarah et mettre à jour le calendrier.", action: "Confirmer le rendez-vous" },
  { id: "acme" as const, name: "Acme", initials: "AC", reason: "Votre accord", title: "Donner suite à la proposition d’Acme ?", summary: "Acme vous a envoyé une proposition de partenariat.", prepared: "Je l’ai relue. J’ai besoin de votre accord avant de répondre.", context: "Acme envisage de proposer Unitalk à ses clients. Jean Dupont est votre interlocuteur. La proposition porte sur un pilote de quatre semaines, sans engagement financier à ce stade.", recommendation: "Accepter un échange sur le pilote, sans s’engager sur le contrat.", why: "Le pilote permettrait de vérifier les besoins. Les conditions commerciales et toute signature restent de votre ressort.", canDo: "Envoyer le brouillon que vous approuvez et proposer un échange.", action: "Approuver la réponse" },
  { id: "david" as const, name: "David Cohen", initials: "DC", reason: "Une information manque", title: "Que souhaitez-vous partager avec David ?", summary: "David vous demande vos priorités pour les six prochains mois.", prepared: "Cette réponse vous appartient. Je peux m’occuper de la suite.", context: "David suit Unitalk en tant qu’investisseur. Il souhaite comprendre vos priorités avant votre prochain échange. Je connais le contexte de la relation, mais pas votre décision personnelle.", recommendation: "Partager vos priorités en quelques mots. Je préparerai la réponse autour de votre intention.", why: "Je ne dois pas inventer votre stratégie ni prendre un engagement en votre nom.", canDo: "Transmettre votre réponse telle que vous l’avez validée.", action: "Valider et transmettre" },
];

export const proposalDraft = "Bonjour Jean,\n\nMerci pour la proposition. Le principe d’un pilote de quatre semaines me paraît intéressant. Je vous propose un échange pour préciser le périmètre et les critères de réussite.\n\nLes modalités commerciales et tout engagement contractuel seront discutés et validés séparément.\n\nPatrick";

export const ownerPeople = [
  { id: "sarah", name: "Sarah Martin", initials: "SM", role: "Prospect", state: "Active", channel: "LinkedIn", first: "Mars 2026", last: "Aujourd’hui", next: "Choisir un créneau", context: "Sarah évalue Unitalk pour son agence. Vous avez parlé deux fois ce mois-ci. Elle veut comprendre comment un Collaborator pourrait suivre ses échanges avec ses clients.", handling: "Je garde le fil de nos échanges et prépare le prochain rendez-vous.", messages: [{ author: "Sarah", text: "Pourrions-nous déplacer notre rendez-vous à jeudi ?" }, { author: "Collaborator", text: "Je regarde les créneaux possibles avec Patrick. Je reviens vers vous avec une confirmation." }, { author: "Sarah", text: "L’après-midi serait idéal, merci !" }] },
  { id: "jean", name: "Jean Dupont", initials: "JD", role: "Client", state: "Actif", channel: "Email", first: "Janvier 2026", last: "Hier", next: "Faire le point vendredi", context: "Jean utilise Unitalk dans son équipe. Son dernier échange portait sur la préparation des suivis après les rendez-vous. Le point de vendredi permettra de recueillir ses retours.", handling: "J’ai résumé ses questions et préparé les points à aborder vendredi.", messages: [{ author: "Jean", text: "Peut-on faire le point vendredi sur les suivis de notre équipe ?" }, { author: "Collaborator", text: "Bien sûr. J’ai regroupé vos questions pour préparer cet échange avec Patrick." }] },
  { id: "david", name: "David Cohen", initials: "DC", role: "Investisseur", state: "À suivre", channel: "Email", first: "Février 2026", last: "Aujourd’hui", next: "Partager vos priorités", context: "David suit le développement de Unitalk. Il souhaite connaître vos priorités pour les six prochains mois avant de reprendre la conversation.", handling: "Je vous laisse la parole sur la stratégie. Je reprendrai le suivi après votre réponse.", messages: [{ author: "David", text: "Quelles sont tes priorités pour les six prochains mois ?" }, { author: "Collaborator", text: "Je transmets la question à Patrick pour qu’il vous réponde avec ses propres priorités." }] },
  { id: "acme", name: "Acme", initials: "AC", role: "Entreprise", state: "Opportunité", channel: "Email", first: "Avril 2026", last: "Aujourd’hui", next: "Valider la réponse au partenariat", context: "Acme envisage un partenariat pour proposer Unitalk à ses clients. Jean Dupont coordonne un premier pilote. Leur proposition est prête à être discutée, sans engagement signé.", handling: "J’ai relu la proposition et préparé une réponse. J’attends votre accord.", messages: [{ author: "Acme", text: "Voici notre proposition pour un pilote de quatre semaines. Qu’en pensez-vous ?" }, { author: "Collaborator", text: "Merci, j’ai bien reçu votre proposition. Patrick revient vers vous après relecture." }] },
];
export type OwnerPerson = (typeof ownerPeople)[number];

export type OwnerActivity = { id: string; time: string; day: "Aujourd’hui" | "Hier"; title: string; channel: string; kind: ActivityKind; person?: string; detail: string };
export const initialActivity: OwnerActivity[] = [
  { id: "a1", time: "09:18", day: "Aujourd’hui", title: "J’ai relancé Acme.", channel: "Email", kind: "conversations", person: "acme", detail: "J’ai repris le fil de la proposition de partenariat et demandé les précisions utiles au pilote." },
  { id: "a2", time: "08:51", day: "Aujourd’hui", title: "J’ai repéré une nouvelle opportunité.", channel: "LinkedIn", kind: "actions", detail: "Une conversation d’exemple concerne le suivi des relations en agence. J’ai préparé le contexte pour un prochain échange." },
  { id: "a3", time: "08:32", day: "Aujourd’hui", title: "J’ai repris le contexte de David.", channel: "Email", kind: "actions", person: "david", detail: "J’ai regroupé ses dernières questions et identifié celle qui a besoin de votre réponse personnelle." },
  { id: "a4", time: "17:32", day: "Hier", title: "J’ai organisé le point avec Jean.", channel: "Calendrier", kind: "meetings", person: "jean", detail: "Un point vendredi avec Jean." },
];

export const initialAuthority: { id: string; label: string; level: AuthorityLevel }[] = [
  { id: "inbound", label: "Traiter les demandes entrantes", level: "do" },
  { id: "meetings", label: "Organiser les rendez-vous", level: "ask" },
  { id: "followup", label: "Relancer une conversation", level: "do" },
  { id: "qualify", label: "Qualifier une opportunité", level: "do" },
  { id: "commitments", label: "Prendre un engagement important", level: "ask" },
  { id: "proposals", label: "Répondre à une proposition commerciale", level: "ask" },
  { id: "sensitive", label: "Traiter une conversation sensible", level: "ask" },
  { id: "legal", label: "Envoyer un engagement juridique", level: "never" },
  { id: "money", label: "Dépenser de l’argent", level: "never" },
  { id: "personal", label: "Prendre une décision personnelle", level: "never" },
];
export const authorityZones = [{ id: "do" as const, label: "DO IT", description: "Je peux agir sans vous demander." }, { id: "ask" as const, label: "ASK ME", description: "Je vous demande avant d’agir." }, { id: "never" as const, label: "NEVER DO IT", description: "Je ne franchis pas cette limite." }];

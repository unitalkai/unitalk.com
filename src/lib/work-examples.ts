export const WORK_EXAMPLES = [
  {
    id: "follow-up",
    label: "Follow up",
    mission: "Prepare my follow-ups",
    request: "Keep the conversation moving after my meetings.",
    title: "A follow-up, ready to review.",
    context: "Example meeting · a potential collaboration",
    subject: "A clear next step",
    draft: "Thanks for the conversation. Here’s the next step we discussed: a short session to define the scope, priorities and what a useful first project would look like. Does next week work for you?",
    boundary: "I’ll wait for your approval before sending.",
    result: "Follow-up approved in this demo. Nothing was sent.",
  },
  {
    id: "opportunity",
    label: "Qualify a lead",
    mission: "Qualify my opportunities",
    request: "Help me decide which opportunities deserve a conversation.",
    title: "An opportunity, with the gaps filled in.",
    context: "Example enquiry · a new potential client",
    subject: "Three questions before we meet",
    draft: "Thanks for reaching out. To make our conversation useful, could you share the outcome you’re aiming for, your timeline and who will be involved in the decision? I’ll use that to prepare a focused discussion.",
    boundary: "I can prepare the questions. You decide whether to proceed.",
    result: "Qualification draft approved in this demo. Nothing was sent.",
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
    result: "Meeting brief approved in this demo. No meeting was booked.",
  },
] as const;

export type WorkExampleId = (typeof WORK_EXAMPLES)[number]["id"];

export function getWorkExample(id?: string) {
  return WORK_EXAMPLES.find(example => example.id === id) ?? WORK_EXAMPLES[0];
}

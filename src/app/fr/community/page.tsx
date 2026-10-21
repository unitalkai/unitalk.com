import { SharedWorkspace } from "@/components/shared-workspace";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = marketingMetadata("/community", "fr", "Your community — Un forum pour votre audience", "Rassemblez votre audience dans un groupe de discussion avec un Collaborateur IA pour la modération, la veille et les réponses aux membres. Explorez l’exemple d’une créatrice de contenu.");
export default function CommunityPage() { return <SharedWorkspace key="community-fr" mode="community" language="fr" />; }

import { localizedOffer } from "@/lib/marketing-language";
import { Icon } from "./icons";
import "./trial-details.css";

export function TrialDetails({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const offer = localizedOffer(language);
  return <details className="trial-details"><summary>{fr ? "Détails de l’essai" : "Trial details"}<Icon name="plus" width="16" height="16" /></summary><div><p>{offer.trial}</p><p>{fr ? "L’usage de l’IA est distinct de l’abonnement Collaborateur. Les modèles éligibles, le décompte des tokens et leur durée de validité restent à préciser." : "AI usage is separate from the Collaborator subscription. Eligible models, token counting and allowance expiry are still to be specified."}</p></div></details>;
}

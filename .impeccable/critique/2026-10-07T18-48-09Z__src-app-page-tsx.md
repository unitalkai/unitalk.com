---
target: homepage
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\pc\\Documents\\My Web Sites\\WebSite1\\unitalk.com\\src\\app\\page.tsx"
target_fingerprint: "sha256:212ef89554cc26377c54a54302714579c29cf649fd475a1367fb7ccb4f692d24"
target_path: "C:\\Users\\pc\\Documents\\My Web Sites\\WebSite1\\unitalk.com\\src\\app\\page.tsx"
timestamp: 2026-10-07T18-48-09Z
slug: src-app-page-tsx
---
Méthode : deux évaluations indépendantes (A : ses_ee8565df0ffeEY7b1jF2s22L2j · B : ses_ee8565de2ffe4PJHCbuWnQ4O7x). Inspection desktop 1440×1000 et mobile 390×844, parcours CTA et scan automatique.

# Page d’accueil : 6/10

Une belle base visuelle, mais une démonstration commerciale trop faible. La page donne envie d’avoir un Collaborator ; le parcours ne tient pas encore cette envie.

| Dimension | Note |
|---|---:|
| Design visuel | 8/10 |
| Clarté | 6/10 |
| Singularité | 6/10 |
| Confiance | 5/10 |
| Parcours de conversion | 4/10 |

Ces notes sont des jugements de conception, pas des taux de conversion mesurés.

## Ce qui fonctionne

- Crème, fuchsia, grandes lettres et boutons : le système WhatsApp demandé est cohérent, propre et lisible.
- « It works for you » et DO IT / ASK ME / NEVER DO IT donnent une direction nette.
- Les contrôles fonctionnent : validation, choix transmis, navigation clavier, aucun débordement horizontal observé. Sur mobile, Continue et le prix sont visibles dès le premier écran.

## Les cinq problèmes prioritaires

### P1 — Le CTA promet autre chose que son résultat
« Connect with LinkedIn » ouvre un formulaire de démonstration, sans connexion LinkedIn ni même canal présélectionné. Le domaine est transmis, mais sa confirmation reste cachée dans une section repliée. Le problème est le décalage d’attente, pas l’absence de backend dans une démo.
Correction : annoncer le résultat réel du clic et accuser réception de la source immédiatement. Commande : clarify/onboard.

### P1 — On promet du travail, on montre une salutation
Patrick dit bonjour. Plus bas, un deuxième panneau Patrick mène au même endroit. Le visiteur voit une présence conversationnelle, pas un travail livré.
Correction : montrer un exemple compact et clairement simulé : demande → livrable → point d’approbation. Conserver les rôles distincts des sections preuve et présence. Commande : shape.

### P1 — La continuité se casse après le clic
Page anglaise → rencontre française. Après avoir demandé sa propre mission, on renvoie le visiteur vers l’exemple de Patrick.
Correction : continuer dans la même langue et finir sur un résultat lié à la mission de son propre Collaborator. Commande : onboard.

### P2 — Trop de mécanique avant assez de valeur
6 838px de page sur mobile ; la section ownership prend environ 915px. Hermes, cinq hébergements et trois sources d’intelligence arrivent avant une preuve convaincante. Les listes répètent les menus.
Correction : garder l’ordre demandé, raccourcir les répétitions et révéler les détails techniques au besoin. Commande : distill.

### P2 — « One simple price » est incomplet
€9.99 est visible immédiatement ; l’usage IA séparé apparaît beaucoup plus bas, sous le CTA de tarification.
Correction : qualifier le prix du hero et rapprocher coût d’abonnement et usage IA. Commande : clarify.

## Heuristiques UX

| Heuristique | /4 |
|---|---:|
| Statut du système | 2 |
| Langage réel | 2 |
| Contrôle utilisateur | 3 |
| Cohérence | 2 |
| Prévention des erreurs | 3 |
| Reconnaissance | 3 |
| Accélérateurs | n/a — page marketing |
| Minimalisme | 3 |
| Récupération des erreurs | 3 |
| Aide | 3 |
| Total | 24/36 |

Charge cognitive modérée : 3/8 critères échouent — découpage, limitation des choix, divulgation progressive.

Primo-visiteur : attend une vraie connexion. Visiteur mobile : doit traverser trop d’explications techniques. Visiteur sceptique : cherche un résultat concret et le coût réel.

Scan : zéro alerte dans les composants ; une alerte navigateur sur le fond crème, écartée car ce fond est explicitement demandé. Aucun overlay visible à l’utilisateur : vérification en navigateur headless. Aucun défaut JavaScript observé pendant l’inspection.

Observations mineures : flèches d’import illustratives pouvant sembler interactives ; retour final au domaine ne transfère pas le focus au champ ; quelques cibles secondaires de moins de 44px sans cible sous 24px.

Conclusion : le principal levier est de prouver le travail et de tenir la promesse du premier clic. La couleur et les tailles ne sont plus le goulot d’étranglement.

Questions : priorité à une preuve de travail ou au parcours après clic ? Portée : les trois P1 ou aussi l’allègement mobile et le prix ?

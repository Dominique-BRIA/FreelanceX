@AGENTS.md

FreelanceX : consignes pour Claude

Maquette interactive (projet ENSPY) d'une plateforme qui met en relation des clients et des prestataires indépendants au Cameroun. Aucune vraie API : les données sont dans src/data/mock.ts et l'état de la démonstration est gardé dans le navigateur (src/components/demo-store.tsx).

Objectif : se rapprocher du cahier des charges v1.1

Les améliorations doivent aller vers le cahier des charges v1.1 (exigences EF-…, règles RG-…). Cite l'exigence en commentaire quand tu l'implémentes, par exemple // RG-10 : coordonnées masquées. Points du cahier des charges v1.1 que la maquette ne respecte pas encore entièrement :

Deux formules prestataire (section 3.4) : basique (abonnement, sans commission, paiement direct) et avancée (commission, sans abonnement, paiement sécurisé). La maquette utilise encore Classique / Pro / Promax.
Les 10 statuts de demande (section 6.1) : Brouillon, Envoyée, En discussion, Proposition reçue, Acceptée, En cours, Annulation demandée, Terminée, En litige, Annulée.
Les coordonnées ne sont partagées qu'après l'acceptation d'une proposition (RG-10).

Avant un changement qui touche le modèle économique ou les statuts, propose d'abord un plan.

Style
Garder les couleurs existantes : bleu brand (#0b3a86), orange accent (#f2770c), turquoise trust (#0d9488, réservé à la confiance). Réutiliser les composants de src/components/ui.tsx (Bouton, Card, Badge…) plutôt que de créer de nouveaux styles.
Tous les textes de l'interface sont en français, simples et précis.
Ne jamais inventer de chiffres ou de promesses (statistiques, « certifié », délais garantis).
Penser au mobile : vérifier chaque écran en largeur 390 px.
Avant de dire qu'un travail est fini
npm run lint
npx tsc --noEmit
npm run dev et vérifier l'écran sur ordinateur et sur mobile.
Git
Travailler sur sa propre branche (ex. lea/ameliorations), jamais directement sur main.
Messages de commit en français, qui disent ce qui change pour l'utilisateur.
Ne pas pousser sans que la personne l'ait demandé.
# FreelanceX — maquette interactive

Maquette cliquable de **FreelanceX**, plateforme de mise en relation entre clients et prestataires indépendants
(projet ENSPY, Administration Réseaux, 2026–2027). Elle illustre le cahier des charges : catalogue, recommandation,
paiement par séquestre, litiges, certification d'identité, abonnements et les trois espaces (client, prestataire,
administration).

Toutes les données sont fictives. Il n'y a ni base de données ni paiement réel : les actions (J'aime, commentaires,
publications, paiements, changements de formule…) sont enregistrées dans le navigateur, pour que la démonstration reste
cohérente d'une page à l'autre.

## Le compte de démonstration

On est connecté en tant que **Brice Tchoumi**, menuisier à Douala, qui possède deux rôles :

- **client** : il fait appel à d'autres indépendants pour son atelier (électricien, graphiste, développeuse, photographe) ;
- **prestataire** : il reçoit les demandes de ses propres clients.

Le bouton **Mode prestataire / Mode client** (en-tête et barre latérale) fait passer de l'un à l'autre. L'administration
est un compte d'équipe distinct (Estelle Mballa).

## Le navigateur de test

La barre flottante en bas de l'écran sert uniquement aux démonstrations : **Client / Pro / Admin** change d'espace, et un
clic sur le nom de l'écran ouvre la liste des 22 écrans. Le bouton **Réinitialiser** remet la démonstration à zéro.

## Parcours à montrer

| Parcours | Adresse |
| --- | --- |
| Accepter une proposition, payer (séquestre), valider | `/demandes/DEM-1051` |
| Valider un travail livré ou ouvrir un litige | `/demandes/DEM-1044` |
| Envoyer une proposition de prix (prestataire) | `/prestataire/demandes/DEM-1060` |
| Répondre à un litige (prestataire) | `/prestataire/demandes/DEM-1033` |
| Publier une réalisation avec photos | `/prestataire/publier` |
| Contacter un prestataire depuis une réalisation | `/realisations`, bouton « Demander sur ce modèle » |
| Trancher un litige (administration) | `/admin/litiges/LIT-208` |

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:3000>.

## Déployer sur Vercel

1. Sur <https://vercel.com/new>, importer le dépôt GitHub `FreelanceX`.
2. Laisser les réglages par défaut (Framework : Next.js, dossier racine : `./`).
3. Cliquer sur **Deploy**. Chaque nouveau push sur `main` redéploie automatiquement.

## Organisation du code

- `src/app/(site)` : pages publiques (accueil, recherche, profils, réalisations, messagerie, suivi des demandes).
- `src/app/(espace)` : espaces client, prestataire et administration.
- `src/components` : composants partagés ; `demo-store.tsx` garde l'état de la démonstration, `demo-nav.tsx` est le
  navigateur de test.
- `src/data/mock.ts` : données de démonstration ; `src/data/credits.ts` : auteurs et licences des photos.
- `public/images` : photos libres de Wikimedia Commons (crédits sur la page `/credits`).
- `docs/` : cahier des charges et premières maquettes.

Technologies : Next.js 16, React 19, Tailwind CSS 4, icônes Lucide.

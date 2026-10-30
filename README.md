# Freelance X — maquette interactive

Maquette cliquable de **Freelance X**, plateforme de mise en relation entre clients et prestataires indépendants
(projet ENSPY, Administration Réseaux, 2026–2027). Elle illustre le cahier des charges : catalogue, recommandation,
paiement par séquestre, litiges, certification d'identité, abonnements et les trois espaces (client, prestataire,
administration).

Toutes les données sont fictives et stockées dans `src/data/mock.ts`. Il n'y a ni base de données ni paiement réel.

## Parcours à montrer

| Écran | Adresse |
| --- | --- |
| Accueil et recherche | `/` puis `/recherche` |
| Profil d'un prestataire | `/prestataires/brice-tchoumi` |
| Fil des réalisations | `/realisations` |
| Suivi d'une demande (séquestre interactif) | `/demandes/DEM-1042` (livrée), `/demandes/DEM-1051` (proposition) |
| Espace client | `/client` |
| Espace prestataire | `/prestataire` |
| Administration | `/admin`, puis `/admin/litiges/LIT-208` pour trancher un litige |
| Devenir prestataire | `/devenir-prestataire` |

Sur `/demandes/DEM-1051`, on peut dérouler tout le parcours : accepter la proposition, payer (les fonds sont bloqués),
simuler la fin du travail, puis valider ou ouvrir un litige.

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
- `src/components` : composants partagés (cartes, barre latérale, graphiques, boutons).
- `src/data/mock.ts` : données de démonstration.
- `docs/` : cahier des charges et premières maquettes Stitch.

Technologies : Next.js 16, React 19, Tailwind CSS 4, icônes Lucide.

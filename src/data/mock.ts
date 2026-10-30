// Données fictives de la maquette. Aucun appel serveur : tout est statique.

export type CategorieId =
  | "batiment"
  | "plomberie"
  | "informatique"
  | "graphisme"
  | "maison"
  | "beaute"
  | "education"
  | "transport"
  | "evenementiel"
  | "conseil"
  | "autres";

export type Categorie = { id: CategorieId; nom: string; exemples: string; nombre: number };

export const categories: Categorie[] = [
  { id: "batiment", nom: "Bâtiment & rénovation", exemples: "Maçonnerie, menuiserie, peinture", nombre: 412 },
  { id: "plomberie", nom: "Plomberie & électricité", exemples: "Dépannage, installation, câblage", nombre: 268 },
  { id: "informatique", nom: "Informatique & numérique", exemples: "Sites web, applications, réseaux", nombre: 305 },
  { id: "graphisme", nom: "Graphisme & traduction", exemples: "Logos, rédaction, traduction", nombre: 187 },
  { id: "maison", nom: "Maison & entretien", exemples: "Ménage, repassage, jardinage", nombre: 221 },
  { id: "beaute", nom: "Beauté & bien-être", exemples: "Coiffure, esthétique, massage", nombre: 254 },
  { id: "education", nom: "Éducation & formation", exemples: "Cours, soutien scolaire, langues", nombre: 176 },
  { id: "transport", nom: "Transport & livraison", exemples: "Déménagement, courses, livraison", nombre: 139 },
  { id: "evenementiel", nom: "Événementiel & photo", exemples: "Photographie, traiteur, animation", nombre: 163 },
  { id: "conseil", nom: "Services pro & conseil", exemples: "Comptabilité, juridique, gestion", nombre: 98 },
  { id: "autres", nom: "Autres", exemples: "Tout ce qui ne rentre pas ailleurs", nombre: 74 },
];

export type Formule = "classique" | "pro" | "promax";

export type Service = {
  id: string;
  titre: string;
  description: string;
  prix: number | null; // null = sur proposition
  unite?: string;
  delai: string;
};

export type Prestataire = {
  id: string;
  nom: string;
  metier: string;
  categorie: CategorieId;
  ville: string;
  quartier: string;
  zone: string;
  note: number;
  avis: number;
  prestations: number;
  certifie: boolean;
  formule: Formule;
  scoreConfiance: number;
  prixDepart: number | null;
  disponibilite: string;
  reponse: string;
  description: string;
  specialites: string[];
  services: Service[];
  teinte: string; // couleur de l'avatar
  couverture?: string;
};

export const prestataires: Prestataire[] = [
  {
    id: "brice-tchoumi",
    couverture: "/images/profil-brice-tchoumi.jpg",
    nom: "Brice Tchoumi",
    metier: "Menuisier agenceur",
    categorie: "batiment",
    ville: "Douala",
    quartier: "Bonapriso",
    zone: "Douala et environs (30 km)",
    note: 4.9,
    avis: 38,
    prestations: 64,
    certifie: true,
    formule: "promax",
    scoreConfiance: 96,
    prixDepart: 25000,
    disponibilite: "Disponible cette semaine",
    reponse: "Répond en 20 min",
    description:
      "Atelier de menuiserie à Bonapriso depuis 2014. Placards, cuisines et mobilier sur mesure en bois local (iroko, sapelli), pose comprise.",
    specialites: ["Placards", "Cuisines", "Mobilier sur mesure"],
    teinte: "bg-amber-600",
    services: [
      { id: "s1", titre: "Placard sur mesure", description: "Prise de cotes, fabrication en atelier et pose. Portes battantes ou coulissantes.", prix: 180000, delai: "10 à 15 jours" },
      { id: "s2", titre: "Cuisine équipée", description: "Conception, caissons, plan de travail et pose. Électroménager non compris.", prix: null, delai: "3 à 5 semaines" },
      { id: "s3", titre: "Réparation de meuble", description: "Charnières, tiroirs, vernis : intervention à domicile.", prix: 25000, delai: "Sous 48 h" },
    ],
  },
  {
    id: "aicha-nkoulou",
    couverture: "/images/profil-aicha-nkoulou.jpg",
    nom: "Aïcha Nkoulou",
    metier: "Graphiste, identité visuelle",
    categorie: "graphisme",
    ville: "Yaoundé",
    quartier: "Bastos",
    zone: "À distance, tout le Cameroun",
    note: 4.8,
    avis: 52,
    prestations: 97,
    certifie: true,
    formule: "pro",
    scoreConfiance: 93,
    prixDepart: 60000,
    disponibilite: "Disponible sous 5 jours",
    reponse: "Répond en 1 h",
    description: "Logos, chartes graphiques et supports imprimés pour commerces, restaurants et associations.",
    specialites: ["Logo", "Charte graphique", "Flyers"],
    teinte: "bg-rose-600",
    services: [
      { id: "s1", titre: "Logo + mini-charte", description: "3 pistes, 2 allers-retours, fichiers prêts à imprimer.", prix: 120000, delai: "7 jours" },
      { id: "s2", titre: "Menu de restaurant", description: "Mise en page d'un menu recto-verso, fichiers d'impression.", prix: 60000, delai: "4 jours" },
    ],
  },
  {
    id: "mireille-ngo-bassa",
    couverture: "/images/profil-mireille-ngo-bassa.jpg",
    nom: "Mireille Ngo Bassa",
    metier: "Développeuse web et mobile",
    categorie: "informatique",
    ville: "Douala",
    quartier: "Akwa",
    zone: "À distance, tout le Cameroun",
    note: 4.9,
    avis: 41,
    prestations: 58,
    certifie: true,
    formule: "promax",
    scoreConfiance: 95,
    prixDepart: 250000,
    disponibilite: "Disponible le mois prochain",
    reponse: "Répond en 2 h",
    description: "Sites vitrines, réservations en ligne et applications mobiles avec paiement Mobile Money.",
    specialites: ["Site vitrine", "Réservation en ligne", "Application mobile"],
    teinte: "bg-indigo-600",
    services: [
      { id: "s1", titre: "Site vitrine", description: "5 pages, adapté au mobile, mise en ligne et formation.", prix: 250000, delai: "3 semaines" },
      { id: "s2", titre: "Module de réservation", description: "Réservations en ligne avec rappel SMS.", prix: null, delai: "4 à 6 semaines" },
    ],
  },
  {
    id: "jean-paul-mbarga",
    couverture: "/images/profil-jean-paul-mbarga.jpg",
    nom: "Jean-Paul Mbarga",
    metier: "Électricien bâtiment",
    categorie: "plomberie",
    ville: "Yaoundé",
    quartier: "Mvan",
    zone: "Yaoundé (20 km)",
    note: 4.7,
    avis: 29,
    prestations: 47,
    certifie: true,
    formule: "classique",
    scoreConfiance: 88,
    prixDepart: 15000,
    disponibilite: "Disponible aujourd'hui",
    reponse: "Répond en 30 min",
    description: "Installation, mise aux normes et dépannage électrique pour particuliers et commerces.",
    specialites: ["Dépannage", "Tableau électrique", "Éclairage"],
    teinte: "bg-yellow-600",
    services: [
      { id: "s1", titre: "Dépannage électrique", description: "Diagnostic et réparation sur place.", prix: 15000, delai: "Sous 24 h" },
      { id: "s2", titre: "Rénovation de tableau", description: "Remplacement du tableau et des disjoncteurs.", prix: 120000, delai: "2 jours" },
    ],
  },
  {
    id: "fatimatou-bello",
    couverture: "/images/profil-fatimatou-bello.jpg",
    nom: "Fatimatou Bello",
    metier: "Traductrice français-anglais",
    categorie: "graphisme",
    ville: "Garoua",
    quartier: "Centre",
    zone: "À distance, tout le Cameroun",
    note: 5,
    avis: 23,
    prestations: 31,
    certifie: true,
    formule: "pro",
    scoreConfiance: 94,
    prixDepart: 8000,
    disponibilite: "Disponible cette semaine",
    reponse: "Répond en 45 min",
    description: "Traduction de documents administratifs, commerciaux et de sites web.",
    specialites: ["Documents officiels", "Sites web", "Relecture"],
    teinte: "bg-teal-700",
    services: [{ id: "s1", titre: "Traduction de document", description: "Prix par page de 250 mots.", prix: 8000, unite: "/ page", delai: "48 h" }],
  },
  {
    id: "herve-kamga",
    couverture: "/images/profil-herve-kamga.jpg",
    nom: "Hervé Kamga",
    metier: "Photographe événementiel",
    categorie: "evenementiel",
    ville: "Bafoussam",
    quartier: "Tamdja",
    zone: "Ouest et Littoral",
    note: 4.8,
    avis: 33,
    prestations: 52,
    certifie: true,
    formule: "pro",
    scoreConfiance: 91,
    prixDepart: 75000,
    disponibilite: "Disponible le week-end",
    reponse: "Répond en 3 h",
    description: "Mariages, inaugurations et portraits professionnels. Livraison des photos sous 7 jours.",
    specialites: ["Mariage", "Inauguration", "Portrait"],
    teinte: "bg-sky-700",
    services: [{ id: "s1", titre: "Reportage demi-journée", description: "4 heures, 150 photos retouchées.", prix: 75000, delai: "Livraison 7 jours" }],
  },
  {
    id: "samuel-etoundi",
    nom: "Samuel Etoundi",
    metier: "Plombier",
    categorie: "plomberie",
    ville: "Yaoundé",
    quartier: "Essos",
    zone: "Yaoundé (15 km)",
    note: 4.6,
    avis: 18,
    prestations: 26,
    certifie: false,
    formule: "classique",
    scoreConfiance: 79,
    prixDepart: 10000,
    disponibilite: "Disponible aujourd'hui",
    reponse: "Répond en 1 h",
    description: "Fuites, chauffe-eau, sanitaires : interventions rapides à Yaoundé.",
    specialites: ["Fuites", "Chauffe-eau", "Sanitaires"],
    teinte: "bg-cyan-700",
    services: [{ id: "s1", titre: "Recherche de fuite", description: "Déplacement et diagnostic.", prix: 10000, delai: "Sous 24 h" }],
  },
  {
    id: "laure-fotso",
    couverture: "/images/profil-laure-fotso.jpg",
    nom: "Laure Fotso",
    metier: "Coiffeuse à domicile",
    categorie: "beaute",
    ville: "Douala",
    quartier: "Makepe",
    zone: "Douala (15 km)",
    note: 4.7,
    avis: 61,
    prestations: 140,
    certifie: false,
    formule: "classique",
    scoreConfiance: 84,
    prixDepart: 7000,
    disponibilite: "Disponible demain",
    reponse: "Répond en 15 min",
    description: "Tresses, nattes et soins capillaires à domicile.",
    specialites: ["Tresses", "Nattes", "Soins"],
    teinte: "bg-fuchsia-700",
    services: [{ id: "s1", titre: "Tresses classiques", description: "Mèches non comprises.", prix: 7000, delai: "Sur rendez-vous" }],
  },
];

export function trouverPrestataire(id: string) {
  return prestataires.find((p) => p.id === id);
}

export type Realisation = {
  id: string;
  prestataireId: string;
  titre: string;
  description: string;
  categorie: CategorieId;
  budget: number | null;
  date: string;
  jaime: number;
  commentaires: number;
  avantApres: boolean;
  palette: [string, string];
  photos?: { avant?: string; apres: string };
};

export type Commentaire = { id: string; auteur: string; texte: string; date: string };

/** Quelques commentaires déjà publiés (le compteur des cartes inclut aussi des commentaires non affichés). */
export const commentairesExistants: Record<string, Commentaire[]> = {
  r1: [
    { id: "c-r1-1", auteur: "Nadège Owona", texte: "Superbe finition ! C'est quel bois pour les portes ?", date: "hier" },
    { id: "c-r1-2", auteur: "Brice Tchoumi", texte: "Merci Nadège, c'est de l'iroko verni mat.", date: "hier" },
  ],
  r2: [{ id: "c-r2-1", auteur: "Ruth Abena", texte: "Le logo donne vraiment envie d'y aller.", date: "il y a 3 jours" }],
  r4: [{ id: "c-r4-1", auteur: "Laure Fotso", texte: "Je cherche la même chose pour mon salon !", date: "il y a 5 jours" }],
  r6: [{ id: "c-r6-1", auteur: "Restaurant Le Wouri", texte: "Nos clients l'adorent. Merci Brice !", date: "il y a 2 semaines" }],
};

export const realisations: Realisation[] = [
  {
    id: "r1",
    prestataireId: "brice-tchoumi",
    titre: "Dressing en iroko pour une chambre parentale",
    description: "Trois modules, portes coulissantes et éclairage LED intégré. Pose en une journée.",
    categorie: "batiment",
    budget: 420000,
    date: "il y a 2 jours",
    jaime: 48,
    commentaires: 9,
    avantApres: true,
    palette: ["from-stone-400 to-stone-600", "from-amber-600 to-amber-800"],
    photos: { avant: "/images/r1-avant.jpg", apres: "/images/r1-apres.jpg" },
  },
  {
    id: "r2",
    prestataireId: "aicha-nkoulou",
    titre: "Identité visuelle du restaurant « Chez Mama Ngono »",
    description: "Logo, enseigne et menu. Une identité chaleureuse qui reprend les couleurs du ndolé.",
    categorie: "graphisme",
    budget: 150000,
    date: "il y a 4 jours",
    jaime: 112,
    commentaires: 21,
    avantApres: false,
    palette: ["from-emerald-500 to-emerald-800", "from-emerald-500 to-emerald-800"],
    photos: { apres: "/images/r2.jpg" },
  },
  {
    id: "r3",
    prestataireId: "jean-paul-mbarga",
    titre: "Mise aux normes du tableau d'une boutique",
    description: "Ancien tableau vétuste remplacé, différentiel 30 mA et éclairage revu.",
    categorie: "plomberie",
    budget: 135000,
    date: "il y a 1 semaine",
    jaime: 34,
    commentaires: 6,
    avantApres: true,
    palette: ["from-zinc-500 to-zinc-700", "from-slate-300 to-slate-500"],
    photos: { avant: "/images/r3-avant.jpg", apres: "/images/r3-apres.jpg" },
  },
  {
    id: "r4",
    prestataireId: "mireille-ngo-bassa",
    titre: "Application de réservation pour un salon de coiffure",
    description: "Prise de rendez-vous, rappels SMS et paiement d'acompte par Mobile Money.",
    categorie: "informatique",
    budget: 780000,
    date: "il y a 1 semaine",
    jaime: 89,
    commentaires: 14,
    avantApres: false,
    palette: ["from-indigo-500 to-violet-700", "from-indigo-500 to-violet-700"],
    photos: { apres: "/images/r4.jpg" },
  },
  {
    id: "r5",
    prestataireId: "herve-kamga",
    titre: "Inauguration d'une agence bancaire à Bafoussam",
    description: "Reportage complet de la cérémonie, livré en 5 jours.",
    categorie: "evenementiel",
    budget: 90000,
    date: "il y a 2 semaines",
    jaime: 57,
    commentaires: 4,
    avantApres: false,
    palette: ["from-sky-500 to-blue-800", "from-sky-500 to-blue-800"],
    photos: { apres: "/images/r5.jpg" },
  },
  {
    id: "r6",
    prestataireId: "brice-tchoumi",
    titre: "Comptoir de bar pour le restaurant Le Wouri",
    description: "Comptoir de 4 m en sapelli massif avec rangements intégrés.",
    categorie: "batiment",
    budget: 520000,
    date: "il y a 3 semaines",
    jaime: 73,
    commentaires: 12,
    avantApres: true,
    palette: ["from-neutral-400 to-neutral-600", "from-orange-700 to-amber-900"],
    photos: { avant: "/images/r6-avant.jpg", apres: "/images/r6-apres.jpg" },
  },
];

export type StatutDemande =
  | "envoyee"
  | "proposition"
  | "acceptee"
  | "en_cours"
  | "livree"
  | "en_litige"
  | "terminee"
  | "remboursee"
  | "hors_plateforme";

export const libellesStatut: Record<StatutDemande, string> = {
  envoyee: "Envoyée",
  proposition: "Proposition reçue",
  acceptee: "Acceptée",
  en_cours: "En cours",
  livree: "Livrée",
  en_litige: "En litige",
  terminee: "Terminée",
  remboursee: "Remboursée",
  hors_plateforme: "Réglée hors plateforme",
};

export type Demande = {
  id: string;
  titre: string;
  clientNom: string;
  clientVille: string;
  prestataireId: string;
  statut: StatutDemande;
  montant: number | null;
  delai: string;
  livrable: string;
  date: string;
  echeance?: string;
};

/** Compte connecté de la démonstration : Brice est client ET prestataire, il passe de l'un à l'autre. */
export const UTILISATEUR_DEMO = "Brice Tchoumi";
export const CLIENT_DEMO = UTILISATEUR_DEMO;
export const PRESTATAIRE_DEMO = "brice-tchoumi";

export const demandes: Demande[] = [
  // Brice comme client : il fait appel à d'autres indépendants pour son atelier
  {
    id: "DEM-1044",
    titre: "Rénovation du tableau électrique de l'atelier",
    clientNom: CLIENT_DEMO,
    clientVille: "Douala, Bonapriso",
    prestataireId: "jean-paul-mbarga",
    statut: "livree",
    montant: 135000,
    delai: "2 jours",
    livrable: "Remplacement du tableau, différentiel 30 mA, 8 disjoncteurs et prises de l'établi, essais compris.",
    date: "20 oct.",
    echeance: "Validation automatique dans 4 jours",
  },
  {
    id: "DEM-1051",
    titre: "Logo et enseigne pour l'atelier",
    clientNom: CLIENT_DEMO,
    clientVille: "Douala, Bonapriso",
    prestataireId: "aicha-nkoulou",
    statut: "proposition",
    montant: 150000,
    delai: "7 jours",
    livrable: "Logo (3 pistes, 2 allers-retours), maquette de l'enseigne et cartes de visite, fichiers prêts à imprimer.",
    date: "24 oct.",
    echeance: "Proposition valable 6 jours",
  },
  {
    id: "DEM-1038",
    titre: "Site vitrine de l'atelier",
    clientNom: CLIENT_DEMO,
    clientVille: "Douala, Bonapriso",
    prestataireId: "mireille-ngo-bassa",
    statut: "en_cours",
    montant: 450000,
    delai: "5 semaines",
    livrable: "Site vitrine 5 pages avec galerie de réalisations et formulaire de demande de devis.",
    date: "28 sept.",
    echeance: "Livraison prévue le 2 nov.",
  },
  {
    id: "DEM-1019",
    titre: "Photos de l'inauguration du showroom",
    clientNom: CLIENT_DEMO,
    clientVille: "Douala, Bonapriso",
    prestataireId: "herve-kamga",
    statut: "terminee",
    montant: 90000,
    delai: "1 jour",
    livrable: "Reportage de 4 heures, 150 photos retouchées.",
    date: "12 sept.",
    echeance: "Avis à laisser",
  },
  // Brice comme prestataire : les demandes de ses clients
  {
    id: "DEM-1042",
    titre: "Placard sur mesure, chambre parentale",
    clientNom: "Christian Ndjock",
    clientVille: "Douala, Bonamoussadi",
    prestataireId: "brice-tchoumi",
    statut: "livree",
    montant: 380000,
    delai: "12 jours",
    livrable: "Placard 3 portes coulissantes en iroko, 2,40 m × 2,20 m, penderie et étagères, pose comprise.",
    date: "2 oct.",
    echeance: "Le client a 4 jours pour valider",
  },
  {
    id: "DEM-1060",
    titre: "Cuisine équipée, appartement neuf",
    clientNom: "Ruth Abena",
    clientVille: "Douala, Kotto",
    prestataireId: "brice-tchoumi",
    statut: "envoyee",
    montant: null,
    delai: "À définir",
    livrable: "Cuisine en L de 3,5 m, caissons bas et hauts, plan de travail en granit.",
    date: "Aujourd'hui",
    echeance: "Répondre sous 24 h",
  },
  {
    id: "DEM-1047",
    titre: "Comptoir de bar en sapelli",
    clientNom: "Restaurant Le Wouri",
    clientVille: "Douala, Akwa",
    prestataireId: "brice-tchoumi",
    statut: "en_cours",
    montant: 520000,
    delai: "3 semaines",
    livrable: "Comptoir de 4 m en sapelli massif avec rangements intégrés.",
    date: "10 oct.",
    echeance: "Livraison prévue le 31 oct.",
  },
  {
    id: "DEM-1033",
    titre: "Portes intérieures (4 unités)",
    clientNom: "Paul Essomba",
    clientVille: "Douala, Logpom",
    prestataireId: "brice-tchoumi",
    statut: "en_litige",
    montant: 240000,
    delai: "10 jours",
    livrable: "4 portes pleines en bois massif, huisseries et pose.",
    date: "15 sept.",
    echeance: "Répondre au litige avant le 31 oct.",
  },
  {
    id: "DEM-1012",
    titre: "Étagères de bibliothèque",
    clientNom: "Nadège Owona",
    clientVille: "Douala, Bonapriso",
    prestataireId: "brice-tchoumi",
    statut: "terminee",
    montant: 95000,
    delai: "5 jours",
    livrable: "Bibliothèque murale 2 m, 5 niveaux.",
    date: "2 sept.",
  },
];

/** Adresse du suivi d'une demande, selon que l'utilisateur y est client ou prestataire. */
export function lienDemande(d: Demande): string {
  return d.prestataireId === PRESTATAIRE_DEMO ? `/prestataire/demandes/${d.id}` : `/demandes/${d.id}`;
}

export function trouverDemande(id: string) {
  return demandes.find((d) => d.id === id);
}

export type EtatLitige = "ouvert" | "en_traitement" | "complement" | "resolu";

export const libellesLitige: Record<EtatLitige, string> = {
  ouvert: "Ouvert",
  en_traitement: "En cours de traitement",
  complement: "Complément demandé",
  resolu: "Résolu",
};

export type Litige = {
  id: string;
  demandeId: string;
  titre: string;
  demandeur: string;
  demandeurRole: "client" | "prestataire";
  defendeur: string;
  montant: number;
  etat: EtatLitige;
  motif: string;
  ouvertLe: string;
  delai: string;
};

export const litiges: Litige[] = [
  {
    id: "LIT-208",
    demandeId: "DEM-1033",
    titre: "Portes intérieures (4 unités)",
    demandeur: "Paul Essomba",
    demandeurRole: "client",
    defendeur: "Brice Tchoumi",
    montant: 240000,
    etat: "en_traitement",
    motif:
      "Les portes ont été posées avec deux semaines de retard et deux d'entre elles frottent au sol. Je demande le remboursement de la moitié du montant.",
    ouvertLe: "21 oct.",
    delai: "Décision attendue sous 3 jours",
  },
  {
    id: "LIT-211",
    demandeId: "DEM-0998",
    titre: "Réparation d'une fuite sous évier",
    demandeur: "Grâce Mengue",
    demandeurRole: "client",
    defendeur: "Samuel Etoundi",
    montant: 35000,
    etat: "ouvert",
    motif: "La fuite est revenue le lendemain de l'intervention.",
    ouvertLe: "27 oct.",
    delai: "Le défendeur a encore 2 jours pour contester",
  },
  {
    id: "LIT-205",
    demandeId: "DEM-0975",
    titre: "Traduction d'un dossier de bourse",
    demandeur: "Fatimatou Bello",
    demandeurRole: "prestataire",
    defendeur: "Yannick Abega",
    montant: 64000,
    etat: "complement",
    motif: "Le client refuse de valider alors que les 8 pages ont été livrées dans le délai.",
    ouvertLe: "18 oct.",
    delai: "Complément attendu du client avant le 30 oct.",
  },
  {
    id: "LIT-190",
    demandeId: "DEM-0911",
    titre: "Coiffure pour un mariage",
    demandeur: "Sandrine Mvogo",
    demandeurRole: "client",
    defendeur: "Laure Fotso",
    montant: 45000,
    etat: "resolu",
    motif: "Retard de 2 heures le jour du mariage.",
    ouvertLe: "2 oct.",
    delai: "Partage : 30 % remboursés au client",
  },
];

export function trouverLitige(id: string) {
  return litiges.find((l) => l.id === id);
}

export type DossierCertification = {
  id: string;
  prestataire: string;
  metier: string;
  ville: string;
  documents: string[];
  depose: string;
  priorite: boolean;
};

export const dossiersCertification: DossierCertification[] = [
  { id: "CERT-311", prestataire: "Samuel Etoundi", metier: "Plombier", ville: "Yaoundé", documents: ["CNI recto", "CNI verso", "Photo avec la pièce"], depose: "il y a 45 min", priorite: true },
  { id: "CERT-309", prestataire: "Laure Fotso", metier: "Coiffeuse à domicile", ville: "Douala", documents: ["CNI recto", "CNI verso", "Photo avec la pièce", "Carte professionnelle"], depose: "il y a 3 h", priorite: false },
  { id: "CERT-306", prestataire: "Arnaud Fouda", metier: "Peintre en bâtiment", ville: "Yaoundé", documents: ["Passeport", "Photo avec la pièce"], depose: "hier", priorite: false },
  { id: "CERT-302", prestataire: "Josiane Ekane", metier: "Comptable indépendante", ville: "Buea", documents: ["CNI recto", "CNI verso", "Photo avec la pièce", "Attestation d'inscription"], depose: "il y a 2 jours", priorite: false },
];

export type Utilisateur = {
  nom: string;
  role: "Client" | "Prestataire";
  ville: string;
  inscrit: string;
  avertissements: number;
  statut: "actif" | "suspendu" | "liste_noire";
};

export const utilisateurs: Utilisateur[] = [
  { nom: "Christian Ndjock", role: "Client", ville: "Douala", inscrit: "mars 2026", avertissements: 0, statut: "actif" },
  { nom: "Brice Tchoumi", role: "Prestataire", ville: "Douala", inscrit: "janv. 2026", avertissements: 0, statut: "actif" },
  { nom: "Paul Essomba", role: "Client", ville: "Douala", inscrit: "juin 2026", avertissements: 1, statut: "actif" },
  { nom: "Yannick Abega", role: "Client", ville: "Yaoundé", inscrit: "août 2026", avertissements: 2, statut: "actif" },
  { nom: "Kevin Manga", role: "Prestataire", ville: "Yaoundé", inscrit: "févr. 2026", avertissements: 3, statut: "liste_noire" },
  { nom: "Aïcha Nkoulou", role: "Prestataire", ville: "Yaoundé", inscrit: "janv. 2026", avertissements: 0, statut: "actif" },
  { nom: "Rodrigue Biya", role: "Client", ville: "Kribi", inscrit: "sept. 2026", avertissements: 0, statut: "suspendu" },
];

export const formules = [
  {
    id: "classique" as const,
    nom: "Classique",
    prix: 0,
    commission: 10,
    accroche: "Pour démarrer",
    avantages: ["3 services publiés", "5 réalisations par mois", "Statistiques de base"],
  },
  {
    id: "pro" as const,
    nom: "Pro",
    prix: 5000,
    commission: 7,
    accroche: "Le plus choisi",
    avantages: ["Services illimités", "Réalisations illimitées", "Meilleure visibilité dans les résultats", "Statistiques détaillées"],
  },
  {
    id: "promax" as const,
    nom: "Promax",
    prix: 15000,
    commission: 5,
    accroche: "Pour les plus actifs",
    avantages: ["Tout ce qu'offre Pro", "Mise en avant prioritaire", "Badge Promax sur le profil", "Assistance prioritaire"],
  },
];

export type Conversation = {
  id: string;
  avec: string;
  sujet: string;
  dernier: string;
  heure: string;
  nonLus: number;
  demandeId?: string;
};

export const conversations: Conversation[] = [
  { id: "c1", avec: "Christian Ndjock", sujet: "Placard sur mesure (votre client)", dernier: "Merci Brice, je vérifie ce soir et je valide.", heure: "10:58", nonLus: 1, demandeId: "DEM-1042" },
  { id: "c4", avec: "Jean-Paul Mbarga", sujet: "Tableau électrique de l'atelier", dernier: "Le tableau est posé, tout fonctionne.", heure: "09:20", nonLus: 1, demandeId: "DEM-1044" },
  { id: "c2", avec: "Aïcha Nkoulou", sujet: "Logo et enseigne", dernier: "Je vous ai envoyé ma proposition.", heure: "Hier", nonLus: 0, demandeId: "DEM-1051" },
  { id: "c3", avec: "Mireille Ngo Bassa", sujet: "Site vitrine de l'atelier", dernier: "La maquette de l'accueil est prête.", heure: "Lun.", nonLus: 0, demandeId: "DEM-1038" },
];

/** Échange de la conversation c1, vu par Brice (moi = Brice, le prestataire). */
export const messagesDemo = [
  { moi: false, texte: "Bonjour Brice, j'ai vu votre dressing en iroko sur le fil. Je voudrais quelque chose de similaire pour ma chambre (2,40 m de large).", heure: "2 oct., 09:15" },
  { moi: true, texte: "Bonjour Christian, avec plaisir. Je passe prendre les cotes jeudi ? Je vous enverrai ensuite une proposition.", heure: "2 oct., 09:34" },
  { moi: true, texte: "Proposition envoyée : 380 000 FCFA, 12 jours, pose comprise.", heure: "5 oct., 17:02", proposition: true },
  { moi: false, texte: "Parfait, j'accepte et je paie maintenant.", heure: "5 oct., 18:20" },
  { moi: true, texte: "La pose est terminée. Les photos de la pose sont dans le dossier.", heure: "Aujourd'hui, 10:42" },
  { moi: false, texte: "Merci Brice, je vérifie ce soir et je valide.", heure: "Aujourd'hui, 10:58" },
] as const;

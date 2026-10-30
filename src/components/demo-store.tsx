"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Commentaire, Formule, Realisation, Service, StatutDemande } from "@/data/mock";

// État de la démonstration, partagé entre les pages et conservé dans le navigateur.
// Il simule ce que ferait le serveur : J'aime, commentaires, publications, statuts…

export type MessageEnvoye = {
  id: string;
  type: "texte" | "image" | "vocal";
  contenu: string;
  heure: string;
  /** Réponse simulée de l'autre personne ; par défaut, le message vient de l'utilisateur. */
  recu?: boolean;
};

export type StatutUtilisateur = "actif" | "suspendu" | "liste_noire";

type Etat = {
  aimes: Record<string, boolean>;
  enregistres: Record<string, boolean>;
  commentaires: Record<string, Commentaire[]>;
  favoris: Record<string, boolean>;
  publiees: Realisation[];
  services: Service[];
  formule: Formule;
  certificationJusqua: string;
  statuts: Record<string, StatutDemande>;
  messages: Record<string, MessageEnvoye[]>;
  utilisateurs: Record<string, StatutUtilisateur>;
};

const etatInitial: Etat = {
  aimes: {},
  enregistres: {},
  commentaires: {}, // seulement ceux ajoutés pendant la démo ; les autres sont dans mock.ts
  favoris: {},
  publiees: [],
  services: [],
  formule: "promax",
  certificationJusqua: "14 janvier 2027",
  statuts: {},
  messages: {},
  utilisateurs: {},
};

const CLE = "freelancex-demo-v1";

type Actions = {
  basculerAime: (id: string) => void;
  basculerEnregistre: (id: string) => void;
  commenter: (id: string, auteur: string, texte: string) => void;
  basculerFavori: (prestataireId: string) => void;
  publier: (r: Omit<Realisation, "id" | "date" | "jaime" | "commentaires">) => void;
  ajouterService: (s: Omit<Service, "id">) => void;
  retirerService: (id: string) => void;
  changerFormule: (f: Formule) => void;
  renouvelerCertification: () => void;
  changerStatut: (demandeId: string, statut: StatutDemande) => void;
  envoyerMessage: (conversation: string, m: Omit<MessageEnvoye, "id" | "heure">) => void;
  changerStatutUtilisateur: (nom: string, statut: StatutUtilisateur) => void;
  reinitialiser: () => void;
};

const Contexte = createContext<(Etat & Actions & { pret: boolean }) | null>(null);

const maintenant = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
const nouvelId = (prefixe: string) => `${prefixe}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export function DemoProvider({ children }: { children: ReactNode }) {
  const [etat, setEtat] = useState<Etat>(etatInitial);
  const [pret, setPret] = useState(false);

  // Lecture après le montage, pour que le rendu serveur et le premier rendu client soient identiques.
  // C'est précisément le cas d'une synchronisation avec un système externe (le stockage du navigateur).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(CLE);
      if (brut) setEtat({ ...etatInitial, ...JSON.parse(brut) });
    } catch {
      // Stockage indisponible (navigation privée) : la démo marche, sans mémoire.
    }
    setPret(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!pret) return;
    try {
      window.localStorage.setItem(CLE, JSON.stringify(etat));
    } catch {
      // Quota dépassé ou stockage bloqué : on garde l'état en mémoire.
    }
  }, [etat, pret]);

  const maj = useCallback((f: (e: Etat) => Partial<Etat>) => setEtat((e) => ({ ...e, ...f(e) })), []);

  const actions = useMemo<Actions>(
    () => ({
      basculerAime: (id) => maj((e) => ({ aimes: { ...e.aimes, [id]: !e.aimes[id] } })),
      basculerEnregistre: (id) => maj((e) => ({ enregistres: { ...e.enregistres, [id]: !e.enregistres[id] } })),
      commenter: (id, auteur, texte) =>
        maj((e) => ({
          commentaires: { ...e.commentaires, [id]: [...(e.commentaires[id] ?? []), { id: nouvelId("c"), auteur, texte, date: "à l'instant" }] },
        })),
      basculerFavori: (pid) => maj((e) => ({ favoris: { ...e.favoris, [pid]: !e.favoris[pid] } })),
      publier: (r) =>
        maj((e) => ({ publiees: [{ ...r, id: nouvelId("pub"), date: "à l'instant", jaime: 0, commentaires: 0 }, ...e.publiees] })),
      ajouterService: (s) => maj((e) => ({ services: [...e.services, { ...s, id: nouvelId("srv") }] })),
      retirerService: (id) => maj((e) => ({ services: e.services.filter((s) => s.id !== id) })),
      changerFormule: (f) => maj(() => ({ formule: f })),
      renouvelerCertification: () => maj(() => ({ certificationJusqua: "14 janvier 2028" })),
      changerStatut: (id, statut) => maj((e) => ({ statuts: { ...e.statuts, [id]: statut } })),
      envoyerMessage: (conv, m) =>
        maj((e) => ({ messages: { ...e.messages, [conv]: [...(e.messages[conv] ?? []), { ...m, id: nouvelId("m"), heure: maintenant() }] } })),
      changerStatutUtilisateur: (nom, statut) => maj((e) => ({ utilisateurs: { ...e.utilisateurs, [nom]: statut } })),
      reinitialiser: () => {
        try {
          window.localStorage.removeItem(CLE);
        } catch {
          // rien à nettoyer
        }
        setEtat(etatInitial);
      },
    }),
    [maj],
  );

  return <Contexte.Provider value={{ ...etat, ...actions, pret }}>{children}</Contexte.Provider>;
}

export function useDemo() {
  const ctx = useContext(Contexte);
  if (!ctx) throw new Error("useDemo doit être utilisé dans <DemoProvider>");
  return ctx;
}

/** Statut courant d'une demande : celui de la démo s'il a changé, sinon celui des données. */
export function useStatut(demandeId: string, initial: StatutDemande): StatutDemande {
  return useDemo().statuts[demandeId] ?? initial;
}

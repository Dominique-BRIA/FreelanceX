import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { ListeDemandes } from "@/components/liste-demandes";
import { PRESTATAIRE_DEMO, demandes } from "@/data/mock";

export const metadata: Metadata = { title: "Demandes reçues" };

const teintes = ["bg-brand", "bg-emerald-700", "bg-violet-700", "bg-rose-700", "bg-sky-700"];

export default function DemandesPrestataire() {
  const lignes = demandes
    .filter((d) => d.prestataireId === PRESTATAIRE_DEMO)
    .map((d, i) => ({
      id: d.id,
      titre: d.titre,
      avec: d.clientNom,
      teinte: teintes[i % teintes.length],
      montant: d.montant,
      statut: d.statut,
      date: d.date,
      echeance: d.echeance,
    }));

  return (
    <div className="space-y-6">
      <TitrePage titre="Demandes reçues" sousTitre="Répondez vite : le délai de réponse compte dans votre classement." />
      <ListeDemandes lignes={lignes} prefixe="/prestataire/demandes/" />
    </div>
  );
}

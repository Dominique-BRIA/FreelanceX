import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { ListeDemandes } from "@/components/liste-demandes";
import { CLIENT_DEMO, demandes, trouverPrestataire } from "@/data/mock";

export const metadata: Metadata = { title: "Mes demandes" };

export default function DemandesClient() {
  const lignes = demandes
    .filter((d) => d.clientNom === CLIENT_DEMO)
    .map((d) => {
      const p = trouverPrestataire(d.prestataireId)!;
      return { id: d.id, titre: d.titre, avec: p.nom, teinte: p.teinte, montant: d.montant, statut: d.statut, date: d.date, echeance: d.echeance };
    });

  return (
    <div className="space-y-6">
      <TitrePage titre="Mes demandes" sousTitre="Suivez chaque prestation, de la proposition au paiement." />
      <ListeDemandes lignes={lignes} prefixe="/demandes/" />
    </div>
  );
}

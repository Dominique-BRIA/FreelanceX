import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { AFaire, LienTout, TitrePage } from "@/components/espace";
import { ListeDemandes } from "@/components/liste-demandes";
import { Avatar, BoutonLien, Card, Certifie, Note } from "@/components/ui";
import { CLIENT_DEMO, PRESTATAIRE_DEMO, demandes, prestataires, trouverPrestataire } from "@/data/mock";
import { IndicateursClient } from "./indicateurs";

export const metadata: Metadata = { title: "Espace client" };

export default function TableauDeBordClient() {
  const mesDemandes = demandes.filter((d) => d.clientNom === CLIENT_DEMO);
  const recommandes = prestataires.filter((p) => p.id !== PRESTATAIRE_DEMO && !mesDemandes.some((d) => d.prestataireId === p.id)).slice(0, 3);
  const lignes = mesDemandes.map((d) => {
    const p = trouverPrestataire(d.prestataireId)!;
    return { id: d.id, titre: d.titre, avec: p.nom, teinte: p.teinte, montant: d.montant, statut: d.statut, date: d.date };
  });

  return (
    <div className="space-y-8">
      <TitrePage
        titre="Bonjour Brice"
        sousTitre="Vos commandes auprès d'autres indépendants, pour votre atelier."
        actions={
          <BoutonLien href="/recherche" variante="action">
            <Search className="size-4" /> Trouver un prestataire
          </BoutonLien>
        }
      />

      <IndicateursClient demandes={mesDemandes} />

      <AFaire
        taches={[
          {
            titre: "Vérifier le tableau électrique posé par Jean-Paul Mbarga",
            detail: "Validation automatique dans 4 jours · 135 000 FCFA bloqués",
            action: "Vérifier",
            href: "/demandes/DEM-1044",
            urgent: true,
            demande: { id: "DEM-1044", statut: "livree" },
          },
          {
            titre: "Étudier la proposition d'Aïcha Nkoulou",
            detail: "Logo et enseigne · 150 000 FCFA · valable 6 jours",
            action: "Voir",
            href: "/demandes/DEM-1051",
            demande: { id: "DEM-1051", statut: "proposition" },
          },
          {
            titre: "Noter les photos de l'inauguration du showroom",
            detail: "Hervé Kamga · prestation terminée",
            action: "Laisser un avis",
            href: "/demandes/DEM-1019",
          },
        ]}
      />

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Mes demandes</h2>
          <LienTout href="/client/demandes">Tout voir</LienTout>
        </div>
        <div className="-mx-4 mt-2">
          <ListeDemandes lignes={lignes} prefixe="/demandes/" sansFiltres />
        </div>
      </Card>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Recommandés pour vous</h2>
          <LienTout href="/recherche">Plus de prestataires</LienTout>
        </div>
        <p className="mt-1 text-sm text-muted">D&apos;après les besoins de votre atelier à Douala.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {recommandes.map((p) => (
            <Link key={p.id} href={`/prestataires/${p.id}`}>
              <Card className="flex items-center gap-3 p-4 transition hover:shadow-lift">
                <Avatar nom={p.nom} teinte={p.teinte} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{p.nom}</p>
                  <p className="truncate text-sm text-muted">{p.metier}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Note note={p.note} />
                    {p.certifie && <Certifie court />}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

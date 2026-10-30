import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ClipboardList, Lock, Search } from "lucide-react";
import { AFaire, LienTout, TitrePage } from "@/components/espace";
import { Avatar, BoutonLien, Card, Certifie, Indicateur, Note, StatutDemandeBadge } from "@/components/ui";
import { CLIENT_DEMO, demandes, prestataires, trouverPrestataire } from "@/data/mock";
import { fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Espace client" };

export default function TableauDeBordClient() {
  const mesDemandes = demandes.filter((d) => d.clientNom === CLIENT_DEMO);
  const bloques = mesDemandes
    .filter((d) => d.statut === "en_cours" || d.statut === "livree")
    .reduce((s, d) => s + (d.montant ?? 0), 0);
  const recommandes = prestataires.filter((p) => !mesDemandes.some((d) => d.prestataireId === p.id)).slice(0, 3);

  return (
    <div className="space-y-8">
      <TitrePage
        titre="Bonjour Christian"
        sousTitre="3 actions vous attendent."
        actions={
          <BoutonLien href="/recherche" variante="action">
            <Search className="size-4" /> Trouver un prestataire
          </BoutonLien>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Indicateur libelle="Demandes en cours" valeur="3" contexte="dont 1 proposition à étudier" icone={<ClipboardList className="size-5" />} />
        <Indicateur libelle="Fonds bloqués" valeur={fcfa(bloques)} contexte="Protégés jusqu'à votre validation" icone={<Lock className="size-5" />} ton="trust" />
        <Indicateur libelle="Prestations terminées" valeur="1" contexte="Depuis mars 2026" icone={<CheckCircle2 className="size-5" />} ton="accent" />
      </div>

      <AFaire
        taches={[
          { titre: "Vérifier le placard livré par Brice Tchoumi", detail: "Validation automatique dans 4 jours · 380 000 FCFA bloqués", action: "Vérifier", href: "/demandes/DEM-1042", urgent: true },
          { titre: "Étudier la proposition d'Aïcha Nkoulou", detail: "Logo et menu · 150 000 FCFA · valable 6 jours", action: "Voir", href: "/demandes/DEM-1051" },
          { titre: "Noter les photos de l'inauguration", detail: "Hervé Kamga · prestation terminée", action: "Laisser un avis", href: "/demandes/DEM-1019" },
        ]}
      />

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Mes demandes</h2>
          <LienTout href="/client/demandes">Tout voir</LienTout>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {mesDemandes.map((d) => {
            const p = trouverPrestataire(d.prestataireId)!;
            return (
              <li key={d.id}>
                <Link href={`/demandes/${d.id}`} className="-mx-2 flex items-center gap-4 rounded-xl px-2 py-3 hover:bg-canvas">
                  <Avatar nom={p.nom} teinte={p.teinte} taille="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{d.titre}</p>
                    <p className="truncate text-sm text-muted">{p.nom}</p>
                  </div>
                  <p className="hidden font-semibold text-ink tabular sm:block">{d.montant ? fcfa(d.montant) : "—"}</p>
                  <StatutDemandeBadge statut={d.statut} />
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Recommandés pour vous</h2>
          <LienTout href="/recherche">Plus de prestataires</LienTout>
        </div>
        <p className="mt-1 text-sm text-muted">D&apos;après votre projet de restaurant à Douala.</p>
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

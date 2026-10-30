import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { Badge, Card } from "@/components/ui";
import { utilisateurs, type Utilisateur } from "@/data/mock";
import { cx } from "@/lib/format";

export const metadata: Metadata = { title: "Utilisateurs" };

const statuts: Record<Utilisateur["statut"], { libelle: string; ton: "trust" | "attente" | "danger" }> = {
  actif: { libelle: "Actif", ton: "trust" },
  suspendu: { libelle: "Suspendu", ton: "attente" },
  liste_noire: { libelle: "Liste noire", ton: "danger" },
};

export default function Utilisateurs() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Utilisateurs" sousTitre="Au 3ᵉ avertissement, le compte est bloqué et la personne inscrite sur la liste noire." />
      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Nom</th>
              <th className="hidden px-5 py-3 font-semibold sm:table-cell">Rôle</th>
              <th className="hidden px-5 py-3 font-semibold md:table-cell">Inscrit</th>
              <th className="px-5 py-3 font-semibold">Avertissements</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {utilisateurs.map((u) => (
              <tr key={u.nom}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-ink">{u.nom}</p>
                  <p className="text-xs text-muted">{u.ville}</p>
                </td>
                <td className="hidden px-5 py-4 text-muted sm:table-cell">{u.role}</td>
                <td className="hidden px-5 py-4 text-muted md:table-cell">{u.inscrit}</td>
                <td className="px-5 py-4">
                  <span className="flex gap-1" aria-label={`${u.avertissements} sur 3`}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={cx("size-2.5 rounded-full", i < u.avertissements ? "bg-danger" : "bg-slate-200")} />
                    ))}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Badge ton={statuts[u.statut].ton}>{statuts[u.statut].libelle}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

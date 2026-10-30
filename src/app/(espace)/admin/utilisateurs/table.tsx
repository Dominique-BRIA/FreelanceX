"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { useDemo, type StatutUtilisateur } from "@/components/demo-store";
import { utilisateurs } from "@/data/mock";
import { cx } from "@/lib/format";

const statuts: Record<StatutUtilisateur, { libelle: string; ton: "trust" | "attente" | "danger" }> = {
  actif: { libelle: "Actif", ton: "trust" },
  suspendu: { libelle: "Suspendu", ton: "attente" },
  liste_noire: { libelle: "Liste noire", ton: "danger" },
};

export function TableUtilisateurs() {
  const { utilisateurs: changes, changerStatutUtilisateur } = useDemo();
  const [recherche, setRecherche] = useState("");
  const liste = utilisateurs
    .map((u) => ({ ...u, statut: changes[u.nom] ?? u.statut }))
    .filter((u) => u.nom.toLowerCase().includes(recherche.trim().toLowerCase()));

  return (
    <>
      <label className="flex h-11 max-w-sm items-center gap-2 rounded-xl border border-line bg-white px-3 focus-within:border-brand">
        <Search className="size-4 text-muted" />
        <span className="sr-only">Rechercher un utilisateur</span>
        <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un nom…" className="w-full bg-transparent text-sm outline-none" />
      </label>
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Nom</th>
              <th className="hidden px-5 py-3 font-semibold sm:table-cell">Rôle</th>
              <th className="hidden px-5 py-3 font-semibold md:table-cell">Inscrit</th>
              <th className="px-5 py-3 font-semibold">Avertissements</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {liste.map((u) => (
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
                <td className="px-5 py-4 text-right">
                  {u.statut === "actif" ? (
                    <button type="button" onClick={() => changerStatutUtilisateur(u.nom, "suspendu")} className="text-sm font-semibold text-danger hover:underline">
                      Suspendre
                    </button>
                  ) : u.statut === "suspendu" ? (
                    <button type="button" onClick={() => changerStatutUtilisateur(u.nom, "actif")} className="text-sm font-semibold text-brand hover:underline">
                      Réactiver
                    </button>
                  ) : (
                    <span className="text-xs text-muted">Bloqué définitivement</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

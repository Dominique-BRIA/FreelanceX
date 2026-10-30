"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Card, StatutDemandeBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import type { StatutDemande } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

export type LigneDemande = {
  id: string;
  titre: string;
  avec: string;
  teinte: string;
  montant: number | null;
  statut: StatutDemande;
  date: string;
  echeance?: string;
};

const groupes: { id: string; libelle: string; statuts: StatutDemande[] }[] = [
  { id: "tout", libelle: "Toutes", statuts: [] },
  { id: "attente", libelle: "À traiter", statuts: ["envoyee", "proposition", "acceptee"] },
  { id: "cours", libelle: "En cours", statuts: ["en_cours", "livree", "en_litige"] },
  { id: "fin", libelle: "Terminées", statuts: ["terminee", "remboursee", "hors_plateforme"] },
];

export function ListeDemandes({
  lignes: initiales,
  prefixe,
  sansFiltres = false,
}: {
  lignes: LigneDemande[];
  prefixe: string;
  sansFiltres?: boolean;
}) {
  const { statuts } = useDemo();
  const lignes = initiales.map((l) => ({ ...l, statut: statuts[l.id] ?? l.statut }));
  const [groupe, setGroupe] = useState("tout");
  const filtre = groupes.find((g) => g.id === groupe)!;
  const visibles = lignes.filter((l) => !filtre.statuts.length || filtre.statuts.includes(l.statut));

  return (
    <div>
      <div className={cx("flex gap-2 overflow-x-auto pb-1", sansFiltres && "hidden")}>
        {groupes.map((g) => {
          const n = lignes.filter((l) => !g.statuts.length || g.statuts.includes(l.statut)).length;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroupe(g.id)}
              className={cx(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold",
                groupe === g.id ? "bg-brand text-white" : "bg-white text-slate-600 ring-1 ring-line hover:text-brand",
              )}
            >
              {g.libelle} <span className="ml-1 opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
      <Card className={cx("divide-y divide-line", !sansFiltres && "mt-4", sansFiltres && "border-0 shadow-none")}>
        {visibles.map((l) => (
          <Link key={l.id} href={`${prefixe}${l.id}`} className="flex flex-col gap-3 p-4 hover:bg-canvas sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar nom={l.avec} teinte={l.teinte} taille="sm" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{l.titre}</p>
                <p className="truncate text-sm text-muted">
                  {l.avec} · {l.id} · {l.date}
                </p>
              </div>
            </div>
            {l.echeance && <p className="text-sm text-muted sm:w-56 sm:text-right">{l.echeance}</p>}
            <div className="flex items-center justify-between gap-4 sm:w-56 sm:justify-end">
              <span className="font-semibold text-ink tabular">{l.montant ? fcfa(l.montant) : "—"}</span>
              <StatutDemandeBadge statut={l.statut} />
            </div>
          </Link>
        ))}
        {!visibles.length && <p className="p-8 text-center text-sm text-muted">Aucune demande dans cette catégorie.</p>}
      </Card>
    </div>
  );
}

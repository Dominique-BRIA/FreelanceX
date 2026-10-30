"use client";

import { useState } from "react";
import { Check, CheckCircle2, IdCard } from "lucide-react";
import { Avatar, Badge, Bouton, Card } from "@/components/ui";
import type { DossierCertification } from "@/data/mock";
import { cx } from "@/lib/format";

const controles = ["Le nom correspond au profil", "La pièce est lisible et non expirée", "Le visage correspond à la photo de la pièce"];

export function Examen({ dossiers }: { dossiers: DossierCertification[] }) {
  const [actif, setActif] = useState(dossiers[0].id);
  const [coches, setCoches] = useState<Record<string, boolean>>({});
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const dossier = dossiers.find((d) => d.id === actif)!;
  const decision = decisions[actif];
  const pret = controles.every((c) => coches[`${actif}-${c}`]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="h-fit p-2">
        {dossiers.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActif(d.id)}
            className={cx("flex w-full items-center gap-3 rounded-xl p-3 text-left", actif === d.id ? "bg-brand-50" : "hover:bg-canvas")}
          >
            <Avatar nom={d.prestataire} taille="sm" teinte="bg-slate-500" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{d.prestataire}</span>
              <span className="block truncate text-xs text-muted">{d.depose}</span>
            </span>
            {decisions[d.id] ? <Badge ton="trust">{decisions[d.id]}</Badge> : d.priorite && <Badge ton="accent">Prioritaire</Badge>}
          </button>
        ))}
      </Card>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{dossier.id}</p>
            <h2 className="text-xl font-bold text-ink">{dossier.prestataire}</h2>
            <p className="text-sm text-muted">{dossier.metier} · {dossier.ville}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {dossier.documents.map((doc) => (
            <div key={doc} className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-line bg-canvas text-sm text-muted">
              <IdCard className="size-7" /> {doc}
            </div>
          ))}
        </div>

        {decision ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-trust-50 p-4 text-sm text-trust-dark">
            <CheckCircle2 className="size-5" /> Dossier {decision.toLowerCase()}. Le prestataire a été notifié.
          </div>
        ) : (
          <>
            <h3 className="mt-6 font-semibold text-ink">Contrôles</h3>
            <ul className="mt-3 space-y-2">
              {controles.map((c) => {
                const cle = `${actif}-${c}`;
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setCoches((v) => ({ ...v, [cle]: !v[cle] }))}
                      className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left text-sm hover:border-brand/40"
                    >
                      <span className={cx("flex size-5 items-center justify-center rounded-md border", coches[cle] ? "border-trust bg-trust text-white" : "border-slate-300")}>
                        {coches[cle] && <Check className="size-3.5" />}
                      </span>
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Bouton disabled={!pret} onClick={() => setDecisions((v) => ({ ...v, [actif]: "Approuvé" }))}>Approuver</Bouton>
              <Bouton variante="contour" onClick={() => setDecisions((v) => ({ ...v, [actif]: "Renvoyé" }))}>Demander un complément</Bouton>
              <Bouton variante="danger" onClick={() => setDecisions((v) => ({ ...v, [actif]: "Refusé" }))}>Refuser</Bouton>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { Badge, Bouton, Card } from "@/components/ui";
import { Modale } from "@/components/modale";
import { useDemo } from "@/components/demo-store";
import { formules, type Formule } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

export function ChoixFormule() {
  const { formule, changerFormule } = useDemo();
  const [cible, setCible] = useState<Formule | null>(null);
  const [periode, setPeriode] = useState<"mois" | "an">("mois");
  const [confirme, setConfirme] = useState("");
  const choisie = formules.find((f) => f.id === cible);
  const prixPeriode = (prix: number) => (periode === "an" ? prix * 10 : prix); // 2 mois offerts à l'année

  return (
    <>
      {confirme && (
        <p className="flex items-center gap-2 rounded-xl bg-trust-50 px-4 py-3 text-sm font-medium text-trust-dark">
          <CheckCircle2 className="size-4" /> Vous êtes passé à la formule {confirme}.
        </p>
      )}
      <div className="inline-flex rounded-xl bg-white p-1 ring-1 ring-line">
        {(["mois", "an"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriode(p)}
            className={cx("rounded-lg px-4 py-1.5 text-sm font-semibold", periode === p ? "bg-brand text-white" : "text-muted")}
          >
            {p === "mois" ? "Mensuel" : "Annuel · 2 mois offerts"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {formules.map((f) => {
          const actuelle = f.id === formule;
          return (
            <Card key={f.id} className={cx("flex flex-col p-6", actuelle && "border-brand ring-2 ring-brand/15")}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-ink">{f.nom}</h2>
                {actuelle ? <Badge ton="brand">Votre formule</Badge> : <Badge>{f.accroche}</Badge>}
              </div>
              <p className="mt-4 text-3xl font-extrabold text-ink tabular">
                {f.prix ? fcfa(prixPeriode(f.prix)) : "Gratuit"}
                {f.prix > 0 && <span className="text-base font-medium text-muted"> / {periode}</span>}
              </p>
              <p className="mt-1 text-sm text-muted">Commission de {f.commission} % sur chaque prestation</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {f.avantages.map((a) => (
                  <li key={a} className="flex gap-2.5 text-slate-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-trust" /> {a}
                  </li>
                ))}
              </ul>
              <Bouton
                variante={actuelle ? "contour" : "primaire"}
                className="mt-6 w-full"
                disabled={actuelle}
                onClick={() => setCible(f.id)}
              >
                {actuelle ? "Formule actuelle" : `Passer à ${f.nom}`}
              </Bouton>
            </Card>
          );
        })}
      </div>

      {choisie && (
        <Modale titre={`Passer à ${choisie.nom}`} onFermer={() => setCible(null)}>
          <p className="text-sm text-muted">
            {choisie.prix
              ? `Vous payez ${fcfa(prixPeriode(choisie.prix))} par ${periode}, par Mobile Money ou carte. Votre commission passe à ${choisie.commission} %.`
              : `La formule Classique est gratuite. Votre commission passe à ${choisie.commission} %.`}
          </p>
          <Bouton
            variante="action"
            className="mt-6 w-full"
            onClick={() => {
              changerFormule(choisie.id);
              setConfirme(choisie.nom);
              setCible(null);
            }}
          >
            {choisie.prix ? `Payer ${fcfa(prixPeriode(choisie.prix))}` : "Confirmer"}
          </Bouton>
        </Modale>
      )}
    </>
  );
}

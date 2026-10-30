import type { Metadata } from "next";
import { Check } from "lucide-react";
import { TitrePage } from "@/components/espace";
import { Badge, Bouton, Card } from "@/components/ui";
import { formules } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Abonnement" };

const actuelle = "promax";

export default function Abonnement() {
  return (
    <div className="space-y-8">
      <TitrePage titre="Abonnement" sousTitre="Votre formule Promax est active jusqu'au 14 novembre 2026." />
      <div className="grid gap-4 lg:grid-cols-3">
        {formules.map((f) => {
          const estActuelle = f.id === actuelle;
          return (
            <Card key={f.id} className={cx("flex flex-col p-6", estActuelle && "border-brand ring-2 ring-brand/15")}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-ink">{f.nom}</h2>
                {estActuelle ? <Badge ton="brand">Votre formule</Badge> : <Badge>{f.accroche}</Badge>}
              </div>
              <p className="mt-4 text-3xl font-extrabold text-ink tabular">
                {f.prix ? fcfa(f.prix) : "Gratuit"}
                {f.prix > 0 && <span className="text-base font-medium text-muted"> / mois</span>}
              </p>
              <p className="mt-1 text-sm text-muted">Commission de {f.commission} % sur chaque prestation</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {f.avantages.map((a) => (
                  <li key={a} className="flex gap-2.5 text-slate-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-trust" /> {a}
                  </li>
                ))}
              </ul>
              <Bouton variante={estActuelle ? "contour" : "primaire"} className="mt-6 w-full" disabled={estActuelle}>
                {estActuelle ? "Formule actuelle" : `Passer à ${f.nom}`}
              </Bouton>
            </Card>
          );
        })}
      </div>
      <p className="text-sm text-muted">
        Paiement mensuel ou annuel, par Mobile Money ou carte. L&apos;abonnement ne donne pas le badge d&apos;identité vérifiée :
        la certification est un service à part.
      </p>
    </div>
  );
}

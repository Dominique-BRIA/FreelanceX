import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { ChoixFormule } from "./choix";

export const metadata: Metadata = { title: "Abonnement" };

export default function Abonnement() {
  return (
    <div className="space-y-8">
      <TitrePage titre="Abonnement" sousTitre="Changez de formule à tout moment : le changement s'applique tout de suite." />
      <ChoixFormule />
      <p className="text-sm text-muted">
        Paiement mensuel ou annuel, par Mobile Money ou carte. L&apos;abonnement ne donne pas le badge d&apos;identité vérifiée :
        la certification est un service à part.
      </p>
    </div>
  );
}

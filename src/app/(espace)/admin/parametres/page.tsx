import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { Card } from "@/components/ui";
import { formules } from "@/data/mock";
import { Enregistrer } from "./enregistrer";

export const metadata: Metadata = { title: "Paramètres" };

const champ = "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

function Champ({ libelle, valeur, suffixe }: { libelle: string; valeur: string; suffixe?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{libelle}</span>
      <span className="relative block">
        <input defaultValue={valeur} className={champ} />
        {suffixe && <span className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-sm text-muted">{suffixe}</span>}
      </span>
    </label>
  );
}

export default function Parametres() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Paramètres" sousTitre="Règles appliquées à toute la plateforme." />

      <Card className="p-6">
        <h2 className="font-bold text-ink">Séquestre et litiges</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Champ libelle="Délai de validation du client" valeur="7" suffixe="jours" />
          <Champ libelle="Délai de réponse à un litige" valeur="3" suffixe="jours" />
          <Champ libelle="Délai pour un complément" valeur="3" suffixe="jours" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Champ libelle="Avertissements avant blocage" valeur="3" />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-ink">Formules et commissions</h2>
        <div className="mt-5 space-y-4">
          {formules.map((f) => (
            <div key={f.id} className="grid items-end gap-4 sm:grid-cols-[140px_1fr_1fr]">
              <p className="pb-3 font-semibold text-ink">{f.nom}</p>
              <Champ libelle="Prix mensuel" valeur={String(f.prix)} suffixe="FCFA" />
              <Champ libelle="Commission" valeur={String(f.commission)} suffixe="%" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-ink">Certification et pays</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Champ libelle="Prix de la certification" valeur="10000" suffixe="FCFA" />
          <Champ libelle="Durée de validité" valeur="12" suffixe="mois" />
          <Champ libelle="Pays ouvert" valeur="Cameroun · FCFA · français" />
        </div>
      </Card>

      <Enregistrer />
    </div>
  );
}

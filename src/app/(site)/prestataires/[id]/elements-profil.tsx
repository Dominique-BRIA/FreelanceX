"use client";

import { Clock, Heart } from "lucide-react";
import { Card } from "@/components/ui";
import { Publication } from "@/components/publication";
import { useDemo } from "@/components/demo-store";
import { PRESTATAIRE_DEMO, realisations } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

export function BoutonFavori({ prestataireId }: { prestataireId: string }) {
  const { favoris, basculerFavori } = useDemo();
  const actif = !!favoris[prestataireId];
  return (
    <button
      type="button"
      onClick={() => basculerFavori(prestataireId)}
      aria-pressed={actif}
      className={cx("flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-medium", actif ? "text-accent" : "text-muted hover:text-brand")}
    >
      <Heart className={cx("size-4", actif && "fill-accent")} /> {actif ? "Dans vos favoris" : "Ajouter aux favoris"}
    </button>
  );
}

/** Services ajoutés pendant la démo par le prestataire de démonstration. */
export function ServicesAjoutes({ prestataireId }: { prestataireId: string }) {
  const { services } = useDemo();
  if (prestataireId !== PRESTATAIRE_DEMO) return null;
  return (
    <>
      {services.map((s) => (
        <Card key={s.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="font-bold text-ink">{s.titre}</p>
            <p className="mt-1 text-sm text-muted">{s.description}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock className="size-3.5" /> {s.delai}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <p className="font-bold text-ink tabular">{s.prix ? fcfa(s.prix) : "Sur proposition"}</p>
            <span className="text-xs font-semibold text-trust-dark">Ajouté par vous</span>
          </div>
        </Card>
      ))}
    </>
  );
}

export function RealisationsProfil({ prestataireId }: { prestataireId: string }) {
  const { publiees } = useDemo();
  const liste = [...publiees, ...realisations].filter((r) => r.prestataireId === prestataireId);
  if (!liste.length) return null;
  return (
    <section>
      <h2 className="text-xl font-bold text-ink">Réalisations</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {liste.map((r) => (
          <Publication key={r.id} realisation={r} compacte />
        ))}
      </div>
    </section>
  );
}

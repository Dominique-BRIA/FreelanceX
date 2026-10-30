import { cx } from "@/lib/format";

/** Histogramme minimal en SVG : un seul indicateur, la dernière barre mise en avant. */
export function Histogramme({
  donnees,
  format,
  hauteur = 160,
}: {
  donnees: { libelle: string; valeur: number }[];
  format: (v: number) => string;
  hauteur?: number;
}) {
  const max = Math.max(...donnees.map((d) => d.valeur)) || 1;
  return (
    <div>
      <div className="flex items-end gap-3" style={{ height: hauteur }}>
        {donnees.map((d, i) => {
          const dernier = i === donnees.length - 1;
          return (
            <div key={d.libelle} className="group flex h-full flex-1 flex-col justify-end">
              <span
                className={cx(
                  "mb-1 text-center text-xs font-semibold tabular",
                  dernier ? "text-brand" : "text-transparent group-hover:text-muted",
                )}
              >
                {format(d.valeur)}
              </span>
              <div
                className={cx("w-full rounded-t-lg transition-colors", dernier ? "bg-brand" : "bg-brand-100 group-hover:bg-brand/40")}
                style={{ height: `${Math.max(6, (d.valeur / max) * 100)}%` }}
                title={`${d.libelle} : ${format(d.valeur)}`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3">
        {donnees.map((d) => (
          <span key={d.libelle} className="flex-1 text-center text-xs text-muted">
            {d.libelle}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Jauge horizontale simple (score de confiance, progression). */
export function Jauge({ valeur, ton = "trust" }: { valeur: number; ton?: "trust" | "brand" | "accent" }) {
  const couleurs = { trust: "bg-trust", brand: "bg-brand", accent: "bg-accent" };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="meter" aria-valuenow={valeur} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx("h-full rounded-full", couleurs[ton])} style={{ width: `${valeur}%` }} />
    </div>
  );
}

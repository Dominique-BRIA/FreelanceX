"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import type { StatutDemande } from "@/data/mock";
import { cx } from "@/lib/format";

export function TitrePage({ titre, sousTitre, actions }: { titre: string; sousTitre?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{titre}</h1>
        {sousTitre && <p className="mt-1.5 text-muted">{sousTitre}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export type Tache = {
  titre: string;
  detail: string;
  action: string;
  href: string;
  urgent?: boolean;
  /** La tâche disparaît quand la demande n'est plus dans ce statut. */
  demande?: { id: string; statut: StatutDemande };
};

/** Ce qui demande une action maintenant : 3 éléments au plus, chacun avec une seule action. */
export function AFaire({ taches, titre = "À faire maintenant" }: { taches: Tache[]; titre?: string }) {
  const { statuts } = useDemo();
  const restantes = taches.filter((t) => !t.demande || (statuts[t.demande.id] ?? t.demande.statut) === t.demande.statut);

  return (
    <Card className="p-6">
      <h2 className="font-bold text-ink">{titre}</h2>
      {restantes.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-trust-dark">
          <CheckCircle2 className="size-4" /> Tout est à jour. Bravo !
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {restantes.map((t) => (
            <li key={t.titre} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
              <span className={cx("hidden size-2.5 shrink-0 rounded-full sm:block", t.urgent ? "bg-accent" : "bg-brand-100")} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{t.titre}</p>
                <p className="text-sm text-muted">{t.detail}</p>
              </div>
              <Link
                href={t.href}
                className={cx(
                  "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-sm font-semibold",
                  t.urgent ? "bg-accent text-white hover:bg-accent-dark" : "bg-brand-50 text-brand hover:bg-brand-100",
                )}
              >
                {t.action} <ArrowRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function LienTout({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
      {children} <ArrowRight className="size-4" />
    </Link>
  );
}

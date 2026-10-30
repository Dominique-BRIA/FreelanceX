import type { Metadata } from "next";
import Link from "next/link";
import { TitrePage } from "@/components/espace";
import { Badge, Card } from "@/components/ui";
import { libellesLitige, litiges, type EtatLitige } from "@/data/mock";
import { fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Litiges" };

const tons: Record<EtatLitige, "danger" | "attente" | "brand" | "neutre"> = {
  en_traitement: "danger",
  ouvert: "attente",
  complement: "brand",
  resolu: "neutre",
};

export default function Litiges() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Litiges" sousTitre="Les fonds restent bloqués tant qu'un litige n'est pas résolu." />
      <Card className="divide-y divide-line">
        {litiges.map((l) => (
          <Link key={l.id} href={`/admin/litiges/${l.id}`} className="flex flex-col gap-3 p-5 hover:bg-canvas md:flex-row md:items-center md:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted">{l.id}</span>
                <Badge ton={tons[l.etat]}>{libellesLitige[l.etat]}</Badge>
              </div>
              <p className="mt-1 font-semibold text-ink">{l.titre}</p>
              <p className="text-sm text-muted">
                {l.demandeur} ({l.demandeurRole}) contre {l.defendeur} · ouvert le {l.ouvertLe}
              </p>
            </div>
            <p className="text-sm text-muted md:w-64">{l.delai}</p>
            <p className="font-bold text-ink tabular md:w-36 md:text-right">{fcfa(l.montant)}</p>
          </Link>
        ))}
      </Card>
    </div>
  );
}

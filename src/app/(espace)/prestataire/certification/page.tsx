import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FileCheck2, Lock } from "lucide-react";
import { TitrePage } from "@/components/espace";
import { Badge, Bouton, Card } from "@/components/ui";
import { fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Certification d'identité" };

const documents = [
  { nom: "Pièce d'identité (recto et verso)", etat: "Vérifiée" },
  { nom: "Photo avec la pièce d'identité", etat: "Vérifiée" },
  { nom: "Carte professionnelle (facultative)", etat: "Vérifiée" },
];

const parcours = ["Consulter les conditions", "Envoyer les documents", "Payer les frais", "Examen du dossier", "Badge visible sur le profil"];

export default function CertificationPrestataire() {
  return (
    <div className="space-y-8">
      <TitrePage titre="Certification d'identité" sousTitre="Le badge rassure les clients. Il ne certifie pas vos compétences." />

      <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-trust-50 text-trust">
          <BadgeCheck className="size-7" />
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Identité vérifiée</h2>
            <Badge ton="trust">Active</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">Valable jusqu&apos;au 14 janvier 2027. Vous serez prévenu un mois avant l&apos;expiration.</p>
        </div>
        <Bouton variante="contour">Renouveler · {fcfa(10000)}</Bouton>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-bold text-ink">Documents transmis</h2>
          <ul className="mt-4 divide-y divide-line">
            {documents.map((d) => (
              <li key={d.nom} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="flex items-center gap-2.5 text-ink"><FileCheck2 className="size-4 text-muted" /> {d.nom}</span>
                <Badge ton="trust">{d.etat}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Lock className="size-3.5" /> Visibles uniquement par l&apos;équipe habilitée, jamais sur votre profil.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-ink">Comment ça marche</h2>
          <ol className="mt-4 space-y-3">
            {parcours.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="flex size-6 items-center justify-center rounded-full bg-trust text-xs font-bold text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ol>
          <Link href="/certification" className="mt-5 inline-block text-sm font-semibold text-brand hover:underline">
            Ce que voient les clients
          </Link>
        </Card>
      </div>
    </div>
  );
}

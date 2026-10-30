import type { Metadata } from "next";
import { Check, ShieldCheck, X } from "lucide-react";
import { BoutonLien, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Le badge « Identité vérifiée »" };

export default function PageCertification() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-trust-50 text-trust">
        <ShieldCheck className="size-7" />
      </span>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-brand">Que signifie le badge « Identité vérifiée » ?</h1>
      <p className="mt-3 text-lg text-muted">
        Il indique que l&apos;équipe FreelanceX a contrôlé l&apos;identité du prestataire. Il ne valide pas ses compétences.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <p className="font-bold text-ink">Ce qui a été vérifié</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {["Une pièce d'identité officielle, recto et verso", "Une photo du prestataire tenant sa pièce", "Le document professionnel, s'il en a fourni un"].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-trust" /> {t}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <p className="font-bold text-ink">Ce que le badge ne garantit pas</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {["La qualité du travail : fiez-vous aux avis", "Les diplômes ou qualifications", "Le respect des délais"].map((t) => (
              <li key={t} className="flex gap-3"><X className="mt-0.5 size-4 shrink-0 text-danger" /> {t}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 p-6">
        <p className="font-bold text-ink">Durée de validité</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Le badge est valable un an. Le prestataire est prévenu avant l&apos;expiration pour le renouveler. Les documents
          d&apos;identité restent privés et ne sont jamais affichés sur le profil.
        </p>
      </Card>

      <div className="mt-10 text-center">
        <BoutonLien href="/recherche">Voir les prestataires vérifiés</BoutonLien>
      </div>
    </main>
  );
}

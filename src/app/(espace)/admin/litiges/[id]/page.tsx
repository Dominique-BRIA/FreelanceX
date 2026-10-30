import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ImageIcon, Lock } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { libellesLitige, litiges, trouverDemande, trouverLitige } from "@/data/mock";
import { fcfa } from "@/lib/format";
import { Decision } from "./decision";

export function generateStaticParams() {
  return litiges.map((l) => ({ id: l.id }));
}

export async function generateMetadata(props: PageProps<"/admin/litiges/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Litige ${id}` };
}

export default async function PageLitige(props: PageProps<"/admin/litiges/[id]">) {
  const { id } = await props.params;
  const litige = trouverLitige(id);
  if (!litige) notFound();
  const demande = trouverDemande(litige.demandeId);

  const preuves = [
    { partie: litige.demandeur, type: "photo", libelle: "Photo · porte qui frotte au sol" },
    { partie: litige.demandeur, type: "photo", libelle: "Photo · seuil abîmé" },
    { partie: litige.defendeur, type: "doc", libelle: "Bon de livraison signé le 6 oct." },
    { partie: litige.defendeur, type: "photo", libelle: "Photo · portes après la pose" },
  ];

  return (
    <div className="space-y-6">
      <Link href="/admin/litiges" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Litiges
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {litige.id} · {litige.demandeId} · ouvert le {litige.ouvertLe}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{litige.titre}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge ton="brand"><Lock className="size-3.5" /> {fcfa(litige.montant)} bloqués</Badge>
          <Badge ton={litige.etat === "resolu" ? "neutre" : "danger"}>{libellesLitige[litige.etat]}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-bold text-ink">Le désaccord</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-danger-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-danger">Demandeur · {litige.demandeurRole}</p>
                <p className="mt-1 font-semibold text-ink">{litige.demandeur}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">« {litige.motif} »</p>
              </div>
              <div className="rounded-xl bg-canvas p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Défendeur</p>
                <p className="mt-1 font-semibold text-ink">{litige.defendeur}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {litige.etat === "ouvert"
                    ? "N'a pas encore répondu."
                    : "« Le retard vient d'une livraison de bois tardive, le client était prévenu. Je propose de raboter les deux portes gratuitement. »"}
                </p>
              </div>
            </div>
          </Card>

          {demande && (
            <Card className="p-6">
              <h2 className="font-bold text-ink">Proposition acceptée (référence)</h2>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                <div><dt className="text-muted">Montant</dt><dd className="mt-1 font-semibold text-ink tabular">{fcfa(demande.montant ?? 0)}</dd></div>
                <div><dt className="text-muted">Délai convenu</dt><dd className="mt-1 font-semibold text-ink">{demande.delai}</dd></div>
                <div><dt className="text-muted">Commande</dt><dd className="mt-1 font-semibold text-ink">{demande.date}</dd></div>
              </dl>
              <p className="mt-4 rounded-xl bg-canvas p-4 text-sm leading-6 text-slate-600">{demande.livrable}</p>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="font-bold text-ink">Preuves déposées</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {preuves.map((p) => (
                <li key={p.libelle} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-canvas text-muted">
                    {p.type === "photo" ? <ImageIcon className="size-5" /> : <FileText className="size-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{p.libelle}</span>
                    <span className="block text-xs text-muted">{p.partie}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Les 14 messages échangés sur cette prestation sont joints au dossier.</p>
          </Card>
        </div>

        <Decision litige={litige} />
      </div>
    </div>
  );
}

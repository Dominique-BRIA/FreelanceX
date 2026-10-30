import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Gavel, Lock, ShieldAlert, Star } from "lucide-react";
import { BoutonLien, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Garanties et confiance" };

const garanties = [
  {
    icone: Lock,
    titre: "Paiement par séquestre",
    texte:
      "Quand vous payez sur FreelanceX, l'argent reste bloqué jusqu'à ce que vous validiez le travail. Sans réponse de votre part, il est versé automatiquement après le délai prévu.",
    lien: { href: "/demandes/DEM-1051", libelle: "Voir un suivi de demande" },
  },
  {
    icone: Gavel,
    titre: "Litiges arbitrés",
    texte:
      "En cas de désaccord, chaque partie dépose ses preuves. Un membre de l'équipe compare avec la proposition acceptée et décide : versement, remboursement ou partage.",
  },
  {
    icone: BadgeCheck,
    titre: "Identité vérifiée",
    texte: "Le badge garantit que l'équipe a contrôlé la pièce d'identité du prestataire. Il ne certifie pas ses compétences.",
    lien: { href: "/certification", libelle: "Ce que garantit le badge" },
  },
  {
    icone: Star,
    titre: "Avis de vraies prestations",
    texte:
      "Seul un client qui a payé une prestation sur la plateforme peut laisser un avis officiel. Les commentaires du fil sont un espace d'échange distinct.",
  },
  {
    icone: ShieldAlert,
    titre: "Lutte contre la fraude",
    texte:
      "Une tentative de fraude avérée vaut un avertissement. Au troisième, le compte est bloqué et la personne inscrite sur la liste noire.",
  },
];

export default function Garanties() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wider text-accent">Garanties & confiance</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">Travailler ensemble, en sécurité</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        FreelanceX ne s&apos;interpose pas entre vous et le prestataire : elle agit comme tiers de confiance.
      </p>
      <div className="mt-10 space-y-4">
        {garanties.map(({ icone: Icone, titre, texte, lien }) => (
          <Card key={titre} className="flex gap-5 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icone className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-ink">{titre}</h2>
              <p className="mt-1 leading-7 text-slate-600">{texte}</p>
              {lien && (
                <Link href={lien.href} className="mt-2 inline-block text-sm font-semibold text-brand hover:underline">
                  {lien.libelle}
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Vous préférez payer en direct ? C&apos;est possible, mais la plateforme n&apos;intervient alors pas : ni séquestre, ni litige,
        ni avis officiel.
      </p>
      <BoutonLien href="/recherche" className="mt-8">
        Trouver un prestataire
      </BoutonLien>
    </main>
  );
}

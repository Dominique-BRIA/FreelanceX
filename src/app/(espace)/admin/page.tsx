import type { Metadata } from "next";
import { Coins, Gavel, Lock, ShieldCheck } from "lucide-react";
import { AFaire, TitrePage } from "@/components/espace";
import { Histogramme } from "@/components/charts";
import { Card, Indicateur } from "@/components/ui";
import { fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Administration" };

const volumes = [
  { libelle: "S36", valeur: 2.1 },
  { libelle: "S37", valeur: 2.6 },
  { libelle: "S38", valeur: 2.4 },
  { libelle: "S39", valeur: 3.1 },
  { libelle: "S40", valeur: 2.9 },
  { libelle: "S41", valeur: 3.4 },
  { libelle: "S42", valeur: 3.8 },
  { libelle: "S43", valeur: 4.2 },
];

const millions = (v: number) => `${v.toString().replace(".", ",")} M`;

export default function TableauDeBordAdmin() {
  return (
    <div className="space-y-8">
      <TitrePage titre="Vue d'ensemble" sousTitre="Vendredi 30 octobre 2026 · Cameroun" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Indicateur libelle="Litiges à traiter" valeur="3" contexte="1 décision attendue sous 3 jours" icone={<Gavel className="size-5" />} ton="danger" />
        <Indicateur libelle="Certifications à examiner" valeur="4" contexte="Temps moyen : 4 h" icone={<ShieldCheck className="size-5" />} ton="trust" />
        <Indicateur libelle="Fonds en séquestre" valeur={fcfa(4850000)} contexte="Sur 37 prestations en cours" icone={<Lock className="size-5" />} />
        <Indicateur libelle="Commissions d'octobre" valeur={fcfa(612000)} contexte="+14 % par rapport à septembre" icone={<Coins className="size-5" />} ton="accent" />
      </div>

      <AFaire
        titre="Priorités du jour"
        taches={[
          { titre: "Trancher le litige LIT-208", detail: "Paul Essomba contre Brice Tchoumi · 240 000 FCFA bloqués", action: "Examiner", href: "/admin/litiges/LIT-208", urgent: true },
          { titre: "Vérifier l'identité de Samuel Etoundi", detail: "Dossier prioritaire déposé il y a 45 min", action: "Examiner", href: "/admin/certifications", urgent: true },
          { titre: "Relancer Yannick Abega (LIT-205)", detail: "Complément de preuve attendu avant le 30 oct.", action: "Ouvrir", href: "/admin/litiges/LIT-205" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="p-6">
          <h2 className="font-bold text-ink">Montants payés par semaine</h2>
          <p className="text-sm text-muted">En millions de FCFA, paiements par séquestre</p>
          <div className="mt-8">
            <Histogramme donnees={volumes} format={millions} />
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-ink">Comptes</h2>
          <dl className="mt-5 space-y-4 text-sm">
            {[
              { libelle: "Comptes actifs", valeur: "12 480" },
              { libelle: "Nouveaux prestataires (7 j)", valeur: "86" },
              { libelle: "Comptes suspendus", valeur: "9" },
              { libelle: "En liste noire", valeur: "14" },
            ].map((l) => (
              <div key={l.libelle} className="flex items-center justify-between">
                <dt className="text-muted">{l.libelle}</dt>
                <dd className="font-bold text-ink tabular">{l.valeur}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  );
}

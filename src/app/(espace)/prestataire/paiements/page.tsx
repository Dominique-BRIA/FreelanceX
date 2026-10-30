import type { Metadata } from "next";
import { Lock, Percent, Wallet } from "lucide-react";
import { TitrePage } from "@/components/espace";
import { Badge, Card, Indicateur } from "@/components/ui";
import { fcfa } from "@/lib/format";

export const metadata: Metadata = { title: "Paiements" };

const operations = [
  { date: "27 oct.", libelle: "Placard sur mesure · Christian Ndjock", brut: 380000, etat: "bloque" as const },
  { date: "21 oct.", libelle: "Portes intérieures · Paul Essomba", brut: 240000, etat: "litige" as const },
  { date: "18 oct.", libelle: "Comptoir de bar · Restaurant Le Wouri", brut: 520000, etat: "bloque" as const },
  { date: "12 oct.", libelle: "Dressing chambre d'amis · Aline Tsala", brut: 420000, etat: "verse" as const },
  { date: "4 oct.", libelle: "Meuble TV · Marc Eyenga", brut: 227000, etat: "verse" as const },
  { date: "21 sept.", libelle: "Étagères de bibliothèque · Nadège Owona", brut: 95000, etat: "verse" as const },
];

const etats = {
  bloque: { libelle: "Bloqué", ton: "brand" as const },
  litige: { libelle: "En litige", ton: "danger" as const },
  verse: { libelle: "Versé", ton: "trust" as const },
};

export default function Paiements() {
  return (
    <div className="space-y-8">
      <TitrePage titre="Paiements" sousTitre="Commission Promax : 5 %, prélevée au moment du versement." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Indicateur libelle="Bloqués" valeur={fcfa(1140000)} contexte="Versés après validation des clients" icone={<Lock className="size-5" />} />
        <Indicateur libelle="Versés en octobre" valeur={fcfa(615000)} contexte="Sur votre compte Mobile Money" icone={<Wallet className="size-5" />} ton="trust" />
        <Indicateur libelle="Commission en octobre" valeur={fcfa(32350)} contexte="5 % des montants versés" icone={<Percent className="size-5" />} ton="accent" />
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Prestation</th>
              <th className="hidden px-5 py-3 text-right font-semibold md:table-cell">Montant</th>
              <th className="hidden px-5 py-3 text-right font-semibold md:table-cell">Commission</th>
              <th className="px-5 py-3 text-right font-semibold">Net</th>
              <th className="px-5 py-3 font-semibold">État</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {operations.map((o) => {
              const commission = Math.round(o.brut * 0.05);
              return (
                <tr key={o.libelle}>
                  <td className="whitespace-nowrap px-5 py-4 text-muted">{o.date}</td>
                  <td className="px-5 py-4 font-medium text-ink">{o.libelle}</td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-right tabular md:table-cell">{fcfa(o.brut)}</td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-right text-muted tabular md:table-cell">− {fcfa(commission)}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-semibold tabular">{fcfa(o.brut - commission)}</td>
                  <td className="px-5 py-4"><Badge ton={etats[o.etat].ton}>{etats[o.etat].libelle}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

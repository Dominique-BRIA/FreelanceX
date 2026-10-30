"use client";

import { CheckCircle2, ClipboardList, Lock } from "lucide-react";
import { Indicateur } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import type { Demande, StatutDemande } from "@/data/mock";
import { fcfa } from "@/lib/format";

const fermees: StatutDemande[] = ["terminee", "remboursee", "hors_plateforme"];
const bloquees: StatutDemande[] = ["en_cours", "livree", "en_litige"];

/** Indicateurs du client, recalculés quand il paie, valide ou ouvre un litige. */
export function IndicateursClient({ demandes }: { demandes: Demande[] }) {
  const { statuts } = useDemo();
  const actuelles = demandes.map((d) => ({ ...d, statut: statuts[d.id] ?? d.statut }));
  const enCours = actuelles.filter((d) => !fermees.includes(d.statut));
  const propositions = actuelles.filter((d) => d.statut === "proposition").length;
  const fonds = actuelles.filter((d) => bloquees.includes(d.statut)).reduce((s, d) => s + (d.montant ?? 0), 0);
  const terminees = actuelles.filter((d) => d.statut === "terminee").length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Indicateur
        libelle="Demandes en cours"
        valeur={String(enCours.length)}
        contexte={propositions ? `dont ${propositions} proposition à étudier` : "Aucune proposition en attente"}
        icone={<ClipboardList className="size-5" />}
      />
      <Indicateur libelle="Fonds bloqués" valeur={fcfa(fonds)} contexte="Protégés jusqu'à votre validation" icone={<Lock className="size-5" />} ton="trust" />
      <Indicateur libelle="Prestations terminées" valeur={String(terminees)} contexte="Depuis mars 2026" icone={<CheckCircle2 className="size-5" />} ton="accent" />
    </div>
  );
}

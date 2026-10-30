import type { Metadata } from "next";
import { BadgeCheck, Inbox, Lock, Plus, Star, Wallet } from "lucide-react";
import { AFaire, LienTout, TitrePage } from "@/components/espace";
import { Histogramme, Jauge } from "@/components/charts";
import { BoutonLien, Card, Indicateur } from "@/components/ui";
import { fcfa } from "@/lib/format";
import { CarteFormule } from "./carte-formule";

export const metadata: Metadata = { title: "Espace prestataire" };

const versements = [
  { libelle: "Mai", valeur: 410000 },
  { libelle: "Juin", valeur: 520000 },
  { libelle: "Juil.", valeur: 380000 },
  { libelle: "Août", valeur: 690000 },
  { libelle: "Sept.", valeur: 560000 },
  { libelle: "Oct.", valeur: 615000 },
];

const enMilliers = (v: number) => `${Math.round(v / 1000)} k`;

export default function TableauDeBordPrestataire() {
  return (
    <div className="space-y-8">
      <TitrePage
        titre="Bonjour Brice"
        sousTitre="Voici l'essentiel de votre activité cette semaine."
        actions={
          <>
            <BoutonLien href="/prestataire/services" variante="contour">
              <Plus className="size-4" /> Ajouter un service
            </BoutonLien>
            <BoutonLien href="/prestataire/publier" variante="action">
              <Plus className="size-4" /> Publier une réalisation
            </BoutonLien>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Indicateur libelle="En attente de versement" valeur={fcfa(1140000)} contexte="Bloqués sur 3 prestations" icone={<Lock className="size-5" />} />
        <Indicateur libelle="Versé en octobre" valeur={fcfa(615000)} contexte="+10 % par rapport à septembre" icone={<Wallet className="size-5" />} ton="trust" />
        <Indicateur libelle="Nouvelles demandes" valeur="1" contexte="Répondez sous 24 h" icone={<Inbox className="size-5" />} ton="accent" />
        <Indicateur libelle="Note moyenne" valeur="4,9 / 5" contexte="38 avis confirmés" icone={<Star className="size-5" />} ton="accent" />
      </div>

      <AFaire
        taches={[
          { titre: "Envoyer une proposition à Ruth Abena", detail: "Cuisine équipée · reçue aujourd'hui", action: "Proposer un prix", href: "/prestataire/demandes/DEM-1060", urgent: true, demande: { id: "DEM-1060", statut: "envoyee" } },
          { titre: "Répondre au litige de Paul Essomba", detail: "Portes intérieures · avant le 31 oct. · 240 000 FCFA bloqués", action: "Répondre", href: "/prestataire/demandes/DEM-1033", urgent: true },
          { titre: "Déclarer la fin du comptoir du Wouri", detail: "Livraison prévue le 31 oct. · ajoutez les photos du travail", action: "Déclarer", href: "/prestataire/demandes/DEM-1047", demande: { id: "DEM-1047", statut: "en_cours" } },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-ink">Paiements reçus</h2>
              <p className="text-sm text-muted">6 derniers mois, après commission</p>
            </div>
            <LienTout href="/prestataire/paiements">Détail</LienTout>
          </div>
          <div className="mt-8">
            <Histogramme donnees={versements} format={enMilliers} />
          </div>
        </Card>

        <div className="space-y-4">
          <CarteFormule />
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">Score de confiance</p>
              <p className="font-bold text-ink tabular">96 / 100</p>
            </div>
            <div className="mt-3">
              <Jauge valeur={96} />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-trust-dark">
              <BadgeCheck className="size-4" /> Identité vérifiée jusqu&apos;en janv. 2027
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

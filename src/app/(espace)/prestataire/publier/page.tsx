import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { FormulairePublication } from "./formulaire";

export const metadata: Metadata = { title: "Publier une réalisation" };

export default function PagePublier() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Publier une réalisation" sousTitre="Montrez un travail terminé : c'est votre meilleure vitrine." />
      <FormulairePublication />
    </div>
  );
}

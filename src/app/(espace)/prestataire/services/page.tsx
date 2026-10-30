import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { GestionServices } from "./gestion";

export const metadata: Metadata = { title: "Mes services" };

export default function PageServices() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Mes services" sousTitre="Ce que les clients voient sur votre profil, avec vos tarifs." />
      <GestionServices />
    </div>
  );
}

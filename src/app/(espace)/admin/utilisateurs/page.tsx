import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { TableUtilisateurs } from "./table";

export const metadata: Metadata = { title: "Utilisateurs" };

export default function Utilisateurs() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Utilisateurs" sousTitre="Au 3ᵉ avertissement, le compte est bloqué et la personne inscrite sur la liste noire." />
      <TableUtilisateurs />
    </div>
  );
}

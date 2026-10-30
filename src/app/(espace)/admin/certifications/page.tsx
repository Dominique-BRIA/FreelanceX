import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { dossiersCertification } from "@/data/mock";
import { Examen } from "./examen";

export const metadata: Metadata = { title: "Certifications" };

export default function Certifications() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Certifications à examiner" sousTitre="Vérifiez l'identité, pas les compétences." />
      <Examen dossiers={dossiersCertification} />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRESTATAIRE_DEMO, demandes, trouverDemande } from "@/data/mock";
import { SuiviPrestataire } from "./suivi-prestataire";

export function generateStaticParams() {
  return demandes.filter((d) => d.prestataireId === PRESTATAIRE_DEMO).map((d) => ({ id: d.id }));
}

export async function generateMetadata(props: PageProps<"/prestataire/demandes/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: trouverDemande(id)?.titre ?? "Demande" };
}

export default async function PageDemandePrestataire(props: PageProps<"/prestataire/demandes/[id]">) {
  const { id } = await props.params;
  const demande = trouverDemande(id);
  if (!demande || demande.prestataireId !== PRESTATAIRE_DEMO) notFound();
  return <SuiviPrestataire demande={demande} />;
}

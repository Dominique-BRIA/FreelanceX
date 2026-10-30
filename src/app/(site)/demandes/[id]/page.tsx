import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demandes, trouverDemande, trouverPrestataire } from "@/data/mock";
import { SuiviDemande } from "./suivi";

export function generateStaticParams() {
  return demandes.map((d) => ({ id: d.id }));
}

export async function generateMetadata(props: PageProps<"/demandes/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: trouverDemande(id)?.titre ?? "Demande" };
}

export default async function PageDemande(props: PageProps<"/demandes/[id]">) {
  const { id } = await props.params;
  const demande = trouverDemande(id);
  if (!demande) notFound();
  const prestataire = trouverPrestataire(demande.prestataireId)!;
  return <SuiviDemande demande={demande} prestataire={prestataire} />;
}

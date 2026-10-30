import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CLIENT_DEMO, demandes, lienDemande, trouverDemande, trouverPrestataire } from "@/data/mock";
import { SuiviDemande } from "./suivi";

// Vue client : seules les demandes passées par l'utilisateur. Les autres renvoient vers la vue prestataire.
export function generateStaticParams() {
  return demandes.filter((d) => d.clientNom === CLIENT_DEMO).map((d) => ({ id: d.id }));
}

export async function generateMetadata(props: PageProps<"/demandes/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: trouverDemande(id)?.titre ?? "Demande" };
}

export default async function PageDemande(props: PageProps<"/demandes/[id]">) {
  const { id } = await props.params;
  const demande = trouverDemande(id);
  if (!demande) notFound();
  if (demande.clientNom !== CLIENT_DEMO) redirect(lienDemande(demande));
  const prestataire = trouverPrestataire(demande.prestataireId)!;
  return <SuiviDemande demande={demande} prestataire={prestataire} />;
}

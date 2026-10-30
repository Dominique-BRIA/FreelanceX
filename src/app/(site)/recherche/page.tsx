import type { Metadata } from "next";
import { Suspense } from "react";
import { Recherche } from "./recherche";

export const metadata: Metadata = { title: "Trouver un prestataire" };

// La page est servie statiquement ; seuls les filtres venant de l'URL arrivent en différé.
export default function PageRecherche(props: PageProps<"/recherche">) {
  return (
    <Suspense fallback={<Recherche q="" ville="" categorie="" />}>
      <RechercheDepuisUrl searchParams={props.searchParams} />
    </Suspense>
  );
}

async function RechercheDepuisUrl({ searchParams }: { searchParams: PageProps<"/recherche">["searchParams"] }) {
  const params = await searchParams;
  const lire = (cle: string) => (typeof params[cle] === "string" ? (params[cle] as string) : "");
  return <Recherche q={lire("q")} ville={lire("ville")} categorie={lire("categorie")} />;
}

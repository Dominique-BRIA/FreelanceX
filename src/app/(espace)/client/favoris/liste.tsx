"use client";

import { CartePrestataire } from "@/components/cartes";
import { Publication } from "@/components/publication";
import { BoutonLien, Card } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { prestataires, realisations } from "@/data/mock";

export function ListeFavoris() {
  const { favoris, enregistres, publiees, pret } = useDemo();
  const pros = prestataires.filter((p) => favoris[p.id]);
  const pubs = [...publiees, ...realisations].filter((r) => enregistres[r.id]);

  if (!pret) return null;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-bold text-ink">Prestataires</h2>
        {pros.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pros.map((p) => (
              <CartePrestataire key={p.id} prestataire={p} />
            ))}
          </div>
        ) : (
          <Vide texte="Ajoutez un prestataire depuis son profil avec « Ajouter aux favoris »." lien="/recherche" action="Trouver un prestataire" />
        )}
      </section>
      <section>
        <h2 className="font-bold text-ink">Réalisations enregistrées</h2>
        {pubs.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {pubs.map((r) => (
              <Publication key={r.id} realisation={r} compacte />
            ))}
          </div>
        ) : (
          <Vide texte="Enregistrez une réalisation avec le signet sous la publication." lien="/realisations" action="Voir le fil" />
        )}
      </section>
    </div>
  );
}

function Vide({ texte, lien, action }: { texte: string; lien: string; action: string }) {
  return (
    <Card className="mt-4 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">{texte}</p>
      <BoutonLien href={lien} variante="contour" taille="sm">
        {action}
      </BoutonLien>
    </Card>
  );
}

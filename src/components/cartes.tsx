import Link from "next/link";
import { Heart, MapPin, MessageCircle } from "lucide-react";
import { Avatar, Badge, BoutonLien, Card, Certifie, Note } from "@/components/ui";
import { VisuelRealisation } from "@/components/visuels";
import { trouverPrestataire, type Prestataire, type Realisation } from "@/data/mock";
import { fcfa } from "@/lib/format";

export function CartePrestataire({ prestataire }: { prestataire: Prestataire }) {
  const p = prestataire;
  return (
    <Card className="flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start gap-3">
        <Avatar nom={p.nom} teinte={p.teinte} />
        <div className="min-w-0 flex-1">
          <Link href={`/prestataires/${p.id}`} className="block truncate font-bold text-ink hover:text-brand">
            {p.nom}
          </Link>
          <p className="truncate text-sm text-muted">{p.metier}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.certifie && <Certifie court />}
        <Note note={p.note} avis={p.avis} />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="size-4 shrink-0" /> {p.ville}, {p.quartier}
      </p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div>
          <p className="text-xs text-muted">À partir de</p>
          <p className="font-bold text-ink tabular">{p.prixDepart ? fcfa(p.prixDepart) : "Sur proposition"}</p>
        </div>
        <BoutonLien href={`/prestataires/${p.id}`} variante="contour" taille="sm">
          Voir le profil
        </BoutonLien>
      </div>
    </Card>
  );
}

export function CarteRealisation({ realisation, compacte = false }: { realisation: Realisation; compacte?: boolean }) {
  const auteur = trouverPrestataire(realisation.prestataireId)!;
  return (
    <Card className="overflow-hidden p-4">
      <div className="flex items-center gap-3">
        <Avatar nom={auteur.nom} teinte={auteur.teinte} taille="sm" />
        <div className="min-w-0 flex-1">
          <Link href={`/prestataires/${auteur.id}`} className="block truncate text-sm font-semibold text-ink hover:text-brand">
            {auteur.nom}
          </Link>
          <p className="truncate text-xs text-muted">
            {auteur.ville} · {realisation.date}
          </p>
        </div>
        {auteur.certifie && <Certifie court />}
      </div>
      <div className="mt-4">
        <VisuelRealisation realisation={realisation} hauteur={compacte ? "h-40" : "h-56"} />
      </div>
      <h3 className="mt-4 font-bold leading-snug text-ink">{realisation.titre}</h3>
      {!compacte && <p className="mt-1 text-sm leading-6 text-muted">{realisation.description}</p>}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1"><Heart className="size-4" /> {realisation.jaime}</span>
          <span className="flex items-center gap-1"><MessageCircle className="size-4" /> {realisation.commentaires}</span>
        </div>
        {realisation.budget && <Badge ton="neutre">Budget {fcfa(realisation.budget)}</Badge>}
      </div>
    </Card>
  );
}

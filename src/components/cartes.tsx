import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Avatar, BoutonLien, Card, Certifie, Note } from "@/components/ui";
import type { Prestataire } from "@/data/mock";
import { fcfa } from "@/lib/format";

export function CartePrestataire({ prestataire }: { prestataire: Prestataire }) {
  const p = prestataire;
  return (
    <Card className="flex flex-col overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/prestataires/${p.id}`} className="relative -mx-5 -mt-5 mb-4 block h-28 bg-gradient-to-br from-brand-100 to-brand-50" tabIndex={-1} aria-hidden>
        {p.couverture && <Image src={p.couverture} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />}
      </Link>
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

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Avatar, BoutonLien, Card, Certifie, Note, PaiementDirect, PaiementSecurise, StatutDemandeBadge } from "@/components/ui";
import type { Demande, Prestataire, Service } from "@/data/mock";
import { fcfa } from "@/lib/format";

/** Section 3.4 du cahier des charges v1.1 : badge du mode de paiement, rien s'il n'est pas renseigné. */
function BadgePaiement({ prestataire }: { prestataire: Prestataire }) {
  if (prestataire.modePaiement === "securise") return <PaiementSecurise />;
  if (prestataire.modePaiement === "direct") return <PaiementDirect />;
  return null;
}

export function CartePrestataire({ prestataire }: { prestataire: Prestataire }) {
  const p = prestataire;
  return (
    <Card className="flex flex-col overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/prestataires/${p.id}`} className="relative -mx-5 -mt-5 mb-4 block h-28 bg-gradient-to-br from-brand-100 to-brand-50" tabIndex={-1} aria-hidden>
        {p.couverture && <Image src={p.couverture} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />}
      </Link>
      <div className="flex items-start gap-3">
        <Avatar nom={p.nom} teinte={p.teinte} verifie={p.certifie} />
        <div className="min-w-0 flex-1">
          <Link href={`/prestataires/${p.id}`} className="block truncate font-bold text-ink hover:text-brand">
            {p.nom}
          </Link>
          <p className="truncate text-sm text-muted">{p.metier}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.certifie && <Certifie court />}
        <BadgePaiement prestataire={p} />
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

export function CarteService({ service, prestataire, image }: { service: Service; prestataire: Prestataire; image?: string }) {
  const prix = service.prix === null ? "Sur devis" : `${fcfa(service.prix)}${service.unite ? ` ${service.unite}` : ""}`;
  return (
    <Link href={`/prestataires/${prestataire.id}#services`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition group-hover:-translate-y-0.5 group-hover:shadow-lift">
        {image && (
          <div className="relative h-36 bg-canvas">
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 300px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-bold text-ink group-hover:text-brand">{service.titre}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{service.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <BadgePaiement prestataire={prestataire} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-ink tabular">{prix}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <Clock className="size-4 shrink-0" /> {service.delai}
            </p>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
            <Avatar nom={prestataire.nom} teinte={prestataire.teinte} taille="sm" verifie={prestataire.certifie} />
            <span className="truncate text-sm font-semibold text-ink">{prestataire.nom}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function CarteDemande({ demande }: { demande: Demande }) {
  const d = demande;
  const proposition = d.statut === "proposition";
  return (
    <Card className="flex flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted">{d.id}</span>
        <StatutDemandeBadge statut={d.statut} />
      </div>
      <h3 className="mt-3 font-bold text-ink">{d.titre}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="size-4 shrink-0" /> {d.clientNom}, {d.clientVille}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted">Montant</dt>
          <dd className="font-bold text-ink tabular">{d.montant === null ? "À définir" : fcfa(d.montant)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Délai</dt>
          <dd className="font-semibold text-ink">{d.delai}</dd>
        </div>
      </dl>
      <BoutonLien href={`/demandes/${d.id}`} variante={proposition ? "action" : "contour"} taille="sm" className="mt-5">
        {proposition ? "Voir la proposition" : "Voir la demande"}
      </BoutonLien>
    </Card>
  );
}

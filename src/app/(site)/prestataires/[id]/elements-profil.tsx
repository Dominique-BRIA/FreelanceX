"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Flag, Heart, X } from "lucide-react";
import { Card } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { iconesCategorie } from "@/components/visuels";
import { PRESTATAIRE_DEMO, realisations, trouverPrestataire, type Realisation } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";
import { BoutonDemande } from "./demande-modale";

export function BoutonFavori({ prestataireId }: { prestataireId: string }) {
  const { favoris, basculerFavori } = useDemo();
  const actif = !!favoris[prestataireId];
  return (
    <button
      type="button"
      onClick={() => basculerFavori(prestataireId)}
      aria-pressed={actif}
      className={cx("flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-medium", actif ? "text-accent" : "text-muted hover:text-brand")}
    >
      <Heart className={cx("size-4", actif && "fill-accent")} /> {actif ? "Dans vos favoris" : "Ajouter aux favoris"}
    </button>
  );
}

/** Signalement d'un profil : dans la maquette, on affiche seulement la confirmation. */
export function BoutonSignaler() {
  const [signale, setSignale] = useState(false);
  if (signale) {
    return (
      <p role="status" className="px-1 text-sm text-muted">
        Merci, l&apos;équipe FreelanceX va examiner ce profil.
      </p>
    );
  }
  return (
    <button type="button" onClick={() => setSignale(true)} className="flex items-center gap-2 px-1 text-sm font-medium text-muted hover:text-ink hover:underline">
      <Flag className="size-4" /> Signaler ce profil
    </button>
  );
}

/** Services ajoutés pendant la démo par le prestataire de démonstration. */
export function ServicesAjoutes({ prestataireId }: { prestataireId: string }) {
  const { services } = useDemo();
  if (prestataireId !== PRESTATAIRE_DEMO) return null;
  return (
    <>
      {services.map((s) => (
        <Card key={s.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="font-bold text-ink">{s.titre}</p>
            <p className="mt-1 text-sm text-muted">{s.description}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock className="size-3.5" /> {s.delai}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <p className="font-bold text-ink tabular">{s.prix ? fcfa(s.prix) : "Sur proposition"}</p>
            <span className="text-xs font-semibold text-trust-dark">Ajouté par vous</span>
          </div>
        </Card>
      ))}
    </>
  );
}

type Filtre = "tout" | "avant_apres";
type Vue = "avant" | "apres" | "cote";

/** Photo d'une réalisation, ou son dégradé s'il n'y a pas de photo. */
function ImageRealisation({ r, src, alt, ajustement = "object-cover" }: { r: Realisation; src?: string; alt: string; ajustement?: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes="(min-width: 768px) 600px, 100vw" className={ajustement} unoptimized={src.startsWith("data:")} />;
  }
  const Icone = iconesCategorie[r.categorie];
  return (
    <span className={cx("flex h-full w-full items-center justify-center bg-gradient-to-br", r.palette[1])}>
      <Icone className="size-12 text-white/60" strokeWidth={1.5} aria-hidden />
    </span>
  );
}

/** Galerie de réalisations du profil public (L2-07). */
export function RealisationsProfil({ prestataireId }: { prestataireId: string }) {
  const { publiees } = useDemo();
  const [filtre, setFiltre] = useState<Filtre>("tout");
  const [ouverte, setOuverte] = useState<number | null>(null);
  const toutes = [...publiees, ...realisations].filter((r) => r.prestataireId === prestataireId);
  if (!toutes.length) return null;
  const liste = filtre === "avant_apres" ? toutes.filter((r) => r.photos?.avant) : toutes;
  const filtres: { id: Filtre; libelle: string }[] = [
    { id: "tout", libelle: "Tout" },
    { id: "avant_apres", libelle: "Avant / après" },
  ];

  return (
    <section id="realisations">
      <h2 className="text-xl font-bold text-ink">
        Galerie de réalisations <span className="font-medium text-muted">({toutes.length})</span>
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {filtres.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtre === f.id}
            onClick={() => setFiltre(f.id)}
            className={cx(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              filtre === f.id ? "bg-brand text-white" : "border border-line bg-white text-slate-600 hover:border-brand/40 hover:text-brand",
            )}
          >
            {f.libelle}
          </button>
        ))}
      </div>

      {liste.length ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {liste.map((r, i) => (
            <li key={r.id}>
              <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
                <button type="button" onClick={() => setOuverte(i)} className="block h-full w-full text-left">
                  <span className="relative block h-48 bg-canvas">
                    <ImageRealisation r={r} src={r.photos?.apres} alt={r.titre} />
                    {r.photos?.avant && (
                      <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-2 py-0.5 text-xs font-bold text-white">Avant / après</span>
                    )}
                  </span>
                  <span className="block p-4">
                    <span className="block font-bold text-ink">{r.titre}</span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-sm text-muted">
                      {r.budget !== null && <span className="font-semibold text-ink tabular">{fcfa(r.budget)}</span>}
                      <span>{r.date}</span>
                    </span>
                  </span>
                </button>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">Aucune réalisation avec photos avant / après pour l&apos;instant.</p>
      )}

      {ouverte !== null && liste[ouverte] && (
        <Visionneuse
          liste={liste}
          index={ouverte}
          changer={setOuverte}
          fermer={() => setOuverte(null)}
          demande={prestataireId !== PRESTATAIRE_DEMO ? trouverPrestataire(prestataireId)?.nom : undefined}
        />
      )}
    </section>
  );
}

function Visionneuse({
  liste,
  index,
  changer,
  fermer,
  demande,
}: {
  liste: Realisation[];
  index: number;
  changer: (i: number) => void;
  fermer: () => void;
  /** Nom du prestataire si le bouton « Demander un travail similaire » doit s'afficher. */
  demande?: string;
}) {
  const r = liste[index];
  const plusieurs = liste.length > 1;
  // Côte à côte par défaut sur ordinateur, photo après sur mobile.
  const [vue, setVue] = useState<Vue>(() => (window.matchMedia("(min-width: 768px)").matches ? "cote" : "apres"));
  const fenetre = useRef<HTMLDivElement>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  const total = liste.length;
  const precedente = () => changer((index - 1 + total) % total);
  const suivante = () => changer((index + 1) % total);

  // À l'ouverture : la page ne défile plus derrière et le focus va sur le bouton Fermer.
  useEffect(() => {
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    boutonFermer.current?.focus();
    return () => {
      document.body.style.overflow = defilement;
    };
  }, []);

  // Échap pour fermer, flèches pour naviguer (sauf pendant la saisie ou si la fenêtre de demande est ouverte).
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      const cible = e.target as HTMLElement;
      if (cible.closest("input, textarea, select") || fenetre.current?.querySelector('[role="dialog"]')) return;
      if (e.key === "Escape") fermer();
      if (total > 1 && e.key === "ArrowLeft") changer((index - 1 + total) % total);
      if (total > 1 && e.key === "ArrowRight") changer((index + 1) % total);
    };
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [index, total, fermer, changer]);

  const avant = r.photos?.avant;
  const vues: { id: Vue; libelle: string }[] = [
    { id: "avant", libelle: "Avant" },
    { id: "apres", libelle: "Après" },
    { id: "cote", libelle: "Côte à côte" },
  ];
  const cadre = (src: string | undefined, alt: string, etiquette?: string) => (
    <div className="relative h-64 bg-slate-900 sm:h-80 md:h-[60vh]">
      <ImageRealisation r={r} src={src} alt={alt} ajustement="object-contain" />
      {etiquette && <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-2 py-0.5 text-xs font-bold text-white">{etiquette}</span>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-6" role="dialog" aria-modal aria-labelledby="visionneuse-titre">
      <button type="button" aria-label="Fermer" tabIndex={-1} className="absolute inset-0 bg-slate-900/80" onClick={fermer} />
      <div ref={fenetre} className="relative flex h-full w-full flex-col overflow-y-auto bg-white md:h-auto md:max-h-full md:max-w-5xl md:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <h2 id="visionneuse-titre" className="truncate font-bold text-ink">{r.titre}</h2>
          <button ref={boutonFermer} type="button" onClick={fermer} className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-canvas" aria-label="Fermer la visionneuse">
            <X className="size-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_280px]">
          <div className="relative">
            {avant ? (
              vue === "cote" ? (
                <div className="grid gap-1 md:grid-cols-2">
                  {cadre(avant, `${r.titre}, avant`, "Avant")}
                  {cadre(r.photos?.apres, `${r.titre}, après`, "Après")}
                </div>
              ) : vue === "avant" ? (
                cadre(avant, `${r.titre}, avant`, "Avant")
              ) : (
                cadre(r.photos?.apres, `${r.titre}, après`, "Après")
              )
            ) : (
              cadre(r.photos?.apres, r.titre)
            )}
            {plusieurs && (
              <>
                <button type="button" onClick={precedente} aria-label="Réalisation précédente" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow-card hover:bg-white">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={suivante} aria-label="Réalisation suivante" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow-card hover:bg-white">
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            {avant && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Affichage des photos">
                {vues.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={vue === v.id}
                    onClick={() => setVue(v.id)}
                    className={cx(
                      "rounded-full px-3 py-1 text-sm font-semibold transition-colors",
                      vue === v.id ? "bg-brand text-white" : "border border-line bg-white text-slate-600 hover:text-brand",
                    )}
                  >
                    {v.libelle}
                  </button>
                ))}
              </div>
            )}
            <p className="text-sm leading-6 text-slate-600">{r.description}</p>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {r.budget !== null && (
                <div>
                  <dt className="text-xs text-muted">Budget</dt>
                  <dd className="font-bold text-ink tabular">{fcfa(r.budget)}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-muted">Date</dt>
                <dd className="font-semibold text-ink">{r.date}</dd>
              </div>
            </dl>
            {demande && <BoutonDemande prestataire={demande} service={r.titre} libelle="Demander un travail similaire" variante="action" taille="md" />}
            {plusieurs && (
              <p className="text-xs text-muted tabular">
                {index + 1} sur {liste.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Award, Camera, Info, Plus, SlidersHorizontal } from "lucide-react";
import { Avatar, BoutonLien, Card, Certifie, Note } from "@/components/ui";
import { Publication } from "@/components/publication";
import { useDemo } from "@/components/demo-store";
import { categories, prestataires, realisations } from "@/data/mock";
import { cx } from "@/lib/format";

const prosDeLaSemaine = [...prestataires].filter((p) => p.certifie).sort((a, b) => b.note - a.note || b.avis - a.avis).slice(0, 3);

export function Fil() {
  const { publiees, enregistres } = useDemo();
  const [filtre, setFiltre] = useState("");
  const [filtresMobiles, setFiltresMobiles] = useState(false);
  const toutes = [...publiees, ...realisations];
  const presentes = categories.filter((c) => toutes.some((r) => r.categorie === c.id));
  const liste = toutes.filter((r) => (filtre === "enregistrees" ? enregistres[r.id] : !filtre || r.categorie === filtre));

  const filtres = (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-bold text-ink">
          <SlidersHorizontal className="size-4 text-brand" /> Filtrer le fil
        </p>
        {filtre && (
          <button type="button" onClick={() => setFiltre("")} className="text-xs font-semibold text-accent-dark hover:underline">
            Réinitialiser
          </button>
        )}
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">Corps de métier</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {[{ id: "", nom: "Tous les métiers" }, ...presentes].map((c) => (
          <button
            key={c.id || "tout"}
            type="button"
            onClick={() => {
              setFiltre(c.id);
              setFiltresMobiles(false);
            }}
            className={cx(
              "rounded-full px-3 py-1.5 text-xs font-semibold",
              filtre === c.id ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand",
            )}
          >
            {c.nom}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setFiltre(filtre === "enregistrees" ? "" : "enregistrees")}
        className={cx(
          "mt-4 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold",
          filtre === "enregistrees" ? "bg-brand text-white" : "bg-canvas text-ink hover:bg-brand-50",
        )}
      >
        Mes publications enregistrées
      </button>
    </Card>
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
            <span className="size-1.5 rounded-full bg-accent" /> Galerie des travaux réalisés
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-brand">Fil des réalisations</h1>
        </div>
        <button
          type="button"
          onClick={() => setFiltresMobiles((v) => !v)}
          className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-brand lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filtres
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_300px]">
        <aside className={cx("space-y-4", !filtresMobiles && "hidden lg:block")}>
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-brand p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold">Espace prestataire</span>
                <Camera className="size-5 text-white/70" />
              </div>
              <p className="mt-3 text-lg font-bold">Valorisez votre travail</p>
              <p className="mt-1 text-sm leading-6 text-white/75">Une photo avant / après attire des demandes de clients près de chez vous.</p>
              <BoutonLien href="/prestataire/publier" variante="action" className="mt-4 w-full">
                <Plus className="size-4" /> Publier une réalisation
              </BoutonLien>
            </div>
            {filtres}
          </div>
        </aside>

        <section className="min-w-0 space-y-6">
          {liste.map((r) => (
            <Publication key={r.id} realisation={r} />
          ))}
          {!liste.length && (
            <Card className="p-8 text-center text-sm text-muted">
              {filtre === "enregistrees" ? "Vous n'avez encore rien enregistré : utilisez le signet sous une publication." : "Aucune publication dans cette catégorie."}
            </Card>
          )}
        </section>

        <aside className="hidden space-y-4 xl:block">
          <div className="space-y-4 xl:sticky xl:top-24">
            <Card className="p-5">
              <p className="flex items-center gap-2 font-bold text-ink">
                <Award className="size-5 text-accent" /> Prestataires de la semaine
              </p>
              <ul className="mt-4 space-y-3">
                {prosDeLaSemaine.map((p) => (
                  <li key={p.id}>
                    <Link href={`/prestataires/${p.id}`} className="flex items-center gap-3 rounded-xl bg-canvas p-3 hover:bg-brand-50">
                      <Avatar nom={p.nom} teinte={p.teinte} taille="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{p.nom}</span>
                        <span className="block truncate text-xs text-muted">{p.metier}</span>
                        <span className="mt-1 flex items-center gap-2">
                          <Note note={p.note} />
                          <Certifie court />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <BoutonLien href="/recherche" variante="contour" taille="sm" className="mt-4 w-full">
                Tous les prestataires
              </BoutonLien>
            </Card>
            <Card className="bg-brand-50/60 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <Info className="size-4" /> Fil ou avis officiels ?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                <span className="font-semibold text-ink">Les commentaires du fil</span> sont ouverts à tous pour échanger.{" "}
                <span className="font-semibold text-ink">Les avis officiels</span> ne viennent que de clients ayant payé une
                prestation sur la plateforme.
              </p>
            </Card>
          </div>
        </aside>
      </div>
    </main>
  );
}

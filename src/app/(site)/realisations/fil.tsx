"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle, MessageSquare, Plus } from "lucide-react";
import { Avatar, Badge, BoutonLien, Card, Certifie } from "@/components/ui";
import { VisuelRealisation } from "@/components/visuels";
import { categories, realisations, trouverPrestataire } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

export function Fil() {
  const [filtre, setFiltre] = useState("");
  const [aimes, setAimes] = useState<Record<string, boolean>>({});
  const presentes = categories.filter((c) => realisations.some((r) => r.categorie === c.id));
  const liste = realisations.filter((r) => !filtre || r.categorie === filtre);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand">Réalisations</h1>
          <p className="mt-1 text-muted">Les travaux publiés par les prestataires.</p>
        </div>
        <BoutonLien href="/prestataire" variante="action" taille="sm">
          <Plus className="size-4" /> Publier
        </BoutonLien>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {[{ id: "", nom: "Tout" }, ...presentes].map((c) => (
          <button
            key={c.id || "tout"}
            type="button"
            onClick={() => setFiltre(c.id)}
            className={cx(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold",
              filtre === c.id ? "bg-brand text-white" : "bg-white text-slate-600 ring-1 ring-line hover:text-brand",
            )}
          >
            {c.nom}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {liste.map((r) => {
          const auteur = trouverPrestataire(r.prestataireId)!;
          const aime = aimes[r.id];
          return (
            <Card key={r.id} className="p-5">
              <div className="flex items-center gap-3">
                <Avatar nom={auteur.nom} teinte={auteur.teinte} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/prestataires/${auteur.id}`} className="font-semibold text-ink hover:text-brand">
                      {auteur.nom}
                    </Link>
                    {auteur.certifie && <Certifie court />}
                  </div>
                  <p className="text-sm text-muted">
                    {auteur.metier} · {auteur.ville} · {r.date}
                  </p>
                </div>
              </div>
              <h2 className="mt-4 text-lg font-bold leading-snug text-ink">{r.titre}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{r.description}</p>
              <div className="mt-4">
                <VisuelRealisation realisation={r} hauteur="h-64" />
              </div>
              {r.budget && (
                <div className="mt-3">
                  <Badge ton="neutre">Budget du chantier : {fcfa(r.budget)}</Badge>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAimes((a) => ({ ...a, [r.id]: !a[r.id] }))}
                    className={cx("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-canvas", aime ? "text-accent" : "text-muted")}
                    aria-pressed={aime}
                  >
                    <Heart className={cx("size-4", aime && "fill-accent")} /> {r.jaime + (aime ? 1 : 0)}
                  </button>
                  <span className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-muted">
                    <MessageCircle className="size-4" /> {r.commentaires}
                  </span>
                  <button type="button" className="rounded-lg px-2.5 py-1.5 text-muted hover:bg-canvas" aria-label="Enregistrer">
                    <Bookmark className="size-4" />
                  </button>
                </div>
                <BoutonLien href="/messagerie" variante="primaire" taille="sm">
                  <MessageSquare className="size-4" /> Message
                </BoutonLien>
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

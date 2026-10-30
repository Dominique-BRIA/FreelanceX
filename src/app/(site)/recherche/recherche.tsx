"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CartePrestataire } from "@/components/cartes";
import { Card } from "@/components/ui";
import { categories, prestataires, type Formule } from "@/data/mock";
import { cx } from "@/lib/format";

const villes = ["Douala", "Yaoundé", "Bafoussam", "Garoua"];
const bonusFormule: Record<Formule, number> = { classique: 0, pro: 4, promax: 8 };

type Tri = "pertinence" | "note" | "prix";

export function Recherche(initial: { q: string; ville: string; categorie: string }) {
  const [q, setQ] = useState(initial.q);
  const [ville, setVille] = useState(initial.ville);
  const [categorie, setCategorie] = useState(initial.categorie);
  const [certifies, setCertifies] = useState(false);
  const [tri, setTri] = useState<Tri>("pertinence");
  const [filtresMobiles, setFiltresMobiles] = useState(false);

  const resultats = useMemo(() => {
    const texte = q.trim().toLowerCase();
    const liste = prestataires.filter((p) => {
      if (ville && p.ville !== ville) return false;
      if (categorie && p.categorie !== categorie) return false;
      if (certifies && !p.certifie) return false;
      if (texte) {
        const champ = [p.nom, p.metier, ...p.specialites, ...p.services.map((s) => s.titre)].join(" ").toLowerCase();
        return champ.includes(texte);
      }
      return true;
    });
    // Pertinence : note, score de confiance, puis bonus de certification et d'abonnement (ils reflètent le sérieux)
    const score = (p: (typeof prestataires)[number]) => p.note * 10 + p.scoreConfiance / 10 + (p.certifie ? 6 : 0) + bonusFormule[p.formule];
    return [...liste].sort((a, b) => {
      if (tri === "note") return b.note - a.note;
      if (tri === "prix") return (a.prixDepart ?? Infinity) - (b.prixDepart ?? Infinity);
      return score(b) - score(a);
    });
  }, [q, ville, categorie, certifies, tri]);

  const filtres = (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-ink">Catégorie</p>
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand"
        >
          <option value="">Toutes</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm font-bold text-ink">Ville</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["", ...villes].map((v) => (
            <button
              key={v || "toutes"}
              type="button"
              onClick={() => setVille(v)}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs font-semibold",
                ville === v ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50",
              )}
            >
              {v || "Toutes"}
            </button>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink">
        <input type="checkbox" checked={certifies} onChange={(e) => setCertifies(e.target.checked)} className="size-4 accent-brand" />
        Identité vérifiée uniquement
      </label>
    </div>
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand">Trouver un prestataire</h1>
      <label className="mt-6 flex h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 shadow-card focus-within:border-brand">
        <Search className="size-5 text-muted" />
        <span className="sr-only">Rechercher</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Métier, service ou nom…"
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <Card className="sticky top-32 p-5">{filtres}</Card>
        </aside>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              <span className="font-bold text-ink">{resultats.length}</span> prestataire{resultats.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltresMobiles((v) => !v)}
                className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-brand lg:hidden"
              >
                <SlidersHorizontal className="size-4" /> Filtres
              </button>
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value as Tri)}
                aria-label="Trier"
                className="h-10 rounded-xl border border-line bg-white px-3 text-sm font-medium outline-none"
              >
                <option value="pertinence">Les plus pertinents</option>
                <option value="note">Mieux notés</option>
                <option value="prix">Prix croissant</option>
              </select>
            </div>
          </div>
          {filtresMobiles && <Card className="mt-4 p-5 lg:hidden">{filtres}</Card>}

          {resultats.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {resultats.map((p) => (
                <CartePrestataire key={p.id} prestataire={p} />
              ))}
            </div>
          ) : (
            <Card className="mt-5 p-10 text-center">
              <p className="font-semibold text-ink">Aucun prestataire ne correspond.</p>
              <p className="mt-1 text-sm text-muted">Essayez une autre ville ou retirez un filtre.</p>
            </Card>
          )}
          <p className="mt-6 text-xs text-muted">
            Le classement tient compte des avis, du score de confiance, de la certification d&apos;identité et de la formule
            d&apos;abonnement.
          </p>
        </section>
      </div>
    </main>
  );
}

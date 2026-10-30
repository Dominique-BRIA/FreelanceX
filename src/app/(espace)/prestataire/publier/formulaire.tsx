"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Bouton, Card } from "@/components/ui";
import { Publication } from "@/components/publication";
import { lireImage } from "@/components/modale";
import { useDemo } from "@/components/demo-store";
import { categories, PRESTATAIRE_DEMO, type CategorieId, type Realisation } from "@/data/mock";
import { cx } from "@/lib/format";

const champ = "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

function ChoixPhoto({ libelle, valeur, onChange }: { libelle: string; valeur?: string; onChange: (v?: string) => void }) {
  const entree = useRef<HTMLInputElement>(null);
  const [erreur, setErreur] = useState("");
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{libelle}</p>
      <input
        ref={entree}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            setErreur("");
            onChange(await lireImage(f));
          } catch {
            setErreur("Cette image n'a pas pu être lue.");
          }
          e.target.value = "";
        }}
      />
      {valeur ? (
        <div className="relative mt-1.5 h-40 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- aperçu local d'un fichier choisi */}
          <img src={valeur} alt={libelle} className="size-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-danger"
          >
            <Trash2 className="size-3.5" /> Retirer
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => entree.current?.click()}
          className="mt-1.5 flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line text-sm text-muted hover:border-brand hover:text-brand"
        >
          <ImagePlus className="size-6" /> Choisir une photo
        </button>
      )}
      {erreur && <p className="mt-1 text-xs text-danger">{erreur}</p>}
    </div>
  );
}

export function FormulairePublication() {
  const router = useRouter();
  const { publier } = useDemo();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState<CategorieId>("batiment");
  const [budget, setBudget] = useState("");
  const [avant, setAvant] = useState<string>();
  const [apres, setApres] = useState<string>();

  const montant = Number(budget.replace(/\s/g, "")) || null;
  const apercu: Realisation = {
    id: "apercu",
    prestataireId: PRESTATAIRE_DEMO,
    titre: titre || "Titre de votre réalisation",
    description: description || "Décrivez le travail réalisé, les matériaux, la durée…",
    categorie,
    budget: montant,
    date: "à l'instant",
    jaime: 0,
    commentaires: 0,
    avantApres: !!avant,
    palette: ["from-slate-300 to-slate-500", "from-amber-600 to-amber-800"],
    photos: apres ? { avant, apres } : undefined,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Card className="p-6">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            publier({
              prestataireId: apercu.prestataireId,
              titre: titre.trim(),
              description: description.trim(),
              categorie,
              budget: montant,
              avantApres: apercu.avantApres,
              palette: apercu.palette,
              photos: apercu.photos,
            });
            router.push("/realisations");
          }}
        >
          <label className="block">
            <span className="text-sm font-semibold text-ink">Titre</span>
            <input required value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex. cuisine en L pour un appartement à Kotto" className={champ} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Description</span>
            <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={cx(champ, "h-auto py-2")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Catégorie</span>
              <select value={categorie} onChange={(e) => setCategorie(e.target.value as CategorieId)} className={champ}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Budget du chantier (facultatif)</span>
              <input value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="numeric" placeholder="FCFA" className={champ} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ChoixPhoto libelle="Photo avant (facultative)" valeur={avant} onChange={setAvant} />
            <ChoixPhoto libelle="Photo du résultat" valeur={apres} onChange={setApres} />
          </div>
          <p className="text-xs text-muted">Évitez les photos où l&apos;on reconnaît des personnes sans leur accord.</p>
          <Bouton type="submit" variante="action" disabled={!titre.trim() || !description.trim()}>
            Publier sur le fil
          </Bouton>
        </form>
      </Card>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">Aperçu</p>
        <div className="pointer-events-none">
          <Publication realisation={apercu} compacte />
        </div>
      </div>
    </div>
  );
}

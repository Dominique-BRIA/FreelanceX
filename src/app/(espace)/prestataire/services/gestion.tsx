"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Clock, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Badge, Bouton, Card } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { PRESTATAIRE_DEMO, trouverPrestataire } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const champ = "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

export function GestionServices() {
  const { services, ajouterService, retirerService } = useDemo();
  const existants = trouverPrestataire(PRESTATAIRE_DEMO)!.services;
  const [masques, setMasques] = useState<Record<string, boolean>>({});
  const [ouvert, setOuvert] = useState(false);
  const [surDevis, setSurDevis] = useState(false);
  const [ajoute, setAjoute] = useState("");

  const tous = [...existants.map((s) => ({ ...s, ajoute: false })), ...services.map((s) => ({ ...s, ajoute: true }))];

  return (
    <div className="space-y-6">
      {ajoute && (
        <p className="flex items-center gap-2 rounded-xl bg-trust-50 px-4 py-3 text-sm font-medium text-trust-dark">
          <CheckCircle2 className="size-4" /> « {ajoute} » est en ligne sur{" "}
          <Link href={`/prestataires/${PRESTATAIRE_DEMO}`} className="underline">votre profil</Link>.
        </p>
      )}

      <Card className="divide-y divide-line">
        {tous.map((s) => (
          <div key={s.id} className={cx("flex flex-col gap-3 p-5 sm:flex-row sm:items-center", masques[s.id] && "opacity-50")}>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-ink">{s.titre}</p>
                {masques[s.id] && <Badge>Désactivé</Badge>}
                {s.ajoute && <Badge ton="trust">Nouveau</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted">{s.description}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><Clock className="size-3.5" /> {s.delai}</p>
            </div>
            <p className="font-bold text-ink tabular sm:w-40 sm:text-right">{s.prix ? fcfa(s.prix) : "Sur proposition"}</p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setMasques((m) => ({ ...m, [s.id]: !m[s.id] }))}
                className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-brand"
                aria-label={masques[s.id] ? "Réactiver" : "Désactiver"}
                title={masques[s.id] ? "Réactiver" : "Désactiver"}
              >
                {masques[s.id] ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
              {s.ajoute && (
                <button type="button" onClick={() => retirerService(s.id)} className="rounded-lg p-2 text-muted hover:bg-danger-50 hover:text-danger" aria-label="Supprimer" title="Supprimer">
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>

      {ouvert ? (
        <Card className="p-6">
          <h2 className="font-bold text-ink">Nouveau service</h2>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const titre = String(f.get("titre")).trim();
              ajouterService({
                titre,
                description: String(f.get("description")).trim(),
                prix: surDevis ? null : Number(String(f.get("prix")).replace(/\s/g, "")) || null,
                delai: String(f.get("delai")).trim() || "À convenir",
              });
              setAjoute(titre);
              setOuvert(false);
              setSurDevis(false);
            }}
          >
            <label className="block">
              <span className="text-sm font-semibold text-ink">Nom du service</span>
              <input name="titre" required placeholder="Ex. pose de parquet" className={champ} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Description</span>
              <textarea name="description" required rows={3} className={cx(champ, "h-auto py-2")} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-ink">Prix de départ (FCFA)</span>
                <input name="prix" disabled={surDevis} inputMode="numeric" placeholder="Ex. 50 000" className={cx(champ, "disabled:bg-canvas")} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Délai</span>
                <input name="delai" placeholder="Ex. 3 jours" className={champ} />
              </label>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={surDevis} onChange={(e) => setSurDevis(e.target.checked)} className="size-4 accent-brand" />
              Prix sur proposition uniquement
            </label>
            <div className="flex gap-3">
              <Bouton type="submit" variante="action">Ajouter le service</Bouton>
              <Bouton variante="discret" onClick={() => setOuvert(false)}>Annuler</Bouton>
            </div>
          </form>
        </Card>
      ) : (
        <Bouton variante="action" onClick={() => setOuvert(true)}>
          <Plus className="size-4" /> Ajouter un service
        </Bouton>
      )}
    </div>
  );
}

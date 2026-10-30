"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { Bouton, BoutonLien, Card } from "@/components/ui";
import { categories, formules } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const etapes = ["Votre activité", "Votre profil", "Conditions", "Formule"];

const champ = "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

export function Activation() {
  const [etape, setEtape] = useState(0);
  const [formule, setFormule] = useState<string>("pro");
  const [accepte, setAccepte] = useState(false);
  const termine = etape === etapes.length;

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wider text-accent">Devenir prestataire</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand">Activez votre espace prestataire</h1>
      <p className="mt-2 text-muted">Sur votre compte actuel : vous gardez votre espace client, aucun nouveau compte n&apos;est créé.</p>

      <ol className="mt-8 flex gap-2">
        {etapes.map((e, i) => (
          <li key={e} className="flex-1">
            <div className={cx("h-1.5 rounded-full", i < etape ? "bg-trust" : i === etape ? "bg-accent" : "bg-slate-200")} />
            <p className={cx("mt-2 hidden text-xs font-semibold sm:block", i === etape ? "text-ink" : "text-muted")}>{e}</p>
          </li>
        ))}
      </ol>

      <Card className="mt-6 p-6 sm:p-8">
        {etape === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">Que proposez-vous ?</h2>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Métier</span>
              <input placeholder="Ex. menuisier agenceur" className={champ} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Catégorie principale</span>
              <select className={champ}>
                {categories.map((c) => (
                  <option key={c.id}>{c.nom}</option>
                ))}
              </select>
            </label>
          </div>
        )}
        {etape === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">Votre profil professionnel</h2>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Présentation</span>
              <textarea rows={4} placeholder="Votre expérience, vos spécialités…" className={cx(champ, "h-auto py-2")} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-semibold text-ink">Ville</span>
                <input placeholder="Douala" className={champ} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Zone d&apos;intervention</span>
                <input placeholder="20 km" className={champ} />
              </label>
            </div>
          </div>
        )}
        {etape === 2 && (
          <div>
            <h2 className="text-lg font-bold text-ink">Conditions des prestataires</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                "Les paiements faits sur la plateforme sont bloqués jusqu'à la validation du client, puis versés sur votre compte.",
                "Une commission est prélevée au moment du versement, selon votre formule.",
                "En cas de désaccord, l'équipe FreelanceX tranche à partir des preuves des deux parties.",
                "Une fraude avérée entraîne un avertissement ; au troisième, le compte est bloqué.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-trust" /> {t}
                </li>
              ))}
            </ul>
            <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} className="size-4 accent-brand" />
              J&apos;accepte ces conditions
            </label>
          </div>
        )}
        {etape === 3 && (
          <div>
            <h2 className="text-lg font-bold text-ink">Choisissez une formule</h2>
            <p className="mt-1 text-sm text-muted">Vous pourrez en changer à tout moment.</p>
            <div className="mt-4 space-y-2">
              {formules.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormule(f.id)}
                  className={cx(
                    "flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left",
                    formule === f.id ? "border-brand bg-brand-50" : "border-line hover:border-brand/40",
                  )}
                >
                  <span>
                    <span className="block font-bold text-ink">{f.nom}</span>
                    <span className="block text-sm text-muted">Commission {f.commission} %</span>
                  </span>
                  <span className="font-bold text-ink tabular">{f.prix ? `${fcfa(f.prix)} / mois` : "Gratuit"}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {termine && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-trust" />
            <h2 className="mt-4 text-2xl font-bold text-ink">Votre espace prestataire est actif</h2>
            <p className="mt-2 text-muted">Publiez votre premier service, puis faites certifier votre identité pour inspirer confiance.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <BoutonLien href="/prestataire">Aller à mon espace</BoutonLien>
              <BoutonLien href="/prestataire/certification" variante="contour">Certifier mon identité</BoutonLien>
            </div>
          </div>
        )}

        {!termine && (
          <div className="mt-8 flex justify-between">
            <Bouton variante="discret" onClick={() => setEtape((e) => e - 1)} disabled={etape === 0}>
              Retour
            </Bouton>
            <Bouton onClick={() => setEtape((e) => e + 1)} disabled={etape === 2 && !accepte}>
              {etape === etapes.length - 1 ? "Activer mon espace" : "Continuer"}
            </Bouton>
          </div>
        )}
      </Card>
    </main>
  );
}

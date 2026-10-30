import Link from "next/link";
import { ArrowRight, BadgeCheck, FileCheck2, Lock, MapPin, Search, ShieldCheck, Star, Wallet } from "lucide-react";
import { BoutonLien, Card, EnTete } from "@/components/ui";
import { CartePrestataire, CarteRealisation } from "@/components/cartes";
import { iconesCategorie } from "@/components/visuels";
import { categories, prestataires, realisations } from "@/data/mock";
import { compact } from "@/lib/format";

const villes = ["Douala", "Yaoundé", "Bafoussam", "Garoua", "Kribi", "Buea"];

const etapes = [
  { icone: Search, titre: "Trouvez", texte: "Comparez les profils, les réalisations et les avis de vraies prestations." },
  { icone: FileCheck2, titre: "Recevez une proposition", texte: "Le prestataire fixe un montant, un délai et le travail attendu." },
  { icone: Lock, titre: "Payez en sécurité", texte: "Votre argent reste bloqué sur la plateforme pendant le travail." },
  { icone: BadgeCheck, titre: "Validez", texte: "Le prestataire est payé quand vous validez. En cas de souci, ouvrez un litige." },
];

export default function Accueil() {
  return (
    <main>
      {/* Recherche d'abord : c'est l'action principale du visiteur */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-trust-50 px-3 py-1 text-xs font-bold text-trust-dark">
              <ShieldCheck className="size-4" /> Paiement protégé jusqu&apos;à la fin du travail
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
              Trouvez le bon prestataire, <span className="text-accent">près de chez vous</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Artisans, créatifs, développeurs, formateurs : des indépendants vérifiés, et un paiement qui ne part qu&apos;une
              fois le travail fait.
            </p>
          </div>

          <form action="/recherche" className="mx-auto mt-10 max-w-3xl">
            <Card className="flex flex-col gap-2 p-2 shadow-lift sm:flex-row">
              <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 focus-within:bg-canvas">
                <Search className="size-5 text-muted" />
                <span className="sr-only">Métier ou besoin</span>
                <input
                  name="q"
                  placeholder="Menuisier, logo, cours d'anglais…"
                  className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                />
              </label>
              <label className="flex items-center gap-3 rounded-xl px-4 py-3 focus-within:bg-canvas sm:w-56 sm:border-l sm:border-line">
                <MapPin className="size-5 text-muted" />
                <span className="sr-only">Ville</span>
                <select name="ville" defaultValue="" className="w-full bg-transparent text-base outline-none">
                  <option value="">Toutes les villes</option>
                  {villes.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="h-12 rounded-xl bg-brand px-6 font-semibold text-white hover:bg-brand-dark">
                Rechercher
              </button>
            </Card>
            <p className="mt-4 text-center text-sm text-muted">
              Populaire à Douala :{" "}
              {["Menuisier", "Coiffure", "Site web"].map((t, i) => (
                <span key={t}>
                  {i > 0 && " · "}
                  <Link href={`/recherche?q=${encodeURIComponent(t)}&ville=Douala`} className="font-medium text-brand hover:underline">
                    {t}
                  </Link>
                </span>
              ))}
            </p>
          </form>

          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center">
            {[
              { valeur: "2 300+", libelle: "prestataires" },
              { valeur: "4,8 / 5", libelle: "note moyenne" },
              { valeur: "100 %", libelle: "paiements protégés" },
            ].map((s) => (
              <div key={s.libelle}>
                <dt className="text-2xl font-extrabold text-brand tabular">{s.valeur}</dt>
                <dd className="text-sm text-muted">{s.libelle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <EnTete titre="Explorez par catégorie" sousTitre="Un seul endroit pour tous vos besoins, du chantier au logo." />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const Icone = iconesCategorie[c.id];
            return (
              <Link
                key={c.id}
                href={`/recherche?categorie=${c.id}`}
                className="group rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lift"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white">
                  <Icone className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold leading-snug text-ink">{c.nom}</p>
                <p className="mt-1 text-xs text-muted">{compact(c.nombre)} prestataires</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <EnTete
          titre="Prestataires recommandés"
          sousTitre="Sélectionnés selon leurs avis, leur fiabilité et leur certification."
          action={
            <Link href="/recherche" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Tout voir <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prestataires.slice(0, 4).map((p) => (
            <CartePrestataire key={p.id} prestataire={p} />
          ))}
        </div>
      </section>

      <section id="fonctionnement" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-20 sm:px-6">
        <div className="rounded-3xl bg-brand px-6 py-12 text-white sm:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Paiement par séquestre</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Votre argent est protégé du début à la fin</h2>
            <p className="mt-3 text-white/75">
              La plateforme garde le paiement jusqu&apos;à ce que vous validiez le travail. Si vous ne faites rien, il est
              versé automatiquement après le délai prévu.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {etapes.map(({ icone: Icone, titre, texte }, i) => (
              <li key={titre} className="rounded-2xl bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold">{i + 1}</span>
                  <Icone className="size-5 text-white/70" />
                </div>
                <p className="mt-4 font-bold">{titre}</p>
                <p className="mt-1 text-sm leading-6 text-white/75">{texte}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-white/70">
            Vous préférez payer en direct ? C&apos;est possible, mais la plateforme n&apos;intervient alors pas : ni séquestre,
            ni litige, ni avis officiel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <EnTete
          titre="Dernières réalisations"
          sousTitre="Des travaux réels publiés par les prestataires."
          action={
            <Link href="/realisations" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Voir le fil <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {realisations.slice(0, 3).map((r) => (
            <CarteRealisation key={r.id} realisation={r} compacte />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Card className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent">
              <Wallet className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">Vous êtes indépendant ?</h2>
              <p className="mt-1 max-w-xl text-muted">
                Activez votre espace prestataire depuis votre compte, publiez vos services et soyez payé à coup sûr.
                <span className="ml-1 inline-flex items-center gap-1 font-medium text-ink">
                  <Star className="size-4 fill-accent text-accent" /> Formule Classique gratuite.
                </span>
              </p>
            </div>
          </div>
          <BoutonLien href="/devenir-prestataire" variante="action" taille="lg">
            Devenir prestataire
          </BoutonLien>
        </Card>
      </section>
    </main>
  );
}

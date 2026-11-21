import Link from "next/link";
import { ArrowRight, Banknote, BadgeCheck, FileCheck2, MapPin, Search, ShieldCheck, Star, Wallet } from "lucide-react";
import { BoutonLien, Card, EnTete } from "@/components/ui";
import { CartePrestataire } from "@/components/cartes";
import { Publication } from "@/components/publication";
import { iconesCategorie } from "@/components/visuels";
import { categories, prestataires, realisations } from "@/data/mock";
import { cx } from "@/lib/format";

const villes = ["Douala", "Yaoundé", "Bafoussam", "Garoua", "Kribi", "Buea"];

// Cahier des charges v1.1 : le mode de paiement (sécurisé ou direct) dépend du prestataire.
const etapes = [
  { icone: Search, titre: "Trouvez", texte: "Comparez les profils, les réalisations et les avis." },
  { icone: FileCheck2, titre: "Recevez une proposition", texte: "Le prestataire indique un montant, un délai et le travail attendu." },
  { icone: Wallet, titre: "Acceptez et payez", texte: "Sur FreelanceX ou directement, selon le badge du prestataire." },
  { icone: Star, titre: "Confirmez et notez", texte: "Confirmez la fin du travail, puis laissez votre avis." },
];

const garanties = [
  {
    icone: BadgeCheck,
    titre: "Identité vérifiée",
    texte: "Le badge turquoise signifie que la pièce d'identité a été contrôlée par FreelanceX.",
    couleurs: { pastille: "bg-trust-50 text-trust-dark", titre: "text-trust-dark" },
  },
  {
    icone: ShieldCheck,
    titre: "Paiement sécurisé, si vous le voulez",
    texte: "Avec le badge Paiement sécurisé, l'argent reste bloqué jusqu'à votre confirmation.",
    couleurs: { pastille: "bg-trust-50 text-trust-dark", titre: "text-trust-dark" },
  },
  {
    icone: Star,
    titre: "Avis de vrais clients",
    texte: "Seul le client d'une prestation terminée peut noter, une seule fois.",
    couleurs: { pastille: "bg-accent-50 text-accent-text", titre: "text-accent-text" },
  },
];

const modesPaiement = [
  {
    icone: ShieldCheck,
    titre: "Paiement sécurisé",
    texte: "Vous payez sur FreelanceX. L'argent reste bloqué et n'est versé qu'après votre confirmation. En cas de désaccord, l'équipe arbitre.",
  },
  {
    icone: Banknote,
    titre: "Paiement direct",
    texte: "Vous payez le prestataire directement, comme convenu. FreelanceX ne garde pas l'argent, mais vous pouvez signaler un problème.",
  },
];

// Prestataires dont le mode de paiement est connu d'abord, 4 au maximum.
const recommandes = [...prestataires].sort((a, b) => Number(!!b.modePaiement) - Number(!!a.modePaiement)).slice(0, 4);

export default function Accueil() {
  return (
    <main>
      {/* Recherche d'abord : c'est l'action principale du visiteur */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-trust-50 px-3 py-1 text-xs font-bold text-trust-dark">
              <BadgeCheck className="size-4" /> Des prestataires à l&apos;identité vérifiée
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
              Trouvez le bon prestataire, <span className="text-accent">près de chez vous</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Artisans, créatifs, développeurs, formateurs : comparez leurs réalisations et leurs avis, échangez avec eux, puis
              payez de la façon qui vous rassure.
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

          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {garanties.map(({ icone: Icone, titre, texte, couleurs }) => (
              <li key={titre}>
                <Card className="h-full p-5">
                  <span className={cx("flex size-10 items-center justify-center rounded-xl", couleurs.pastille)}>
                    <Icone className="size-5" />
                  </span>
                  <p className={cx("mt-3 font-bold", couleurs.titre)}>{titre}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{texte}</p>
                </Card>
              </li>
            ))}
          </ul>
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
                <p className="mt-1 text-xs text-muted">{c.exemples}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <EnTete
          titre="Prestataires recommandés"
          sousTitre="Sélectionnés selon leurs avis, leur fiabilité et leur identité vérifiée."
          action={
            <Link href="/recherche" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Tout voir <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommandes.map((p) => (
            <CartePrestataire key={p.id} prestataire={p} />
          ))}
        </div>
      </section>

      <section id="fonctionnement" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-20 sm:px-6">
        <div className="rounded-3xl bg-brand px-6 py-12 text-white sm:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-100">Comment ça marche</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Vous savez toujours comment vous payez</h2>
            <p className="mt-3 text-white/75">
              Le mode de paiement dépend du prestataire. Vous le voyez sur son profil avant d&apos;envoyer votre demande.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {etapes.map(({ icone: Icone, titre, texte }, i) => (
              <li key={titre} className="rounded-2xl bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">{i + 1}</span>
                  <Icone className="size-5 text-white/70" />
                </div>
                <p className="mt-4 font-bold">{titre}</p>
                <p className="mt-1 text-sm leading-6 text-white/75">{texte}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {modesPaiement.map(({ icone: Icone, titre, texte }) => (
              <div key={titre} className="rounded-2xl border border-white/20 p-5">
                <p className="flex items-center gap-2 font-bold">
                  <Icone className="size-5 text-white/80" /> {titre}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/75">{texte}</p>
              </div>
            ))}
          </div>
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
            <Publication key={r.id} realisation={r} compacte />
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
                Publiez vos services et vos réalisations. Deux formules : un abonnement sans commission avec paiement direct, ou
                une commission avec paiement sécurisé.
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

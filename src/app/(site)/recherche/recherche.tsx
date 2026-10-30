"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, BadgeCheck, Clock, Lock, MapPin, Search, Sparkles, Star, X, Zap } from "lucide-react";
import { Avatar, Badge, BoutonLien, Card, Certifie, Note } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { categories, PRESTATAIRE_DEMO, prestataires, realisations, type Formule, type Prestataire } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const villes = ["Douala", "Yaoundé", "Bafoussam", "Garoua"];
const bonusFormule: Record<Formule, number> = { classique: 0, pro: 4, promax: 8 };

type Tri = "pertinence" | "note" | "prix";

function CarteResultat({ p }: { p: Prestataire }) {
  const { publiees } = useDemo();
  const photos = [...publiees, ...realisations]
    .filter((r) => r.prestataireId === p.id && r.photos)
    .slice(0, 3);
  const moi = p.id === PRESTATAIRE_DEMO;

  return (
    <Card className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar nom={p.nom} teinte={p.teinte} taille="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/prestataires/${p.id}`} className="text-xl font-bold text-ink hover:text-brand">
                {p.nom}
              </Link>
              {p.certifie && <Certifie />}
              {p.formule !== "classique" && <Badge ton="accent">{p.formule === "promax" ? "Promax" : "Pro"}</Badge>}
            </div>
            <p className="mt-0.5 text-slate-600">{p.metier}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <Note note={p.note} avis={p.avis} />
              <span className="flex items-center gap-1.5"><Clock className="size-4" /> {p.reponse}</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {p.ville}, {p.quartier}</span>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">À partir de</p>
            <p className="text-2xl font-extrabold text-brand-dark tabular">{p.prixDepart ? fcfa(p.prixDepart) : "Sur proposition"}</p>
            <Badge ton="trust" className="mt-1">{p.disponibilite}</Badge>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">{p.description}</p>

        {photos.length > 0 && (
          <>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted">Réalisations récentes</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {photos.map((r) => (
                <Link key={r.id} href={`/realisations`} className="relative h-24 overflow-hidden rounded-xl sm:h-32">
                  <Image src={r.photos!.apres} alt={r.titre} fill sizes="(min-width: 768px) 260px, 33vw" className="object-cover" unoptimized={r.photos!.apres.startsWith("data:")} />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-slate-900/70 px-2 pb-1.5 pt-4 text-xs font-semibold text-white">
                    {r.titre}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t border-line bg-canvas/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          {p.specialites.map((s) => (
            <span key={s} className="rounded-full bg-white px-2.5 py-1 ring-1 ring-line">{s}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <BoutonLien href={`/prestataires/${p.id}`} variante="discret" taille="sm">
            Voir le profil
          </BoutonLien>
          {moi ? (
            <Badge ton="brand" className="self-center">Votre profil</Badge>
          ) : (
            <BoutonLien href={`/messagerie?avec=${p.id}`} variante="primaire" taille="sm">
              Demander une prestation
            </BoutonLien>
          )}
        </div>
      </div>
    </Card>
  );
}

export function Recherche(initial: { q: string; ville: string; categorie: string }) {
  const [q, setQ] = useState(initial.q);
  const [ville, setVille] = useState(initial.ville);
  const [categorie, setCategorie] = useState(initial.categorie);
  const [certifies, setCertifies] = useState(false);
  const [disponibles, setDisponibles] = useState(false);
  const [bienNotes, setBienNotes] = useState(false);
  const [abonnes, setAbonnes] = useState(false);
  const [tri, setTri] = useState<Tri>("pertinence");

  const resultats = useMemo(() => {
    const texte = q.trim().toLowerCase();
    const liste = prestataires.filter((p) => {
      if (ville && p.ville !== ville) return false;
      if (categorie && p.categorie !== categorie) return false;
      if (certifies && !p.certifie) return false;
      if (disponibles && !/aujourd|demain|semaine/i.test(p.disponibilite)) return false;
      if (bienNotes && p.note < 4.8) return false;
      if (abonnes && p.formule === "classique") return false;
      if (texte) {
        const champ = [p.nom, p.metier, ...p.specialites, ...p.services.map((s) => s.titre)].join(" ").toLowerCase();
        return champ.includes(texte);
      }
      return true;
    });
    // Pertinence : note, score de confiance, puis bonus de certification et d'abonnement (ils reflètent le sérieux)
    const score = (p: Prestataire) => p.note * 10 + p.scoreConfiance / 10 + (p.certifie ? 6 : 0) + bonusFormule[p.formule];
    return [...liste].sort((a, b) => {
      if (tri === "note") return b.note - a.note;
      if (tri === "prix") return (a.prixDepart ?? Infinity) - (b.prixDepart ?? Infinity);
      return score(b) - score(a);
    });
  }, [q, ville, categorie, certifies, disponibles, bienNotes, abonnes, tri]);

  const puces = [
    { actif: certifies, basculer: () => setCertifies((v) => !v), libelle: "Identité vérifiée", icone: BadgeCheck },
    { actif: disponibles, basculer: () => setDisponibles((v) => !v), libelle: "Disponible cette semaine", icone: Zap },
    { actif: bienNotes, basculer: () => setBienNotes((v) => !v), libelle: "Note 4,8 et plus", icone: Star },
    { actif: abonnes, basculer: () => setAbonnes((v) => !v), libelle: "Pro et Promax", icone: Sparkles },
  ];

  return (
    <main>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-2 rounded-2xl bg-canvas p-2 md:grid-cols-[1fr_220px_220px]">
            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-line focus-within:ring-brand">
              <Search className="size-5 shrink-0 text-muted" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-muted">Métier ou besoin</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. menuisier, logo…" className="w-full bg-transparent font-semibold text-ink outline-none placeholder:font-normal placeholder:text-slate-400" />
              </span>
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Effacer" className="rounded-lg p-1 text-muted hover:bg-canvas">
                  <X className="size-4" />
                </button>
              )}
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-line focus-within:ring-brand">
              <MapPin className="size-5 shrink-0 text-accent" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-muted">Ville</span>
                <select value={ville} onChange={(e) => setVille(e.target.value)} className="w-full bg-transparent font-semibold text-ink outline-none">
                  <option value="">Tout le Cameroun</option>
                  {villes.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-line focus-within:ring-brand">
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-muted">Catégorie</span>
                <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full bg-transparent font-semibold text-ink outline-none">
                  <option value="">Toutes</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nom}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {puces.map(({ actif, basculer, libelle, icone: Icone }) => (
                <button
                  key={libelle}
                  type="button"
                  onClick={basculer}
                  aria-pressed={actif}
                  className={cx(
                    "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ring-1",
                    actif ? "bg-trust-50 text-trust-dark ring-trust/40" : "bg-white text-slate-600 ring-line hover:text-brand",
                  )}
                >
                  <Icone className="size-4" /> {libelle}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted">
                <span className="font-bold text-ink">{resultats.length}</span> prestataire{resultats.length > 1 ? "s" : ""}
              </p>
              <label className="flex h-10 items-center gap-2 rounded-xl bg-canvas px-3">
                <ArrowDownWideNarrow className="size-4 text-muted" />
                <span className="sr-only">Trier</span>
                <select value={tri} onChange={(e) => setTri(e.target.value as Tri)} className="bg-transparent text-sm font-semibold outline-none">
                  <option value="pertinence">Pertinence FreelanceX</option>
                  <option value="note">Mieux notés</option>
                  <option value="prix">Prix croissant</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_300px]">
        <section className="min-w-0 space-y-5">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <Lock className="size-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">Paiement protégé par séquestre</p>
                <p className="text-sm text-white/75">Le prestataire n&apos;est payé qu&apos;une fois votre travail validé.</p>
              </div>
            </div>
            <Link href="/garanties" className="hidden shrink-0 text-sm font-semibold underline-offset-4 hover:underline sm:block">
              En savoir plus
            </Link>
          </div>
          {resultats.map((p) => (
            <CarteResultat key={p.id} p={p} />
          ))}
          {!resultats.length && (
            <Card className="p-10 text-center">
              <p className="font-semibold text-ink">Aucun prestataire ne correspond.</p>
              <p className="mt-1 text-sm text-muted">Essayez une autre ville ou retirez un filtre.</p>
            </Card>
          )}
        </section>

        <aside className="hidden lg:block">
          <Card className="sticky top-24 p-5">
            <p className="font-bold text-ink">Comment est fait le classement ?</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• La pertinence par rapport à votre besoin</li>
              <li>• Les avis de vraies prestations</li>
              <li>• Le score de confiance</li>
              <li>• La certification d&apos;identité et la formule d&apos;abonnement, signes de sérieux</li>
            </ul>
          </Card>
        </aside>
      </div>
    </main>
  );
}

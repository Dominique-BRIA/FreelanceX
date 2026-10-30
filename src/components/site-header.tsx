"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  ClipboardList,
  Heart,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquare,
  Search,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "@/components/visuels";
import { Avatar } from "@/components/ui";
import { useMenu } from "@/components/use-menu";
import { PRESTATAIRE_DEMO, UTILISATEUR_DEMO } from "@/data/mock";
import { cx } from "@/lib/format";

const liens = [
  { href: "/recherche", libelle: "Trouver un prestataire" },
  { href: "/realisations", libelle: "Réalisations" },
  { href: "/garanties", libelle: "Garanties & confiance" },
];

const villes = ["Douala", "Yaoundé", "Bafoussam", "Garoua", "Kribi", "Buea"];

/** Rôles du compte connecté : le bouton de mode ne propose que ceux-là. */
const ROLES = { client: true, prestataire: true };

function ChoixLieu() {
  const { ouvert, ref, basculer, fermer } = useMenu();
  return (
    <div className="relative hidden xl:block" ref={ref}>
      <button
        type="button"
        onClick={basculer}
        aria-expanded={ouvert}
        className="flex h-10 items-center gap-2 whitespace-nowrap rounded-xl border border-line px-3 text-sm font-medium text-slate-600 hover:border-brand/40 hover:text-brand"
      >
        <MapPin className="size-4" /> Cameroun (FCFA) <ChevronDown className="size-3.5" />
      </button>
      {ouvert && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-lift">
          <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-muted">Chercher près de</p>
          {villes.map((v) => (
            <Link key={v} href={`/recherche?ville=${encodeURIComponent(v)}`} onClick={fermer} className="block rounded-lg px-3 py-2 text-sm hover:bg-canvas">
              {v}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuCompte() {
  const { ouvert, ref, basculer, fermer } = useMenu();
  const entrees = [
    { href: "/client", libelle: "Mon espace client", icone: LayoutDashboard },
    { href: "/client/demandes", libelle: "Mes demandes", icone: ClipboardList },
    { href: "/client/favoris", libelle: "Favoris", icone: Heart },
    ...(ROLES.prestataire
      ? [
          { href: "/prestataire", libelle: "Mon espace prestataire", icone: Store },
          { href: `/prestataires/${PRESTATAIRE_DEMO}`, libelle: "Mon profil public", icone: UserRound },
        ]
      : []),
  ];
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={basculer} aria-expanded={ouvert} aria-label="Mon compte" className="rounded-full ring-2 ring-transparent hover:ring-brand/20">
        <Avatar nom={UTILISATEUR_DEMO} teinte="bg-amber-600" />
      </button>
      {ouvert && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-line bg-white p-2 shadow-lift" role="menu">
          <div className="px-3 py-2">
            <p className="font-semibold text-ink">{UTILISATEUR_DEMO}</p>
            <p className="text-xs text-muted">Client · Prestataire</p>
          </div>
          <div className="my-1 border-t border-line" />
          {entrees.map(({ href, libelle, icone: Icone }) => (
            <Link key={href} href={href} role="menuitem" onClick={fermer} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-canvas">
              <Icone className="size-4 text-muted" /> {libelle}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const chemin = usePathname();
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [q, setQ] = useState("");

  const rechercher = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/recherche${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
    setMenuOuvert(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:gap-4">
        <Logo />
        <ChoixLieu />
        <form onSubmit={rechercher} className="hidden 2xl:block">
          <label className="flex h-10 w-52 items-center gap-2 rounded-xl bg-canvas px-3 focus-within:ring-2 focus-within:ring-brand/20">
            <Search className="size-4 text-muted" />
            <span className="sr-only">Rechercher un métier</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Métier (ex. électricien)" className="w-full bg-transparent text-sm outline-none" />
          </label>
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {liens.map((lien) => {
            const actif = chemin === lien.href || chemin.startsWith(`${lien.href}/`);
            return (
              <Link
                key={lien.href}
                href={lien.href}
                className={cx(
                  "whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                  actif ? "bg-brand text-white" : "text-slate-600 hover:bg-brand-50 hover:text-brand",
                )}
              >
                {lien.libelle}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <Link href="/messagerie" className="relative hidden rounded-xl p-2 text-slate-600 hover:bg-brand-50 hover:text-brand sm:block" aria-label="Messagerie, 2 messages non lus">
            <MessageSquare className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent ring-2 ring-white" />
          </Link>
          {ROLES.prestataire ? (
            <Link
              href="/prestataire"
              className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-dark sm:flex"
            >
              <ArrowLeftRight className="size-4" /> Mode prestataire
            </Link>
          ) : (
            <Link href="/devenir-prestataire" className="hidden h-10 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-dark sm:flex">
              Devenir prestataire
            </Link>
          )}
          <div className="hidden sm:block">
            <MenuCompte />
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-brand md:hidden"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOuvert ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {menuOuvert && (
        <nav className="border-t border-line bg-white px-4 pb-4 md:hidden" aria-label="Navigation mobile">
          <form onSubmit={rechercher} className="pt-3">
            <label className="flex h-11 items-center gap-2 rounded-xl bg-canvas px-3">
              <Search className="size-4 text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Métier, service…" className="w-full bg-transparent text-sm outline-none" />
            </label>
          </form>
          {[...liens, { href: "/messagerie", libelle: "Messagerie" }, { href: "/client", libelle: "Mon espace client" }].map((lien) => (
            <Link key={lien.href} href={lien.href} onClick={() => setMenuOuvert(false)} className="block border-b border-line py-3 text-sm font-medium text-ink">
              {lien.libelle}
            </Link>
          ))}
          <Link
            href="/prestataire"
            onClick={() => setMenuOuvert(false)}
            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-white"
          >
            <ArrowLeftRight className="size-4" /> Passer en mode prestataire
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 text-sm font-semibold text-brand-dark">Trouvez votre talent, réalisez vos projets.</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            La plateforme qui met en relation clients et prestataires indépendants, avec un paiement protégé jusqu&apos;à
            la fin du travail.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Plateforme</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/recherche" className="hover:text-brand">Trouver un prestataire</Link></li>
            <li><Link href="/realisations" className="hover:text-brand">Réalisations</Link></li>
            <li><Link href="/devenir-prestataire" className="hover:text-brand">Devenir prestataire</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Confiance</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/#fonctionnement" className="hover:text-brand">Paiement par séquestre</Link></li>
            <li><Link href="/certification" className="hover:text-brand">Certification d&apos;identité</Link></li>
            <li><Link href="/#fonctionnement" className="hover:text-brand">Litiges</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © 2026 FreelanceX · Projet ENSPY · Cameroun · FCFA ·{" "}
        <Link href="/credits" className="hover:text-brand hover:underline">
          Crédits des photos
        </Link>
      </div>
    </footer>
  );
}

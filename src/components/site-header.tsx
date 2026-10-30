"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, MessageSquare, X } from "lucide-react";
import { Logo } from "@/components/visuels";
import { BoutonLien } from "@/components/ui";
import { cx } from "@/lib/format";

const liens = [
  { href: "/recherche", libelle: "Trouver un prestataire" },
  { href: "/realisations", libelle: "Réalisations" },
  { href: "/#fonctionnement", libelle: "Comment ça marche" },
];

const espaces = [
  { href: "/client", libelle: "Espace client", detail: "Mes demandes et paiements" },
  { href: "/prestataire", libelle: "Espace prestataire", detail: "Mon activité" },
  { href: "/admin", libelle: "Administration", detail: "Litiges, certifications" },
];

export function SiteHeader() {
  const chemin = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [espacesOuverts, setEspacesOuverts] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="bg-brand-dark px-4 py-1.5 text-center text-xs font-medium text-white/80">
        Maquette de démonstration · données fictives
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={cx(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                chemin === lien.href ? "bg-brand-50 text-brand" : "text-slate-600 hover:text-brand",
              )}
            >
              {lien.libelle}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Link href="/messagerie" className="rounded-lg p-2 text-slate-600 hover:bg-brand-50 hover:text-brand" aria-label="Messagerie">
            <MessageSquare className="size-5" />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setEspacesOuverts((v) => !v)}
              onBlur={() => setTimeout(() => setEspacesOuverts(false), 150)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-brand hover:bg-brand-50"
              aria-expanded={espacesOuverts}
            >
              Mon espace <ChevronDown className="size-4" />
            </button>
            {espacesOuverts && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-line bg-white p-2 shadow-lift">
                {espaces.map((e) => (
                  <Link key={e.href} href={e.href} className="block rounded-lg px-3 py-2 hover:bg-canvas">
                    <span className="block text-sm font-semibold text-ink">{e.libelle}</span>
                    <span className="block text-xs text-muted">{e.detail}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <BoutonLien href="/devenir-prestataire" variante="action" taille="sm">
            Devenir prestataire
          </BoutonLien>
        </div>

        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-brand md:hidden"
          onClick={() => setMenuOuvert((v) => !v)}
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOuvert ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {menuOuvert && (
        <nav className="border-t border-line bg-white px-4 pb-4 md:hidden" aria-label="Navigation mobile">
          {[...liens, { href: "/messagerie", libelle: "Messagerie" }, ...espaces].map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="block border-b border-line py-3 text-sm font-medium text-ink last:border-0"
            >
              {lien.libelle}
            </Link>
          ))}
          <BoutonLien href="/devenir-prestataire" variante="action" className="mt-3 w-full" onClick={() => setMenuOuvert(false)}>
            Devenir prestataire
          </BoutonLien>
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
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
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
        © 2026 Freelance X · Projet ENSPY · Cameroun · FCFA
      </div>
    </footer>
  );
}

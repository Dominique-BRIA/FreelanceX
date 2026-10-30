"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowLeftRight,
  BadgeCheck,
  ClipboardList,
  CreditCard,
  Gavel,
  Heart,
  Images,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/visuels";
import { Avatar } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { UTILISATEUR_DEMO } from "@/data/mock";
import { cx } from "@/lib/format";

export type Role = "client" | "prestataire" | "admin";

type Lien = { href: string; libelle: string; icone: LucideIcon; compteur?: number };

const navigation: Record<Role, Lien[]> = {
  client: [
    { href: "/client", libelle: "Vue d'ensemble", icone: LayoutDashboard },
    { href: "/client/demandes", libelle: "Mes demandes", icone: ClipboardList, compteur: 2 },
    { href: "/messagerie", libelle: "Messagerie", icone: MessageSquare, compteur: 2 },
    { href: "/client/favoris", libelle: "Favoris", icone: Heart },
    { href: "/recherche", libelle: "Trouver un prestataire", icone: Search },
  ],
  prestataire: [
    { href: "/prestataire", libelle: "Vue d'ensemble", icone: LayoutDashboard },
    { href: "/prestataire/demandes", libelle: "Demandes", icone: ClipboardList, compteur: 1 },
    { href: "/prestataire/services", libelle: "Services", icone: Wrench },
    { href: "/prestataire/publier", libelle: "Publier une réalisation", icone: Images },
    { href: "/prestataire/paiements", libelle: "Paiements", icone: CreditCard },
    { href: "/messagerie", libelle: "Messagerie", icone: MessageSquare },
    { href: "/prestataire/abonnement", libelle: "Abonnement", icone: Sparkles },
    { href: "/prestataire/certification", libelle: "Certification", icone: BadgeCheck },
  ],
  admin: [
    { href: "/admin", libelle: "Vue d'ensemble", icone: LayoutDashboard },
    { href: "/admin/litiges", libelle: "Litiges", icone: Gavel, compteur: 3 },
    { href: "/admin/certifications", libelle: "Certifications", icone: ShieldCheck, compteur: 4 },
    { href: "/admin/utilisateurs", libelle: "Utilisateurs", icone: Users },
    { href: "/admin/parametres", libelle: "Paramètres", icone: Settings },
  ],
};

// Brice possède les rôles client et prestataire : il passe de l'un à l'autre. L'administration est un compte d'équipe.
const identites: Record<Role, { nom: string; detail: string; teinte: string }> = {
  client: { nom: UTILISATEUR_DEMO, detail: "Mode client", teinte: "bg-amber-600" },
  prestataire: { nom: UTILISATEUR_DEMO, detail: "Mode prestataire", teinte: "bg-amber-600" },
  admin: { nom: "Estelle Mballa", detail: "Équipe · litiges et certifications", teinte: "bg-trust" },
};

const changementDeMode: Record<Role, { href: string; libelle: string }> = {
  client: { href: "/prestataire", libelle: "Passer en mode prestataire" },
  prestataire: { href: "/client", libelle: "Passer en mode client" },
  admin: { href: "/", libelle: "Voir le site public" },
};

export function DashboardShell({ role, children }: { role: Role; children: ReactNode }) {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const { formule } = useDemo();
  const sombre = role === "admin";
  const identite = identites[role];
  const detail = role === "prestataire" ? `Mode prestataire · ${formule === "promax" ? "Promax" : formule === "pro" ? "Pro" : "Classique"}` : identite.detail;
  const mode = changementDeMode[role];

  const barre = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo clair={sombre} href={role === "admin" ? "/admin" : "/"} />
      </div>
      <div className={cx("mx-4 flex items-center gap-3 rounded-xl p-3", sombre ? "bg-white/10" : "bg-canvas")}>
        <Avatar nom={identite.nom} teinte={identite.teinte} taille="sm" />
        <div className="min-w-0">
          <p className={cx("truncate text-sm font-semibold", sombre ? "text-white" : "text-ink")}>{identite.nom}</p>
          <p className={cx("truncate text-xs", sombre ? "text-white/60" : "text-muted")}>{detail}</p>
        </div>
      </div>
      <nav className="mt-6 flex-1 space-y-1 px-3" aria-label="Navigation de l'espace">
        {navigation[role].map(({ href, libelle, icone: Icone, compteur }) => {
          // Les pages de détail (ex. /admin/litiges/LIT-208) gardent leur rubrique active
          const accueil = href === "/client" || href === "/prestataire" || href === "/admin";
          const actif = chemin === href || (!accueil && chemin.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOuvert(false)}
              className={cx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                sombre
                  ? actif
                    ? "bg-white text-brand-dark"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                  : actif
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-canvas hover:text-brand",
              )}
            >
              <Icone className="size-[18px]" />
              <span className="flex-1">{libelle}</span>
              {compteur ? (
                <span
                  className={cx(
                    "rounded-full px-2 text-xs font-bold",
                    actif ? "bg-accent text-white" : sombre ? "bg-white/15 text-white" : "bg-accent-50 text-accent-dark",
                  )}
                >
                  {compteur}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className={cx("m-4 space-y-2 border-t pt-4", sombre ? "border-white/10" : "border-line")}>
        <Link
          href={mode.href}
          onClick={() => setOuvert(false)}
          className={cx(
            "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold",
            sombre ? "bg-white/10 text-white hover:bg-white/20" : "bg-accent text-white hover:bg-accent-dark",
          )}
        >
          <ArrowLeftRight className="size-4" /> {mode.libelle}
        </Link>
        {!sombre && (
          <Link href="/" className="flex items-center justify-center gap-2 rounded-lg py-1.5 text-sm font-medium text-muted hover:text-brand">
            <Store className="size-4" /> Retour à la marketplace
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas">
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-40 hidden w-64 border-r lg:block",
          sombre ? "border-brand-dark bg-brand-dark" : "border-line bg-white",
        )}
      >
        {barre}
      </aside>

      {/* Barre mobile */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <Logo href={role === "admin" ? "/admin" : "/"} />
        <button type="button" onClick={() => setOuvert(true)} aria-label="Ouvrir le menu" className="rounded-lg p-2 text-brand">
          <Menu className="size-6" />
        </button>
      </div>
      {ouvert && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Fermer le menu" className="absolute inset-0 bg-slate-900/40" onClick={() => setOuvert(false)} />
          <aside className={cx("relative h-full w-72 shadow-lift", sombre ? "bg-brand-dark" : "bg-white")}>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              aria-label="Fermer le menu"
              className={cx("absolute right-3 top-4 rounded-lg p-1.5", sombre ? "text-white" : "text-brand")}
            >
              <X className="size-5" />
            </button>
            {barre}
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

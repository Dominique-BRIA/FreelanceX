"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  ChevronsUpDown,
  ClipboardList,
  CreditCard,
  FileSignature,
  Gavel,
  Home,
  ImagePlus,
  Images,
  Layers,
  LayoutDashboard,
  MessageSquare,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  UserPlus,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { useMenu } from "@/components/use-menu";
import { cx } from "@/lib/format";

type Ecran = { href: string; titre: string; detail: string; icone: LucideIcon };
type Groupe = { id: "client" | "pro" | "admin"; nom: string; accueil: string; ecrans: Ecran[] };

const groupes: Groupe[] = [
  {
    id: "client",
    nom: "Espace client & marketplace",
    accueil: "/",
    ecrans: [
      { href: "/", titre: "Accueil", detail: "Recherche, catégories, recommandés", icone: Home },
      { href: "/recherche", titre: "Trouver un prestataire", detail: "Filtres, tri, recommandation", icone: Search },
      { href: "/realisations", titre: "Fil des réalisations", detail: "J'aime, commentaires, enregistrement", icone: Images },
      { href: "/prestataires/aicha-nkoulou", titre: "Profil d'un prestataire", detail: "Services, réalisations, avis", icone: UserRound },
      { href: "/demandes/DEM-1051", titre: "Accepter et payer", detail: "Proposition, paiement par séquestre", icone: FileSignature },
      { href: "/demandes/DEM-1044", titre: "Valider un travail", detail: "Validation ou ouverture d'un litige", icone: BadgeCheck },
      { href: "/messagerie", titre: "Messagerie", detail: "Photos et messages vocaux", icone: MessageSquare },
      { href: "/client", titre: "Tableau de bord client", detail: "Demandes, fonds bloqués, favoris", icone: LayoutDashboard },
    ],
  },
  {
    id: "pro",
    nom: "Espace prestataire",
    accueil: "/prestataire",
    ecrans: [
      { href: "/prestataire", titre: "Tableau de bord", detail: "Activité, paiements, score", icone: LayoutDashboard },
      { href: "/prestataire/demandes/DEM-1060", titre: "Envoyer une proposition", detail: "Montant, délai, travail prévu", icone: ClipboardList },
      { href: "/prestataire/demandes/DEM-1033", titre: "Répondre à un litige", detail: "Version et preuves du prestataire", icone: Gavel },
      { href: "/prestataire/services", titre: "Mes services", detail: "Ajouter, désactiver un service", icone: Wrench },
      { href: "/prestataire/publier", titre: "Publier une réalisation", detail: "Photos avant / après, aperçu", icone: ImagePlus },
      { href: "/prestataire/paiements", titre: "Paiements", detail: "Fonds bloqués, versés, commission", icone: CreditCard },
      { href: "/prestataire/abonnement", titre: "Abonnement", detail: "Classique, Pro, Promax", icone: Sparkles },
      { href: "/prestataire/certification", titre: "Certification", detail: "Badge d'identité vérifiée", icone: ShieldCheck },
      { href: "/devenir-prestataire", titre: "Devenir prestataire", detail: "Activation en 4 étapes", icone: UserPlus },
    ],
  },
  {
    id: "admin",
    nom: "Console d'administration",
    accueil: "/admin",
    ecrans: [
      { href: "/admin", titre: "Vue d'ensemble", detail: "Priorités du jour", icone: LayoutDashboard },
      { href: "/admin/litiges/LIT-208", titre: "Trancher un litige", detail: "Preuves, répartition, avertissement", icone: Gavel },
      { href: "/admin/certifications", titre: "Certifications", detail: "Examen des pièces d'identité", icone: ShieldCheck },
      { href: "/admin/utilisateurs", titre: "Utilisateurs", detail: "Avertissements, suspension", icone: Users },
      { href: "/admin/parametres", titre: "Paramètres", detail: "Délais, commissions, formules", icone: Settings },
    ],
  },
];

function groupeDe(chemin: string): Groupe {
  if (chemin.startsWith("/admin")) return groupes[2];
  if (chemin.startsWith("/prestataire/") || chemin === "/prestataire" || chemin === "/devenir-prestataire") return groupes[1];
  return groupes[0];
}

function ecranDe(chemin: string): Ecran | undefined {
  const tous = groupes.flatMap((g) => g.ecrans);
  return tous.find((e) => e.href === chemin) ?? tous.filter((e) => e.href !== "/" && chemin.startsWith(e.href)).sort((a, b) => b.href.length - a.href.length)[0];
}

const libelles = { client: "Client", pro: "Pro", admin: "Admin" };

/** Outil de test : navigation rapide entre tous les écrans de la maquette. N'existerait pas en production. */
export function DemoNav() {
  const chemin = usePathname();
  const { ouvert, ref, basculer, fermer } = useMenu();
  const { reinitialiser } = useDemo();
  const groupe = groupeDe(chemin);
  const ecran = ecranDe(chemin);
  const Icone = ecran?.icone ?? Layers;

  return (
    <>
      <div className="h-24" aria-hidden />
      <div ref={ref} className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
        {ouvert && (
          <div className="absolute bottom-[4.5rem] w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <div className="flex items-start gap-3">
                <Layers className="mt-0.5 size-6 text-brand" />
                <div>
                  <p className="font-bold text-ink">
                    Maquette FreelanceX{" "}
                    <span className="ml-1 rounded-md bg-accent-50 px-1.5 py-0.5 font-mono text-xs text-accent-dark">
                      {groupes.reduce((n, g) => n + g.ecrans.length, 0)} écrans
                    </span>
                  </p>
                  <p className="text-sm text-muted">Naviguez librement entre les espaces. Les données sont fictives.</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    reinitialiser();
                    window.location.reload();
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-canvas hover:text-brand"
                >
                  <RotateCcw className="size-3.5" /> Réinitialiser
                </button>
                <button type="button" onClick={fermer} className="rounded-lg p-1.5 text-muted hover:bg-canvas" aria-label="Fermer">
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[60vh] space-y-5 overflow-y-auto p-5">
              {groupes.map((g) => (
                <section key={g.id}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">{g.nom}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {g.ecrans.map(({ href, titre, detail, icone: I }) => {
                      const actif = ecran?.href === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={fermer}
                          className={cx(
                            "flex items-center gap-3 rounded-2xl p-3 transition-colors",
                            actif ? "bg-brand text-white" : "bg-canvas hover:bg-brand-50",
                          )}
                        >
                          <I className={cx("size-5 shrink-0", actif ? "text-white" : "text-brand")} />
                          <span className="min-w-0">
                            <span className={cx("block truncate text-sm font-semibold", !actif && "text-ink")}>{titre}</span>
                            <span className={cx("block truncate text-xs", actif ? "text-white/75" : "text-muted")}>{detail}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-w-0 max-w-full items-center gap-1 rounded-2xl bg-brand-dark p-1.5 pl-2 text-white shadow-lift sm:pl-3">
          <button
            type="button"
            onClick={basculer}
            aria-expanded={ouvert}
            className="flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-2 text-left hover:bg-white/10 sm:pl-1"
          >
            <span className="size-2 shrink-0 rounded-full bg-emerald-400" />
            <Icone className="hidden size-5 shrink-0 sm:block" />
            <span className="min-w-0">
              <span className="hidden truncate text-[10px] font-bold uppercase tracking-wider text-white/60 sm:block">{groupe.nom}</span>
              <span className="block max-w-[7.5rem] truncate text-sm font-semibold sm:max-w-[14rem]">{ecran?.titre ?? "Autre page"}</span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-white/70" />
          </button>
          <span className="mx-0.5 h-8 w-px shrink-0 bg-white/15 sm:mx-1" />
          {groupes.map((g) => (
            <Link
              key={g.id}
              href={g.accueil}
              onClick={fermer}
              className={cx(
                "rounded-xl px-2.5 py-2 text-sm font-semibold sm:px-3",
                groupe.id === g.id ? "bg-accent text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              {libelles[g.id]}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

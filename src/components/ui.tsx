import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cx, initiales } from "@/lib/format";
import { libellesStatut, type StatutDemande } from "@/data/mock";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("rounded-2xl border border-line bg-white shadow-card", className)}>{children}</div>
  );
}

type Ton = "neutre" | "brand" | "accent" | "trust" | "danger" | "attente";

const tons: Record<Ton, string> = {
  neutre: "bg-slate-100 text-slate-600",
  brand: "bg-brand-50 text-brand",
  accent: "bg-accent-50 text-accent-dark",
  trust: "bg-trust-50 text-trust-dark",
  danger: "bg-danger-50 text-danger",
  attente: "bg-amber-50 text-amber-700",
};

export function Badge({ ton = "neutre", children, className }: { ton?: Ton; children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tons[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}

type Variante = "primaire" | "action" | "contour" | "discret" | "danger";
type Taille = "sm" | "md" | "lg";

const variantes: Record<Variante, string> = {
  primaire: "bg-brand text-white hover:bg-brand-dark",
  action: "bg-accent text-white hover:bg-accent-dark",
  contour: "border border-brand/30 bg-white text-brand hover:bg-brand-50",
  discret: "text-brand hover:bg-brand-50",
  danger: "border border-danger/30 bg-white text-danger hover:bg-danger-50",
};

const tailles: Record<Taille, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function classesBouton(variante: Variante = "primaire", taille: Taille = "md") {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50",
    variantes[variante],
    tailles[taille],
  );
}

export function BoutonLien({
  variante,
  taille,
  className,
  ...props
}: ComponentProps<typeof Link> & { variante?: Variante; taille?: Taille }) {
  return <Link {...props} className={cx(classesBouton(variante, taille), className)} />;
}

export function Bouton({
  variante,
  taille,
  className,
  ...props
}: ComponentProps<"button"> & { variante?: Variante; taille?: Taille }) {
  return <button type="button" {...props} className={cx(classesBouton(variante, taille), className)} />;
}

const tailleAvatar = { sm: "size-8 text-xs", md: "size-11 text-sm", lg: "size-16 text-lg", xl: "size-24 text-2xl" };

export function Avatar({
  nom,
  teinte = "bg-brand",
  taille = "md",
}: {
  nom: string;
  teinte?: string;
  taille?: keyof typeof tailleAvatar;
}) {
  return (
    <span
      aria-hidden
      className={cx("inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white", teinte, tailleAvatar[taille])}
    >
      {initiales(nom)}
    </span>
  );
}

export function Certifie({ court = false }: { court?: boolean }) {
  return (
    <Badge ton="trust">
      <BadgeCheck className="size-3.5" />
      {court ? "Vérifié" : "Identité vérifiée"}
    </Badge>
  );
}

export function Note({ note, avis }: { note: number; avis?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star className="size-4 fill-accent text-accent" />
      <span className="font-bold tabular">{note.toFixed(1).replace(".", ",")}</span>
      {avis !== undefined && <span className="text-muted">({avis} avis)</span>}
    </span>
  );
}

const tonsStatut: Record<StatutDemande, Ton> = {
  envoyee: "attente",
  proposition: "accent",
  acceptee: "brand",
  en_cours: "brand",
  livree: "trust",
  en_litige: "danger",
  terminee: "neutre",
  remboursee: "neutre",
  hors_plateforme: "neutre",
};

export function StatutDemandeBadge({ statut }: { statut: StatutDemande }) {
  return <Badge ton={tonsStatut[statut]}>{libellesStatut[statut]}</Badge>;
}

export function EnTete({
  titre,
  sousTitre,
  action,
}: {
  titre: string;
  sousTitre?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">{titre}</h2>
        {sousTitre && <p className="mt-1 text-sm text-muted">{sousTitre}</p>}
      </div>
      {action}
    </div>
  );
}

/** Indicateur clé : un libellé, une valeur, une ligne de contexte. Volontairement sobre. */
export function Indicateur({
  libelle,
  valeur,
  contexte,
  icone,
  ton = "brand",
}: {
  libelle: string;
  valeur: string;
  contexte?: ReactNode;
  icone: ReactNode;
  ton?: "brand" | "accent" | "trust" | "danger";
}) {
  const fonds = { brand: "bg-brand-50 text-brand", accent: "bg-accent-50 text-accent", trust: "bg-trust-50 text-trust", danger: "bg-danger-50 text-danger" };
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className={cx("flex size-9 items-center justify-center rounded-lg", fonds[ton])}>{icone}</span>
        <span className="text-sm font-medium text-muted">{libelle}</span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-ink tabular">{valeur}</p>
      {contexte && <p className="mt-1 text-sm text-muted">{contexte}</p>}
    </Card>
  );
}

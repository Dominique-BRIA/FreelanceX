import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Banknote, Check, ShieldCheck, Star } from "lucide-react";
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
  accent: "bg-accent-50 text-accent-text",
  trust: "bg-trust-50 text-trust-dark",
  danger: "bg-danger-50 text-danger",
  attente: "bg-amber-50 text-amber-700",
};

const baseBadge = "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold";

export function Badge({ ton = "neutre", children, className }: { ton?: Ton; children: ReactNode; className?: string }) {
  return (
    <span className={cx(baseBadge, tons[ton], className)}>
      {children}
    </span>
  );
}

type Variante = "primaire" | "action" | "contour" | "discret" | "danger";
type Taille = "sm" | "md" | "lg";

const variantes: Record<Variante, string> = {
  primaire: "bg-brand text-white hover:bg-brand-dark",
  action: "bg-accent text-ink hover:bg-accent-hover",
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
const pixelsAvatar = { sm: "32px", md: "44px", lg: "64px", xl: "96px" };
const pastilleAvatar = { sm: "size-3.5", md: "size-4", lg: "size-5", xl: "size-7" };
const cocheAvatar = { sm: "size-2.5", md: "size-3", lg: "size-3.5", xl: "size-5" };

export function Avatar({
  nom,
  teinte = "bg-brand",
  taille = "md",
  photo,
  verifie = false,
}: {
  nom: string;
  teinte?: string;
  taille?: keyof typeof tailleAvatar;
  /** Chemin d'une photo (ex. /images/profil-….jpg) : remplace les initiales. */
  photo?: string;
  /** Ajoute la pastille turquoise de confiance (identité vérifiée). */
  verifie?: boolean;
}) {
  const rond = photo ? (
    <span aria-hidden className={cx("relative inline-flex shrink-0 overflow-hidden rounded-full bg-canvas", tailleAvatar[taille])}>
      <Image src={photo} alt="" fill sizes={pixelsAvatar[taille]} className="object-cover" />
    </span>
  ) : (
    <span
      aria-hidden
      className={cx("inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white", teinte, tailleAvatar[taille])}
    >
      {initiales(nom)}
    </span>
  );
  if (!verifie) return rond;
  return (
    <span className="relative inline-flex shrink-0">
      {rond}
      <span
        className={cx(
          "absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-trust text-white ring-2 ring-white",
          pastilleAvatar[taille],
        )}
      >
        <Check className={cocheAvatar[taille]} strokeWidth={3} aria-hidden />
        <span className="sr-only">Identité vérifiée</span>
      </span>
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

export function PaiementSecurise() {
  return (
    <Badge ton="trust">
      <ShieldCheck className="size-3.5" />
      Paiement sécurisé
    </Badge>
  );
}

export function PaiementDirect() {
  return (
    <Badge ton="neutre">
      <Banknote className="size-3.5" />
      Paiement direct
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

// Cahier des charges v1.1, section 6.1 : une couleur (fond / texte) par statut de demande.
const couleursStatut: Record<StatutDemande, string> = {
  brouillon: "bg-[#f1f5f9] text-[#475569]",
  envoyee: "bg-[#eef3fb] text-[#0b3a86]",
  en_discussion: "bg-[#f3e8ff] text-[#6d28d9]",
  proposition: "bg-[#fff2e6] text-[#9a4508]",
  acceptee: "bg-[#dcfce7] text-[#166534]",
  en_cours: "bg-[#0b3a86] text-white",
  annulation_demandee: "bg-[#fffbeb] text-[#b45309]",
  terminee: "bg-[#166534] text-white",
  en_litige: "bg-[#fef2f2] text-[#b91c1c]",
  annulee: "bg-[#475569] text-white",
  // Anciens statuts, gardés pour les écrans qui s'en servent encore.
  livree: "bg-[#dcfce7] text-[#166534]",
  remboursee: "bg-[#f1f5f9] text-[#475569]",
  hors_plateforme: "bg-[#f1f5f9] text-[#475569]",
};

export function StatutDemandeBadge({ statut }: { statut: StatutDemande }) {
  return <span className={cx(baseBadge, couleursStatut[statut])}>{libellesStatut[statut]}</span>;
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

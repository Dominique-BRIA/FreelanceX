import {
  Briefcase,
  Camera,
  GraduationCap,
  Hammer,
  Home,
  Laptop,
  MoreHorizontal,
  Palette,
  Scissors,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { CategorieId, Realisation } from "@/data/mock";
import { cx } from "@/lib/format";

export const iconesCategorie: Record<CategorieId, LucideIcon> = {
  batiment: Hammer,
  plomberie: Wrench,
  informatique: Laptop,
  graphisme: Palette,
  maison: Home,
  beaute: Scissors,
  education: GraduationCap,
  transport: Truck,
  evenementiel: Camera,
  conseil: Briefcase,
  autres: MoreHorizontal,
};

export function Logo({ clair = false, href = "/" }: { clair?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="Freelance X, accueil">
      <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-lg font-extrabold text-white">X</span>
      <span className={cx("text-lg font-extrabold tracking-tight", clair ? "text-white" : "text-brand")}>
        Freelance<span className="text-accent"> X</span>
      </span>
    </Link>
  );
}

/** Illustration d'une réalisation (pas de photo dans la maquette : dégradés et icône). */
export function VisuelRealisation({ realisation, hauteur = "h-48" }: { realisation: Realisation; hauteur?: string }) {
  const Icone = iconesCategorie[realisation.categorie];
  if (realisation.avantApres) {
    return (
      <div className={cx("grid grid-cols-2 gap-1 overflow-hidden rounded-xl", hauteur)}>
        {(["Avant", "Après"] as const).map((etiquette, i) => (
          <div key={etiquette} className={cx("relative flex items-center justify-center bg-gradient-to-br", realisation.palette[i])}>
            <Icone className="size-10 text-white/50" strokeWidth={1.5} />
            <span className="absolute left-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[11px] font-bold text-white">
              {etiquette}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={cx("flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br", realisation.palette[0], hauteur)}>
      <Icone className="size-12 text-white/60" strokeWidth={1.5} />
    </div>
  );
}

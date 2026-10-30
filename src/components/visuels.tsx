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
import Image from "next/image";
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
    <Link href={href} className="flex items-center gap-2" aria-label="FreelanceX, accueil">
      <span className={cx("flex h-9 items-center rounded-lg", clair && "bg-white px-1.5")}>
        <Image src="/logo-fx.png" alt="" width={58} height={32} priority className="h-8 w-auto" />
      </span>
      <span className={cx("text-xl font-extrabold tracking-tight", clair ? "text-white" : "text-brand-dark")}>
        Freelance<span className="text-accent">X</span>
      </span>
    </Link>
  );
}

function Photo({ src, alt, etiquette }: { src: string; alt: string; etiquette?: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-slate-200">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 600px, 100vw"
        className="object-cover"
        unoptimized={src.startsWith("data:")}
      />
      {etiquette && (
        <span className="absolute left-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[11px] font-bold text-white">{etiquette}</span>
      )}
    </div>
  );
}

/** Illustration d'une réalisation : photos si disponibles, sinon dégradé et icône. */
export function VisuelRealisation({ realisation, hauteur = "h-48" }: { realisation: Realisation; hauteur?: string }) {
  const Icone = iconesCategorie[realisation.categorie];
  const photos = realisation.photos;
  if (photos?.avant) {
    return (
      <div className={cx("grid grid-cols-2 gap-1 overflow-hidden rounded-xl", hauteur)}>
        <Photo src={photos.avant} alt={`${realisation.titre}, avant`} etiquette="Avant" />
        <Photo src={photos.apres} alt={`${realisation.titre}, après`} etiquette="Après" />
      </div>
    );
  }
  if (photos) {
    return (
      <div className={cx("overflow-hidden rounded-xl", hauteur)}>
        <Photo src={photos.apres} alt={realisation.titre} />
      </div>
    );
  }
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
